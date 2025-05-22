
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="h-8 w-8">
        <img 
          src="/lovable-uploads/798bf2dd-bce3-46ec-a47f-5b6c53bb0c4c.png" 
          alt="Buildora Logo" 
          className="h-full w-auto"
        />
      </div>
      {showText && (
        <span className="font-serif text-xl font-medium text-morocco-deep-blue">
          Buildora
        </span>
      )}
    </div>
  );
}
