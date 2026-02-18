import { FileText } from "lucide-react";

export const SummaryTitleSection = ({
  title,
  fileName,
}: {
  title: string;
  fileName: string;
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent leading-tight">
        {title}
      </h1>
      <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
        <FileText className="w-4 h-4 text-gray-400" />
        <span className="truncate max-w-xs">{fileName}</span>
      </div>
    </div>
  );
};
