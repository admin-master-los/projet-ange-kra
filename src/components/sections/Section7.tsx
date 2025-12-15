import React from 'react';

interface Section7Props {
  data?: any;
  onUpdate: (data: any) => void;
}

const BUDGET_RANGES = [
  'Moins de 1 million FCFA',
  '1-3 millions FCFA',
  '3-5 millions FCFA',
  '5-10 millions FCFA',
  'Plus de 10 millions FCFA',
  'Budget non défini'
];

const TIMELINE_OPTIONS = [
  'Moins de 3 mois',
  '3-6 mois',
  '6-12 mois',
  'Pas de deadline précise'
];

const TEAM_SIZES = [
  'Moi seul(e)',
  'Moi + 1 associé',
  'Moi + 2-3 associés',
  'Équipe de 4-10 personnes',
  'Équipe de 10+ personnes',
  'Prestataires externes uniquement'
];

const INTERNAL_SKILLS = [
  'Développement web',
  'Design UX/UI',
  'Création de contenus',
  'Marketing digital',
  'Gestion de projet',
  'Expertise métiers/RH'
];

const TECHNICAL_CONSTRAINTS = [
  'Hébergement local (serveurs en Côte d\'Ivoire)',
  'Conformité RGPD / données personnelles',
  'Accessibilité handicap',
  'Support navigateurs anciens',
  'Application mobile native souhaitée'
];

