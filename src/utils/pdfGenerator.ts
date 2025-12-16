import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Déclaration TypeScript pour autotable
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable?: {
      finalY: number;
    };
  }
}

// Configuration des couleurs premium
const COLORS = {
  primary: { r: 59, g: 130, b: 246 },
  secondary: { r: 139, g: 92, b: 246 },
  success: { r: 34, g: 197, b: 94 },
  warning: { r: 251, g: 146, b: 60 },
  danger: { r: 239, g: 68, b: 68 },
  dark: { r: 51, g: 65, b: 85 },
  light: { r: 248, g: 250, b: 252 },
  white: { r: 255, g: 255, b: 255 }
};

const FOOTER_INFO = {
  email: "contact@leonceouattarastudiogroup.site",
  whatsapp: "(+225) 05 45 13 07 39",
  website: "leonceouattarastudiogroup.site",
  linkedin: "linkedin.com/company/leonceouattarastudio"
};

// Labels pour les champs de données
const FIELD_LABELS: Record<string, string> = {
  // Section 1
  problemDescription: "Description du problème",
  targets: "Cibles visées",
  otherTarget: "Autre cible",
  personas: "Personas",
  successMetrics: "Métriques de succès",
  otherSuccessMetric: "Autre métrique",
  
  // Section 2
  fescuiFeatures: "Aspects appréciés de FESCUI",
  otherFescuiFeature: "Autre aspect FESCUI",
  fescuiApplication: "Application de l'inspiration FESCUI",
  references: "Références",
  competitors: "Concurrents",
  uniqueValue: "Valeur unique",
  
  // Section 3
  moduleA: "Module A - Orientation Professionnelle",
  moduleB: "Module B - Formation & E-Learning",
  moduleC: "Module C - Création de CV",
  moduleD: "Module D - Débouchés & Insertion",
  moduleE: "Module E - Profil Utilisateur",
  moduleF: "Module F - Gamification",
  moduleG: "Module G - Administration",
  additionalFeatures: "Fonctionnalités supplémentaires",
  
  // Section 4
  etape1_voit: "Étape 1 - Ce que l'utilisateur voit",
  etape1_fait: "Étape 1 - Ce que l'utilisateur fait",
  journeySteps: "Étapes du parcours",
  resultat_final: "Résultat final",
  ton_plateforme: "Ton de la plateforme",
  ton_autre: "Autre ton",
  ambiance_keywords: "Mots-clés d'ambiance",
  specificites_locales: "Spécificités locales",
  langues: "Langues",
  autres_specificites: "Autres spécificités",
  
  // Section 5
  sources_revenus: "Sources de revenus",
  autre_source_revenus: "Autre source de revenus",
  philosophie_tarifaire: "Philosophie tarifaire",
  budget_moyen_cible: "Budget moyen de la cible",
  utilisateurs_payants_12mois: "Utilisateurs payants à 12 mois",
  revenu_mensuel_12mois: "Revenu mensuel à 12 mois",
  strategie_croissance: "Stratégie de croissance",
  
  // Section 6
  mvp_features: "Fonctionnalités MVP",
  mvp_rationale: "Justification du MVP",
  phases: "Phases du projet",
  launch_contents: "Contenus au lancement",
  content_creators: "Créateurs de contenus",
  other_content_creator: "Autre créateur",
  
  // Section 7
  budget_range: "Fourchette budgétaire",
  budget_allocation: "Répartition du budget",
  timeline: "Délai de lancement",
  deadline_date: "Date limite",
  deadline_reason: "Raison de la deadline",
  team_size: "Taille de l'équipe",
  team_size_details: "Détails de l'équipe",
  internal_skills: "Compétences internes",
  other_internal_skills: "Autres compétences internes",
  external_skills: "Compétences à externaliser",
  other_external_skills: "Autres compétences externes",
  technical_constraints: "Contraintes techniques",
  other_constraints: "Autres contraintes",
  
  // Section 8
  kpis: "Indicateurs clés (KPIs)",
  other_kpi_name: "Autre KPI",
  other_kpi_target: "Cible autre KPI",
  validation_methods: "Méthodes de validation",
  other_validation: "Autre méthode de validation",
  kpi_frequency: "Fréquence de suivi des KPIs",
  kpi_responsible: "Responsable des KPIs",
  alert_completion_rate: "Seuil d'alerte - Taux de complétion",
  alert_retention_rate: "Seuil d'alerte - Taux de rétention",
  alert_satisfaction_score: "Seuil d'alerte - Score de satisfaction",
  
  // Section 9
  logo_status: "Statut du logo",
  logo_file: "Fichier logo",
  logo_url: "URL du logo",
  colors: "Couleurs",
  fonts: "Polices",
  brand_guide_url: "URL de la charte graphique",
  design_style: "Style de design",
  design_style_other: "Autre style",
  preferred_colors: "Couleurs préférées",
  visual_references: "Références visuelles",
  
  // Section 10
  supports: "Supports",
  other_support: "Autre support",
  support_priorities: "Priorités des supports",
  integrations: "Intégrations",
  other_integration: "Autre intégration",
  tech_preferences: "Préférences technologiques",
  scalability_needs: "Besoins de scalabilité",
  performance_requirements: "Exigences de performance",
  
  // Section 11
  partners: "Partenaires actuels",
  target_partnerships: "Partenariats cibles",
  partnership_approach: "Approche partenariats",
  partnership_value: "Valeur des partenariats",
  partnership_target_12m: "Objectif partenariats à 12 mois",
  
  // Section 12
  legal_status: "Statut juridique",
  legal_status_other: "Autre statut",
  company_name: "Nom de l'entreprise",
  registration_number: "Numéro d'enregistrement",
  creation_date: "Date de création",
  headquarters: "Siège social",
  legal_aspects: "Aspects légaux",
  legal_aspect_notes: "Notes légales",
  other_legal_aspects: "Autres aspects légaux",
  legal_assistance: "Assistance juridique",
  legal_assistance_needs: "Besoins d'assistance juridique",
  legal_counsel_name: "Nom du conseiller juridique",
  data_hosting: "Hébergement des données",
  security_measures: "Mesures de sécurité",
  other_security_measures: "Autres mesures de sécurité",
  
  // Section 13
  formation_frequency: "Fréquence des formations",
  etat_contenus: "État des contenus",
  apprenants_total: "Total des apprenants",
  success_stories: "Success stories",
  taux_insertion: "Taux d'insertion",
  profil_formateurs: "Profil des formateurs",
  partenaires_publics: "Partenaires publics",
  relation_plateforme: "Relation avec la plateforme",
  
  // Section 14
  evaluations: "Auto-évaluations",
  concerns: "Préoccupations",
  enthusiasm: "Points enthousiasmants",
  missing: "Points manquants"
};

