import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface WaitlistSignup {
  id: string;
  email: string;
  message_type_focus: string | null;
  referral_intent: string | null;
  use_case_tags: string[];
  blockers: string[];
  created_at: string;
}
