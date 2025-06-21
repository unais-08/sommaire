import React from "react";

import { SummaryHeader } from "@/components/summary-details/summary-header";
import { SummaryContentCard } from "@/components/summary-details/summary-reel";
import { SummaryTitleSection } from "@/components/summary-details/summary-title";
import { SummaryActions } from "@/components/summary-details/summary-action";

// --- Main Page Component ---
export default function SummaryDetailPage() {
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-4xl mx-auto py-8">
        <SummaryHeader />
        <SummaryTitleSection title={summaryData.title} />
        <SummaryActions
          sourceLink={summaryData.sourceLink}
          wordsCount={summaryData.wordsCount}
        />
        <SummaryContentCard
          title={summaryData.cardContent.title}
          points={summaryData.cardContent.points}
        />
      </div>
    </div>
  );
}
