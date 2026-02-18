import Groq from "groq-sdk";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompt";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateSummaryFromGroq = async (
  pdfText: string,
): Promise<{ summaryText: string }> => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: SUMMARY_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 4096,
    });

    const summaryText = chatCompletion.choices[0]?.message?.content;

    if (!summaryText) {
      throw new Error("Groq API response did not contain expected content.");
    }

    return { summaryText };
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error("RATE_LIMIT_EXCEED");
    }
    throw new Error(
      `Failed to generate summary with Groq: ${error.message || "Unknown error"}`,
    );
  }
};
