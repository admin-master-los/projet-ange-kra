import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour la base de données
export interface Project {
  id: string;
  client_name: string;
  client_function: string;
  project_title: string;
  created_at: string;
  updated_at: string;
  status: 'en_cours' | 'termine' | 'archive';
}

export interface Section1Response {
  id: string;
  project_id: string;
  problem_description: string;
  targets: string[];
  other_target: string;
  other_success_metric: string;
  created_at: string;
  updated_at: string;
}

export interface Persona {
  id: string;
  section1_id: string;
  name: string;
  age: string;
  current_situation: string;
  problem: string;
  seeking: string;
  created_at: string;
}

export interface SuccessMetric {
  id: string;
  section1_id: string;
  metric_type: string;
  value: string;
  checked: boolean;
  created_at: string;
}

export interface Section2Response {
  id: string;
  project_id: string;
  fescui_features: string[];
  other_fescui_feature: string;
  fescui_application: string;
  design_reference_name: string;
  design_reference_description: string;
  functionality_reference_name: string;
  functionality_reference_description: string;
  ux_reference_name: string;
  ux_reference_description: string;
  competitors: string;
  unique_value: string;
  created_at: string;
  updated_at: string;
}

export interface Section3Response {
  id: string;
  project_id: string;
  module_a_features: Record<string, any>;
  module_a_other_features: string;
  module_b_ideas: string;
  created_at: string;
  updated_at: string;
}

export interface Section14Response {
  id: string;
  project_id: string;
  evaluations: Record<string, number>;
  concerns: string;
  enthusiasm: string;
  missing: string;
  created_at: string;
  updated_at: string;
}