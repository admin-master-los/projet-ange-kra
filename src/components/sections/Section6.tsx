import React from 'react';

interface Section6Props {
  data?: any;
  onUpdate: (data: any) => void;
}

const MVP_FEATURES_LIST = [
  'Test d\'orientation professionnelle',
  'Catalogue de formations',
  'Création de CV intelligente',
  'Profil utilisateur',
  'Tableau de bord apprenant',
  'Offres d\'emploi/stages',
  'Fiches métiers détaillées',
  'Certificats de formation',
  'Système de paiement',
  'Espace formateur'
];

const Section6: React.FC<Section6Props> = ({ data = {}, onUpdate }) => {
  const handleMVPFeatureChange = (index: number, value: string) => {
    const features = [...(data.mvp_features || ['', '', ''])];
    features[index] = value;
    onUpdate({ ...data, mvp_features: features });
  };

  const handlePhaseChange = (phase: string, field: string, value: string) => {
    const phases = { ...data.phases };
    if (!phases[phase]) phases[phase] = {};
    phases[phase][field] = value;
    onUpdate({ ...data, phases });
  };

  const handleContentChange = (type: string, value: string) => {
    const contents = { ...data.launch_contents };
    contents[type] = value;
    onUpdate({ ...data, launch_contents: contents });
  };

  const handleCreatorChange = (creator: string, checked: boolean) => {
    const creators = data.content_creators || [];
    const newCreators = checked 
      ? [...creators, creator]
      : creators.filter((c: string) => c !== creator);
    onUpdate({ ...data, content_creators: newCreators });
  };

  return (
    <div className="space-y-8">
      {/* 6.1 MVP */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          6.1 MVP (Minimum Viable Product)
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Si vous deviez lancer avec SEULEMENT 3 fonctionnalités, lesquelles ?
          </label>
          <p className="text-xs text-slate-500 mb-4">
            Sélectionnez ou saisissez les 3 fonctionnalités absolument critiques pour le lancement
          </p>

          <div className="space-y-4">
            {[0, 1, 2].map((index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Fonctionnalité {index + 1} :
                </label>
                <div className="flex items-center space-x-3">
                  <select
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={data.mvp_features?.[index] || ''}
                    onChange={(e) => handleMVPFeatureChange(index, e.target.value)}
                  >
                    <option value="">Sélectionnez une fonctionnalité</option>
                    {MVP_FEATURES_LIST.map((feature) => (
                      <option key={feature} value={feature}>{feature}</option>
                    ))}
                    <option value="custom">Autre (à préciser)</option>
                  </select>
                </div>
                {data.mvp_features?.[index] === 'custom' && (
                  <input
                    type="text"
                    className="w-full mt-2 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Précisez la fonctionnalité..."
                    value={data[`mvp_custom_${index}`] || ''}
                    onChange={(e) => onUpdate({ ...data, [`mvp_custom_${index}`]: e.target.value })}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Pourquoi ces 3 ? Qu'est-ce qui est absolument critique ?
          </label>
          <textarea
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            placeholder="Expliquez pourquoi ces fonctionnalités sont indispensables pour le lancement..."
            value={data.mvp_rationale || ''}
            onChange={(e) => onUpdate({ ...data, mvp_rationale: e.target.value })}
          />
        </div>
      </div>

      {/* 6.2 Phasage du Projet */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">6.2 Phasage du Projet</h3>

        {/* Version 1 - MVP */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-4">
            Version 1 (MVP - 0-3 mois)
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-2">
                Fonctionnalités incluses :
              </label>
              <textarea
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Listez toutes les fonctionnalités de la version 1..."
                value={data.phases?.v1?.features || ''}
                onChange={(e) => handlePhaseChange('v1', 'features', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-2">
                Nombre d'utilisateurs cibles :
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: 100"
                value={data.phases?.v1?.target_users || ''}
                onChange={(e) => handlePhaseChange('v1', 'target_users', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Version 2 */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-900 mb-4">
            Version 2 (3-6 mois)
          </h4>
          
          <div>
            <label className="block text-sm font-medium text-green-800 mb-2">
              Ajouts prévus :
            </label>
            <textarea
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Quelles fonctionnalités seront ajoutées dans la version 2 ?"
              value={data.phases?.v2?.additions || ''}
              onChange={(e) => handlePhaseChange('v2', 'additions', e.target.value)}
            />
          </div>
        </div>

        {/* Version 3 */}
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-4">
            Version 3 (6-12 mois)
          </h4>
          
          <div>
            <label className="block text-sm font-medium text-purple-800 mb-2">
              Ajouts prévus :
            </label>
            <textarea
              className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Quelles fonctionnalités seront ajoutées dans la version 3 ?"
              value={data.phases?.v3?.additions || ''}
              onChange={(e) => handlePhaseChange('v3', 'additions', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 6.3 Contenus au Lancement */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">6.3 Contenus au Lancement</h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Combien de contenus prêts au lancement ?
          </label>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Fiches métiers :
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nombre"
                value={data.launch_contents?.fiches_metiers || ''}
                onChange={(e) => handleContentChange('fiches_metiers', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Formations complètes :
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nombre"
                value={data.launch_contents?.formations || ''}
                onChange={(e) => handleContentChange('formations', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Heures de vidéos :
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nombre d'heures"
                value={data.launch_contents?.heures_videos || ''}
                onChange={(e) => handleContentChange('heures_videos', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Offres d'emploi/stages :
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nombre"
                value={data.launch_contents?.offres_emploi || ''}
                onChange={(e) => handleContentChange('offres_emploi', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Témoignages professionnels :
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nombre"
                value={data.launch_contents?.temoignages || ''}
                onChange={(e) => handleContentChange('temoignages', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Qui crée ces contenus ?
          </label>
          <div className="space-y-2">
            {[
              'Moi-même',
              'Mon équipe',
              'Prestataires externes',
              'Partenaires',
              'Contenus agrégés existants'
            ].map((creator) => (
              <label key={creator} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  checked={(data.content_creators || []).includes(creator)}
                  onChange={(e) => handleCreatorChange(creator, e.target.checked)}
                />
                <span className="text-sm text-slate-700 leading-5">{creator}</span>
              </label>
            ))}
          </div>

          <div className="mt-3">
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Autre créateur de contenus..."
              value={data.other_content_creator || ''}
              onChange={(e) => onUpdate({ ...data, other_content_creator: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Résumé */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-4">🚀 Résumé du Lancement</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 font-medium min-w-[160px]">MVP :</span>
            <span className="text-blue-800">
              {data.mvp_features?.filter((f: string) => f).length || 0} fonctionnalités critiques
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 font-medium min-w-[160px]">Phases :</span>
            <span className="text-blue-800">
              3 versions planifiées sur 12 mois
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 font-medium min-w-[160px]">Contenus lancemen t:</span>
            <span className="text-blue-800">
              {Object.values(data.launch_contents || {}).filter((v: any) => v).length} types de contenus prévus
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 font-medium min-w-[160px]">Créateurs :</span>
            <span className="text-blue-800">
              {(data.content_creators || []).length} source{(data.content_creators || []).length > 1 ? 's' : ''} de création
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-blue-200">
          <p className="text-sm text-blue-700">
            💡 <strong>Conseil :</strong> Un MVP bien défini avec des contenus prêts au lancement 
            est essentiel pour un démarrage réussi. Concentrez-vous sur la qualité plutôt que la quantité.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section6;
