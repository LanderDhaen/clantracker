import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { GetAllPerformancesResponse } from "@backend-types/performance";
import TownhallLabel from "@/components/townhall/TownhallLabel";

export const columns: ColumnDef<GetAllPerformancesResponse[number]>[] = [
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

      return <TownhallLabel townhall={townhall} />;
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
    cell: ({ getValue }) => {
      const avgStars = getValue() as number;

      return (
        <div className={"flex items-center justify-center"}>
          <span
            className={cn(
              "w-2 h-2 rounded-full mr-2",
              avgStars >= 2 ? "bg-green-500" : "bg-red-500"
            )}
          ></span>

          {avgStars}
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
    cell: ({ getValue }) => {
      const avgStars = getValue() as number;

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
          {avgStars}
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
    cell: ({ getValue }) => {
      const avgStars = getValue() as number;

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
          {avgStars}
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
