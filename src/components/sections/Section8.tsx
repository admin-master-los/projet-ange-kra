import React from 'react';

interface Section8Props {
  data?: any;
  onUpdate: (data: any) => void;
}

const KPI_OPTIONS = [
  { key: 'inscriptions', label: 'Nombre d\'inscriptions' },
  { key: 'activation', label: 'Taux d\'activation (complétion du profil)' },
  { key: 'formations_commencees', label: 'Nombre de formations commencées' },
  { key: 'formations_terminees', label: 'Nombre de formations terminées' },
  { key: 'taux_completion', label: 'Taux de complétion moyen' },
  { key: 'cv_generes', label: 'Nombre de CV générés' },
  { key: 'placements', label: 'Nombre de placements réussis (emplois trouvés)' },
  { key: 'revenus', label: 'Revenus générés' },
  { key: 'satisfaction', label: 'Taux de satisfaction (NPS)' },
  { key: 'retention', label: 'Taux de rétention' }
];

const VALIDATION_METHODS = [
  { key: 'tests_pilotes', label: 'Phase de tests avec utilisateurs pilotes', detail: 'Nombre d\'utilisateurs pilotes' },
  { key: 'focus_groups', label: 'Focus groups / interviews utilisateurs', detail: 'Fréquence prévue' },
  { key: 'questionnaires', label: 'Questionnaires de satisfaction', detail: 'Périodicité' },
  { key: 'analytics', label: 'Analytics / tracking comportement', detail: 'Outils utilisés' },
  { key: 'ab_testing', label: 'A/B testing de fonctionnalités', detail: 'Fréquence' }
];