// Fonction pour formater intelligemment les valeurs
function formatValue(value: any, key?: string): string {
  if (value === null || value === undefined || value === '') {
    return 'Non renseigné';
  }
  
  if (typeof value === 'boolean') {
    return value ? 'Oui' : 'Non';
  }
  
  if (typeof value === 'string') {
    return value;
  }
  
  if (typeof value === 'number') {
    // Formatter les grands nombres avec des espaces
    return value.toLocaleString('fr-FR');
  }
  
  if (Array.isArray(value)) {
    if (value.length === 0) return 'Aucun élément';
    
    // Traitement spécial pour les personas
    if (key === 'personas') {
      return value.map((persona, idx) => {
        const parts = [
          `Persona ${idx + 1}:`,
          `  Nom: ${persona.name || 'Non renseigné'}`,
          `  Âge: ${persona.age || 'Non renseigné'}`,
          `  Situation: ${persona.currentSituation || 'Non renseigné'}`,
          `  Problème: ${persona.problem || 'Non renseigné'}`,
          `  Recherche: ${persona.seeking || 'Non renseigné'}`
        ];
        return parts.join('\n');
      }).join('\n\n');
    }
    
    // Traitement pour les métriques de succès
    if (key === 'successMetrics') {
      return value.map((metric) => {
        if (!metric.checked) return null;
        const label = getMetricLabel(metric.type);
        return `• ${metric.value || 'N/A'} ${label}`;
      }).filter(Boolean).join('\n') || 'Aucune métrique définie';
    }
    
    // Traitement pour les étapes de parcours
    if (key === 'journeySteps') {
      return value.map((step, idx) => {
        return `Étape ${idx + 2}: ${step.step}\n  Description: ${step.description}\n  Action: ${step.action}`;
      }).join('\n\n');
    }
    
    // Traitement pour les partenaires
    if (key === 'partners') {
      return value.map((partner, idx) => {
        return `${idx + 1}. ${partner.name || 'N/A'} (${partner.type || 'N/A'})\n   Rôle: ${partner.role || 'N/A'} - Statut: ${partner.status || 'N/A'}`;
      }).join('\n');
    }
    
    // Traitement pour les références visuelles
    if (key === 'visual_references') {
      return value.map((ref, idx) => {
        return `${idx + 1}. ${ref.url || 'Non renseigné'}`;
      }).filter(v => v !== `${value.indexOf(ref) + 1}. Non renseigné`).join('\n') || 'Aucune référence';
    }
    
    // Liste simple
    return value.map((item, idx) => `${idx + 1}. ${item}`).join('\n');
  }
  
  if (typeof value === 'object') {
    // Traitement spécial pour les modules de fonctionnalités
    if (key && key.startsWith('module')) {
      if (value.features) {
        return formatModuleFeatures(value.features);
      }
      return formatObjectAsText(value);
    }
    
    // Traitement pour les sources de revenus
    if (key === 'sources_revenus') {
      return Object.entries(value)
        .filter(([_, data]: [string, any]) => data.checked)
        .map(([sourceKey, data]: [string, any]) => {
          const label = getRevenueSourceLabel(sourceKey);
          return `• ${label}: ${data.price || 'Non renseigné'}`;
        }).join('\n') || 'Aucune source définie';
    }
    
    // Traitement pour l'allocation budgétaire
    if (key === 'budget_allocation') {
      return Object.entries(value)
        .filter(([_, val]) => val)
        .map(([cat, val]) => {
          const label = getBudgetCategoryLabel(cat);
          return `• ${label}: ${val}%`;
        }).join('\n') || 'Non défini';
    }
    
    // Traitement pour les KPIs
    if (key === 'kpis') {
      return Object.entries(value)
        .filter(([_, data]: [string, any]) => data.checked)
        .map(([kpiKey, data]: [string, any]) => {
          const label = getKpiLabel(kpiKey);
          return `• ${label}: ${data.target || 'Non défini'}`;
        }).join('\n') || 'Aucun KPI défini';
    }
    
    // Traitement pour les méthodes de validation
    if (key === 'validation_methods') {
      return Object.entries(value)
        .filter(([_, data]: [string, any]) => data.checked)
        .map(([methodKey, data]: [string, any]) => {
          const label = getValidationMethodLabel(methodKey);
          return `• ${label}: ${data.detail || ''}`;
        }).join('\n') || 'Aucune méthode définie';
    }
    
    // Traitement pour les intégrations
    if (key === 'integrations') {
      return Object.entries(value)
        .filter(([_, data]: [string, any]) => data.checked)
        .map(([intKey, data]: [string, any]) => {
          const label = getIntegrationLabel(intKey);
          return `• ${label}: ${data.detail || ''}`;
        }).join('\n') || 'Aucune intégration définie';
    }
    
    // Traitement pour les aspects légaux
    if (key === 'legal_aspects') {
      return Object.entries(value)
        .filter(([_, checked]) => checked)
        .map(([aspectKey]) => {
          return `• ${getLegalAspectLabel(aspectKey)}`;
        }).join('\n') || 'Aucun aspect défini';
    }
    
    // Traitement pour les évaluations
    if (key === 'evaluations') {
      return Object.entries(value)
        .map(([aspect, rating]) => {
          return `• ${aspect}: ${rating}/5`;
        }).join('\n') || 'Aucune évaluation';
    }
    
    // Traitement pour les références
    if (key === 'references') {
      const parts = [];
      if (value.design && (value.design.name || value.design.description)) {
        parts.push(`Design: ${value.design.name || 'N/A'}\n  ${value.design.description || ''}`);
      }
      if (value.functionality && (value.functionality.name || value.functionality.description)) {
        parts.push(`Fonctionnalités: ${value.functionality.name || 'N/A'}\n  ${value.functionality.description || ''}`);
      }
      if (value.ux && (value.ux.name || value.ux.description)) {
        parts.push(`UX: ${value.ux.name || 'N/A'}\n  ${value.ux.description || ''}`);
      }
      return parts.join('\n\n') || 'Aucune référence';
    }
    
    // Traitement pour les couleurs préférées
    if (key === 'preferred_colors') {
      const parts = [];
      if (value.primary) parts.push(`Principale: ${value.primary}`);
      if (value.secondary) parts.push(`Secondaire: ${value.secondary}`);
      if (value.accent) parts.push(`Accentuation: ${value.accent}`);
      return parts.join('\n') || 'Aucune couleur définie';
    }
    
    // Traitement pour les phases
    if (key === 'phases') {
      const parts = [];
      if (value.v1) {
        parts.push(`Version 1 (MVP):\n  Fonctionnalités: ${value.v1.features || 'Non défini'}\n  Utilisateurs cibles: ${value.v1.target_users || 'Non défini'}`);
      }
      if (value.v2) {
        parts.push(`Version 2:\n  Ajouts: ${value.v2.additions || 'Non défini'}`);
      }
      if (value.v3) {
        parts.push(`Version 3:\n  Ajouts: ${value.v3.additions || 'Non défini'}`);
      }
      return parts.join('\n\n') || 'Aucune phase définie';
    }
    
    // Traitement pour les contenus de lancement
    if (key === 'launch_contents') {
      return Object.entries(value)
        .filter(([_, val]) => val)
        .map(([contentKey, val]) => {
          const label = getLaunchContentLabel(contentKey);
          return `• ${label}: ${val}`;
        }).join('\n') || 'Aucun contenu défini';
    }
    
    // Traitement pour les spécificités locales
    if (key === 'specificites_locales') {
      return Object.entries(value)
        .filter(([_, checked]) => checked)
        .map(([specKey]) => {
          return `• ${getSpecificiteLabel(specKey)}`;
        }).join('\n') || 'Aucune spécificité';
    }
    
    return formatObjectAsText(value);
  }
  
  return String(value);
}

