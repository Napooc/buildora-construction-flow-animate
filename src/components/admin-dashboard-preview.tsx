import { useState } from "react";
import { LayoutDashboard, FileText, Users, Settings, Bell, Calendar, TrendingUp, BarChart3, Clock, CheckCircle2, AlertTriangle, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
export function AdminDashboardPreview() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [{
    id: "overview",
    label: "Aperçu"
  }, {
    id: "projects",
    label: "Projets"
  }, {
    id: "tasks",
    label: "Tâches"
  }, {
    id: "reports",
    label: "Rapports"
  }];
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  return <section className="py-24 relative overflow-hidden">
      
    </section>;
}