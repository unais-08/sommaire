"use server";

import { getDBConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
/**
 * Generates a summary from a PDF file.
 * It first extracts text using Langchain, then attempts to summarize with Gemini.
 * If Gemini hits a rate limit, it falls back to OpenAI for summarization.
 *
 * @param uploadResponse - An object containing server data about the uploaded file.
 * @returns An object indicating success or failure, with a message and the summary data.
 */

interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePDFSummary(uploadResponse: {
  serverData: {
    userId: string;
    file: {
      url: string;
      name: string;
    };
  };
}) {
  // Validate the initial upload response.
  if (!uploadResponse) {
    return {
      success: false,
      message: "No PDF file information provided. Please try uploading again.",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse;

  // Validate essential extracted file details.
  if (!userId || !pdfUrl || !fileName) {
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

    // Step 2: Attempt to generate summary using Gemini (primary AI model).
    try {
      summary = await generateSummaryFromGemini(pdfText);
      console.log("Summary generated successfully using Gemini.");
    } catch (error: any) {
      // Check if the error from Gemini is a rate limit exceed issue.
      if (error.message && error.message.includes("RATE_LIMIT_EXCEED")) {
        console.warn(
          "Gemini API rate limit exceeded. Attempting fallback to OpenAI."
        );
        // Step 3: Fallback to OpenAI if Gemini is rate-limited.
        try {
          summary = await generateSummaryFromOpenAI(pdfText);
          console.log(
            "Summary generated successfully using OpenAI (fallback)."
          );
        } catch (openaiError: any) {
          // If OpenAI fallback also fails, log and re-throw the error to the outer catch.
          console.error("OpenAI fallback failed:", openaiError);
          throw new Error(
            `OpenAI fallback failed: ${openaiError.message || "unknown error."}`
          );
        }
      } else {
        // For any other error from Gemini (not rate limit), log and re-throw to the outer catch.
        console.error("Error from Gemini API:", error);
        throw new Error(
          `Gemini API call failed: ${error.message || "unknown error."}`
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
    await sql`INSERT INTO pdf_summaries (
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
  );`;
    return {
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
}: PdfSummaryType) {
  //user is must logged in to store a PDF summary
  //save the pdf
  let savedSummary: PdfSummaryType | null = null;
  try {
    const { userId } = await auth();
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
