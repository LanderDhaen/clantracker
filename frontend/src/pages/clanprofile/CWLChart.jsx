import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/Chart";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  LabelList,
} from "recharts";

import { formatMonth } from "@/lib/formatMonth";

import { Swords } from "lucide-react";

export default function CWLChart({ leagues, statistics }) {
  const { year, promotions, safe, demotions } = statistics;

  const data = leagues.map((league) => ({
    date: formatMonth(league.month),
    placement: league.placement,
  }));

  return (
    <Card
      className="flex flex-col w-full h-full shadow-lg rounded-3xl"
      x-chunk="charts-01-chunk-0"
    >
      <CardContent className="flex-1">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center">
              <Swords className="mr-4" />
              CWL {year}
            </div>
          </CardTitle>
        </CardHeader>
        <ChartContainer
          config={{
            performances: {
              label: "League",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <LineChart
            width="100%"
            data={data}
            margin={{
              left: 30,
              top: 30,
              right: 30,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              label={{ value: "Month", position: "bottom" }}
            />
            <YAxis
              type="number"
              reversed
              domain={[1, 8]}
              tickCount={8}
              hide={true}
            />
            <Line
              type="monotone"
              dataKey="placement"
              stroke="black"
              activeDot={{ r: 8 }}
            >
              <LabelList
                dataKey="placement"
                position="top"
                offset={10}
                fill="black"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <CardDescription>
          In {year}, this clan had {promotions}{" "}
          {promotions === 1 ? "promotion" : "promotions"}, {safe}{" "}
          {safe === 1 ? "safe placement" : "safe placements"}, and {demotions}{" "}
          {demotions === 1 ? "demotion" : "demotions"}.
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
