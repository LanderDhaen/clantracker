import { format } from "date-fns";
import { formatRole, RoleValue } from "@/lib/formatRole";

import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";

import { formatTownhall } from "@/lib/formatTownhall";

import { cn } from "@/lib/utils";

import { ColumnDef } from "@tanstack/react-table";
import { MemberListEntry } from "@/api/account";

export const columns: ColumnDef<MemberListEntry>[] = [
  {
    accessorKey: "username",
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const value = getValue();
      if (value === null || value === undefined) {
        return "-";
      }
      return value;
    },
  },
  {
    accessorKey: "nationality",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nationality
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, columnId, filterNationalities) => {
      if (filterNationalities.length === 0) return true;
      const nationality = row.getValue(columnId);
      return filterNationalities.includes(nationality);
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ getValue }) => {
      const role = getValue() as RoleValue;
      return formatRole(role);
    },
    filterFn: (row, columnId, filterRoles) => {
      if (filterRoles.length === 0) return true;
      const role = row.getValue(columnId);
      return filterRoles.includes(role);
    },
  },
  {
    accessorKey: "joined",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Joined
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row, getValue }) => {
      const date = new Date(getValue() as string);

      const formattedDate = format(date, "dd-MM-yyyy");
      const left = row.original.left;

      return (
        <div className={"flex items-center justify-center"}>
          <span
            className={cn(
              "w-2 h-2 rounded-full mr-2",
              left === null ? "bg-green-500" : "bg-red-500"
            )}
          ></span>
          {formattedDate}
        </div>
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
      return row.original.clan;
    },
    filterFn: (row, columnId, filterClans) => {
      if (filterClans.length === 0) return true;
      const clan = row.getValue(columnId);
      return filterClans.includes(clan);
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
    accessorKey: "main",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Main
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const value = getValue();
      if (value === null || value === undefined) {
        return "-";
      }
      return value;
    },
  },
];
