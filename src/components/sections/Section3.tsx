import React from 'react';
import { SectionProps } from '../../types';

const MODULE_A_FEATURES = [
  { 
    key: 'test_orientation', 
    label: 'Test d\'orientation (questionnaire personnalité/intérêts)', 
    detail: 'Type de test souhaité' 
  },
  { 
    key: 'fiches_metiers', 
    label: 'Fiches métiers détaillées (description, compétences, salaires)', 
    detail: 'Nombre de métiers' 
  },
  { 
    key: 'visualisation_debouches', 
    label: 'Visualisation des débouchés par métier', 
    detail: 'Source des données débouchés' 
  },
  { 
    key: 'recommandations', 
    label: 'Recommandations de métiers basées sur le profil', 
    detail: 'Algorithme simple ou IA ?' 
  },
  { 
    key: 'témoignages', 
    label: 'Témoignages de professionnels en poste', 
    detail: 'Vidéos ou textes ?' 
  }
];

const Section3: React.FC<SectionProps> = ({ data = {}, onUpdate }) => {
  const handleFeaturePriorityChange = (moduleKey: string, featureKey: string, priority: string) => {
    const moduleData = { ...data[moduleKey] };
    if (!moduleData.features) moduleData.features = {};
    moduleData.features[featureKey] = { ...moduleData.features[featureKey], priority };
    onUpdate({ ...data, [moduleKey]: moduleData });
  };

  const handleFeatureDetailChange = (moduleKey: string, featureKey: string, detail: string) => {
    const moduleData = { ...data[moduleKey] };
    if (!moduleData.features) moduleData.features = {};
    moduleData.features[featureKey] = { ...moduleData.features[featureKey], detail };
    onUpdate({ ...data, [moduleKey]: moduleData });
  };

  const handleOtherFeaturesChange = (moduleKey: string, value: string) => {
    const moduleData = { ...data[moduleKey] };
    moduleData.otherFeatures = value;
    onUpdate({ ...data, [moduleKey]: moduleData });
  };

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Légende de priorité :</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li><strong>P1</strong> = Indispensable dès le lancement (MVP)</li>
          <li><strong>P2</strong> = Important mais peut attendre 3-6 mois</li>
          <li><strong>P3</strong> = Nice to have, pas urgent</li>
        </ul>
      </div>

      {/* MODULE A : Orientation Professionnelle */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">MODULE A : Orientation Professionnelle</h3>
          <p className="text-sm text-slate-600 mt-1">Aider l'utilisateur à identifier les métiers qui lui correspondent</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-slate-200 rounded-lg">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-700 border-b border-slate-200">
                  Fonctionnalité
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-700 border-b border-slate-200">
                  Priorité
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-700 border-b border-slate-200">
                  Détails supplémentaires
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {MODULE_A_FEATURES.map((feature, index) => {
                const featureData = data.moduleA?.features?.[feature.key] || {};
                return (
                  <tr key={feature.key} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {feature.label}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        className="w-20 px-2 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        value={featureData.priority || ''}
                        onChange={(e) => handleFeaturePriorityChange('moduleA', feature.key, e.target.value)}
                      >
                        <option value="">P__</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder={feature.detail}
                        value={featureData.detail || ''}
                        onChange={(e) => handleFeatureDetailChange('moduleA', feature.key, e.target.value)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Autres fonctionnalités d'orientation que vous imaginez :
          </label>
          <textarea
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Décrivez d'autres fonctionnalités pour l'orientation professionnelle..."
            value={data.moduleA?.otherFeatures || ''}
            onChange={(e) => handleOtherFeaturesChange('moduleA', e.target.value)}
          />
        </div>
      </div>

      {/* MODULE B : Formation & E-Learning - Structure de base */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">MODULE B : Formation & E-Learning</h3>
          <p className="text-sm text-slate-600 mt-1">Proposer des formations pour acquérir des compétences</p>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>En développement :</strong> Cette section sera complétée dans la prochaine itération avec toutes les fonctionnalités de formation (catalogue, vidéos, quizz, certificats, etc.)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Vos idées principales pour le module Formation :
          </label>
          <textarea
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            placeholder="Décrivez vos attentes pour le module de formation en ligne..."
            value={data.moduleB?.ideas || ''}
            onChange={(e) => onUpdate({ ...data, moduleB: { ...data.moduleB, ideas: e.target.value } })}
          />
        </div>
      </div>

      {/* Information sur les modules suivants */}
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <h4 className="font-medium text-slate-900 mb-3">Modules à venir :</h4>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• <strong>MODULE C :</strong> Création de CV Intelligente</li>
          <li>• <strong>MODULE D :</strong> Débouchés & Insertion Professionnelle</li>
          <li>• <strong>MODULE E :</strong> Profil & Tableau de Bord Utilisateur</li>
          <li>• <strong>MODULE F :</strong> Gamification & Engagement</li>
          <li>• <strong>MODULE G :</strong> Administration & Gestion</li>
        </ul>
        <p className="text-xs text-slate-500 mt-4">
          Ces modules seront détaillés dans les versions suivantes de l'application.
        </p>
      </div>
    </div>
  );
};

export default Section3;