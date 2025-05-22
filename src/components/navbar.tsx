
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";

const navItems = [
  { label: "Accueil", href: "#" },
  { label: "Caractéristiques", href: "#features" },
  { label: "Tarification", href: "#pricing" },
  { label: "Témoignages", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 shadow-md backdrop-blur-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-morocco-navy hover:text-morocco-terracotta font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="border-morocco-blue text-morocco-blue hover:bg-morocco-blue/10">
            Se connecter
          </Button>
          <Button className="btn-primary">S'inscrire</Button>
        </div>
        <MobileNav navItems={navItems} />
      </div>
    </header>
  );
}
