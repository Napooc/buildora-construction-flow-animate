
import { LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="relative flex items-center justify-center h-8 w-8 bg-gradient-to-br from-morocco-blue to-morocco-deep-blue rounded-md overflow-hidden">
        <LayoutGrid className="h-5 w-5 text-white" />
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/10" />
      </div>
      {showText && (
        <span className="font-serif text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-morocco-terracotta to-morocco-blue">
          Buildora
        </span>
      )}
    </div>
  );
}
