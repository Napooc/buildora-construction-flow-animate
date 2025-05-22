
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { ShowcaseSection } from "@/components/showcase-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CtaSection } from "@/components/cta-section";
import { PricingSection } from "@/components/pricing-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { AdminDashboardPreview } from "@/components/admin-dashboard-preview";
import { MoroccanPattern } from "@/components/ui/pattern";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  
  // Function to handle scroll to section
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust offset to account for fixed navbar
        behavior: "smooth"
      });
    }
  };
  
  // Handle scrolling and section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Add offset for better detection
      
      const sections = [
        "home",
        "features",
        "showcase",
        "admin-dashboard",
        "testimonials",
        "pricing",
        "contact"
      ];
      
      // Find the current section based on scroll position
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden w-full">
      <MoroccanPattern variant="animated" className="fixed inset-0 z-0 opacity-5" />
      
      <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      <main className="relative z-10 w-full">
        <div id="home" className="w-full">
          <HeroSection />
        </div>
        <div id="features" className="w-full">
          <FeaturesSection />
        </div>
        <div id="showcase" className="w-full">
          <ShowcaseSection />
        </div>
        <div id="admin-dashboard" className="w-full">
          <AdminDashboardPreview />
        </div>
        <div id="testimonials" className="w-full">
          <TestimonialsSection />
        </div>
        <div id="pricing" className="w-full">
          <PricingSection />
        </div>
        <div id="contact" className="w-full">
          <ContactSection />
        </div>
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
