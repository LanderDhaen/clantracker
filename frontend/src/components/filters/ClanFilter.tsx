import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

import { Button } from "@/components/ui/Button";
import { Filter } from "lucide-react";
import { getAllClansResponse } from "@backend-types/clan";

interface ClanFilterProps {
  clans: getAllClansResponse;
  filterClans: number[];
  onSelectChange: (key: string, value: number) => void;
}

export default function ClanFilter({
  clans,
  filterClans,
  onSelectChange,
}: ClanFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className="h-5 w-5 mr-2" aria-hidden="true" />
          Filter clans
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filter by:</h4>
            <p className="text-sm text-muted-foreground">Clan</p>
          </div>
          <div className="grid gap-2">
            {clans.map((clan) => {
              const isItemSelected = filterClans.includes(clan.ID);
              return (
                <div
                  key={clan.ID}
                  className={` items-center gap-4 p-2 rounded cursor-pointer ${
                    isItemSelected ? "bg-gray-200" : ""
                  }`}
                  onClick={() => onSelectChange("clanID", clan.ID)}
                >
                  {clan.name}
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
