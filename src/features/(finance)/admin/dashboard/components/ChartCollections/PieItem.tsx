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
import { FC, useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

interface PieItemProps {
  data: any[];
  chartConfig: ChartConfig;
  title: string;
  keys: string[];
}

const PieItem: FC<PieItemProps> = ({ data, title, chartConfig, keys }) => {
  const totalVisitors = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3">
        <table className="table-fixed border-collapse border border-gray-300">
          <tbody>
            {keys.map((key, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-2 text-sm text-gray-800 border border-gray-300">
                  {key}
                </td>
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
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={10}
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
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
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
