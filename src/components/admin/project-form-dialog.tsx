
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(3, "Le nom doit comporter au moins 3 caractères"),
  description: z.string().optional(),
  status: z.string(),
  progress: z.number().min(0).max(100),
  budget: z.number().positive("Le budget doit être positif"),
  deadline: z.date().optional().nullable(),
  location: z.string().optional(),
  team_size: z.number().min(0).optional(),
});

type ProjectFormValues = z.infer<typeof formSchema>;

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  project?: any;
  onSuccess: () => void;
}

export function ProjectFormDialog({ open, onClose, project, onSuccess }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!project?.id;

  const defaultValues: Partial<ProjectFormValues> = {
    name: "",
    description: "",
    status: "Planification",
    progress: 0,
    budget: 0,
    deadline: null,
    location: "",
    team_size: 0,
  };

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (project) {
      const deadline = project.deadline ? new Date(project.deadline) : null;
      form.reset({
        name: project.name,
        description: project.description || "",
        status: project.status,
        progress: project.progress,
        budget: Number(project.budget),
        deadline,
        location: project.location || "",
        team_size: project.team_size || 0,
      });
    } else {
      form.reset(defaultValues);
    }
  }, [project, form]);

  const onSubmit = async (values: ProjectFormValues) => {
    setIsLoading(true);
    try {
      // Convert Date object to ISO string for Supabase
      const formattedValues = {
        ...values,
        deadline: values.deadline ? values.deadline.toISOString() : null,
      };

      // Ensure name and budget are always provided (required by DB schema)
      if (!formattedValues.name) {
        throw new Error("Le nom du projet est requis");
      }

      if (typeof formattedValues.budget !== 'number' || formattedValues.budget <= 0) {
        throw new Error("Le budget doit être un nombre positif");
      }

      if (isEditing) {
        const { error } = await supabase
          .from("projects")
          .update({
            ...formattedValues,
            updated_at: new Date().toISOString(),
          })
          .eq("id", project.id);

        if (error) throw error;
        toast.success("Projet mis à jour avec succès");
      } else {
        // For new projects, ensure we have the required fields
        const newProject = {
          ...formattedValues,
          delay_days: 0,
          issues: 0,
          // Ensure name and budget are explicitly set
          name: formattedValues.name,
          budget: formattedValues.budget,
          status: formattedValues.status || "Planification",
          progress: formattedValues.progress || 0
        };

        const { error } = await supabase
          .from("projects")
          .insert([newProject]);

        if (error) throw error;
        toast.success("Projet créé avec succès");
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Error saving project:", error);
      toast.error(error.message || "Une erreur s'est produite");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle>{isEditing ? "Modifier le projet" : "Nouveau projet"}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Modifiez les détails du projet et enregistrez les changements." 
                : "Créez un nouveau projet en remplissant le formulaire ci-dessous."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Nom du projet</FormLabel>
                      <FormControl>
                        <Input placeholder="Résidence Les Oliviers" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Description du projet..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Planification">Planification</SelectItem>
                          <SelectItem value="En cours">En cours</SelectItem>
                          <SelectItem value="Terminé">Terminé</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="progress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Progression (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          min="0"
                          max="100"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget (€)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          min="0"
                          step="1000"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date d'échéance</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: fr })
                              ) : (
                                <span>Sélectionner une date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localisation</FormLabel>
                      <FormControl>
                        <Input placeholder="Casablanca" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="team_size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taille de l'équipe</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={onClose}>
                  Annuler
                </Button>
                <Button type="submit" className="bg-morocco-blue hover:bg-morocco-deep-blue" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Chargement...
                    </>
                  ) : isEditing ? "Mettre à jour" : "Créer"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
