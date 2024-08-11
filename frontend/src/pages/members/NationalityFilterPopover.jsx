import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

import { Button } from "@/components/ui/Button";
import { Filter } from "lucide-react";

export default function NationalityFilterPopover({
  nationalities,
  filterNationalities,
  handleNationalityChange,
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className="h-5 w-5 mr-2" aria-hidden="true" />
          Filter nationalities
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filter by:</h4>
            <p className="text-sm text-muted-foreground">Clan</p>
          </div>
          <div className="grid gap-2">
            {nationalities.map((nationality) => {
              const isItemSelected = filterNationalities.includes(nationality);
              return (
                <div
                  key={nationality}
                  className={` items-center gap-4 p-2 rounded cursor-pointer ${
                    isItemSelected ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleNationalityChange(nationality)}
                >
                  {nationality}
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
