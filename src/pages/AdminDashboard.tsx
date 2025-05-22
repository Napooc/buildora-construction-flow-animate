
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
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
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { toast } = useToast();

  // Check if admin is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Verify if user is admin
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (adminData) {
          setIsAuthenticated(true);
          return;
        }
      }
      
      setIsAuthenticated(false);
    };
    
    checkAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Déconnecté",
      description: "Vous avez été déconnecté avec succès.",
    });
  };
  
  // Redirect if not authenticated
  if (isAuthenticated === false) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-morocco-blue mx-auto"></div>
          <p className="mt-4 text-morocco-navy">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-morocco-deep-blue text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-md bg-morocco-blue flex items-center justify-center">
            <LayoutDashboard className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg">Buildora Admin</span>
        </div>
        <div className="flex items-center">
          <button 
            className="p-2 rounded-md hover:bg-white/10 flex items-center gap-2 text-sm"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Se déconnecter
          </button>
        </div>
      </div>
      
      {/* Dashboard Body */}
      <div className="grid grid-cols-12 min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="col-span-2 bg-white border-r border-gray-200 p-4">
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
          
          <div className="mt-8 pt-8 border-t">
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
            <h2 className="text-2xl font-bold text-morocco-navy">Bienvenue, Admin</h2>
            <p className="text-gray-600">Voici un aperçu de vos projets en cours</p>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              {["overview", "projects", "tasks", "reports"].map((tab) => (
                <TabsTrigger 
                  key={tab} 
                  value={tab}
                  className={tab === "overview" ? "bg-morocco-blue text-white" : ""}
                >
                  {tab === "overview" ? "Aperçu" : 
                   tab === "projects" ? "Projets" : 
                   tab === "tasks" ? "Tâches" : "Rapports"}
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
              <Card className="min-h-[300px]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-morocco-navy mb-4">Gestion des projets</h3>
                  <p className="text-gray-500 mb-6">Cette section est en cours de développement.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tasks" className="mt-0">
              <Card className="min-h-[300px]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-morocco-navy mb-4">Gestion des tâches</h3>
                  <p className="text-gray-500 mb-6">Cette section est en cours de développement.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports" className="mt-0">
              <Card className="min-h-[300px]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-morocco-navy mb-4">Rapports et analyses</h3>
                  <p className="text-gray-500 mb-6">Cette section est en cours de développement.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
