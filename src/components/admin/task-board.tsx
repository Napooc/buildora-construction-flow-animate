
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, CheckSquare, Plus, Filter, MoreHorizontal, ChevronsRight, ChevronsLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Demo data for tasks
const tasks = [
  {
    id: 1,
    title: "Finaliser les plans architecturaux",
    description: "Compléter les dessins détaillés pour la phase 1 du projet Les Oliviers",
    project: "Résidence Les Oliviers",
    status: "À faire", // À faire, En cours, En revue, Terminé
    priority: "Haute", // Basse, Moyenne, Haute, Urgente
    dueDate: "2023-06-12",
    assignee: "Sophie Dubois",
    completionPercent: 0,
    comments: 3
  },
  {
    id: 2,
    title: "Commander des matériaux de construction",
    description: "Commander le ciment, les barres d'acier et les briques pour la fondation",
    project: "Résidence Les Oliviers",
    status: "En cours",
    priority: "Haute",
    dueDate: "2023-06-05",
    assignee: "Thomas Martin",
    completionPercent: 50,
    comments: 2
  },
  {
    id: 3,
    title: "Créer le planning de la main d'œuvre",
    description: "Planifier les horaires de travail pour les deux prochaines semaines",
    project: "Tour Jasmin Business Center",
    status: "Terminé",
    priority: "Moyenne",
    dueDate: "2023-06-02",
    assignee: "Julie Leroy",
    completionPercent: 100,
    comments: 0
  },
  {
    id: 4,
    title: "Inspection du site",
    description: "Effectuer une inspection complète du site avant le coulage du béton",
    project: "Tour Jasmin Business Center",
    status: "En revue",
    priority: "Urgente",
    dueDate: "2023-06-08",
    assignee: "Marc Fournier",
    completionPercent: 80,
    comments: 5
  },
  {
    id: 5,
    title: "Réunion avec les investisseurs",
    description: "Présentation de l'avancement du projet et des budgets actuels",
    project: "Centre Commercial Al Medina",
    status: "À faire",
    priority: "Haute",
    dueDate: "2023-06-15",
    assignee: "Nadia Benali",
    completionPercent: 0,
    comments: 1
  },
  {
    id: 6,
    title: "Révision des normes de sécurité",
    description: "S'assurer que toutes les procédures de sécurité sont à jour et conformes",
    project: "Centre Commercial Al Medina",
    status: "En cours",
    priority: "Moyenne",
    dueDate: "2023-06-10",
    assignee: "Hugo Leclerc",
    completionPercent: 30,
    comments: 0
  },
  {
    id: 7,
    title: "Finaliser les contrats fournisseurs",
    description: "Réviser et signer les contrats avec les principaux fournisseurs",
    project: "Complexe Hôtelier Atlas View",
    status: "À faire",
    priority: "Moyenne",
    dueDate: "2023-06-20",
    assignee: "Emma Petit",
    completionPercent: 0,
    comments: 2
  },
  {
    id: 8,
    title: "Mise à jour du budget trimestriel",
    description: "Ajuster les prévisions budgétaires en fonction des dépenses actuelles",
    project: "Parc Résidentiel Les Dunes",
    status: "Terminé",
    priority: "Haute",
    dueDate: "2023-06-01",
    assignee: "Lucas Blanc",
    completionPercent: 100,
    comments: 4
  }
];

