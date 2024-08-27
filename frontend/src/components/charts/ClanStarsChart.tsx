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

import { CWLDetail } from "@/api/cwl";
import { Star } from "lucide-react";

interface ClanStarsChartProps {
  rounds: CWLDetail["rounds"];
}

export default function ClanStarsChart({ rounds }: ClanStarsChartProps) {
  return (
    <Card
      className="flex flex-col w-full h-full shadow-lg rounded-3xl"
      x-chunk="charts-01-chunk-0"
    >
      <CardHeader>
        <CardTitle>
          <div className="flex items-center">
            <Star className="mr-4" />
            Stars
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer
          config={{
            rounds: {
              label: "Round",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <LineChart
            data={rounds}
            margin={{
              left: 30,
              top: 30,
              right: 30,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              label={{ value: "CWL Day", position: "bottom" }}
            />
            <Line
              type="monotone"
              dataKey="stars"
              stroke="black"
              activeDot={{ r: 8 }}
            >
              <LabelList
                dataKey="stars"
                position="top"
                offset={10}
                fill="black"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
