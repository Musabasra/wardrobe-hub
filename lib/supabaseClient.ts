import { createClient } from '@supabase/supabase-js';

// These read the keys from your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// This creates the "client" that the rest of your app will use
export const supabase = createClient(supabaseUrl, supabaseKey);