const Section7: React.FC<Section7Props> = ({ data = {}, onUpdate }) => {
  const handleBudgetAllocationChange = (category: string, value: string) => {
    const allocation = { ...data.budget_allocation };
    allocation[category] = value;
    onUpdate({ ...data, budget_allocation: allocation });
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    const skills = data.internal_skills || [];
    const newSkills = checked 
      ? [...skills, skill]
      : skills.filter((s: string) => s !== skill);
    onUpdate({ ...data, internal_skills: newSkills });
  };

  const handleExternalSkillChange = (skill: string, checked: boolean) => {
    const skills = data.external_skills || [];
    const newSkills = checked 
      ? [...skills, skill]
      : skills.filter((s: string) => s !== skill);
    onUpdate({ ...data, external_skills: newSkills });
  };

  const handleConstraintChange = (constraint: string, checked: boolean) => {
    const constraints = data.technical_constraints || [];
    const newConstraints = checked 
      ? [...constraints, constraint]
      : constraints.filter((c: string) => c !== constraint);
    onUpdate({ ...data, technical_constraints: newConstraints });
  };

  // Calculer le total de l'allocation budgétaire
  const totalAllocation = Object.values(data.budget_allocation || {})
    .reduce((sum: number, val: any) => sum + (parseInt(val) || 0), 0);

  return (
    <div className="space-y-8">
      {/* 7.1 Budget */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">7.1 Budget</h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Budget total disponible pour le projet :
          </label>
          <div className="space-y-2">
            {BUDGET_RANGES.map((range) => (
              <label key={range} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="budget_range"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.budget_range === range}
                  onChange={() => onUpdate({ ...data, budget_range: range })}
                />
                <span className="text-sm text-slate-700 leading-5">{range}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-4">
            Répartition souhaitée du budget
          </h4>
          <p className="text-xs text-blue-700 mb-4">
            Répartissez votre budget en pourcentages (le total doit faire 100%)
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-2">
                Design/UX :
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  value={data.budget_allocation?.design || ''}
                  onChange={(e) => handleBudgetAllocationChange('design', e.target.value)}
                />
                <span className="text-blue-800 font-medium">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-2">
                Développement :
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  value={data.budget_allocation?.development || ''}
                  onChange={(e) => handleBudgetAllocationChange('development', e.target.value)}
                />
                <span className="text-blue-800 font-medium">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-2">
                Contenus :
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  value={data.budget_allocation?.content || ''}
                  onChange={(e) => handleBudgetAllocationChange('content', e.target.value)}
                />
                <span className="text-blue-800 font-medium">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-2">
                Marketing :
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  value={data.budget_allocation?.marketing || ''}
                  onChange={(e) => handleBudgetAllocationChange('marketing', e.target.value)}
                />
                <span className="text-blue-800 font-medium">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-2">
                Autre :
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  value={data.budget_allocation?.other || ''}
                  onChange={(e) => handleBudgetAllocationChange('other', e.target.value)}
                />
                <span className="text-blue-800 font-medium">%</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white rounded-lg border border-blue-300">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-900">Total :</span>
              <span className={`text-lg font-bold ${
                totalAllocation === 100 ? 'text-green-600' : 
                totalAllocation > 100 ? 'text-red-600' : 'text-orange-600'
              }`}>
                {totalAllocation}%
              </span>
            </div>
            {totalAllocation !== 100 && (
              <p className="text-xs text-orange-600 mt-1">
                {totalAllocation > 100 
                  ? '⚠️ Le total dépasse 100%' 
                  : '⚠️ Le total doit faire 100%'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 7.2 Délais */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">7.2 Délais</h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Quand souhaitez-vous lancer ?
          </label>
          <div className="space-y-2">
            {TIMELINE_OPTIONS.map((option) => (
              <label key={option} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="timeline"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.timeline === option}
                  onChange={() => onUpdate({ ...data, timeline: option })}
                />
                <span className="text-sm text-slate-700 leading-5">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Date limite (si applicable) :
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={data.deadline_date || ''}
              onChange={(e) => onUpdate({ ...data, deadline_date: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Raison de cette deadline :
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Événement de lancement prévu"
              value={data.deadline_reason || ''}
              onChange={(e) => onUpdate({ ...data, deadline_reason: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* 7.3 Équipe */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">7.3 Équipe</h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Qui travaille sur ce projet ?
          </label>
          <div className="space-y-2">
            {TEAM_SIZES.map((size) => (
              <label key={size} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="team_size"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.team_size === size}
                  onChange={() => onUpdate({ ...data, team_size: size })}
                />
                <span className="text-sm text-slate-700 leading-5">{size}</span>
              </label>
            ))}
          </div>

          {data.team_size && !data.team_size.includes('seul') && !data.team_size.includes('Prestataires') && (
            <div className="mt-3">
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Précisez la taille de l'équipe..."
                value={data.team_size_details || ''}
                onChange={(e) => onUpdate({ ...data, team_size_details: e.target.value })}
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Compétences disponibles en interne :
          </label>
          <div className="space-y-2">
            {INTERNAL_SKILLS.map((skill) => (
              <label key={skill} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  checked={(data.internal_skills || []).includes(skill)}
                  onChange={(e) => handleSkillChange(skill, e.target.checked)}
                />
                <span className="text-sm text-slate-700 leading-5">{skill}</span>
              </label>
            ))}
          </div>

          <div className="mt-3">
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Autres compétences internes..."
              value={data.other_internal_skills || ''}
              onChange={(e) => onUpdate({ ...data, other_internal_skills: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Compétences à externaliser :
          </label>
          <div className="space-y-2">
            {INTERNAL_SKILLS.map((skill) => (
              <label key={skill} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-slate-300 rounded"
                  checked={(data.external_skills || []).includes(skill)}
                  onChange={(e) => handleExternalSkillChange(skill, e.target.checked)}
                />
                <span className="text-sm text-slate-700 leading-5">{skill}</span>
              </label>
            ))}
          </div>

          <div className="mt-3">
            <textarea
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Autres compétences à externaliser et budget estimé..."
              value={data.other_external_skills || ''}
              onChange={(e) => onUpdate({ ...data, other_external_skills: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* 7.4 Contraintes Techniques */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">7.4 Contraintes Techniques</h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Contraintes spécifiques à prendre en compte :
          </label>
          <div className="space-y-2">
            {TECHNICAL_CONSTRAINTS.map((constraint) => (
              <label key={constraint} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  checked={(data.technical_constraints || []).includes(constraint)}
                  onChange={(e) => handleConstraintChange(constraint, e.target.checked)}
                />
                <span className="text-sm text-slate-700 leading-5">{constraint}</span>
              </label>
            ))}
          </div>

          <div className="mt-3">
            <textarea
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Autres contraintes techniques..."
              value={data.other_constraints || ''}
              onChange={(e) => onUpdate({ ...data, other_constraints: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Résumé */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
        <h4 className="font-semibold text-orange-900 mb-4">📊 Résumé des Ressources & Contraintes</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-orange-600 font-medium min-w-[160px]">Budget :</span>
            <span className="text-orange-800">
              {data.budget_range || 'Non défini'}
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-orange-600 font-medium min-w-[160px]">Allocation :</span>
            <span className="text-orange-800">
              {totalAllocation === 100 ? '✅ Équilibrée (100%)' : `⚠️ ${totalAllocation}%`}
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-orange-600 font-medium min-w-[160px]">Délai de lancement :</span>
            <span className="text-orange-800">
              {data.timeline || 'Non défini'}
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-orange-600 font-medium min-w-[160px]">Équipe :</span>
            <span className="text-orange-800">
              {data.team_size || 'Non définie'}
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-orange-600 font-medium min-w-[160px]">Compétences internes :</span>
            <span className="text-orange-800">
              {(data.internal_skills || []).length} compétence{(data.internal_skills || []).length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-orange-600 font-medium min-w-[160px]">À externaliser :</span>
            <span className="text-orange-800">
              {(data.external_skills || []).length} compétence{(data.external_skills || []).length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-orange-600 font-medium min-w-[160px]">Contraintes :</span>
            <span className="text-orange-800">
              {(data.technical_constraints || []).length} contrainte{(data.technical_constraints || []).length > 1 ? 's' : ''} technique{(data.technical_constraints || []).length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-orange-200">
          <p className="text-sm text-orange-700">
            💡 <strong>Conseil :</strong> Soyez réaliste sur vos ressources disponibles. 
            Un budget bien réparti et des compétences clairement identifiées sont essentiels 
            pour la réussite du projet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section7;
