
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
  Info
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
    src: "/lovable-uploads/9d79e4ad-94cc-4248-a699-9a4c439b27a7.png",
    alt: "Tableau de bord principal",
    description: "Vue d'ensemble de tous vos projets en cours"
  },
  {
    src: "/lovable-uploads/d54f7138-4b3b-4e86-ae87-a57f0b6fda18.png",
    alt: "Gestion des tâches",
    description: "Organisation visuelle de vos tâches avec Kanban"
  },
  {
    src: "/lovable-uploads/855b0fd1-275b-4fb1-8299-8b96609a381b.png",
    alt: "Suivi des ressources",
    description: "Gestion optimisée de vos équipements et matériaux"
  },
  {
    src: "/lovable-uploads/9d79e4ad-94cc-4248-a699-9a4c439b27a7.png",
    alt: "Journal de chantier",
    description: "Documentation quotidienne de l'avancement des travaux"
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
    imageIndex: 0,
  },
  {
    title: "Gestion documentaire",
    description: "Stockez et partagez plans, devis et contrats de manière sécurisée avec toute l'équipe.",
    icon: Calendar,
    color: "from-morocco-deep-blue to-morocco-navy",
    imageIndex: 1,
  },
  {
    title: "Accès multi-utilisateurs",
    description: "Définissez des rôles et permissions spécifiques pour chaque membre de l'équipe du projet.",
    icon: Users,
    color: "from-morocco-terracotta to-morocco-navy",
    imageIndex: 2,
  },
  {
    title: "Synchronisation mobile",
    description: "Accédez à toutes les fonctionnalités depuis votre appareil mobile, même sur le terrain.",
    icon: Smartphone,
    color: "from-morocco-blue to-morocco-terracotta",
    imageIndex: 3,
  },
];

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const handlePlayDemo = (index: number) => {
    setActiveFeature(index);
    // Scroll to the dashboard preview
    const element = document.getElementById("dashboard-preview");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="features" className="relative py-24 overflow-hidden bg-gray-50 w-full">
      <MoroccanPattern variant="subtle" className="absolute inset-0" />
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
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
        <div id="dashboard-preview" className="mb-16 md:mb-20 w-full">
          <div className="flex flex-col items-center justify-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-morocco-navy text-center">
              Une interface puissante pour gérer vos projets
            </h3>
            <p className="text-gray-600 max-w-2xl text-center mb-8">
              Explorez notre interface intuitive conçue pour optimiser votre travail quotidien
            </p>
          </div>
          
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {dashboardImages.map((image, idx) => (
                <CarouselItem key={idx}>
                  <div className="p-1 md:p-2">
                    <Card className="overflow-hidden border-2 border-gray-100 shadow-xl rounded-xl bg-white">
                      <CardContent className="p-0">
                        <div className="relative aspect-video overflow-hidden">
                          <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                            <h4 className="text-white text-lg md:text-xl font-bold mb-2">{image.alt}</h4>
                            <p className="text-white/90 text-sm md:text-base">{image.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 lg:-left-12" />
            <CarouselNext className="right-2 lg:-right-12" />
          </Carousel>
        </div>

        {/* Features grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative group rounded-xl p-6 bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100",
                activeFeature === index ? "ring-2 ring-morocco-blue" : ""
              )}
            >
              <div className={cn(
                "w-12 h-12 mb-5 rounded-lg flex items-center justify-center bg-gradient-to-br", 
                feature.color
              )}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-lg md:text-xl font-bold mb-3 text-morocco-navy">{feature.title}</h3>
              <p className="text-gray-600 text-sm md:text-base mb-5">{feature.description}</p>
              
              <div className="flex justify-between items-center">
                <Button
                  onClick={() => handlePlayDemo(index)}
                  size="sm"
                  variant="outline"
                  className="border-morocco-blue text-morocco-blue hover:bg-morocco-blue/5 transition-all"
                >
                  <Play className="h-3 w-3 mr-1.5" />
                  <span>Démo</span>
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-500 hover:text-morocco-navy hover:bg-gray-100"
                >
                  <Info className="h-3.5 w-3.5" />
                  <span className="sr-only">Plus d'infos</span>
                </Button>
              </div>

              {/* Corner decoration */}
              <div className="absolute -bottom-px -right-px w-6 h-6 bg-gradient-to-br from-transparent to-morocco-blue/10 rounded-tl-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
