"use server";

import { getDBConnection } from "@/lib/db";
import { generateSummaryFromGroq } from "@/lib/groqai";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractText } from "@/lib/langchain";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

interface PdfSummaryType {
  summaryId?: string; // Optional ID for the summary, if needed
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

interface GeneratePDFSummaryResponse {
  success: boolean;
  message: string;
  data: string | null;
}
export interface storePDFSummaryActionResponse {
  success: boolean;
  message: string;
  data: PdfSummaryType | null;
}

export async function generatePDFSummary(uploadResponse: {
  serverData: {
    url: string;
    name: string;
  };
}): Promise<GeneratePDFSummaryResponse> {
  // Validate the initial upload response.
  if (!uploadResponse) {
    return {
      success: false,
      message: "No PDF file information provided. Please try uploading again.",
      data: null,
    };
  }

  const {
    serverData: { url: pdfUrl, name: fileName },
  } = uploadResponse;

  // Validate essential extracted file details.
  if (!pdfUrl || !fileName) {
    return {
      success: false,
      message:
        "Missing essential PDF file details (user ID, URL, or filename).",
      data: null,
    };
  }

  try {
    // Step 1: Extract text from the PDF using Langchain.
    const pdfText = await fetchAndExtractText(pdfUrl);
    if (!pdfText) {
      return {
        success: false,
        message:
          "Failed to extract readable text from the PDF. The file might be empty or corrupted.",
        data: null,
      };
    }

    let summary: string | null = null; // Initialize summary variable to null.

    // Step 2: Generate summary using Groq (primary, free tier).
    try {
      const groqResult = await generateSummaryFromGroq(pdfText);
      if (!groqResult?.summaryText) {
        throw new Error("Groq returned empty summary.");
      }
      summary = groqResult.summaryText;
      console.log("Summary generated successfully using Groq.");
    } catch (error: any) {
      console.warn("Groq failed:", error.message);

      // Step 3: Fallback to Gemini if Groq fails (e.g. rate limit).
      try {
        console.log("Falling back to Gemini...");
        const geminiResult = await generateSummaryFromGemini(pdfText);
        if (!geminiResult?.summaryText) {
          throw new Error("Gemini returned empty summary.");
        }
        summary = geminiResult.summaryText;
        console.log("Summary generated successfully using Gemini (fallback).");
      } catch (fallbackError: any) {
        console.error("Gemini fallback also failed:", fallbackError.message);
        throw new Error(
          `All AI models failed. Groq: ${error.message} | Gemini: ${fallbackError.message}`,
        );
      }
    }

    // Step 4: Final check if a summary was successfully generated from either model.
    if (!summary || summary.trim() === "") {
      return {
        success: false,
        message:
          "Summary generation failed. No content was returned from the AI models.",
        data: null,
      };
    }

    // Step 5: Return success response with the generated summary.
    return {
      success: true,
      message: "PDF summary generated successfully!",
      data: summary,
    };
  } catch (err: any) {
    // Catch any unexpected errors that occurred during the entire process (e.g., text extraction failure, AI model failures).
    console.error("Overall error during PDF summary generation:", err);
    return {
      success: false,
      message: `An unexpected error occurred during PDF summarization: ${
        err.message || "Please check server logs for more details."
      }`,
      data: null,
    };
  }
}

//This is helper functin for storePDFSummaryAction
export async function savePDFSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  //sql query to save the PDF summary
  //this is a placeholder function, implement your database logic here
  try {
    const sql = await getDBConnection();
    const result = await sql`
  INSERT INTO pdf_summaries (
    user_id,
    original_file_url,
    summary_text,
    title,
    file_name
  ) VALUES (
    ${userId},
    ${fileUrl},
    ${summary},
    ${title},
    ${fileName}
  )
  RETURNING id;
`;
    const summaryId = result[0]?.id;
    return {
      summaryId,
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    } as PdfSummaryType; // Return the saved summary object
  } catch (error) {
    console.error("Error saving PDF summary:", error);
    throw error;
  }
}

export async function storePDFSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType): Promise<storePDFSummaryActionResponse> {
  //user is must logged in to store a PDF summary
  //save the pdf
  let savedSummary: PdfSummaryType | null = null;
  try {
    const user = await getCurrentUser();
    const userId = user?.id;
    if (!userId) {
      return {
        success: false,
        message:
          "User is not authenticated. Please log in to store a PDF summary.",
        data: null,
      };
    }
    savedSummary = await savePDFSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });
    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save the PDF summary. Please try again later.",
        data: null,
      };
    }

    revalidatePath(`/summaries/${savedSummary.summaryId}`);

    // Optionally, you can return a success message here if needed
    return {
      success: true,
      message: "PDF summary stored successfully.",
      data: savedSummary,
    };
  } catch (error) {
    return {
      success: false,
      message: `An error occurred while storing the PDF summary: ${
        error instanceof Error
          ? error.message
          : "Please check server logs for more details."
      }`,
      data: null,
    };
  }
}
