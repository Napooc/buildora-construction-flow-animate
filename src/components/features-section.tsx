
import { 
  Calendar, 
  FileText, 
  LayoutDashboard, 
  Bell, 
  Users, 
  Smartphone, 
  Truck, 
  ClipboardList 
} from "lucide-react";
import { MoroccanPattern } from "@/components/ui/pattern";

const features = [
  {
    title: "Tableau de bord interactif",
    description: "Visualisez l'avancement de vos projets en temps réel avec des graphiques et indicateurs personnalisables.",
    icon: LayoutDashboard,
  },
  {
    title: "Gestion des tâches",
    description: "Organisez vos projets avec des diagrammes de Gantt et des tableaux Kanban pour une planification efficace.",
    icon: ClipboardList,
  },
  {
    title: "Suivi des ressources",
    description: "Gérez vos matériaux, équipements et main-d'œuvre pour optimiser l'utilisation des ressources.",
    icon: Truck,
  },
  {
    title: "Journal de chantier",
    description: "Enregistrez des rapports quotidiens, photos et incidents pour documenter l'avancement du projet.",
    icon: FileText,
  },
  {
    title: "Notifications automatiques",
    description: "Recevez des alertes et rappels pour rester informé des échéances et des mises à jour importantes.",
    icon: Bell,
  },
  {
    title: "Gestion documentaire",
    description: "Stockez et partagez plans, devis et contrats de manière sécurisée avec toute l'équipe.",
    icon: Calendar,
  },
  {
    title: "Accès multi-utilisateurs",
    description: "Définissez des rôles et permissions spécifiques pour chaque membre de l'équipe du projet.",
    icon: Users,
  },
  {
    title: "Synchronisation mobile",
    description: "Accédez à toutes les fonctionnalités depuis votre appareil mobile, même sur le terrain.",
    icon: Smartphone,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fonctionnalités <span className="text-morocco-blue">exceptionnelles</span>
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez comment Buildora transforme la gestion de vos projets de construction avec des outils puissants et intuitifs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-card group hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 mb-4 rounded-lg bg-morocco-blue/10 flex items-center justify-center group-hover:bg-morocco-blue/20 transition-colors">
                <feature.icon className="h-6 w-6 text-morocco-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-morocco-navy">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <MoroccanPattern />
    </section>
  );
}
