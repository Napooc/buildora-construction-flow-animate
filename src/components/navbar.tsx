import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { ChevronDown } from "lucide-react";
interface NavbarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}
const navItems = [{
  label: "Accueil",
  href: "#home",
  section: "home"
}, {
  label: "Fonctionnalités",
  href: "#features",
  section: "features"
}, {
  label: "Démonstration",
  href: "#showcase",
  section: "showcase"
}, {
  label: "Témoignages",
  href: "#testimonials",
  section: "testimonials"
}, {
  label: "Tarifs",
  href: "#pricing",
  section: "pricing"
}, {
  label: "Contact",
  href: "#contact",
  section: "contact"
}];
export function Navbar({
  activeSection,
  onSectionChange
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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
  const handleNavItemClick = (section: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onSectionChange) {
      onSectionChange(section);
    }
  };
  return <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 transform ${isVisible ? "translate-y-0" : "-translate-y-full"} ${isScrolled ? "bg-white/90 shadow-md backdrop-blur-sm py-3" : "bg-transparent py-5"}`}>
      <div className="container flex items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map(item => <a key={item.href} href={item.href} onClick={e => handleNavItemClick(item.section, e)} className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeSection === item.section ? "text-morocco-terracotta" : "text-morocco-navy hover:text-morocco-terracotta"}`}>
              {item.label}
            </a>)}
        </nav>
        <div className="hidden lg:flex items-center space-x-4">
          
          
        </div>
        <MobileNav navItems={navItems} />
      </div>
    </header>;
}