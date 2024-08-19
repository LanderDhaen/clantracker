import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";
import { formatTownhall } from "@/lib/formatTownhall";
import { cn } from "@/lib/utils";
import PerformanceToolTip from "./PerformanceToolTip";
import { PerformanceAllTime, PerformanceListEntry } from "@/api/performance";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<PerformanceListEntry>[] = [
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
      const townhall = getValue() as number;
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
      const avgStars = getValue() as number;

      const data = row.original.alltime as PerformanceAllTime;

      return (
        <div className={"flex items-center justify-center"}>
          <span
            className={cn(
              "w-2 h-2 rounded-full mr-2",
              avgStars >= 2 ? "bg-green-500" : "bg-red-500"
            )}
          ></span>

          <PerformanceToolTip data={data} />
        </div>
      );
    },
  },
  {
    id: "2024.avgStars",
    accessorFn: (row) =>
      row.yearly.find((yearly) => yearly.year === 2024)?.avgStars,
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
      const avgStars = getValue() as number;
      const data = row.original.yearly.find(
        (yearly) => yearly.year === 2024
      ) as PerformanceAllTime;

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

          <PerformanceToolTip data={data} />
        </div>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const a = rowA.getValue(columnId) as number | undefined;
      const b = rowB.getValue(columnId) as number | undefined;

      if (a === undefined) return 1;
      if (b === undefined) return -1;
      return b - a;
    },
  },
  {
    id: "2023.avgStars",
    accessorFn: (row) =>
      row.yearly.find((yearly) => yearly.year === 2023)?.avgStars,
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
      const avgStars = getValue() as number;
      const data = row.original.yearly.find(
        (yearly) => yearly.year === 2023
      ) as PerformanceAllTime;

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
          <PerformanceToolTip data={data} />
        </div>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const a = rowA.getValue(columnId) as number | undefined;
      const b = rowB.getValue(columnId) as number | undefined;

      if (a === undefined) return 1;
      if (b === undefined) return -1;
      return (b ?? 0) - (a ?? 0);
    },
  },
];
