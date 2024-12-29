import { ChartConfig } from "@/features/commons/components/ui/chart";
import { Monitor, Smartphone } from "lucide-react";
import ChartItem from "./ChartItem";
import PieItem from "./PieItem";
import { useMemo, useState } from "react";
import { fetchPieData } from "@/features/(finance)/commons/services/dashboard";
import { useAuth } from "@/features/(finance)/commons/contexts/AuthContext";
import useFetchData from "@/features/(finance)/commons/hooks/useFetchData";

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
    color: "hsl(var(--accent))",
    icon: Monitor,
  },
  mobile: {
    icon: Smartphone,
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--accent))",
  "hsl(var(--chart-5))",
];

const ChartCollections = () => {
  const { user } = useAuth();

  // pie data
  const [pieData, setPieData] = useState<{ name: string; value: number }[]>([]);

  // fetch
  useFetchData({
    data: pieData,
    setData: setPieData,
    fetch: async () => await fetchPieData(user?.id || ""),
  });

  const { pieConfig, pieKeys } = useMemo(() => {
    let category: Record<string, { [x: string]: string }> = {},
      keys: string[] = [];
    if (pieData.length > 0) {
      pieData.forEach((el, i) => {
        const index = i % 5;
        const label = el.name[0].toUpperCase() + el.name.slice(1);
        const key = label.replaceAll(/[^\w-]/g, "").replaceAll(" ", "-");

        category[key] = {
          color: colors[index],
          label: label,
        };
        keys.push(label);
      });
    }
    return { pieConfig: category satisfies ChartConfig, pieKeys: keys };
  }, [pieData.length]);

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-2">
      <ChartItem
        data={chartData}
        chartConfig={chartConfig}
        keys={Object.keys(chartConfig)}
        title="Chart Data"
      />
      <PieItem
        data={pieData}
        chartConfig={pieConfig}
        title="Pie Data"
        keys={pieKeys}
      />
    </div>
  );
};

export default ChartCollections;
