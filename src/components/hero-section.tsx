
import { ArrowRight, Building, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MoroccanPattern } from "@/components/ui/pattern";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-morocco-terracotta to-morocco-blue">
              Gérez vos projets de construction
            </span>{" "}
            avec précision et élégance
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Buildora est une solution complète pour la gestion de projets de construction, conçue pour améliorer l'efficacité et la communication sur vos chantiers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Link to="/demo">
              <Button size="lg" className="btn-primary bg-morocco-blue hover:bg-morocco-deep-blue text-white group">
                Demander une démo
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="border-morocco-blue text-morocco-blue hover:bg-morocco-blue/10">
                Découvrir les fonctionnalités
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {["Suivi en temps réel", "Gestion des tâches", "Rapports automatisés"].map((feature) => (
              <div key={feature} className="flex items-center">
                <CheckCircle className="h-5 w-5 text-morocco-terracotta mr-2" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 relative max-w-5xl mx-auto animate-scale-in" style={{ animationDelay: "0.4s" }}>
          <div className="aspect-[16/9] bg-gradient-to-br from-morocco-blue to-morocco-deep-blue rounded-xl shadow-2xl overflow-hidden border-4 border-white">
            <Link to="/demo" className="block w-full h-full relative">
              <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" alt="Dashboard Buildora" className="w-full h-full object-cover opacity-90 mix-blend-overlay" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <Building className="w-16 h-16 mb-4 mx-auto" />
                  <p className="text-2xl font-bold">Voir la démo</p>
                  <p className="text-sm opacity-80">Découvrez notre interface complète</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-morocco-gold/20 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute -left-16 -top-8 w-40 h-40 bg-morocco-terracotta/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        </div>
      </div>
      <MoroccanPattern className="opacity-5" />
    </section>
  );
}
