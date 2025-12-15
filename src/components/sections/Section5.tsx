import React from 'react';
import { SectionProps } from '../../types';

const SOURCES_REVENUS = [
  { 
    key: 'abonnement_utilisateurs', 
    label: 'Abonnement utilisateurs (mensuel/annuel)',
    pricePlaceholder: 'Prix envisagé en FCFA/mois'
  },
  { 
    key: 'vente_formations', 
    label: 'Vente de formations à l\'unité',
    pricePlaceholder: 'Prix moyen en FCFA/formation'
  },
  { 
    key: 'freemium', 
    label: 'Freemium (gratuit + options premium)',
    pricePlaceholder: 'Prix premium en FCFA/mois'
  },
  { 
    key: 'b2b_entreprises', 
    label: 'B2B - Vente aux entreprises (formation de leurs employés)',
    pricePlaceholder: 'Prix envisagé en FCFA/entreprise'
  },
  { 
    key: 'commission_placements', 
    label: 'Commission sur placements (si l\'apprenant trouve un emploi)',
    pricePlaceholder: 'Taux en % du salaire annuel'
  },
  { 
    key: 'publicite', 
    label: 'Publicité (annonces entreprises, formations)',
    pricePlaceholder: 'Revenu mensuel estimé'
  },
  { 
    key: 'partenariats', 
    label: 'Partenariats/Sponsoring',
    pricePlaceholder: 'Revenu annuel estimé'
  },
  { 
    key: 'subventions', 
    label: 'Subventions/Financements publics',
    pricePlaceholder: 'Montant estimé'
  },
  { 
    key: 'gratuit', 
    label: '100% gratuit',
    pricePlaceholder: 'Financé par quoi ?'
  }
];

const PHILOSOPHIES_TARIFAIRES = [
  'Accessible au maximum (prix très bas ou gratuit)',
  'Prix du marché (aligné sur concurrence)',
  'Positionnement premium (qualité supérieure justifie prix élevé)',
  'Je ne sais pas encore'
];

