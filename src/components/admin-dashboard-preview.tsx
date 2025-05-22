
import { useState, useEffect } from "react";
import { LayoutDashboard, FileText, Users, Settings, Bell, Calendar, TrendingUp, BarChart3, Clock, CheckCircle2, AlertTriangle, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function AdminDashboardPreview() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<any>(null);
  
  const slides = [
    {
      id: "dashboard",
      label: "Tableau de bord",
      image: "/lovable-uploads/9d79e4ad-94cc-4248-a699-9a4c439b27a7.png",
      description: "Vue d'ensemble des projets et indicateurs clés"
    }, 
    {
      id: "tasks",
      label: "Gestion des tâches",
      image: "/lovable-uploads/d54f7138-4b3b-4e86-ae87-a57f0b6fda18.png",
      description: "Organisation des tâches avec tableaux Kanban"
    }, 
    {
      id: "resources",
      label: "Suivi des ressources",
      image: "/lovable-uploads/0a2e3895-9768-485d-b14c-74d10ca5776d.png",
      description: "Gestion des matériaux et équipements"
    }, 
    {
      id: "documents",
      label: "Centre de documents",
      image: "/lovable-uploads/855b0fd1-275b-4fb1-8299-8b96609a381b.png",
      description: "Organisation et partage des documents du projet"
    }
  ];

  // Start auto-play
  useEffect(() => {
    let interval: any;
    
    if (isPlaying && api) {
      interval = setInterval(() => {
        api.scrollNext();
      }, 3000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, api]);

  // Update current slide when carousel scrolls
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Une interface <span className="text-morocco-terracotta">puissante</span> pour gérer vos projets
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez notre interface administrateur intuitive et complète qui vous donne un contrôle total sur vos projets
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="bg-gray-800 rounded-t-xl h-8 flex items-center px-3 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="text-xs text-gray-300 mx-auto">Buildora - Interface Administrateur</div>
            </div>
            
            <Carousel 
              className="w-full"
              setApi={setApi}
            >
              <CarouselContent>
                {slides.map((slide, index) => (
                  <CarouselItem key={slide.id}>
                    <div className="p-1">
                      <Card className="border-0 shadow-xl">
                        <CardContent className="p-0">
                          <img 
                            src={slide.image} 
                            alt={slide.label}
                            className="w-full h-auto rounded-b-xl"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="rounded-full bg-white shadow-md hover:bg-gray-100"
                  onClick={togglePlayback}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                
                <div className="flex items-center gap-1">
                  {slides.map((_, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="icon"
                      className={`w-2 h-2 p-0 rounded-full ${
                        currentSlide === index 
                          ? "bg-morocco-blue scale-125" 
                          : "bg-gray-300"
                      }`}
                      onClick={() => api?.scrollTo(index)}
                    />
                  ))}
                </div>
              </div>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
            
            <div className="mt-16 text-center">
              <h3 className="text-xl font-bold mb-2">
                {slides[currentSlide]?.label}
              </h3>
              <p className="text-gray-600">
                {slides[currentSlide]?.description}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-20 grid md:grid-cols-4 gap-6">
          {[
            {
              icon: <LayoutDashboard className="h-6 w-6 text-morocco-blue" />,
              title: "Vue d'ensemble complète",
              description: "Visualisez tous vos projets et leur avancement en un coup d'œil"
            },
            {
              icon: <Calendar className="h-6 w-6 text-morocco-terracotta" />,
              title: "Planification intelligente",
              description: "Organisez vos tâches et suivez les échéances importantes"
            },
            {
              icon: <Users className="h-6 w-6 text-morocco-gold" />,
              title: "Gestion d'équipe",
              description: "Attribuez des tâches et suivez la performance de votre équipe"
            },
            {
              icon: <BarChart3 className="h-6 w-6 text-morocco-navy" />,
              title: "Rapports détaillés",
              description: "Générez des rapports complets pour analyser vos projets"
            }
          ].map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
