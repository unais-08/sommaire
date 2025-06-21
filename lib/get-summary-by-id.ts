import { getDBConnection } from "./db";

export default async function getSummaryById(summaryId: string) {
  // Validate the summary ID.
  if (!summaryId) {
    return {
      success: false,
      message: "No summary ID provided. Please try again.",
      data: null,
    };
  }

  try {
    const sql = await getDBConnection();
    // Step 1: Prepare the SQL query to fetch the summary by ID.
    const [summary] = `SELECT * FROM pdf_summaries WHERE id = ${summaryId}`;
    return summary;
  } catch (error) {
    console.error("Error fetching summary:", error);
    return {
      success: false,
      message: "An error occurred while fetching the summary.",
      data: null,
    };
  }
}
