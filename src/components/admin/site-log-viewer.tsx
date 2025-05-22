
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  Calendar, 
  FileImage, 
  AlertCircle, 
  FileText, 
  Clock, 
  User, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Pin, 
  Check,
  Download,
  Upload
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data
const logEntries = [
  {
    id: 1,
    date: "2023-06-05",
    project: "Résidence Les Oliviers",
    author: "Thomas Martin",
    weather: "Ensoleillé, 28°C",
    workerCount: 15,
    summary: "Coulage des fondations terminé pour le bâtiment A. Installation des coffrages pour le bâtiment B commencée.",
    incidents: [],
    tasks: [
      { name: "Coulage des fondations (Bâtiment A)", status: "Terminé" },
      { name: "Installation des coffrages (Bâtiment B)", status: "En cours" },
      { name: "Livraison des matériaux électriques", status: "Retardé" }
    ],
    materials: [
      { name: "Ciment Portland", quantity: 75, unit: "sacs" },
      { name: "Barres d'acier", quantity: 120, unit: "unités" }
    ],
    photos: [
      { id: "p1", title: "Fondations Bâtiment A", url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e" },
      { id: "p2", title: "Livraison de matériaux", url: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6" }
    ],
    comments: "L'équipe a maintenu un bon rythme malgré la chaleur. Les livraisons de matériaux électriques sont retardées de 2 jours."
  },
  {
    id: 2,
    date: "2023-06-04",
    project: "Tour Jasmin Business Center",
    author: "Sophie Dubois",
    weather: "Nuageux, 22°C",
    workerCount: 22,
    summary: "Installation des structures d'acier pour les étages 3-5. Inspection des travaux d'électricité aux étages 1-2.",
    incidents: [
      { type: "Sécurité", description: "Chute légère d'un ouvrier, soigné sur place, pas de blessure grave." }
    ],
    tasks: [
      { name: "Installation des structures d'acier (Étages 3-5)", status: "En cours" },
      { name: "Inspection électrique (Étages 1-2)", status: "Terminé" },
      { name: "Tests de plomberie", status: "En cours" }
    ],
    materials: [
      { name: "Poutres en acier", quantity: 30, unit: "unités" },
      { name: "Câbles électriques", quantity: 450, unit: "mètres" }
    ],
    photos: [
      { id: "p3", title: "Structure d'acier étage 4", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df" },
      { id: "p4", title: "Travaux d'électricité étage 1", url: "https://images.unsplash.com/photo-1532383282788-55e8a1c53235" }
    ],
    comments: "Progrès satisfaisant malgré un petit incident de sécurité. Rappel des consignes de sécurité effectué à toute l'équipe."
  },
  {
    id: 3,
    date: "2023-06-03",
    project: "Centre Commercial Al Medina",
    author: "Marc Fournier",
    weather: "Pluvieux, 18°C",
    workerCount: 8,
    summary: "Travaux suspendus en raison des fortes pluies. Réunion de planification tenue pour réorganiser le calendrier.",
    incidents: [
      { type: "Météo", description: "Fortes pluies causant un retard d'une journée." },
      { type: "Technique", description: "Fuite d'eau détectée dans la zone de fondation Sud." }
    ],
    tasks: [
      { name: "Installation de toiture", status: "Retardé" },
      { name: "Planification des travaux intérieurs", status: "Terminé" }
    ],
    materials: [],
    photos: [
      { id: "p5", title: "Conditions du site pendant la pluie", url: "https://images.unsplash.com/photo-1523772721666-22ad3c3b6f90" }
    ],
    comments: "La pluie a significativement impacté le planning. Une fuite dans les fondations sud a été identifiée et sera corrigée dès que les conditions le permettront."
  },
  {
    id: 4,
    date: "2023-06-02",
    project: "Complexe Hôtelier Atlas View",
    author: "Nadia Benali",
    weather: "Ensoleillé, 30°C",
    workerCount: 12,
    summary: "Début des travaux de terrassement. Installation du chantier et délimitation des zones.",
    incidents: [],
    tasks: [
      { name: "Terrassement zone A", status: "En cours" },
      { name: "Installation des clôtures de chantier", status: "Terminé" },
      { name: "Bornage du terrain", status: "Terminé" }
    ],
    materials: [
      { name: "Barrières de sécurité", quantity: 40, unit: "unités" }
    ],
    photos: [
      { id: "p6", title: "Vue générale du terrain", url: "https://images.unsplash.com/photo-1503387837-b154d5074bd2" },
      { id: "p7", title: "Travaux de terrassement", url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5" }
    ],
    comments: "Premier jour sur le nouveau projet. Le terrain est en bon état et les travaux ont démarré comme prévu."
  },
  {
    id: 5,
    date: "2023-06-01",
    project: "Résidence Les Oliviers",
    author: "Thomas Martin",
    weather: "Ensoleillé, 26°C",
    workerCount: 14,
    summary: "Préparation pour le coulage des fondations du bâtiment A. Livraison des matériaux pour les fondations.",
    incidents: [],
    tasks: [
      { name: "Préparation des fondations (Bâtiment A)", status: "Terminé" },
      { name: "Réception des matériaux", status: "Terminé" }
    ],
    materials: [
      { name: "Ciment Portland", quantity: 100, unit: "sacs" },
      { name: "Acier d'armature", quantity: 200, unit: "barres" },
      { name: "Gravier", quantity: 15, unit: "tonnes" }
    ],
    photos: [
      { id: "p8", title: "Site préparé pour fondations", url: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6" },
      { id: "p9", title: "Livraison de matériaux", url: "https://images.unsplash.com/photo-1580810734934-7c75e43b8693" }
    ],
    comments: "Tous les préparatifs sont terminés pour le coulage des fondations demain. L'équipe est motivée et le temps est favorable."
  }
];

export function SiteLogViewer() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [viewMode, setViewMode] = useState('all'); // all, photos, incidents
  
  const projectOptions = [...new Set(logEntries.map(log => log.project))];
  const logsPerPage = 4;
  
  const filteredLogs = logEntries.filter(log => {
    const matchesSearch = 
      log.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.comments.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.author.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesProject = projectFilter === 'all' || log.project === projectFilter;
    
    const matchesDate = !selectedDate || log.date === selectedDate;
    
    return matchesSearch && matchesProject && matchesDate;
  });
  
  const totalIncidents = logEntries.reduce((sum, log) => sum + log.incidents.length, 0);
  const totalPhotos = logEntries.reduce((sum, log) => sum + log.photos.length, 0);
  
  // Pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  
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
          Journal de chantier
        </motion.h2>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setViewMode('all')}>
            <FileText className="mr-2 h-4 w-4" /> Tous les journaux
          </Button>
          <Button variant="outline" size="sm" onClick={() => setViewMode('photos')}>
            <FileImage className="mr-2 h-4 w-4" /> Photos ({totalPhotos})
          </Button>
          <Button variant="outline" size="sm" onClick={() => setViewMode('incidents')}>
            <AlertCircle className="mr-2 h-4 w-4" /> Incidents ({totalIncidents})
          </Button>
          <Button variant="default" size="sm" className="bg-morocco-blue hover:bg-morocco-deep-blue">
            <Upload className="mr-2 h-4 w-4" /> Ajouter un journal
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            placeholder="Rechercher dans les journaux..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="h-4 w-4" />
          </div>
        </div>
        
        <Select value={projectFilter} onValueChange={setProjectFilter}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Filtrer par projet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les projets</SelectItem>
            {projectOptions.map(project => (
              <SelectItem key={project} value={project}>{project}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedLog ? (
        <LogDetail log={selectedLog} onBack={() => setSelectedLog(null)} />
      ) : (
        <>
          {viewMode === 'all' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentLogs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -5 }}
                >
                  <LogCard log={log} onClick={() => setSelectedLog(log)} />
                </motion.div>
              ))}
            </div>
          )}
          
          {viewMode === 'photos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {logEntries.flatMap(log => 
                log.photos.map(photo => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    className="cursor-pointer"
                    onClick={() => setSelectedLog(log)}
                  >
                    <PhotoCard 
                      photo={photo} 
                      project={log.project} 
                      date={log.date} 
                    />
                  </motion.div>
                ))
              )}
            </div>
          )}
          
          {viewMode === 'incidents' && (
            <div className="space-y-4">
              {logEntries
                .filter(log => log.incidents && log.incidents.length > 0)
                .map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="border-l-4 border-l-red-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-bold">{log.project}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" /> 
                              {new Date(log.date).toLocaleDateString()}
                              <User className="h-4 w-4 ml-3 mr-1" /> 
                              {log.author}
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedLog(log)}
                          >
                            Voir détails
                          </Button>
                        </div>
                        
                        <div className="space-y-2 mt-4">
                          {log.incidents.map((incident, i) => (
                            <div key={i} className="bg-red-50 p-3 rounded-md">
                              <div className="flex items-center text-red-700 font-medium mb-1">
                                <AlertCircle className="h-4 w-4 mr-1" /> 
                                Incident: {incident.type}
                              </div>
                              <p className="text-sm text-gray-700">{incident.description}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
                
                {logEntries.filter(log => log.incidents && log.incidents.length > 0).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p>Aucun incident signalé</p>
                  </div>
                )}
            </div>
          )}
          
          {/* Pagination */}
          {viewMode === 'all' && filteredLogs.length > logsPerPage && (
            <div className="flex justify-center mt-6 space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center px-4">
                <span>
                  Page {currentPage} sur {totalPages}
                </span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

function LogCard({ log, onClick }) {
  return (
    <Card className="h-full hover:shadow-md transition-all duration-300 cursor-pointer" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-morocco-deep-blue truncate">{log.project}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" /> 
              {new Date(log.date).toLocaleDateString()}
            </div>
          </div>
          
          {log.incidents.length > 0 && (
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              {log.incidents.length} incident{log.incidents.length > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
        
        <div className="mb-3">
          <p className="text-sm text-gray-700 line-clamp-2">{log.summary}</p>
        </div>
        
        <div className="flex items-center justify-between mb-3 text-sm">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1 text-gray-500" /> 
            <span>{log.author}</span>
          </div>
          
          {log.photos.length > 0 && (
            <div className="flex items-center">
              <Camera className="h-4 w-4 mr-1 text-gray-500" /> 
              <span>{log.photos.length} photo{log.photos.length > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
        
        {log.tasks.length > 0 && (
          <div className="mt-3">
            <div className="text-sm font-medium mb-1">Tâches:</div>
            <div className="space-y-1">
              {log.tasks.slice(0, 2).map((task, i) => (
                <div key={i} className="flex items-center text-xs">
                  <div className="w-2 h-2 rounded-full mr-2 
                    bg-gray-400
                    ${task.status === 'Terminé' ? 'bg-green-500' : 
                      task.status === 'En cours' ? 'bg-blue-500' : 
                      task.status === 'Retardé' ? 'bg-amber-500' : 'bg-gray-400'}
                  "></div>
                  <span className="truncate">{task.name}</span>
                </div>
              ))}
              {log.tasks.length > 2 && (
                <div className="text-xs text-gray-500">
                  +{log.tasks.length - 2} autre{log.tasks.length - 2 > 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-end">
          <Button variant="ghost" size="sm">
            Voir détails
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function PhotoCard({ photo, project, date }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 bg-gray-100">
        <img 
          src={`${photo.url}?auto=format&fit=crop&w=300&h=160&q=80`} 
          alt={photo.title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-3">
        <h4 className="font-medium text-sm truncate">{photo.title}</h4>
        <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Pin className="h-3 w-3 mr-1" />
            <span className="truncate max-w-[100px]">{project}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LogDetail({ log, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onBack}
        className="mb-4"
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Retour
      </Button>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{log.project}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-1" /> 
                {new Date(log.date).toLocaleDateString()}
                <User className="h-4 w-4 ml-3 mr-1" /> 
                {log.author}
              </CardDescription>
            </div>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" /> Télécharger PDF
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium text-lg mb-2">Résumé de la journée</h3>
            <p>{log.summary}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm font-medium mb-1 text-gray-700">Conditions météo</div>
                <div className="text-sm">{log.weather}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm font-medium mb-1 text-gray-700">Personnel présent</div>
                <div className="text-sm">{log.workerCount} travailleurs</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm font-medium mb-1 text-gray-700">Statut général</div>
                <div className="flex items-center">
                  <Check className="text-green-500 h-4 w-4 mr-1" />
                  <span className="text-sm">Pas d'incidents majeurs</span>
                </div>
              </div>
            </div>
          </div>
          
          {log.tasks.length > 0 && (
            <div>
              <h3 className="font-medium text-lg mb-2">Tâches</h3>
              <div className="space-y-2">
                {log.tasks.map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 
                        ${task.status === 'Terminé' ? 'bg-green-500' : 
                          task.status === 'En cours' ? 'bg-blue-500' : 
                          task.status === 'Retardé' ? 'bg-amber-500' : 'bg-gray-400'}`}>
                      </div>
                      <span>{task.name}</span>
                    </div>
                    <Badge className={
                      task.status === 'Terminé' ? 'bg-green-100 text-green-800' : 
                      task.status === 'En cours' ? 'bg-blue-100 text-blue-800' : 
                      'bg-amber-100 text-amber-800'
                    }>
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {log.materials.length > 0 && (
            <div>
              <h3 className="font-medium text-lg mb-2">Matériaux utilisés</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-1 font-medium">Matériau</th>
                    <th className="pb-1 font-medium">Quantité</th>
                    <th className="pb-1 font-medium">Unité</th>
                  </tr>
                </thead>
                <tbody>
                  {log.materials.map((material, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2">{material.name}</td>
                      <td className="py-2">{material.quantity}</td>
                      <td className="py-2">{material.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {log.incidents.length > 0 && (
            <div>
              <h3 className="font-medium text-lg mb-2">Incidents</h3>
              <div className="space-y-2">
                {log.incidents.map((incident, i) => (
                  <div key={i} className="bg-red-50 p-4 rounded-md">
                    <div className="flex items-center text-red-700 font-medium mb-1">
                      <AlertCircle className="h-4 w-4 mr-1" /> 
                      Incident: {incident.type}
                    </div>
                    <p className="text-gray-700">{incident.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {log.comments && (
            <div>
              <h3 className="font-medium text-lg mb-2">Notes et commentaires</h3>
              <p className="text-gray-700">{log.comments}</p>
            </div>
          )}
          
          {log.photos.length > 0 && (
            <div>
              <h3 className="font-medium text-lg mb-2">Photos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {log.photos.map((photo) => (
                  <div key={photo.id} className="relative aspect-[4/3] rounded-md overflow-hidden bg-gray-100 group">
                    <img 
                      src={`${photo.url}?auto=format&fit=crop&w=400&q=80`}
                      alt={photo.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-end justify-start p-3">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        {photo.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
