"use client";

import useBlobDetails from "@/hooks/useBlobDetails";
import PageHeader from "@/components/page-header";
import Loader from "@/components/ui/loader/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import { Analytics } from "@/context/types";

const barChartConfig = {
  size: {
    label: "Volume",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const areaChartConfig = {
  volume: {
    label: "Total bytes",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface AnalyticsChartsProps {
  analysis: Analytics;
}

export default function AnalyticsCharts({ analysis }: AnalyticsChartsProps) {
  const { data, error, loading } = useBlobDetails();

  const donutChartConfig = analysis.summaryByExtension.reduce(
    (cfg: ChartConfig, { extension }, index, arr) => {

      let hueDelta = Math.trunc(360 / arr.length);

      cfg[extension] = {
        label: extension.toUpperCase(),
        color: index < 5 ? `hsl(var(--chart-${index + 1}))` : `hsl(${hueDelta * index}, 50%, 55%)`,
      };

      return cfg;
    },
    {
      count: {
        label: "Files",
      },
    },
  );

  return (
    <>
      <PageHeader title="Analytics" />
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 flex-1 min-w-full">
        <section className="flex justify-around">
          {loading ? (
            <Loader />
          ) : error ? (
            <p>Alert: Error loading blobs: {error?.message} </p>
          ) : data ? (
            <div className="flex flex-col gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Files by type</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={donutChartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                  >
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie
                        data={analysis.summaryByExtension.map((e) => ({
                          ...e,
                          fill: `var(--color-${e.extension})`,
                        }))}
                        dataKey="count"
                        nameKey="extension"
                        innerRadius={60}
                      />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Volumes by extension</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={barChartConfig}>
                    <BarChart
                      accessibilityLayer
                      data={analysis.summaryByExtension}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="extension"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Bar dataKey="size" fill="var(--color-size)" radius={8} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Daily updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={areaChartConfig}>
                    <AreaChart
                      accessibilityLayer
                      data={analysis.volumeByDate}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                      />
                      <Area
                        dataKey="volume"
                        fill="var(--color-volume)"
                        fillOpacity={0.4}
                        stroke="var(--color-volume)"
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex justify-center items-center h-96 bg-blue-100">
              <div className="bg-blue-100 p-10 text-white">
                <p>Alert: Info: No data fetch.</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
