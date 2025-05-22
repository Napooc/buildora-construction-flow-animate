
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MoroccanPattern } from "@/components/ui/pattern";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to Supabase
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Contact Form Submission",
          message: formData.message
        }]);
      
      if (error) throw error;
      
      // Show success state
      setIsSubmitted(true);
      toast({
        title: "Message envoyé !",
        description: "Merci de nous avoir contacté. Notre équipe vous répondra bientôt.",
      });
      
      // Reset form after showing success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      }, 3000);
      
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Un problème est survenu lors de l'envoi de votre message. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <MoroccanPattern variant="subtle" className="opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-morocco-blue/10 text-morocco-blue px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-morocco-navy">
            Discutons de votre <span className="text-morocco-terracotta">projet</span>
          </h2>
          <p className="text-lg text-gray-600">
            Une question ? Un projet ? Notre équipe est là pour vous accompagner dans la réussite de vos projets de construction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-xl p-8 transform transition-all duration-500 hover:-translate-y-2 animate-fade-in">
              <h3 className="text-2xl font-bold text-morocco-navy mb-6">
                Nos informations
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-morocco-blue/10 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-morocco-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-morocco-navy">Email</h4>
                    <a href="mailto:contact@buildora.com" className="text-gray-600 hover:text-morocco-terracotta transition-colors">
                      contact@buildora.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-morocco-blue/10 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-morocco-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-morocco-navy">Téléphone</h4>
                    <a href="tel:+212522000000" className="text-gray-600 hover:text-morocco-terracotta transition-colors">
                      +212 522 00 00 00
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-morocco-blue/10 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-morocco-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-morocco-navy">Adresse</h4>
                    <p className="text-gray-600">
                      123 Boulevard Mohammed V<br />
                      20000 Casablanca, Maroc
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="font-semibold text-morocco-navy mb-4">
                  Heures d'ouverture
                </h4>
                <p className="text-gray-600">
                  Lundi - Vendredi: 9h00 - 18h00<br />
                  Samedi: 9h00 - 13h00<br />
                  Dimanche: Fermé
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-xl p-8 relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className={`absolute inset-0 bg-white rounded-xl flex items-center justify-center transition-opacity duration-500 ${isSubmitted ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}>
                <div className="text-center">
                  <div className="bg-green-100 rounded-full p-3 inline-block mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-morocco-navy mb-2">Message envoyé !</h3>
                  <p className="text-gray-600">Merci de nous avoir contacté. Notre équipe reviendra vers vous rapidement.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-morocco-navy mb-6">
                Envoyez-nous un message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Votre nom"
                      className="w-full border-gray-300 focus:border-morocco-blue focus:ring-morocco-blue/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="votre@email.com"
                      className="w-full border-gray-300 focus:border-morocco-blue focus:ring-morocco-blue/20"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="w-full border-gray-300 focus:border-morocco-blue focus:ring-morocco-blue/20"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Détaillez votre demande ici..."
                    rows={5}
                    className="w-full border-gray-300 focus:border-morocco-blue focus:ring-morocco-blue/20"
                  />
                </div>
                
                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full bg-morocco-blue hover:bg-morocco-deep-blue text-white py-3 transition-all group"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Envoyer le message
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="bg-white rounded-xl shadow-xl p-0 h-[400px] overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26651.984633098867!2d-7.647426699999999!3d33.5731104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d282e9e7fc01%3A0x9d19263b44db2c2e!2sQuartier%20d&#39;affaires%20de%20Casablanca!5e0!3m2!1sfr!2sma!4v1716323060326!5m2!1sfr!2sma" 
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
