/*
  # Schéma de base de données pour le Document de Cadrage CIFOP

  1. Nouvelles Tables
    - `projects` - Projets de cadrage avec informations client
    - `section1_responses` - Section Vision & Objectifs
    - `section2_responses` - Section Inspiration & Références  
    - `section3_responses` - Section Modules & Fonctionnalités
    - `section14_responses` - Section Validation & Prochaines Étapes
    - `personas` - Personas utilisateurs (relation avec section1)
    - `success_metrics` - Métriques de succès (relation avec section1)

  2. Sécurité
    - Enable RLS sur toutes les tables
    - Politiques pour permettre aux utilisateurs de gérer leurs propres données
    - Accès public en lecture/écriture pour cette démo (à sécuriser en production)

  3. Relations
    - Clés étrangères entre les sections et les projets
    - Relations one-to-many pour personas et métriques
*/

-- Table principale des projets
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text DEFAULT 'M. Ange KRA',
  client_function text DEFAULT 'Manager Général CIFOP',
  project_title text DEFAULT 'Plateforme de Formation et Orientation Professionnelle',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  status text DEFAULT 'en_cours' CHECK (status IN ('en_cours', 'termine', 'archive'))
);

-- Section 1: Vision & Objectifs
CREATE TABLE IF NOT EXISTS section1_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  problem_description text DEFAULT '',
  targets text[] DEFAULT '{}',
  other_target text DEFAULT '',
  other_success_metric text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Personas (relation avec Section 1)
CREATE TABLE IF NOT EXISTS personas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section1_id uuid REFERENCES section1_responses(id) ON DELETE CASCADE,
  name text DEFAULT '',
  age text DEFAULT '',
  current_situation text DEFAULT '',
  problem text DEFAULT '',
  seeking text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Métriques de succès (relation avec Section 1)
CREATE TABLE IF NOT EXISTS success_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section1_id uuid REFERENCES section1_responses(id) ON DELETE CASCADE,
  metric_type text NOT NULL,
  value text DEFAULT '',
  checked boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Section 2: Inspiration & Références
CREATE TABLE IF NOT EXISTS section2_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  fescui_features text[] DEFAULT '{}',
  other_fescui_feature text DEFAULT '',
  fescui_application text DEFAULT '',
  design_reference_name text DEFAULT '',
  design_reference_description text DEFAULT '',
  functionality_reference_name text DEFAULT '',
  functionality_reference_description text DEFAULT '',
  ux_reference_name text DEFAULT '',
  ux_reference_description text DEFAULT '',
  competitors text DEFAULT '',
  unique_value text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Section 3: Modules & Fonctionnalités
CREATE TABLE IF NOT EXISTS section3_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  module_a_features jsonb DEFAULT '{}',
  module_a_other_features text DEFAULT '',
  module_b_ideas text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Section 14: Validation & Prochaines Étapes
CREATE TABLE IF NOT EXISTS section14_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  evaluations jsonb DEFAULT '{}',
  concerns text DEFAULT '',
  enthusiasm text DEFAULT '',
  missing text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE section1_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE section2_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE section3_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE section14_responses ENABLE ROW LEVEL SECURITY;

-- Politiques RLS (accès public pour cette démo - à sécuriser en production)
CREATE POLICY "Allow all operations on projects"
  ON projects
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on section1_responses"
  ON section1_responses
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on personas"
  ON personas
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on success_metrics"
  ON success_metrics
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on section2_responses"
  ON section2_responses
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on section3_responses"
  ON section3_responses
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on section14_responses"
  ON section14_responses
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_section1_updated_at BEFORE UPDATE ON section1_responses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_section2_updated_at BEFORE UPDATE ON section2_responses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_section3_updated_at BEFORE UPDATE ON section3_responses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_section14_updated_at BEFORE UPDATE ON section14_responses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertion d'un projet par défaut
INSERT INTO projects (client_name, client_function, project_title) 
VALUES ('M. Ange KRA', 'Manager Général CIFOP', 'Plateforme de Formation et Orientation Professionnelle')
ON CONFLICT DO NOTHING;