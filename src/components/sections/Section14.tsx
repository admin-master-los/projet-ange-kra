import React from 'react';
import { SectionProps } from '../../types';

const EVALUATION_ASPECTS = [
  'Vision générale du projet',
  'Cibles utilisateurs', 
  'Fonctionnalités prioritaires',
  'Modèle économique',
  'Design souhaité',
  'Budget disponible',
  'Planning réaliste'
];

const Section14: React.FC<SectionProps> = ({ data = {}, onUpdate }) => {
  const handleEvaluationChange = (aspect: string, rating: number) => {
    const evaluations = { ...data.evaluations };
    evaluations[aspect] = rating;
    onUpdate({ ...data, evaluations });
  };

  return (
    <div className="space-y-8">
      {/* 14.1 Auto-Évaluation */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">14.1 Auto-Évaluation</h3>
        <p className="text-sm text-slate-600">
          Sur une échelle de 1 à 5, évaluez votre clarté sur chaque aspect :
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border border-slate-200 rounded-lg">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-700 border-b border-slate-200">
                  Aspect
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-slate-700 border-b border-slate-200">
                  1 (Flou)
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-slate-700 border-b border-slate-200">
                  2
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-slate-700 border-b border-slate-200">
                  3
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-slate-700 border-b border-slate-200">
                  4
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-slate-700 border-b border-slate-200">
                  5 (Très clair)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {EVALUATION_ASPECTS.map((aspect, index) => (
                <tr key={aspect} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}>
                  <td className="px-4 py-3 text-sm text-slate-700 font-medium">
                    {aspect}
                  </td>
                  {[1, 2, 3, 4, 5].map(rating => (
                    <td key={rating} className="px-4 py-3 text-center">
                      <input
                        type="radio"
                        name={`evaluation-${aspect}`}
                        value={rating}
                        checked={data.evaluations?.[aspect] === rating}
                        onChange={() => handleEvaluationChange(aspect, rating)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 14.2 Questions Ouvertes */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">14.2 Questions Ouvertes</h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Qu'est-ce qui vous inquiète le plus dans ce projet ?
          </label>
          <textarea
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Vos préoccupations, risques identifiés..."
            value={data.concerns || ''}
            onChange={(e) => onUpdate({ ...data, concerns: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Qu'est-ce qui vous enthousiasme le plus ?
          </label>
          <textarea
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Les aspects qui vous motivent, les opportunités..."
            value={data.enthusiasm || ''}
            onChange={(e) => onUpdate({ ...data, enthusiasm: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Y a-t-il des points que ce document n'a pas couverts ?
          </label>
          <textarea
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Aspects manquants, questions non abordées..."
            value={data.missing || ''}
            onChange={(e) => onUpdate({ ...data, missing: e.target.value })}
          />
        </div>
      </div>

      {/* Prochaines Étapes */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">🚀 PROCHAINES ÉTAPES</h3>
        
        <div className="space-y-4 text-sm text-blue-800">
          <div>
            <h4 className="font-semibold mb-2">Une fois ce document complété, vous pouvez nous le retourner de deux façons :</h4>
            <div className="space-y-2 ml-4">
              <div>
                <strong>Option 1 : Par Email 📧</strong><br />
                Envoyez le document complété à : <a href="mailto:contact@leonceouattarastudiogroup.site" className="underline">contact@leonceouattarastudiogroup.site</a>
              </div>
              <div>
                <strong>Option 2 : Par WhatsApp 💬</strong><br />
                Répondez section par section directement via WhatsApp : <a href="https://wa.me/+2250545130739" className="underline">(+225) 05 45 13 07 39</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Après réception de vos réponses :</h4>
            <ol className="list-decimal ml-4 space-y-1">
              <li>Nous programmerons un atelier de cadrage (2-3h) pour clarifier les zones floues</li>
              <li>Nous produirons :
                <ul className="list-disc ml-4 mt-1">
                  <li>Cahier des charges détaillé</li>
                  <li>Wireframes / maquettes</li>
                  <li>Estimation budgétaire précise</li>
                  <li>Planning de réalisation</li>
                </ul>
              </li>
              <li>Validation et lancement du projet</li>
            </ol>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <h4 className="font-semibold text-amber-900 mb-2">💡 CONSEIL FINAL</h4>
          <p className="text-sm text-amber-800">
            Prenez le temps nécessaire pour remplir ce document. Plus vos réponses seront précises, 
            plus nous pourrons vous proposer une solution adaptée et éviter les malentendus coûteux 
            en temps et en argent.
          </p>
          <p className="text-sm text-amber-800 mt-2">
            Il est NORMAL de ne pas avoir toutes les réponses. Si vous hésitez sur certains points, 
            notez "À discuter" et nous en parlerons ensemble lors de l'atelier de cadrage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section14;