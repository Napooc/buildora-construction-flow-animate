
import { supabase } from '@/integrations/supabase/client';

// Function to create an admin user
export async function createAdminUser(email: string, password: string) {
  try {
    // First, create an auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (authError) {
      throw authError;
    }
    
    if (authData.user) {
      // Create an entry in the admin_users table
      const { error: adminError } = await supabase
        .from('admin_users')
        .insert([
          {
            id: authData.user.id,
            email: authData.user.email,
            password: '[PROTECTED]' // Store a placeholder, not the actual password
          }
        ]);
      
      if (adminError) {
        throw adminError;
      }
      
      return {
        success: true,
        message: 'Admin user created successfully',
        userId: authData.user.id
      };
    }
    
    return {
      success: false,
      message: 'Failed to create admin user'
    };
    
  } catch (error: any) {
    console.error('Error creating admin user:', error);
    
    return {
      success: false,
      message: error.message || 'Failed to create admin user'
    };
  }
}
