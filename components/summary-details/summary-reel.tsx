"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SummaryContentCard = ({
  points,
}: {
  points: { title: string; content: string[] }[];
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = points.length;
  const currentPoint = points[currentPage];

  const goToNextPage = () =>
    setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
  const goToPrevPage = () => setCurrentPage((p) => Math.max(p - 1, 0));

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${totalPages > 1 ? ((currentPage + 1) / totalPages) * 100 : 100}%`,
            }}
          />
        </div>
        <span className="text-xs font-medium text-gray-400 tabular-nums whitespace-nowrap">
          {currentPage + 1} / {totalPages}
        </span>
      </div>

      {/* Content card */}
      <div className="relative bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {/* Decorative top accent */}
        <div className="h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600" />

        <div className="p-6 sm:p-8 lg:p-10">
          {/* Section title */}
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 leading-snug">
            {currentPoint
              ? currentPoint.title.replace(/^#+\s*/, "")
              : "Summary"}
          </h2>

          {/* Content */}
          <div className="min-h-[180px] sm:min-h-[220px]">
            {currentPoint?.content && currentPoint.content.length > 0 ? (
              <ul className="space-y-4">
                {currentPoint.content.map((item, index) => {
                  let formattedItem = item.startsWith("• ")
                    ? item.substring(2)
                    : item;
                  formattedItem = formattedItem.replace(
                    / • /g,
                    '<br /><span style="display:block;height:0.5em;"></span>',
                  );

                  return (
                    <li key={index} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                      <span
                        className="text-gray-600 leading-relaxed text-[15px]"
                        dangerouslySetInnerHTML={{ __html: formattedItem }}
                      />
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm italic">
                No content for this section.
              </p>
            )}
          </div>
        </div>

        {/* Navigation footer */}
        {totalPages > 1 && (
          <div className="border-t border-gray-50 px-6 sm:px-8 py-4 flex items-center justify-between bg-gray-50/50">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {points.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentPage
                      ? "w-6 h-2 bg-rose-500"
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className="h-9 w-9 rounded-full border-gray-200 text-gray-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 disabled:opacity-30 transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
                className="h-9 w-9 rounded-full border-gray-200 text-gray-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 disabled:opacity-30 transition-all"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
