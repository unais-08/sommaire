"use client";
import React from "react";
import UploadFormInput from "@/components/upload/upload-form-input";
import { schema } from "@/utils/fileSchema";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generatePDFSummary } from "@/actions/upload-action";

export default function UploadForm() {
  const { startUpload, routeConfig } = useUploadThing("pdfRouter", {
    onClientUploadComplete: () => {
      console.log("File: uploaded successfully");
      toast.success("File uploaded successfully");
    },
    onUploadError: (error) => {
      // 'error' here is an UploadThingError object
      console.error("Upload failed:", error); // Still log the whole error object

      // Access specific properties of the UploadThingError
      let errorMessage = error.message; // General message like "Request failed..."

      // If there's additional data from the server (e.g., specific error details)
      if (error.data) {
        console.error("Server error data:", error.data);
        // You might get 'cause' or other custom properties from your backend
        if (
          typeof error.data === "object" &&
          error.data !== null &&
          "cause" in error.data
        ) {
          errorMessage = `${error.message} - Cause: ${error.data.cause}`;
        } else if (
          typeof error.data === "object" &&
          error.data !== null &&
          "uploadthingError" in error.data
        ) {
          errorMessage = `${error.message} - UT Code: ${error.data.uploadthingError}`;
        }
        // You can also stringify the data if it's complex JSON for display
        // errorMessage += ` (Details: ${JSON.stringify(error.data)})`;
      }

      toast.error(`Upload failed: ${errorMessage}`);
    },
    onUploadBegin: (fileName: string) => {
      console.log("Uploading...", fileName);
      toast.info(`Uploading ${fileName}...`);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    // Handle form submission logic here
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    const validatedFile = schema.safeParse({ file });

    // Uncomment the line below to see the validated file in the console
    // console.log("Validated file:", validatedFile);

    // If the file is not valid, donot proceed with the upload and processing
    if (!validatedFile.success) {
      console.error(
        "Validation failed:",
        validatedFile.error.flatten().fieldErrors.file?.[0]
      );
      return;
    }

    const resp = await startUpload([file]);
    if (!resp || resp.length === 0) {
      console.error("Upload failed or no response received");
      return;
    }
    // console.log("Upload response:", resp);
    console.log("Server data:", resp[0].serverData);
    //parse the pdf using langchain
    const summary = await generatePDFSummary({
      serverData: resp[0].serverData,
    });
    console.log("Summary generated:", summary);
    /*
     * validate the file type and size here
     *schame with zod
     * upload the file with upladthing
     * parse the pdf using langchain
     * summarize the pdf using AI
     * save the summary to the database
     * redirect to the [id] summary page
     */
  };

  return (
    <div className="flex flex-col  gap-8 w-full max-w-2xl max-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
