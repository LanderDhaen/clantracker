import * as React from "react";
import { Input } from "@/components/ui/Input";

import TownhallFilterPopover from "./../members/TownhallFilterPopover";

export default function PerformanceFilters({
  columnFilters,
  setColumnFilters,
  townhalls,
}) {
  const username =
    columnFilters.find((filter) => filter.id === "account")?.value || "";

  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev.filter((f) => f.id !== id).concat({ id, value })
    );

  const filterTownhalls =
    columnFilters.find((filter) => filter.id === "townhall")?.value || [];

  const handleTownhallChange = (townhall) => {
    setColumnFilters((prev) => {
      const currentTownhalls =
        prev.find((filter) => filter.id === "townhall")?.value || [];
      const newTownhalls = filterTownhalls.includes(townhall)
        ? currentTownhalls.filter((t) => t !== townhall)
        : [...currentTownhalls, townhall];
      return prev
        .filter((f) => f.id !== "townhall")
        .concat({ id: "townhall", value: newTownhalls });
    });
  };

  return (
    <div className="flex space-x-4">
      <Input
        placeholder="Filter usernames..."
        value={username}
        onChange={(event) => onFilterChange("account", event.target.value)}
        className="max-w-sm"
      />
      <TownhallFilterPopover
        townhalls={townhalls}
        filterTownhalls={filterTownhalls}
        handleTownhallChange={handleTownhallChange}
      />
    </div>
  );
}
