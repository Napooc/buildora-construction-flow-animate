
import { useState } from "react";
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
import { CalendarDays, Users, Clock, ChevronRight, AlertTriangle, CheckCircle } from "lucide-react";

const progressData = [
  { name: 'Jan', progress: 20 },
  { name: 'Fév', progress: 35 },
  { name: 'Mar', progress: 45 },
  { name: 'Avr', progress: 60 },
  { name: 'Mai', progress: 75 },
  { name: 'Juin', progress: 85 },
  { name: 'Juil', progress: 95 },
];

const projectData = [
  {
    id: 1,
    name: "Résidence Les Oliviers",
    status: "En cours",
    progress: 75,
    deadline: "2025-08-15",
    budget: "2,450,000 €",
    teamSize: 12,
    delayDays: 0,
    location: "Casablanca",
    issues: 2
  },
  {
    id: 2,
    name: "Tour Jasmin Business Center",
    status: "En cours",
    progress: 45,
    deadline: "2025-12-01",
    budget: "8,750,000 €",
    teamSize: 28,
    delayDays: 5,
    location: "Rabat",
    issues: 4
  },
  {
    id: 3,
    name: "Complexe Hôtelier Atlas View",
    status: "Planification",
    progress: 15,
    deadline: "2026-06-30",
    budget: "12,300,000 €",
    teamSize: 0,
    delayDays: 0,
    location: "Marrakech",
    issues: 0
  },
  {
    id: 4,
    name: "Parc Résidentiel Les Dunes",
    status: "Terminé",
    progress: 100,
    deadline: "2024-12-10",
    budget: "5,800,000 €",
    teamSize: 0,
    delayDays: 12,
    location: "Agadir",
    issues: 0
  },
  {
    id: 5,
    name: "Centre Commercial Al Medina",
    status: "En cours",
    progress: 60,
    deadline: "2025-09-22",
    budget: "14,200,000 €",
    teamSize: 34,
    delayDays: 0,
    location: "Tanger",
    issues: 1
  }
];

const distributionData = [
  { name: 'En cours', value: 3 },
  { name: 'Planification', value: 1 },
  { name: 'Terminé', value: 1 }
];

const COLORS = ['#1A5F7A', '#C35831', '#D9A566', '#0B3C5D', '#E6D7B9'];

export function ProjectsOverview() {
  const [view, setView] = useState('grid');
  
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
          <Button variant="outline" size="sm" onClick={() => setView('grid')}>
            Grille
          </Button>
          <Button variant="outline" size="sm" onClick={() => setView('list')}>
            Liste
          </Button>
          <Button variant="default" size="sm" className="bg-morocco-blue hover:bg-morocco-deep-blue">
            Nouveau Projet
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
                  <span className="font-semibold">43,500,000 €</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Progression moyenne</span>
                  <span className="font-semibold">59%</span>
                </div>
                <Progress value={59} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Projets dans les temps</span>
                  <span className="font-semibold">80%</span>
                </div>
                <Progress value={80} className="h-2 bg-green-100">
                  <div className="bg-green-500 h-full w-[var(--progress)]"></div>
                </Progress>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Problèmes résolus</span>
                  <span className="font-semibold">93%</span>
                </div>
                <Progress value={93} className="h-2 bg-blue-100">
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
      
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Projet</th>
                  <th className="p-4 text-left">Statut</th>
                  <th className="p-4 text-left">Progrès</th>
                  <th className="p-4 text-left">Budget</th>
                  <th className="p-4 text-left">Équipe</th>
                  <th className="p-4 text-left">Retard</th>
                </tr>
              </thead>
              <tbody>
                {projectData.map((project) => (
                  <tr key={project.id} className="border-b hover:bg-gray-50 cursor-pointer">
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
                    <td className="p-4">{project.budget}</td>
                    <td className="p-4">{project.teamSize > 0 ? project.teamSize : '-'}</td>
                    <td className="p-4">
                      {project.delayDays > 0 ? (
                        <span className="text-red-500">{project.delayDays} jours</span>
                      ) : (
                        <span className="text-green-500">Dans les temps</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}

function ProjectCard({ project, index }) {
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
              <CardDescription>{project.location}</CardDescription>
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
                <span>Échéance: {new Date(project.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm">
                <Users className="h-4 w-4 mr-2 text-morocco-blue" />
                <span>Équipe: {project.teamSize > 0 ? project.teamSize : '-'}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">{project.budget}</span>
              {project.delayDays > 0 && (
                <div className="flex items-center text-amber-600 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Retard: {project.delayDays} jours</span>
                </div>
              )}
              
              {project.issues > 0 && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  <span>{project.issues} problème{project.issues > 1 ? 's' : ''}</span>
                </div>
              )}
              
              {project.issues === 0 && project.delayDays === 0 && project.status !== 'Terminé' && (
                <div className="flex items-center text-green-600 text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span>Dans les temps</span>
                </div>
              )}
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              Voir les détails
            </Button>
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
