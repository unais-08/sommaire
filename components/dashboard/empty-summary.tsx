"use client";
import Link from "next/link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

function EmptySummary() {
  return (
    <div className="text-center py-20">
      <div className="flex flex-col items-center gap-4">
        <FileText className="h-16 w-16 text-gray-400" />
        <h3 className="text-xl font-semibold">No summaries yet</h3>
        <p className="text-sm text-gray-500">
          Upload your first PDF to get started with AI-powered summaries.
        </p>
        <Link href="/upload">
          <Button className="mt-4 text-white bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800">
            Create Your First Summary
          </Button>
        </Link>
      </div>
    </div>
  );
}
export default EmptySummary;
