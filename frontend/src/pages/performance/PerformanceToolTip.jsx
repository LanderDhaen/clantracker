import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

export default function PerformanceToolTip({
  avgStars,
  attacks,
  stars,
  damage,
  avgDamage,
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{avgStars}</TooltipTrigger>
        <TooltipContent side="right" align="center">
          <div className="flex flex-col text-left space-y-1">
            <div>Attacks: {attacks}</div>
            <div>Stars: {stars}</div>
            <div>Damage: {damage}</div>
            <div>Average Damage: {avgDamage}%</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
