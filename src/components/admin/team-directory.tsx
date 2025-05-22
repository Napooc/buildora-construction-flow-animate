
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Search, Plus, PhoneCall, Mail, MapPin, Building, UserPlus, UserCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample team data
const teamMembers = [
  {
    id: 1,
    name: "Thomas Martin",
    role: "Chef de Projet",
    department: "Management de Projet",
    email: "thomas.martin@buildora.com",
    phone: "+212 6 12 34 56 78",
    location: "Casablanca",
    avatar: null,
    projectCount: 3,
    currentProject: "Résidence Les Oliviers",
    status: "Disponible"
  },
  {
    id: 2,
    name: "Sophie Dubois",
    role: "Architecte Principal",
    department: "Conception",
    email: "sophie.dubois@buildora.com",
    phone: "+212 6 23 45 67 89",
    location: "Casablanca",
    avatar: null,
    projectCount: 2,
    currentProject: "Tour Jasmin Business Center",
    status: "En mission"
  },
  {
    id: 3,
    name: "Marc Fournier",
    role: "Ingénieur Structure",
    department: "Ingénierie",
    email: "marc.fournier@buildora.com",
    phone: "+212 6 34 56 78 90",
    location: "Rabat",
    avatar: null,
    projectCount: 2,
    currentProject: "Tour Jasmin Business Center",
    status: "Disponible"
  },
  {
    id: 4,
    name: "Julie Leroy",
    role: "Responsable Achats",
    department: "Achat & Logistique",
    email: "julie.leroy@buildora.com",
    phone: "+212 6 45 67 89 01",
    location: "Casablanca",
    avatar: null,
    projectCount: 5,
    currentProject: null,
    status: "Disponible"
  },
  {
    id: 5,
    name: "Ahmed Hassan",
    role: "Chef d'Équipe",
    department: "Construction",
    email: "ahmed.hassan@buildora.com",
    phone: "+212 6 56 78 90 12",
    location: "Casablanca",
    avatar: null,
    projectCount: 1,
    currentProject: "Résidence Les Oliviers",
    status: "En mission"
  },
  {
    id: 6,
    name: "Nadia Benali",
    role: "Responsable Administrative",
    department: "Administration",
    email: "nadia.benali@buildora.com",
    phone: "+212 6 67 89 01 23",
    location: "Casablanca",
    avatar: null,
    projectCount: 0,
    currentProject: null,
    status: "Disponible"
  },
  {
    id: 7,
    name: "Omar Kadiri",
    role: "Conducteur de Travaux",
    department: "Construction",
    email: "omar.kadiri@buildora.com",
    phone: "+212 6 78 90 12 34",
    location: "Rabat",
    avatar: null,
    projectCount: 1,
    currentProject: "Tour Jasmin Business Center",
    status: "En mission"
  },
  {
    id: 8,
    name: "Fatima Zahra",
    role: "Ingénieure Électrique",
    department: "Ingénierie",
    email: "fatima.zahra@buildora.com",
    phone: "+212 6 89 01 23 45",
    location: "Tanger",
    avatar: null,
    projectCount: 1,
    currentProject: "Centre Commercial Al Medina",
    status: "En congé"
  }
];

// Sample department data
const departments = [
  {
    name: "Management de Projet",
    count: 1,
    description: "Gestion et suivi des projets de construction"
  },
  {
    name: "Conception",
    count: 1,
    description: "Conception architecturale et design"
  },
  {
    name: "Ingénierie",
    count: 2,
    description: "Ingénierie structurelle et technique"
  },
  {
    name: "Construction",
    count: 2,
    description: "Supervision et exécution des travaux"
  },
  {
    name: "Achat & Logistique",
    count: 1,
    description: "Approvisionnement et gestion des ressources"
  },
  {
    name: "Administration",
    count: 1,
    description: "Gestion administrative et financière"
  }
];

// Projects for organization
const projects = [
  "Résidence Les Oliviers",
  "Tour Jasmin Business Center", 
  "Centre Commercial Al Medina",
  "Complexe Hôtelier Atlas View",
  "Parc Résidentiel Les Dunes"
];

