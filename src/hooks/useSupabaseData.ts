// src/hooks/useSupabaseData.ts - VERSION MISE À JOUR
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

  // Section 3 - Modules & Fonctionnalités (MISE À JOUR COMPLÈTE)
  const saveSection3 = async (data: any) => {
    if (!project) return;

    try {
      const { data: section3, error } = await supabase
        .from('section3_responses')
        .upsert({
          project_id: project.id,
          // Module A
          module_a_features: data.moduleA?.features || {},
          module_a_other_features: data.moduleA?.otherFeatures || '',
          // Module B
          module_b_features: data.moduleB?.features || {},
          module_b_sources: data.moduleB?.sources || [],
          module_b_launch_formations: data.moduleB?.launchFormations || '',
          module_b_avg_duration: data.moduleB?.avgDuration || '',
          module_b_pricing_model: data.moduleB?.pricingModel || '',
          // Module C
          module_c_features: data.moduleC?.features || {},
          module_c_cvboost_inspiration: data.moduleC?.cvboostInspiration || '',
          // Module D
          module_d_features: data.moduleD?.features || {},
          module_d_partnerships: data.moduleD?.partnerships || '',
          module_d_partner_count: data.moduleD?.partnerCount || '',
          // Module E
          module_e_features: data.moduleE?.features || {},
          // Module F
          module_f_features: data.moduleF?.features || {},
          module_f_gamification_level: data.moduleF?.gamificationLevel || '',
          // Module G
          module_g_features: data.moduleG?.features || {},
          // Fonctionnalités supplémentaires
          additional_features: data.additionalFeatures || ''
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
              features: section3Data.module_b_features,
              sources: section3Data.module_b_sources,
              launchFormations: section3Data.module_b_launch_formations,
              avgDuration: section3Data.module_b_avg_duration,
              pricingModel: section3Data.module_b_pricing_model
            },
            moduleC: {
              features: section3Data.module_c_features,
              cvboostInspiration: section3Data.module_c_cvboost_inspiration
            },
            moduleD: {
              features: section3Data.module_d_features,
              partnerships: section3Data.module_d_partnerships,
              partnerCount: section3Data.module_d_partner_count
            },
            moduleE: {
              features: section3Data.module_e_features
            },
            moduleF: {
              features: section3Data.module_f_features,
              gamificationLevel: section3Data.module_f_gamification_level
            },
            moduleG: {
              features: section3Data.module_g_features
            },
            additionalFeatures: section3Data.additional_features
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
    saveSection14,
    loadSectionData
  };
}
