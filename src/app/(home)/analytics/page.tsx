import AnalyticsCharts from "@/app/(home)/analytics/charts";
import { analyse } from "@/lib/vercel-blob";

export default async function Analytics() {
  const analysis = await analyse();

  return <AnalyticsCharts analysis={analysis} />;
}
