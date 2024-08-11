import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/Chart";
import { MapPin } from "lucide-react";

import { formatRole } from "@/lib/formatRole";

const COLORS = {
  10: "#85CDFF",
  20: "#47B1FF",
  30: "#0077FF",
  40: "#364F7C",
};

export default function NationalityChart({ roles }) {
  const chartData = roles.map((role) => ({
    value: role.value,
    amount: role.amount,
    percent: role.percent,
    fill: COLORS[role.value],
  }));

  const chartConfig = roles.reduce((config, role) => {
    config[role.value] = {
      label: formatRole(role.value),
    };
    return config;
  }, {});

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center">
            <MapPin className="mr-4" />
            Roles
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
