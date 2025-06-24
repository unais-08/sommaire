import { SummaryHeader } from "@/components/summary-details/summary-header";
import { SummaryContentCard } from "@/components/summary-details/summary-reel";
import { SummaryTitleSection } from "@/components/summary-details/summary-title";
import { SummaryActions } from "@/components/summary-details/summary-action";
import { SummaryDetailPageProps } from "@/types/summary";

type Section = string;

const parseSection = (section: Section) => {
  const lines = section.split("\n");
  const title = lines[0];
  const contentLines = lines.slice(1);

  const cleanTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  const points: string[] = [];
  let currentPoints = "";

  contentLines.forEach((line: string) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith(".")) {
      if (currentPoints) points.push(currentPoints.trim());
      currentPoints = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoints) points.push(currentPoints.trim());
      currentPoints = "";
    } else {
      currentPoints += " " + trimmedLine;
    }
  });
  if (currentPoints) points.push(currentPoints.trim());

  return {
    title: cleanTitle,
    content: points.filter(
      (point) =>
        point && !point.startsWith("#") && !point.startsWith("[Choose]")
    ),
  };
};

export default function SummaryDetailPage({ summary }: SummaryDetailPageProps) {
  const { file_name, title, summary_text, original_file_url, created_at } =
    summary;

  const pointsToDisplay = summary_text
    .split("\n#")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  const wordsCount = summary_text
    ? summary_text.split(/\s+/).filter((word) => word.length > 0).length
    : 0;
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-2">
      <div className="max-w-4xl mx-auto py-8 lg:py-0">
        {/* This div should wrap all content after the header */}
        <SummaryHeader created_at={created_at} />
        {/* Header is now inside the max-w-4xl for consistent width */}
        <SummaryTitleSection title={title} />
        <SummaryActions
          file_name={file_name}
          sourceLink={original_file_url}
          wordsCount={wordsCount} // Keep this mock for now if not available in `summary`
          summary_text={summary_text}
        />
        <SummaryContentCard points={pointsToDisplay} />
      </div>
    </div>
  );
}
