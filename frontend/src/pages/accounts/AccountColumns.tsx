import { format } from "date-fns";
import { formatRole, RoleValue } from "@/lib/formatRole";

import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { GetAllAccountsResponse } from "@backend-types/account";
import { Badge } from "@/components/ui/Badge";
import { colorTownhall } from "@/lib/formatTownhall";

export const columns: ColumnDef<GetAllAccountsResponse[number]>[] = [
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
        <Badge color={left === null ? "bg-green-500" : "bg-red-500"}>
          {formattedDate}
        </Badge>
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

      return <Badge color={colorTownhall(townhall)}>TH {townhall}</Badge>;
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
