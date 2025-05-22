
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";

interface MobileNavProps {
  navItems: { label: string; href: string; section?: string }[];
}

export function MobileNav({ navItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavItemClick = (href: string, section?: string) => {
    setIsOpen(false);
    
    if (href.startsWith("#")) {
      if (location.pathname === "/") {
        // We're on the home page, so scroll to the section
        const element = document.getElementById(section || href.substring(1));
        if (element) {
          setTimeout(() => {
            window.scrollTo({
              top: element.offsetTop - 80,
              behavior: "smooth"
            });
          }, 100);
        }
      } else {
        // Navigate to home with the hash
        navigate("/" + href);
      }
    } else {
      navigate(href);
    }
  };

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
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block py-2 text-lg font-medium text-morocco-deep-blue hover:text-morocco-terracotta transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavItemClick(item.href, item.section);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                
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
                    className="w-full mb-2 bg-morocco-blue hover:bg-morocco-deep-blue text-white"
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
                      <Button className="w-full mb-2 bg-morocco-blue hover:bg-morocco-deep-blue text-white">
                        Se connecter
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full border-morocco-blue text-morocco-blue hover:bg-morocco-blue/10">
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
