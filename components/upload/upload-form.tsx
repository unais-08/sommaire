"use client";
import React from "react";
import UploadFormInput from "@/components/upload/upload-form-input";

export default function UploadForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    /*
     * validate the file type and size here
     *schame with zod
     * upload the file with upladthing
     * parse the pdf using langchain
     * summarize the pdf using AI
     * save the summary to the database
     * redirect to the [id] summary page
     */

    if (file) {
      console.log("File selected:", file);
      // You can add further processing of the file here, like uploading it to a server
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="flex flex-col  gap-8 w-full max-w-2xl max-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
