import React from 'react';

interface Section11Props {
  data?: any;
  onUpdate: (data: any) => void;
}

const PARTNER_TYPES = [
  'Organismes de formation',
  'Entreprises (recrutement)',
  'Institutions publiques',
  'Médias / Communication',
  'Financeurs / Investisseurs',
  'Autre'
];

const PARTNER_STATUS = [
  'Confirmé',
  'En discussion',
  'Ciblé',
  'À développer'
];

interface Partner {
  type: string;
  name: string;
  role: string;
  status: string;
}

const Section11: React.FC<Section11Props> = ({ data = {}, onUpdate }) => {
  const partners: Partner[] = data.partners || [];

  const handleAddPartner = () => {
    const newPartners = [...partners, { type: '', name: '', role: '', status: 'À développer' }];
    onUpdate({ ...data, partners: newPartners });
  };

  const handlePartnerChange = (index: number, field: keyof Partner, value: string) => {
    const newPartners = [...partners];
    newPartners[index] = { ...newPartners[index], [field]: value };
    onUpdate({ ...data, partners: newPartners });
  };

  const handleRemovePartner = (index: number) => {
    const newPartners = partners.filter((_, i) => i !== index);
    onUpdate({ ...data, partners: newPartners });
  };

  // Statistiques
  const confirmedCount = partners.filter(p => p.status === 'Confirmé').length;
  const inDiscussionCount = partners.filter(p => p.status === 'En discussion').length;
  const targetedCount = partners.filter(p => p.status === 'Ciblé' || p.status === 'À développer').length;

  return (
    <div className="space-y-8">
      {/* 11.1 Partenaires Actuels */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          11.1 Partenaires Actuels
        </h3>
        <p className="text-sm text-slate-600">
          Avez-vous déjà des partenaires engagés ou en discussion ?
        </p>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-blue-900">
              Tableau des Partenaires
            </h4>
            <button
              onClick={handleAddPartner}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              + Ajouter un Partenaire
            </button>
          </div>

          {partners.length === 0 ? (
            <div className="text-center py-8 text-blue-700">
              <p className="mb-4">Aucun partenaire ajouté pour le moment.</p>
              <button
                onClick={handleAddPartner}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Cliquez pour ajouter votre premier partenaire
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-blue-200 rounded-lg">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-900 border-b border-blue-200">
                      Type de Partenaire
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-900 border-b border-blue-200">
                      Nom
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-900 border-b border-blue-200">
                      Rôle
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-900 border-b border-blue-200">
                      Statut
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-blue-900 border-b border-blue-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-100">
                  {partners.map((partner, index) => (
                    <tr key={index} className="hover:bg-blue-25">
                      <td className="px-4 py-3">
                        <select
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          value={partner.type || ''}
                          onChange={(e) => handlePartnerChange(index, 'type', e.target.value)}
                        >
                          <option value="">Sélectionnez...</option>
                          {PARTNER_TYPES.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="Nom du partenaire"
                          value={partner.name || ''}
                          onChange={(e) => handlePartnerChange(index, 'name', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="Rôle dans le projet"
                          value={partner.role || ''}
                          onChange={(e) => handlePartnerChange(index, 'role', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          value={partner.status || 'À développer'}
                          onChange={(e) => handlePartnerChange(index, 'status', e.target.value)}
                        >
                          {PARTNER_STATUS.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleRemovePartner(index)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 11.2 Partenaires Cibles */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          11.2 Partenaires Cibles
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Quels partenariats aimeriez-vous développer ?
          </label>
          <p className="text-xs text-slate-500 mb-4">
            Décrivez les types de partenaires que vous souhaitez cibler et pourquoi
          </p>
          <textarea
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={6}
            placeholder="Exemple : Partenariat avec le Ministère de l'Emploi, les grandes écoles ivoiriennes, les entreprises du CAC 40 local..."
            value={data.target_partnerships || ''}
            onChange={(e) => onUpdate({ ...data, target_partnerships: e.target.value })}
          />
        </div>

        {/* Stratégie de partenariat */}
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-4">
            Stratégie de Développement des Partenariats
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Comment comptez-vous approcher ces partenaires ?
              </label>
              <textarea
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Réseau existant, événements, prospection directe..."
                value={data.partnership_approach || ''}
                onChange={(e) => onUpdate({ ...data, partnership_approach: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Quelle valeur apportez-vous à vos partenaires ?
              </label>
              <textarea
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Accès à un vivier de talents, visibilité, co-branding..."
                value={data.partnership_value || ''}
                onChange={(e) => onUpdate({ ...data, partnership_value: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Objectif nombre de partenariats à 12 mois :
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: 10"
                value={data.partnership_target_12m || ''}
                onChange={(e) => onUpdate({ ...data, partnership_target_12m: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Résumé */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
        <h4 className="font-semibold text-purple-900 mb-4">🤝 Résumé de l'Écosystème</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-purple-600 font-medium min-w-[180px]">Total partenaires :</span>
            <span className="text-purple-800">
              {partners.length} partenaire{partners.length > 1 ? 's' : ''} identifié{partners.length > 1 ? 's' : ''}
            </span>
          </div>

          {confirmedCount > 0 && (
            <div className="flex items-start space-x-2">
              <span className="text-purple-600 font-medium min-w-[180px]">Confirmés :</span>
              <span className="text-purple-800">
                {confirmedCount} partenaire{confirmedCount > 1 ? 's' : ''}
              </span>
            </div>
          )}

          {inDiscussionCount > 0 && (
            <div className="flex items-start space-x-2">
              <span className="text-purple-600 font-medium min-w-[180px]">En discussion :</span>
              <span className="text-purple-800">
                {inDiscussionCount} partenaire{inDiscussionCount > 1 ? 's' : ''}
              </span>
            </div>
          )}

          {targetedCount > 0 && (
            <div className="flex items-start space-x-2">
              <span className="text-purple-600 font-medium min-w-[180px]">À développer :</span>
              <span className="text-purple-800">
                {targetedCount} partenaire{targetedCount > 1 ? 's' : ''}
              </span>
            </div>
          )}

          {partners.length > 0 && (
            <div className="mt-4 pt-4 border-t border-purple-200">
              <p className="text-xs text-purple-700 font-medium mb-2">Répartition par type :</p>
              <div className="space-y-1">
                {PARTNER_TYPES.map((type) => {
                  const count = partners.filter(p => p.type === type).length;
                  if (count === 0) return null;
                  return (
                    <div key={type} className="flex justify-between text-xs text-purple-700">
                      <span>{type} :</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {data.partnership_target_12m && (
            <div className="flex items-start space-x-2">
              <span className="text-purple-600 font-medium min-w-[180px]">Objectif 12 mois :</span>
              <span className="text-purple-800">
                {data.partnership_target_12m} partenariats
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-purple-200">
          <p className="text-sm text-purple-700">
            💡 <strong>Conseil :</strong> Les partenariats stratégiques sont essentiels pour 
            la crédibilité et la croissance de votre plateforme. Priorisez la qualité sur la quantité 
            et assurez-vous d'offrir une réelle valeur à vos partenaires.
          </p>
        </div>
      </div>

      {/* Types de partenariats suggérés */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-3">💼 Types de Partenariats Recommandés</h4>
        
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-800 mb-2">🎓 Organismes de Formation</h5>
            <p className="text-blue-700 text-xs">
              Enrichir votre catalogue avec des contenus de qualité et bénéficier de leur expertise
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-800 mb-2">🏢 Entreprises Partenaires</h5>
            <p className="text-blue-700 text-xs">
              Faciliter l'insertion professionnelle et valider la pertinence de vos formations
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-800 mb-2">🏛️ Institutions Publiques</h5>
            <p className="text-blue-700 text-xs">
              Obtenir des certifications reconnues et accéder à des financements publics
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-800 mb-2">💰 Investisseurs & Financeurs</h5>
            <p className="text-blue-700 text-xs">
              Sécuriser les ressources nécessaires pour scaler votre impact
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section11;
