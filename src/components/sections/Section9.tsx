// src/components/sections/Section9.tsx
import React from 'react';

interface Section9Props {
  data?: any;
  onUpdate: (data: any) => void;
}

const STYLE_OPTIONS = [
  'Moderne et épuré (flat design)',
  'Coloré et dynamique',
  'Sobre et professionnel',
  'Illustré et créatif',
  'Inspiré de FESCUI (chaleureux, culturel)',
  'Autre'
];

const LOGO_STATUS = [
  'Oui, complète (logo, couleurs, polices)',
  'Partiellement (juste logo)',
  'Non, tout à créer'
];

const Section9: React.FC<Section9Props> = ({ data = {}, onUpdate }) => {
  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ ...data, logo_file: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (colorType: string, value: string) => {
    const colors = { ...data.colors };
    colors[colorType] = value;
    onUpdate({ ...data, colors });
  };

  const handleReferenceChange = (index: number, field: string, value: string) => {
    const references = [...(data.visual_references || ['', '', ''])];
    if (!references[index]) references[index] = {};
    if (typeof references[index] === 'string') {
      references[index] = { url: references[index] };
    }
    references[index][field] = value;
    onUpdate({ ...data, visual_references: references });
  };

  return (
    <div className="space-y-8">
      {/* 9.1 Charte Graphique */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">
          9.1 Charte Graphique
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Avez-vous déjà une identité visuelle ?
          </label>
          <div className="space-y-2">
            {LOGO_STATUS.map((status) => (
              <label key={status} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="logo_status"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.logo_status === status}
                  onChange={() => onUpdate({ ...data, logo_status: status })}
                />
                <span className="text-sm text-slate-700 leading-5">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {data.logo_status === 'Oui, complète (logo, couleurs, polices)' && (
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 space-y-4">
            <h4 className="font-semibold text-blue-900 mb-4">
              Merci de fournir vos éléments de charte graphique
            </h4>
            
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-2">
                Logo en haute résolution :
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                onChange={handleLogoFileChange}
              />
              {data.logo_file && (
                <div className="mt-3">
                  <img 
                    src={data.logo_file} 
                    alt="Logo" 
                    className="max-h-32 border border-blue-200 rounded-lg p-2 bg-white"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-2">
                URL du logo (si hébergé en ligne) :
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/logo.png"
                value={data.logo_url || ''}
                onChange={(e) => onUpdate({ ...data, logo_url: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-800 mb-2">
                  Code couleur principal (hex) :
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    className="h-10 w-16 border border-blue-300 rounded cursor-pointer"
                    value={data.colors?.primary || '#000000'}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                  />
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="#000000"
                    value={data.colors?.primary || ''}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-800 mb-2">
                  Code couleur secondaire (hex) :
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    className="h-10 w-16 border border-blue-300 rounded cursor-pointer"
                    value={data.colors?.secondary || '#000000'}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                  />
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="#000000"
                    value={data.colors?.secondary || ''}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-800 mb-2">
                  Code couleur d'accentuation (hex) :
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    className="h-10 w-16 border border-blue-300 rounded cursor-pointer"
                    value={data.colors?.accent || '#000000'}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                  />
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="#000000"
                    value={data.colors?.accent || ''}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-2">
                Polices utilisées :
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Roboto, Open Sans, Montserrat"
                value={data.fonts || ''}
                onChange={(e) => onUpdate({ ...data, fonts: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-2">
                Charte graphique complète (URL ou fichier) :
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Lien vers votre charte graphique complète"
                value={data.brand_guide_url || ''}
                onChange={(e) => onUpdate({ ...data, brand_guide_url: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      {/* 9.2 Préférences Visuelles */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">9.2 Préférences Visuelles</h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Style de design souhaité :
          </label>
          <div className="space-y-2">
            {STYLE_OPTIONS.map((style) => (
              <label key={style} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="design_style"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  checked={data.design_style === style}
                  onChange={() => onUpdate({ ...data, design_style: style })}
                />
                <span className="text-sm text-slate-700 leading-5">{style}</span>
              </label>
            ))}
          </div>

          {data.design_style === 'Autre' && (
            <div className="mt-3">
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Précisez le style souhaité..."
                value={data.design_style_other || ''}
                onChange={(e) => onUpdate({ ...data, design_style_other: e.target.value })}
              />
            </div>
          )}
        </div>

        {/* Couleurs préférées (si pas de charte existante) */}
        {data.logo_status !== 'Oui, complète (logo, couleurs, polices)' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Couleurs préférées :
            </label>
            <p className="text-xs text-slate-500 mb-4">
              Si vous n'avez pas encore de charte graphique, indiquez vos préférences de couleurs
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Couleur principale :
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    className="h-10 w-16 border border-slate-300 rounded cursor-pointer"
                    value={data.preferred_colors?.primary || '#3B82F6'}
                    onChange={(e) => {
                      const colors = { ...data.preferred_colors };
                      colors.primary = e.target.value;
                      onUpdate({ ...data, preferred_colors: colors });
                    }}
                  />
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="#3B82F6"
                    value={data.preferred_colors?.primary || ''}
                    onChange={(e) => {
                      const colors = { ...data.preferred_colors };
                      colors.primary = e.target.value;
                      onUpdate({ ...data, preferred_colors: colors });
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Couleur secondaire :
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    className="h-10 w-16 border border-slate-300 rounded cursor-pointer"
                    value={data.preferred_colors?.secondary || '#10B981'}
                    onChange={(e) => {
                      const colors = { ...data.preferred_colors };
                      colors.secondary = e.target.value;
                      onUpdate({ ...data, preferred_colors: colors });
                    }}
                  />
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="#10B981"
                    value={data.preferred_colors?.secondary || ''}
                    onChange={(e) => {
                      const colors = { ...data.preferred_colors };
                      colors.secondary = e.target.value;
                      onUpdate({ ...data, preferred_colors: colors });
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Couleur d'accentuation :
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    className="h-10 w-16 border border-slate-300 rounded cursor-pointer"
                    value={data.preferred_colors?.accent || '#F59E0B'}
                    onChange={(e) => {
                      const colors = { ...data.preferred_colors };
                      colors.accent = e.target.value;
                      onUpdate({ ...data, preferred_colors: colors });
                    }}
                  />
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="#F59E0B"
                    value={data.preferred_colors?.accent || ''}
                    onChange={(e) => {
                      const colors = { ...data.preferred_colors };
                      colors.accent = e.target.value;
                      onUpdate({ ...data, preferred_colors: colors });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Références visuelles */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Références visuelles :
          </label>
          <p className="text-xs text-slate-500 mb-4">
            Partagez 3 sites web dont vous aimez le design visuel
          </p>

          <div className="space-y-4">
            {[0, 1, 2].map((index) => (
              <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Site {index + 1} :
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    type="url"
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="URL du site"
                    value={typeof data.visual_references?.[index] === 'string' 
                      ? data.visual_references[index] 
                      : data.visual_references?.[index]?.url || ''}
                    onChange={(e) => handleReferenceChange(index, 'url', e.target.value)}
                  />
                  <input
                    type="text"
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Ce que vous aimez"
                    value={data.visual_references?.[index]?.description || ''}
                    onChange={(e) => handleReferenceChange(index, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Résumé */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
        <h4 className="font-semibold text-purple-900 mb-4">🎨 Résumé de l'Identité Visuelle</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-purple-600 font-medium min-w-[180px]">Statut charte :</span>
            <span className="text-purple-800">
              {data.logo_status || 'Non défini'}
            </span>
          </div>

          {data.logo_status === 'Oui, complète (logo, couleurs, polices)' && (
            <>
              <div className="flex items-start space-x-2">
                <span className="text-purple-600 font-medium min-w-[180px]">Couleurs :</span>
                <div className="flex items-center space-x-2">
                  {data.colors?.primary && (
                    <div className="flex items-center space-x-1">
                      <div 
                        className="w-6 h-6 rounded border border-purple-300"
                        style={{ backgroundColor: data.colors.primary }}
                      ></div>
                      <span className="text-xs text-purple-700">{data.colors.primary}</span>
                    </div>
                  )}
                  {data.colors?.secondary && (
                    <div className="flex items-center space-x-1">
                      <div 
                        className="w-6 h-6 rounded border border-purple-300"
                        style={{ backgroundColor: data.colors.secondary }}
                      ></div>
                      <span className="text-xs text-purple-700">{data.colors.secondary}</span>
                    </div>
                  )}
                  {data.colors?.accent && (
                    <div className="flex items-center space-x-1">
                      <div 
                        className="w-6 h-6 rounded border border-purple-300"
                        style={{ backgroundColor: data.colors.accent }}
                      ></div>
                      <span className="text-xs text-purple-700">{data.colors.accent}</span>
                    </div>
                  )}
                </div>
              </div>

              {data.fonts && (
                <div className="flex items-start space-x-2">
                  <span className="text-purple-600 font-medium min-w-[180px]">Polices :</span>
                  <span className="text-purple-800">{data.fonts}</span>
                </div>
              )}
            </>
          )}

          <div className="flex items-start space-x-2">
            <span className="text-purple-600 font-medium min-w-[180px]">Style de design :</span>
            <span className="text-purple-800">
              {data.design_style || 'Non défini'}
              {data.design_style === 'Autre' && data.design_style_other && ` (${data.design_style_other})`}
            </span>
          </div>

          {data.preferred_colors && (
            <div className="flex items-start space-x-2">
              <span className="text-purple-600 font-medium min-w-[180px]">Préférences couleurs :</span>
              <div className="flex items-center space-x-2">
                {data.preferred_colors.primary && (
                  <div 
                    className="w-6 h-6 rounded border border-purple-300"
                    style={{ backgroundColor: data.preferred_colors.primary }}
                  ></div>
                )}
                {data.preferred_colors.secondary && (
                  <div 
                    className="w-6 h-6 rounded border border-purple-300"
                    style={{ backgroundColor: data.preferred_colors.secondary }}
                  ></div>
                )}
                {data.preferred_colors.accent && (
                  <div 
                    className="w-6 h-6 rounded border border-purple-300"
                    style={{ backgroundColor: data.preferred_colors.accent }}
                  ></div>
                )}
              </div>
            </div>
          )}

          <div className="flex items-start space-x-2">
            <span className="text-purple-600 font-medium min-w-[180px]">Références visuelles :</span>
            <span className="text-purple-800">
              {(data.visual_references || []).filter((ref: any) => 
                (typeof ref === 'string' && ref) || (typeof ref === 'object' && ref?.url)
              ).length} site{(data.visual_references || []).filter((ref: any) => 
                (typeof ref === 'string' && ref) || (typeof ref === 'object' && ref?.url)
              ).length > 1 ? 's' : ''} référencé{(data.visual_references || []).filter((ref: any) => 
                (typeof ref === 'string' && ref) || (typeof ref === 'object' && ref?.url)
              ).length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-purple-200">
          <p className="text-sm text-purple-700">
            💡 <strong>Conseil :</strong> Une identité visuelle cohérente et professionnelle 
            renforce la crédibilité de votre plateforme. Si vous n'avez pas encore de charte 
            graphique, nous pouvons vous aider à en créer une adaptée à votre cible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section9;
