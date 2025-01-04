import { ChartConfig } from "@/features/commons/components/ui/chart";
import { ChartColumnDecreasing, ChartColumnIncreasing } from "lucide-react";
import ChartItem from "./ChartItem";
import PieItem from "./PieItem";
import { ComponentType, useMemo, useState } from "react";
import {
  fetchChartData,
  fetchPieData,
} from "@/features/(finance)/commons/services/dashboard";
import { useAuth } from "@/features/(finance)/commons/contexts/AuthContext";
import useFetchData from "@/features/(finance)/commons/hooks/useFetchData";

type ChartConfigItem = {
  color: string;
  label: string;
  icon: ComponentType;
};

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--accent))",
  "hsl(var(--chart-5))",
];

const ChartCollections = () => {
  const { user } = useAuth();

  // chart data
  const [chartData, setChartData] = useState([]);

  // pie data
  const [pieData, setPieData] = useState<{ name: string; value: number }[]>([]);

  // fetch
  const { isLoading: pieLoading } = useFetchData({
    data: pieData,
    setData: setPieData,
    fetch: async () => await fetchPieData(user?.id || ""),
  });

  const { isLoading: chartLoading } = useFetchData({
    data: chartData,
    setData: setChartData,
    fetch: async () => await fetchChartData(user?.id || ""),
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

  const { chartConfig, chartKeys } = useMemo(() => {
    let chartConfig: Record<string, ChartConfigItem> = {},
      keys: string[] = [];

    if (chartData.length > 0) {
      Object.keys(chartData[0])
        .filter((el) => el !== "month")
        .forEach((key, i) => {
          const index = i % 5;

          chartConfig[key] = {
            color: colors[index],
            label: key,
            icon:
              key === "highest" ? ChartColumnIncreasing : ChartColumnDecreasing,
          };
          keys.push(key);
        });
    }

    return { chartConfig: chartConfig satisfies ChartConfig, chartKeys: keys };
  }, [chartData.length]);

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-2">
      <ChartItem
        data={chartData}
        chartConfig={chartConfig}
        keys={chartKeys}
        title="Chart Data"
        isLoading={chartLoading}
      />
      <PieItem
        data={pieData}
        chartConfig={pieConfig}
        title="Pie Data"
        keys={pieKeys}
        isLoading={pieLoading}
      />
    </div>
  );
};

export default ChartCollections;
