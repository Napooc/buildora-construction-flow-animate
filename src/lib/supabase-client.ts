
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
export const supabase = createClient(
  "https://iqnubejihoxrymmskpis.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxbnViZWppaG94cnltbXNrcGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NDY0MDQsImV4cCI6MjA1OTIyMjQwNH0.kPRjOTpdmfHiiTsy9tuFidJeacS3CooqoMeoxHvPQBU"
);
