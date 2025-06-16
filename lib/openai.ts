import OpenAI from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompt";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateSummaryFromOpenAI = async (pdfText: any) => {
  try {
    const response = await client.responses.create({
      model: "gpt-3.5-turbo",
      input: [
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
    });

    return response.output_text;
  } catch (error: any) {
    if (error?.status === 429) {
      // console.error("Rate limit exceeded. Please try again later.");
      throw new Error("RATE_LIMIT_EXCEED");
    } else {
      // console.error("Error generating summary:", error.message);
      throw new Error("Failed to generate summary from OpenAI");
    }
  }
};
