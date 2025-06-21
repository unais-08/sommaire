export const SummaryTitleSection = ({ title }: { title: string }) => {
  return (
    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
      {title}
    </h1>
  );
};