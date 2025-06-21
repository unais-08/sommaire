import { SummaryHeader } from "@/components/summary-details/summary-header";
import { SummaryContentCard } from "@/components/summary-details/summary-reel"; // Renamed to SummaryContentCard for clarity
import { SummaryTitleSection } from "@/components/summary-details/summary-title";
import { SummaryActions } from "@/components/summary-details/summary-action";
import { SummaryDetailPageProps } from "@/types/summary";
import { convertSummaryTextToPoints } from "@/utils/summary-text-to-point";

export default function SummaryDetailPage({ summary }: SummaryDetailPageProps) {
  // Mock data for demonstration - This will be replaced by actual summary data
  const summaryData = {
    title: "Next.js Hot Tips Cheatsheet",
    sourceLink: "https://example.com/nextjs-hot-tips-cheatsheet.pdf",

    cardContent: {
      title: "Level Up Your Next.js Skills!",
      points: [
        "Master Next.js and build amazing web apps with this comprehensive course.",
        "Perfect for developers of all levels.",
        "Learn the latest features and best practices in Next.js.",
        "Includes hands-on projects and real-world examples.",
        "Join a community of Next.js enthusiasts and get support.",
        "Start your Next.js journey today!",
        "Unlock the full potential of Next.js with our expert guidance.",
        "Stay updated with the latest trends and updates in the Next.js ecosystem.",
        "Transform your web development skills with Next.js.",
        "Get ready to impress with your Next.js knowledge and skills.",
      ],
    },
  };

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
        <SummaryContentCard
          title={summaryData.cardContent.title}
          points={pointsToDisplay}
        />
      </div>
    </div>
  );
}
