"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import UploadFormInput from "@/components/upload/upload-form-input";
import {
  generatePDFSummary,
  storePDFSummaryAction,
} from "@/actions/upload-action";
import { schema } from "@/utils/fileSchema";
import { useUploadThing } from "@/utils/uploadthing";
import { formatFileNameAsTitle } from "@/utils/format-file";
import { url } from "inspector";

export default function UploadForm() {
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status
  const router = useRouter();
  const { startUpload } = useUploadThing("pdfRouter", {
    onClientUploadComplete: () => {
      toast.success("✅ File uploaded successfully!");
    },
    onUploadError: (error) => {
      console.error("Upload failed:", error);
      let errorMessage = "An unexpected error occurred during upload.";
      // This toast specifically for upload errors
      toast.error(`❌ ${errorMessage}`);
      setIsLoading(false); // Ensure loading state is reset on upload error
    },
    onUploadBegin: (fileName: string) => {
      // This toast shows progress during the actual file transfer
      toast.info(`📤 Uploading Your PDF...`);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss(); // Clear any previous toasts
    setIsLoading(true); // Set loading state to true

    try {
      toast.info("⏳ Processing your request. Please wait...");

      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      const validatedFile = schema.safeParse({ file });

      if (!validatedFile.success) {
        const fileError = validatedFile.error.flatten().fieldErrors.file?.[0];
        console.error("File validation failed:", fileError);
        toast.error(
          `⚠️ File validation failed: ${
            fileError || "Please select a valid PDF file."
          }`
        );
        return; // Exit if validation fails
      }

      // Start the actual file upload
      console.log("Starting file upload:", [file]);
      const uploadResponse = await startUpload([file]);
      console.log("Upload response:", uploadResponse);
      if (!uploadResponse || uploadResponse.length === 0) {
        console.error(
          "Upload failed or no response received from UploadThing."
        );
        toast.error("❌ File upload failed. Please try again.");
        return; // Exit if upload fails
      }

      // After successful upload, update the toast message for summary generation
      toast.info("✨ PDF uploaded! Now generating summary...");

      // Generate the PDF summary
      //pasrsing problem occur here my finding
      const serverData = {
        url: uploadResponse[0].ufsUrl,
        name: uploadResponse[0].name,
      };
      const summaryResult = await generatePDFSummary({ serverData });
      console.log(summaryResult);
      // Based on the summary generation result, show success or failure toast
      if (summaryResult.success) {
        toast.success("📝 PDF summary generated successfully!");
        // Here you might redirect or display the summary
      } else {
        console.error("Summary generation failed:", summaryResult.message);
        toast.error(`🚨 Summary generation failed: ${summaryResult.message}`);
        return; // Exit if summary generation fails
      }

      const formattedFileName = formatFileNameAsTitle(
        uploadResponse[0].name
      );
      if (summaryResult.data) {
        let storedResult: any;
        //pasrsing problem occur here my finding
        storedResult = await storePDFSummaryAction({
          summary: summaryResult.data,
          title: formattedFileName,
          fileName: uploadResponse[0].name,
          fileUrl: uploadResponse[0].ufsUrl,
        });

        //save the summary to the database
        toast.success(
          `✅ Summary saved successfully! Title: "${
            storedResult?.title || formattedFileName
          }"`
        );

        router.push(`/summaries/${storedResult?.data?.summaryId}`);
      }
    } catch (error: any) {
      // Catch any unexpected errors during the entire process
      console.error("An unexpected error occurred during handleSubmit:", error);
      toast.error(
        `💥 An unexpected error occurred: ${
          error.message || "Please try again."
        }`
      );
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
