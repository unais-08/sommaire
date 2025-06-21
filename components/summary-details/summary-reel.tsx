import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

// Component for the main content card with carousel/pagination
export const SummaryContentCard = ({
  title,
  points,
}: {
  title: string;
  points: string[];
}) => {
  return (
    <Card className="relative p-6 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="flex flex-col items-center">
        <CardTitle className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center text-center">
          <span role="img" aria-label="rocket" className="mr-2 text-3xl">
            🚀
          </span>
          {title}
        </CardTitle>
        <CardContent className="w-full text-center">
          {points.map((point, index) => (
            <div key={index} className="flex items-start text-left mb-3">
              <span className="text-green-500 mr-2 mt-1">✔</span>{" "}
              {/* Checkmark icon */}
              <p className="text-gray-700 text-base flex-1">{point}</p>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col w-full pt-4">
          {/* Progress/Pagination dots for multiple pages if applicable */}
          <div className="flex justify-center items-center mt-4 mb-4 space-x-2">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>{" "}
            {/* Active dot */}
            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
            {/* Add more dots as needed for pagination */}
          </div>
          {/* Optional: Navigation buttons if this is a carousel */}
          <div className="flex justify-between w-full max-w-xs mt-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5 rotate-180" />
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};
