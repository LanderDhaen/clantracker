import { cn } from "@/lib/utils";

interface LabelProps {
  color: string;
  children: React.ReactNode;
}

export const Badge = ({ color, children }: LabelProps) => {
  return (
    <div className={"flex items-center justify-center"}>
      <span className={cn("w-2 h-2 bg-current rounded-full mr-2", color)} />
      {children}
    </div>
  );
};
