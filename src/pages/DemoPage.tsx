
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MoroccanPattern } from "@/components/ui/pattern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const DemoPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Store the demo request in the contact_messages table
      const { error } = await supabase
        .from("contact_messages")
        .insert([
          {
            name,
            email,
            subject: "Demande de démo",
            message: `Entreprise: ${company}\n\n${message}`
          }
        ]);
      
      if (error) throw error;
      
      toast({
        title: "Demande envoyée !",
        description: "Nous vous contacterons bientôt pour planifier votre démonstration personnalisée.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      
    } catch (error) {
      console.error("Error submitting demo request:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Un problème est survenu lors de l'envoi de votre demande. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <MoroccanPattern variant="animated" className="fixed inset-0 z-0" />
      <Navbar />
      
      <main className="relative z-10 pt-32 pb-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="bg-morocco-blue/10 text-morocco-blue px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
              Démonstration
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-morocco-navy">
              Découvrez <span className="text-morocco-terracotta">Buildora</span> en action
            </h1>
            <p className="text-lg text-gray-600">
              Planifiez une démo personnalisée avec l'un de nos experts pour voir comment Buildora peut transformer la gestion de vos projets de construction.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-morocco-navy mb-4">
                  Ce que vous découvrirez durant la démo
                </h2>
                <ul className="space-y-3">
                  {[
                    "Interface utilisateur intuitive adaptée au secteur de la construction",
                    "Outils de collaboration et de communication en temps réel",
                    "Système de gestion de documents et de rapports",
                    "Tableaux de bord personnalisables pour suivre la progression",
                    "Application mobile pour le suivi sur le terrain",
                    "Options d'intégration avec vos outils existants"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-morocco-blue/10 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3 text-morocco-blue" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-morocco-navy mb-4">
                  Demandez votre démo
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Votre nom" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email professionnel</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="votre@email.com" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Entreprise</Label>
                    <Input 
                      id="company" 
                      value={company} 
                      onChange={(e) => setCompany(e.target.value)} 
                      placeholder="Nom de votre entreprise" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message (optionnel)</Label>
                    <Textarea 
                      id="message" 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)} 
                      placeholder="Parlez-nous de votre entreprise et de vos besoins spécifiques" 
                      rows={4} 
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-morocco-blue hover:bg-morocco-deep-blue"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Demander une démo"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DemoPage;