const Section5: React.FC<SectionProps> = ({ data = {}, onUpdate }) => {
  const handleSourceRevenuChange = (key: string, checked: boolean) => {
    const sources = { ...(data.sources_revenus || {}) };
    if (checked) {
      sources[key] = { checked: true, price: '' };
    } else {
      delete sources[key];
    }
    onUpdate({ ...data, sources_revenus: sources });
  };

  const handleSourcePriceChange = (key: string, price: string) => {
    const sources = { ...(data.sources_revenus || {}) };
    if (sources[key]) {
      sources[key] = { ...sources[key], price };
    }
    onUpdate({ ...data, sources_revenus: sources });
  };

  const selectedSourcesCount = Object.keys(data.sources_revenus || {}).length;

  return (
    <div className="space-y-8">
      {/* 5.1 Comment Allez-Vous Gagner de l'Argent ? */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          5.1 Comment Allez-Vous Gagner de l'Argent ?
        </h3>
        <p className="text-sm text-slate-600">
          Cochez TOUTES les sources de revenus envisagées :
        </p>

        <div className="space-y-4">
          {SOURCES_REVENUS.map((source) => {
            const isChecked = !!(data.sources_revenus || {})[source.key];
            const price = (data.sources_revenus || {})[source.key]?.price || '';

            return (
              <div key={source.key} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <label className="flex items-start space-x-3 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    checked={isChecked}
                    onChange={(e) => handleSourceRevenuChange(source.key, e.target.checked)}
                  />
                  <span className="text-sm font-medium text-slate-700 flex-1">
                    {source.label}
                  </span>
                </label>
                
                {isChecked && (
                  <div className="ml-7">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder={source.pricePlaceholder}
                      value={price}
                      onChange={(e) => handleSourcePriceChange(source.key, e.target.value)}
                    />
                  </div>
                )}
              </div>
            );
          })}

          {/* Autre source de revenus */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Autre source de revenus :
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Précisez une autre source de revenus..."
              value={data.autre_source_revenus || ''}
              onChange={(e) => onUpdate({ ...data, autre_source_revenus: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* 5.2 Prix & Accessibilité */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">5.2 Prix & Accessibilité</h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Quelle est votre philosophie tarifaire ?
          </label>
          <div className="space-y-3">
            {PHILOSOPHIES_TARIFAIRES.map((philosophie) => (
              <label key={philosophie} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="philosophie"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.philosophie_tarifaire === philosophie}
                  onChange={() => onUpdate({ ...data, philosophie_tarifaire: philosophie })}
                />
                <span className="text-sm text-slate-700 leading-5">{philosophie}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <label className="block text-sm font-medium text-blue-900 mb-3">
            Budget moyen de votre cible :
          </label>
          <p className="text-xs text-blue-700 mb-3">
            Combien votre utilisateur typique peut-il dépenser par mois pour se former ?
          </p>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              className="flex-1 px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Montant en FCFA"
              value={data.budget_moyen_cible || ''}
              onChange={(e) => onUpdate({ ...data, budget_moyen_cible: e.target.value })}
            />
            <span className="text-sm font-medium text-blue-800">FCFA/mois</span>
          </div>
        </div>
      </div>

      {/* Résumé du modèle économique */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
        <h4 className="font-semibold text-green-900 mb-4">💰 Résumé du Modèle Économique</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-green-600 font-medium min-w-[180px]">Sources de revenus :</span>
            <span className="text-green-800">
              {selectedSourcesCount} source{selectedSourcesCount > 1 ? 's' : ''} sélectionnée{selectedSourcesCount > 1 ? 's' : ''}
            </span>
          </div>
          
          {selectedSourcesCount > 0 && (
            <div className="ml-[180px] space-y-1">
              {Object.entries(data.sources_revenus || {}).map(([key, value]: [string, any]) => {
                const source = SOURCES_REVENUS.find(s => s.key === key);
                return (
                  <div key={key} className="text-green-700 text-xs">
                    • {source?.label}
                    {value.price && ` : ${value.price}`}
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex items-start space-x-2">
            <span className="text-green-600 font-medium min-w-[180px]">Philosophie tarifaire :</span>
            <span className="text-green-800">
              {data.philosophie_tarifaire || 'Non définie'}
            </span>
          </div>

          <div className="flex items-start space-x-2">
            <span className="text-green-600 font-medium min-w-[180px]">Budget moyen cible :</span>
            <span className="text-green-800">
              {data.budget_moyen_cible ? `${data.budget_moyen_cible} FCFA/mois` : 'Non défini'}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-green-200">
          <p className="text-sm text-green-700">
            💡 <strong>Conseil :</strong> Diversifiez vos sources de revenus pour réduire les risques. 
            Un modèle mixte (B2C + B2B + partenariats) est souvent plus résilient.
          </p>
        </div>
      </div>

      {/* Analyse de rentabilité */}
      <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
        <h4 className="font-semibold text-amber-900 mb-3">📊 Questions à Approfondir</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-2">
              Estimation du nombre d'utilisateurs payants dans 12 mois :
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Ex: 1000"
              value={data.utilisateurs_payants_12mois || ''}
              onChange={(e) => onUpdate({ ...data, utilisateurs_payants_12mois: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800 mb-2">
              Revenu mensuel estimé à 12 mois (FCFA) :
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Ex: 5000000"
              value={data.revenu_mensuel_12mois || ''}
              onChange={(e) => onUpdate({ ...data, revenu_mensuel_12mois: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800 mb-2">
              Comment comptez-vous atteindre ces chiffres ?
            </label>
            <textarea
              className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="Décrivez votre stratégie de croissance : marketing, partenariats, bouche-à-oreille..."
              value={data.strategie_croissance || ''}
              onChange={(e) => onUpdate({ ...data, strategie_croissance: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section5;
