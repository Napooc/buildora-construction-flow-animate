
import { cn } from "@/lib/utils";

interface PatternProps {
  className?: string;
}

export function MoroccanPattern({ className }: PatternProps) {
  return (
    <div className={cn("absolute inset-0 opacity-10 pointer-events-none moroccan-pattern", className)} />
  );
}
