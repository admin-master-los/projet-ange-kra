import React from 'react';

interface Section10Props {
  data?: any;
  onUpdate: (data: any) => void;
}

const SUPPORT_OPTIONS = [
  'Site web desktop',
  'Site web mobile (responsive)',
  'Application mobile iOS',
  'Application mobile Android',
  'Progressive Web App (PWA)'
];

const INTEGRATION_OPTIONS = [
  { 
    key: 'paiement_mobile', 
    label: 'Paiement mobile : Orange Money, MTN, Moov',
    detailLabel: 'Providers sélectionnés'
  },
  { 
    key: 'paiement_carte', 
    label: 'Paiement carte bancaire : Stripe, PayPal',
    detailLabel: 'Services préférés'
  },
  { 
    key: 'connexion_sociale', 
    label: 'Connexion sociale : Google, Facebook, LinkedIn',
    detailLabel: 'Réseaux à intégrer'
  },
  { 
    key: 'analytics', 
    label: 'Outils analytics : Google Analytics, Mixpanel',
    detailLabel: 'Outils choisis'
  },
  { 
    key: 'email_marketing', 
    label: 'Email marketing : Mailchimp, Sendinblue',
    detailLabel: 'Service préféré'
  },
  { 
    key: 'visioconference', 
    label: 'Visioconférence : Zoom, Google Meet (si webinaires)',
    detailLabel: 'Plateforme choisie'
  },
  { 
    key: 'stockage_cloud', 
    label: 'Stockage cloud : Google Drive, Dropbox',
    detailLabel: 'Service cloud'
  }
];

