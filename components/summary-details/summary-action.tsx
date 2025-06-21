import { FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Component for "View Original" and "Download Summary" buttons
export const SummaryActions = ({
  sourceLink,
  wordsCount,
}: {
  sourceLink: string;
  wordsCount: number;
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div className="flex gap-3 flex-wrap">
        <Button
          variant="outline"
          className="flex items-center border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
        >
          <ExternalLink className="h-4 w-4 mr-2" /> View Original
        </Button>
        <Button className="flex items-center bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md">
          <Download className="h-4 w-4 mr-2" /> Download Summary
        </Button>
      </div>
      <div className="text-sm text-gray-600 flex items-center gap-2 mt-2 md:mt-0">
        <FileText className="h-4 w-4 text-gray-500" />
        <a href={sourceLink} className="text-blue-600 hover:underline">
          Source: {sourceLink.split("/").pop()}
        </a>
        <span className="ml-4 font-semibold">{wordsCount} words</span>
      </div>
    </div>
  );
};
