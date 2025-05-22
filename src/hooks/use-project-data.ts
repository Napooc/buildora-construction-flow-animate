
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { uploadFile, deleteFile } from '@/utils/file-upload';
import { toast } from 'sonner';

export function useProjectData() {
  const [isLoading, setIsLoading] = useState(false);

  // Tasks
  const createTask = async (taskData: any) => {
    setIsLoading(true);
    try {
      const { error, data } = await supabase
        .from('tasks')
        .insert([{
          title: taskData.title,
          description: taskData.description || '',
          status: taskData.status || 'À faire',
          project_id: taskData.project_id,
          due_date: taskData.due_date || null
        }])
        .select();
      
      if (error) throw error;
      
      toast.success('Tâche créée avec succès');
      return data;
    } catch (error: any) {
      console.error('Error creating task:', error);
      toast.error(error.message || 'Erreur lors de la création de la tâche');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id: string, taskData: any) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
          due_date: taskData.due_date,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Tâche mise à jour avec succès');
    } catch (error: any) {
      console.error('Error updating task:', error);
      toast.error(error.message || 'Erreur lors de la mise à jour de la tâche');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Tâche supprimée avec succès');
    } catch (error: any) {
      console.error('Error deleting task:', error);
      toast.error(error.message || 'Erreur lors de la suppression de la tâche');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Resources
  const createResource = async (resourceData: any) => {
    setIsLoading(true);
    try {
      const { error, data } = await supabase
        .from('resources')
        .insert([{
          name: resourceData.name,
          type: resourceData.type,
          quantity: resourceData.quantity || 0,
          unit: resourceData.unit || null,
          project_id: resourceData.project_id
        }])
        .select();
      
      if (error) throw error;
      
      toast.success('Ressource créée avec succès');
      return data;
    } catch (error: any) {
      console.error('Error creating resource:', error);
      toast.error(error.message || 'Erreur lors de la création de la ressource');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Site Logs
  const createSiteLog = async (logData: any) => {
    setIsLoading(true);
    try {
      const { error, data } = await supabase
        .from('site_logs')
        .insert([{
          project_id: logData.project_id,
          content: logData.content,
          author: logData.author || null,
          weather: logData.weather || null,
          temperature: logData.temperature || null,
          log_date: logData.log_date || new Date().toISOString()
        }])
        .select();
      
      if (error) throw error;
      
      toast.success('Journal de site créé avec succès');
      return data;
    } catch (error: any) {
      console.error('Error creating site log:', error);
      toast.error(error.message || 'Erreur lors de la création du journal');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Documents
  const uploadDocument = async (file: File, documentData: any) => {
    setIsLoading(true);
    try {
      // First upload the file to storage
      const fileData = await uploadFile(file);
      
      // Then create the document record in the database
      const { error, data } = await supabase
        .from('documents')
        .insert([{
          name: documentData.name || fileData.fileName,
          description: documentData.description || '',
          project_id: documentData.project_id,
          file_path: fileData.filePath,
          file_type: fileData.fileType,
          file_size: fileData.fileSize,
          uploaded_by: documentData.uploaded_by || null
        }])
        .select();
      
      if (error) {
        // If database insert fails, try to delete the uploaded file
        await deleteFile(fileData.filePath);
        throw error;
      }
      
      toast.success('Document téléchargé avec succès');
      return data;
    } catch (error: any) {
      console.error('Error uploading document:', error);
      toast.error(error.message || 'Erreur lors du téléchargement du document');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDocument = async (id: string, filePath: string) => {
    setIsLoading(true);
    try {
      // First delete the file from storage
      await deleteFile(filePath);
      
      // Then delete the document record from the database
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Document supprimé avec succès');
    } catch (error: any) {
      console.error('Error deleting document:', error);
      toast.error(error.message || 'Erreur lors de la suppression du document');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    // Tasks
    createTask,
    updateTask,
    deleteTask,
    // Resources
    createResource,
    // Site Logs
    createSiteLog,
    // Documents
    uploadDocument,
    deleteDocument
  };
}
