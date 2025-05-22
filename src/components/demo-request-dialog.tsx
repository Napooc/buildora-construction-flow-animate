
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building, Calendar, Mail, MessageSquare, Star } from "lucide-react";
import confetti from "canvas-confetti";

interface DemoRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scrollToContact: () => void;
}

export function DemoRequestDialog({ open, onOpenChange, scrollToContact }: DemoRequestDialogProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // On the last step, trigger confetti and close
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      setTimeout(() => {
        onOpenChange(false);
        scrollToContact();
        setStep(1); // Reset for next time
      }, 1500);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg bg-gradient-to-br from-white to-morocco-sand/20">
        <DialogHeader>
          <DialogTitle className="text-2xl text-morocco-deep-blue">
            Demande de Démonstration
          </DialogTitle>
          <DialogDescription>
            Découvrez comment Buildora peut transformer votre façon de gérer les projets de construction
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center mt-2 mb-6">
          {[...Array(totalSteps)].map((_, i) => (
            <div
              key={i}
              className={`h-2 w-16 mx-1 rounded-full transition-all duration-300 ${
                i + 1 === step ? "bg-morocco-terracotta" : 
                i + 1 < step ? "bg-morocco-gold" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
        
        {step === 1 && (
          <div className="space-y-6 py-4">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-morocco-blue/10 rounded-full flex items-center justify-center mb-4">
                <Building className="h-8 w-8 text-morocco-blue" />
              </div>
              <h3 className="text-xl font-medium mb-2">Bienvenue chez Buildora!</h3>
              <p className="text-gray-600">
                Notre solution aide les entrepreneurs à simplifier la gestion de leurs projets de construction.
                Voulez-vous voir comment nous pouvons vous aider?
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Calendar className="h-6 w-6 text-morocco-terracotta mb-2" />
                <h4 className="font-medium">Planification</h4>
                <p className="text-sm text-gray-500">Organisez vos projets efficacement</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Star className="h-6 w-6 text-morocco-gold mb-2" />
                <h4 className="font-medium">Qualité</h4>
                <p className="text-sm text-gray-500">Améliorez la qualité de vos livrables</p>
              </div>
            </div>
            
            <Button 
              onClick={handleNextStep}
              className="w-full bg-morocco-blue hover:bg-morocco-deep-blue"
            >
              Découvrir les avantages
            </Button>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-6 py-4">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-morocco-terracotta/10 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-morocco-terracotta" />
              </div>
              <h3 className="text-xl font-medium mb-2">Une communication fluide</h3>
              <p className="text-gray-600">
                Buildora vous permet de centraliser toutes les communications avec vos équipes et clients
                en un seul endroit sécurisé.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-morocco-terracotta">
              <div className="flex items-start">
                <div className="font-medium">
                  "Buildora a réduit nos délais de communication de 40% et amélioré notre efficacité sur chaque projet."
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">- Ahmed Benjelloun, BTP Excellence</p>
            </div>
            
            <Button 
              onClick={handleNextStep}
              className="w-full bg-morocco-terracotta hover:bg-morocco-terracotta/90"
            >
              Prêt pour une démonstration?
            </Button>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-6 py-4">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-morocco-gold/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-morocco-gold" />
              </div>
              <h3 className="text-xl font-medium mb-2">Presque terminé!</h3>
              <p className="text-gray-600">
                Notre équipe est prête à vous faire une démonstration personnalisée. 
                Remplissez le formulaire de contact pour programmer votre session.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-medium text-morocco-deep-blue mb-2">
                Ce que comprend la démonstration:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                  Présentation de l'interface complète
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                  Explication des fonctionnalités principales
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                  Session de questions-réponses
                </li>
              </ul>
            </div>
            
            <Button 
              onClick={handleNextStep}
              className="w-full bg-gradient-to-r from-morocco-blue to-morocco-terracotta hover:from-morocco-deep-blue hover:to-morocco-terracotta/90 text-white"
            >
              Compléter ma demande
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
