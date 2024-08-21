import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/Chart";
import { MapPin } from "lucide-react";
import { getClanByIDResponse } from "@backend-types/clan";
import { colorChart } from "@/lib/formatNationality";

interface NationalityChartProps {
  nationalities: getClanByIDResponse["nationalities"];
}

export default function NationalityChart({
  nationalities,
}: NationalityChartProps) {
  const chartData = nationalities.map((nationality) => ({
    value: nationality.value,
    amount: nationality.amount,
    fill: colorChart(nationality.value),
  }));

  const chartConfig = nationalities.reduce<ChartConfig>(
    (config, nationality) => {
      config[nationality.value] = {
        label: nationality.value,
      };
      return config;
    },
    {}
  );

  return (
    <Card className="flex flex-col w-full h-full shadow-lg rounded-3xl">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center">
            <MapPin className="mr-4" />
            Nationalities
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
                    {payload.amount}
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