const Section10: React.FC<Section10Props> = ({ data = {}, onUpdate }) => {
  const handleSupportChange = (support: string, checked: boolean) => {
    const supports = data.supports || [];
    const newSupports = checked 
      ? [...supports, support]
      : supports.filter((s: string) => s !== support);
    onUpdate({ ...data, supports: newSupports });
  };

  const handlePriorityChange = (index: number, value: string) => {
    const priorities = [...(data.support_priorities || ['', '', ''])];
    priorities[index] = value;
    onUpdate({ ...data, support_priorities: priorities });
  };

  const handleIntegrationChange = (key: string, checked: boolean) => {
    const integrations = { ...(data.integrations || {}) };
    if (checked) {
      integrations[key] = { checked: true, detail: '' };
    } else {
      delete integrations[key];
    }
    onUpdate({ ...data, integrations });
  };

  const handleIntegrationDetailChange = (key: string, detail: string) => {
    const integrations = { ...(data.integrations || {}) };
    if (integrations[key]) {
      integrations[key] = { ...integrations[key], detail };
    }
    onUpdate({ ...data, integrations });
  };

  const selectedSupportsCount = (data.supports || []).length;
  const selectedIntegrationsCount = Object.keys(data.integrations || {}).length;

  return (
    <div className="space-y-8">
      {/* 10.1 Supports */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          10.1 Supports
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Sur quels supports la plateforme doit-elle fonctionner ?
          </label>
          <div className="space-y-3">
            {SUPPORT_OPTIONS.map((support) => (
              <label key={support} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  checked={(data.supports || []).includes(support)}
                  onChange={(e) => handleSupportChange(support, e.target.checked)}
                />
                <span className="text-sm text-slate-700 leading-5">{support}</span>
              </label>
            ))}
          </div>

          <div className="mt-4">
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Autre support..."
              value={data.other_support || ''}
              onChange={(e) => onUpdate({ ...data, other_support: e.target.value })}
            />
          </div>
        </div>

        {/* Priorités */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-4">
            Ordre de priorité des supports
          </h4>
          <p className="text-xs text-blue-700 mb-4">
            Classez les 3 supports les plus importants par ordre de priorité
          </p>

          <div className="space-y-4">
            {[0, 1, 2].map((index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-blue-800 mb-2">
                  Priorité {index + 1} :
                </label>
                <select
                  className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={data.support_priorities?.[index] || ''}
                  onChange={(e) => handlePriorityChange(index, e.target.value)}
                >
                  <option value="">Sélectionnez un support</option>
                  {SUPPORT_OPTIONS.map((support) => (
                    <option key={support} value={support}>{support}</option>
                  ))}
                  {data.other_support && (
                    <option value={data.other_support}>{data.other_support}</option>
                  )}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 10.2 Intégrations */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          10.2 Intégrations
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Intégrations tierces souhaitées :
          </label>

          <div className="space-y-4">
            {INTEGRATION_OPTIONS.map((integration) => {
              const isChecked = !!(data.integrations || {})[integration.key];
              const detail = (data.integrations || {})[integration.key]?.detail || '';

              return (
                <div key={integration.key} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <label className="flex items-start space-x-3 cursor-pointer mb-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                      checked={isChecked}
                      onChange={(e) => handleIntegrationChange(integration.key, e.target.checked)}
                    />
                    <span className="text-sm font-medium text-slate-700 flex-1">
                      {integration.label}
                    </span>
                  </label>
                  
                  {isChecked && (
                    <div className="ml-7">
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {integration.detailLabel} :
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Précisez..."
                        value={detail}
                        onChange={(e) => handleIntegrationDetailChange(integration.key, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Autre intégration */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Autre intégration :
              </label>
              <textarea
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                rows={3}
                placeholder="Décrivez d'autres intégrations tierces nécessaires..."
                value={data.other_integration || ''}
                onChange={(e) => onUpdate({ ...data, other_integration: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Considérations techniques supplémentaires */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          10.3 Considérations Techniques Supplémentaires
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Préférences technologiques (si vous en avez) :
          </label>
          <textarea
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            placeholder="Exemple : Préférence pour React, WordPress, ou aucune préférence technique particulière..."
            value={data.tech_preferences || ''}
            onChange={(e) => onUpdate({ ...data, tech_preferences: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Besoins de scalabilité :
          </label>
          <textarea
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Exemple : Prévoir 10 000 utilisateurs la première année, 50 000 à 3 ans..."
            value={data.scalability_needs || ''}
            onChange={(e) => onUpdate({ ...data, scalability_needs: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Exigences de performance :
          </label>
          <textarea
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Exemple : Temps de chargement < 3 secondes, disponibilité 99.9%, support connexion lente..."
            value={data.performance_requirements || ''}
            onChange={(e) => onUpdate({ ...data, performance_requirements: e.target.value })}
          />
        </div>
      </div>

      {/* Résumé */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200">
        <h4 className="font-semibold text-indigo-900 mb-4">💻 Résumé Technique</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-indigo-600 font-medium min-w-[180px]">Supports :</span>
            <span className="text-indigo-800">
              {selectedSupportsCount} plateforme{selectedSupportsCount > 1 ? 's' : ''} sélectionnée{selectedSupportsCount > 1 ? 's' : ''}
            </span>
          </div>

          {selectedSupportsCount > 0 && (
            <div className="ml-[180px] space-y-1">
              {(data.supports || []).map((support: string) => (
                <div key={support} className="text-indigo-700 text-xs">
                  • {support}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-start space-x-2">
            <span className="text-indigo-600 font-medium min-w-[180px]">Priorité #1 :</span>
            <span className="text-indigo-800">
              {data.support_priorities?.[0] || 'Non définie'}
            </span>
          </div>

          <div className="flex items-start space-x-2">
            <span className="text-indigo-600 font-medium min-w-[180px]">Intégrations :</span>
            <span className="text-indigo-800">
              {selectedIntegrationsCount} intégration{selectedIntegrationsCount > 1 ? 's' : ''} planifiée{selectedIntegrationsCount > 1 ? 's' : ''}
            </span>
          </div>

          {selectedIntegrationsCount > 0 && (
            <div className="ml-[180px] space-y-1">
              {Object.entries(data.integrations || {}).map(([key, value]: [string, any]) => {
                const integration = INTEGRATION_OPTIONS.find(i => i.key === key);
                return (
                  <div key={key} className="text-indigo-700 text-xs">
                    • {integration?.label.split(':')[0]}
                    {value.detail && ` : ${value.detail}`}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-indigo-200">
          <p className="text-sm text-indigo-700">
            💡 <strong>Conseil :</strong> Priorisez un support principal (généralement web responsive) 
            avant d'investir dans des applications natives. Les Progressive Web Apps (PWA) offrent 
            un bon compromis entre web et mobile.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section10;
