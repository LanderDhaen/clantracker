import { CWLListEntry } from "@/api/cwl";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import { formatLeague, LeagueValue } from "@/lib/formatLeague";
import { colorPlacementType } from "@/lib/formatPlacementTypes";
import { formatPlacement } from "@/lib/formatPlacement";
import { Badge } from "@/components/ui/Badge";

export const columns: ColumnDef<CWLListEntry>[] = [
  {
    accessorKey: "year",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Month
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return format(
        new Date(row.original.year, row.original.month - 1),
        "MMMM yyyy"
      );
    },
    sortingFn: (rowA, rowB) => {
      return (
        new Date(rowA.original.year, rowA.original.month - 1).getTime() -
        new Date(rowB.original.year, rowB.original.month - 1).getTime()
      );
    },
    filterFn: (row, columnId, filterYears) => {
      if (filterYears.length === 0) return true;
      const year = row.getValue(columnId);
      return filterYears.includes(year);
    },
  },
  {
    accessorKey: "league",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          League
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const value = getValue() as LeagueValue;

      return formatLeague(value);
    },
  },
  {
    accessorKey: "placement",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Result
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row, getValue }) => {
      const placement = getValue() as number;
      const placementType = row.original.placementType;

      return (
        <Badge color={colorPlacementType(placementType)}>
          {formatPlacement(placement)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "stars",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stars
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "damage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Damage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "clanID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Clan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.clanName;
    },
    filterFn: (row, columnId, filterClans) => {
      if (filterClans.length === 0) return true;
      const clan = row.getValue(columnId);
      return filterClans.includes(clan);
    },
  },
  {
    accessorKey: "size",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Size
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
