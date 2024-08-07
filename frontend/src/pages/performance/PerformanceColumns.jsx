import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";

import { formatTownhall } from "@/lib/formatTownhall";

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/Tooltip";

import PerformanceToolTip from "./PerformanceToolTip";

import { cn } from "@/lib/utils";

export const columns = [
  {
    accessorKey: "account",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "townhall",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Townhall
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const townhall = getValue();
      const color = formatTownhall(townhall);

      return (
        <div className={"flex items-center justify-center"}>
          <span
            className={cn("w-2 h-2 bg-current rounded-full mr-2", color)}
          ></span>
          TH {townhall}
        </div>
      );
    },
    enableColumnFilters: true,
    filterFn: (row, columnId, filterTownhalls) => {
      if (filterTownhalls.length === 0) return true;
      const townhall = row.getValue(columnId);
      return filterTownhalls.includes(townhall);
    },
  },
  {
    accessorKey: "alltime.avgStars",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          All time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue, row }) => {
      const avgStars = getValue();
      const avgDamage = row.original.alltime.avgDamage;
      const stars = row.original.alltime.totalStars;
      const damage = row.original.alltime.totalDamage;
      const attacks = row.original.alltime.totalAttacks;
      return (
        <div className={"flex items-center justify-center"}>
          <span
            className={cn(
              "w-2 h-2 rounded-full mr-2",
              avgStars >= 2 ? "bg-green-500" : "bg-red-500"
            )}
          ></span>

          <PerformanceToolTip
            avgStars={avgStars}
            attacks={attacks}
            stars={stars}
            damage={damage}
            avgDamage={avgDamage}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "2024.avgStars",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          2024
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue, row }) => {
      const avgStars = getValue();
      const avgDamage = row.original[2024].avgDamage;
      const stars = row.original[2024].totalStars;
      const damage = row.original[2024].totalDamage;
      const attacks = row.original[2024].totalAttacks;

      if (avgStars === undefined) {
        return "-";
      }

      return (
        <div className={"flex items-center justify-center"}>
          <span
            className={cn(
              "w-2 h-2 rounded-full mr-2",
              avgStars >= 2 ? "bg-green-500" : "bg-red-500"
            )}
          ></span>

          <PerformanceToolTip
            avgStars={avgStars}
            attacks={attacks}
            stars={stars}
            damage={damage}
            avgDamage={avgDamage}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "2023.avgStars",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          2023
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue, row }) => {
      const avgStars = getValue();

      if (avgStars === undefined) {
        return "-";
      }

      const avgDamage = row.original[2023].avgDamage;
      const stars = row.original[2023].totalStars || 0;
      const damage = row.original[2023].totalDamage || 0;
      const attacks = row.original[2023].totalAttacks || 0;

      return (
        <div className={"flex items-center justify-center"}>
          <span
            className={cn(
              "w-2 h-2 rounded-full mr-2",
              avgStars >= 2 ? "bg-green-500" : "bg-red-500"
            )}
          ></span>
          <PerformanceToolTip
            avgStars={avgStars}
            attacks={attacks}
            stars={stars}
            damage={damage}
            avgDamage={avgDamage}
          />
        </div>
      );
    },
  },
];
