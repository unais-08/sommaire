import { FileText } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { SummaryType } from "@/app/(logged-in)/dashboard/page";
import { cn } from "@/lib/utils";
import DeleteButton from "@/components/dashboard/delete-button";
import { formatDistanceToNow } from "date-fns";

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full capitalize",
        status === "completed"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      )}
    >
      {status}
    </span>
  );
};

export default function SummaryCard(summary: SummaryType) {
  return (
    <Card
      key={summary.id}
      className="relative flex flex-col justify-between rounded-lg shadow-sm border border-gray-200 bg-white text-gray-900 min-h-[250px]"
    >
      {/* Card Header */}
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
          <FileText className="h-5 w-5 mr-2 text-gray-500" />
          {summary.title.length > 35
            ? summary.title.slice(0, 30) + "..."
            : summary.title || "Untitled Summary"}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(summary.created_at), {
            addSuffix: true,
          })}
        </CardDescription>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="flex-grow pt-1 pb-2">
        <p className="text-sm text-gray-700 line-clamp-3">
          {summary.summary_text}
        </p>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
        <StatusBadge status={summary.status} />
        <DeleteButton summaryId={summary.id} />
      </CardFooter>
    </Card>
  );
}

