import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Class {
  id: string;
  name: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: string;
  class_id: string;
  name: string;
  icon: string;
  color: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Chapter {
  id: string;
  subject_id: string;
  title: string;
  display_order: number;
  ncert_link: string;
  notes: string;
  created_at: string;
  updated_at: string;
}
