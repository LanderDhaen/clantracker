import { format } from "date-fns";
import { formatRole } from "@/lib/formatRole";

import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";
import { filterFns } from "@tanstack/react-table";
import { formatClan } from "@/lib/formatClan";

export const columns = [
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
      return formatRole(getValue());
    },
    enableColumnFilters: true,
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
    cell: ({ getValue }) => {
      return format(new Date(getValue()), "dd-MM-yyyy");
    },
  },
  {
    accessorKey: "left",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Left
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const value = getValue();
      if (value === null || value === undefined) {
        return "-";
      }
      return format(new Date(value), "dd-MM-yyyy");
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
    cell: ({ getValue }) => {
      return formatClan(getValue());
    },
    enableColumnFilters: true,
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
    enableColumnFilters: true,
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
