import { SummaryHeader } from "@/components/summary-details/summary-header";
import { SummaryContentCard } from "@/components/summary-details/summary-reel"; // Renamed to SummaryContentCard for clarity
import { SummaryTitleSection } from "@/components/summary-details/summary-title";
import { SummaryActions } from "@/components/summary-details/summary-action";
import { SummaryDetailPageProps } from "@/types/summary";
import { convertSummaryTextToPoints } from "@/utils/summary-text-to-point";

export default function SummaryDetailPage({ summary }: SummaryDetailPageProps) {
  const { file_name, title, summary_text, original_file_url, created_at } =
    summary;
  const pointsToDisplay = convertSummaryTextToPoints(summary_text || "");
  const wordsCount = summary_text
    ? summary_text.split(/\s+/).filter((word) => word.length > 0).length
    : 0;
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-4xl mx-auto py-8">
        {" "}
        {/* This div should wrap all content after the header */}
        <SummaryHeader created_at={created_at} />{" "}
        {/* Header is now inside the max-w-4xl for consistent width */}
        <SummaryTitleSection title={title} />
        <SummaryActions
          file_name={file_name}
          sourceLink={original_file_url}
          wordsCount={wordsCount} // Keep this mock for now if not available in `summary`
          summary_text={summary_text}
        />
        <SummaryContentCard title={title} points={pointsToDisplay} />
      </div>
    </div>
  );
}
