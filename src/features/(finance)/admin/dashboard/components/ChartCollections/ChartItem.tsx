import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/features/commons/components/ui/chart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/features/commons/components/ui/card";
import { FC, memo, useMemo, useState } from "react";
import { Skeleton } from "@/features/commons/components/ui/skeleton";

interface ChartItemProps {
  data: any[];
  chartConfig: ChartConfig;
  keys: string[];
  title: string;
  isLoading: boolean;
}

const ChartItem: FC<ChartItemProps> = memo(
  ({ data, chartConfig, keys, title, isLoading }) => {
    const [activeIndex, setActiveIndex] = useState<number | undefined>(
      undefined
    );

    const onClick = (idx: number | undefined) => {
      setActiveIndex((state) => (!state && state !== idx ? idx : undefined));
    };

    const dataMemomize = useMemo(() => {
      if (activeIndex !== undefined) {
        return data.filter((_, i) => i === activeIndex);
      }
      return data;
    }, [activeIndex, data.length]);

    if (isLoading) {
      return (
        <Card>
          <CardHeader className="items-center">
            <Skeleton className="w-1/3 h-10" />
          </CardHeader>
          <CardContent className="grid grid-cols-4 items-center gap-4">
            <Skeleton className="h-[300px]" />
            <Skeleton className="h-[300px]" />
            <Skeleton className="h-[300px]" />
            <Skeleton className="h-[300px]" />
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader className="items-center">
          <CardTitle>{title} - {new Date().getFullYear()}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
            <BarChart
              accessibilityLayer
              title={title}
              data={dataMemomize}
              key={`${title}-${data.length}`}
              onClick={(e) => onClick(e.activeTooltipIndex)}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                dataKey="highest.value"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />

              {keys.map((key) => (
                <Bar
                  dataKey={`${key}.value`}
                  fill={`var(--color-${key})`}
                  radius={4}
                  key={key}
                />
              ))}
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  }
);

export default ChartItem;
