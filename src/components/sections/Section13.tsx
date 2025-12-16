// src/components/sections/Section13.tsx - ÉTAPE 1
import React from 'react';

interface Section13Props {
  data?: any;
  onUpdate: (data: any) => void;
}

const FORMATION_FREQUENCIES = [
  'Hebdomadaire',
  'Mensuelle',
  'Trimestrielle',
  'Ponctuelle selon demande'
];

const FORMATION_FORMATS = [
  'Masterclass gratuites (type celle du 11-12 décembre)',
  'Formations courtes payantes (1-3 jours)',
  'Formations longues certifiantes (plusieurs semaines/mois)',
  'Webinaires en ligne',
  'Formations intra-entreprise (B2B)'
];

const THEMATIQUES = [
  { key: 'rh_paie', label: 'RH / Paie / Droit du travail' },
  { key: 'compta_finance', label: 'Comptabilité / Finance / Audit' },
  { key: 'management', label: 'Management / Leadership / Administration' },
  { key: 'gestion_projet', label: 'Gestion de projet' },
  { key: 'informatique', label: 'Informatique de Gestion' },
  { key: 'fiscalite', label: 'Fiscalité' },
  { key: 'dev_personnel', label: 'Développement personnel / Soft skills' },
  { key: 'reconversion', label: 'Reconversion professionnelle' }
];

const CONTENUS_DIGITALISABLES = [
  { key: 'supports', label: 'Supports de cours (PDF/PPT)' },
  { key: 'videos', label: 'Vidéos enregistrées' },
  { key: 'etudes_cas', label: 'Études de cas' },
  { key: 'quizz', label: 'Quizz/Évaluations' },
  { key: 'templates', label: 'Templates/Outils' }
];

const ETAT_CONTENUS = [
  'Prêts à l\'emploi (peuvent être mis en ligne immédiatement)',
  'À adapter (nécessitent reformatage pour le digital)',
  'À créer entièrement (tout est fait en présentiel sans support)',
  'Mix des trois'
];