const Section8: React.FC<Section8Props> = ({ data = {}, onUpdate }) => {
  const handleKPIChange = (key: string, checked: boolean) => {
    const kpis = { ...(data.kpis || {}) };
    if (checked) {
      kpis[key] = { checked: true, target: '' };
    } else {
      delete kpis[key];
    }
    onUpdate({ ...data, kpis });
  };

  const handleKPITargetChange = (key: string, target: string) => {
    const kpis = { ...(data.kpis || {}) };
    if (kpis[key]) {
      kpis[key] = { ...kpis[key], target };
    }
    onUpdate({ ...data, kpis });
  };

  const handleValidationMethodChange = (key: string, checked: boolean) => {
    const methods = { ...(data.validation_methods || {}) };
    if (checked) {
      methods[key] = { checked: true, detail: '' };
    } else {
      delete methods[key];
    }
    onUpdate({ ...data, validation_methods: methods });
  };

  const handleValidationDetailChange = (key: string, detail: string) => {
    const methods = { ...(data.validation_methods || {}) };
    if (methods[key]) {
      methods[key] = { ...methods[key], detail };
    }
    onUpdate({ ...data, validation_methods: methods });
  };

  const selectedKPIsCount = Object.keys(data.kpis || {}).length;
  const selectedMethodsCount = Object.keys(data.validation_methods || {}).length;

  return (
    <div className="space-y-8">
      {/* 8.1 Indicateurs Clés (KPIs) */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          8.1 Indicateurs Clés (KPIs)
        </h3>
        <p className="text-sm text-slate-600">
          Quels chiffres suivrez-vous chaque mois ?
        </p>

        <div className="space-y-4">
          {KPI_OPTIONS.map((kpi) => {
            const isChecked = !!(data.kpis || {})[kpi.key];
            const target = (data.kpis || {})[kpi.key]?.target || '';

            return (
              <div key={kpi.key} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <label className="flex items-start space-x-3 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    checked={isChecked}
                    onChange={(e) => handleKPIChange(kpi.key, e.target.checked)}
                  />
                  <span className="text-sm font-medium text-slate-700 flex-1">
                    {kpi.label}
                  </span>
                </label>
                
                {isChecked && (
                  <div className="ml-7">
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Objectif mensuel à 12 mois :
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder={kpi.key === 'revenus' ? 'Ex: 2 000 000 FCFA' : kpi.key === 'satisfaction' ? 'Ex: 8/10' : 'Ex: 500'}
                      value={target}
                      onChange={(e) => handleKPITargetChange(kpi.key, e.target.value)}
                    />
                  </div>
                )}
              </div>
            );
          })}

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Autre KPI important pour vous :
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mb-2"
              placeholder="Nom du KPI..."
              value={data.other_kpi_name || ''}
              onChange={(e) => onUpdate({ ...data, other_kpi_name: e.target.value })}
            />
            {data.other_kpi_name && (
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Objectif..."
                value={data.other_kpi_target || ''}
                onChange={(e) => onUpdate({ ...data, other_kpi_target: e.target.value })}
              />
            )}
          </div>
        </div>
      </div>

      {/* 8.2 Tests & Validation */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">8.2 Tests & Validation</h3>
        <p className="text-sm text-slate-600">
          Comment allez-vous valider que la plateforme répond aux besoins ?
        </p>

        <div className="space-y-4">
          {VALIDATION_METHODS.map((method) => {
            const isChecked = !!(data.validation_methods || {})[method.key];
            const detail = (data.validation_methods || {})[method.key]?.detail || '';

            return (
              <div key={method.key} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <label className="flex items-start space-x-3 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    checked={isChecked}
                    onChange={(e) => handleValidationMethodChange(method.key, e.target.checked)}
                  />
                  <span className="text-sm font-medium text-slate-700 flex-1">
                    {method.label}
                  </span>
                </label>
                
                {isChecked && (
                  <div className="ml-7">
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      {method.detail} :
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder={
                        method.key === 'tests_pilotes' ? 'Ex: 20-30 utilisateurs' :
                        method.key === 'focus_groups' ? 'Ex: Mensuel' :
                        method.key === 'questionnaires' ? 'Ex: Trimestriel' :
                        method.key === 'analytics' ? 'Ex: Google Analytics, Mixpanel' :
                        'Ex: Mensuel'
                      }
                      value={detail}
                      onChange={(e) => handleValidationDetailChange(method.key, e.target.value)}
                    />
                  </div>
                )}
              </div>
            );
          })}

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Autre méthode de validation :
            </label>
            <textarea
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
              rows={3}
              placeholder="Décrivez d'autres méthodes de validation..."
              value={data.other_validation || ''}
              onChange={(e) => onUpdate({ ...data, other_validation: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Fréquence de suivi */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">8.3 Fréquence de Suivi</h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            À quelle fréquence analyserez-vous vos KPIs ?
          </label>
          <div className="space-y-2">
            {['Quotidienne', 'Hebdomadaire', 'Mensuelle', 'Trimestrielle'].map((freq) => (
              <label key={freq} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="kpi_frequency"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.kpi_frequency === freq}
                  onChange={() => onUpdate({ ...data, kpi_frequency: freq })}
                />
                <span className="text-sm text-slate-700 leading-5">{freq}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Qui sera responsable du suivi des KPIs ?
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: Product Manager, Data Analyst, vous-même..."
            value={data.kpi_responsible || ''}
            onChange={(e) => onUpdate({ ...data, kpi_responsible: e.target.value })}
          />
        </div>
      </div>

      {/* Résumé */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200">
        <h4 className="font-semibold text-purple-900 mb-4">📊 Résumé de la Mesure du Succès</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-purple-600 font-medium min-w-[200px]">KPIs sélectionnés :</span>
            <span className="text-purple-800">
              {selectedKPIsCount} indicateur{selectedKPIsCount > 1 ? 's' : ''} de performance
            </span>
          </div>

          {selectedKPIsCount > 0 && (
            <div className="ml-[200px] space-y-1">
              {Object.entries(data.kpis || {}).map(([key, value]: [string, any]) => {
                const kpi = KPI_OPTIONS.find(k => k.key === key);
                return (
                  <div key={key} className="text-purple-700 text-xs">
                    • {kpi?.label}
                    {value.target && ` : ${value.target}`}
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex items-start space-x-2">
            <span className="text-purple-600 font-medium min-w-[200px]">Méthodes de validation :</span>
            <span className="text-purple-800">
              {selectedMethodsCount} méthode{selectedMethodsCount > 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex items-start space-x-2">
            <span className="text-purple-600 font-medium min-w-[200px]">Fréquence d'analyse :</span>
            <span className="text-purple-800">
              {data.kpi_frequency || 'Non définie'}
            </span>
          </div>

          <div className="flex items-start space-x-2">
            <span className="text-purple-600 font-medium min-w-[200px]">Responsable du suivi :</span>
            <span className="text-purple-800">
              {data.kpi_responsible || 'Non défini'}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-purple-200">
          <p className="text-sm text-purple-700">
            💡 <strong>Conseil :</strong> Commencez avec 3-5 KPIs essentiels plutôt que de tout mesurer. 
            Focalisez-vous sur les métriques qui ont un impact direct sur votre modèle économique et 
            l'expérience utilisateur. Vous pourrez affiner et ajouter d'autres KPIs au fil du temps.
          </p>
        </div>
      </div>

      {/* Seuils d'alerte */}
      <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
        <h4 className="font-semibold text-amber-900 mb-3">⚠️ Seuils d'Alerte</h4>
        <p className="text-sm text-amber-700 mb-4">
          Définissez des seuils qui vous alerteront si les choses ne vont pas dans la bonne direction :
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-2">
              Taux de complétion minimum acceptable :
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                min="0"
                max="100"
                className="flex-1 px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Ex: 30"
                value={data.alert_completion_rate || ''}
                onChange={(e) => onUpdate({ ...data, alert_completion_rate: e.target.value })}
              />
              <span className="text-amber-800 font-medium">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800 mb-2">
              Taux de rétention minimum (utilisateurs actifs après 30 jours) :
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                min="0"
                max="100"
                className="flex-1 px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Ex: 40"
                value={data.alert_retention_rate || ''}
                onChange={(e) => onUpdate({ ...data, alert_retention_rate: e.target.value })}
              />
              <span className="text-amber-800 font-medium">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800 mb-2">
              Score de satisfaction minimum (NPS) :
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                min="0"
                max="10"
                className="flex-1 px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Ex: 7"
                value={data.alert_satisfaction_score || ''}
                onChange={(e) => onUpdate({ ...data, alert_satisfaction_score: e.target.value })}
              />
              <span className="text-amber-800 font-medium">/ 10</span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-white rounded-lg border border-amber-300">
          <p className="text-xs text-amber-700">
            💡 Ces seuils vous aideront à réagir rapidement si les performances de la plateforme 
            ne sont pas à la hauteur de vos attentes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section8;
