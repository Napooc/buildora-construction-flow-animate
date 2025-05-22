
import { useState } from "react";
import { Check, X, ArrowRight, TrendingUp, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoroccanPattern } from "@/components/ui/pattern";

const pricingPlans = [
  {
    name: "Starter",
    description: "Parfait pour les petites équipes et projets simples",
    price: { monthly: 290, annual: 2900 },
    features: [
      "Jusqu'à 5 projets",
      "Jusqu'à 10 utilisateurs",
      "Tableau de bord de base",
      "Suivi des tâches",
      "Notifications de base",
      "Support par e-mail",
    ],
    limitations: [
      "Pas de rapports avancés",
      "Pas d'intégration API",
      "Pas d'assistance téléphonique",
    ],
    ctaText: "Démarrer gratuitement",
    popular: false,
    icon: Clock,
  },
  {
    name: "Pro",
    description: "Pour les équipes en croissance avec des projets multiples",
    price: { monthly: 790, annual: 7900 },
    features: [
      "Projets illimités",
      "Jusqu'à 50 utilisateurs",
      "Tableau de bord avancé",
      "Planification de Gantt",
      "Rapports automatisés",
      "Intégration API",
      "Support prioritaire",
      "Notifications avancées",
    ],
    limitations: ["Pas d'assistance téléphonique 24/7"],
    ctaText: "Commencer l'essai gratuit",
    popular: true,
    icon: TrendingUp,
  },
  {
    name: "Entreprise",
    description: "Solution complète pour les grandes organisations",
    price: { monthly: 1990, annual: 19900 },
    features: [
      "Projets illimités",
      "Utilisateurs illimités",
      "Fonctionnalités avancées",
      "Support dédié 24/7",
      "Formations personnalisées",
      "SLA garanti",
      "API avancée",
      "Sécurité renforcée",
      "Personnalisation complète",
    ],
    limitations: [],
    ctaText: "Contacter les ventes",
    popular: false,
    icon: Shield,
  },
];

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-morocco-gold/10 text-morocco-terracotta px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4 animate-fade-in">
            Tarification
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-morocco-terracotta to-morocco-blue">
            Des plans adaptés à tous vos besoins
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Choisissez le plan qui correspond le mieux à la taille et aux ambitions de votre entreprise.
          </p>

          <div className="flex items-center justify-center space-x-4 mb-12">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-4 py-2 rounded-full transition-all duration-300",
                billingCycle === "monthly"
                  ? "bg-morocco-blue text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              Mensuel
            </button>
            <div className="relative">
              <button
                onClick={() => setBillingCycle("annual")}
                className={cn(
                  "px-4 py-2 rounded-full transition-all duration-300",
                  billingCycle === "annual"
                    ? "bg-morocco-blue text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                Annuel
              </button>
              <span className="absolute -top-2 -right-2 bg-morocco-terracotta text-white text-xs px-2 py-0.5 rounded-full">
                -20%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={cn(
                "relative bg-white rounded-xl shadow-lg transition-all duration-500 hover:transform hover:-translate-y-2 overflow-hidden border",
                plan.popular ? "border-morocco-gold md:scale-105" : "border-transparent",
                `animate-fade-in`
              )}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-morocco-gold text-white text-xs uppercase font-bold py-1 px-4 tracking-wider transform rotate-45 translate-x-5 translate-y-3">
                    Populaire
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="h-12 w-12 rounded-lg bg-morocco-blue/10 flex items-center justify-center mb-6">
                  <plan.icon className="h-6 w-6 text-morocco-blue" />
                </div>

                <h3 className="text-2xl font-bold text-morocco-navy mb-2">{plan.name}</h3>
                <p className="text-gray-600 h-12 mb-6">{plan.description}</p>

                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-morocco-blue">
                    {billingCycle === "monthly" ? plan.price.monthly : plan.price.annual} MAD
                  </span>
                  <span className="text-gray-500 ml-2">
                    /{billingCycle === "monthly" ? "mois" : "an"}
                  </span>
                </div>

                <Button 
                  className="w-full mb-8 group bg-morocco-blue hover:bg-morocco-deep-blue text-white transition-all"
                >
                  {plan.ctaText}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="mb-6">
                  <h4 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-3">
                    Fonctionnalités incluses:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-3">
                      Non inclus:
                    </h4>
                    <ul className="space-y-3">
                      {plan.limitations.map((limitation) => (
                        <li key={limitation} className="flex items-start">
                          <X className="h-5 w-5 text-red-500 mr-3 shrink-0" />
                          <span className="text-gray-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Besoin d'une solution sur mesure pour votre entreprise ?
          </p>
          <Button
            variant="outline"
            className="border-morocco-blue text-morocco-blue hover:bg-morocco-blue/10"
          >
            Contacter notre équipe commerciale
          </Button>
        </div>
      </div>
      <MoroccanPattern variant="subtle" />
    </section>
  );
}
