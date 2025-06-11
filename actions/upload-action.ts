"use server";

import { fetchAndExtractText } from "@/lib/langchain";

export async function generatePDFSummary(uploadResponse: {
  serverData: {
    userId: string;
    file: {
      url: string;
      name: string;
    };
  };
}) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "No upload response provided",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse;

  if (!userId || !pdfUrl || !fileName) {
    return {
      success: false,
      message: "Invalid upload response structure",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractText(pdfUrl);
    if (!pdfText) {
      return {
        success: false,
        message: "Failed to extract text from PDF",
        data: null,
      };
    }
    // Here you can implement your logic to generate a summary from the extracted text
    // For simplicity, let's assume we just return the text as the summary
    return {
      success: true,
      message: "PDF summary generated successfully",
      data: pdfText,
    };
  } catch (err) {
    console.error("Error generating PDF summary:", err);
    return {
      success: false,
      message: "Failed to generate PDF summary",
      data: null,
    };
  }
}
