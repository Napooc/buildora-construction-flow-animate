
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send, Check } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Store the contact message in Supabase
      const { error } = await supabase.from("contact_messages").insert([
        { name, email, subject, message }
      ]);

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Message envoyé",
        description: "Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.",
      });

      // Reset form after 2 seconds to show success animation
      setTimeout(() => {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setIsSuccess(false);
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 600);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-morocco-navy">Votre nom</Label>
          <Input
            id="name"
            placeholder="Jean Dupont"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-morocco-blue/20 focus:border-morocco-gold transition-all duration-300"
            required
            disabled={isSubmitting || isSuccess}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-morocco-navy">Votre email</Label>
          <Input
            id="email"
            type="email"
            placeholder="jean.dupont@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-morocco-blue/20 focus:border-morocco-gold transition-all duration-300"
            required
            disabled={isSubmitting || isSuccess}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject" className="text-morocco-navy">Sujet</Label>
        <Input
          id="subject"
          placeholder="Demande de renseignements"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border-morocco-blue/20 focus:border-morocco-gold transition-all duration-300"
          disabled={isSubmitting || isSuccess}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-morocco-navy">Message</Label>
        <Textarea
          id="message"
          placeholder="Votre message..."
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-morocco-blue/20 focus:border-morocco-gold resize-none transition-all duration-300"
          required
          disabled={isSubmitting || isSuccess}
        />
      </div>
      <Button 
        type="submit" 
        disabled={isSubmitting || isSuccess}
        className={`w-full md:w-auto transition-all duration-300 ${isSuccess 
          ? 'bg-green-500 hover:bg-green-600' 
          : 'bg-morocco-blue hover:bg-morocco-deep-blue'}`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Envoi en cours...
          </>
        ) : isSuccess ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Message envoyé
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Envoyer le message
          </>
        )}
      </Button>
    </form>
  );
}
