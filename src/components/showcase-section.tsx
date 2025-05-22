
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
        return "/lovable-uploads/0bc97c12-fbf4-46d5-a202-d2f0d85c2051.png";
      case "tasks":
        return "/lovable-uploads/6d543307-13c5-4c42-a238-9c7c46367ffb.png";
      case "resources":
        return "/lovable-uploads/543080be-1847-4f3a-8472-44892616b2ed.png";
      case "reports":
        return "/lovable-uploads/df8a2f69-033f-4aed-a20d-ac8ce51ecfbd.png";
      default:
        return "/lovable-uploads/0bc97c12-fbf4-46d5-a202-d2f0d85c2051.png";
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
          title: "Centre de documents et rapports",
          description: "Accédez à tous vos documents de projet et générez des rapports détaillés pour suivre l'avancement et le budget.",
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
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={getImageForTab(activeTab)}
                  alt={content.title}
                  className="w-full h-full object-contain border border-gray-200 rounded-lg"
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
