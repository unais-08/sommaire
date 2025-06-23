import { schema } from "@/utils/fileSchema"; 

// Define a type for the validation result for clarity
export type FileValidationResult =
  | { success: true; file: File }
  | { success: false; error: string };

export function validateFile(file: File | null): FileValidationResult {
  if (!file) {
    return { success: false, error: "No file selected." };
  }

  const validatedFile = schema.safeParse({ file });

  if (!validatedFile.success) {
    const fileError = validatedFile.error.flatten().fieldErrors.file?.[0];
    return {
      success: false,
      error: fileError || "Please select a valid PDF file.",
    };
  }

  return { success: true, file: validatedFile.data.file };
}
