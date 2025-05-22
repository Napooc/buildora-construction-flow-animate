
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface PatternProps {
  className?: string;
  variant?: "default" | "animated" | "subtle";
  color?: string;
}

export function MoroccanPattern({ className, variant = "default", color }: PatternProps) {
  const patternRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant === "animated" && patternRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!patternRef.current) return;
        
        const { clientX, clientY } = e;
        const x = (clientX - window.innerWidth / 2) / 25;
        const y = (clientY - window.innerHeight / 2) / 25;
        
        patternRef.current.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [variant]);

  return (
    <div 
      ref={patternRef}
      className={cn(
        "absolute inset-0 pointer-events-none", 
        variant === "default" && "moroccan-pattern opacity-10",
        variant === "animated" && "moroccan-pattern opacity-10 transition-all duration-200 ease-out",
        variant === "subtle" && "moroccan-pattern opacity-5",
        className
      )}
      style={color ? { 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodeURIComponent(color)}' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
      } : {}}
    />
  );
}
