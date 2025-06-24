"use client";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Define how many points per slide/page you want to display
const POINTS_PER_PAGE = 1; // We want to display one "point" (title + its content) per slide

// Component for the main content card with carousel/pagination
export const SummaryContentCard = ({
  points,
}: {
  points: { title: string; content: string[] }[]; // Updated type to reflect content is an array of strings
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = points.length; // Each item in the 'points' array is a separate page
  const currentPoint = points[currentPage];

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  // Calculate progress value for the Progress bar (0-100)
  const progressValue =
    totalPages > 1 ? (currentPage / (totalPages - 1)) * 100 : 100;

  return (
    <Card className="relative p-8 sm:p-10 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col items-center max-w-xl mx-auto">
      <div className="flex flex-col items-center w-full">
        {/* Progress Bar at the upper side of the card */}
        <div className="w-full mb-6">
          {/* Increased mb for more space */}
          <Progress
            value={progressValue}
            className="w-full h-2.5 bg-gray-200 rounded-full" // Slightly thicker progress bar
          />
        </div>

        {/* Card Title Section */}
        <CardTitle className="text-2xl sm:text-4xl font-bold text-gray-900 mb-7 leading-tight text-center">
          {currentPoint
            ? currentPoint.title.startsWith("#")
              ? currentPoint.title.replace(/^#+\s*/, "")
              : currentPoint.title
            : "Summary"}
        </CardTitle>

        <CardContent className="w-full px-4 sm:px-6 text-left min-h-[160px] md:min-h-[200px] lg:min-h-[220px]">
          {/* Increased min-height for more content */}
          {/* Display bulleted content */}
          {currentPoint && currentPoint.content && (
            <ul className="list-none pl-0 space-y-3 text-lg text-gray-700 leading-relaxed">
              {/* Adjusted pl to 0, increased space-y, larger text, relaxed line height */}
              {currentPoint.content.map((item, index) => {
                // First, remove the leading "• " if it exists
                let formattedItem = item.startsWith("• ")
                  ? item.substring(2)
                  : item;
                // Then, replace all " • " with "<br />"
                formattedItem = formattedItem.replace(/ • /g, "<br />");

                return (
                  <li
                    className="list-none"
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: formattedItem.replace(
                        /<br \/>/g,
                        "<br /><span style='display:block; height:0.8em;'></span>"
                      ),
                    }}
                  ></li>
                );
              })}
            </ul>
          )}
        </CardContent>

        <CardFooter className="flex flex-col w-full pt-8">
          {" "}
          {/* Increased pt for more space */}
          {/* Pagination dots */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-5 mb-5 space-x-2.5">
              {" "}
              {/* Increased mt/mb and space-x */}
              {Array.from({ length: totalPages }).map((_, index) => (
                <span
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ease-in-out ${
                    // Slightly larger dots, smoother transition
                    index === currentPage
                      ? "bg-rose-600 shadow-md" // Darker rose for active, subtle shadow
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                ></span>
              ))}
            </div>
          )}
          {/* Navigation Buttons */}
          <div className="flex justify-between w-full max-w-md mx-auto mt-6">
            {" "}
            {/* Increased max-w and mt */}
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className="rounded-full h-14 w-14 border-2 border-rose-400 text-rose-600 hover:bg-rose-100 hover:border-rose-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 ease-in-out shadow-sm hover:shadow-md" // Larger, more prominent buttons, improved hover, subtle shadow
            >
              <ChevronLeft className="h-7 w-7" /> {/* Larger icon */}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1 || totalPages <= 1}
              className="rounded-full h-14 w-14 border-2 border-rose-400 text-rose-600 hover:bg-rose-100 hover:border-rose-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 ease-in-out shadow-sm hover:shadow-md" // Same for next button
            >
              <ChevronLeft className="h-7 w-7 rotate-180" /> {/* Larger icon */}
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};
