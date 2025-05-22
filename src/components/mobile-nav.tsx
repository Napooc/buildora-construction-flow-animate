
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";

interface MobileNavProps {
  navItems: { label: string; href: string }[];
}

export function MobileNav({ navItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();

  return (
    <div className="lg:hidden">
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
                {navItems.map((item) => {
                  // Determine if this is a hash link or a regular page link
                  const isHashLink = item.href.startsWith("#");
                  
                  return (
                    <li key={item.href}>
                      {isHashLink ? (
                        <a
                          href={item.href}
                          className="block py-2 text-lg font-medium text-morocco-deep-blue hover:text-morocco-terracotta transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          to={item.href}
                          className="block py-2 text-lg font-medium text-morocco-deep-blue hover:text-morocco-terracotta transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
                
                {isAdmin && (
                  <li>
                    <Link
                      to="/admin"
                      className="block py-2 text-lg font-medium text-morocco-deep-blue hover:text-morocco-terracotta transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin
                    </Link>
                  </li>
                )}
              </ul>
              <div className="mt-6 pt-6 border-t">
                {user ? (
                  <Button 
                    className="w-full mb-2 btn-primary"
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                  >
                    Se déconnecter
                  </Button>
                ) : (
                  <>
                    <Link to="/admin/login" onClick={() => setIsOpen(false)}>
                      <Button className="w-full mb-2 btn-primary">
                        Se connecter
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                      S'inscrire
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
