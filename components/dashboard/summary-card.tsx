import Link from "next/link";
import { FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import DeleteButton from "@/components/dashboard/delete-button";
import { StatusBadge } from "@/components/dashboard/status-bagde-helper";
import { SummaryType } from "@/types/summary"; // Assuming SummaryType correctly defines summary_text as string

export default function SummaryCard(summary: SummaryType) {
  // Strip markdown syntax for a clean preview on dashboard cards
  const cleanPreview = summary.summary_text
    ? summary.summary_text
        .replace(/^#{1,6}\s+/gm, "") // Remove headings (# ## ### etc.)
        .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold **text**
        .replace(/\*(.*?)\*/g, "$1") // Remove italic *text*
        .replace(/~~(.*?)~~/g, "$1") // Remove strikethrough
        .replace(/`{1,3}[^`]*`{1,3}/g, "") // Remove inline/block code
        .replace(/^[-*•]\s+/gm, "") // Remove bullet points
        .replace(/^\d+\.\s+/gm, "") // Remove numbered lists
        .replace(/^>\s+/gm, "") // Remove blockquotes
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // Remove links, keep text
        .replace(/---+/g, "") // Remove horizontal rules
        .replace(/\n{2,}/g, " ") // Collapse multiple newlines
        .replace(/\n/g, " ") // Replace newlines with space
        .replace(/\s{2,}/g, " ") // Collapse multiple spaces
        .trim()
    : "";

  // Also clean title from markdown
  const cleanTitle = summary.title
    ? summary.title
        .replace(/^#{1,6}\s+/gm, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/[*_~`]/g, "")
        .trim()
    : "Untitled Summary";

  return (
    <Card
      key={summary.id}
      className="relative flex flex-col justify-between rounded-lg shadow-sm border border-gray-200 bg-white text-gray-900 min-h-[250px] cursor-pointer"
    >
      <Link href={`/summaries/${summary.id}`} className="no-underline">
        {/* Card Header */}
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
            <FileText className="h-5 w-5 mr-2 text-gray-500" />
            {cleanTitle.length > 35
              ? cleanTitle.slice(0, 30) + "..."
              : cleanTitle}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(summary.created_at), {
              addSuffix: true,
            })}
          </CardDescription>
        </CardHeader>

        {/* Card Content - NOW USING THE CLEANED PREVIEW TEXT */}
        <CardContent className="flex-grow pt-1 pb-2">
          <p className="text-sm text-gray-700 line-clamp-3">
            {cleanPreview || "No preview available."}
          </p>
        </CardContent>
      </Link>

      {/* Card Footer */}
      <CardFooter className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
        <StatusBadge status={summary.status} />
        <DeleteButton summaryId={summary.id} />
      </CardFooter>
    </Card>
  );
}
