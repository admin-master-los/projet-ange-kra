import React from 'react';
import { SectionProps, Section1Data, Persona, SuccessMetric } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

const AVAILABLE_TARGETS = [
  'Nouveaux bacheliers (cherchent orientation avant université)',
  'Étudiants en cursus (cherchent réorientation ou complément de formation)',
  'Jeunes diplômés sans emploi (cherchent insertion professionnelle)',
  'Demandeurs d\'emploi expérimentés (reconversion professionnelle)',
  'Professionnels en activité (montée en compétences)',
  'Entreprises (formation de leurs employés)'
];

const SUCCESS_METRICS = [
  { type: 'utilisateurs_inscrits', label: 'utilisateurs inscrits' },
  { type: 'formations_completees', label: 'formations complétées' },
  { type: 'emplois_trouves', label: 'personnes ayant trouvé un emploi/stage grâce à la plateforme' },
  { type: 'revenus_fcfa', label: 'FCFA de revenus générés' },
  { type: 'partenariats', label: 'partenariats avec entreprises' },
  { type: 'satisfaction', label: 'taux de satisfaction utilisateurs (sur 10)' }
];

const Section1: React.FC<SectionProps> = ({ data = {}, onUpdate }) => {
  const handleProblemChange = (value: string) => {
    onUpdate({ ...data, problemDescription: value });
  };

  const handleTargetChange = (target: string, checked: boolean) => {
    const currentTargets = data.targets || [];
    const newTargets = checked 
      ? [...currentTargets, target]
      : currentTargets.filter((t: string) => t !== target);
    onUpdate({ ...data, targets: newTargets });
  };

  const handlePersonaChange = (index: number, field: keyof Persona, value: string) => {
    const personas = [...(data.personas || [])];
    if (!personas[index]) personas[index] = {} as Persona;
    personas[index] = { ...personas[index], [field]: value };
    onUpdate({ ...data, personas });
  };

  const addPersona = () => {
    const personas = [...(data.personas || [])];
    personas.push({ name: '', age: '', currentSituation: '', problem: '', seeking: '' });
    onUpdate({ ...data, personas });
  };

  const removePersona = (index: number) => {
    const personas = [...(data.personas || [])];
    personas.splice(index, 1);
    onUpdate({ ...data, personas });
  };

  const handleSuccessMetricChange = (type: string, field: 'value' | 'checked', newValue: string | boolean) => {
    const successMetrics = [...(data.successMetrics || [])];
    const existingIndex = successMetrics.findIndex((m: SuccessMetric) => m.type === type);
    
    if (existingIndex >= 0) {
      successMetrics[existingIndex] = { ...successMetrics[existingIndex], [field]: newValue };
    } else {
      successMetrics.push({ type, [field]: newValue, checked: field === 'checked' ? newValue : false, value: field === 'value' ? newValue : '' } as SuccessMetric);
    }
    
    onUpdate({ ...data, successMetrics });
  };

  return (
    <div className="space-y-8">
      {/* 1.1 Le Problème à Résoudre */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">1.1 Le Problème à Résoudre</h3>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Décrivez en 2-3 phrases simples LE problème principal que vous voulez résoudre :
          </label>
          <textarea
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            placeholder='Exemple : "Les jeunes diplômés ne savent pas quel métier choisir et manquent de formations adaptées au marché ivoirien"'
            value={data.problemDescription || ''}
            onChange={(e) => handleProblemChange(e.target.value)}
          />
        </div>
      </div>

      {/* 1.2 Pour Qui ? (Vos Cibles) */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">1.2 Pour Qui ? (Vos Cibles)</h3>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Cochez TOUTES les cibles que vous visez :
          </label>
          <div className="space-y-3">
            {AVAILABLE_TARGETS.map((target) => (
              <label key={target} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  checked={(data.targets || []).includes(target)}
                  onChange={(e) => handleTargetChange(target, e.target.checked)}
                />
                <span className="text-sm text-slate-700 leading-5">{target}</span>
              </label>
            ))}
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Autres :</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Précisez d'autres cibles..."
              value={data.otherTarget || ''}
              onChange={(e) => onUpdate({ ...data, otherTarget: e.target.value })}
            />
          </div>
        </div>

        {/* Personas */}
        {(data.targets || []).length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-slate-700">
                Pour CHAQUE cible cochée, décrivez un persona concret :
              </label>
              <button
                onClick={addPersona}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Ajouter Persona</span>
              </button>
            </div>

            {(data.personas || []).map((persona: Persona, index: number) => (
              <div key={index} className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-slate-900">Persona {index + 1} :</h4>
                  <button
                    onClick={() => removePersona(index)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nom fictif :</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={persona.name || ''}
                      onChange={(e) => handlePersonaChange(index, 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Âge :</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={persona.age || ''}
                      onChange={(e) => handlePersonaChange(index, 'age', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Situation actuelle :</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={persona.currentSituation || ''}
                      onChange={(e) => handlePersonaChange(index, 'currentSituation', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Son problème :</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={persona.problem || ''}
                      onChange={(e) => handlePersonaChange(index, 'problem', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ce qu'il cherche :</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={persona.seeking || ''}
                      onChange={(e) => handlePersonaChange(index, 'seeking', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 1.3 Succès dans 1 an */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">1.3 Succès dans 1 an</h3>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Comment saurez-vous que votre plateforme a réussi dans 1 an ?<br />
            Cochez vos indicateurs de succès :
          </label>
          <div className="space-y-4">
            {SUCCESS_METRICS.map((metric) => {
              const currentMetric = (data.successMetrics || []).find((m: SuccessMetric) => m.type === metric.type);
              return (
                <div key={metric.type} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    checked={currentMetric?.checked || false}
                    onChange={(e) => handleSuccessMetricChange(metric.type, 'checked', e.target.checked)}
                  />
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Objectif chiffré"
                    value={currentMetric?.value || ''}
                    onChange={(e) => handleSuccessMetricChange(metric.type, 'value', e.target.value)}
                  />
                  <span className="text-sm text-slate-700 min-w-0 flex-shrink">{metric.label}</span>
                </div>
              );
            })}
            
            <div className="flex items-center space-x-3">
              <label className="text-sm text-slate-700">Autre :</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Précisez un autre indicateur de succès..."
                value={data.otherSuccessMetric || ''}
                onChange={(e) => onUpdate({ ...data, otherSuccessMetric: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;