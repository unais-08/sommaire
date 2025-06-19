"use server";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import { getDBConnection } from "@/lib/db";

export async function deleteSummary(summaryId: string) {
  const sql = await getDBConnection();
  const user = await currentUser();
  if (!user) {
    throw new Error("User not authenticated.");
  }
  if (!sql) {
    throw new Error("Database connection failed.");
  }
  try {
    const result =
      await sql`DELETE FROM pdf_summaries WHERE id = ${summaryId} AND user_id = ${user.id} RETURNING id;`;

    if (result.length > 0) {
      revalidatePath("/dashboard");
      return {
        success: true,
        message: "Summary deleted successfully.",
      };
    }
    return {
      success: false,
      message: "Summary not found or you do not have permission to delete it.",
    };
  } catch (error) {
    console.error("Error deleting summary:", error);
    return {
      success: false,
      message: "An error occurred while deleting the summary.",
    };
  }
}
