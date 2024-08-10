import { Input } from "@/components/ui/Input";

export default function ClanFilters({ columnFilters, setColumnFilters }) {
  const name =
    columnFilters.find((filter) => filter.id === "name")?.value || "";

  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev.filter((f) => f.id !== id).concat({ id, value })
    );

  return (
    <div className="flex space-x-4">
      <Input
        placeholder="Filter clan names..."
        value={name}
        onChange={(event) => onFilterChange("name", event.target.value)}
        className="max-w-sm"
      />
    </div>
  );
}
