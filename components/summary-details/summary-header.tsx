import Link from "next/link";
import { Calendar, ChevronLeft, Clock, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SummaryHeader = ({
  created_at,
  wordsCount,
}: {
  created_at: string;
  wordsCount: number;
}) => {
  const readingTime = Math.max(1, Math.ceil(wordsCount / 200));

  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Back button */}
      <Link href="/dashboard">
        <Button
          variant="ghost"
          className="group flex items-center gap-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 px-3 py-2 -ml-3 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Dashboard
        </Button>
      </Link>

      {/* Meta info pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-gradient-to-r from-rose-500 to-rose-600 text-white px-3 py-1.5 rounded-full shadow-sm">
          <Sparkles className="w-3 h-3" />
          AI Summary
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
          <Calendar className="w-3 h-3" />
          {new Date(created_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
          <Clock className="w-3 h-3" />
          {readingTime} min read
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
          <FileText className="w-3 h-3" />
          {wordsCount.toLocaleString()} words
        </span>
      </div>
    </div>
  );
};
