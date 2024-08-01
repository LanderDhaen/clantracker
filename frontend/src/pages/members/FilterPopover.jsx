export default function FilterPopover({
  title,
  filterItems,
  selectedItems,
  onSelectionChange,
  formatData,
}) {
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Filter by:</h4>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <div className="grid gap-2">
        {Object.entries(filterItems).map(([key, value]) => {
          const isItemSelected = selectedItems.includes(value);
          return (
            <div
              key={key}
              className={`grid grid-cols-3 items-center gap-4 p-2 rounded cursor-pointer ${
                isItemSelected ? "bg-gray-200" : ""
              }`}
              onClick={() => onSelectionChange(value)}
            >
              {formatData(value)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
