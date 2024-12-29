import { ChartConfig } from "@/features/commons/components/ui/chart";
import { Monitor, Smartphone } from "lucide-react";
import ChartItem from "./ChartItem";
import PieItem from "./PieItem";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
    icon: Monitor,
  },
  mobile: {
    icon: Smartphone,
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const dataPie = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const pieConfig = {
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const ChartCollections = () => {
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-2">
      <ChartItem
        data={chartData}
        chartConfig={chartConfig}
        keys={Object.keys(chartConfig)}
        title="Chart Data"
      />
      <PieItem data={dataPie} chartConfig={pieConfig} title="Pie Data" keys={Object.keys(pieConfig)} />
    </div>
  );
};

export default ChartCollections;
