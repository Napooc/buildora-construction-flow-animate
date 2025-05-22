import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
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
import { PackageOpen, AlertTriangle, TrendingUp, FileBarChart, AlertCircle, Plus, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Demo data for materials
const materials = [
  { 
    id: 1, 
    name: 'Ciment Portland',
    type: 'Construction',
    quantity: 2500,
    unit: 'sacs',
    availableQuantity: 1800,
    status: 'En stock',
    price: 85,
    totalValue: 212500,
    threshold: 500,
    location: 'Entrepôt A',
    lastUpdated: '2023-06-01'
  },
  { 
    id: 2, 
    name: 'Barres d\'acier (12mm)',
    type: 'Construction',
    quantity: 5000,
    unit: 'barres',
    availableQuantity: 3200,
    status: 'En stock',
    price: 55,
    totalValue: 275000,
    threshold: 1000,
    location: 'Entrepôt B',
    lastUpdated: '2023-06-02'
  },
  { 
    id: 3, 
    name: 'Briques standard',
    type: 'Construction',
    quantity: 15000,
    unit: 'unités',
    availableQuantity: 12000,
    status: 'En stock',
    price: 3,
    totalValue: 45000,
    threshold: 3000,
    location: 'Entrepôt A',
    lastUpdated: '2023-05-28'
  },
  { 
    id: 4, 
    name: 'Fenêtres à double vitrage',
    type: 'Finition',
    quantity: 120,
    unit: 'unités',
    availableQuantity: 50,
    status: 'Stock limité',
    price: 350,
    totalValue: 42000,
    threshold: 30,
    location: 'Entrepôt C',
    lastUpdated: '2023-06-03'
  },
  { 
    id: 5, 
    name: 'Peinture intérieure (Blanc)',
    type: 'Finition',
    quantity: 400,
    unit: 'litres',
    availableQuantity: 350,
    status: 'En stock',
    price: 25,
    totalValue: 10000,
    threshold: 100,
    location: 'Entrepôt C',
    lastUpdated: '2023-05-30'
  },
  { 
    id: 6, 
    name: 'Câbles électriques',
    type: 'Électricité',
    quantity: 2000,
    unit: 'mètres',
    availableQuantity: 800,
    status: 'Stock limité',
    price: 4,
    totalValue: 8000,
    threshold: 500,
    location: 'Entrepôt B',
    lastUpdated: '2023-06-05'
  },
  { 
    id: 7, 
    name: 'Tuyaux PVC (100mm)',
    type: 'Plomberie',
    quantity: 300,
    unit: 'unités',
    availableQuantity: 250,
    status: 'En stock',
    price: 30,
    totalValue: 9000,
    threshold: 75,
    location: 'Entrepôt B',
    lastUpdated: '2023-06-04'
  },
  { 
    id: 8, 
    name: 'Carrelage céramique',
    type: 'Finition',
    quantity: 1000,
    unit: 'm²',
    availableQuantity: 400,
    status: 'Stock limité',
    price: 45,
    totalValue: 45000,
    threshold: 200,
    location: 'Entrepôt A',
    lastUpdated: '2023-06-03'
  }
];

// Demo data for equipment
const equipment = [
  {
    id: 1,
    name: 'Excavatrice hydraulique',
    status: 'En utilisation',
    project: 'Résidence Les Oliviers',
    location: 'Site A',
    condition: 'Excellent',
    nextMaintenance: '2023-07-15',
    operator: 'Ahmed Hassan'
  },
  {
    id: 2,
    name: 'Grue à tour',
    status: 'En utilisation',
    project: 'Tour Jasmin Business Center',
    location: 'Site B',
    condition: 'Bon',
    nextMaintenance: '2023-06-30',
    operator: 'Omar Kadiri'
  },
  {
    id: 3,
    name: 'Bétonnière industrielle',
    status: 'Disponible',
    project: '-',
    location: 'Entrepôt B',
    condition: 'Nécessite maintenance',
    nextMaintenance: '2023-06-10',
    operator: '-'
  },
  {
    id: 4,
    name: 'Chariot élévateur',
    status: 'En utilisation',
    project: 'Centre Commercial Al Medina',
    location: 'Site D',
    condition: 'Bon',
    nextMaintenance: '2023-08-05',
    operator: 'Fatima Zahra'
  },
  {
    id: 5,
    name: 'Compacteur de sol',
    status: 'Disponible',
    project: '-',
    location: 'Entrepôt A',
    condition: 'Excellent',
    nextMaintenance: '2023-07-20',
    operator: '-'
  }
];

// Chart data
const materialTypeData = [
  { name: 'Construction', value: 3 },
  { name: 'Finition', value: 3 },
  { name: 'Électricité', value: 1 },
  { name: 'Plomberie', value: 1 }
];

const materialStatusData = [
  { name: 'En stock', value: 5 },
  { name: 'Stock limité', value: 3 },
  { name: 'Épuisé', value: 0 }
];

const COLORS = ['#1A5F7A', '#C35831', '#D9A566', '#0B3C5D', '#E6D7B9'];

export function ResourceTracker() {
  const [view, setView] = useState('materials');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          material.location.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesType = typeFilter === 'all' || material.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesType;
  });
  
  const filteredEquipment = equipment.filter(item => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.project.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const lowStockItems = materials.filter(m => m.availableQuantity < m.threshold).length;
  const maintenanceNeededItems = equipment.filter(e => e.condition === 'Nécessite maintenance').length;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-2xl font-bold text-morocco-deep-blue"
        >
          Gestion des ressources
        </motion.h2>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Exporter
          </Button>
          <Button variant="default" size="sm" className="bg-morocco-blue hover:bg-morocco-deep-blue">
            <Plus className="mr-2 h-4 w-4" /> Nouvelle ressource
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ResourceSummaryCard
          icon={<PackageOpen className="h-6 w-6 text-morocco-blue" />}
          title="Matériaux"
          value={materials.length}
          description="Types de matériaux"
          color="morocco-blue"
          onClick={() => setView('materials')}
          isActive={view === 'materials'}
        />
        
        <ResourceSummaryCard
          icon={<FileBarChart className="h-6 w-6 text-morocco-gold" />}
          title="Équipements"
          value={equipment.length}
          description="Machines et outils"
          color="morocco-gold"
          onClick={() => setView('equipment')}
          isActive={view === 'equipment'}
        />
        
        <ResourceSummaryCard
          icon={<AlertTriangle className="h-6 w-6 text-morocco-terracotta" />}
          title="Alertes"
          value={lowStockItems + maintenanceNeededItems}
          description="Ressources nécessitant attention"
          color="morocco-terracotta"
          onClick={() => {}}
          isActive={false}
          alert={true}
        />
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-0">
          <CardTitle>Vue d'ensemble des ressources</CardTitle>
          <CardDescription>Distribution des types et statuts</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={materialTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {materialTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Matériaux', total: 646500, utilisé: 293850 },
                    { name: 'Équipements', total: 350000, utilisé: 280000 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} €`, 'Valeur']} />
                  <Legend />
                  <Bar dataKey="total" name="Budget total" fill="#1A5F7A" />
                  <Bar dataKey="utilisé" name="Utilisé" fill="#D9A566" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
        <div className="relative flex-grow">
          <Input
            placeholder={`Rechercher des ${view === 'materials' ? 'matériaux' : 'équipements'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <TrendingUp className="h-4 w-4" />
          </div>
        </div>
        
        {view === 'materials' && (
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type de matériau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="construction">Construction</SelectItem>
              <SelectItem value="finition">Finition</SelectItem>
              <SelectItem value="électricité">Électricité</SelectItem>
              <SelectItem value="plomberie">Plomberie</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{view === 'materials' ? 'Inventaire des matériaux' : 'Inventaire des équipements'}</CardTitle>
          <CardDescription>
            {view === 'materials' 
              ? 'Gestion des matériaux de construction' 
              : 'Suivi des équipements et machines'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {view === 'materials' ? (
            <MaterialsTable materials={filteredMaterials} />
          ) : (
            <EquipmentTable equipment={filteredEquipment} />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ResourceSummaryCard({ icon, title, value, description, color, alert = false, onClick, isActive }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
      className={`cursor-pointer ${isActive ? 'ring-2 ring-offset-2 ring-morocco-blue' : ''}`}
    >
      <Card className={`h-full ${alert && value > 0 ? 'border-red-500 border-2' : ''}`}>
        <CardContent className="flex items-center p-6">
          <div className={`bg-${color}/10 p-4 rounded-full mr-4`}>
            {icon}
          </div>
          <div>
            <h3 className="text-3xl font-bold text-morocco-deep-blue">{value}</h3>
            <p className="text-md font-medium">{title}</p>
            <p className="text-sm text-gray-500">{description}</p>
            {alert && value > 0 && (
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                Attention requise
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function MaterialsTable({ materials }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-4 text-left">Nom</th>
            <th className="p-4 text-left">Type</th>
            <th className="p-4 text-left">Quantité</th>
            <th className="p-4 text-left">Prix unitaire</th>
            <th className="p-4 text-left">Valeur totale</th>
            <th className="p-4 text-left">Stock disponible</th>
            <th className="p-4 text-left">Emplacement</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material) => (
            <tr key={material.id} className="border-b hover:bg-gray-50 cursor-pointer">
              <td className="p-4 font-medium">{material.name}</td>
              <td className="p-4">{material.type}</td>
              <td className="p-4">{material.quantity} {material.unit}</td>
              <td className="p-4">{material.price} €</td>
              <td className="p-4">{material.totalValue.toLocaleString()} €</td>
              <td className="p-4">
                <div>
                  <div className="flex items-center">
                    <Progress value={(material.availableQuantity / material.quantity) * 100} className="h-2 w-24 mr-2" />
                    <span>{material.availableQuantity} {material.unit}</span>
                  </div>
                  {material.availableQuantity < material.threshold && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Stock faible
                    </div>
                  )}
                </div>
              </td>
              <td className="p-4">{material.location}</td>
              <td className="p-4">
                <Badge className={
                  material.status === 'En stock'
                    ? 'bg-green-100 text-green-800'
                    : material.status === 'Stock limité'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }>
                  {material.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EquipmentTable({ equipment }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-4 text-left">Équipement</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Projet</th>
            <th className="p-4 text-left">Emplacement</th>
            <th className="p-4 text-left">État</th>
            <th className="p-4 text-left">Prochaine maintenance</th>
            <th className="p-4 text-left">Opérateur</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50 cursor-pointer">
              <td className="p-4 font-medium">{item.name}</td>
              <td className="p-4">
                <Badge className={
                  item.status === 'En utilisation'
                    ? 'bg-blue-100 text-blue-800'
                    : item.status === 'Disponible'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-amber-100 text-amber-800'
                }>
                  {item.status}
                </Badge>
              </td>
              <td className="p-4">{item.project}</td>
              <td className="p-4">{item.location}</td>
              <td className="p-4">
                <Badge className={
                  item.condition === 'Excellent'
                    ? 'bg-green-100 text-green-800'
                    : item.condition === 'Bon'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-red-100 text-red-800'
                }>
                  {item.condition}
                </Badge>
              </td>
              <td className="p-4">
                <div className="flex items-center">
                  <span>{new Date(item.nextMaintenance).toLocaleDateString()}</span>
                  {new Date(item.nextMaintenance) < new Date() && (
                    <AlertTriangle className="ml-2 h-4 w-4 text-red-500" />
                  )}
                </div>
              </td>
              <td className="p-4">{item.operator}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
