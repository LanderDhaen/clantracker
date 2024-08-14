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
  ReferenceLine,
  Label,
  LabelList,
} from "recharts";

import { formatMonth } from "@/lib/formatMonth";

export default function DamageChart({ performances, statistics }) {
  const { year, avgStars, avgDamage, totalStars, totalDamage, totalAttacks } =
    statistics;

  const data = performances.map((performance) => ({
    date: formatMonth(performance.month),
    avgDamage: performance.avgDamage,
  }));

  return (
    <Card
      className={`flex flex-col w-full h-full shadow-lg rounded-3xl`}
      x-chunk="charts-01-chunk-0"
    >
      <CardHeader className="space-y-0 pb-2">
        <CardTitle className="text-4xl tabular-nums">
          {avgDamage}%{" "}
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            per attack in {year}
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
            <Line
              type="monotone"
              dataKey="avgDamage"
              stroke="black"
              activeDot={{ r: 8 }}
            >
              <LabelList
                dataKey="avgDamage"
                position="top"
                offset={10}
                fill="black"
                fontSize={12}
                formatter={(value) => `${value}%`}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <CardDescription>
          In {year}, you caused{" "}
          <span className="font-medium text-foreground">{totalDamage}</span>{" "}
          damage in{" "}
          <span className="font-medium text-foreground">{totalAttacks}</span>{" "}
          attacks!
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
