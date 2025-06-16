"use client";
import React, { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean; // Optional prop to manage loading state
}
export default function UploadFormInput({
  onSubmit,
  isLoading,
}: UploadFormInputProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Only reset if isLoading becomes false and the formRef exists
    if (!isLoading && formRef.current) {
      formRef.current.reset();
    }
  }, [isLoading]);

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit} ref={formRef}>
      <div className="flex justify-center items-center gap-1.5">
        <Input
          id="file"
          required
          placeholder="Select your PDF file"
          type="file"
          accept="application/pdf"
          name="file"
          className="file-input file-input-bordered w-full max-w-xs"
          disabled={isLoading} // Disable input when loading
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Upload Your PDF"
          )}
        </Button>
      </div>
    </form>
  );
}
