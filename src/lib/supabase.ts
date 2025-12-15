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

export interface Section4Response {
  id: string;
  project_id: string;
  // 4.1 Parcours Utilisateur
  etape1_voit: string;
  etape1_fait: string;
  journey_steps: Array<{
    step: string;
    description: string;
    action: string;
  }>;
  resultat_final: string;
  // 4.2 Ton & Ambiance
  ton_plateforme: string;
  ton_autre: string;
  ambiance_keywords: string[];
  // 4.3 Contexte Local
  specificites_locales: Record<string, boolean>;
  langues: string;
  autres_specificites: string;
  created_at: string;
  updated_at: string;
}


export interface Section5Response {
  id: string;
  project_id: string;
  // 5.1 Sources de revenus
  sources_revenus: Record<string, {
    checked: boolean;
    price: string;
  }>;
  autre_source_revenus: string;
  // 5.2 Prix & Accessibilité
  philosophie_tarifaire: string;
  budget_moyen_cible: string;
  // Projections
  utilisateurs_payants_12mois: string;
  revenu_mensuel_12mois: string;
  strategie_croissance: string;
  created_at: string;
  updated_at: string;
}

export interface Section6Response {
  id: string;
  project_id: string;
  // 6.1 MVP
  mvp_features: string[];
  mvp_custom_0: string;
  mvp_custom_1: string;
  mvp_custom_2: string;
  mvp_rationale: string;
  // 6.2 Phasage
  phases: {
    v1?: {
      features?: string;
      target_users?: string;
    };
    v2?: {
      additions?: string;
    };
    v3?: {
      additions?: string;
    };
  };
  // 6.3 Contenus au lancement
  launch_contents: {
    fiches_metiers?: string;
    formations?: string;
    heures_videos?: string;
    offres_emploi?: string;
    temoignages?: string;
  };
  content_creators: string[];
  other_content_creator: string;
  created_at: string;
  updated_at: string;
}

export interface Section7Response {
  id: string;
  project_id: string;
  // 7.1 Budget
  budget_range: string;
  budget_allocation: {
    design?: string;
    development?: string;
    content?: string;
    marketing?: string;
    other?: string;
  };
  // 7.2 Délais
  timeline: string;
  deadline_date: string | null;
  deadline_reason: string;
  // 7.3 Équipe
  team_size: string;
  team_size_details: string;
  internal_skills: string[];
  other_internal_skills: string;
  external_skills: string[];
  other_external_skills: string;
  // 7.4 Contraintes Techniques
  technical_constraints: string[];
  other_constraints: string;
  created_at: string;
  updated_at: string;
}

export interface Section8Response {
  id: string;
  project_id: string;
  kpis: Record<string, {
    checked: boolean;
    target: string;
  }>;
  other_kpi_name: string;
  other_kpi_target: string;
  validation_methods: Record<string, {
    checked: boolean;
    detail: string;
  }>;
  other_validation: string;
  kpi_frequency: string;
  kpi_responsible: string;
  alert_completion_rate: string;
  alert_retention_rate: string;
  alert_satisfaction_score: string;
  created_at: string;
  updated_at: string;
}

export interface Section9Response {
  id: string;
  project_id: string;
  // 9.1 Charte Graphique
  logo_status: string;
  logo_file: string;
  logo_url: string;
  colors: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  fonts: string;
  brand_guide_url: string;
  // 9.2 Préférences Visuelles
  design_style: string;
  design_style_other: string;
  preferred_colors: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  visual_references: Array<{
    url?: string;
    description?: string;
  }>;
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
