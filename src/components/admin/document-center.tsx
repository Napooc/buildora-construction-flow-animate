
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  File, 
  FileText, 
  FileImage, 
  FilePlus2, 
  Search, 
  Filter, 
  Upload, 
  Download,
  Calendar,
  Table,
  FileSpreadsheet,
  FileCode,
  Briefcase,
  UsersRound,
  Building,
  MoreHorizontal,
  User,
  Star,
  StarOff
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Demo data for documents
const documents = [
  {
    id: 1,
    name: "Plans architecturaux - Résidence Les Oliviers.pdf",
    type: "blueprint",
    size: "12.5 MB",
    project: "Résidence Les Oliviers",
    category: "Plans",
    uploadedBy: "Sophie Dubois",
    uploadDate: "2023-05-15",
    version: "1.2",
    starred: true,
    description: "Plans architecturaux complets comprenant les plans d'étage, les élévations et les coupes transversales."
  },
  {
    id: 2,
    name: "Devis estimatif final - Tour Jasmin.xlsx",
    type: "spreadsheet",
    size: "2.8 MB",
    project: "Tour Jasmin Business Center",
    category: "Finances",
    uploadedBy: "Thomas Martin",
    uploadDate: "2023-05-28",
    version: "3.0",
    starred: true,
    description: "Estimation finale des coûts incluant les matériaux, la main d'œuvre et les équipements."
  },
  {
    id: 3,
    name: "Contrat d'approvisionnement - Ciment Portland.docx",
    type: "document",
    size: "1.2 MB",
    project: "Centre Commercial Al Medina",
    category: "Contrats",
    uploadedBy: "Marc Fournier",
    uploadDate: "2023-06-01",
    version: "1.0",
    starred: false,
    description: "Contrat avec le fournisseur pour l'approvisionnement en ciment Portland."
  },
  {
    id: 4,
    name: "Rapport d'inspection structurelle - Mai 2023.pdf",
    type: "report",
    size: "8.7 MB",
    project: "Tour Jasmin Business Center",
    category: "Rapports",
    uploadedBy: "Julie Leroy",
    uploadDate: "2023-05-30",
    version: "1.0",
    starred: false,
    description: "Rapport d'inspection mensuelle vérifiant la conformité des structures en acier."
  },
  {
    id: 5,
    name: "Permis de construire - Complexe Hôtelier Atlas View.pdf",
    type: "permit",
    size: "3.2 MB",
    project: "Complexe Hôtelier Atlas View",
    category: "Légal",
    uploadedBy: "Nadia Benali",
    uploadDate: "2023-04-12",
    version: "1.0",
    starred: true,
    description: "Permis de construire accordé par la municipalité pour le projet."
  },
  {
    id: 6,
    name: "Planning de travail - Juin 2023.xlsx",
    type: "schedule",
    size: "1.8 MB",
    project: "Résidence Les Oliviers",
    category: "Planning",
    uploadedBy: "Hugo Leclerc",
    uploadDate: "2023-05-25",
    version: "2.1",
    starred: false,
    description: "Planning détaillé des travaux pour le mois de juin, incluant l'allocation des ressources."
  },
  {
    id: 7,
    name: "Spécifications techniques - Ascenseurs.pdf",
    type: "specs",
    size: "5.6 MB",
    project: "Tour Jasmin Business Center",
    category: "Technique",
    uploadedBy: "Emma Petit",
    uploadDate: "2023-05-08",
    version: "1.1",
    starred: false,
    description: "Spécifications techniques détaillées pour l'installation des ascenseurs."
  },
  {
    id: 8,
    name: "Étude de sol - Complexe Hôtelier Atlas View.pdf",
    type: "report",
    size: "24.3 MB",
    project: "Complexe Hôtelier Atlas View",
    category: "Études",
    uploadedBy: "Lucas Blanc",
    uploadDate: "2023-03-20",
    version: "1.0",
    starred: true,
    description: "Étude géotechnique complète du terrain avant le début des travaux."
  },
  {
    id: 9,
    name: "Plans électriques - Centre Commercial Al Medina.dwg",
    type: "blueprint",
    size: "18.9 MB",
    project: "Centre Commercial Al Medina",
    category: "Plans",
    uploadedBy: "Sophie Dubois",
    uploadDate: "2023-05-22",
    version: "2.3",
    starred: false,
    description: "Plans des installations électriques avec circuits et points d'éclairage."
  },
  {
    id: 10,
    name: "Contrat de sous-traitance - Plomberie.pdf",
    type: "document",
    size: "2.1 MB",
    project: "Résidence Les Oliviers",
    category: "Contrats",
    uploadedBy: "Thomas Martin",
    uploadDate: "2023-04-30",
    version: "1.1",
    starred: false,
    description: "Contrat avec l'entreprise sous-traitante pour les travaux de plomberie."
  }
];

