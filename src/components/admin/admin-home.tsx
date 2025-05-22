
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const visitData = [
  { name: 'Jan', visits: 400 },
  { name: 'Fév', visits: 300 },
  { name: 'Mar', visits: 600 },
  { name: 'Avr', visits: 800 },
  { name: 'Mai', visits: 700 },
  { name: 'Juin', visits: 1000 },
  { name: 'Juil', visits: 1200 },
];

const conversionData = [
  { name: 'Jan', rate: 10 },
  { name: 'Fév', rate: 15 },
  { name: 'Mar', rate: 13 },
  { name: 'Avr', rate: 18 },
  { name: 'Mai', rate: 21 },
  { name: 'Juin', rate: 19 },
  { name: 'Juil', rate: 25 },
];

const taskList = [
  { task: "Répondre aux messages clients", status: "En cours", priority: "Haute" },
  { task: "Mettre à jour la liste des projets", status: "À faire", priority: "Moyenne" },
  { task: "Préparer les rapports mensuels", status: "À faire", priority: "Haute" },
  { task: "Planifier la réunion d'équipe", status: "Terminé", priority: "Normale" },
];

export function AdminHome() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Aperçu de l'activité</CardTitle>
          <CardDescription>Vue d'ensemble des performances du site</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={visitData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="visits" 
                  name="Visites" 
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
          <CardTitle>Taux de conversion</CardTitle>
          <CardDescription>Évolution du taux de conversion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={conversionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Taux']} />
                <Bar 
                  dataKey="rate" 
                  name="Taux de conversion" 
                  fill="#D9A566" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Tâches en cours</CardTitle>
          <CardDescription>Liste des tâches prioritaires</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taskList.map((task, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-md flex justify-between items-center ${
                  task.status === 'Terminé' 
                    ? 'bg-green-50 border border-green-100' 
                    : task.priority === 'Haute' 
                      ? 'bg-red-50 border border-red-100' 
                      : 'bg-gray-50 border border-gray-100'
                }`}
              >
                <div>
                  <p className={`font-medium ${task.status === 'Terminé' ? 'line-through text-gray-500' : ''}`}>
                    {task.task}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white border">
                      {task.status}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      task.priority === 'Haute' 
                        ? 'bg-red-100 text-red-800' 
                        : task.priority === 'Moyenne' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
