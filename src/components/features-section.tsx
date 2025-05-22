
import { useState } from "react";
import { 
  LayoutDashboard, 
  ClipboardList, 
  Truck, 
  FileText, 
  Bell, 
  Calendar, 
  Users, 
  Smartphone,
  Play,
  ArrowRight
} from "lucide-react";
import { MoroccanPattern } from "@/components/ui/pattern";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Dashboard images for the feature showcase
const dashboardImages = [
  {
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    alt: "Tableau de bord principal",
    description: "Vue d'ensemble de tous vos projets en cours"
  },
  {
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    alt: "Gestion des tâches",
    description: "Organisation visuelle de vos tâches avec Kanban"
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    alt: "Suivi des ressources",
    description: "Gestion optimisée de vos équipements et matériaux"
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    alt: "Journal de chantier",
    description: "Documentation quotidienne de l'avancement des travaux"
  },
  {
    src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    alt: "Notifications et alertes",
    description: "Système d'alertes pour rester informé des échéances"
  },
];

const features = [
  {
    title: "Tableau de bord interactif",
    description: "Visualisez l'avancement de vos projets en temps réel avec des graphiques et indicateurs personnalisables.",
    icon: LayoutDashboard,
    color: "from-morocco-blue to-morocco-deep-blue",
    imageIndex: 0,
  },
  {
    title: "Gestion des tâches",
    description: "Organisez vos projets avec des diagrammes de Gantt et des tableaux Kanban pour une planification efficace.",
    icon: ClipboardList,
    color: "from-morocco-terracotta to-morocco-gold",
    imageIndex: 1,
  },
  {
    title: "Suivi des ressources",
    description: "Gérez vos matériaux, équipements et main-d'œuvre pour optimiser l'utilisation des ressources.",
    icon: Truck,
    color: "from-morocco-gold to-morocco-sand",
    imageIndex: 2,
  },
  {
    title: "Journal de chantier",
    description: "Enregistrez des rapports quotidiens, photos et incidents pour documenter l'avancement du projet.",
    icon: FileText,
    color: "from-morocco-navy to-morocco-blue",
    imageIndex: 3,
  },
  {
    title: "Notifications automatiques",
    description: "Recevez des alertes et rappels pour rester informé des échéances et des mises à jour importantes.",
    icon: Bell,
    color: "from-morocco-blue to-morocco-sand",
    imageIndex: 4,
  },
  {
    title: "Gestion documentaire",
    description: "Stockez et partagez plans, devis et contrats de manière sécurisée avec toute l'équipe.",
    icon: Calendar,
    color: "from-morocco-deep-blue to-morocco-navy",
    imageIndex: 0,
  },
  {
    title: "Accès multi-utilisateurs",
    description: "Définissez des rôles et permissions spécifiques pour chaque membre de l'équipe du projet.",
    icon: Users,
    color: "from-morocco-terracotta to-morocco-navy",
    imageIndex: 1,
  },
  {
    title: "Synchronisation mobile",
    description: "Accédez à toutes les fonctionnalités depuis votre appareil mobile, même sur le terrain.",
    icon: Smartphone,
    color: "from-morocco-blue to-morocco-terracotta",
    imageIndex: 2,
  },
];

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const handlePlayDemo = (index: number) => {
    setActiveFeature(index);
    // Scroll to the dashboard preview
    const element = document.getElementById("dashboard-preview");
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="features" className="relative py-24 overflow-hidden bg-gray-50">
      <MoroccanPattern variant="subtle" className="absolute inset-0" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-morocco-gold/10 text-morocco-terracotta px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4 animate-fade-in">
            Fonctionnalités
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-morocco-terracotta to-morocco-blue">
            Fonctionnalités exceptionnelles
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Découvrez comment Buildora transforme la gestion de vos projets de construction avec des outils puissants et intuitifs.
          </p>
        </div>

        {/* Interactive dashboard preview */}
        <div id="dashboard-preview" className="mb-20 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center text-morocco-navy">
            Une interface puissante pour gérer vos projets
          </h3>
          
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {dashboardImages.map((image, idx) => (
                <CarouselItem key={idx}>
                  <div className="p-2">
                    <Card className="overflow-hidden border-0 shadow-xl rounded-xl">
                      <CardContent className="p-0">
                        <div className="relative aspect-video overflow-hidden">
                          <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                            <h4 className="text-white text-xl font-bold mb-2">{image.alt}</h4>
                            <p className="text-white/80 text-sm">{image.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative group rounded-xl p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300",
                activeFeature === index ? "ring-2 ring-morocco-blue/50" : ""
              )}
            >
              <div className={cn(
                "w-14 h-14 mb-6 rounded-lg flex items-center justify-center bg-gradient-to-br", 
                feature.color
              )}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-morocco-navy">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              
              <Button
                onClick={() => handlePlayDemo(index)}
                size="sm"
                className="bg-morocco-blue text-white hover:bg-morocco-deep-blue group flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                <span>Voir la démo</span>
                <ArrowRight className="h-4 w-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
              </Button>

              {/* Decorative corner */}
              <div className="absolute -bottom-px -right-px w-8 h-8 bg-gradient-to-br from-transparent to-morocco-gold/20 rounded-bl-3xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
