import { notFound } from "next/navigation";
import getSummaryById from "@/lib/get-summary-by-id";
import SummaryDetailPage from "@/components/summary-details/summary-details";

export default async function IndividualSummaryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const summary = await getSummaryById(id);

  if (!summary) {
    return notFound();
  }
  // Render the summary details
  return <SummaryDetailPage />;
}
