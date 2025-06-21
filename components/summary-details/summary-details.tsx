import { SummaryHeader } from "@/components/summary-details/summary-header";
import { SummaryContentCard } from "@/components/summary-details/summary-reel";
import { SummaryTitleSection } from "@/components/summary-details/summary-title";
import { SummaryActions } from "@/components/summary-details/summary-action";
import { SummaryDetailPageProps } from "@/types/summary";

export default function SummaryDetailPage({ summary }: SummaryDetailPageProps) {
  // Mock data for demonstration
  const summaryData = {
    title: "Next.js Hot Tips Cheatsheet",
    sourceLink: "https://example.com/nextjs-hot-tips-cheatsheet.pdf",
    wordsCount: 198,
    cardContent: {
      title: "Level Up Your Next.js Skills!",
      points: [
        "Master Next.js and build amazing web apps with this comprehensive course.",
        "Perfect for developers of all levels.",
      ],
    },
  };
  console.log(summary);
  const {
    id,
    user_id,
    file_name,
    title,
    summary_text,
    original_file_url,
    status,
    created_at,
    updated_at,
  } = summary;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-4xl mx-auto py-8">
        <SummaryHeader created_at={created_at} />
        <SummaryTitleSection title={title} />
        <SummaryActions
          file_name={file_name}
          sourceLink={original_file_url}
          wordsCount={summaryData.wordsCount}
          summary_text={summary_text}
        />
        <SummaryContentCard
          title={summaryData.cardContent.title}
          points={summaryData.cardContent.points}
        />
      </div>
    </div>
  );
}