// Fonction pour formater les fonctionnalités d'un module
function formatModuleFeatures(features: any): string {
  return Object.entries(features)
    .map(([featureKey, data]: [string, any]) => {
      const label = getFeatureLabel(featureKey);
      const priority = data.priority || 'Non définie';
      const detail = data.detail || '';
      return `• ${label} [${priority}]${detail ? `\n  Détail: ${detail}` : ''}`;
    }).join('\n') || 'Aucune fonctionnalité définie';
}

// Fonction pour formater un objet générique
function formatObjectAsText(obj: any): string {
  return Object.entries(obj)
    .filter(([_, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => {
      const label = FIELD_LABELS[k] || k.replace(/_/g, ' ');
      if (typeof v === 'object' && !Array.isArray(v)) {
        return `${label}:\n  ${formatValue(v, k)}`;
      }
      return `• ${label}: ${formatValue(v, k)}`;
    })
    .join('\n') || 'Aucune donnée';
}

// Fonctions d'aide pour obtenir les labels
function getMetricLabel(type: string): string {
  const labels: Record<string, string> = {
    'utilisateurs_inscrits': 'utilisateurs inscrits',
    'formations_completees': 'formations complétées',
    'emplois_trouves': 'personnes ayant trouvé un emploi',
    'revenus_fcfa': 'FCFA de revenus',
    'partenariats': 'partenariats entreprises',
    'satisfaction': 'de satisfaction'
  };
  return labels[type] || type;
}

function getRevenueSourceLabel(key: string): string {
  const labels: Record<string, string> = {
    'abonnement_utilisateurs': 'Abonnement utilisateurs',
    'vente_formations': 'Vente de formations',
    'freemium': 'Freemium',
    'b2b_entreprises': 'B2B - Entreprises',
    'commission_placements': 'Commission sur placements',
    'publicite': 'Publicité',
    'partenariats': 'Partenariats/Sponsoring',
    'subventions': 'Subventions',
    'gratuit': 'Gratuit'
  };
  return labels[key] || key;
}

function getBudgetCategoryLabel(cat: string): string {
  const labels: Record<string, string> = {
    'design': 'Design/UX',
    'development': 'Développement',
    'content': 'Contenus',
    'marketing': 'Marketing',
    'other': 'Autre'
  };
  return labels[cat] || cat;
}

function getKpiLabel(key: string): string {
  const labels: Record<string, string> = {
    'inscriptions': 'Nombre d\'inscriptions',
    'activation': 'Taux d\'activation',
    'formations_commencees': 'Formations commencées',
    'formations_terminees': 'Formations terminées',
    'taux_completion': 'Taux de complétion',
    'cv_generes': 'CV générés',
    'placements': 'Placements réussis',
    'revenus': 'Revenus générés',
    'satisfaction': 'Taux de satisfaction',
    'retention': 'Taux de rétention'
  };
  return labels[key] || key;
}

function getValidationMethodLabel(key: string): string {
  const labels: Record<string, string> = {
    'tests_pilotes': 'Tests avec utilisateurs pilotes',
    'focus_groups': 'Focus groups / Interviews',
    'questionnaires': 'Questionnaires de satisfaction',
    'analytics': 'Analytics / Tracking',
    'ab_testing': 'A/B Testing'
  };
  return labels[key] || key;
}

function getIntegrationLabel(key: string): string {
  const labels: Record<string, string> = {
    'paiement_mobile': 'Paiement mobile money',
    'paiement_carte': 'Paiement carte bancaire',
    'connexion_sociale': 'Connexion sociale',
    'analytics': 'Analytics',
    'email_marketing': 'Email marketing',
    'visioconference': 'Visioconférence',
    'stockage_cloud': 'Stockage cloud'
  };
  return labels[key] || key;
}

function getLegalAspectLabel(key: string): string {
  const labels: Record<string, string> = {
    'rgpd': 'Protection des données (RGPD)',
    'cgu_cgv': 'CGU / CGV',
    'confidentialite': 'Politique de confidentialité',
    'droits_auteur': 'Droits d\'auteur',
    'certifications': 'Certifications de formation',
    'contrats_travail': 'Contrats de travail'
  };
  return labels[key] || key;
}

function getFeatureLabel(key: string): string {
  const labels: Record<string, string> = {
    'test_orientation': 'Test d\'orientation',
    'fiches_metiers': 'Fiches métiers détaillées',
    'visualisation_debouches': 'Visualisation des débouchés',
    'recommandations': 'Recommandations personnalisées',
    'témoignages': 'Témoignages de professionnels'
  };
  return labels[key] || key.replace(/_/g, ' ');
}

function getLaunchContentLabel(key: string): string {
  const labels: Record<string, string> = {
    'fiches_metiers': 'Fiches métiers',
    'formations': 'Formations complètes',
    'heures_videos': 'Heures de vidéos',
    'offres_emploi': 'Offres d\'emploi/stages',
    'temoignages': 'Témoignages professionnels'
  };
  return labels[key] || key;
}

function getSpecificiteLabel(key: string): string {
  const labels: Record<string, string> = {
    'contenus_adaptes': 'Contenus adaptés au contexte local',
    'metiers_tension': 'Métiers en tension mis en avant',
    'partenariats_locaux': 'Partenariats avec entreprises locales',
    'mobile_prioritaire': 'Accessibilité mobile prioritaire',
    'faible_connexion': 'Optimisation pour faible connexion',
    'paiement_mobile': 'Paiement mobile money'
  };
  return labels[key] || key;
}

// Fonction pour ajouter un footer professionnel
function addFooter(doc: jsPDF, pageNumber: number, totalPages: number) {
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const footerY = pageHeight - 25;
  
  doc.setDrawColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
  doc.setLineWidth(0.5);
  doc.line(20, footerY - 5, pageWidth - 20, footerY - 5);
  
  doc.setFontSize(8);
  doc.setTextColor(COLORS.dark.r, COLORS.dark.g, COLORS.dark.b);
  doc.text(`Email: ${FOOTER_INFO.email}`, 20, footerY + 2);
  doc.text(`WhatsApp: ${FOOTER_INFO.whatsapp}`, 20, footerY + 7);
  
  doc.setFontSize(9);
  doc.setTextColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
  const pageText = `Page ${pageNumber}/${totalPages}`;
  const pageTextWidth = doc.getTextWidth(pageText);
  doc.text(pageText, pageWidth - 20 - pageTextWidth, footerY + 4);
  
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text('Leonce Ouattara Studio Group', 20, footerY + 12);
}

// Fonction pour ajouter une page de couverture premium
function addCoverPage(doc: jsPDF, projectInfo: any) {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  for (let i = 0; i < 100; i++) {
    const alpha = i / 100;
    const r = COLORS.primary.r + (COLORS.secondary.r - COLORS.primary.r) * alpha;
    const g = COLORS.primary.g + (COLORS.secondary.g - COLORS.primary.g) * alpha;
    const b = COLORS.primary.b + (COLORS.secondary.b - COLORS.primary.b) * alpha;
    doc.setFillColor(r, g, b);
    doc.rect(0, i * (pageHeight / 100), pageWidth, pageHeight / 100, 'F');
  }
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  const title = 'DOCUMENT DE CADRAGE';
  const titleWidth = doc.getTextWidth(title);
  doc.text(title, (pageWidth - titleWidth) / 2, 70);
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'normal');
  const subtitle = 'Plateforme de Formation et';
  const subtitle2 = 'Orientation Professionnelle';
  doc.text(subtitle, (pageWidth - doc.getTextWidth(subtitle)) / 2, 90);
  doc.text(subtitle2, (pageWidth - doc.getTextWidth(subtitle2)) / 2, 100);
  
  const boxY = 130;
  const boxHeight = 60;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(40, boxY, pageWidth - 80, boxHeight, 3, 3, 'F');
  
  doc.setTextColor(COLORS.dark.r, COLORS.dark.g, COLORS.dark.b);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('CLIENT', 50, boxY + 15);
  doc.setFont('helvetica', 'normal');
  doc.text(projectInfo?.client_name || 'M. Ange KRA', 50, boxY + 25);
  
  doc.setFont('helvetica', 'bold');
  doc.text('FONCTION', 50, boxY + 38);
  doc.setFont('helvetica', 'normal');
  doc.text(projectInfo?.client_function || 'Manager Général CIFOP', 50, boxY + 48);
  
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  const date = new Date().toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  doc.text(`Date: ${date}`, (pageWidth - doc.getTextWidth(`Date: ${date}`)) / 2, pageHeight - 40);
  doc.text('Version 1.0 - Document Complet', (pageWidth - doc.getTextWidth('Version 1.0 - Document Complet')) / 2, pageHeight - 30);
  
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(FOOTER_INFO.website, (pageWidth - doc.getTextWidth(FOOTER_INFO.website)) / 2, pageHeight - 15);
}

// Fonction pour ajouter un sommaire
function addTableOfContents(doc: jsPDF, sections: any[]) {
  doc.addPage();
  
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
  doc.text('SOMMAIRE', 20, 30);
  
  doc.setDrawColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
  doc.setLineWidth(2);
  doc.line(20, 35, 80, 35);
  
  let yPos = 50;
  doc.setFontSize(11);
  
  sections.forEach((section, index) => {
    if (yPos > 260) {
      doc.addPage();
      yPos = 30;
    }
    
    doc.setFillColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
    doc.circle(25, yPos - 2, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text(section.id.toString(), 25, yPos, { align: 'center' });
    
    doc.setFontSize(11);
    doc.setTextColor(COLORS.dark.r, COLORS.dark.g, COLORS.dark.b);
    doc.setFont('helvetica', 'normal');
    doc.text(section.title, 35, yPos);
    
    const pageNum = (index + 3).toString();
    doc.setTextColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
    doc.text(pageNum, 190, yPos, { align: 'right' });
    
    yPos += 10;
  });
  
  addFooter(doc, 2, 100);
}

// Fonction pour ajouter un header de section
function addSectionHeader(doc: jsPDF, sectionId: number, title: string, yPos: number): number {
  const pageWidth = doc.internal.pageSize.width;
  
  doc.setFillColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
  doc.roundedRect(20, yPos, pageWidth - 40, 15, 2, 2, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`SECTION ${sectionId}`, 25, yPos + 10);
  
  doc.setFontSize(12);
  doc.text(title, 60, yPos + 10);
  
  return yPos + 20;
}

// Fonction pour créer un tableau de données
function createDataTable(doc: jsPDF, data: any[], startY: number): number {
  if (!data || data.length === 0) return startY;
  
  const tableData = data.map(([key, value]) => [
    key,
    formatValue(value, key)
  ]);
  
  autoTable(doc, {
    startY: startY,
    head: [['Champ', 'Valeur']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [COLORS.primary.r, COLORS.primary.g, COLORS.primary.b],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 10
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [COLORS.dark.r, COLORS.dark.g, COLORS.dark.b],
      cellPadding: 3
    },
    alternateRowStyles: {
      fillColor: [COLORS.light.r, COLORS.light.g, COLORS.light.b]
    },
    columnStyles: {
      0: { cellWidth: 60, fontStyle: 'bold' },
      1: { cellWidth: 'auto', cellPadding: 3 }
    },
    margin: { left: 20, right: 20 },
    didParseCell: function(data) {
      // Ajuster la hauteur des cellules pour le contenu multi-lignes
      if (data.section === 'body' && data.column.index === 1) {
        const text = data.cell.text.join('\n');
        const lines = text.split('\n').length;
        if (lines > 3) {
          data.cell.styles.minCellHeight = lines * 4;
        }
      }
    }
  });
  
  return (doc as any).lastAutoTable?.finalY || startY + 20;
}

// Fonction pour ajouter une section avec données
function addSectionWithData(
  doc: jsPDF, 
  section: any, 
  sectionData: any, 
  pageNumber: number,
  totalPages: number
): number {
  doc.addPage();
  
  let yPos = 30;
  
  yPos = addSectionHeader(doc, section.id, section.title, yPos);
  
  if (!sectionData || Object.keys(sectionData).length === 0) {
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Aucune donnée saisie pour cette section.', 20, yPos + 10);
    addFooter(doc, pageNumber, totalPages);
    return pageNumber + 1;
  }
  
  const tableData = Object.entries(sectionData)
    .filter(([key]) => !key.startsWith('_'))
    .map(([key, value]) => {
      const label = FIELD_LABELS[key] || key
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      return [label, value];
    });
  
  yPos = createDataTable(doc, tableData, yPos + 5);
  
  addFooter(doc, pageNumber, totalPages);
  
  return pageNumber + 1;
}

// Fonction principale pour générer le PDF d'une section
export async function generateSectionPDF(section: any, sectionData: any) {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.setTextColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
  doc.setFont('helvetica', 'bold');
  doc.text('DOCUMENT DE CADRAGE CIFOP', 20, 30);
  
  doc.setFontSize(16);
  doc.setTextColor(COLORS.dark.r, COLORS.dark.g, COLORS.dark.b);
  doc.text(`SECTION ${section.id} : ${section.title}`, 20, 50);
  
  doc.setDrawColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
  doc.setLineWidth(1);
  doc.line(20, 55, 190, 55);
  
  let yPos = 70;
  
  if (!sectionData || Object.keys(sectionData).length === 0) {
    doc.setFontSize(11);
    doc.setTextColor(150, 150, 150);
    doc.text('Aucune donnée saisie pour cette section.', 20, yPos);
  } else {
    const tableData = Object.entries(sectionData)
      .filter(([key]) => !key.startsWith('_'))
      .map(([key, value]) => {
        const label = FIELD_LABELS[key] || key
          .replace(/_/g, ' ')
          .replace(/([A-Z])/g, ' $1')
          .trim()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        return [label, value];
      });
    
    createDataTable(doc, tableData, yPos);
  }
  
  addFooter(doc, 1, 1);
  
  const fileName = `CIFOP_Section_${section.id}_${section.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(fileName);
}

// Fonction principale pour générer le PDF complet
export async function generateFullPDF(sections: any[], formData: any, projectInfo?: any) {
  const doc = new jsPDF();
  
  addCoverPage(doc, projectInfo);
  addTableOfContents(doc, sections);
  
  let currentPage = 3;
  const totalPages = sections.length + 3;
  
  sections.forEach((section) => {
    const sectionData = formData[section.id] || {};
    currentPage = addSectionWithData(doc, section, sectionData, currentPage, totalPages);
  });
  
  // Page de conclusion
  doc.addPage();
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
  doc.text('PROCHAINES ETAPES', 20, 30);
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(COLORS.dark.r, COLORS.dark.g, COLORS.dark.b);
  
  const nextSteps = [
    '1. Atelier de cadrage (2-3h) pour clarifier les zones floues',
    '2. Production du cahier des charges detaille',
    '3. Creation des wireframes et maquettes',
    '4. Estimation budgetaire precise',
    '5. Planning de realisation detaille',
    '6. Validation et lancement du projet'
  ];
  
  let yPos = 50;
  nextSteps.forEach(step => {
    doc.text(step, 25, yPos);
    yPos += 10;
  });
  
  yPos += 10;
  doc.setFillColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
  doc.roundedRect(20, yPos, 170, 40, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('CONTACT', 25, yPos + 10);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Email: ${FOOTER_INFO.email}`, 25, yPos + 20);
  doc.text(`WhatsApp: ${FOOTER_INFO.whatsapp}`, 25, yPos + 27);
  doc.text(`Web: ${FOOTER_INFO.website}`, 25, yPos + 34);
  
  addFooter(doc, currentPage, currentPage);
  
  const fileName = `CIFOP_Document_Cadrage_Complet_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}
