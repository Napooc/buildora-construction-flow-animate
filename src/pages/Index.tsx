
import { useState } from "react";
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
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <MoroccanPattern variant="animated" className="fixed inset-0 z-0" />
      
      <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      <main className="relative z-10">
        <div id="home">
          <HeroSection />
        </div>
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="showcase">
          <ShowcaseSection />
        </div>
        <div id="admin-dashboard">
          <AdminDashboardPreview />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <div id="pricing">
          <PricingSection />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
