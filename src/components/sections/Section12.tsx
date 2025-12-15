import React from 'react';

interface Section12Props {
  data?: any;
  onUpdate: (data: any) => void;
}

const LEGAL_STATUS_OPTIONS = [
  'Entreprise individuelle',
  'SARL / SARLU',
  'SAS / SASU',
  'Association',
  'Autre',
  'Pas encore créée'
];

const LEGAL_ASPECTS = [
  { 
    key: 'rgpd', 
    label: 'Protection des données personnelles (RGPD)',
    description: 'Conformité aux règles de protection des données utilisateurs'
  },
  { 
    key: 'cgu_cgv', 
    label: 'CGU / CGV (Conditions Générales)',
    description: 'Conditions d\'utilisation et de vente de vos services'
  },
  { 
    key: 'confidentialite', 
    label: 'Politique de confidentialité',
    description: 'Comment vous collectez et utilisez les données'
  },
  { 
    key: 'droits_auteur', 
    label: 'Droits d\'auteur (contenus de formation)',
    description: 'Propriété intellectuelle des contenus pédagogiques'
  },
  { 
    key: 'certifications', 
    label: 'Certifications de formation (valeur légale)',
    description: 'Reconnaissance officielle des certifications délivrées'
  },
  { 
    key: 'contrats_travail', 
    label: 'Contrats de travail (si placement)',
    description: 'Cadre légal pour l\'insertion professionnelle'
  },
  { 
    key: 'propriete_intellectuelle', 
    label: 'Propriété intellectuelle de la plateforme',
    description: 'Protection du code, design et marque'
  },
  { 
    key: 'responsabilite_civile', 
    label: 'Assurance responsabilité civile professionnelle',
    description: 'Couverture en cas de préjudice causé'
  }
];

const LEGAL_ASSISTANCE = [
  'Oui, j\'ai besoin d\'un accompagnement juridique',
  'Non, je gère en interne',
  'Je ne sais pas encore',
  'J\'ai déjà un avocat/conseil juridique'
];

