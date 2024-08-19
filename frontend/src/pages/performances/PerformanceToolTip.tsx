import { PerformanceAllTime } from "@/api/performance";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

interface PerformanceToolTipProps {
  data: PerformanceAllTime;
}

export default function PerformanceToolTip({ data }: PerformanceToolTipProps) {
  const { avgStars, avgDamage, totalStars, totalDamage, totalAttacks } = data;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{avgStars}</TooltipTrigger>
        <TooltipContent side="right" align="center">
          <div className="flex flex-col text-left space-y-1">
            <div>Attacks: {totalAttacks}</div>
            <div>Stars: {totalStars}</div>
            <div>Damage: {totalDamage}</div>
            <div>Average Damage: {avgDamage}%</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
