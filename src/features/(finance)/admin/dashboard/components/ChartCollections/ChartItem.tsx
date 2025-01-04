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

interface ChartItemProps {
  data: any[];
  chartConfig: ChartConfig;
  keys: string[];
  title: string;
}

const ChartItem: FC<ChartItemProps> = memo(
  ({ data, chartConfig, keys, title }) => {
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
    }, [activeIndex]);

    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
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
              <ChartLegend content={<ChartLegendContent />}  />

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
