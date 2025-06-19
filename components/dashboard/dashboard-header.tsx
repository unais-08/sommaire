import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function DashboardHeader() {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Your Summaries
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Transform your PDFs into concise, actionable insights.
        </p>
      </div>
      <Link href="/upload">
        <Button className="bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white">
          <Plus className="w-4 h-4 mr-2" /> New Summary
        </Button>
      </Link>
    </div>
  );
}
export default DashboardHeader;
