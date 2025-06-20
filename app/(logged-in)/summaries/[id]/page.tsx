async function IndividualSummaryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>IndividualSummaryPage:{id}</div>;
}
export default IndividualSummaryPage;
