
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function CtaSection() {
  const navigate = useNavigate();
  
  return (
    <section className="py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-morocco-blue to-morocco-deep-blue rounded-2xl p-10 text-white text-center relative overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_40%)]"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.1),transparent_40%)]"></div>
          </div>

          <div className="absolute -top-24 -right-24 w-48 h-48 bg-morocco-gold/30 rounded-full filter blur-3xl group-hover:bg-morocco-gold/40 transition-all duration-700"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-morocco-terracotta/20 rounded-full filter blur-3xl group-hover:bg-morocco-terracotta/30 transition-all duration-700"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à transformer la gestion de vos projets de construction?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Rejoignez les entreprises qui améliorent leur efficacité et réduisent leurs coûts grâce à Buildora.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-morocco-blue hover:bg-morocco-sand group">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate("/admin")}
              >
                Espace administrateur
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
