
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

interface MobileNavProps {
  navItems: { label: string; href: string }[];
}

export function MobileNav({ navItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="relative z-50"
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Ouvrir le menu</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-lg animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b">
              <Logo />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Fermer le menu</span>
              </Button>
            </div>
            <nav className="p-4">
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block py-2 text-lg font-medium text-morocco-deep-blue hover:text-morocco-terracotta transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
