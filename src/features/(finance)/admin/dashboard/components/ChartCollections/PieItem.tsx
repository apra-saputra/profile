import { formatCurrency } from "@/features/(finance)/commons/utils/functions/formatCurrency";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/features/commons/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/features/commons/components/ui/chart";
import { Skeleton } from "@/features/commons/components/ui/skeleton";
import { FC, useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

interface PieItemProps {
  data: any[];
  chartConfig: ChartConfig;
  title: string;
  keys: string[];
  isLoading: boolean;
}

const PieItem: FC<PieItemProps> = ({
  data,
  title,
  chartConfig,
  keys,
  isLoading,
}) => {
  const totalMoney = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.value, 0);
  }, [data.length]);

  if (isLoading) {
    return (
      <Card className="flex flex-col gap-4">
        <CardHeader className="items-center">
          <Skeleton className="w-1/3 h-10" />
        </CardHeader>
        <CardContent className="grid grid-cols-3 items-center h-full">
          <div className="space-y-4">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>

          <Skeleton className="h-full rounded-full mx-auto aspect-square col-span-2" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 items-center h-full">
        <table className="table-auto border border-primary text-foreground">
          <tbody>
            {keys.map((key, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-slate-200 dark:bg-slate-700"
                    : "bg-gray-50 dark:bg-gray-700"
                }`}
              >
                <td className="p-2 text-sm">{key}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px] col-span-2"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={80}
              outerRadius={120}
              strokeWidth={20}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {formatCurrency(totalMoney)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          data
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PieItem;
