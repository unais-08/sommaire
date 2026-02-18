import { SummaryHeader } from "@/components/summary-details/summary-header";
import { SummaryContentCard } from "@/components/summary-details/summary-reel";
import { SummaryTitleSection } from "@/components/summary-details/summary-title";
import { SummaryActions } from "@/components/summary-details/summary-action";
import { SummaryDetailPageProps } from "@/types/summary";
import BgGradient from "@/components/common/bg-gradient";

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
        point && !point.startsWith("#") && !point.startsWith("[Choose]"),
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
    <main className="min-h-screen">
      <BgGradient />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back & Meta */}
        <SummaryHeader created_at={created_at} wordsCount={wordsCount} />

        {/* Title */}
        <SummaryTitleSection title={title} fileName={file_name} />

        {/* Action buttons */}
        <SummaryActions
          file_name={file_name}
          sourceLink={original_file_url}
          summary_text={summary_text}
        />

        {/* Summary content carousel */}
        <SummaryContentCard points={pointsToDisplay} />
      </div>
    </main>
  );
}
