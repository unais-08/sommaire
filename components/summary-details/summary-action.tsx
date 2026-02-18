"use client";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SummaryActionsProps {
  sourceLink: string;
  file_name: string;
  summary_text: string;
}

export const SummaryActions = ({
  sourceLink,
  file_name,
  summary_text,
}: SummaryActionsProps) => {
  const handleDownload = () => {
    const content = `File: ${file_name}\n\n${summary_text}\n\nGenerated Using Sommaire-AI`;
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
    <div className="flex items-center gap-3 mb-8 flex-wrap">
      <Button
        variant="outline"
        className="flex items-center gap-2 border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 rounded-lg px-4 py-2 text-sm transition-all"
        onClick={() => window.open(sourceLink, "_blank")}
      >
        <ExternalLink className="h-4 w-4" />
        View Original
      </Button>
      <Button
        className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-lg px-4 py-2 text-sm shadow-sm hover:shadow-md transition-all"
        onClick={handleDownload}
      >
        <Download className="h-4 w-4" />
        Download Summary
      </Button>
    </div>
  );
};
