
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { AtSign, Lock, AlertCircle } from 'lucide-react';
import { MoroccanPattern } from '@/components/ui/pattern';
import { Logo } from '@/components/logo';
import { useToast } from '@/components/ui/use-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if user is already logged in
  const [session, setSession] = useState<boolean | null>(null);
  
  // Check if admin is authenticated
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      // Verify if user is admin
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (adminData) {
        setSession(true);
        return true;
      }
    }
    setSession(false);
    return false;
  };
  
  useState(() => {
    checkAuth();
  });
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      // Sign in with Supabase auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.session) {
        // Check if user is an admin
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', data.session.user.id)
          .single();
        
        if (adminError || !adminData) {
          await supabase.auth.signOut();
          throw new Error("Vous n'êtes pas autorisé à accéder au tableau de bord d'administration.");
        }
        
        // Admin login successful
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans le tableau de bord d'administration.",
        });
        
        navigate('/admin');
      }
    } catch (error: any) {
      setError(error.message || "Une erreur s'est produite. Veuillez réessayer.");
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error.message || "Impossible de vous connecter. Veuillez vérifier vos identifiants.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Redirect if already authenticated
  if (session === true) {
    return <Navigate to="/admin" replace />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <MoroccanPattern className="fixed inset-0 opacity-5 z-0" />
      
      <div className="absolute top-6 left-6">
        <Logo />
      </div>
      
      <Card className="max-w-md w-full shadow-xl z-10 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif text-morocco-navy">Tableau de bord d'administration</CardTitle>
          <CardDescription>Connectez-vous pour accéder au tableau de bord</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4 flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@buildora.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-morocco-blue hover:bg-morocco-deep-blue"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
