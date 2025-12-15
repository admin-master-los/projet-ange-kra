import React from 'react';
import { SectionProps } from '../../types';

const FESCUI_FEATURES = [
  'Le design visuel (couleurs, polices, mise en page)',
  'L\'ergonomie (navigation, structure du site)',
  'L\'approche "célébration" (mettre en valeur la diversité)',
  'La structure en sections (pavillons, villages)',
  'L\'ambiance festive et positive',
  'Les photos/visuels authentiques',
  'Le storytelling (façon de raconter l\'histoire)'
];

const Section2: React.FC<SectionProps> = ({ data = {}, onUpdate }) => {
  const handleFescuiFeatureChange = (feature: string, checked: boolean) => {
    const currentFeatures = data.fescuiFeatures || [];
    const newFeatures = checked 
      ? [...currentFeatures, feature]
      : currentFeatures.filter((f: string) => f !== feature);
    onUpdate({ ...data, fescuiFeatures: newFeatures });
  };

  const handleReferenceChange = (type: string, field: string, value: string) => {
    const references = { ...data.references };
    if (!references[type]) references[type] = {};
    references[type][field] = value;
    onUpdate({ ...data, references });
  };

  return (
    <div className="space-y-8">
      {/* 2.1 Votre Référence FESCUI */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">2.1 Votre Référence FESCUI</h3>
        <div>
          <p className="text-sm text-slate-700 mb-3">
            Vous avez mentionné aimer FESCUI (www.fescui.com). Qu'est-ce qui vous plaît EXACTEMENT ?
          </p>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Cochez TOUT ce qui s'applique :
          </label>
          <div className="space-y-3">
            {FESCUI_FEATURES.map((feature) => (
              <label key={feature} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  checked={(data.fescuiFeatures || []).includes(feature)}
                  onChange={(e) => handleFescuiFeatureChange(feature, e.target.checked)}
                />
                <span className="text-sm text-slate-700 leading-5">{feature}</span>
              </label>
            ))}
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Autre :</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Précisez d'autres aspects qui vous plaisent..."
              value={data.otherFescuiFeature || ''}
              onChange={(e) => onUpdate({ ...data, otherFescuiFeature: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Comment imaginez-vous appliquer cette inspiration à votre plateforme de formation ?
          </label>
          <textarea
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            placeholder='Exemple : "Je veux que chaque métier soit présenté comme un pavillon avec des couleurs et une ambiance spécifique"'
            value={data.fescuiApplication || ''}
            onChange={(e) => onUpdate({ ...data, fescuiApplication: e.target.value })}
          />
        </div>
      </div>

      {/* 2.2 Autres Références */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">2.2 Autres Références (IMPORTANT)</h3>
        <p className="text-sm text-slate-700">
          Donnez-nous 3 autres sites/applications que vous aimez :
        </p>

        {/* Référence A - DESIGN */}
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <h4 className="font-medium text-slate-900 mb-4">Référence A - Pour le DESIGN :</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nom/URL :</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={data.references?.design?.name || ''}
                onChange={(e) => handleReferenceChange('design', 'name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ce que vous aimez :</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={data.references?.design?.description || ''}
                onChange={(e) => handleReferenceChange('design', 'description', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Référence B - FONCTIONNALITÉS */}
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <h4 className="font-medium text-slate-900 mb-4">Référence B - Pour les FONCTIONNALITÉS :</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nom/URL :</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={data.references?.functionality?.name || ''}
                onChange={(e) => handleReferenceChange('functionality', 'name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ce que vous aimez :</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={data.references?.functionality?.description || ''}
                onChange={(e) => handleReferenceChange('functionality', 'description', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Référence C - UX */}
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <h4 className="font-medium text-slate-900 mb-4">Référence C - Pour l'EXPÉRIENCE UTILISATEUR :</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nom/URL :</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={data.references?.ux?.name || ''}
                onChange={(e) => handleReferenceChange('ux', 'name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ce que vous aimez :</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={data.references?.ux?.description || ''}
                onChange={(e) => handleReferenceChange('ux', 'description', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2.3 Concurrence */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">2.3 Concurrence</h3>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Connaissez-vous des plateformes similaires qui existent déjà ?
          </label>
          <textarea
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Listez-les ici avec ce qui vous différencie d'elles"
            value={data.competitors || ''}
            onChange={(e) => onUpdate({ ...data, competitors: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Ce qui rendra VOTRE plateforme UNIQUE :
          </label>
          <textarea
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Votre proposition de valeur unique"
            value={data.uniqueValue || ''}
            onChange={(e) => onUpdate({ ...data, uniqueValue: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default Section2;