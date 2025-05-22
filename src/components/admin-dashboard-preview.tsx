
import { useState } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Bell, 
  Calendar, 
  TrendingUp, 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Play,
  Pause 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function AdminDashboardPreview() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { id: "overview", label: "Aperçu" },
    { id: "projects", label: "Projets" },
    { id: "tasks", label: "Tâches" },
    { id: "reports", label: "Rapports" }
  ];
  
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-morocco-blue/10 text-morocco-blue px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
            Administration
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-morocco-navy">
            Une interface <span className="text-morocco-terracotta">puissante</span> pour gérer vos projets
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez notre tableau de bord d'administration intuitif et complet, conçu pour simplifier la gestion de vos projets de construction.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Dashboard Frame */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 animate-scale-in">
            {/* Dashboard Header */}
            <div className="bg-morocco-deep-blue text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center">
                <span className="text-sm opacity-80">Tableau de bord Buildora</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 rounded-md hover:bg-white/10">
                  <Bell className="h-4 w-4" />
                </button>
                <button className="p-1 rounded-md hover:bg-white/10">
                  <Settings className="h-4 w-4" />
                </button>
                <div className="h-6 w-6 rounded-full bg-morocco-gold flex items-center justify-center text-xs font-medium text-morocco-navy">
                  MA
                </div>
              </div>
            </div>
            
            {/* Dashboard Body */}
            <div className="grid grid-cols-12 h-[600px]">
              {/* Sidebar */}
              <div className="col-span-2 bg-gray-50 border-r border-gray-200 p-4">
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="h-8 w-8 rounded-md bg-morocco-blue flex items-center justify-center">
                      <LayoutDashboard className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-morocco-navy text-lg">Buildora</span>
                  </div>
                  
                  <div className="space-y-1">
                    {[
                      { icon: LayoutDashboard, label: "Dashboard", active: true },
                      { icon: FileText, label: "Projets" },
                      { icon: Calendar, label: "Planning" },
                      { icon: Users, label: "Équipe" },
                      { icon: TrendingUp, label: "Rapports" },
                      { icon: BarChart3, label: "Analyses" },
                      { icon: Settings, label: "Paramètres" }
                    ].map((item, index) => (
                      <button 
                        key={index}
                        className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                          item.active 
                            ? "bg-morocco-blue text-white" 
                            : "text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="bg-morocco-blue/10 rounded-lg p-3">
                    <p className="text-xs text-morocco-blue font-medium mb-2">Espace de stockage</p>
                    <Progress value={64} className="h-2 mb-1" />
                    <p className="text-xs text-gray-600">64% utilisé</p>
                  </div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="col-span-10 p-6 bg-gray-100 overflow-y-auto">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-morocco-navy">Bienvenue, Mohammed</h2>
                  <p className="text-gray-600">Voici un aperçu de vos projets en cours</p>
                </div>
                
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="mb-6">
                    {slides.map((slide) => (
                      <TabsTrigger 
                        key={slide.id} 
                        value={slide.id}
                        onClick={() => setCurrentSlide(slides.findIndex(s => s.id === slide.id))}
                        className={slide.id === slides[currentSlide].id ? "bg-morocco-blue text-white" : ""}
                      >
                        {slide.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {[
                        { 
                          title: "Projets actifs", 
                          value: "8", 
                          change: "+2", 
                          icon: FileText, 
                          color: "bg-blue-500" 
                        },
                        { 
                          title: "Tâches en attente", 
                          value: "24", 
                          change: "-5", 
                          icon: Clock, 
                          color: "bg-amber-500" 
                        },
                        { 
                          title: "Projets terminés", 
                          value: "16", 
                          change: "+3", 
                          icon: CheckCircle2, 
                          color: "bg-green-500" 
                        }
                      ].map((stat, index) => (
                        <Card key={index}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-sm font-medium text-gray-500">
                                {stat.title}
                              </CardTitle>
                              <div className={`${stat.color} p-2 rounded-lg`}>
                                <stat.icon className="h-4 w-4 text-white" />
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-baseline space-x-2">
                              <span className="text-3xl font-bold text-morocco-navy">
                                {stat.value}
                              </span>
                              <span className={`text-xs font-medium ${
                                stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
                              }`}>
                                {stat.change} ce mois
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <Card>
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <CardTitle>Progression des projets</CardTitle>
                              <Button variant="outline" size="sm">
                                Voir tous
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {[
                                { 
                                  name: "Résidence Casablanca Gardens", 
                                  progress: 75, 
                                  status: "En cours",
                                  dueDate: "15 Jun" 
                                },
                                { 
                                  name: "Centre commercial Marrakech Plaza", 
                                  progress: 40, 
                                  status: "En cours",
                                  dueDate: "22 Jul" 
                                },
                                { 
                                  name: "École internationale de Rabat", 
                                  progress: 90, 
                                  status: "Presque terminé",
                                  dueDate: "5 Jun" 
                                },
                                { 
                                  name: "Hôtel Atlas Panorama", 
                                  progress: 20, 
                                  status: "Début",
                                  dueDate: "30 Aug" 
                                },
                              ].map((project, index) => (
                                <div key={index} className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium text-morocco-navy">{project.name}</span>
                                    <Badge variant={
                                      project.progress > 80 ? "default" : 
                                      project.progress > 40 ? "secondary" : "outline"
                                    }>
                                      {project.status}
                                    </Badge>
                                  </div>
                                  <div className="flex justify-between items-center text-xs text-gray-500">
                                    <span>Progression</span>
                                    <span>Date limite: {project.dueDate}</span>
                                  </div>
                                  <Progress value={project.progress} className="h-2" />
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <Card>
                          <CardHeader>
                            <CardTitle>Activité récente</CardTitle>
                            <CardDescription>24 heures dernières</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {[
                                { 
                                  message: "Rapport soumis pour Résidence Casablanca", 
                                  time: "Il y a 2h",
                                  icon: FileText,
                                  iconColor: "bg-blue-500" 
                                },
                                { 
                                  message: "Nouvelle tâche assignée", 
                                  time: "Il y a 4h",
                                  icon: Clock,
                                  iconColor: "bg-amber-500" 
                                },
                                { 
                                  message: "Problème signalé sur le chantier", 
                                  time: "Il y a 5h",
                                  icon: AlertTriangle,
                                  iconColor: "bg-red-500" 
                                },
                                { 
                                  message: "Phase 2 complétée", 
                                  time: "Il y a 6h",
                                  icon: CheckCircle2,
                                  iconColor: "bg-green-500" 
                                },
                              ].map((activity, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                  <div className={`${activity.iconColor} p-2 rounded-lg shrink-0`}>
                                    <activity.icon className="h-3 w-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-morocco-navy">{activity.message}</p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="projects" className="mt-0">
                    {/* Projects Tab Content */}
                    <Card className="min-h-[300px] flex items-center justify-center">
                      <CardContent>
                        <div className="text-center">
                          <FileText className="h-12 w-12 text-morocco-blue mx-auto mb-4" />
                          <h3 className="text-lg font-bold text-morocco-navy mb-2">Gestion des projets</h3>
                          <p className="text-gray-500">Aperçu de la vue de gestion des projets</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="tasks" className="mt-0">
                    {/* Tasks Tab Content */}
                    <Card className="min-h-[300px] flex items-center justify-center">
                      <CardContent>
                        <div className="text-center">
                          <Clock className="h-12 w-12 text-morocco-blue mx-auto mb-4" />
                          <h3 className="text-lg font-bold text-morocco-navy mb-2">Gestion des tâches</h3>
                          <p className="text-gray-500">Aperçu de la vue de gestion des tâches</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="reports" className="mt-0">
                    {/* Reports Tab Content */}
                    <Card className="min-h-[300px] flex items-center justify-center">
                      <CardContent>
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 text-morocco-blue mx-auto mb-4" />
                          <h3 className="text-lg font-bold text-morocco-navy mb-2">Rapports et analyses</h3>
                          <p className="text-gray-500">Aperçu de la vue des rapports et analyses</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
          
          {/* Dashboard controls */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-white rounded-full shadow-md px-4 py-2">
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-full"
              onClick={togglePlayback}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            {slides.map((slide, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm" 
                className={`rounded-full w-3 h-3 p-0 ${
                  currentSlide === index ? "bg-morocco-blue" : "bg-gray-300"
                }`}
                onClick={() => {
                  setCurrentSlide(index);
                  const tabTrigger = document.querySelector(`[data-value="${slide.id}"]`) as HTMLElement;
                  if (tabTrigger) {
                    tabTrigger.click();
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
