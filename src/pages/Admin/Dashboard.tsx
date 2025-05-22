
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { ContactMessages } from "@/components/admin/contact-messages";
import { AdminHome } from "@/components/admin/admin-home";
import { BarChart, Users, FileText, Calendar, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Verify admin session
    const checkAdminSession = () => {
      const adminSession = localStorage.getItem("adminSession");
      
      if (!adminSession) {
        console.log("No admin session found, redirecting to login");
        navigate("/admin");
        return;
      }
      
      try {
        const session = JSON.parse(adminSession);
        const isExpired = new Date().getTime() - session.timestamp > 24 * 60 * 60 * 1000; // 24 hours
        
        if (!session.isAuthenticated || isExpired) {
          console.log("Admin session invalid or expired, redirecting to login");
          localStorage.removeItem("adminSession");
          navigate("/admin");
          return;
        }
        
        console.log("Valid admin session found:", session);
        
        // Fetch messages and other data
        fetchDashboardData();
      } catch (error) {
        console.error("Error parsing admin session:", error);
        localStorage.removeItem("adminSession");
        navigate("/admin");
      }
    };
    
    checkAdminSession();
  }, [navigate]);
  
  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      // Get unread message count
      const { count, error } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('read', false);
          
      if (!error && count !== null) {
        console.log("Found", count, "unread messages");
        setUnreadMessages(count);
      } else if (error) {
        console.error("Error fetching message count:", error);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-16 w-16 text-morocco-blue animate-spin" />
          <p className="text-morocco-blue font-medium">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNavbar unreadMessages={unreadMessages} />
      
      <div className="container py-8 px-4 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-morocco-deep-blue mb-2">Tableau de Bord</h1>
          <p className="text-gray-600">Bienvenue dans votre espace administrateur Buildora</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-md transition-all border-l-4 border-l-morocco-blue">
            <CardContent className="flex items-center p-6">
              <div className="bg-morocco-blue/10 p-3 rounded-full mr-4">
                <FileText className="h-6 w-6 text-morocco-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Messages</p>
                <h3 className="text-2xl font-bold text-morocco-deep-blue">{unreadMessages}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all border-l-4 border-l-morocco-gold">
            <CardContent className="flex items-center p-6">
              <div className="bg-morocco-gold/10 p-3 rounded-full mr-4">
                <Users className="h-6 w-6 text-morocco-gold" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Visiteurs</p>
                <h3 className="text-2xl font-bold text-morocco-deep-blue">1,245</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all border-l-4 border-l-morocco-terracotta">
            <CardContent className="flex items-center p-6">
              <div className="bg-morocco-terracotta/10 p-3 rounded-full mr-4">
                <BarChart className="h-6 w-6 text-morocco-terracotta" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Conversions</p>
                <h3 className="text-2xl font-bold text-morocco-deep-blue">15%</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all border-l-4 border-l-green-500">
            <CardContent className="flex items-center p-6">
              <div className="bg-green-500/10 p-3 rounded-full mr-4">
                <Calendar className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Projets</p>
                <h3 className="text-2xl font-bold text-morocco-deep-blue">12</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-morocco-blue/5 p-1">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-morocco-blue data-[state=active]:text-white"
            >
              Aperçu
            </TabsTrigger>
            <TabsTrigger 
              value="messages"
              className="data-[state=active]:bg-morocco-blue data-[state=active]:text-white"
            >
              Messages de contact
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 animate-fade-in">
            <AdminHome />
          </TabsContent>
          
          <TabsContent value="messages" className="space-y-4 animate-fade-in">
            <ContactMessages />
          </TabsContent>
        </Tabs>
      </div>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Buildora. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
