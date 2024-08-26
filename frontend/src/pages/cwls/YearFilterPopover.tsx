import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

import { Button } from "@/components/ui/Button";
import { Filter } from "lucide-react";

interface YearFilterProps {
  years: number[];
  filterYears: number[];
  onSelectChange: (key: string, value: number) => void;
}

export default function NationalityFilter({
  years,
  filterYears,
  onSelectChange,
}: YearFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className="h-5 w-5 mr-2" aria-hidden="true" />
          Filter years
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filter by:</h4>
            <p className="text-sm text-muted-foreground">Year</p>
          </div>
          <div className="grid gap-2">
            {years.map((year) => {
              const isItemSelected = filterYears.includes(year);
              return (
                <div
                  key={year}
                  className={`flex items-center gap-4 p-2 rounded cursor-pointer ${
                    isItemSelected ? "bg-gray-200" : ""
                  }`}
                  onClick={() => onSelectChange("year", year)}
                >
                  {year}
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
