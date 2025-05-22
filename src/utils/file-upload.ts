
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

export async function uploadFile(file: File, bucket = 'project_documents') {
  try {
    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload file to Supabase Storage
    const { error: uploadError, data } = await supabase
      .storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw new Error(`Erreur lors du téléchargement: ${uploadError.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      filePath,
      fileUrl: publicUrl,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function deleteFile(filePath: string, bucket = 'project_documents') {
  try {
    const { error } = await supabase
      .storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}
