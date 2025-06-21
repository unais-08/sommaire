import { getDBConnection } from "@/lib/db";
import { SummaryType } from "@/types/summary";

export async function getSummaries(userId: string): Promise<SummaryType[]> {
  const sql = await getDBConnection();
  if (!sql) {
    throw new Error("Database connection failed.");
  }
  try {
    const summaries =
      await sql`SELECT * FROM pdf_summaries WHERE user_id = ${userId} ORDER BY created_at DESC;`;
    return summaries.map((row: any) => ({
      id: row.id,
      summary_text: row.summary_text,
      title: row.title,
      status: row.status,
      created_at: row.created_at,
    }));
  } catch (error) {
    console.error("Error fetching summaries:", error);
    throw new Error("Failed to fetch summaries.");
  }
}
