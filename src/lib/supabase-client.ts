
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with proper configuration
export const supabase = createClient(
  "https://fvycmpxidewqoucmxbtj.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2eWNtcHhpZGV3cW91Y214YnRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MTkzNjEsImV4cCI6MjA2MzA5NTM2MX0.1wmf6WTBXTHEyDHcWdlnORFGCRSjcZ13bScxzSQCVps",
  {
    auth: {
      persistSession: true,
      storage: localStorage,
      autoRefreshToken: true,
    },
  }
);
