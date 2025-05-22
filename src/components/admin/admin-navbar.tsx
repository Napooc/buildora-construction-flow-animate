
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Bell, LogOut, Mail, User, Settings, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface AdminNavbarProps {
  unreadMessages?: number;
}

export function AdminNavbar({ unreadMessages = 0 }: AdminNavbarProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [adminEmail, setAdminEmail] = useState<string>("");
  
  useEffect(() => {
    const checkAdminSession = () => {
      const adminSession = localStorage.getItem("adminSession");
      if (!adminSession) {
        console.log("No admin session found, redirecting to login");
        navigate("/admin");
        return;
      }
      
      try {
        const session = JSON.parse(adminSession);
        const isExpired = new Date().getTime() - session.timestamp > 24 * 60 * 60 * 1000;
        
        if (!session || !session.isAuthenticated || isExpired) {
          console.log("Invalid or expired admin session, redirecting to login");
          localStorage.removeItem("adminSession");
          navigate("/admin");
          return;
        }
        
        setAdminEmail(session.email);
      } catch (error) {
        console.error("Error parsing admin session:", error);
        navigate("/admin");
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

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="container flex h-16 items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="ml-2 text-lg font-medium text-morocco-deep-blue hidden md:block">
            Panel Administrateur
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-morocco-blue flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Voir le site</span>
          </Button>
          
          <div className="relative">
            <Button variant="ghost" size="icon" className="text-morocco-blue relative">
              <Mail className="h-5 w-5" />
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 bg-morocco-terracotta text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </Button>
          </div>
          
          <Button variant="ghost" size="icon" className="text-morocco-blue">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <div className="bg-morocco-blue/10 rounded-full w-8 h-8 flex items-center justify-center text-morocco-blue">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium hidden md:block">{adminEmail}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Paramètres</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 text-morocco-terracotta" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span>Se déconnecter</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
