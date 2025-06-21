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
  // Generate the clean preview text for the dashboard card
  const previewText = summary.summary_text;

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
            {/* Displaying a clean title, potentially extracting from summary.summary_text if summary.title is not clean */}
            {summary.title && summary.title.length > 35
              ? summary.title.slice(0, 30) + "..."
              : summary.title || "Untitled Summary"}
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
            {previewText || "No preview available."}{" "}
            {/* Use the cleaned previewText */}
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
