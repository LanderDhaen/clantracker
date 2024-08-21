import { colorTownhall } from "@/lib/formatTownhall";
import { cn } from "@/lib/utils";

interface TownhallLabelProps {
  townhall: number;
}

export default function TownhallLabel({ townhall }: TownhallLabelProps) {
  return (
    <div className={"flex items-center justify-center"}>
      <span
        className={cn(
          "w-2 h-2 bg-current rounded-full mr-2",
          colorTownhall(townhall)
        )}
      ></span>
      TH {townhall}
    </div>
  );
}
