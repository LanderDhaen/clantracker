import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Filter } from "lucide-react";
import { roles, formatRole } from "@/lib/formatRole";
import { clans, formatClan } from "@/lib/formatClan";
import FilterPopover from "@/pages/members/FilterPopover";

export default function Filters({ columnFilters, setColumnFilters }) {
  const username =
    columnFilters.find((filter) => filter.id === "username")?.value || "";

  const name =
    columnFilters.find((filter) => filter.id === "name")?.value || "";

  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev.filter((f) => f.id !== id).concat({ id, value })
    );

  const filterRoles =
    columnFilters.find((filter) => filter.id === "role")?.value || [];
  const filterClans =
    columnFilters.find((filter) => filter.id === "clanID")?.value || [];

  const handleRoleChange = (role) => {
    setColumnFilters((prev) => {
      const currentRoles =
        prev.find((filter) => filter.id === "role")?.value || [];
      const newRoles = filterRoles.includes(role)
        ? currentRoles.filter((r) => r !== role)
        : [...currentRoles, role];
      return prev
        .filter((f) => f.id !== "role")
        .concat({ id: "role", value: newRoles });
    });
  };

  const handleClanChange = (clan) => {
    setColumnFilters((prev) => {
      const currentClans =
        prev.find((filter) => filter.id === "clanID")?.value || [];
      const newClans = filterClans.includes(clan)
        ? currentClans.filter((c) => c !== clan)
        : [...currentClans, clan];
      return prev
        .filter((f) => f.id !== "clanID")
        .concat({ id: "clanID", value: newClans });
    });
  };

  return (
    <div className="flex p-4 space-x-4">
      <Input
        placeholder="Filter usernames..."
        value={username}
        onChange={(event) => onFilterChange("username", event.target.value)}
        className="max-w-sm"
      />
      <Input
        placeholder="Filter names..."
        value={name}
        onChange={(event) => onFilterChange("name", event.target.value)}
        className="max-w-sm"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Filter className="h-5 w-5 mr-2" aria-hidden="true" />
            Filter roles
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <FilterPopover
            title="Roles"
            filterItems={roles}
            selectedItems={filterRoles}
            onSelectionChange={handleRoleChange}
            formatData={formatRole}
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Filter className="h-5 w-5 mr-2" aria-hidden="true" />
            Filter clans
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <FilterPopover
            title="Clans"
            filterItems={clans}
            selectedItems={filterClans}
            onSelectionChange={handleClanChange}
            formatData={formatClan}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
