
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MoroccanPattern } from "@/components/ui/pattern";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, LogOut, Calendar, Clock, Users, MessageSquare, ChevronRight } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

const AdminDashboard = () => {
  const { isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  useEffect(() => {
    // Check if user is admin, otherwise redirect to login
    if (!isLoading && !isAdmin) {
      navigate("/admin/login");
    }
  }, [isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      // Fetch contact messages
      const fetchContactMessages = async () => {
        setIsLoadingMessages(true);
        try {
          const { data, error } = await supabase
            .from("contact_messages")
            .select("*")
            .order("date", { ascending: false });

          if (error) throw error;
          setContactMessages(data || []);
        } catch (error) {
          console.error("Error fetching contact messages:", error);
        } finally {
          setIsLoadingMessages(false);
        }
      };

      fetchContactMessages();
    }
  }, [isAdmin]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-morocco-blue"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <MoroccanPattern variant="subtle" className="fixed inset-0 z-0 opacity-5" />
      
      <div className="relative z-10">
        {/* Admin Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-morocco-navy">Tableau de bord administrateur</h1>
              <p className="text-gray-600">Gérez votre site Buildora</p>
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2" 
              onClick={() => {
                signOut();
                navigate("/");
              }}
            >
              <LogOut size={16} />
              Se déconnecter
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Messages</p>
                  <h3 className="text-3xl font-bold text-morocco-navy">{contactMessages.length}</h3>
                </div>
                <div className="bg-morocco-blue/10 p-3 rounded-full">
                  <MessageSquare className="text-morocco-blue h-6 w-6" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Utilisateurs</p>
                  <h3 className="text-3xl font-bold text-morocco-navy">0</h3>
                </div>
                <div className="bg-morocco-gold/10 p-3 rounded-full">
                  <Users className="text-morocco-gold h-6 w-6" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Projets Actifs</p>
                  <h3 className="text-3xl font-bold text-morocco-navy">0</h3>
                </div>
                <div className="bg-morocco-terracotta/10 p-3 rounded-full">
                  <Calendar className="text-morocco-terracotta h-6 w-6" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Temps Total</p>
                  <h3 className="text-3xl font-bold text-morocco-navy">0h</h3>
                </div>
                <div className="bg-morocco-deep-blue/10 p-3 rounded-full">
                  <Clock className="text-morocco-deep-blue h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Content */}
          <Tabs defaultValue="messages" className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 lg:max-w-md">
                <TabsTrigger value="messages">Messages de contact</TabsTrigger>
                <TabsTrigger value="demo">Demandes de démo</TabsTrigger>
                <TabsTrigger value="analytics">Analytiques</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="messages">
              <Card className="border-none shadow-md bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Messages de contact récents</CardTitle>
                      <CardDescription>Liste des messages envoyés via le formulaire de contact</CardDescription>
                    </div>
                    <Button variant="outline" className="flex items-center gap-1">
                      Tout voir <ChevronRight size={16} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {isLoadingMessages ? (
                    <div className="p-6 flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-morocco-blue"></div>
                    </div>
                  ) : contactMessages.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      Aucun message de contact reçu
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {contactMessages.map((message) => (
                        <div key={message.id} className="p-6 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between gap-4">
                            <div className="bg-morocco-blue/10 p-2 rounded-full">
                              <Mail className="h-5 w-5 text-morocco-blue" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-morocco-navy">{message.subject || "Sans objet"}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm font-medium">{message.name}</span>
                                <span className="text-sm text-gray-500">{message.email}</span>
                              </div>
                              <p className="mt-2 text-gray-600 line-clamp-2">{message.message}</p>
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatDate(message.date)}
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                              Supprimer
                            </Button>
                            <Button size="sm">
                              Répondre
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="demo">
              <Card className="border-none shadow-md bg-white">
                <CardHeader>
                  <CardTitle>Demandes de démo</CardTitle>
                  <CardDescription>Gérez les demandes de démonstration</CardDescription>
                </CardHeader>
                <CardContent className="p-6 text-center text-gray-500">
                  Aucune demande de démo reçue pour le moment
                </CardContent>
                <CardFooter className="border-t p-6">
                  <Button variant="outline" className="w-full">Voir l'historique des demandes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card className="border-none shadow-md bg-white">
                <CardHeader>
                  <CardTitle>Analytiques du site</CardTitle>
                  <CardDescription>Statistiques de trafic et d'utilisation</CardDescription>
                </CardHeader>
                <CardContent className="p-6 text-center text-gray-500">
                  Module d'analytiques en cours d'installation
                </CardContent>
                <CardFooter className="border-t p-6">
                  <Button variant="outline" className="w-full">Configurer les analytiques</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
