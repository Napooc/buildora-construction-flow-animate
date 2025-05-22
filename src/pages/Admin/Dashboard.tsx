
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { ContactMessages } from "@/components/admin/contact-messages";
import { AdminHome } from "@/components/admin/admin-home";
import { LogOut } from "lucide-react";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminSession = () => {
      const adminSession = localStorage.getItem("adminSession");
      
      if (!adminSession) {
        navigate("/admin");
        return;
      }
      
      try {
        const session = JSON.parse(adminSession);
        const isExpired = new Date().getTime() - session.timestamp > 24 * 60 * 60 * 1000; // 24 hours
        
        if (!session.isAuthenticated || isExpired) {
          localStorage.removeItem("adminSession");
          navigate("/admin");
          return;
        }
        
        setIsAdmin(true);
      } catch (error) {
        localStorage.removeItem("adminSession");
        navigate("/admin");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdminSession();
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès"
    });
    navigate("/admin");
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
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <div className="container py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-morocco-deep-blue">Tableau de Bord Admin</h1>
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={handleLogout}
          >
            <LogOut size={16} /> Déconnexion
          </Button>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="messages">Messages de contact</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <AdminHome />
          </TabsContent>
          
          <TabsContent value="messages" className="space-y-4">
            <ContactMessages />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
