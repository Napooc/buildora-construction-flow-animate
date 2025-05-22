
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  date: string;
}

export function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContactMessages() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('contact_messages')
          .select('*')
          .order('date', { ascending: false });

        if (error) {
          throw error;
        }

        setMessages(data || []);
      } catch (err) {
        console.error('Error fetching contact messages:', err);
        setError("Impossible de charger les messages. Veuillez réessayer.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchContactMessages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-morocco-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-morocco-deep-blue">Messages de contact</h2>
        <Badge variant="outline">{messages.length} message{messages.length !== 1 ? 's' : ''}</Badge>
      </div>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-gray-500">
            Aucun message de contact pour le moment
          </CardContent>
        </Card>
      ) : (
        messages.map((message) => (
          <Card key={message.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50 pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{message.name}</CardTitle>
                  <CardDescription>{message.email}</CardDescription>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(message.date).toLocaleDateString('fr-FR', {
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              {message.subject && (
                <div className="mt-2 font-medium">
                  Sujet: {message.subject}
                </div>
              )}
            </CardHeader>
            <CardContent className="pt-4">
              <p className="whitespace-pre-wrap">{message.message}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
