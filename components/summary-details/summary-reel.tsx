"use client";
import { useState } from "react";
import { ChevronLeft } from "lucide-react"; // Imported Rocket for the title icon (if preferred over emoji)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Define how many points per slide/page you want to display
const POINTS_PER_PAGE = 4; // You can adjust this value based on your content density

// Component for the main content card with carousel/pagination
export const SummaryContentCard = ({
  title,
  points, // points will be an array of strings, now including leading emojis from Gemini
}: {
  title: string;
  points: string[];
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(points.length / POINTS_PER_PAGE);
  const startIndex = currentPage * POINTS_PER_PAGE;
  const endIndex = startIndex + POINTS_PER_PAGE;
  const currentPoints = points.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  // Calculate progress value for the Progress bar (0-100)
  // Ensures 0 for single page, and correctly scales for multiple pages.
  const progressValue =
    totalPages > 1 ? (currentPage / (totalPages - 1)) * 100 : 100;

  return (
    <Card className="relative p-6 sm:p-8 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="flex flex-col items-center w-full">
        {" "}
        {/* Ensure the inner div also takes full width */}
        {/* Progress Bar at the upper side of the card */}
        <div className="w-full mb-6">
          <Progress
            value={progressValue}
            className="w-full h-2 bg-gray-200 rounded-full" // Added full roundedness to the progress bar itself
          />
        </div>
        {/* Card Title Section */}
        <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex flex-col sm:flex-row items-center justify-center text-center leading-snug">
          {/* Removed the static rocket emoji to allow the title to be text-only if preferred,
              or you can re-add it if all titles must have it regardless of the summary points.
              If you want to keep a title icon, consider using a Lucide icon like <Rocket />
              or pass an emoji prop if the title itself should be dynamic with an emoji. */}
          {title}
        </CardTitle>
        {/* Card Content - Dynamic Points */}
        <CardContent className="w-full px-2 sm:px-4 text-center min-h-[150px] md:min-h-[180px] lg:min-h-[200px]">
          {currentPoints.length > 0 ? (
            currentPoints.map((point, index) => {
              // Assuming point string now starts with an emoji, e.g., "🚀 Master Next.js..."
              const firstChar = point.charAt(0);
              const isEmoji = /\p{Emoji}/u.test(firstChar); // Check if the first character is an emoji (requires 'u' flag for regex)
              const displayContent = isEmoji
                ? point.substring(1).trim()
                : point; // Content without the emoji
              const displayEmoji = isEmoji ? firstChar : null; // The emoji itself

              return (
                <div key={index} className="flex items-start text-left mb-4">
                  {/* Conditionally render the emoji extracted from the point, or a default if no emoji is present */}
                  {displayEmoji ? (
                    <span className="mr-2 mt-1 text-xl sm:text-2xl shrink-0">
                      {" "}
                      {/* Adjust emoji size */}
                      {displayEmoji}
                    </span>
                  ) : (
                    // Fallback or a default icon if you expect all points to have an emoji but some don't
                    <span className="text-green-500 mr-2 mt-1 shrink-0">✔</span>
                  )}
                  <p className="text-gray-700 text-base sm:text-lg flex-1 leading-relaxed">
                    {displayContent}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center py-10">
              No points to display yet. Please try summarizing again.
            </p>
          )}
        </CardContent>
        {/* Card Footer - Pagination */}
        <CardFooter className="flex flex-col w-full pt-4">
          {/* Re-added pagination dots based on your commented code, as they offer good visual feedback */}
          {totalPages > 1 && ( // Only show dots if there's more than one page
            <div className="flex justify-center items-center mt-4 mb-4 space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <span
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                    index === currentPage
                      ? "bg-rose-500"
                      : "bg-gray-300 hover:bg-gray-400" // Rose color for active dot
                  }`}
                ></span>
              ))}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between w-full max-w-sm mx-auto mt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className="rounded-full h-12 w-12 border-2 border-rose-300 text-rose-600 hover:bg-rose-50 hover:border-rose-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1 || totalPages <= 1}
              className="rounded-full h-12 w-12 border-2 border-rose-300 text-rose-600 hover:bg-rose-50 hover:border-rose-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft className="h-6 w-6 rotate-180" />
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};
