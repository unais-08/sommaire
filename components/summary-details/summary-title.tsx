export const SummaryTitleSection = ({ title }: { title: string }) => {
  return (
    <h1 className="text-3xl md:text-3xl font-bold mb-5 bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
      {title}
    </h1>
  );
};