export function TeamDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  
  const filteredTeam = teamMembers.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesProject = 
      projectFilter === 'all' || 
      member.currentProject === projectFilter ||
      (projectFilter === 'none' && member.currentProject === null);
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesProject;
  });
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'En mission': return 'bg-blue-100 text-blue-800';
      case 'En congé': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
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
          Répertoire d'équipe
        </motion.h2>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setViewMode('grid')}>
            Grille
          </Button>
          <Button variant="outline" size="sm" onClick={() => setViewMode('list')}>
            Liste
          </Button>
          <Button variant="default" size="sm" className="bg-morocco-blue hover:bg-morocco-deep-blue">
            <UserPlus className="mr-2 h-4 w-4" /> Ajouter un membre
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="team" className="space-y-4">
        <TabsList>
          <TabsTrigger value="team" className="data-[state=active]:bg-morocco-blue data-[state=active]:text-white">
            Équipe
          </TabsTrigger>
          <TabsTrigger value="departments" className="data-[state=active]:bg-morocco-blue data-[state=active]:text-white">
            Départements
          </TabsTrigger>
          <TabsTrigger value="organization" className="data-[state=active]:bg-morocco-blue data-[state=active]:text-white">
            Organisation
          </TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Input
              placeholder="Rechercher des membres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Département" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les départements</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept.name} value={dept.name}>{dept.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="Disponible">Disponible</SelectItem>
                <SelectItem value="En mission">En mission</SelectItem>
                <SelectItem value="En congé">En congé</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Projet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les projets</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project} value={project}>{project}</SelectItem>
                ))}
                <SelectItem value="none">Sans projet assigné</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="team" className="space-y-4 mt-0">
          {filteredTeam.length === 0 ? (
            <div className="text-center py-12">
              <UserCheck className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700">Aucun membre trouvé</h3>
              <p className="text-gray-500">Essayez de modifier vos filtres de recherche</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredTeam.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <MemberCard member={member} getStatusColor={getStatusColor} />
                </motion.div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4">Membre</th>
                      <th className="text-left py-3 px-4">Département</th>
                      <th className="text-left py-3 px-4">Statut</th>
                      <th className="text-left py-3 px-4">Projet Actuel</th>
                      <th className="text-left py-3 px-4">Contact</th>
                      <th className="text-center py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeam.map((member, index) => (
                      <motion.tr 
                        key={member.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.03, duration: 0.2 }}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarFallback className="bg-morocco-blue text-white">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-xs text-gray-500">{member.role}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {member.department}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(member.status)}>
                            {member.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          {member.currentProject || '-'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <PhoneCall className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Button variant="outline" size="sm">
                            Voir profil
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="departments" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{dept.name}</CardTitle>
                    <CardDescription>{dept.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="flex -space-x-2 mr-3">
                          {teamMembers
                            .filter(member => member.department === dept.name)
                            .slice(0, 3)
                            .map(member => (
                              <Avatar key={member.id} className="border-2 border-white">
                                <AvatarFallback className="bg-morocco-blue text-white">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            
                          {dept.count > 3 && (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 border-2 border-white text-xs font-medium">
                              +{dept.count - 3}
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-medium">{dept.count} membres</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Voir l'équipe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="organization" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Structure Organisationnelle</CardTitle>
              <CardDescription>Vue d'ensemble de l'organisation Buildora</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <OrgChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

function MemberCard({ member, getStatusColor }) {
  return (
    <Card className="overflow-hidden h-full">
      <div className="bg-gradient-to-r from-morocco-blue to-morocco-deep-blue p-6 flex items-center justify-center">
        <Avatar className="h-20 w-20 border-4 border-white">
          <AvatarFallback className="bg-morocco-sand text-morocco-navy text-xl">
            {member.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      </div>
      <CardContent className="p-4">
        <div className="text-center mb-4">
          <h3 className="font-bold text-lg">{member.name}</h3>
          <p className="text-gray-500">{member.role}</p>
          <Badge className={`mt-2 ${getStatusColor(member.status)}`}>
            {member.status}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Building className="h-4 w-4 mr-2 text-morocco-blue" />
            <span>{member.department}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-morocco-blue" />
            <span className="truncate">{member.email}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <PhoneCall className="h-4 w-4 mr-2 text-morocco-blue" />
            <span>{member.phone}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-morocco-blue" />
            <span>{member.location}</span>
          </div>
        </div>
        
        <div className="pt-4 mt-4 border-t">
          <div className="text-sm font-medium mb-2">Projet actuel</div>
          <p className="text-sm">{member.currentProject || 'Aucun projet assigné'}</p>
          
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {member.projectCount} projet{member.projectCount !== 1 ? 's' : ''} terminé{member.projectCount !== 1 ? 's' : ''}
            </span>
            <Button variant="outline" size="sm">
              Voir profil
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function OrgChart() {
  const orgStructure = {
    name: "Karim Alami",
    title: "Directeur Général",
    children: [
      {
        name: "Nadia Benali",
        title: "Responsable Administrative",
        children: []
      },
      {
        name: "Thomas Martin",
        title: "Chef de Projet",
        children: [
          {
            name: "Sophie Dubois",
            title: "Architecte Principal",
            children: []
          },
          {
            name: "Marc Fournier",
            title: "Ingénieur Structure",
            children: [
              {
                name: "Fatima Zahra",
                title: "Ingénieure Électrique",
                children: []
              }
            ]
          },
          {
            name: "Ahmed Hassan",
            title: "Chef d'Équipe",
            children: [
              {
                name: "Omar Kadiri",
                title: "Conducteur de Travaux",
                children: []
              }
            ]
          }
        ]
      },
      {
        name: "Julie Leroy",
        title: "Responsable Achats",
        children: []
      }
    ]
  };
  
  return (
    <div className="w-full overflow-auto">
      <div className="min-w-[800px]">
        <div className="flex flex-col items-center">
          <OrgNode node={orgStructure} isRoot={true} />
        </div>
      </div>
    </div>
  );
}

function OrgNode({ node, isRoot = false }) {
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`p-3 rounded-lg shadow-md min-w-[200px] text-center mb-6 
          ${isRoot ? 'bg-morocco-blue text-white' : 'bg-white border border-gray-200'}`
        }
      >
        <p className="font-bold">{node.name}</p>
        <p className="text-sm opacity-80">{node.title}</p>
      </div>
      
      {node.children.length > 0 && (
        <>
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="w-full">
            <div className={`flex items-center justify-center ${node.children.length > 1 ? 'w-full' : ''}`}>
              {node.children.length > 1 && (
                <div className="h-px bg-gray-300 flex-grow"></div>
              )}
            </div>
            
            <div className="flex justify-center space-x-10 mt-0 relative">
              {node.children.map((child, i) => (
                <div key={i} className="flex flex-col items-center">
                  {node.children.length > 1 && (
                    <div className="h-8 w-px bg-gray-300 absolute -top-8"></div>
                  )}
                  <OrgNode node={child} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
