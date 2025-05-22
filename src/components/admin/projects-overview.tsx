
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from "framer-motion";
import { 
  CalendarDays, 
  Users, 
  Clock, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle,
  Plus,
  Pencil,
  Trash2,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ProjectFormDialog } from "./project-form-dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const COLORS = ['#1A5F7A', '#C35831', '#D9A566', '#0B3C5D', '#E6D7B9'];

export function ProjectsOverview() {
  const [view, setView] = useState('grid');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projectStats, setProjectStats] = useState({
    totalBudget: 0,
    avgProgress: 0,
    onTimePercentage: 0,
    resolvedIssuesPercentage: 0
  });
  
  const [progressData, setProgressData] = useState([]);
  const [distributionData, setDistributionData] = useState([]);
  
  useEffect(() => {
    fetchProjects();
  }, []);
  
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      console.log("Fetched projects:", data);
      setProjects(data || []);
      
      // Calculate stats
      if (data && data.length > 0) {
        calculateStats(data);
        generateChartData(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Impossible de charger les projets");
    } finally {
      setIsLoading(false);
    }
  };
  
  const calculateStats = (data) => {
    // Total budget
    const totalBudget = data.reduce((sum, project) => sum + Number(project.budget), 0);
    
    // Average progress
    const avgProgress = Math.round(data.reduce((sum, project) => sum + project.progress, 0) / data.length);
    
    // On-time projects percentage
    const onTimeProjects = data.filter(project => project.delay_days === 0).length;
    const onTimePercentage = Math.round((onTimeProjects / data.length) * 100);
    
    // Issues resolved calculation
    const totalIssues = data.reduce((sum, project) => sum + project.issues, 0);
    // This is a placeholder since we don't have resolved issues data
    const resolvedIssuesPercentage = 93; // Mock data for now
    
    setProjectStats({
      totalBudget,
      avgProgress,
      onTimePercentage,
      resolvedIssuesPercentage
    });
  };
  
  const generateChartData = (data) => {
    // Generate mock progress data
    // In a real app, you might have historical data
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'];
    const progress = [20, 35, 45, 60, 75, 85, 95];
    
    setProgressData(months.map((month, i) => ({ name: month, progress: progress[i] })));
    
    // Distribution data based on status
    const statusCounts = data.reduce((counts, project) => {
      counts[project.status] = (counts[project.status] || 0) + 1;
      return counts;
    }, {});
    
    setDistributionData(
      Object.entries(statusCounts).map(([name, value]) => ({ name, value }))
    );
  };
  
  const openCreateForm = () => {
    setSelectedProject(null);
    setProjectFormOpen(true);
  };
  
  const openEditForm = (project) => {
    setSelectedProject(project);
    setProjectFormOpen(true);
  };
  
  const confirmDelete = (project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };
  
  const deleteProject = async () => {
    if (!projectToDelete) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectToDelete.id);
        
      if (error) throw error;
      
      toast.success("Projet supprimé avec succès");
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Erreur lors de la suppression du projet");
    } finally {
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };
  
  const formatBudget = (budget) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(budget);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 text-morocco-blue animate-spin" />
        <span className="ml-2 text-morocco-blue">Chargement des projets...</span>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-2xl font-bold text-morocco-deep-blue"
        >
          Vue d'ensemble des projets
        </motion.h2>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setView('grid')}
            className={view === 'grid' ? 'bg-gray-100' : ''}
          >
            Grille
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setView('list')}
            className={view === 'list' ? 'bg-gray-100' : ''}
          >
            Liste
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="bg-morocco-blue hover:bg-morocco-deep-blue"
            onClick={openCreateForm}
          >
            <Plus className="h-4 w-4 mr-1" /> Nouveau Projet
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Progression des projets</CardTitle>
            <CardDescription>Évolution moyenne mensuelle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={progressData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Progression']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="progress" 
                    name="Progression" 
                    stroke="#1A5F7A" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Distribution des projets</CardTitle>
            <CardDescription>Par statut</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Statistiques des projets</CardTitle>
            <CardDescription>Vue d'ensemble</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Budget total des projets</span>
                  <span className="font-semibold">{formatBudget(projectStats.totalBudget)}</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Progression moyenne</span>
                  <span className="font-semibold">{projectStats.avgProgress}%</span>
                </div>
                <Progress value={projectStats.avgProgress} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Projets dans les temps</span>
                  <span className="font-semibold">{projectStats.onTimePercentage}%</span>
                </div>
                <Progress value={projectStats.onTimePercentage} className="h-2 bg-green-100">
                  <div className="bg-green-500 h-full w-[var(--progress)]"></div>
                </Progress>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Problèmes résolus</span>
                  <span className="font-semibold">{projectStats.resolvedIssuesPercentage}%</span>
                </div>
                <Progress value={projectStats.resolvedIssuesPercentage} className="h-2 bg-blue-100">
                  <div className="bg-blue-500 h-full w-[var(--progress)]"></div>
                </Progress>
              </div>
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  Voir le rapport détaillé
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {projects.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="rounded-full bg-gray-100 p-4">
                <AlertTriangle className="h-8 w-8 text-morocco-gold" />
              </div>
              <h3 className="text-lg font-medium">Aucun projet trouvé</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Vous n'avez pas encore créé de projet. Cliquez sur le bouton ci-dessous pour commencer.
              </p>
              <Button 
                onClick={openCreateForm}
                className="mt-2 bg-morocco-blue hover:bg-morocco-deep-blue"
              >
                <Plus className="h-4 w-4 mr-1" /> Créer un projet
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onEdit={() => openEditForm(project)}
              onDelete={() => confirmDelete(project)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left">Projet</th>
                    <th className="p-4 text-left">Statut</th>
                    <th className="p-4 text-left">Progrès</th>
                    <th className="p-4 text-left">Budget</th>
                    <th className="p-4 text-left">Équipe</th>
                    <th className="p-4 text-left">Retard</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-gray-500">{project.location}</div>
                      </td>
                      <td className="p-4">
                        <StatusBadge status={project.status} />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <Progress value={project.progress} className="h-2 w-24 mr-2" />
                          <span>{project.progress}%</span>
                        </div>
                      </td>
                      <td className="p-4">{formatBudget(project.budget)}</td>
                      <td className="p-4">{project.team_size > 0 ? project.team_size : '-'}</td>
                      <td className="p-4">
                        {project.delay_days > 0 ? (
                          <span className="text-red-500">{project.delay_days} jours</span>
                        ) : (
                          <span className="text-green-500">Dans les temps</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => openEditForm(project)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-500 hover:bg-red-50"
                            onClick={() => confirmDelete(project)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Project Form Dialog */}
      <ProjectFormDialog
        open={projectFormOpen}
        onClose={() => setProjectFormOpen(false)}
        project={selectedProject}
        onSuccess={fetchProjects}
      />
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Le projet {projectToDelete?.name} sera définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteProject}
              className="bg-red-500 hover:bg-red-600"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}

function ProjectCard({ project, index, onEdit, onDelete }) {
  const formatBudget = (budget) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(budget);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <CardDescription>{project.location || "Emplacement non spécifié"}</CardDescription>
            </div>
            <StatusBadge status={project.status} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progression</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center text-sm">
                <CalendarDays className="h-4 w-4 mr-2 text-morocco-blue" />
                <span>Échéance: {formatDate(project.deadline)}</span>
              </div>
              <div className="flex items-center text-sm">
                <Users className="h-4 w-4 mr-2 text-morocco-blue" />
                <span>Équipe: {project.team_size > 0 ? project.team_size : '-'}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">{formatBudget(project.budget)}</span>
              {project.delay_days > 0 && (
                <div className="flex items-center text-amber-600 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Retard: {project.delay_days} jours</span>
                </div>
              )}
              
              {project.issues > 0 && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  <span>{project.issues} problème{project.issues > 1 ? 's' : ''}</span>
                </div>
              )}
              
              {project.issues === 0 && project.delay_days === 0 && project.status !== 'Terminé' && (
                <div className="flex items-center text-green-600 text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span>Dans les temps</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="w-full">
                Voir les détails
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="p-0 w-10"
                onClick={onEdit}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="p-0 w-10 text-red-500 hover:bg-red-50"
                onClick={onDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StatusBadge({ status }) {
  let color;
  switch (status) {
    case 'En cours':
      color = "bg-morocco-blue text-white";
      break;
    case 'Planification':
      color = "bg-morocco-gold text-morocco-navy";
      break;
    case 'Terminé':
      color = "bg-green-500 text-white";
      break;
    default:
      color = "bg-gray-500 text-white";
  }
  
  return (
    <Badge className={`${color}`}>{status}</Badge>
  );
}
