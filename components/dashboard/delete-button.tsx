"use client";
import { useState } from "react";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { deleteSummary } from "@/actions/summary-action";

export default function DeleteButton({ summaryId }: { summaryId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const result = await deleteSummary(summaryId);
      if (!result.success) {
        toast.error(result.message || "Failed to delete summary.");
        return;
      }
      setLoading(false);
      toast.success("Summary deleted successfully.");
      setOpen(false); // Close the dialog after deletion
    } catch (error) {
      setLoading(false);
      console.error("Failed to delete summary:", error);
      toast.error("An error occurred while deleting the summary.");
    } finally {
      setOpen(false); // Close the dialog even if deletion fails
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-gray-200 text-black border border-gray-200 hover:text-rose-50 hover:bg-rose-600 transition-colors duration-200"
            aria-label="Delete summary"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white text-gray-900 p-3 rounded-lg border border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Are you absolutely sure?
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 mt-2">
              This action cannot be undone. This will permanently delete your
              summary.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 mt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              className="flex-1 bg-rose-600 hover:bg-rose-700 text-white"
              onClick={handleDelete} // Replace with actual user ID and summary ID
              disabled={loading} // Disable button while loading
            >
              {loading ? <Loader2 /> : "Delete Summary"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
