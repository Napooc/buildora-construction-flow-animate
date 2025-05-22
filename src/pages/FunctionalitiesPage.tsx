
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MoroccanPattern } from "@/components/ui/pattern";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  BarChart3,
  Calendar,
  Clock,
  FileText,
  Users,
  MessageSquare,
  Bell,
  Shield,
  Smartphone
} from "lucide-react";

const FunctionalitiesPage = () => {
  const features = [
    {
      title: "Gestion de projet intégrée",
      description: "Planifiez, suivez et gérez tous vos projets de construction dans une seule plateforme intuitive.",
      icon: FileText
    },
    {
      title: "Suivi en temps réel",
      description: "Suivez la progression de vos projets en temps réel avec des mises à jour automatiques et des alertes personnalisables.",
      icon: Clock
    },
    {
      title: "Collaboration d'équipe",
      description: "Facilitez la communication et la collaboration entre les équipes de terrain et de bureau.",
      icon: Users
    },
    {
      title: "Planification avancée",
      description: "Créez et gérez des calendriers de projet détaillés avec des dépendances et des jalons clairs.",
      icon: Calendar
    },
    {
      title: "Rapports et analyses",
      description: "Générez des rapports détaillés et visualisez les données de performance pour prendre de meilleures décisions.",
      icon: BarChart3
    },
    {
      title: "Communication intégrée",
      description: "Système de messagerie intégré pour une communication efficace entre tous les membres du projet.",
      icon: MessageSquare
    },
    {
      title: "Notifications intelligentes",
      description: "Recevez des alertes pertinentes sur les retards, les problèmes et les tâches urgentes.",
      icon: Bell
    },
    {
      title: "Sécurité des données",
      description: "Protection avancée de vos données avec des contrôles d'accès granulaires et un chiffrement de bout en bout.",
      icon: Shield
    },
    {
      title: "Application mobile",
      description: "Accédez à toutes les fonctionnalités depuis votre smartphone ou tablette, même hors ligne.",
      icon: Smartphone
    }
  ];

  return (
    <div className="min-h-screen relative">
      <MoroccanPattern variant="animated" className="fixed inset-0 z-0" />
      <Navbar />
      
      <main className="relative z-10 pt-32 pb-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="bg-morocco-blue/10 text-morocco-blue px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
              Fonctionnalités
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-morocco-navy">
              Découvrez les <span className="text-morocco-terracotta">fonctionnalités</span> de notre plateforme
            </h1>
            <p className="text-lg text-gray-600">
              Buildora offre une suite complète d'outils conçus pour améliorer l'efficacité et la rentabilité de vos projets de construction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-morocco-blue/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                    <feature.icon className="text-morocco-blue h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-morocco-navy mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-morocco-navy">
              Prêt à transformer votre façon de gérer vos projets?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Rejoignez des centaines d'entreprises qui font confiance à Buildora pour leurs projets de construction.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FunctionalitiesPage;
