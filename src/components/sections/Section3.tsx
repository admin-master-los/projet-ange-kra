import React from 'react';
import { SectionProps } from '../../types';

const MODULE_A_FEATURES = [
  { key: 'test_orientation', label: 'Test d\'orientation (questionnaire personnalité/intérêts)', detail: 'Type de test souhaité' },
  { key: 'fiches_metiers', label: 'Fiches métiers détaillées (description, compétences, salaires)', detail: 'Nombre de métiers' },
  { key: 'visualisation_debouches', label: 'Visualisation des débouchés par métier', detail: 'Source des données débouchés' },
  { key: 'recommandations', label: 'Recommandations de métiers basées sur le profil', detail: 'Algorithme simple ou IA ?' },
  { key: 'témoignages', label: 'Témoignages de professionnels en poste', detail: 'Vidéos ou textes ?' }
];

const MODULE_B_FEATURES = [
  { key: 'catalogue_formations', label: 'Catalogue de formations par métier', detail: 'Nombre de formations au lancement' },
  { key: 'videos_cours', label: 'Vidéos de cours', detail: 'Qui crée les contenus ?' },
  { key: 'quizz_evaluations', label: 'Quizz & évaluations', detail: '' },
  { key: 'certificats', label: 'Certificats de fin de formation', detail: 'Certificat reconnu officiellement ?' },
  { key: 'suivi_progression', label: 'Suivi de progression (tableau de bord apprenant)', detail: '' },
  { key: 'espace_instructeur', label: 'Espace instructeur (pour créer des cours)', detail: 'Modèle marketplace ?' },
  { key: 'forum_communaute', label: 'Forum/communauté d\'entraide', detail: '' },
  { key: 'telechargement_offline', label: 'Téléchargement des cours hors-ligne', detail: '' }
];

const MODULE_C_FEATURES = [
  { key: 'formulaire_guide', label: 'Formulaire guidé de saisie d\'informations', detail: '' },
  { key: 'templates_cv', label: 'Templates de CV modernes et variés', detail: 'Nombre de templates' },
  { key: 'cv_adapte', label: 'CV adapté automatiquement au métier visé', detail: 'IA ou règles prédéfinies ?' },
  { key: 'export_pdf', label: 'Export PDF professionnel', detail: '' },
  { key: 'conseils_personnalises', label: 'Conseils personnalisés pour améliorer le CV', detail: '' },
  { key: 'competences_formations', label: 'Section "compétences" basée sur les formations suivies', detail: '' },
  { key: 'lettre_motivation', label: 'Génération automatique de lettre de motivation', detail: '' }
];

const MODULE_D_FEATURES = [
  { key: 'offres_emploi', label: 'Offres d\'emploi/stages', detail: 'Source' },
  { key: 'matching_automatique', label: 'Matching automatique profil ↔ offres', detail: '' },
  { key: 'statistiques_marche', label: 'Statistiques du marché de l\'emploi par métier', detail: 'Données de où ?' },
  { key: 'annuaire_entreprises', label: 'Annuaire d\'entreprises qui recrutent', detail: '' },
  { key: 'alertes_emploi', label: 'Alertes emploi personnalisées', detail: '' },
  { key: 'connexion_recruteurs', label: 'Connexion avec recruteurs/entreprises', detail: 'Type LinkedIn ?' }
];

const MODULE_E_FEATURES = [
  { key: 'profil_utilisateur', label: 'Profil utilisateur (photo, bio, compétences)', detail: '' },
  { key: 'historique_formations', label: 'Historique des formations suivies', detail: '' },
  { key: 'certifications_obtenues', label: 'Certifications obtenues', detail: '' },
  { key: 'cv_accessible', label: 'CV généré accessible en permanence', detail: '' },
  { key: 'recommandations_perso', label: 'Recommandations personnalisées', detail: '' },
  { key: 'objectifs_carriere', label: 'Objectifs de carrière et suivi', detail: '' },
  { key: 'statistiques_progression', label: 'Statistiques de progression', detail: '' }
];

const MODULE_F_FEATURES = [
  { key: 'badges_recompenses', label: 'Badges & récompenses', detail: '' },
  { key: 'points_niveaux', label: 'Points/niveaux (progression ludique)', detail: '' },
  { key: 'classements', label: 'Classements (leaderboards)', detail: '' },
  { key: 'challenges_quetes', label: 'Challenges/quêtes à accomplir', detail: '' },
  { key: 'systeme_parrainage', label: 'Système de parrainage', detail: '' }
];