export function DocumentCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [viewType, setViewType] = useState('grid');
  const [sortBy, setSortBy] = useState('date');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [localDocs, setLocalDocs] = useState(documents);
  
  const toggleStar = (id) => {
    setLocalDocs(docs => 
      docs.map(doc => 
        doc.id === id ? { ...doc, starred: !doc.starred } : doc
      )
    );
  };
  
  const categories = ['Plans', 'Finances', 'Contrats', 'Rapports', 'Légal', 'Planning', 'Technique', 'Études'];
  const projects = [...new Set(documents.map(doc => doc.project))];
  
  // Filtering
  const filteredDocs = localDocs.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    const matchesProject = projectFilter === 'all' || doc.project === projectFilter;
    
    return matchesSearch && matchesCategory && matchesProject;
  });
  
  // Sorting
  const sortedDocs = [...filteredDocs].sort((a, b) => {
    switch(sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'size':
        return parseFloat(a.size) - parseFloat(b.size);
      case 'date':
      default:
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    }
  });
  
  const getFileIcon = (type) => {
    switch(type) {
      case 'blueprint':
        return <FileImage className="h-6 w-6 text-blue-600" />;
      case 'spreadsheet':
        return <FileSpreadsheet className="h-6 w-6 text-green-600" />;
      case 'document':
      case 'permit':
        return <FileText className="h-6 w-6 text-amber-600" />;
      case 'report':
      case 'specs':
        return <FileCode className="h-6 w-6 text-purple-600" />;
      case 'schedule':
        return <Table className="h-6 w-6 text-red-600" />;
      default:
        return <File className="h-6 w-6 text-gray-600" />;
    }
  };
  
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Plans': return <FileImage className="h-4 w-4" />;
      case 'Finances': return <Briefcase className="h-4 w-4" />;
      case 'Contrats': return <FileText className="h-4 w-4" />;
      case 'Rapports': return <FileCode className="h-4 w-4" />;
      case 'Légal': return <Building className="h-4 w-4" />;
      case 'Planning': return <Calendar className="h-4 w-4" />;
      case 'Technique': return <Table className="h-4 w-4" />;
      case 'Études': return <UsersRound className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
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
          Centre de documents
        </motion.h2>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setViewType('grid')}>
            Grille
          </Button>
          <Button variant="outline" size="sm" onClick={() => setViewType('list')}>
            Liste
          </Button>
          <Button variant="default" size="sm" className="bg-morocco-blue hover:bg-morocco-deep-blue">
            <Upload className="mr-2 h-4 w-4" /> Ajouter un document
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="data-[state=active]:bg-morocco-blue data-[state=active]:text-white">
            Tous les documents
          </TabsTrigger>
          <TabsTrigger value="starred" className="data-[state=active]:bg-morocco-blue data-[state=active]:text-white">
            Favoris
          </TabsTrigger>
          <TabsTrigger value="recent" className="data-[state=active]:bg-morocco-blue data-[state=active]:text-white">
            Récents
          </TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Input
              placeholder="Rechercher des documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Projet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project} value={project}>{project}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date (récent)</SelectItem>
                <SelectItem value="name">Nom</SelectItem>
                <SelectItem value="size">Taille</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="all" className="space-y-4 mt-0">
          <DocumentList 
            documents={sortedDocs} 
            viewType={viewType} 
            getFileIcon={getFileIcon}
            getCategoryIcon={getCategoryIcon}
            onToggleStar={toggleStar}
          />
        </TabsContent>
        
        <TabsContent value="starred" className="space-y-4 mt-0">
          <DocumentList 
            documents={sortedDocs.filter(doc => doc.starred)} 
            viewType={viewType} 
            getFileIcon={getFileIcon}
            getCategoryIcon={getCategoryIcon}
            onToggleStar={toggleStar}
          />
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4 mt-0">
          <DocumentList 
            documents={sortedDocs.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()).slice(0, 5)} 
            viewType={viewType} 
            getFileIcon={getFileIcon}
            getCategoryIcon={getCategoryIcon}
            onToggleStar={toggleStar}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

