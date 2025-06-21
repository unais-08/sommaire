import { redirect } from "next/navigation";
import EmptySummary from "@/components/dashboard/empty-summary";
import SummaryCard from "@/components/dashboard/summary-card";
import BgGradient from "@/components/common/bg-gradient";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import { currentUser } from "@clerk/nextjs/server";
import { getSummaries } from "@/lib/summaries";
import { SummaryType } from "@/types/summary";


export default async function DashboardPage() {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/sign-in");
  }

  const summaries: SummaryType[] = await getSummaries(user.id);

  return (
    <main className="min-h-screen px-8 py-10">
      <BgGradient />
      {summaries.length > 0 ? (
        <div className="container mx-auto">
          <DashboardHeader />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {summaries.map((summary) => (
              <SummaryCard
                {...summary}
                key={summary.user_id ? summary.user_id : summary.id}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptySummary />
      )}
    </main>
  );
}
