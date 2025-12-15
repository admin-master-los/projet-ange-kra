import React from 'react';

interface ProgressIndicatorProps {
  currentSection: number;
  totalSections: number;
  sectionTitle: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentSection,
  totalSections,
  sectionTitle
}) => {
  const progress = (currentSection / totalSections) * 100;

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Section {currentSection} : {sectionTitle}
            </h2>
            <p className="text-sm text-slate-600">
              {currentSection} sur {totalSections} sections complétées
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-64 bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-slate-700 min-w-[3rem]">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;