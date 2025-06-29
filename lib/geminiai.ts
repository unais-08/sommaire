import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompt";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import the Gemini client library

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export const generateSummaryFromGemini = async (
  pdfText: string
): Promise<any> => {
  // Ensure the API key is available
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API Key is not configured.");
  }

  try {
    // Initialize the GoogleGenerativeAI client
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    // Changed model from 'gemini-pro' to 'gemini-2.0-flash' to resolve the 404 error
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Prepare the content for the generation request
    // The client library handles the role formatting implicitly for basic text generation
    const result = await model.generateContent([
      SUMMARY_SYSTEM_PROMPT, // System prompt as the first part
      `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`, // User content
    ]);

    // Access the response text. The client library provides a convenient way to get the text.
    const response = result.response;
    const summaryText = response.text();

    if (!summaryText) {
      throw new Error("Gemini API response did not contain expected content.");
    }

    return { summaryText: summaryText };
  } catch (error: any) {
    // The client library might wrap rate limit errors differently,
    // but we can still check for specific messages or error structures if they exist.
    // For now, we'll assume a generic error for non-429 issues or re-throw if it's a known RATE_LIMIT_EXCEED from a lower level.
    if (error.message && error.message.includes("429")) {
      // Simple check for status 429 in message
      throw new Error("RATE_LIMIT_EXCEED");
    } else {
      // console.error("Error generating summary with Gemini:", error.message);
      throw new Error(
        `Failed to generate summary with Gemini: ${
          error.message || "Unknown error"
        }`
      );
    }
  }
};
