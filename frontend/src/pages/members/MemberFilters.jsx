import { Input } from "@/components/ui/Input";
import { ROLES, formatRole } from "@/lib/formatRole";
import RoleFilterPopover from "./RoleFilterPopover";
import ClanFilterPopover from "./ClanFilterPopover";
import TownhallFilterPopover from "./TownhallFilterPopover";
import NationalityFilterPopover from "./NationalityFilterPopover";

const nationalities = ["Belgian", "Dutch"];

export default function MemberFilters({
  columnFilters,
  setColumnFilters,
  clans,
  townhalls,
}) {
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
  const filterTownhalls =
    columnFilters.find((filter) => filter.id === "townhall")?.value || [];
  const filterNationalities =
    columnFilters.find((filter) => filter.id === "nationality")?.value || [];

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

  const handleNationalityChange = (nationality) => {
    setColumnFilters((prev) => {
      const currentNationalities =
        prev.find((filter) => filter.id === "nationality")?.value || [];
      const newNationalities = filterNationalities.includes(nationality)
        ? currentNationalities.filter((n) => n !== nationality)
        : [...currentNationalities, nationality];
      return prev
        .filter((f) => f.id !== "nationality")
        .concat({ id: "nationality", value: newNationalities });
    });
  };

  return (
    <div className="flex space-x-4">
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
      <NationalityFilterPopover
        nationalities={nationalities}
        filterNationalities={filterNationalities}
        handleNationalityChange={handleNationalityChange}
      />
      <RoleFilterPopover
        roles={ROLES}
        filterRoles={filterRoles}
        handleRoleChange={handleRoleChange}
        formatRole={formatRole}
      />
      <ClanFilterPopover
        clans={clans}
        filterClans={filterClans}
        handleClanChange={handleClanChange}
      />
      <TownhallFilterPopover
        townhalls={townhalls}
        filterTownhalls={filterTownhalls}
        handleTownhallChange={handleTownhallChange}
      />
    </div>
  );
}
