"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import UploadFormInput from "@/components/upload/upload-form-input";
import {
  generatePDFSummary,
  storePDFSummaryAction,
} from "@/actions/upload-action";
import { schema } from "@/utils/fileSchema";
import { useUploadThing } from "@/utils/uploadthing";
import { formatFileNameAsTitle } from "@/utils/format-file";

export default function UploadForm() {
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status

  const { startUpload } = useUploadThing("pdfRouter", {
    onClientUploadComplete: () => {
      console.log("File uploaded successfully");
      // This toast can confirm the raw upload success
      toast.success("✅ File uploaded successfully!");
    },
    onUploadError: (error) => {
      console.error("Upload failed:", error);
      let errorMessage = "An unexpected error occurred during upload.";
      if (error.message) {
        errorMessage = error.message;
      }
      if (error.data && typeof error.data === "object" && error.data !== null) {
        if ("cause" in error.data) {
          errorMessage = `Upload failed: ${error.data.cause}`;
        } else if ("uploadthingError" in error.data) {
          errorMessage = `Upload failed: ${error.data.uploadthingError}`;
        }
      }
      // This toast specifically for upload errors
      toast.error(`❌ ${errorMessage}`);
      setIsLoading(false); // Ensure loading state is reset on upload error
    },
    onUploadBegin: (fileName: string) => {
      console.log("Uploading...", fileName);
      // This toast shows progress during the actual file transfer
      toast.info(`📤 Uploading "${fileName}"...`);
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
      const uploadResponse = await startUpload([file]);

      if (!uploadResponse || uploadResponse.length === 0) {
        console.error(
          "Upload failed or no response received from UploadThing."
        );
        toast.error("❌ File upload failed. Please try again.");
        return; // Exit if upload fails
      }

      // After successful upload, update the toast message for summary generation
      toast.info("✨ PDF uploaded! Now generating summary...");
      console.log("Server data:", uploadResponse[0].serverData);

      // Generate the PDF summary
      const summaryResult = await generatePDFSummary({
        serverData: uploadResponse[0].serverData,
      });

      // Based on the summary generation result, show success or failure toast
      if (summaryResult.success) {
        console.log("Summary generated:", summaryResult.data);
        toast.success("📝 PDF summary generated successfully!");
        // Here you might redirect or display the summary
      } else {
        console.error("Summary generation failed:", summaryResult.message);
        toast.error(`🚨 Summary generation failed: ${summaryResult.message}`);
      }

      const formattedFileName = formatFileNameAsTitle(
        uploadResponse[0].serverData.file.name
      );
      if (summaryResult.data) {
        let storedResult: any;
        storedResult = await storePDFSummaryAction({
          summary: summaryResult.data,
          title: formattedFileName,
          fileName: uploadResponse[0].serverData.file.name,
          fileUrl: uploadResponse[0].serverData.file.url,
        });

        //save the summary to the database
        toast.success(
          `✅ Summary saved successfully! Title: "${storedResult?.title || formattedFileName}"`
        );
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
