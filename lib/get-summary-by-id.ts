import { getDBConnection } from "@/lib/db";
import { GetSummaryByIdResult } from "@/types/summary";

export default async function getSummaryById(
  summaryId: string
): Promise<GetSummaryByIdResult> {
  if (!summaryId) {
    return {
      success: false,
      message: "No summary ID provided. Please try again.",
      data: null,
    };
  }

  try {
    const sql = await getDBConnection();
    const [summary] =
      await sql`SELECT * FROM pdf_summaries WHERE id = ${summaryId}`;

    if (!summary) {
      return {
        success: false,
        message: "Summary not found.",
        data: null,
      };
    }

    return {
      success: true,
      data: {
        id: summary.id,
        user_id: summary.user_id,
        file_name: summary.file_name,
        title: summary.title,
        summary_text: summary.summary_text,
        original_file_url: summary.original_file_url,
        status: summary.status,
        created_at: summary.created_at,
        updated_at: summary.updated_at,
      },
    };
  } catch (error) {
    console.error("Error fetching summary:", error);
    return {
      success: false,
      message: "An error occurred while fetching the summary.",
      data: null,
    };
  }
}
