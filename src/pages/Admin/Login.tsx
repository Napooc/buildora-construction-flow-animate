
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Query the admin_users table to check credentials
      const { data, error: queryError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", email)
        .single();

      if (queryError || !data) {
        setError("Identifiants incorrects. Veuillez réessayer.");
        return;
      }

      // This is a simplistic approach - in a real app you'd use proper password hashing
      if (data.password === password) {
        // Store admin session in localStorage
        localStorage.setItem("adminSession", JSON.stringify({
          id: data.id,
          email: data.email,
          isAuthenticated: true,
          timestamp: new Date().getTime()
        }));
        
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans votre tableau de bord administrateur"
        });
        
        navigate("/admin/dashboard");
      } else {
        setError("Mot de passe incorrect");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Panel</CardTitle>
            <CardDescription className="text-center">Connectez-vous à votre compte administrateur</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@buildora.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
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
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Administration Buildora
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
