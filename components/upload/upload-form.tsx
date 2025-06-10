"use client";
import React from "react";
import { z } from "zod";
import UploadFormInput from "@/components/upload/upload-form-input";
import { fi } from "zod/v4/locales";

const schema = z.object({
  file: z
    .instanceof(File, {
      message: "Invalid File or File not provided",
    })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "File must be a PDF",
    }),
});

export default function UploadForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
