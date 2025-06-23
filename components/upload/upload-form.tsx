"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import UploadFormInput from "@/components/upload/upload-form-input";
import {
  generatePDFSummary,
  storePDFSummaryAction,
  storePDFSummaryActionResponse,
} from "@/actions/upload-action";
import { formatFileNameAsTitle } from "@/utils/format-file";
import { validateFile } from "@/utils/validation";
import { useFileUploadService } from "@/utils/uploadSerive";

export default function UploadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { uploadFile } = useFileUploadService();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.dismiss(); // Clear any previous toasts
    setIsLoading(true); // Set loading state to true

    // Show a loading toast to indicate the process has started
    const progressToastId = toast.loading("Starting PDF Process...", {
      description: "We're getting ready to handle your file.",
      duration: Infinity, // Keep indefinitely until explicitly dismissed or updated
    });
    try {
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      // 1. File Validation
      const validationResult = validateFile(file);

      if (!validationResult.success) {
        console.error("File validation failed:", validationResult.error);
        toast.error("Validation Failed!", {
          id: progressToastId, // Update to an error state
          description: `Oops! ${validationResult.error} Please select a valid PDF file.`,
          duration: 5000,
        });
        setIsLoading(false);
        return; // Exit if validation fails
      }
      const validatedFile = validationResult.file;

      // 2. File Upload
      toast.loading("✅ Uploading PDF...", {
        id: progressToastId, // Update the existing toast
        description: `Sending your PDF to our servers.`,
      });

      const uploadResponse = await uploadFile(validatedFile);
      if (!uploadResponse.success) {
        console.error("File upload failed:", uploadResponse.error);
        toast.error("Upload Failed!", {
          id: progressToastId, // Update to an error state
          description: `We couldn't upload "${validatedFile.name}": ${uploadResponse.error}. Please try again.`,
          duration: 7000,
        });
        setIsLoading(false);
        return; // Exit if upload fails
      }

      const uploadedFileDetails = uploadResponse.data[0];
      const formattedFileName = formatFileNameAsTitle(uploadedFileDetails.name);
      const serverData = {
        url: uploadedFileDetails.ufsUrl,
        name: uploadedFileDetails.name,
      };

      // 3.1 After successful upload, update the toast message for summary generation
      toast.loading("✨ Generating Summary...", {
        id: progressToastId, // Update the existing toast
        description: `Your PDF has been uploaded! Now, we're extracting key information from PDF. This might take a moment.`,
      });

      // 3.2 Generate PDF Summary
      const summaryResult = await generatePDFSummary({ serverData });
      // console.log(summaryResult);

      // 3.3 Check if summary generation was successful
      if (!summaryResult.success) {
        toast.error("Summary Generation Failed!", {
          id: progressToastId, // Update to an error state
          description: `We couldn't create a summary for your PDF: ${summaryResult.message}.`,
          duration: 7000,
        });
        return; // Exit if summary generation fails
      }

      toast.loading("📝 Saving Summary...", {
        id: progressToastId, // Update the existing toast
        description: `Almost done! Storing the generated summary for your PDF.`,
      });

      // 4. Store PDF Summary
      if (summaryResult.data && summaryResult.success) {
        let storedResult: storePDFSummaryActionResponse;
        storedResult = await storePDFSummaryAction({
          summary: summaryResult.data ?? "",
          title: formattedFileName,
          fileName: uploadedFileDetails.name,
          fileUrl: uploadedFileDetails.ufsUrl,
        });

        // Final Success Toast
        toast.success("✅ Process Complete!", {
          id: progressToastId, // Update to a final success state
          description: `Your summary for ${formattedFileName} has been successfully created and saved!`,
          duration: 5000, // Keep success message for a few seconds
        });

        // 5. Redirect to the summary page
        router.push(`/summaries/${storedResult?.data?.summaryId}`);
      }
    } catch (error: any) {
      // Catch any unexpected errors during the entire process
      console.error("An unexpected error occurred during handleSubmit:", error);
      toast.error("An Unexpected Error Occurred!", {
        id: progressToastId, // Ensure even unexpected errors update the last toast
        description: `Something went wrong: ${
          error.message || "Please try again."
        }`,
        duration: 10000, // Longer duration for unexpected errors
      });
    } finally {
      setIsLoading(false); // Always reset loading state
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
