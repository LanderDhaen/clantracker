import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/Chart";
import { Home } from "lucide-react";

const COLORS = {
  1: "#FBD38D",
  2: "#FBD38D",
  3: "#FBD38D",
  4: "#FBD38D",
  5: "#FBD38D",
  6: "#FBD38D",
  7: "#FBD38D",
  8: "#FBD38D",
  9: "#B9B9B9",
  10: "#FC8181",
  11: "#F6E05E",
  12: "#90CDF4",
  13: "#3182CE",
  14: "#48BB78",
  15: "#9F7AEA",
  16: "#ED8936",
};

export default function TownhallChart({ townhalls }) {
  const chartData = townhalls.map((townhall) => ({
    value: townhall.value.toString(),
    amount: townhall.amount,
    fill: COLORS[townhall.value],
  }));

  const chartConfig = townhalls.reduce((config, townhall) => {
    config[townhall.value] = {
      label: "TH" + townhall.value,
    };
    return config;
  }, {});

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center">
            <Home className="mr-4" />
            Townhalls
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] w-full"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="amount"
              stroke="white"
              strokeWidth={2}
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="hsla(var(--foreground))"
                  >
                    {`${payload.amount}`}
                  </text>
                );
              }}
              nameKey="value"
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="value" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