const MODULE_G_FEATURES = [
  { key: 'dashboard_admin', label: 'Dashboard administrateur', detail: '' },
  { key: 'gestion_utilisateurs', label: 'Gestion des utilisateurs', detail: '' },
  { key: 'gestion_formations', label: 'Gestion des formations (CRUD)', detail: '' },
  { key: 'statistiques_analytics', label: 'Statistiques & analytics', detail: '' },
  { key: 'gestion_paiements', label: 'Gestion des paiements (si payant)', detail: '' },
  { key: 'moderation', label: 'Modération (commentaires, forum)', detail: '' },
  { key: 'gestion_partenaires', label: 'Gestion des partenaires/entreprises', detail: '' }
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

  const renderModuleTable = (moduleKey: string, features: any[], title: string, description: string) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600 mt-1">{description}</p>
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
            {features.map((feature, index) => {
              const featureData = data[moduleKey]?.features?.[feature.key] || {};
              return (
                <tr key={feature.key} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {feature.label}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      className="w-20 px-2 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      value={featureData.priority || ''}
                      onChange={(e) => handleFeaturePriorityChange(moduleKey, feature.key, e.target.value)}
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
                      onChange={(e) => handleFeatureDetailChange(moduleKey, feature.key, e.target.value)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

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

      {/* MODULE A */}
      {renderModuleTable('moduleA', MODULE_A_FEATURES, 'MODULE A : Orientation Professionnelle', 'Aider l\'utilisateur à identifier les métiers qui lui correspondent')}
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Autres fonctionnalités d'orientation que vous imaginez :
        </label>
        <textarea
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
          placeholder="Décrivez d'autres fonctionnalités pour l'orientation professionnelle..."
          value={data.moduleA?.otherFeatures || ''}
          onChange={(e) => onUpdate({ ...data, moduleA: { ...data.moduleA, otherFeatures: e.target.value } })}
        />
      </div>

      {/* MODULE B */}
      {renderModuleTable('moduleB', MODULE_B_FEATURES, 'MODULE B : Formation & E-Learning', 'Proposer des formations pour acquérir des compétences')}
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Source des formations :
        </label>
        <div className="space-y-2">
          {['Vous créez tout le contenu vous-même', 'Partenariat avec organismes de formation existants', 'Marketplace (instructeurs indépendants créent les cours)', 'Agrégation de contenus existants (YouTube, MOOCs, etc.)'].map((source) => (
            <label key={source} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                checked={(data.moduleB?.sources || []).includes(source)}
                onChange={(e) => {
                  const sources = data.moduleB?.sources || [];
                  const newSources = e.target.checked 
                    ? [...sources, source]
                    : sources.filter((s: string) => s !== source);
                  onUpdate({ ...data, moduleB: { ...data.moduleB, sources: newSources } });
                }}
              />
              <span className="text-sm text-slate-700 leading-5">{source}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nombre de formations prévues au lancement :
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 10"
            value={data.moduleB?.launchFormations || ''}
            onChange={(e) => onUpdate({ ...data, moduleB: { ...data.moduleB, launchFormations: e.target.value } })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Durée moyenne d'une formation (heures) :
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 20"
            value={data.moduleB?.avgDuration || ''}
            onChange={(e) => onUpdate({ ...data, moduleB: { ...data.moduleB, avgDuration: e.target.value } })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Modèle de tarification :
        </label>
        <select
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={data.moduleB?.pricingModel || ''}
          onChange={(e) => onUpdate({ ...data, moduleB: { ...data.moduleB, pricingModel: e.target.value } })}
        >
          <option value="">Sélectionnez un modèle</option>
          <option value="100% gratuites">100% gratuites</option>
          <option value="100% payantes">100% payantes</option>
          <option value="Modèle freemium">Modèle freemium (base gratuite + premium payant)</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      {/* MODULE C */}
      {renderModuleTable('moduleC', MODULE_C_FEATURES, 'MODULE C : Création de CV Intelligente', 'Générateur de CV adapté au profil et au métier visé')}
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Inspiration CVBoost - Qu'aimez-vous dans cet outil ?
        </label>
        <textarea
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
          placeholder="Décrivez ce qui vous plaît dans CVBoost..."
          value={data.moduleC?.cvboostInspiration || ''}
          onChange={(e) => onUpdate({ ...data, moduleC: { ...data.moduleC, cvboostInspiration: e.target.value } })}
        />
      </div>

      {/* MODULE D */}
      {renderModuleTable('moduleD', MODULE_D_FEATURES, 'MODULE D : Débouchés & Insertion Professionnelle', 'Connecter les apprenants avec des opportunités réelles')}
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Partenariats entreprises :
        </label>
        <div className="space-y-2">
          {['Oui, j\'ai des entreprises partenaires potentielles', 'Non, à développer', 'En discussion'].map((option) => (
            <label key={option} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="partnerships"
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                checked={data.moduleD?.partnerships === option}
                onChange={() => onUpdate({ ...data, moduleD: { ...data.moduleD, partnerships: option } })}
              />
              <span className="text-sm text-slate-700 leading-5">{option}</span>
            </label>
          ))}
        </div>
        {data.moduleD?.partnerships === 'Oui, j\'ai des entreprises partenaires potentielles' && (
          <div className="mt-3">
            <input
              type="number"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nombre d'entreprises partenaires"
              value={data.moduleD?.partnerCount || ''}
              onChange={(e) => onUpdate({ ...data, moduleD: { ...data.moduleD, partnerCount: e.target.value } })}
            />
          </div>
        )}
      </div>

      {/* MODULE E */}
      {renderModuleTable('moduleE', MODULE_E_FEATURES, 'MODULE E : Profil & Tableau de Bord Utilisateur', 'Espace personnel de l\'apprenant')}

      {/* MODULE F */}
      {renderModuleTable('moduleF', MODULE_F_FEATURES, 'MODULE F : Gamification & Engagement', 'Rendre l\'expérience plus engageante et motivante')}
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Approche gamifiée souhaitée :
        </label>
        <div className="space-y-2">
          {['Oui, beaucoup (type Duolingo)', 'Oui, modérément', 'Non, rester sérieux/professionnel', 'Je ne sais pas'].map((option) => (
            <label key={option} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="gamification"
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                checked={data.moduleF?.gamificationLevel === option}
                onChange={() => onUpdate({ ...data, moduleF: { ...data.moduleF, gamificationLevel: option } })}
              />
              <span className="text-sm text-slate-700 leading-5">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* MODULE G */}
      {renderModuleTable('moduleG', MODULE_G_FEATURES, 'MODULE G : Administration & Gestion', 'Back-office pour gérer la plateforme')}

      {/* Fonctionnalités Supplémentaires */}
      <div className="space-y-6 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900">3.2 Fonctionnalités Supplémentaires</h3>
        <p className="text-sm text-purple-700">
          Y a-t-il d'autres fonctionnalités que vous imaginez et qui ne sont pas listées ci-dessus ?
        </p>
        <textarea
          className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          rows={5}
          placeholder="Décrivez toutes les autres fonctionnalités que vous imaginez pour votre plateforme..."
          value={data.additionalFeatures || ''}
          onChange={(e) => onUpdate({ ...data, additionalFeatures: e.target.value })}
        />
      </div>

      {/* Résumé des modules */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-4">📊 Résumé de vos modules</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-blue-800 font-medium">Module A (Orientation):</span>
              <span className="text-blue-600">{Object.keys(data.moduleA?.features || {}).length} fonctionnalités</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-800 font-medium">Module B (Formation):</span>
              <span className="text-blue-600">{Object.keys(data.moduleB?.features || {}).length} fonctionnalités</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-800 font-medium">Module C (CV):</span>
              <span className="text-blue-600">{Object.keys(data.moduleC?.features || {}).length} fonctionnalités</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-800 font-medium">Module D (Débouchés):</span>
              <span className="text-blue-600">{Object.keys(data.moduleD?.features || {}).length} fonctionnalités</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-blue-800 font-medium">Module E (Profil):</span>
              <span className="text-blue-600">{Object.keys(data.moduleE?.features || {}).length} fonctionnalités</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-800 font-medium">Module F (Gamification):</span>
              <span className="text-blue-600">{Object.keys(data.moduleF?.features || {}).length} fonctionnalités</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-800 font-medium">Module G (Admin):</span>
              <span className="text-blue-600">{Object.keys(data.moduleG?.features || {}).length} fonctionnalités</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-blue-200">
          <p className="text-sm text-blue-700">
            💡 <strong>Conseil:</strong> Concentrez-vous sur les fonctionnalités P1 pour votre MVP. Les P2 et P3 pourront être ajoutées progressivement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section3;
