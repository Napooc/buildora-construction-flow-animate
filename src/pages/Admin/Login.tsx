
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { AlertCircle, Lock, Loader2, Mail } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MoroccanPattern } from "@/components/ui/pattern";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is already logged in
    const checkAdminSession = () => {
      const adminSession = localStorage.getItem("adminSession");
      
      if (adminSession) {
        try {
          const session = JSON.parse(adminSession);
          const isExpired = new Date().getTime() - session.timestamp > 24 * 60 * 60 * 1000;
          
          if (session.isAuthenticated && !isExpired) {
            navigate("/admin/dashboard");
          }
        } catch (error) {
          console.error("Error checking admin session:", error);
          localStorage.removeItem("adminSession");
        }
      }
    };
    
    checkAdminSession();
  }, [navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      setIsLoading(false);
      return;
    }

    try {
      // Query the admin_users table to check credentials
      const { data, error: queryError } = await supabase
        .from("admin_users")
        .select("id, email, password")
        .eq("email", email.trim().toLowerCase())
        .single();

      if (queryError || !data) {
        setError("Identifiants incorrects. Veuillez réessayer.");
        setIsLoading(false);
        return;
      }

      // Compare passwords (in a real app, this would be hashed)
      if (data.password === password) {
        // Store admin session in localStorage with timestamp
        const adminSession = {
          id: data.id,
          email: data.email,
          isAuthenticated: true,
          timestamp: new Date().getTime()
        };
        
        localStorage.setItem("adminSession", JSON.stringify(adminSession));
        
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans votre tableau de bord administrateur"
        });
        
        navigate("/admin/dashboard");
      } else {
        setError("Mot de passe incorrect");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-morocco-deep-blue to-morocco-blue p-4 relative overflow-hidden">
      <MoroccanPattern variant="animated" className="absolute inset-0 opacity-5" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <Card className="w-full backdrop-blur-sm bg-white/90 border-morocco-gold/30 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-morocco-deep-blue">Administration</CardTitle>
            <CardDescription className="text-center">
              Connectez-vous à votre espace administrateur
            </CardDescription>
            <CardDescription className="text-center text-morocco-terracotta font-semibold">
              Email: admin@buildora.com | Mot de passe: temppassword123
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="animate-fade-in">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-morocco-navy">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-morocco-blue/60 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@buildora.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-morocco-blue/20 focus:border-morocco-gold"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-morocco-navy">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-morocco-blue/60 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="temppassword123"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-morocco-blue/20 focus:border-morocco-gold"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-morocco-blue hover:bg-morocco-deep-blue transition-all duration-300" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-morocco-gold/20 pt-4">
            <p className="text-sm text-gray-500">
              Administration Buildora &copy; {new Date().getFullYear()}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
