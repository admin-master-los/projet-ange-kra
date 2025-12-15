import React from 'react';
import { SectionProps } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

const TON_OPTIONS = [
  'Professionnel et sérieux (type LinkedIn)',
  'Amical et encourageant (type Duolingo)',
  'Inspirant et motivant (type TED)',
  'Festif et dynamique (type FESCUI)',
  'Éducatif et académique (type Coursera)'
];

const SPECIFICITES_LOCALES = [
  { key: 'contenus_adaptes', label: 'Contenus adaptés au contexte ivoirien/africain' },
  { key: 'metiers_tension', label: 'Métiers en tension localement mis en avant' },
  { key: 'partenariats_locaux', label: 'Partenariats avec entreprises locales' },
  { key: 'mobile_prioritaire', label: 'Accessibilité mobile prioritaire (beaucoup d\'utilisateurs mobile)' },
  { key: 'faible_connexion', label: 'Faible connexion internet (optimisation légèreté)' },
  { key: 'paiement_mobile', label: 'Paiement mobile money (Orange Money, MTN, Moov)' }
];

interface JourneyStep {
  step: string;
  description: string;
  action: string;
}

const Section4: React.FC<SectionProps> = ({ data = {}, onUpdate }) => {
  const handleJourneyStepChange = (index: number, field: keyof JourneyStep, value: string) => {
    const steps = [...(data.journeySteps || [])];
    if (!steps[index]) {
      steps[index] = { step: '', description: '', action: '' };
    }
    steps[index] = { ...steps[index], [field]: value };
    onUpdate({ ...data, journeySteps: steps });
  };

  const addJourneyStep = () => {
    const steps = [...(data.journeySteps || [])];
    steps.push({ step: '', description: '', action: '' });
    onUpdate({ ...data, journeySteps: steps });
  };

  const removeJourneyStep = (index: number) => {
    const steps = [...(data.journeySteps || [])];
    steps.splice(index, 1);
    onUpdate({ ...data, journeySteps: steps });
  };

  const handleKeywordChange = (index: number, value: string) => {
    const keywords = [...(data.ambiance_keywords || ['', '', '', '', ''])];
    keywords[index] = value;
    onUpdate({ ...data, ambiance_keywords: keywords });
  };

  const handleSpecificiteChange = (key: string, checked: boolean) => {
    const specificites = { ...(data.specificites_locales || {}) };
    specificites[key] = checked;
    onUpdate({ ...data, specificites_locales: specificites });
  };

  return (
    <div className="space-y-8">
      {/* 4.1 Parcours Utilisateur Principal */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">4.1 Parcours Utilisateur Principal</h3>
        <p className="text-sm text-slate-600">
          Décrivez le parcours idéal d'un utilisateur du début à la fin
        </p>

        {/* Étape 1 - Arrivée */}
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <h4 className="font-medium text-slate-900 mb-4">Étape 1 : L'utilisateur arrive sur la plateforme</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Que voit-il en premier ?
              </label>
              <textarea
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={2}
                placeholder="Exemple : Une page d'accueil avec un test d'orientation en évidence"
                value={data.etape1_voit || ''}
                onChange={(e) => onUpdate({ ...data, etape1_voit: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Que fait-il ?
              </label>
              <textarea
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={2}
                placeholder="Exemple : Il clique sur 'Commencer le test d'orientation'"
                value={data.etape1_fait || ''}
                onChange={(e) => onUpdate({ ...data, etape1_fait: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Étapes intermédiaires */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">
              Étapes suivantes du parcours utilisateur :
            </label>
            <button
              onClick={addJourneyStep}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Ajouter une étape</span>
            </button>
          </div>

          {(data.journeySteps || []).map((step: JourneyStep, index: number) => (
            <div key={index} className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-slate-900">Étape {index + 2}</h4>
                <button
                  onClick={() => removeJourneyStep(index)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Titre de l'étape :
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Exemple : Il répond au questionnaire"
                    value={step.step || ''}
                    onChange={(e) => handleJourneyStepChange(index, 'step', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description :
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={2}
                    placeholder="Que se passe-t-il à cette étape ?"
                    value={step.description || ''}
                    onChange={(e) => handleJourneyStepChange(index, 'description', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Action de l'utilisateur :
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Que fait l'utilisateur ?"
                    value={step.action || ''}
                    onChange={(e) => handleJourneyStepChange(index, 'action', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Résultat final */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h4 className="font-medium text-green-900 mb-4">
            Étape Finale : RÉSULTAT ESPÉRÉ
          </h4>
          <div>
            <label className="block text-sm font-medium text-green-800 mb-2">
              Quel est le résultat final espéré pour l'utilisateur ?
            </label>
            <textarea
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Exemple : Il a un plan de carrière clair, des formations recommandées et commence sa première formation"
              value={data.resultat_final || ''}
              onChange={(e) => onUpdate({ ...data, resultat_final: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* 4.2 Ton & Ambiance */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">4.2 Ton & Ambiance</h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Quel ton voulez-vous pour votre plateforme ?
          </label>
          <div className="space-y-3">
            {TON_OPTIONS.map((ton) => (
              <label key={ton} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="ton"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.ton_plateforme === ton}
                  onChange={() => onUpdate({ ...data, ton_plateforme: ton })}
                />
                <span className="text-sm text-slate-700 leading-5">{ton}</span>
              </label>
            ))}
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="ton"
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                checked={data.ton_plateforme === 'Autre'}
                onChange={() => onUpdate({ ...data, ton_plateforme: 'Autre' })}
              />
              <div className="flex-1">
                <span className="text-sm text-slate-700">Autre :</span>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Précisez..."
                  value={data.ton_autre || ''}
                  onChange={(e) => onUpdate({ ...data, ton_autre: e.target.value })}
                  disabled={data.ton_plateforme !== 'Autre'}
                />
              </div>
            </label>
          </div>
        </div>

        {/* Mots-clés ambiance */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Mots-clés qui décrivent l'ambiance souhaitée :
          </label>
          <p className="text-xs text-slate-500 mb-3">
            Exemples : moderne, chaleureux, innovant, accessible, premium, etc.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index}>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Mot-clé {index + 1} :
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`Mot-clé ${index + 1}`}
                  value={(data.ambiance_keywords || [])[index] || ''}
                  onChange={(e) => handleKeywordChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4.3 Contexte Local */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">4.3 Contexte Local</h3>
        <p className="text-sm text-slate-600">
          Spécificités Côte d'Ivoire / Afrique
        </p>

        <div className="space-y-3">
          {SPECIFICITES_LOCALES.map((spec) => (
            <label key={spec.key} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                checked={(data.specificites_locales || {})[spec.key] || false}
                onChange={(e) => handleSpecificiteChange(spec.key, e.target.checked)}
              />
              <span className="text-sm text-slate-700 leading-5">{spec.label}</span>
            </label>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Langues :
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Exemple : Français uniquement"
              value={data.langues || ''}
              onChange={(e) => onUpdate({ ...data, langues: e.target.value })}
            />
            <p className="text-xs text-slate-500 mt-1">
              Français uniquement ou multilingue ?
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Autres spécificités locales à prendre en compte :
          </label>
          <textarea
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            placeholder="Décrivez d'autres aspects spécifiques au contexte ivoirien/africain..."
            value={data.autres_specificites || ''}
            onChange={(e) => onUpdate({ ...data, autres_specificites: e.target.value })}
          />
        </div>
      </div>

      {/* Résumé visuel */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-4">📊 Résumé de l'Expérience Utilisateur</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 font-medium min-w-[140px]">Parcours :</span>
            <span className="text-blue-800">
              {(data.journeySteps || []).length + 2} étapes définies
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 font-medium min-w-[140px]">Ton :</span>
            <span className="text-blue-800">
              {data.ton_plateforme || 'Non défini'}
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 font-medium min-w-[140px]">Ambiance :</span>
            <span className="text-blue-800">
              {(data.ambiance_keywords || []).filter((k: string) => k).join(', ') || 'Non définie'}
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 font-medium min-w-[140px]">Spécificités locales :</span>
            <span className="text-blue-800">
              {Object.values(data.specificites_locales || {}).filter(Boolean).length} activées
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section4;
