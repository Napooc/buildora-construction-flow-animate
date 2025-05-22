
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "tasks", label: "Gestion des tâches" },
    { id: "resources", label: "Suivi des ressources" },
    { id: "reports", label: "Rapports" },
  ];

  const getImageForTab = (tabId: string) => {
    switch (tabId) {
      case "dashboard":
        return "https://images.unsplash.com/photo-1461749280684-dccba630e2f6";
      case "tasks":
        return "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7";
      case "resources":
        return "https://images.unsplash.com/photo-1493397212122-2b85dda8106b";
      case "reports":
        return "https://images.unsplash.com/photo-1649972904349-6e44c42644a7";
      default:
        return "https://images.unsplash.com/photo-1461749280684-dccba630e2f6";
    }
  };

  const getContentForTab = (tabId: string) => {
    switch (tabId) {
      case "dashboard":
        return {
          title: "Tableau de bord interactif",
          description: "Visualisez l'avancement du projet, les indicateurs clés de performance et les tâches critiques dans une interface moderne et intuitive.",
        };
      case "tasks":
        return {
          title: "Planification et suivi des tâches",
          description: "Organisez vos projets avec des diagrammes de Gantt interactifs et des tableaux Kanban pour une gestion visuelle et efficace.",
        };
      case "resources":
        return {
          title: "Gestion optimale des ressources",
          description: "Suivez les matériaux, équipements et main-d'œuvre pour optimiser l'allocation des ressources et prévenir les retards.",
        };
      case "reports":
        return {
          title: "Rapports détaillés et analytiques",
          description: "Générez des rapports automatisés pour suivre l'avancement du projet, les incidents et les performances de l'équipe.",
        };
      default:
        return {
          title: "Tableau de bord interactif",
          description: "Visualisez l'avancement du projet, les indicateurs clés de performance et les tâches critiques dans une interface moderne et intuitive.",
        };
    }
  };

  const content = getContentForTab(activeTab);

  return (
    <section className="py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Une expérience utilisateur <span className="text-morocco-terracotta">exceptionnelle</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explorez les fonctionnalités principales de Buildora conçues pour simplifier la gestion de vos projets de construction.
          </p>
        </div>

        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full transition-all ${
                activeTab === tab.id
                  ? "bg-morocco-blue text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-2 order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-4 text-morocco-navy">{content.title}</h3>
            <p className="text-gray-600 mb-6">
              {content.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary">Découvrir plus</Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Voir la démo
              </Button>
            </div>
          </div>
          <div className="md:col-span-3 order-1 md:order-2">
            <div className="bg-white p-2 rounded-xl shadow-lg animate-fade-in">
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                <img
                  src={getImageForTab(activeTab)}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-morocco-deep-blue/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button variant="secondary" className="btn-secondary">
                    Agrandir
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
