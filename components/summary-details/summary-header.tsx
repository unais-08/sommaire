import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SummaryHeader = () => {
  return (
    <div className="flex items-center justify-between text-sm text-gray-500 mb-6 flex-wrap gap-2">
      <div className="flex items-center space-x-4">
        <span className="font-semibold text-gray-700">AI Summary</span>
        <span className="flex items-center">
          <svg
            className="w-4 h-4 mr-1 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h.01M7 12h.01M11 12h.01M15 12h.01M17 12h.01M8 16h.01M12 16h.01M16 16h.01M9 19h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
          January 25, 2025
        </span>
        <span className="flex items-center">
          <svg
            className="w-4 h-4 mr-1 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          1 min read
        </span>
      </div>
      <Button
        variant="ghost"
        className="text-white px-3 py-1 rounded-md text-sm"
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Dashboard
      </Button>
    </div>
  );
};
