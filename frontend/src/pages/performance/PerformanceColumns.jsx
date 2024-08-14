import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";
import { formatTownhall } from "@/lib/formatTownhall";
import { cn } from "@/lib/utils";
import PerformanceToolTip from "./PerformanceToolTip";

export const columns = [
  {
    accessorKey: "account",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Username
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "townhall",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Townhall
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const townhall = getValue();
      const color = formatTownhall(townhall);

      return (
        <div className="flex items-center justify-center">
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        All time
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue, row }) => {
      const avgStars = getValue();
      const avgDamage = row.original.alltime.avgDamage;
      const stars = row.original.alltime.totalStars;
      const damage = row.original.alltime.totalDamage;
      const attacks = row.original.alltime.totalAttacks;
      return (
        <div className="flex items-center justify-center">
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        2024
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const yearData = row.original.yearly.find((data) => data.year === 2024);

      if (!yearData) {
        return "-";
      }

      const { avgStars, avgDamage, totalStars, totalDamage, totalAttacks } =
        yearData;

      return (
        <div className="flex items-center justify-center">
          <span
            className={cn(
              "w-2 h-2 rounded-full mr-2",
              avgStars >= 2 ? "bg-green-500" : "bg-red-500"
            )}
          ></span>
          <PerformanceToolTip
            avgStars={avgStars}
            attacks={totalAttacks}
            stars={totalStars}
            damage={totalDamage}
            avgDamage={avgDamage}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "2023.avgStars",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        2023
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const yearData = row.original.yearly.find((data) => data.year === 2023);

      if (!yearData) {
        return "-";
      }

      const { avgStars, avgDamage, totalStars, totalDamage, totalAttacks } =
        yearData;

      return (
        <div className="flex items-center justify-center">
          <span
            className={cn(
              "w-2 h-2 rounded-full mr-2",
              avgStars >= 2 ? "bg-green-500" : "bg-red-500"
            )}
          ></span>
          <PerformanceToolTip
            avgStars={avgStars}
            attacks={totalAttacks}
            stars={totalStars}
            damage={totalDamage}
            avgDamage={avgDamage}
          />
        </div>
      );
    },
  },
];
