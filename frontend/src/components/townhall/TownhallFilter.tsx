import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

import { Button } from "@/components/ui/Button";
import { Filter } from "lucide-react";
import { TownhallListEntry } from "@/api/townhall";
import TownhallLabel from "./TownhallLabel";

interface TownhallFilterProps {
  townhalls: TownhallListEntry[];
  filterTownhalls: number[];
  onSelectChange: (key: string, value: number) => void;
}

export default function TownhallFilterr({
  townhalls,
  filterTownhalls,
  onSelectChange,
}: TownhallFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className="h-5 w-5 mr-2" aria-hidden="true" />
          Filter townhalls
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-96 overflow-y-auto">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filter by:</h4>
            <p className="text-sm text-muted-foreground">Townhall</p>
          </div>
          <div className="grid gap-2">
            {townhalls.map((townhall) => {
              const isItemSelected = filterTownhalls.includes(townhall.ID);
              return (
                <div
                  key={townhall.ID}
                  className={`flex items-center gap-4 p-2 rounded cursor-pointer ${
                    isItemSelected ? "bg-gray-200" : ""
                  }`}
                  onClick={() => onSelectChange("townhall", townhall.ID)}
                >
                  <TownhallLabel townhall={townhall.level} />
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