export function TaskBoard() {
  const [viewType, setViewType] = useState('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.project.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesPriority = priorityFilter === 'all' || task.priority.toLowerCase() === priorityFilter.toLowerCase();
    
    return matchesSearch && matchesPriority;
  });

  const todoTasks = filteredTasks.filter(task => task.status === "À faire");
  const inProgressTasks = filteredTasks.filter(task => task.status === "En cours");
  const reviewTasks = filteredTasks.filter(task => task.status === "En revue");
  const doneTasks = filteredTasks.filter(task => task.status === "Terminé");
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-2xl font-bold text-morocco-deep-blue"
        >
          Tableau des tâches
        </motion.h2>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setViewType('kanban')}>
            Kanban
          </Button>
          <Button variant="outline" size="sm" onClick={() => setViewType('list')}>
            Liste
          </Button>
          <Button variant="outline" size="sm" onClick={() => setViewType('gantt')}>
            Gantt
          </Button>
          <Button variant="default" size="sm" className="bg-morocco-blue hover:bg-morocco-deep-blue">
            <Plus className="mr-1 h-4 w-4" /> Nouvelle tâche
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            placeholder="Rechercher des tâches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Filter className="h-4 w-4" />
          </div>
        </div>
        
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtre de priorité" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les priorités</SelectItem>
            <SelectItem value="basse">Priorité basse</SelectItem>
            <SelectItem value="moyenne">Priorité moyenne</SelectItem>
            <SelectItem value="haute">Priorité haute</SelectItem>
            <SelectItem value="urgente">Priorité urgente</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {viewType === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KanbanColumn title="À faire" count={todoTasks.length} tasks={todoTasks} />
          <KanbanColumn title="En cours" count={inProgressTasks.length} tasks={inProgressTasks} />
          <KanbanColumn title="En revue" count={reviewTasks.length} tasks={reviewTasks} />
          <KanbanColumn title="Terminé" count={doneTasks.length} tasks={doneTasks} />
        </div>
      )}

      {viewType === 'list' && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Liste des tâches</CardTitle>
            <CardDescription>Vue de toutes les tâches actives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <TaskListItem task={task} />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {viewType === 'gantt' && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Diagramme de Gantt</CardTitle>
            <CardDescription>Planification temporelle des tâches</CardDescription>
          </CardHeader>
          <CardContent className="pb-0 pt-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ChevronsLeft className="h-4 w-4 mr-2" /> Semaine précédente
                </Button>
                <span className="font-medium">Semaine du 5 juin 2023</span>
                <Button variant="outline" size="sm">
                  Semaine suivante <ChevronsRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <Button variant="outline" size="sm">Aujourd'hui</Button>
            </div>
            
            <div className="border rounded-lg">
              <div className="grid grid-cols-8 border-b">
                <div className="col-span-3 border-r p-2 font-medium">Tâche</div>
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'].map(day => (
                  <div key={day} className="text-center p-2 font-medium">{day}</div>
                ))}
              </div>
              
              {filteredTasks.map((task, index) => (
                <div key={task.id} className={`grid grid-cols-8 ${index !== filteredTasks.length - 1 ? 'border-b' : ''}`}>
                  <div className="col-span-3 border-r p-2">
                    <div className="font-medium truncate">{task.title}</div>
                    <div className="text-xs text-gray-500">{task.project}</div>
                  </div>
                  
                  <GanttBar 
                    task={task} 
                    startDay={Math.floor(Math.random() * 3)} // Mock start day
                    duration={Math.floor(Math.random() * 3) + 1} // Mock duration
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}

function KanbanColumn({ title, count, tasks }) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-1">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="outline">{count}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-1 pb-2 px-2">
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {tasks.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
            >
              <TaskCard task={task} />
            </motion.div>
          ))}
          
          <Button variant="ghost" className="w-full border border-dashed border-gray-300 mt-2">
            <Plus className="h-4 w-4 mr-1" /> Ajouter une tâche
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TaskCard({ task }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Basse": return "bg-blue-100 text-blue-800";
      case "Moyenne": return "bg-green-100 text-green-800";
      case "Haute": return "bg-amber-100 text-amber-800";
      case "Urgente": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className={task.status === "Terminé" ? "bg-gray-50" : ""}>
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <h4 className={`font-medium ${task.status === "Terminé" ? "line-through text-gray-500" : ""}`}>
              {task.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1">{task.project}</p>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-2">
          <p className="text-xs text-gray-500 line-clamp-2">{task.description}</p>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </Badge>
          
          <div className="flex items-center">
            <Clock className="text-gray-400 h-3 w-3 mr-1" />
            <span className="text-xs text-gray-500">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        {task.status !== "À faire" && (
          <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-morocco-blue h-1.5 rounded-full" 
              style={{ width: `${task.completionPercent}%` }}
            />
          </div>
        )}
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-full bg-morocco-blue flex items-center justify-center text-white text-xs">
              {task.assignee.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          
          {task.comments > 0 && (
            <div className="flex items-center">
              <CheckSquare className="text-gray-400 h-3 w-3 mr-1" />
              <span className="text-xs text-gray-500">{task.comments}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function TaskListItem({ task }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Basse": return "bg-blue-100 text-blue-800";
      case "Moyenne": return "bg-green-100 text-green-800";
      case "Haute": return "bg-amber-100 text-amber-800";
      case "Urgente": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "À faire": return "bg-gray-100 text-gray-800";
      case "En cours": return "bg-blue-100 text-blue-800";
      case "En revue": return "bg-amber-100 text-amber-800";
      case "Terminé": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className={`font-medium ${task.status === "Terminé" ? "line-through text-gray-500" : ""}`}>
              {task.title}
            </h4>
            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
          </div>
          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
        </div>
        
        <div className="flex flex-col items-end space-y-1">
          <Badge className={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
          <span className="text-xs text-gray-500">
            Échéance: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <User className="text-gray-400 h-4 w-4 mr-1" />
            <span className="text-sm text-gray-600">{task.assignee}</span>
          </div>
          
          <div className="flex items-center">
            <Calendar className="text-gray-400 h-4 w-4 mr-1" />
            <span className="text-sm text-gray-600">{task.project}</span>
          </div>
        </div>
        
        {task.status !== "À faire" && task.status !== "Terminé" && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{task.completionPercent}%</span>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-morocco-blue h-2 rounded-full" 
                style={{ width: `${task.completionPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GanttBar({ task, startDay, duration }) {
  // Renders a gantt chart bar
  return (
    <>
      {Array(5).fill(0).map((_, i) => {
        if (i >= startDay && i < startDay + duration) {
          const isStart = i === startDay;
          const isEnd = i === startDay + duration - 1;
          const borderRadius = 
            isStart && isEnd ? 'rounded-md' :
            isStart ? 'rounded-l-md' :
            isEnd ? 'rounded-r-md' : '';
          
          let bgColor;
          switch(task.status) {
            case 'À faire': bgColor = 'bg-gray-200'; break;
            case 'En cours': bgColor = 'bg-morocco-blue'; break;
            case 'En revue': bgColor = 'bg-morocco-gold'; break;
            case 'Terminé': bgColor = 'bg-green-500'; break;
            default: bgColor = 'bg-gray-200';
          }
          
          return (
            <div key={i} className="p-1">
              <div className={`${bgColor} ${borderRadius} h-6 flex items-center justify-center`}>
                {isStart && (
                  <span className="text-xs text-white font-medium truncate px-2">{task.title}</span>
                )}
              </div>
            </div>
          );
        } else {
          return <div key={i} className="p-1"></div>;
        }
      })}
    </>
  );
}
