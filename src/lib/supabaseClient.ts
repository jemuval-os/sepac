import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Fails loudly in the browser console instead of a silent "network error"
  // so it's obvious the Netlify env vars are missing.
  console.error(
    'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
    'Set them in Netlify: Site settings -> Environment variables, then redeploy.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const UPLOAD_BUCKET = 'sepac-uploads';
