import { notFound } from "next/navigation";
import getSummaryById from "@/lib/get-summary-by-id";
import SummaryDetailPage from "@/components/summary-details/summary-details";
import { GetSummaryByIdResult } from "@/types/summary";

export default async function IndividualSummaryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: summaryId } = await params;
  const summary: GetSummaryByIdResult = await getSummaryById(summaryId);

  if (!summary || !summary.data) {
    return notFound();
  }
  // Render the summary details
  return <SummaryDetailPage summary={summary.data} />;
}
