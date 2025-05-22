
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Mail, User, Calendar, ArrowDown, ArrowUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "unread" | "read">("all");

  useEffect(() => {
    async function fetchContactMessages() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('contact_messages')
          .select('*')
          .order('date', { ascending: sortDirection === "asc" });

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
  }, [sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === "asc" ? "desc" : "asc");
  };

  const filteredMessages = messages.filter(message => {
    const searchMatch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (message.subject && message.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    // For demo purposes only - in a real app we'd track read/unread status
    if (filterType === "all") return searchMatch;
    if (filterType === "unread") return searchMatch && Math.random() > 0.5;
    if (filterType === "read") return searchMatch && Math.random() < 0.5;
    return searchMatch;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-morocco-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
        <p className="font-medium">{error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline" 
          className="mt-2"
        >
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-morocco-deep-blue">Messages de contact</h2>
          <p className="text-gray-500">Gérez les demandes de vos clients</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-white">
            {filteredMessages.length} message{filteredMessages.length !== 1 ? 's' : ''}
          </Badge>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleSortDirection}
            className="bg-white"
          >
            {sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher dans les messages..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="lg:col-span-2">
          <Tabs 
            defaultValue="all" 
            className="w-full"
            onValueChange={(value) => setFilterType(value as "all" | "unread" | "read")}
          >
            <TabsList className="grid w-full grid-cols-3 bg-morocco-blue/5">
              <TabsTrigger 
                value="all"
                className="data-[state=active]:bg-morocco-blue data-[state=active]:text-white"
              >
                Tous
              </TabsTrigger>
              <TabsTrigger 
                value="unread"
                className="data-[state=active]:bg-morocco-blue data-[state=active]:text-white"
              >
                Non lus
              </TabsTrigger>
              <TabsTrigger 
                value="read"
                className="data-[state=active]:bg-morocco-blue data-[state=active]:text-white"
              >
                Lus
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {filteredMessages.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-gray-500">
            <Mail className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p className="text-lg">Aucun message de contact pour le moment</p>
            <p className="text-sm">Les nouveaux messages apparaîtront ici</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMessages.map((message) => (
            <Card key={message.id} className="overflow-hidden hover:shadow-md transition-all bg-white border border-gray-100">
              <CardHeader className="bg-gray-50 pb-3 border-b border-gray-100">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <div className="bg-morocco-blue/10 rounded-full w-8 h-8 flex items-center justify-center">
                      <User className="h-4 w-4 text-morocco-blue" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{message.name}</CardTitle>
                      <CardDescription className="text-xs">{message.email}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(message.date).toLocaleDateString('fr-FR', {
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric'
                    })}
                  </div>
                </div>
                {message.subject && (
                  <div className="mt-2 font-medium text-morocco-deep-blue">
                    {message.subject}
                  </div>
                )}
              </CardHeader>
              <CardContent className="pt-4">
                <p className="whitespace-pre-wrap text-gray-700">{message.message}</p>
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    Marquer comme lu
                  </Button>
                  <Button size="sm" className="text-xs bg-morocco-blue hover:bg-morocco-deep-blue">
                    Répondre
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
