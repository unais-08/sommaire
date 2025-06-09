"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function UploadFormInput({ onSubmit }: UploadFormInputProps) {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex justify-center items-center gap-1.5">
        <Input
          id="file"
          required
          placeholder="Select your PDF file"
          type="file"
          accept="application/pdf"
          name="file"
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <Button>Upload Your PDF</Button>
      </div>
    </form>
  );
}
