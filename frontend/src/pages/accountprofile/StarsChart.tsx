import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";

import { ChartContainer } from "@/components/ui/Chart";

import { LineChart, Line, XAxis, CartesianGrid, LabelList } from "recharts";

import { formatMonth } from "@/lib/formatMonth";
import { GetAccountDetailsByIDResponse } from "@backend-types/account";

interface StarsChartProps {
  statistics: GetAccountDetailsByIDResponse["statistics"][number];
  performances: GetAccountDetailsByIDResponse["performances"];
}

export default function StarsChart({
  performances,
  statistics,
}: StarsChartProps) {
  const { year, avgStars, totalStars, totalAttacks } = statistics;

  const data = performances.map((performance) => ({
    date: formatMonth(performance.month),
    avgStars: performance.avgStars,
  }));

  return (
    <Card
      className="flex flex-col w-full h-full shadow-lg rounded-3xl"
      x-chunk="charts-01-chunk-0"
    >
      <CardHeader className="space-y-0 pb-2">
        <CardTitle className="text-4xl tabular-nums">
          {avgStars}{" "}
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            stars per attack in {year}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer
          config={{
            performances: {
              label: "Performance",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <LineChart
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
            <Line
              type="monotone"
              dataKey="avgStars"
              stroke="black"
              activeDot={{ r: 8 }}
            >
              <LabelList
                dataKey="avgStars"
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
          In {year}, you have attacked{" "}
          <span className="font-medium text-foreground">{totalAttacks}</span>{" "}
          times gaining{" "}
          <span className="font-medium text-foreground">{totalStars}</span>{" "}
          stars!
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
