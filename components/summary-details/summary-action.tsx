"use client";
import { FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Component for "View Original" and "Download Summary" buttons

interface SummaryActionsProps {
  sourceLink: string;
  wordsCount: number;
  file_name: string;
  summary_text: string;
}

export const SummaryActions = ({
  sourceLink,
  wordsCount,
  file_name,
  summary_text,
}: SummaryActionsProps) => {
  const handleDownload = () => {
    const content = `File: ${file_name}\n\n${summary_text}\n\Generated Using Sommaire-AI`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file_name.replace(/\.[^/.]+$/, "")}-summary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div className="flex gap-3 flex-wrap">
        <Button
          variant="outline"
          className="flex items-center border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
          onClick={() => window.open(sourceLink, "_blank")}
        >
          <ExternalLink className="h-4 w-4 mr-2" /> View Original
        </Button>
        <Button
          className="flex items-center bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          Download Summary
        </Button>
      </div>
      <div className="text-sm text-gray-600 flex items-center gap-2 mt-2 md:mt-0">
        <FileText className="h-4 w-4 text-gray-500" />
        <span className="text-blue-600 hover:underline cursor-pointer">
          Source: {file_name}
        </span>
        <span className="ml-4 font-semibold">{wordsCount} words</span>
      </div>
    </div>
  );
};
