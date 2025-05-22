
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <img 
        src="/lovable-uploads/c8919fe4-da6a-46b7-97c9-f159c6cd5fb4.png" 
        alt="Buildora" 
        className="h-9 w-auto"
      />
      {showText && (
        <span className="font-serif text-xl font-medium text-morocco-navy">
          Buildora
        </span>
      )}
    </div>
  );
}
