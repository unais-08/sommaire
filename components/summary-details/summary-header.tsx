import Link from "next/link";
import { Calendar, ChevronLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming this is your shadcn/ui Button

export const SummaryHeader = ({ created_at }: { created_at: string }) => {
  return (
    <div
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between
                    bg-gradient-to-r from-rose-50 to-rose-100 rounded-lg p-4 shadow-md mb-8"
    >
      {" "}
      {/* Increased padding and shadow, margin-bottom */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {" "}
        {/* Increased gap for better spacing */}
        <span className="font-bold text-xl text-rose-700 flex items-center gap-2">
          {" "}
          {/* Increased text size */}
          {/* AI Icon - Recreated using Tailwind/SVG for direct styling */}
          <div className="relative w-7 h-7 rounded-full bg-rose-600 flex items-center justify-center mr-1">
            {" "}
            {/* Adjusted size and color */}
            <span className="text-white text-xs font-extrabold">AI</span>{" "}
            {/* Adjusted text size/weight */}
          </div>
          AI Summary
        </span>
        <div className="flex items-center gap-3">
          {" "}
          {/* Group date and time for better mobile wrapping */}
          <span className="flex items-center text-sm text-gray-700 bg-white/80 rounded-full px-3 py-1.5 shadow-sm">
            {" "}
            {/* Adjusted padding, text size, and background opacity */}
            <Calendar className="w-4 h-4 mr-1 text-rose-500" />
            {new Date(created_at).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
            {/* Removed time from this span as it's separate in the screenshot for "1 min read" */}
          </span>
          <span className="flex items-center text-sm text-gray-700 bg-white/80 rounded-full px-3 py-1.5 shadow-sm">
            {" "}
            {/* Adjusted padding, text size, and background opacity */}
            <Clock className="w-4 h-4 mr-1 text-rose-500" />1 min read
          </span>
        </div>
      </div>
      <Link href="/dashboard" className="mt-4 sm:mt-0">
        {" "}
        {/* Added margin-top for mobile spacing */}
        <Button
          variant="outline"
          className="flex items-center gap-1 border-rose-400 text-rose-600
                     hover:bg-rose-50 hover:text-rose-700 transition-colors duration-200
                     rounded-full px-4 py-2" // Rounded full, adjusted padding
        >
          <ChevronLeft className="h-4 w-4" /> Back to Dashboard
        </Button>
      </Link>
    </div>
  );
};
