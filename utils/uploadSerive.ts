import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";

// Define types for clarity
export type UploadResponse = {
  ufsUrl: string;
  name: string;
};

export type UploadResult =
  | { success: true; data: UploadResponse[] }
  | { success: false; error: string };

export function useFileUploadService() {
  const { startUpload } = useUploadThing("pdfRouter", {
    onClientUploadComplete: () => {
      console.log("✅ Upload complete!");
    },
    onUploadError: (error) => {
      console.error("Upload failed:", error);
    },
    onUploadBegin: (fileName: string) => {
      // This toast shows progress during the actual file transfer
      console.log(`📤 Uploading file: ${fileName}`);
    },
  });

  const uploadFile = async (file: File): Promise<UploadResult> => {
    try {
      const uploadResponse = await startUpload([file]);
      if (!uploadResponse || uploadResponse.length === 0) {
        return {
          success: false,
          error: "Upload failed or no response received from UploadThing.",
        };
      }
      return { success: true, data: uploadResponse as UploadResponse[] };
    } catch (error: any) {
      console.error("File upload service error:", error);
      return {
        success: false,
        error: error.message || "An error occurred during file upload.",
      };
    }
  };

  return { uploadFile };
}