const Section13: React.FC<Section13Props> = ({ data = {}, onUpdate }) => {
  // Handlers pour 13.1
  const handleFormatChange = (format: string, checked: boolean) => {
    const formats = data.formation_formats || [];
    const newFormats = checked 
      ? [...formats, format]
      : formats.filter((f: string) => f !== format);
    onUpdate({ ...data, formation_formats: newFormats });
  };

  // Handlers pour 13.2
  const handleThematiqueChange = (key: string, checked: boolean) => {
    const thematiques = { ...(data.thematiques_couvertes || {}) };
    if (checked) {
      thematiques[key] = { checked: true, details: '' };
    } else {
      delete thematiques[key];
    }
    onUpdate({ ...data, thematiques_couvertes: thematiques });
  };

  const handleThematiqueDetailsChange = (key: string, details: string) => {
    const thematiques = { ...(data.thematiques_couvertes || {}) };
    if (thematiques[key]) {
      thematiques[key] = { ...thematiques[key], details };
    }
    onUpdate({ ...data, thematiques_couvertes: thematiques });
  };

  const handleContenuDigitalisableChange = (thematique: string, contenu: string, value: boolean) => {
    const contenus = { ...(data.contenus_digitalisables || {}) };
    if (!contenus[thematique]) contenus[thematique] = {};
    contenus[thematique][contenu] = value;
    onUpdate({ ...data, contenus_digitalisables: contenus });
  };

  return (
    <div className="space-y-8">
      {/* En-tête de la section */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-200">
        <h2 className="text-xl font-bold text-orange-900 mb-3">
          📚 Section 13 : Capitalisation sur l'Existant CIFOP
        </h2>
        <p className="text-sm text-orange-700">
          Cette section est cruciale pour identifier et valoriser les ressources, contenus et 
          l'expertise que le CIFOP a déjà développés. L'objectif est de maximiser la réutilisation 
          de l'existant pour accélérer le lancement de la plateforme digitale.
        </p>
      </div>

      {/* 13.1 Formations & Masterclass Actuelles */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          13.1 Formations & Masterclass Actuelles
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Combien de formations/masterclass organisez-vous actuellement par an ?
          </label>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Nombre total :
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: 24"
                value={data.formations_par_an || ''}
                onChange={(e) => onUpdate({ ...data, formations_par_an: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Fréquence :
          </label>
          <div className="space-y-2">
            {FORMATION_FREQUENCIES.map((freq) => (
              <label key={freq} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="formation_frequency"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.formation_frequency === freq}
                  onChange={() => onUpdate({ ...data, formation_frequency: freq })}
                />
                <span className="text-sm text-slate-700 leading-5">{freq}</span>
              </label>
            ))}
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="formation_frequency"
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                checked={data.formation_frequency === 'Autre'}
                onChange={() => onUpdate({ ...data, formation_frequency: 'Autre' })}
              />
              <div className="flex-1">
                <span className="text-sm text-slate-700">Autre :</span>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Précisez la fréquence..."
                  value={data.formation_frequency_other || ''}
                  onChange={(e) => onUpdate({ ...data, formation_frequency_other: e.target.value })}
                  disabled={data.formation_frequency !== 'Autre'}
                />
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Format actuel de vos formations :
          </label>
          <div className="space-y-2">
            {FORMATION_FORMATS.map((format) => (
              <label key={format} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  checked={(data.formation_formats || []).includes(format)}
                  onChange={(e) => handleFormatChange(format, e.target.checked)}
                />
                <span className="text-sm text-slate-700 leading-5">{format}</span>
              </label>
            ))}
          </div>

          <div className="mt-3">
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Autre format..."
              value={data.formation_format_other || ''}
              onChange={(e) => onUpdate({ ...data, formation_format_other: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* 13.2 Thématiques & Contenus Existants */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          13.2 Thématiques & Contenus Existants
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Thématiques déjà couvertes par le CIFOP :
          </label>
          <p className="text-xs text-slate-500 mb-4">
            Cochez toutes les thématiques que vous enseignez actuellement
          </p>

          <div className="space-y-4">
            {THEMATIQUES.map((thematique) => {
              const isChecked = !!(data.thematiques_couvertes || {})[thematique.key];
              const details = (data.thematiques_couvertes || {})[thematique.key]?.details || '';

              return (
                <div key={thematique.key} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <label className="flex items-start space-x-3 cursor-pointer mb-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                      checked={isChecked}
                      onChange={(e) => handleThematiqueChange(thematique.key, e.target.checked)}
                    />
                    <span className="text-sm font-medium text-slate-700 flex-1">
                      {thematique.label}
                    </span>
                  </label>
                  
                  {isChecked && (
                    <div className="ml-7">
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Détails (formations spécifiques, modules, etc.) :
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Ex: Gestion de la paie, Calcul des charges sociales..."
                        value={details}
                        onChange={(e) => handleThematiqueDetailsChange(thematique.key, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Autre thématique */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Autre thématique :
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Précisez d'autres thématiques enseignées..."
                value={data.autre_thematique || ''}
                onChange={(e) => onUpdate({ ...data, autre_thematique: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Tableau des contenus digitalisables */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-4">
            Pour chaque thématique, avez-vous des contenus digitalisables ?
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full border border-blue-200 rounded-lg bg-white">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-blue-900 border-b border-blue-200">
                    Thématique
                  </th>
                  {CONTENUS_DIGITALISABLES.map((contenu) => (
                    <th key={contenu.key} className="px-4 py-3 text-center text-xs font-medium text-blue-900 border-b border-blue-200">
                      {contenu.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {THEMATIQUES.filter(t => (data.thematiques_couvertes || {})[t.key]).map((thematique) => (
                  <tr key={thematique.key} className="hover:bg-blue-25">
                    <td className="px-4 py-3 text-sm font-medium text-slate-700">
                      {thematique.label}
                    </td>
                    {CONTENUS_DIGITALISABLES.map((contenu) => (
                      <td key={contenu.key} className="px-4 py-3 text-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                            checked={!!(data.contenus_digitalisables || {})[thematique.key]?.[contenu.key]}
                            onChange={(e) => handleContenuDigitalisableChange(thematique.key, contenu.key, e.target.checked)}
                          />
                          <span className="sr-only">
                            {contenu.label} pour {thematique.label}
                          </span>
                        </label>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* État des contenus existants */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            État des contenus existants :
          </label>
          <div className="space-y-2">
            {ETAT_CONTENUS.map((etat) => (
              <label key={etat} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="etat_contenus"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.etat_contenus === etat}
                  onChange={() => onUpdate({ ...data, etat_contenus: etat })}
                />
                <span className="text-sm text-slate-700 leading-5">{etat}</span>
              </label>
            ))}
          </div>

          {data.etat_contenus === 'Mix des trois' && (
            <div className="mt-3">
              <textarea
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Précisez la répartition : quels contenus sont prêts, à adapter, ou à créer..."
                value={data.etat_contenus_precision || ''}
                onChange={(e) => onUpdate({ ...data, etat_contenus_precision: e.target.value })}
              />
            </div>
          )}
        </div>
      </div>

      

      {/* 13.3 Base d'Apprenants & Alumni */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          13.3 Base d'Apprenants & Alumni
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Nombre total d'apprenants formés par le CIFOP depuis sa création :
          </label>
          <div className="space-y-2">
            {[
              'Moins de 100',
              '100-500',
              '500-1 000',
              '1 000-2 500',
              '2 500-5 000',
              'Plus de 5 000'
            ].map((range) => (
              <label key={range} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="apprenants_total"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.apprenants_total === range}
                  onChange={() => onUpdate({ ...data, apprenants_total: range })}
                />
                <span className="text-sm text-slate-700 leading-5">{range}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Nombre d'apprenants sur les 12 derniers mois :
          </label>
          <input
            type="number"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 250"
            value={data.apprenants_12mois || ''}
            onChange={(e) => onUpdate({ ...data, apprenants_12mois: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Avez-vous une base de données de vos apprenants ?
          </label>
          <div className="space-y-2">
            {[
              'Oui, structurée et à jour (noms, contacts, formations suivies)',
              'Oui, mais partielle (certaines informations manquantes)',
              'Non, données dispersées (listes papier, Excel non centralisé)',
              'Non, aucune base de données'
            ].map((option) => (
              <label key={option} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="base_donnees"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.base_donnees === option}
                  onChange={() => onUpdate({ ...data, base_donnees: option })}
                />
                <span className="text-sm text-slate-700 leading-5">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Informations disponibles */}
        {data.base_donnees && !data.base_donnees.includes('Non,') && (
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-4">
              Quelles informations avez-vous ?
            </h4>
            <div className="space-y-2">
              {[
                'Noms et prénoms',
                'Emails',
                'Numéros de téléphone',
                'Formations suivies',
                'Résultats/Certifications obtenues',
                'Situation professionnelle actuelle',
                'Entreprise actuelle'
              ].map((info) => (
                <label key={info} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-slate-300 rounded"
                    checked={(data.infos_disponibles || []).includes(info)}
                    onChange={(e) => {
                      const infos = data.infos_disponibles || [];
                      const newInfos = e.target.checked 
                        ? [...infos, info]
                        : infos.filter((i: string) => i !== info);
                      onUpdate({ ...data, infos_disponibles: newInfos });
                    }}
                  />
                  <span className="text-sm text-slate-700 leading-5">{info}</span>
                </label>
              ))}

              <div className="mt-3">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Autres informations disponibles..."
                  value={data.autres_infos_disponibles || ''}
                  onChange={(e) => onUpdate({ ...data, autres_infos_disponibles: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Restez-vous en contact avec vos anciens apprenants ?
          </label>
          <div className="space-y-2">
            {[
              'Oui, régulièrement (newsletter, événements, réseau)',
              'Occasionnellement (groupes WhatsApp, réseaux sociaux)',
              'Non, pas de suivi post-formation'
            ].map((option) => (
              <label key={option} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="contact_alumni"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.contact_alumni === option}
                  onChange={() => onUpdate({ ...data, contact_alumni: option })}
                />
                <span className="text-sm text-slate-700 leading-5">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* 13.4 Résultats & Impact */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          13.4 Résultats & Impact
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Taux d'insertion professionnelle après vos formations :
          </label>
          <div className="space-y-2">
            {[
              'Moins de 20%',
              '20-40%',
              '40-60%',
              '60-80%',
              'Plus de 80%',
              'Non mesuré / Je ne sais pas'
            ].map((taux) => (
              <label key={taux} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="taux_insertion"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.taux_insertion === taux}
                  onChange={() => onUpdate({ ...data, taux_insertion: taux })}
                />
                <span className="text-sm text-slate-700 leading-5">{taux}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Avez-vous des success stories / témoignages documentés ?
          </label>
          <div className="space-y-2">
            {[
              'Oui, nombreux (vidéos, témoignages écrits)',
              'Oui, quelques-uns',
              'Non, mais disponibles si on les sollicite',
              'Non'
            ].map((option) => (
              <label key={option} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="success_stories"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.success_stories === option}
                  onChange={() => onUpdate({ ...data, success_stories: option })}
                />
                <span className="text-sm text-slate-700 leading-5">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Exemples de success stories */}
        {data.success_stories && !data.success_stories.includes('Non') && (
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-amber-900 mb-3">
              Exemples de success stories :
            </h4>
            <p className="text-xs text-amber-700 mb-4">
              Partagez 2-3 exemples concrets d'apprenants qui ont trouvé un emploi, 
              changé de carrière, ou progressé professionnellement grâce au CIFOP
            </p>

            <div className="space-y-4">
              {[0, 1, 2].map((index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Exemple {index + 1} :
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Prénom, parcours avant formation, formation suivie, résultat obtenu..."
                    value={(data.success_stories_exemples || [])[index] || ''}
                    onChange={(e) => {
                      const exemples = [...(data.success_stories_exemples || ['', '', ''])];
                      exemples[index] = e.target.value;
                      onUpdate({ ...data, success_stories_exemples: exemples });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Résumé Étape 2 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-4">
          📊 Résumé : Base d'Apprenants & Impact
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 font-medium min-w-[200px]">Apprenants formés :</span>
            <span className="text-blue-800">
              {data.apprenants_total || 'Non renseigné'}
            </span>
          </div>
          
          {data.apprenants_12mois && (
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 font-medium min-w-[200px]">Sur 12 mois :</span>
              <span className="text-blue-800">
                {data.apprenants_12mois} apprenants
              </span>
            </div>
          )}

          <div className="flex items-start space-x-2">
            <span className="text-blue-600 font-medium min-w-[200px]">Base de données :</span>
            <span className="text-blue-800">
              {data.base_donnees ? data.base_donnees.split('(')[0] : 'Non renseigné'}
            </span>
          </div>

          {data.infos_disponibles && data.infos_disponibles.length > 0 && (
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 font-medium min-w-[200px]">Informations détenues :</span>
              <span className="text-blue-800">
                {data.infos_disponibles.length} type{data.infos_disponibles.length > 1 ? 's' : ''} de données
              </span>
            </div>
          )}

          <div className="flex items-start space-x-2">
            <span className="text-blue-600 font-medium min-w-[200px]">Taux d'insertion :</span>
            <span className="text-blue-800">
              {data.taux_insertion || 'Non mesuré'}
            </span>
          </div>

          <div className="flex items-start space-x-2">
            <span className="text-blue-600 font-medium min-w-[200px]">Success stories :</span>
            <span className="text-blue-800">
              {data.success_stories || 'Non renseigné'}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-blue-200">
          <p className="text-sm text-blue-700">
            💡 <strong>Potentiel identifié :</strong> Une base solide d'anciens apprenants 
            représente un atout majeur pour le lancement de la plateforme digitale. Ils peuvent 
            devenir vos premiers utilisateurs, ambassadeurs et sources de témoignages.
          </p>
        </div>
      </div>
      
  

      {/* 13.5 Équipe & Formateurs */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          13.5 Équipe & Formateurs
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Nombre de formateurs/intervenants au CIFOP :
          </label>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Permanents :
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: 5"
                value={data.formateurs_permanents || ''}
                onChange={(e) => onUpdate({ ...data, formateurs_permanents: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Vacataires :
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: 15"
                value={data.formateurs_vacataires || ''}
                onChange={(e) => onUpdate({ ...data, formateurs_vacataires: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Experts externes ponctuels :
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: 10"
                value={data.formateurs_externes || ''}
                onChange={(e) => onUpdate({ ...data, formateurs_externes: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Profil des formateurs :
          </label>
          <div className="space-y-2">
            {[
              'Professionnels en activité (managers, DRH, comptables, etc.)',
              'Formateurs professionnels',
              'Consultants / Experts indépendants',
              'Universitaires / Enseignants',
              'Mix'
            ].map((profil) => (
              <label key={profil} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  checked={(data.profil_formateurs || []).includes(profil)}
                  onChange={(e) => {
                    const profils = data.profil_formateurs || [];
                    const newProfils = e.target.checked 
                      ? [...profils, profil]
                      : profils.filter((p: string) => p !== profil);
                    onUpdate({ ...data, profil_formateurs: newProfils });
                  }}
                />
                <span className="text-sm text-slate-700 leading-5">{profil}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-3">
            Les formateurs seraient-ils prêts à créer des contenus digitaux ?
          </h4>
          <div className="space-y-2">
            {[
              'Oui, déjà intéressés',
              'Probablement, à discuter',
              'Non, préfèrent le présentiel',
              'Je ne sais pas'
            ].map((option) => (
              <label key={option} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="formateurs_digital"
                  className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-300"
                  checked={data.formateurs_digital === option}
                  onChange={() => onUpdate({ ...data, formateurs_digital: option })}
                />
                <span className="text-sm text-slate-700 leading-5">{option}</span>
              </label>
            ))}
          </div>

          {(data.formateurs_digital === 'Oui, déjà intéressés' || data.formateurs_digital === 'Probablement, à discuter') && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-purple-800 mb-2">
                Nombre estimé de formateurs intéressés :
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Ex: 8"
                value={data.formateurs_digital_nombre || ''}
                onChange={(e) => onUpdate({ ...data, formateurs_digital_nombre: e.target.value })}
              />
            </div>
          )}

          {data.formateurs_digital === 'Non, préfèrent le présentiel' && (
            <div className="mt-4 p-3 bg-amber-100 rounded-lg border border-amber-300">
              <p className="text-xs text-amber-800">
                ⚠️ <strong>Point d'attention :</strong> Il faudra prévoir soit un accompagnement 
                pour convaincre/former les formateurs au digital, soit recruter de nouveaux 
                formateurs digitaux.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 13.6 Partenariats Existants */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          13.6 Partenariats Existants
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Le CIFOP a-t-il des partenariats formels avec :
          </label>

          {/* Entreprises qui recrutent */}
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-4">
            <h4 className="font-semibold text-slate-900 mb-3">
              Entreprises qui recrutent vos apprenants :
            </h4>
            <div className="space-y-2 mb-4">
              {[
                'Oui, plusieurs',
                'Quelques-uns',
                'Non, pas encore',
                'En discussion'
              ].map((option) => (
                <label key={option} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="partenaires_entreprises"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                    checked={data.partenaires_entreprises === option}
                    onChange={() => onUpdate({ ...data, partenaires_entreprises: option })}
                  />
                  <span className="text-sm text-slate-700 leading-5">{option}</span>
                </label>
              ))}
            </div>

            {(data.partenaires_entreprises === 'Oui, plusieurs' || data.partenaires_entreprises === 'Quelques-uns') && (
              <div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nombre d'entreprises partenaires :
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: 12"
                    value={data.partenaires_entreprises_nombre || ''}
                    onChange={(e) => onUpdate({ ...data, partenaires_entreprises_nombre: e.target.value })}
                  />
                </div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Principaux partenaires entreprises :
                </label>
                <div className="space-y-2">
                  {[0, 1, 2].map((index) => (
                    <input
                      key={index}
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Entreprise ${index + 1}`}
                      value={(data.partenaires_entreprises_liste || [])[index] || ''}
                      onChange={(e) => {
                        const liste = [...(data.partenaires_entreprises_liste || ['', '', ''])];
                        liste[index] = e.target.value;
                        onUpdate({ ...data, partenaires_entreprises_liste: liste });
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Organismes de certification */}
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-4">
            <h4 className="font-semibold text-slate-900 mb-3">
              Organismes de certification :
            </h4>
            <div className="space-y-2 mb-3">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="partenaires_certification"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.partenaires_certification === 'Oui'}
                  onChange={() => onUpdate({ ...data, partenaires_certification: 'Oui' })}
                />
                <span className="text-sm text-slate-700 leading-5">Oui</span>
              </label>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="partenaires_certification"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.partenaires_certification === 'Non'}
                  onChange={() => onUpdate({ ...data, partenaires_certification: 'Non' })}
                />
                <span className="text-sm text-slate-700 leading-5">Non</span>
              </label>
            </div>

            {data.partenaires_certification === 'Oui' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Lesquels :
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={2}
                  placeholder="Ex: AGEFOP, FDFP, certifications internationales..."
                  value={data.partenaires_certification_details || ''}
                  onChange={(e) => onUpdate({ ...data, partenaires_certification_details: e.target.value })}
                />
              </div>
            )}
          </div>

          {/* Autres centres de formation / Écoles */}
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-4">
            <h4 className="font-semibold text-slate-900 mb-3">
              Autres centres de formation / Écoles :
            </h4>
            <div className="space-y-2 mb-3">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="partenaires_centres"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.partenaires_centres === 'Oui'}
                  onChange={() => onUpdate({ ...data, partenaires_centres: 'Oui' })}
                />
                <span className="text-sm text-slate-700 leading-5">Oui</span>
              </label>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="partenaires_centres"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.partenaires_centres === 'Non'}
                  onChange={() => onUpdate({ ...data, partenaires_centres: 'Non' })}
                />
                <span className="text-sm text-slate-700 leading-5">Non</span>
              </label>
            </div>

            {data.partenaires_centres === 'Oui' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Lesquels :
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={2}
                  placeholder="Noms des centres de formation ou écoles partenaires..."
                  value={data.partenaires_centres_details || ''}
                  onChange={(e) => onUpdate({ ...data, partenaires_centres_details: e.target.value })}
                />
              </div>
            )}
          </div>

          {/* Institutions publiques */}
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-4">
            <h4 className="font-semibold text-slate-900 mb-3">
              Institutions publiques :
            </h4>
            <div className="space-y-2">
              {[
                'Ministère de l\'Emploi',
                'Ministère de la Formation Professionnelle',
                'FDFP (Fonds de Développement de la Formation Professionnelle)',
                'AGEFOP (Agence d\'Études et de Promotion de l\'Emploi)'
              ].map((institution) => (
                <label key={institution} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    checked={(data.partenaires_publics || []).includes(institution)}
                    onChange={(e) => {
                      const publics = data.partenaires_publics || [];
                      const newPublics = e.target.checked 
                        ? [...publics, institution]
                        : publics.filter((p: string) => p !== institution);
                      onUpdate({ ...data, partenaires_publics: newPublics });
                    }}
                  />
                  <span className="text-sm text-slate-700 leading-5">{institution}</span>
                </label>
              ))}

              <div className="mt-3">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Autre institution publique..."
                  value={data.partenaires_publics_autre || ''}
                  onChange={(e) => onUpdate({ ...data, partenaires_publics_autre: e.target.value })}
                />
              </div>

              {(data.partenaires_publics || []).length === 0 && !data.partenaires_publics_autre && (
                <label className="flex items-start space-x-3 cursor-pointer mt-2">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    checked={data.aucun_partenariat_public || false}
                    onChange={(e) => onUpdate({ ...data, aucun_partenariat_public: e.target.checked })}
                  />
                  <span className="text-sm text-slate-700 leading-5">Aucun partenariat public</span>
                </label>
              )}
            </div>
          </div>

          {/* Bailleurs internationaux / ONG */}
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-3">
              Bailleurs internationaux / ONG :
            </h4>
            <div className="space-y-2 mb-3">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="partenaires_bailleurs"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.partenaires_bailleurs === 'Oui'}
                  onChange={() => onUpdate({ ...data, partenaires_bailleurs: 'Oui' })}
                />
                <span className="text-sm text-slate-700 leading-5">Oui</span>
              </label>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="partenaires_bailleurs"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.partenaires_bailleurs === 'Non'}
                  onChange={() => onUpdate({ ...data, partenaires_bailleurs: 'Non' })}
                />
                <span className="text-sm text-slate-700 leading-5">Non</span>
              </label>
            </div>

            {data.partenaires_bailleurs === 'Oui' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Lesquels :
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={2}
                  placeholder="Ex: Banque Mondiale, AFD, GIZ, ONG locales..."
                  value={data.partenaires_bailleurs_details || ''}
                  onChange={(e) => onUpdate({ ...data, partenaires_bailleurs_details: e.target.value })}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Résumé Étape 3 */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
        <h4 className="font-semibold text-green-900 mb-4">
          👥 Résumé : Équipe & Écosystème
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-green-600 font-medium min-w-[220px]">Total formateurs :</span>
            <span className="text-green-800">
              {(parseInt(data.formateurs_permanents || '0') + 
                parseInt(data.formateurs_vacataires || '0') + 
                parseInt(data.formateurs_externes || '0')) || 'Non renseigné'}
            </span>
          </div>

          {data.profil_formateurs && data.profil_formateurs.length > 0 && (
            <div className="flex items-start space-x-2">
              <span className="text-green-600 font-medium min-w-[220px]">Profils :</span>
              <span className="text-green-800">
                {data.profil_formateurs.join(', ')}
              </span>
            </div>
          )}

          <div className="flex items-start space-x-2">
            <span className="text-green-600 font-medium min-w-[220px]">Prêts pour le digital :</span>
            <span className="text-green-800">
              {data.formateurs_digital || 'Non renseigné'}
            </span>
          </div>

          <div className="flex items-start space-x-2">
            <span className="text-green-600 font-medium min-w-[220px]">Partenaires entreprises :</span>
            <span className="text-green-800">
              {data.partenaires_entreprises || 'Non renseigné'}
            </span>
          </div>

          {data.partenaires_publics && data.partenaires_publics.length > 0 && (
            <div className="flex items-start space-x-2">
              <span className="text-green-600 font-medium min-w-[220px]">Institutions publiques :</span>
              <span className="text-green-800">
                {data.partenaires_publics.length} partenariat{data.partenaires_publics.length > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-green-200">
          <p className="text-sm text-green-700">
            💡 <strong>Atout majeur :</strong> Une équipe de formateurs qualifiés et des 
            partenariats établis constituent une base solide pour la crédibilité et le développement 
            de la plateforme digitale.
          </p>
        </div>
      </div>
      


      {/* 13.7 Relation Plateforme ↔ CIFOP */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          13.7 Relation Plateforme ↔ CIFOP
        </h3>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-4">
            Cette plateforme digitale sera-t-elle :
          </h4>
          <div className="space-y-3">
            {[
              {
                value: 'extension_cifop',
                label: 'Une extension 100% CIFOP (CIFOP Online / CIFOP Academy)',
                description: 'Même identité visuelle, même marque. Le CIFOP propose désormais du digital en plus du présentiel'
              },
              {
                value: 'nouvelle_entite_liee',
                label: 'Une nouvelle entité liée au CIFOP (exemple : CIFOP Digital, CIFOP+)',
                description: 'Nouvelle marque mais lien clair avec CIFOP. Le CIFOP reste en présentiel, la plateforme gère le digital'
              },
              {
                value: 'entite_independante',
                label: 'Une entité indépendante inspirée par l\'expérience CIFOP',
                description: 'Nouvelle marque, nouveau positionnement. Vous capitalisez sur votre expertise mais c\'est un nouveau projet'
              },
              {
                value: 'partenariat',
                label: 'Un partenariat CIFOP + autres acteurs',
                description: 'Co-création avec d\'autres centres/organisations'
              }
            ].map((option) => (
              <div key={option.value} className="bg-white p-4 rounded-lg border border-blue-200">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="relation_plateforme"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                    checked={data.relation_plateforme === option.value}
                    onChange={() => onUpdate({ ...data, relation_plateforme: option.value })}
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-slate-900 block mb-1">
                      {option.label}
                    </span>
                    <span className="text-xs text-slate-600">
                      {option.description}
                    </span>
                  </div>
                </label>
              </div>
            ))}

            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="relation_plateforme"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.relation_plateforme === 'autre'}
                  onChange={() => onUpdate({ ...data, relation_plateforme: 'autre' })}
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-slate-900 block mb-2">Autre :</span>
                  <textarea
                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                    rows={2}
                    placeholder="Décrivez votre vision de la relation..."
                    value={data.relation_plateforme_autre || ''}
                    onChange={(e) => onUpdate({ ...data, relation_plateforme_autre: e.target.value })}
                    disabled={data.relation_plateforme !== 'autre'}
                  />
                </div>
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Le nom de la plateforme sera-t-il :
          </label>
          <div className="space-y-2">
            {[
              'CIFOP Online',
              'CIFOP Academy',
              'CIFOP Digital',
              'Un nouveau nom distinct',
              'À définir ensemble'
            ].map((nom) => (
              <label key={nom} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="nom_plateforme"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.nom_plateforme === nom}
                  onChange={() => onUpdate({ ...data, nom_plateforme: nom })}
                />
                <span className="text-sm text-slate-700 leading-5">{nom}</span>
              </label>
            ))}
          </div>

          {data.nom_plateforme === 'Un nouveau nom distinct' && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Précisez si déjà imaginé :
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nom envisagé pour la plateforme..."
                value={data.nom_plateforme_nouveau || ''}
                onChange={(e) => onUpdate({ ...data, nom_plateforme_nouveau: e.target.value })}
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Gouvernance :
          </label>
          <div className="space-y-2">
            {[
              'Vous gérez seul',
              'Équipe CIFOP dédiée',
              'Structure juridique séparée',
              'À définir'
            ].map((option) => (
              <label key={option} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="gouvernance"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.gouvernance === option}
                  onChange={() => onUpdate({ ...data, gouvernance: option })}
                />
                <span className="text-sm text-slate-700 leading-5">{option}</span>
              </label>
            ))}
          </div>

          {data.gouvernance === 'Équipe CIFOP dédiée' && (
            <div className="mt-3 bg-green-50 p-4 rounded-lg border border-green-200">
              <label className="block text-sm font-medium text-green-800 mb-2">
                Taille de l'équipe dédiée envisagée :
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ex: 3"
                value={data.gouvernance_equipe_taille || ''}
                onChange={(e) => onUpdate({ ...data, gouvernance_equipe_taille: e.target.value })}
              />
            </div>
          )}
        </div>
      </div>

      {/* 13.8 Avantages Concurrentiels du CIFOP */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          13.8 Avantages Concurrentiels du CIFOP
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Qu'est-ce qui fait la force du CIFOP aujourd'hui ?
          </label>
          <p className="text-xs text-slate-500 mb-4">
            Cochez tout ce qui s'applique
          </p>

          <div className="space-y-2">
            {[
              'Expertise reconnue (années d\'expérience, réputation)',
              'Qualité pédagogique (taux de satisfaction élevé)',
              'Formateurs de haut niveau (professionnels en activité)',
              'Approche pratique (cas réels, mises en situation)',
              'Réseau d\'entreprises partenaires',
              'Taux d\'insertion élevé',
              'Prix compétitifs',
              'Proximité / Accompagnement personnalisé',
              'Certifications reconnues'
            ].map((force) => (
              <label key={force} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  checked={(data.forces_cifop || []).includes(force)}
                  onChange={(e) => {
                    const forces = data.forces_cifop || [];
                    const newForces = e.target.checked 
                      ? [...forces, force]
                      : forces.filter((f: string) => f !== force);
                    onUpdate({ ...data, forces_cifop: newForces });
                  }}
                />
                <span className="text-sm text-slate-700 leading-5">{force}</span>
              </label>
            ))}

            <div className="mt-3">
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Autres forces spécifiques..."
                value={data.forces_cifop_autre || ''}
                onChange={(e) => onUpdate({ ...data, forces_cifop_autre: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-3">
            Comment la plateforme pourrait-elle amplifier ces forces ?
          </h4>
          <p className="text-xs text-purple-700 mb-4">
            Exemple : "Notre approche pratique pourrait devenir des simulations interactives en ligne, 
            nos formateurs pourraient animer des webinaires mensuels, etc."
          </p>
          <textarea
            className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={5}
            placeholder="Décrivez comment le digital peut multiplier vos forces existantes..."
            value={data.amplification_forces || ''}
            onChange={(e) => onUpdate({ ...data, amplification_forces: e.target.value })}
          />
        </div>

        {/* Matrice Forces x Digital */}
        {(data.forces_cifop || []).length > 0 && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200">
            <h4 className="font-semibold text-indigo-900 mb-4">
              💎 Matrice : Vos Forces → Opportunités Digitales
            </h4>
            <div className="space-y-4">
              {(data.forces_cifop || []).slice(0, 3).map((force: string, index: number) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-indigo-200">
                  <div className="flex items-start space-x-3 mb-2">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-600 text-white text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-900 flex-1">{force}</span>
                  </div>
                  <textarea
                    className="w-full px-3 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm"
                    rows={2}
                    placeholder="Comment exploiter cette force sur la plateforme digitale ?"
                    value={(data.matrice_forces || {})[force] || ''}
                    onChange={(e) => {
                      const matrice = { ...(data.matrice_forces || {}) };
                      matrice[force] = e.target.value;
                      onUpdate({ ...data, matrice_forces: matrice });
                    }}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-indigo-700 mt-4">
              💡 Cette réflexion vous aidera à construire une proposition de valeur unique qui capitalise 
              sur vos atouts existants.
            </p>
          </div>
        )}
      </div>

      {/* Résumé Étape 4 */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
        <h4 className="font-semibold text-orange-900 mb-4">
          🎯 Résumé : Positionnement & Forces
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-orange-600 font-medium min-w-[220px]">Relation plateforme :</span>
            <span className="text-orange-800">
              {data.relation_plateforme === 'extension_cifop' ? 'Extension 100% CIFOP' :
               data.relation_plateforme === 'nouvelle_entite_liee' ? 'Nouvelle entité liée' :
               data.relation_plateforme === 'entite_independante' ? 'Entité indépendante' :
               data.relation_plateforme === 'partenariat' ? 'Partenariat' :
               data.relation_plateforme === 'autre' ? 'Autre approche' :
               'Non défini'}
            </span>
          </div>

          <div className="flex items-start space-x-2">
            <span className="text-orange-600 font-medium min-w-[220px]">Nom envisagé :</span>
            <span className="text-orange-800">
              {data.nom_plateforme === 'Un nouveau nom distinct' && data.nom_plateforme_nouveau 
                ? data.nom_plateforme_nouveau 
                : data.nom_plateforme || 'Non défini'}
            </span>
          </div>

          <div className="flex items-start space-x-2">
            <span className="text-orange-600 font-medium min-w-[220px]">Gouvernance :</span>
            <span className="text-orange-800">
              {data.gouvernance || 'Non défini'}
            </span>
          </div>

          {data.forces_cifop && data.forces_cifop.length > 0 && (
            <div className="flex items-start space-x-2">
              <span className="text-orange-600 font-medium min-w-[220px]">Forces identifiées :</span>
              <span className="text-orange-800">
                {data.forces_cifop.length} avantage{data.forces_cifop.length > 1 ? 's' : ''} concurrentiel{data.forces_cifop.length > 1 ? 's' : ''}
              </span>
            </div>
          )}

          {data.forces_cifop && data.forces_cifop.length > 0 && (
            <div className="ml-[220px] space-y-1 mt-2">
              {data.forces_cifop.slice(0, 5).map((force: string, index: number) => (
                <div key={index} className="text-orange-700 text-xs flex items-start">
                  <span className="mr-2">✓</span>
                  <span>{force}</span>
                </div>
              ))}
              {data.forces_cifop.length > 5 && (
                <div className="text-orange-600 text-xs italic">
                  + {data.forces_cifop.length - 5} autre{data.forces_cifop.length - 5 > 1 ? 's' : ''}...
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-orange-200">
          <p className="text-sm text-orange-700">
            💡 <strong>Insight clé :</strong> Une stratégie de positionnement claire et l'identification 
            précise de vos forces sont essentielles pour vous différencier dans un marché concurrentiel. 
            Le digital doit amplifier vos atouts, pas les diluer.
          </p>
        </div>
      </div>
      
      
      


      {/* 13.9 Objectifs Spécifiques de Digitalisation */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          13.9 Objectifs Spécifiques de Digitalisation
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Pourquoi digitaliser maintenant ?
          </label>
          <p className="text-xs text-slate-500 mb-4">
            Cochez vos motivations principales
          </p>

          <div className="space-y-2">
            {[
              'Scaler l\'impact (toucher 10x plus d\'apprenants)',
              'Réduire les coûts opérationnels (moins de salles, logistique)',
              'Créer des revenus récurrents (abonnements vs ponctuel)',
              'Toucher la diaspora ivoirienne (Europe, Amérique, autres pays africains)',
              'Couvrir tout le territoire ivoirien (zones rurales, autres villes)',
              'S\'adapter au digital (tendance post-COVID)',
              'Concurrencer les plateformes internationales (OpenClassrooms, Udemy)',
              'Valoriser le patrimoine CIFOP (capitaliser sur 10+ ans d\'expertise)'
            ].map((motivation) => (
              <label key={motivation} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  checked={(data.motivations_digitalisation || []).includes(motivation)}
                  onChange={(e) => {
                    const motivations = data.motivations_digitalisation || [];
                    const newMotivations = e.target.checked 
                      ? [...motivations, motivation]
                      : motivations.filter((m: string) => m !== motivation);
                    onUpdate({ ...data, motivations_digitalisation: newMotivations });
                  }}
                />
                <span className="text-sm text-slate-700 leading-5">{motivation}</span>
              </label>
            ))}

            <div className="mt-3">
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Autre motivation..."
                value={data.motivation_autre || ''}
                onChange={(e) => onUpdate({ ...data, motivation_autre: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
          <h4 className="font-semibold text-amber-900 mb-3">
            Quelle métrique de succès serait LA plus importante pour vous dans 2 ans ?
          </h4>
          <p className="text-xs text-amber-700 mb-4">
            Sélectionnez UNE seule métrique prioritaire
          </p>

          <div className="space-y-3">
            {[
              { key: 'apprenants', label: 'Nombre d\'apprenants actifs', placeholder: 'Objectif : ex: 10 000' },
              { key: 'ca', label: 'Chiffre d\'affaires récurrent', placeholder: 'Objectif : ex: 50 000 000 FCFA/mois' },
              { key: 'insertion', label: 'Taux d\'insertion professionnelle', placeholder: 'Objectif : ex: 75%' },
              { key: 'certifications', label: 'Nombre de certifications délivrées', placeholder: 'Objectif : ex: 5 000' },
              { key: 'reconnaissance', label: 'Reconnaissance nationale (prix, médias, partenariats)', placeholder: 'Décrivez l\'objectif' },
              { key: 'expansion', label: 'Expansion régionale (Afrique de l\'Ouest)', placeholder: 'Nombre de pays : ex: 5' }
            ].map((metrique) => (
              <div key={metrique.key} className="bg-white p-4 rounded-lg border border-amber-200">
                <label className="flex items-start space-x-3 cursor-pointer mb-2">
                  <input
                    type="radio"
                    name="metrique_prioritaire"
                    className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-slate-300"
                    checked={data.metrique_prioritaire === metrique.key}
                    onChange={() => onUpdate({ ...data, metrique_prioritaire: metrique.key })}
                  />
                  <span className="text-sm font-medium text-slate-900">
                    {metrique.label}
                  </span>
                </label>
                {data.metrique_prioritaire === metrique.key && (
                  <div className="ml-7">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                      placeholder={metrique.placeholder}
                      value={data.metrique_objectif || ''}
                      onChange={(e) => onUpdate({ ...data, metrique_objectif: e.target.value })}
                    />
                  </div>
                )}
              </div>
            ))}

            <div className="bg-white p-4 rounded-lg border border-amber-200">
              <label className="flex items-start space-x-3 cursor-pointer mb-2">
                <input
                  type="radio"
                  name="metrique_prioritaire"
                  className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-slate-300"
                  checked={data.metrique_prioritaire === 'autre'}
                  onChange={() => onUpdate({ ...data, metrique_prioritaire: 'autre' })}
                />
                <span className="text-sm font-medium text-slate-900">Autre :</span>
              </label>
              {data.metrique_prioritaire === 'autre' && (
                <div className="ml-7">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                    placeholder="Précisez la métrique et l'objectif..."
                    value={data.metrique_autre || ''}
                    onChange={(e) => onUpdate({ ...data, metrique_autre: e.target.value })}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 13.10 Transition Présentiel → Digital */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          13.10 Transition Présentiel → Digital
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Envisagez-vous de :
          </label>
          <div className="space-y-3">
            {[
              {
                value: 'hybride',
                label: 'Maintenir le présentiel ET ajouter le digital (modèle hybride)',
                description: 'Le CIFOP continue ses formations en salle + nouvelle offre digitale'
              },
              {
                value: 'basculement_progressif',
                label: 'Basculer progressivement vers 100% digital',
                description: 'Arrêt progressif du présentiel au profit du tout digital'
              },
              {
                value: 'digital_appel',
                label: 'Le digital comme produit d\'appel, monétisation sur présentiel',
                description: 'Gratuit/accessible en ligne pour attirer, formations premium en présentiel'
              }
            ].map((option) => (
              <div key={option.value} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="strategie_transition"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                    checked={data.strategie_transition === option.value}
                    onChange={() => onUpdate({ ...data, strategie_transition: option.value })}
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-slate-900 block mb-1">
                      {option.label}
                    </span>
                    <span className="text-xs text-slate-600">
                      {option.description}
                    </span>
                  </div>
                </label>
              </div>
            ))}

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="strategie_transition"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.strategie_transition === 'autre'}
                  onChange={() => onUpdate({ ...data, strategie_transition: 'autre' })}
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-slate-900 block mb-2">Autre stratégie :</span>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                    rows={2}
                    placeholder="Décrivez votre stratégie de transition..."
                    value={data.strategie_transition_autre || ''}
                    onChange={(e) => onUpdate({ ...data, strategie_transition_autre: e.target.value })}
                    disabled={data.strategie_transition !== 'autre'}
                  />
                </div>
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Les masterclass gratuites actuelles deviendront :
          </label>
          <div className="space-y-2">
            {[
              'Des webinaires gratuits en live (même concept, en ligne)',
              'Des formations enregistrées gratuites (replay accessible)',
              'Un mix (live gratuit + replay payant)'
            ].map((option) => (
              <label key={option} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="masterclass_digital"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.masterclass_digital === option}
                  onChange={() => onUpdate({ ...data, masterclass_digital: option })}
                />
                <span className="text-sm text-slate-700 leading-5">{option}</span>
              </label>
            ))}

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="masterclass_digital"
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                checked={data.masterclass_digital === 'autre'}
                onChange={() => onUpdate({ ...data, masterclass_digital: 'autre' })}
              />
              <div className="flex-1">
                <span className="text-sm text-slate-700">Autre :</span>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Précisez..."
                  value={data.masterclass_digital_autre || ''}
                  onChange={(e) => onUpdate({ ...data, masterclass_digital_autre: e.target.value })}
                  disabled={data.masterclass_digital !== 'autre'}
                />
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Le présentiel se concentrera sur :
          </label>
          <div className="space-y-2">
            {[
              'Formations premium / certifications avancées',
              'Accompagnement personnalisé / coaching',
              'Événements communautaires (networking)',
              'Sessions pratiques (labs, ateliers)',
              'Tout reste en présentiel (digital = complément)'
            ].map((focus) => (
              <label key={focus} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  checked={(data.presentiel_focus || []).includes(focus)}
                  onChange={(e) => {
                    const focuses = data.presentiel_focus || [];
                    const newFocuses = e.target.checked 
                      ? [...focuses, focus]
                      : focuses.filter((f: string) => f !== focus);
                    onUpdate({ ...data, presentiel_focus: newFocuses });
                  }}
                />
                <span className="text-sm text-slate-700 leading-5">{focus}</span>
              </label>
            ))}

            <div className="mt-3">
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Autre focus présentiel..."
                value={data.presentiel_focus_autre || ''}
                onChange={(e) => onUpdate({ ...data, presentiel_focus_autre: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Résumé Final de la Section 13 */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-xl border border-blue-700 text-white">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <span className="mr-3">🎯</span>
          RÉSUMÉ COMPLET : CAPITALISATION CIFOP
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Colonne 1 : État des lieux */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-blue-100">📊 État des Lieux</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-200">Formations/an :</span>
                  <span className="font-medium">{data.formations_par_an || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Apprenants formés :</span>
                  <span className="font-medium">{data.apprenants_total || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Formateurs :</span>
                  <span className="font-medium">
                    {(parseInt(data.formateurs_permanents || '0') + 
                      parseInt(data.formateurs_vacataires || '0') + 
                      parseInt(data.formateurs_externes || '0')) || '—'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Taux d'insertion :</span>
                  <span className="font-medium">{data.taux_insertion || '—'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-blue-100">🎓 Thématiques</h4>
              <div className="text-sm">
                {Object.keys(data.thematiques_couvertes || {}).length > 0 ? (
                  <span>{Object.keys(data.thematiques_couvertes || {}).length} thématiques enseignées</span>
                ) : (
                  <span className="text-blue-200">Non renseigné</span>
                )}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-blue-100">🤝 Partenariats</h4>
              <div className="text-sm space-y-1">
                <div>Entreprises : {data.partenaires_entreprises || '—'}</div>
                <div>Institutions : {(data.partenaires_publics || []).length || 0}</div>
              </div>
            </div>
          </div>

          {/* Colonne 2 : Vision digitale */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-blue-100">🚀 Vision Digitale</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-blue-200">Positionnement :</span>
                  <div className="font-medium mt-1">
                    {data.relation_plateforme === 'extension_cifop' ? 'Extension CIFOP' :
                     data.relation_plateforme === 'nouvelle_entite_liee' ? 'Nouvelle entité liée' :
                     data.relation_plateforme === 'entite_independante' ? 'Entité indépendante' :
                     data.relation_plateforme === 'partenariat' ? 'Partenariat' :
                     '—'}
                  </div>
                </div>
                <div>
                  <span className="text-blue-200">Nom :</span>
                  <div className="font-medium mt-1">
                    {data.nom_plateforme === 'Un nouveau nom distinct' && data.nom_plateforme_nouveau 
                      ? data.nom_plateforme_nouveau 
                      : data.nom_plateforme || '—'}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-blue-100">💪 Forces</h4>
              <div className="text-sm">
                {(data.forces_cifop || []).length > 0 ? (
                  <span>{data.forces_cifop.length} avantages identifiés</span>
                ) : (
                  <span className="text-blue-200">Non renseigné</span>
                )}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-blue-100">🎯 Objectif 2 ans</h4>
              <div className="text-sm">
                {data.metrique_prioritaire ? (
                  <div>
                    <div className="font-medium">
                      {data.metrique_prioritaire === 'apprenants' ? 'Apprenants actifs' :
                       data.metrique_prioritaire === 'ca' ? 'CA récurrent' :
                       data.metrique_prioritaire === 'insertion' ? 'Taux d\'insertion' :
                       data.metrique_prioritaire === 'certifications' ? 'Certifications' :
                       data.metrique_prioritaire === 'reconnaissance' ? 'Reconnaissance' :
                       data.metrique_prioritaire === 'expansion' ? 'Expansion régionale' :
                       'Autre'}
                    </div>
                    {data.metrique_objectif && (
                      <div className="text-blue-100 mt-1">{data.metrique_objectif}</div>
                    )}
                  </div>
                ) : (
                  <span className="text-blue-200">Non défini</span>
                )}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-blue-100">🔄 Transition</h4>
              <div className="text-sm">
                {data.strategie_transition === 'hybride' ? 'Modèle hybride' :
                 data.strategie_transition === 'basculement_progressif' ? '100% digital progressif' :
                 data.strategie_transition === 'digital_appel' ? 'Digital = produit d\'appel' :
                 data.strategie_transition === 'autre' ? 'Stratégie personnalisée' :
                 '—'}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-blue-400">
          <p className="text-blue-100 text-sm leading-relaxed">
            <strong>🎓 Message clé :</strong> Le CIFOP dispose d'une base solide pour réussir sa transformation digitale. 
            En capitalisant sur son expertise, ses formateurs, ses apprenants et ses partenariats existants, 
            la plateforme peut devenir une référence de la formation professionnelle en ligne en Côte d'Ivoire 
            et en Afrique de l'Ouest.
          </p>
        </div>
      </div>

      {/* Fin du composant Section13 */}
    </div>
  );
};

export default Section13;