function DocumentList({ documents, viewType, getFileIcon, getCategoryIcon, onToggleStar }) {
  if (documents.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
        <File className="h-12 w-12 mx-auto text-gray-300 mb-3" />
        <h3 className="text-lg font-medium text-gray-500">Aucun document trouvé</h3>
        <p className="text-gray-400">Essayez de modifier vos filtres ou d'ajouter de nouveaux documents</p>
      </div>
    );
  }
  
  return (
    <>
      {viewType === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <DocumentCard 
                document={doc} 
                getFileIcon={getFileIcon} 
                getCategoryIcon={getCategoryIcon}
                onToggleStar={onToggleStar}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4">Nom</th>
                  <th className="text-left py-3 px-4">Projet</th>
                  <th className="text-left py-3 px-4 hidden md:table-cell">Catégorie</th>
                  <th className="text-left py-3 px-4 hidden md:table-cell">Taille</th>
                  <th className="text-left py-3 px-4 hidden lg:table-cell">Mis à jour</th>
                  <th className="text-left py-3 px-4 hidden lg:table-cell">Par</th>
                  <th className="text-center py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, index) => (
                  <motion.tr 
                    key={doc.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03, duration: 0.2 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {getFileIcon(doc.type)}
                        <div className="ml-3">
                          <div className="font-medium line-clamp-1">{doc.name}</div>
                          <div className="text-xs text-gray-500">Version {doc.version}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="line-clamp-1">{doc.project}</span>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getCategoryIcon(doc.category)}
                        <span>{doc.category}</span>
                      </Badge>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      {doc.size}
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      {new Date(doc.uploadDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      {doc.uploadedBy}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => onToggleStar(doc.id)}
                        >
                          {doc.starred ? (
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          ) : (
                            <StarOff className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4 text-gray-600" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </>
  );
}

function DocumentCard({ document, getFileIcon, getCategoryIcon, onToggleStar }) {
  const fileExtension = document.name.split('.').pop();
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="bg-gray-50 p-8 flex items-center justify-center border-b">
        {getFileIcon(document.type)}
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-medium line-clamp-1">{document.name}</h3>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <User className="h-3 w-3 mr-1" />
              <span className="truncate">{document.uploadedBy}</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 -mr-2 -mt-2"
            onClick={() => onToggleStar(document.id)}
          >
            {document.starred ? (
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            ) : (
              <StarOff className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 mt-1 mb-3">
          <span className="bg-gray-100 px-1.5 py-0.5 rounded uppercase font-medium">{fileExtension}</span>
          <span className="mx-1">•</span>
          <span>{document.size}</span>
          <span className="mx-1">•</span>
          <span>v{document.version}</span>
        </div>
        
        <div className="flex flex-col gap-2 flex-grow">
          <p className="text-xs text-gray-600 line-clamp-2 flex-grow">
            {document.description}
          </p>
          
          <div className="flex items-center justify-between mt-2">
            <Badge variant="outline" className="flex items-center gap-1 text-xs">
              {getCategoryIcon(document.category)}
              <span>{document.category}</span>
            </Badge>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{new Date(document.uploadDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-3 border-t">
          <Button variant="ghost" size="sm" className="text-xs px-2">
            Aperçu
          </Button>
          <Button variant="outline" size="sm" className="text-xs px-2">
            <Download className="h-3 w-3 mr-1" /> Télécharger
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
