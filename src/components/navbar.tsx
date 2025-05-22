
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";

interface NavbarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const navItems = [
  { label: "Accueil", href: "/", section: "home" },
  { label: "Démonstration", href: "/demo", section: "showcase" },
  { label: "Témoignages", href: "#testimonials", section: "testimonials" },
  { label: "Tarifs", href: "#pricing", section: "pricing" },
  { label: "Contact", href: "#contact", section: "contact" },
];

export function Navbar({ activeSection, onSectionChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isAdmin, user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if we're scrolled past the initial position
      setIsScrolled(currentScrollY > 10);
      
      // Handle navbar hiding on scroll down / showing on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up or at top
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavItemClick = (section: string, href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      
      // Check if we're on the home page
      if (window.location.pathname === "/") {
        // We're on the home page, so scroll to the section
        if (onSectionChange) {
          onSectionChange(section);
        }
        
        const element = document.getElementById(section);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: "smooth"
          });
        }
      } else {
        // We're not on the home page, navigate to home and then to the section
        navigate("/" + href);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-white/90 shadow-md backdrop-blur-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            // Determine if this is a hash link or a regular page link
            const isHashLink = item.href.startsWith("#");
            
            return isHashLink ? (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavItemClick(item.section, item.href, e)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeSection === item.section
                    ? "text-morocco-terracotta"
                    : "text-morocco-navy hover:text-morocco-terracotta"
                }`}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 text-morocco-navy hover:text-morocco-terracotta`}
              >
                {item.label}
              </Link>
            );
          })}
          
          {isAdmin && (
            <Link
              to="/admin"
              className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 text-morocco-navy hover:text-morocco-terracotta"
            >
              Admin
            </Link>
          )}
        </nav>
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <Button 
              variant="outline" 
              className="border-morocco-blue text-morocco-blue hover:bg-morocco-blue/10"
              onClick={() => signOut()}
            >
              Se déconnecter
            </Button>
          ) : (
            <>
              <Link to="/admin/login">
                <Button variant="outline" className="border-morocco-blue text-morocco-blue hover:bg-morocco-blue/10">
                  Se connecter
                </Button>
              </Link>
              <Button className="bg-morocco-blue hover:bg-morocco-deep-blue text-white group">
                S'inscrire
                <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
              </Button>
            </>
          )}
        </div>
        <MobileNav navItems={navItems} />
      </div>
    </header>
  );
}
