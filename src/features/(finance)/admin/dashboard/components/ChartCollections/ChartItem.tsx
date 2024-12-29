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
import { FC, memo } from "react";

interface ChartItemProps {
  data: any[];
  chartConfig: ChartConfig;
  keys: string[];
  title: string;
}

const ChartItem: FC<ChartItemProps> = memo(
  ({ data, chartConfig, keys, title }) => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
            <BarChart accessibilityLayer data={data} key={`${title}-${data.length}`}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                dataKey="desktop"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />

              {keys.map((key) => (
                <Bar dataKey={key} fill={`var(--color-${key})`} radius={4} />
              ))}
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  }
);

export default ChartItem;
