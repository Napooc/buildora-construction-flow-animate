
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { ContactMessages } from "@/components/admin/contact-messages";
import { ProjectsOverview } from "@/components/admin/projects-overview";
import { TaskBoard } from "@/components/admin/task-board";
import { ResourceTracker } from "@/components/admin/resource-tracker";
import { SiteLogViewer } from "@/components/admin/site-log-viewer";
import { DocumentCenter } from "@/components/admin/document-center";
import { TeamDirectory } from "@/components/admin/team-directory";
import {
  BarChart,
  Users,
  FileText,
  Calendar,
  Loader2,
  PackageOpen,
  ClipboardList,
  FileImage,
  FolderOpen,
  UserCheck,
  Bell
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [activeProjects, setActiveProjects] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [resourceCount, setResourceCount] = useState(0);
  const [teamMembers, setTeamMembers] = useState(0);
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
        
        // Fetch dashboard data
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
      const { count: messageCount, error: messageError } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('read', false);
          
      if (!messageError && messageCount !== null) {
        console.log("Found", messageCount, "unread messages");
        setUnreadMessages(messageCount);
      } else if (messageError) {
        console.error("Error fetching message count:", messageError);
      }

      // Get active projects count
      const { count: projectCount, error: projectError } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'En cours');

      if (!projectError && projectCount !== null) {
        console.log("Found", projectCount, "active projects");
        setActiveProjects(projectCount);
      } else if (projectError) {
        console.error("Error fetching project count:", projectError);
      }

      // Mock data for other stats - in a real app, fetch from database
      setPendingTasks(12);
      setResourceCount(24);
      setTeamMembers(8);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Erreur lors du chargement des données");
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
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container py-8 px-4 flex-1"
      >
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-3xl font-bold text-morocco-deep-blue mb-2"
          >
            Tableau de Bord
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-gray-600"
          >
            Bienvenue dans votre espace administrateur Buildora
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <AnimateKPI 
            icon={<FileText className="h-6 w-6 text-morocco-blue" />}
            title="Messages"
            value={unreadMessages}
            color="morocco-blue"
            delay={0.1}
          />
          
          <AnimateKPI 
            icon={<Bell className="h-6 w-6 text-morocco-gold" />}
            title="Notifications"
            value={unreadNotifications}
            color="morocco-gold"
            delay={0.2}
          />

          <AnimateKPI 
            icon={<Calendar className="h-6 w-6 text-morocco-terracotta" />}
            title="Projets Actifs"
            value={activeProjects}
            color="morocco-terracotta"
            delay={0.3}
          />
          
          <AnimateKPI 
            icon={<ClipboardList className="h-6 w-6 text-green-500" />}
            title="Tâches en attente"
            value={pendingTasks}
            color="green-500"
            delay={0.4}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <AnimateKPI 
            icon={<PackageOpen className="h-6 w-6 text-purple-500" />}
            title="Ressources"
            value={resourceCount}
            color="purple-500"
            delay={0.5}
            className="lg:col-span-1"
          />

          <AnimateKPI 
            icon={<FileImage className="h-6 w-6 text-blue-500" />}
            title="Journaux de site"
            value={15}
            color="blue-500"
            delay={0.6}
            className="lg:col-span-1"
          />

          <AnimateKPI 
            icon={<UserCheck className="h-6 w-6 text-pink-500" />}
            title="Équipe"
            value={teamMembers}
            color="pink-500"
            delay={0.7}
            className="lg:col-span-1"
          />
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full max-w-4xl grid-cols-7 bg-morocco-blue/5 p-1">
            <AnimatedTabTrigger value="overview" delay={0.1}>
              Aperçu
            </AnimatedTabTrigger>
            <AnimatedTabTrigger value="projects" delay={0.2}>
              Projets
            </AnimatedTabTrigger>
            <AnimatedTabTrigger value="tasks" delay={0.3}>
              Tâches
            </AnimatedTabTrigger>
            <AnimatedTabTrigger value="resources" delay={0.4}>
              Ressources
            </AnimatedTabTrigger>
            <AnimatedTabTrigger value="logs" delay={0.5}>
              Journaux
            </AnimatedTabTrigger>
            <AnimatedTabTrigger value="documents" delay={0.6}>
              Documents
            </AnimatedTabTrigger>
            <AnimatedTabTrigger value="messages" delay={0.7}>
              Messages
            </AnimatedTabTrigger>
          </TabsList>
          
          <AnimatedTabContent value="overview">
            <ProjectsOverview />
          </AnimatedTabContent>
          
          <AnimatedTabContent value="projects">
            <ProjectsOverview />
          </AnimatedTabContent>
          
          <AnimatedTabContent value="tasks">
            <TaskBoard />
          </AnimatedTabContent>
          
          <AnimatedTabContent value="resources">
            <ResourceTracker />
          </AnimatedTabContent>
          
          <AnimatedTabContent value="logs">
            <SiteLogViewer />
          </AnimatedTabContent>
          
          <AnimatedTabContent value="documents">
            <DocumentCenter />
          </AnimatedTabContent>
          
          <AnimatedTabContent value="messages">
            <ContactMessages />
          </AnimatedTabContent>
        </Tabs>
      </motion.div>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Buildora. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}

// Animated Components
const AnimateKPI = ({ icon, title, value, color, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className={`${className}`}
    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
  >
    <Card className={`hover:shadow-md transition-all border-l-4 border-l-${color}`}>
      <CardContent className="flex items-center p-6">
        <div className={`bg-${color}/10 p-3 rounded-full mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-morocco-deep-blue">{value}</h3>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const AnimatedTabTrigger = ({ value, delay = 0, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    whileHover={{ y: -2 }}
  >
    <TabsTrigger 
      value={value}
      className="data-[state=active]:bg-morocco-blue data-[state=active]:text-white"
    >
      {children}
    </TabsTrigger>
  </motion.div>
);

const AnimatedTabContent = ({ value, children }) => (
  <TabsContent value={value} className="space-y-4">
    <AnimatePresence mode="wait">
      <motion.div
        key={value}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </TabsContent>
);
