import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://byzhihyiiswcxfyqbuyn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5emhpaHlpaXN3Y3hmeXFidXluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MjgyOTMsImV4cCI6MjA5OTAwNDI5M30.1ciC3Bu3f6jmn5GtlpI-r7Nh4H2CGl-MNHUP8-sxDEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