const Section12: React.FC<Section12Props> = ({ data = {}, onUpdate }) => {
  const handleLegalAspectChange = (key: string, checked: boolean) => {
    const aspects = { ...(data.legal_aspects || {}) };
    aspects[key] = checked;
    onUpdate({ ...data, legal_aspects: aspects });
  };

  const handleLegalAspectNoteChange = (key: string, note: string) => {
    const notes = { ...(data.legal_aspect_notes || {}) };
    notes[key] = note;
    onUpdate({ ...data, legal_aspect_notes: notes });
  };

  // Compter les aspects sélectionnés
  const selectedAspectsCount = Object.values(data.legal_aspects || {}).filter(Boolean).length;
  const totalAspects = LEGAL_ASPECTS.length;

  return (
    <div className="space-y-8">
      {/* 12.1 Statut Juridique */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          12.1 Statut Juridique
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Statut de votre structure :
          </label>
          <div className="space-y-3">
            {LEGAL_STATUS_OPTIONS.map((status) => (
              <label key={status} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="legal_status"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.legal_status === status}
                  onChange={() => onUpdate({ ...data, legal_status: status })}
                />
                <span className="text-sm text-slate-700 leading-5">{status}</span>
              </label>
            ))}
          </div>

          {data.legal_status === 'Autre' && (
            <div className="mt-3">
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Précisez le statut juridique..."
                value={data.legal_status_other || ''}
                onChange={(e) => onUpdate({ ...data, legal_status_other: e.target.value })}
              />
            </div>
          )}

          {data.legal_status === 'Pas encore créée' && (
            <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800">
                ⚠️ <strong>Important :</strong> Il est recommandé de créer votre structure juridique 
                avant le lancement de la plateforme pour des raisons de responsabilité et de conformité légale.
              </p>
            </div>
          )}
        </div>

        {/* Informations complémentaires */}
        {data.legal_status && data.legal_status !== 'Pas encore créée' && (
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4">
            <h4 className="font-semibold text-slate-900">
              Informations Complémentaires
            </h4>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nom de la structure :
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: CIFOP SARL"
                value={data.company_name || ''}
                onChange={(e) => onUpdate({ ...data, company_name: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Numéro d'immatriculation :
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: CI-ABJ-2024-XXXXX"
                  value={data.registration_number || ''}
                  onChange={(e) => onUpdate({ ...data, registration_number: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Date de création :
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={data.creation_date || ''}
                  onChange={(e) => onUpdate({ ...data, creation_date: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Siège social :
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Adresse complète du siège"
                value={data.headquarters || ''}
                onChange={(e) => onUpdate({ ...data, headquarters: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      {/* 12.2 Conformité */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          12.2 Conformité
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Aspects légaux à gérer pour votre plateforme :
          </label>
          <p className="text-xs text-slate-500 mb-4">
            Cochez tous les aspects qui nécessitent une attention particulière
          </p>

          <div className="space-y-4">
            {LEGAL_ASPECTS.map((aspect) => {
              const isChecked = !!(data.legal_aspects || {})[aspect.key];
              const note = (data.legal_aspect_notes || {})[aspect.key] || '';

              return (
                <div key={aspect.key} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <label className="flex items-start space-x-3 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                      checked={isChecked}
                      onChange={(e) => handleLegalAspectChange(aspect.key, e.target.checked)}
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-slate-700 block">
                        {aspect.label}
                      </span>
                      <span className="text-xs text-slate-500">
                        {aspect.description}
                      </span>
                    </div>
                  </label>
                  
                  {isChecked && (
                    <div className="ml-7 mt-3">
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        État actuel / Actions prévues :
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                        rows={2}
                        placeholder="Ex: À mettre en place, En cours de rédaction, Déjà conforme, etc."
                        value={note}
                        onChange={(e) => handleLegalAspectNoteChange(aspect.key, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Autre aspect légal */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Autre aspect légal à considérer :
              </label>
              <textarea
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Décrivez d'autres aspects légaux spécifiques à votre projet..."
                value={data.other_legal_aspects || ''}
                onChange={(e) => onUpdate({ ...data, other_legal_aspects: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Accompagnement Juridique */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          12.3 Accompagnement Juridique
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Besoin d'accompagnement juridique ?
          </label>
          <div className="space-y-3">
            {LEGAL_ASSISTANCE.map((option) => (
              <label key={option} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="legal_assistance"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.legal_assistance === option}
                  onChange={() => onUpdate({ ...data, legal_assistance: option })}
                />
                <span className="text-sm text-slate-700 leading-5">{option}</span>
              </label>
            ))}
          </div>

          {data.legal_assistance === 'Oui, j\'ai besoin d\'un accompagnement juridique' && (
            <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Domaines juridiques prioritaires :
              </label>
              <textarea
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Ex: Rédaction CGU/CGV, Mise en conformité RGPD, Protection de la propriété intellectuelle..."
                value={data.legal_assistance_needs || ''}
                onChange={(e) => onUpdate({ ...data, legal_assistance_needs: e.target.value })}
              />
            </div>
          )}

          {data.legal_assistance === 'J\'ai déjà un avocat/conseil juridique' && (
            <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200">
              <label className="block text-sm font-medium text-green-900 mb-2">
                Coordonnées de votre conseil juridique (optionnel) :
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Nom du cabinet / avocat"
                value={data.legal_counsel_name || ''}
                onChange={(e) => onUpdate({ ...data, legal_counsel_name: e.target.value })}
              />
            </div>
          )}
        </div>
      </div>

      {/* Sécurité des Données */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          12.4 Sécurité des Données
        </h3>
        
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Où seront hébergées les données utilisateurs ?
            </label>
            <select
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={data.data_hosting || ''}
              onChange={(e) => onUpdate({ ...data, data_hosting: e.target.value })}
            >
              <option value="">Sélectionnez...</option>
              <option value="europe">Europe (RGPD compliant)</option>
              <option value="usa">États-Unis</option>
              <option value="local">Localement en Côte d'Ivoire</option>
              <option value="cloud">Cloud international (AWS, Google, Azure)</option>
              <option value="not_decided">Pas encore décidé</option>
              <option value="other">Autre</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Mesures de sécurité prévues :
            </label>
            <div className="space-y-2">
              {[
                'Chiffrement des données sensibles (SSL/TLS)',
                'Authentification à deux facteurs (2FA)',
                'Sauvegardes automatiques régulières',
                'Politique de mots de passe robustes',
                'Logs et monitoring des accès',
                'Plan de reprise après incident (DRP)'
              ].map((measure) => (
                <label key={measure} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    checked={(data.security_measures || []).includes(measure)}
                    onChange={(e) => {
                      const measures = data.security_measures || [];
                      const newMeasures = e.target.checked 
                        ? [...measures, measure]
                        : measures.filter((m: string) => m !== measure);
                      onUpdate({ ...data, security_measures: newMeasures });
                    }}
                  />
                  <span className="text-sm text-slate-700 leading-5">{measure}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Autres mesures de sécurité :
            </label>
            <textarea
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
              placeholder="Décrivez d'autres mesures de sécurité spécifiques..."
              value={data.other_security_measures || ''}
              onChange={(e) => onUpdate({ ...data, other_security_measures: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Résumé */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border border-red-200">
        <h4 className="font-semibold text-red-900 mb-4">⚖️ Résumé Légal & Sécurité</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-red-600 font-medium min-w-[180px]">Statut juridique :</span>
            <span className="text-red-800">
              {data.legal_status || 'Non défini'}
              {data.company_name && ` (${data.company_name})`}
            </span>
          </div>

          <div className="flex items-start space-x-2">
            <span className="text-red-600 font-medium min-w-[180px]">Aspects légaux :</span>
            <span className="text-red-800">
              {selectedAspectsCount}/{totalAspects} identifiés
            </span>
          </div>

          {selectedAspectsCount > 0 && (
            <div className="ml-[180px] space-y-1">
              {LEGAL_ASPECTS.filter(aspect => data.legal_aspects?.[aspect.key]).map((aspect) => (
                <div key={aspect.key} className="text-red-700 text-xs">
                  • {aspect.label}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-start space-x-2">
            <span className="text-red-600 font-medium min-w-[180px]">Accompagnement :</span>
            <span className="text-red-800">
              {data.legal_assistance || 'Non défini'}
            </span>
          </div>

          <div className="flex items-start space-x-2">
            <span className="text-red-600 font-medium min-w-[180px]">Hébergement données :</span>
            <span className="text-red-800">
              {data.data_hosting ? 
                (data.data_hosting === 'europe' ? 'Europe (RGPD compliant)' :
                 data.data_hosting === 'usa' ? 'États-Unis' :
                 data.data_hosting === 'local' ? 'Côte d\'Ivoire' :
                 data.data_hosting === 'cloud' ? 'Cloud international' :
                 data.data_hosting === 'not_decided' ? 'Pas encore décidé' :
                 'Autre')
                : 'Non défini'}
            </span>
          </div>

          <div className="flex items-start space-x-2">
            <span className="text-red-600 font-medium min-w-[180px]">Mesures de sécurité :</span>
            <span className="text-red-800">
              {(data.security_measures || []).length} mesure{(data.security_measures || []).length > 1 ? 's' : ''} prévue{(data.security_measures || []).length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-red-200">
          <p className="text-sm text-red-700">
            ⚠️ <strong>Important :</strong> Les aspects légaux et la sécurité sont cruciaux pour 
            la pérennité de votre plateforme. Ne les négligez pas ! Une non-conformité peut entraîner 
            des sanctions importantes et nuire à votre réputation.
          </p>
        </div>
      </div>

      {/* Recommandations */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-3">💡 Recommandations Légales</h4>
        
        <div className="space-y-3 text-sm text-blue-800">
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 font-bold">1.</span>
            <p>
              <strong>Priorité absolue :</strong> CGU/CGV et Politique de confidentialité doivent 
              être rédigés AVANT le lancement, même pour un MVP.
            </p>
          </div>

          <div className="flex items-start space-x-2">
            <span className="text-blue-600 font-bold">2.</span>
            <p>
              <strong>RGPD :</strong> Si vous collectez des données personnelles (nom, email, CV), 
              la conformité RGPD est obligatoire, même en Côte d'Ivoire pour toucher l'international.
            </p>
          </div>

          <div className="flex items-start space-x-2">
            <span className="text-blue-600 font-bold">3.</span>
            <p>
              <strong>Propriété intellectuelle :</strong> Protégez votre marque (dépôt OAPI) et 
              clarifiez la propriété des contenus de formation.
            </p>
          </div>

          <div className="flex items-start space-x-2">
            <span className="text-blue-600 font-bold">4.</span>
            <p>
              <strong>Certifications :</strong> Si vous délivrez des certificats "officiels", 
              assurez-vous d'avoir les agréments nécessaires auprès du MFPRA ou équivalent.
            </p>
          </div>

          <div className="flex items-start space-x-2">
            <span className="text-blue-600 font-bold">5.</span>
            <p>
              <strong>Conseil juridique :</strong> Investir dans un accompagnement juridique au 
              démarrage peut vous éviter des problèmes coûteux par la suite.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section12;
