"use client";
import { useState } from "react"; // Import useState for managing slide state
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // Import the Progress component

// Define how many points per slide/page you want to display
const POINTS_PER_PAGE = 3; // You can adjust this value

// Component for the main content card with carousel/pagination
export const SummaryContentCard = ({
  title,
  points, // points will be an array of strings
}: {
  title: string;
  points: string[];
}) => {
  const [currentPage, setCurrentPage] = useState(0); // State to track the current page/slide

  // Calculate the total number of pages needed
  const totalPages = Math.ceil(points.length / POINTS_PER_PAGE);

  // Get the points for the current page
  const startIndex = currentPage * POINTS_PER_PAGE;
  const endIndex = startIndex + POINTS_PER_PAGE;
  const currentPoints = points.slice(startIndex, endIndex);

  // Handle navigation
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  // Calculate progress value for the Progress bar (0-100)
  const progressValue = (currentPage / (totalPages - 1)) * 100 || 0; // Handle single page case

  return (
    <Card className="relative p-6 sm:p-8 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {" "}
      {/* Added more padding for sm, rounded-xl */}
      <div className="flex flex-col items-center">
        {/* Progress Bar at the upper side of the card */}
        <div className="w-full mb-6">
          {" "}
          {/* Margin below progress bar */}
          <Progress
            value={progressValue}
            className="w-full h-2 rounded-full bg-gray-200"
          />
        </div>

        <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center text-center leading-snug">
          {" "}
          {/* Adjusted font size for sm, added leading-snug */}
          <span
            role="img"
            aria-label="rocket"
            className="mr-3 text-3xl sm:text-4xl"
          >
            {" "}
            {/* Adjusted rocket size */}
            🚀
          </span>
          {title}
        </CardTitle>

        <CardContent className="w-full px-2 sm:px-4 text-center min-h-[150px]">
          {" "}
          {/* Added padding, min-height for consistent card size */}
          {currentPoints.length > 0 ? (
            currentPoints.map((point, index) => (
              <div key={index} className="flex items-start text-left mb-4">
                {" "}
                {/* Increased margin-bottom for points */}
                <span className="text-green-500 mr-2 mt-1 shrink-0">
                  ✔
                </span>{" "}
                {/* Checkmark icon, shrink-0 to prevent squishing */}
                <p className="text-gray-700 text-base sm:text-lg flex-1 leading-relaxed">
                  {" "}
                  {/* Adjusted text size for sm, added leading-relaxed */}
                  {point}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No points to display yet.
            </p>
          )}
        </CardContent>

        <CardFooter className="flex flex-col w-full pt-4">
          {/* Pagination dots (optional, replaced by Progress for simplicity matching screenshot) */}
          {/* If you still want dots AND progress, you can keep this:
          <div className="flex justify-center items-center mt-4 mb-4 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentPage ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
          */}

          {/* Navigation Buttons */}
          <div className="flex justify-between w-full max-w-sm mx-auto mt-4">
            {" "}
            {/* max-w-sm and mx-auto for centering on larger screens */}
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className="rounded-full h-12 w-12 border-2 border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" /* Increased size, border, added disabled styles */
            >
              <ChevronLeft className="h-6 w-6" /> {/* Increased icon size */}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1 || totalPages <= 1}
              className="rounded-full h-12 w-12 border-2 border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" /* Increased size, border, added disabled styles */
            >
              <ChevronLeft className="h-6 w-6 rotate-180" />{" "}
              {/* Increased icon size */}
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};
