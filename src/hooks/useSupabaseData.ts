// src/hooks/useSupabaseData.ts - VERSION AVEC SECTION 8
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Project } from '../lib/supabase';

export function useSupabaseData() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrCreateProject();
  }, []);

  const loadOrCreateProject = async () => {
    try {
      setLoading(true);
      
      const { data: projects, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      if (projects && projects.length > 0) {
        setProject(projects[0]);
      } else {
        const { data: newProject, error: createError } = await supabase
          .from('projects')
          .insert({
            client_name: 'M. Ange KRA',
            client_function: 'Manager Général CIFOP',
            project_title: 'Plateforme de Formation et Orientation Professionnelle'
          })
          .select()
          .single();

        if (createError) throw createError;
        setProject(newProject);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement du projet');
    } finally {
      setLoading(false);
    }
  };

  // Section 1 - Vision & Objectifs
  const saveSection1 = async (data: any) => {
    if (!project) return;

    try {
      const { data: section1, error: section1Error } = await supabase
        .from('section1_responses')
        .upsert({
          project_id: project.id,
          problem_description: data.problemDescription || '',
          targets: data.targets || [],
          other_target: data.otherTarget || '',
          other_success_metric: data.otherSuccessMetric || ''
        }, {
          onConflict: 'project_id'
        })
        .select()
        .single();

      if (section1Error) throw section1Error;

      if (data.personas && data.personas.length > 0) {
        await supabase.from('personas').delete().eq('section1_id', section1.id);

        const personasToInsert = data.personas.map((persona: any) => ({
          section1_id: section1.id,
          name: persona.name || '',
          age: persona.age || '',
          current_situation: persona.currentSituation || '',
          problem: persona.problem || '',
          seeking: persona.seeking || ''
        }));

        const { error: personasError } = await supabase
          .from('personas')
          .insert(personasToInsert);

        if (personasError) throw personasError;
      }

      if (data.successMetrics && data.successMetrics.length > 0) {
        await supabase.from('success_metrics').delete().eq('section1_id', section1.id);

        const metricsToInsert = data.successMetrics.map((metric: any) => ({
          section1_id: section1.id,
          metric_type: metric.type,
          value: metric.value || '',
          checked: metric.checked || false
        }));

        const { error: metricsError } = await supabase
          .from('success_metrics')
          .insert(metricsToInsert);

        if (metricsError) throw metricsError;
      }

      return section1;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
      throw err;
    }
  };

  // Section 2 - Inspiration & Références
  const saveSection2 = async (data: any) => {
    if (!project) return;

    try {
      const { data: section2, error } = await supabase
        .from('section2_responses')
        .upsert({
          project_id: project.id,
          fescui_features: data.fescuiFeatures || [],
          other_fescui_feature: data.otherFescuiFeature || '',
          fescui_application: data.fescuiApplication || '',
          design_reference_name: data.references?.design?.name || '',
          design_reference_description: data.references?.design?.description || '',
          functionality_reference_name: data.references?.functionality?.name || '',
          functionality_reference_description: data.references?.functionality?.description || '',
          ux_reference_name: data.references?.ux?.name || '',
          ux_reference_description: data.references?.ux?.description || '',
          competitors: data.competitors || '',
          unique_value: data.uniqueValue || ''
        }, {
          onConflict: 'project_id'
        })
        .select()
        .single();

      if (error) throw error;
      return section2;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
      throw err;
    }
  };

  // Section 3 - Modules & Fonctionnalités
  const saveSection3 = async (data: any) => {
    if (!project) return;

    try {
      const { data: section3, error } = await supabase
        .from('section3_responses')
        .upsert({
          project_id: project.id,
          module_a_features: data.moduleA?.features || {},
          module_a_other_features: data.moduleA?.otherFeatures || '',
          module_b_ideas: data.moduleB?.ideas || ''
        }, {
          onConflict: 'project_id'
        })
        .select()
        .single();

      if (error) throw error;
      return section3;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
      throw err;
    }
  };

  // Section 4 - Expérience Utilisateur
  const saveSection4 = async (data: any) => {
    if (!project) return;

    try {
      const { data: section4, error } = await supabase
        .from('section4_responses')
        .upsert({
          project_id: project.id,
          etape1_voit: data.etape1_voit || '',
          etape1_fait: data.etape1_fait || '',
          journey_steps: data.journeySteps || [],
          resultat_final: data.resultat_final || '',
          ton_plateforme: data.ton_plateforme || '',
          ton_autre: data.ton_autre || '',
          ambiance_keywords: data.ambiance_keywords || [],
          specificites_locales: data.specificites_locales || {},
          langues: data.langues || '',
          autres_specificites: data.autres_specificites || ''
        }, {
          onConflict: 'project_id'
        })
        .select()
        .single();

      if (error) throw error;
      return section4;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
      throw err;
    }
  };

  // Section 5 - Modèle Économique
  const saveSection5 = async (data: any) => {
    if (!project) return;

    try {
      const { data: section5, error } = await supabase
        .from('section5_responses')
        .upsert({
          project_id: project.id,
          sources_revenus: data.sources_revenus || {},
          autre_source_revenus: data.autre_source_revenus || '',
          philosophie_tarifaire: data.philosophie_tarifaire || '',
          budget_moyen_cible: data.budget_moyen_cible || '',
          utilisateurs_payants_12mois: data.utilisateurs_payants_12mois || '',
          revenu_mensuel_12mois: data.revenu_mensuel_12mois || '',
          strategie_croissance: data.strategie_croissance || ''
        }, {
          onConflict: 'project_id'
        })
        .select()
        .single();

      if (error) throw error;
      return section5;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
      throw err;
    }
  };

  // Section 6 - Lancement & Priorités
  const saveSection6 = async (data: any) => {
    if (!project) return;

    try {
      const { data: section6, error } = await supabase
        .from('section6_responses')
        .upsert({
          project_id: project.id,
          mvp_features: data.mvp_features || [],
          mvp_custom_0: data.mvp_custom_0 || '',
          mvp_custom_1: data.mvp_custom_1 || '',
          mvp_custom_2: data.mvp_custom_2 || '',
          mvp_rationale: data.mvp_rationale || '',
          phases: data.phases || {},
          launch_contents: data.launch_contents || {},
          content_creators: data.content_creators || [],
          other_content_creator: data.other_content_creator || ''
        }, {
          onConflict: 'project_id'
        })
        .select()
        .single();

      if (error) throw error;
      return section6;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
      throw err;
    }
  };

  // Section 7 - Ressources & Contraintes
  const saveSection7 = async (data: any) => {
    if (!project) return;

    try {
      const { data: section7, error } = await supabase
        .from('section7_responses')
        .upsert({
          project_id: project.id,
          budget_range: data.budget_range || '',
          budget_allocation: data.budget_allocation || {},
          timeline: data.timeline || '',
          deadline_date: data.deadline_date || null,
          deadline_reason: data.deadline_reason || '',
          team_size: data.team_size || '',
          team_size_details: data.team_size_details || '',
          internal_skills: data.internal_skills || [],
          other_internal_skills: data.other_internal_skills || '',
          external_skills: data.external_skills || [],
          other_external_skills: data.other_external_skills || '',
          technical_constraints: data.technical_constraints || [],
          other_constraints: data.other_constraints || ''
        }, {
          onConflict: 'project_id'
        })
        .select()
        .single();

      if (error) throw error;
      return section7;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
      throw err;
    }
  };

  // Section 8 - Mesure du Succès
  const saveSection8 = async (data: any) => {
    if (!project) return;

    try {
      const { data: section8, error } = await supabase
        .from('section8_responses')
        .upsert({
          project_id: project.id,
          kpis: data.kpis || {},
          other_kpi_name: data.other_kpi_name || '',
          other_kpi_target: data.other_kpi_target || '',
          validation_methods: data.validation_methods || {},
          other_validation: data.other_validation || '',
          kpi_frequency: data.kpi_frequency || '',
          kpi_responsible: data.kpi_responsible || '',
          alert_completion_rate: data.alert_completion_rate || '',
          alert_retention_rate: data.alert_retention_rate || '',
          alert_satisfaction_score: data.alert_satisfaction_score || ''
        }, {
          onConflict: 'project_id'
        })
        .select()
        .single();

      if (error) throw error;
      return section8;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
      throw err;
    }
  };
  
  
// Section 9 - Design & Identité Visuelle
const saveSection9 = async (data: any) => {
  if (!project) return;

  try {
    const { data: section9, error } = await supabase
      .from('section9_responses')
      .upsert({
        project_id: project.id,
        logo_status: data.logo_status || '',
        logo_file: data.logo_file || '',
        logo_url: data.logo_url || '',
        colors: data.colors || {},
        fonts: data.fonts || '',
        brand_guide_url: data.brand_guide_url || '',
        design_style: data.design_style || '',
        design_style_other: data.design_style_other || '',
        preferred_colors: data.preferred_colors || {},
        visual_references: data.visual_references || []
      }, {
        onConflict: 'project_id'
      })
      .select()
      .single();

    if (error) throw error;
    return section9;
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    throw err;
  }
};

   
// Section 10 - Plateformes & Technologies
const saveSection10 = async (data: any) => {
  if (!project) return;

  try {
    const { data: section10, error } = await supabase
      .from('section10_responses')
      .upsert({
        project_id: project.id,
        supports: data.supports || [],
        other_support: data.other_support || '',
        support_priorities: data.support_priorities || [],
        integrations: data.integrations || {},
        other_integration: data.other_integration || '',
        tech_preferences: data.tech_preferences || '',
        scalability_needs: data.scalability_needs || '',
        performance_requirements: data.performance_requirements || ''
      }, {
        onConflict: 'project_id'
      })
      .select()
      .single();

    if (error) throw error;
    return section10;
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    throw err;
  }
};

// Section 11 - Partenariats & Écosystème
const saveSection11 = async (data: any) => {
  if (!project) return;

  try {
    const { data: section11, error } = await supabase
      .from('section11_responses')
      .upsert({
        project_id: project.id,
        partners: data.partners || [],
        target_partnerships: data.target_partnerships || '',
        partnership_approach: data.partnership_approach || '',
        partnership_value: data.partnership_value || '',
        partnership_target_12m: data.partnership_target_12m || ''
      }, {
        onConflict: 'project_id'
      })
      .select()
      .single();

    if (error) throw error;
    return section11;
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    throw err;
  }
};


// Section 12 - Aspects Légaux & Sécurité
const saveSection12 = async (data: any) => {
  if (!project) return;

  try {
    const { data: section12, error } = await supabase
      .from('section12_responses')
      .upsert({
        project_id: project.id,
        legal_status: data.legal_status || '',
        legal_status_other: data.legal_status_other || '',
        company_name: data.company_name || '',
        registration_number: data.registration_number || '',
        creation_date: data.creation_date || null,
        headquarters: data.headquarters || '',
        legal_aspects: data.legal_aspects || {},
        legal_aspect_notes: data.legal_aspect_notes || {},
        other_legal_aspects: data.other_legal_aspects || '',
        legal_assistance: data.legal_assistance || '',
        legal_assistance_needs: data.legal_assistance_needs || '',
        legal_counsel_name: data.legal_counsel_name || '',
        data_hosting: data.data_hosting || '',
        security_measures: data.security_measures || [],
        other_security_measures: data.other_security_measures || ''
      }, {
        onConflict: 'project_id'
      })
      .select()
      .single();

    if (error) throw error;
    return section12;
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    throw err;
  }
};

// Section 13 - Capitalisation sur l'Existant CIFOP
const saveSection13 = async (data: any) => {
  if (!project) return;

  try {
    const { data: section13, error } = await supabase
      .from('section13_responses')
      .upsert({
        project_id: project.id,
        // 13.1
        formations_par_an: data.formations_par_an || '',
        formation_frequency: data.formation_frequency || '',
        formation_frequency_other: data.formation_frequency_other || '',
        formation_formats: data.formation_formats || [],
        formation_format_other: data.formation_format_other || '',
        // 13.2
        thematiques_couvertes: data.thematiques_couvertes || {},
        autre_thematique: data.autre_thematique || '',
        contenus_digitalisables: data.contenus_digitalisables || {},
        etat_contenus: data.etat_contenus || '',
        etat_contenus_precision: data.etat_contenus_precision || '',
        // 13.3
        apprenants_total: data.apprenants_total || '',
        apprenants_12mois: data.apprenants_12mois || '',
        base_donnees: data.base_donnees || '',
        infos_disponibles: data.infos_disponibles || [],
        autres_infos_disponibles: data.autres_infos_disponibles || '',
        contact_alumni: data.contact_alumni || '',
        // 13.4
        taux_insertion: data.taux_insertion || '',
        success_stories: data.success_stories || '',
        success_stories_exemples: data.success_stories_exemples || [],
        // 13.5
        formateurs_permanents: data.formateurs_permanents || '',
        formateurs_vacataires: data.formateurs_vacataires || '',
        formateurs_externes: data.formateurs_externes || '',
        profil_formateurs: data.profil_formateurs || [],
        formateurs_digital: data.formateurs_digital || '',
        formateurs_digital_nombre: data.formateurs_digital_nombre || '',
        // 13.6
        partenaires_entreprises: data.partenaires_entreprises || '',
        partenaires_entreprises_nombre: data.partenaires_entreprises_nombre || '',
        partenaires_entreprises_liste: data.partenaires_entreprises_liste || [],
        partenaires_certification: data.partenaires_certification || '',
        partenaires_certification_details: data.partenaires_certification_details || '',
        partenaires_centres: data.partenaires_centres || '',
        partenaires_centres_details: data.partenaires_centres_details || '',
        partenaires_publics: data.partenaires_publics || [],
        partenaires_publics_autre: data.partenaires_publics_autre || '',
        aucun_partenariat_public: data.aucun_partenariat_public || false,
        partenaires_bailleurs: data.partenaires_bailleurs || '',
        partenaires_bailleurs_details: data.partenaires_bailleurs_details || '',
        // 13.7
        relation_plateforme: data.relation_plateforme || '',
        relation_plateforme_autre: data.relation_plateforme_autre || '',
        nom_plateforme: data.nom_plateforme || '',
        nom_plateforme_nouveau: data.nom_plateforme_nouveau || '',
        gouvernance: data.gouvernance || '',
        gouvernance_equipe_taille: data.gouvernance_equipe_taille || '',
        // 13.8
        forces_cifop: data.forces_cifop || [],
        forces_cifop_autre: data.forces_cifop_autre || '',
        amplification_forces: data.amplification_forces || '',
        matrice_forces: data.matrice_forces || {},
        // 13.9
        motivations_digitalisation: data.motivations_digitalisation || [],
        motivation_autre: data.motivation_autre || '',
        metrique_prioritaire: data.metrique_prioritaire || '',
        metrique_objectif: data.metrique_objectif || '',
        metrique_autre: data.metrique_autre || '',
        // 13.10
        strategie_transition: data.strategie_transition || '',
        strategie_transition_autre: data.strategie_transition_autre || '',
        masterclass_digital: data.masterclass_digital || '',
        masterclass_digital_autre: data.masterclass_digital_autre || '',
        presentiel_focus: data.presentiel_focus || [],
        presentiel_focus_autre: data.presentiel_focus_autre || ''
      }, {
        onConflict: 'project_id'
      })
      .select()
      .single();

    if (error) throw error;
    return section13;
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    throw err;
  }
};

  // Section 14 - Validation & Prochaines Étapes
  const saveSection14 = async (data: any) => {
    if (!project) return;

    try {
      const { data: section14, error } = await supabase
        .from('section14_responses')
        .upsert({
          project_id: project.id,
          evaluations: data.evaluations || {},
          concerns: data.concerns || '',
          enthusiasm: data.enthusiasm || '',
          missing: data.missing || ''
        }, {
          onConflict: 'project_id'
        })
        .select()
        .single();

      if (error) throw error;
      return section14;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
      throw err;
    }
  };

  // Charger les données d'une section
  const loadSectionData = async (sectionId: number) => {
    if (!project) return null;

    try {
      switch (sectionId) {
        case 1: {
          const { data: section1, error: section1Error } = await supabase
            .from('section1_responses')
            .select('*')
            .eq('project_id', project.id)
            .limit(1);

          if (section1Error) throw section1Error;
          if (!section1 || section1.length === 0) return null;

          const section1Data = section1[0];

          const { data: personas, error: personasError } = await supabase
            .from('personas')
            .select('*')
            .eq('section1_id', section1Data.id);

          if (personasError) throw personasError;

          const { data: metrics, error: metricsError } = await supabase
            .from('success_metrics')
            .select('*')
            .eq('section1_id', section1Data.id);

          if (metricsError) throw metricsError;

          return {
            problemDescription: section1Data.problem_description,
            targets: section1Data.targets,
            otherTarget: section1Data.other_target,
            otherSuccessMetric: section1Data.other_success_metric,
            personas: personas?.map(p => ({
              name: p.name,
              age: p.age,
              currentSituation: p.current_situation,
              problem: p.problem,
              seeking: p.seeking
            })) || [],
            successMetrics: metrics?.map(m => ({
              type: m.metric_type,
              value: m.value,
              checked: m.checked
            })) || []
          };
        }

        case 2: {
          const { data: section2, error } = await supabase
            .from('section2_responses')
            .select('*')
            .eq('project_id', project.id)
            .limit(1);

          if (error) throw error;
          if (!section2 || section2.length === 0) return null;

          const section2Data = section2[0];

          return {
            fescuiFeatures: section2Data.fescui_features,
            otherFescuiFeature: section2Data.other_fescui_feature,
            fescuiApplication: section2Data.fescui_application,
            references: {
              design: {
                name: section2Data.design_reference_name,
                description: section2Data.design_reference_description
              },
              functionality: {
                name: section2Data.functionality_reference_name,
                description: section2Data.functionality_reference_description
              },
              ux: {
                name: section2Data.ux_reference_name,
                description: section2Data.ux_reference_description
              }
            },
            competitors: section2Data.competitors,
            uniqueValue: section2Data.unique_value
          };
        }

        case 3: {
          const { data: section3, error } = await supabase
            .from('section3_responses')
            .select('*')
            .eq('project_id', project.id)
            .limit(1);

          if (error) throw error;
          if (!section3 || section3.length === 0) return null;

          const section3Data = section3[0];

          return {
            moduleA: {
              features: section3Data.module_a_features,
              otherFeatures: section3Data.module_a_other_features
            },
            moduleB: {
              ideas: section3Data.module_b_ideas
            }
          };
        }

        case 4: {
          const { data: section4, error } = await supabase
            .from('section4_responses')
            .select('*')
            .eq('project_id', project.id)
            .limit(1);

          if (error) throw error;
          if (!section4 || section4.length === 0) return null;

          const section4Data = section4[0];

          return {
            etape1_voit: section4Data.etape1_voit,
            etape1_fait: section4Data.etape1_fait,
            journeySteps: section4Data.journey_steps,
            resultat_final: section4Data.resultat_final,
            ton_plateforme: section4Data.ton_plateforme,
            ton_autre: section4Data.ton_autre,
            ambiance_keywords: section4Data.ambiance_keywords,
            specificites_locales: section4Data.specificites_locales,
            langues: section4Data.langues,
            autres_specificites: section4Data.autres_specificites
          };
        }

        case 5: {
          const { data: section5, error } = await supabase
            .from('section5_responses')
            .select('*')
            .eq('project_id', project.id)
            .limit(1);

          if (error) throw error;
          if (!section5 || section5.length === 0) return null;

          const section5Data = section5[0];

          return {
            sources_revenus: section5Data.sources_revenus,
            autre_source_revenus: section5Data.autre_source_revenus,
            philosophie_tarifaire: section5Data.philosophie_tarifaire,
            budget_moyen_cible: section5Data.budget_moyen_cible,
            utilisateurs_payants_12mois: section5Data.utilisateurs_payants_12mois,
            revenu_mensuel_12mois: section5Data.revenu_mensuel_12mois,
            strategie_croissance: section5Data.strategie_croissance
          };
        }

        case 6: {
          const { data: section6, error } = await supabase
            .from('section6_responses')
            .select('*')
            .eq('project_id', project.id)
            .limit(1);

          if (error) throw error;
          if (!section6 || section6.length === 0) return null;

          const section6Data = section6[0];

          return {
            mvp_features: section6Data.mvp_features,
            mvp_custom_0: section6Data.mvp_custom_0,
            mvp_custom_1: section6Data.mvp_custom_1,
            mvp_custom_2: section6Data.mvp_custom_2,
            mvp_rationale: section6Data.mvp_rationale,
            phases: section6Data.phases,
            launch_contents: section6Data.launch_contents,
            content_creators: section6Data.content_creators,
            other_content_creator: section6Data.other_content_creator
          };
        }

        case 7: {
          const { data: section7, error } = await supabase
            .from('section7_responses')
            .select('*')
            .eq('project_id', project.id)
            .limit(1);

          if (error) throw error;
          if (!section7 || section7.length === 0) return null;

          const section7Data = section7[0];

          return {
            budget_range: section7Data.budget_range,
            budget_allocation: section7Data.budget_allocation,
            timeline: section7Data.timeline,
            deadline_date: section7Data.deadline_date,
            deadline_reason: section7Data.deadline_reason,
            team_size: section7Data.team_size,
            team_size_details: section7Data.team_size_details,
            internal_skills: section7Data.internal_skills,
            other_internal_skills: section7Data.other_internal_skills,
            external_skills: section7Data.external_skills,
            other_external_skills: section7Data.other_external_skills,
            technical_constraints: section7Data.technical_constraints,
            other_constraints: section7Data.other_constraints
          };
        }

        case 8: {
          const { data: section8, error } = await supabase
            .from('section8_responses')
            .select('*')
            .eq('project_id', project.id)
            .limit(1);

          if (error) throw error;
          if (!section8 || section8.length === 0) return null;

          const section8Data = section8[0];

          return {
            kpis: section8Data.kpis,
            other_kpi_name: section8Data.other_kpi_name,
            other_kpi_target: section8Data.other_kpi_target,
            validation_methods: section8Data.validation_methods,
            other_validation: section8Data.other_validation,
            kpi_frequency: section8Data.kpi_frequency,
            kpi_responsible: section8Data.kpi_responsible,
            alert_completion_rate: section8Data.alert_completion_rate,
            alert_retention_rate: section8Data.alert_retention_rate,
            alert_satisfaction_score: section8Data.alert_satisfaction_score
          };
        }
        
        case 9: {
	  const { data: section9, error } = await supabase
	    .from('section9_responses')
	    .select('*')
	    .eq('project_id', project.id)
	    .limit(1);

	  if (error) throw error;
	  if (!section9 || section9.length === 0) return null;

	  const section9Data = section9[0];

	  return {
	    logo_status: section9Data.logo_status,
	    logo_file: section9Data.logo_file,
	    logo_url: section9Data.logo_url,
	    colors: section9Data.colors,
	    fonts: section9Data.fonts,
	    brand_guide_url: section9Data.brand_guide_url,
	    design_style: section9Data.design_style,
	    design_style_other: section9Data.design_style_other,
	    preferred_colors: section9Data.preferred_colors,
	    visual_references: section9Data.visual_references
	  };
	}
	
	case 10: {
	  const { data: section10, error } = await supabase
	    .from('section10_responses')
	    .select('*')
	    .eq('project_id', project.id)
	    .limit(1);

	  if (error) throw error;
	  if (!section10 || section10.length === 0) return null;

	  const section10Data = section10[0];

	  return {
	    supports: section10Data.supports,
	    other_support: section10Data.other_support,
	    support_priorities: section10Data.support_priorities,
	    integrations: section10Data.integrations,
	    other_integration: section10Data.other_integration,
	    tech_preferences: section10Data.tech_preferences,
	    scalability_needs: section10Data.scalability_needs,
	    performance_requirements: section10Data.performance_requirements
	  };
	}
	
	case 11: {
	  const { data: section11, error } = await supabase
	    .from('section11_responses')
	    .select('*')
	    .eq('project_id', project.id)
	    .limit(1);

	  if (error) throw error;
	  if (!section11 || section11.length === 0) return null;

	  const section11Data = section11[0];

	  return {
	    partners: section11Data.partners,
	    target_partnerships: section11Data.target_partnerships,
	    partnership_approach: section11Data.partnership_approach,
	    partnership_value: section11Data.partnership_value,
	    partnership_target_12m: section11Data.partnership_target_12m
	  };
	}
	
	case 12: {
	  const { data: section12, error } = await supabase
	    .from('section12_responses')
	    .select('*')
	    .eq('project_id', project.id)
	    .limit(1);

	  if (error) throw error;
	  if (!section12 || section12.length === 0) return null;

	  const section12Data = section12[0];

	  return {
	    legal_status: section12Data.legal_status,
	    legal_status_other: section12Data.legal_status_other,
	    company_name: section12Data.company_name,
	    registration_number: section12Data.registration_number,
	    creation_date: section12Data.creation_date,
	    headquarters: section12Data.headquarters,
	    legal_aspects: section12Data.legal_aspects,
	    legal_aspect_notes: section12Data.legal_aspect_notes,
	    other_legal_aspects: section12Data.other_legal_aspects,
	    legal_assistance: section12Data.legal_assistance,
	    legal_assistance_needs: section12Data.legal_assistance_needs,
	    legal_counsel_name: section12Data.legal_counsel_name,
	    data_hosting: section12Data.data_hosting,
	    security_measures: section12Data.security_measures,
	    other_security_measures: section12Data.other_security_measures
	  };
	}
	
	case 13: {
          const { data: section13, error } = await supabase
            .from('section13_responses')
            .select('*')
            .eq('project_id', project.id)
            .limit(1);

          if (error) throw error;
          if (!section13 || section13.length === 0) return null;

          const section13Data = section13[0];

          return {
            // 13.1
            formations_par_an: section13Data.formations_par_an,
            formation_frequency: section13Data.formation_frequency,
            formation_frequency_other: section13Data.formation_frequency_other,
            formation_formats: section13Data.formation_formats,
            formation_format_other: section13Data.formation_format_other,
            // 13.2
            thematiques_couvertes: section13Data.thematiques_couvertes,
            autre_thematique: section13Data.autre_thematique,
            contenus_digitalisables: section13Data.contenus_digitalisables,
            etat_contenus: section13Data.etat_contenus,
            etat_contenus_precision: section13Data.etat_contenus_precision,
            // 13.3
            apprenants_total: section13Data.apprenants_total,
            apprenants_12mois: section13Data.apprenants_12mois,
            base_donnees: section13Data.base_donnees,
            infos_disponibles: section13Data.infos_disponibles,
            autres_infos_disponibles: section13Data.autres_infos_disponibles,
            contact_alumni: section13Data.contact_alumni,
            // 13.4
            taux_insertion: section13Data.taux_insertion,
            success_stories: section13Data.success_stories,
            success_stories_exemples: section13Data.success_stories_exemples,
            // 13.5
            formateurs_permanents: section13Data.formateurs_permanents,
            formateurs_vacataires: section13Data.formateurs_vacataires,
            formateurs_externes: section13Data.formateurs_externes,
            profil_formateurs: section13Data.profil_formateurs,
            formateurs_digital: section13Data.formateurs_digital,
            formateurs_digital_nombre: section13Data.formateurs_digital_nombre,
            // 13.6
            partenaires_entreprises: section13Data.partenaires_entreprises,
            partenaires_entreprises_nombre: section13Data.partenaires_entreprises_nombre,
            partenaires_entreprises_liste: section13Data.partenaires_entreprises_liste,
            partenaires_certification: section13Data.partenaires_certification,
            partenaires_certification_details: section13Data.partenaires_certification_details,
            partenaires_centres: section13Data.partenaires_centres,
            partenaires_centres_details: section13Data.partenaires_centres_details,
            partenaires_publics: section13Data.partenaires_publics,
            partenaires_publics_autre: section13Data.partenaires_publics_autre,
            aucun_partenariat_public: section13Data.aucun_partenariat_public,
            partenaires_bailleurs: section13Data.partenaires_bailleurs,
            partenaires_bailleurs_details: section13Data.partenaires_bailleurs_details,
            // 13.7
            relation_plateforme: section13Data.relation_plateforme,
            relation_plateforme_autre: section13Data.relation_plateforme_autre,
            nom_plateforme: section13Data.nom_plateforme,
            nom_plateforme_nouveau: section13Data.nom_plateforme_nouveau,
            gouvernance: section13Data.gouvernance,
            gouvernance_equipe_taille: section13Data.gouvernance_equipe_taille,
            // 13.8
            forces_cifop: section13Data.forces_cifop,
            forces_cifop_autre: section13Data.forces_cifop_autre,
            amplification_forces: section13Data.amplification_forces,
            matrice_forces: section13Data.matrice_forces,
            // 13.9
            motivations_digitalisation: section13Data.motivations_digitalisation,
            motivation_autre: section13Data.motivation_autre,
            metrique_prioritaire: section13Data.metrique_prioritaire,
            metrique_objectif: section13Data.metrique_objectif,
            metrique_autre: section13Data.metrique_autre,
            // 13.10
            strategie_transition: section13Data.strategie_transition,
            strategie_transition_autre: section13Data.strategie_transition_autre,
            masterclass_digital: section13Data.masterclass_digital,
            masterclass_digital_autre: section13Data.masterclass_digital_autre,
            presentiel_focus: section13Data.presentiel_focus,
            presentiel_focus_autre: section13Data.presentiel_focus_autre
          };
        }
	
        case 14: {
          const { data: section14, error } = await supabase
            .from('section14_responses')
            .select('*')
            .eq('project_id', project.id)
            .limit(1);

          if (error) throw error;
          if (!section14 || section14.length === 0) return null;

          const section14Data = section14[0];

          return {
            evaluations: section14Data.evaluations,
            concerns: section14Data.concerns,
            enthusiasm: section14Data.enthusiasm,
            missing: section14Data.missing
          };
        }

        default:
          return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
      return null;
    }
  };

  return {
    project,
    loading,
    error,
    saveSection1,
    saveSection2,
    saveSection3,
    saveSection4,
    saveSection5,
    saveSection6,
    saveSection7,
    saveSection8,
    saveSection9,
    saveSection10,
    saveSection11,
    saveSection12,
    saveSection13,
    saveSection14,
    loadSectionData
  };
}
