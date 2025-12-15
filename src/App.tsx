import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, Home } from 'lucide-react';
import { generateSectionPDF, generateFullPDF } from './utils/pdfGenerator';
import { useSupabaseData } from './hooks/useSupabaseData';
import { FormData, Section } from './types';
import HomePage from './components/HomePage';
import Section1 from './components/sections/Section1';
import Section2 from './components/sections/Section2';
import Section3 from './components/sections/Section3';
import Section4 from './components/sections/Section4';
import Section5 from './components/sections/Section5';
import Section6 from './components/sections/Section6';
import Section7 from './components/sections/Section7';
import Section8 from './components/sections/Section8';
import Section9 from './components/sections/Section9';
import Section10 from './components/sections/Section10';
import Section14 from './components/sections/Section14';
import ProgressIndicator from './components/ProgressIndicator';

const SECTIONS: Section[] = [
  { id: 1, title: "VISION & OBJECTIFS", component: Section1 },
  { id: 2, title: "INSPIRATION & RÉFÉRENCES", component: Section2 },
  { id: 3, title: "MODULES & FONCTIONNALITÉS", component: Section3 },
  { id: 4, title: "EXPÉRIENCE UTILISATEUR", component: Section4 },
  { id: 5, title: "MODÈLE ÉCONOMIQUE", component: Section5 },
  { id: 6, title: "LANCEMENT & PRIORITÉS", component: Section6 },
  { id: 7, title: "RESSOURCES & CONTRAINTES", component: Section7 },
  { id: 8, title: "MESURE DU SUCCÈS", component: Section8 },
  { id: 9, title: "DESIGN & IDENTITÉ VISUELLE", component: Section9 },
  { id: 10, title: "PLATEFORMES & TECHNOLOGIES", component: Section10 },
  { id: 11, title: "PARTENARIATS & ÉCOSYSTÈME", component: () => <div className="p-8 text-center text-gray-600">Section en développement...</div> },
  { id: 12, title: "ASPECTS LÉGAUX & SÉCURITÉ", component: () => <div className="p-8 text-center text-gray-600">Section en développement...</div> },
  { id: 13, title: "CAPITALISATION SUR L'EXISTANT CIFOP", component: () => <div className="p-8 text-center text-gray-600">Section en développement...</div> },
  { id: 14, title: "VALIDATION & PROCHAINES ÉTAPES", component: Section14 }
];

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'section'>('home');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const { 
    project, 
    loading: supabaseLoading, 
    error: supabaseError,
    saveSection1,
    saveSection2, 
    saveSection3,
    saveSection4,
    saveSection5,
    saveSection6,
    saveSection7,
    saveSection8,
    saveSection9,
    saveSection10,
    saveSection14,
    loadSectionData 
  } = useSupabaseData();

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('cifop-cadrage-data');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('cifop-cadrage-data', JSON.stringify(formData));
  }, [formData]);

  // Charger les données depuis Supabase quand le projet est disponible
  useEffect(() => {
    if (project) {
      loadAllSectionsData();
    }
  }, [project]);

  const loadAllSectionsData = async () => {
    if (!project) return;
    
    try {
      const sectionsToLoad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14];
      const loadedData: FormData = {};
      
      for (const sectionId of sectionsToLoad) {
        const sectionData = await loadSectionData(sectionId);
        if (sectionData) {
          loadedData[sectionId] = sectionData;
        }
      }
      
      setFormData(prev => ({ ...prev, ...loadedData }));
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  };

  const updateFormData = (sectionId: number, data: any) => {
    setFormData(prev => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], ...data }
    }));
    
    // Sauvegarder automatiquement dans Supabase
    saveToSupabase(sectionId, { ...formData[sectionId], ...data });
  };

  const saveToSupabase = async (sectionId: number, data: any) => {
    try {
      switch (sectionId) {
        case 1:
          await saveSection1(data);
          break;
        case 2:
          await saveSection2(data);
          break;
        case 3:
          await saveSection3(data);
          break;
        case 4:
          await saveSection4(data);
          break;
        case 5:
          await saveSection5(data);
          break;
        case 6: 
          await saveSection6(data);
          break;
        case 7:
          await saveSection7(data);
          break;
        case 8:
          await saveSection8(data);
          break;
        case 9: 
          await saveSection9(data);
          break;
        case 10:
	  await saveSection10(data);
	  break;
        case 14:
          await saveSection14(data);
          break;
        default:
          // Pour les autres sections, on garde la sauvegarde locale
          break;
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleStartSections = () => {
    setCurrentView('section');
    setCurrentSectionIndex(0);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  const handleNextSection = () => {
    if (currentSectionIndex < SECTIONS.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const handlePrevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const handleDownloadSectionPDF = async () => {
    const section = SECTIONS[currentSectionIndex];
    const sectionData = formData[section.id] || {};
    await generateSectionPDF(section, sectionData);
  };

  const handleDownloadFullPDF = async () => {
    await generateFullPDF(SECTIONS, formData);
  };

  // Afficher un loader pendant le chargement initial
  if (supabaseLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement de votre projet...</p>
        </div>
      </div>
    );
  }

  // Afficher les erreurs Supabase
  if (supabaseError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h3 className="text-red-800 font-semibold mb-2">Erreur de connexion</h3>
            <p className="text-red-600 text-sm">{supabaseError}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (currentView === 'home') {
    return (
      <HomePage 
        onStart={handleStartSections}
        savedProgress={Object.keys(formData).length}
        projectInfo={project}
      />
    );
  }

  const currentSection = SECTIONS[currentSectionIndex];
  const CurrentSectionComponent = currentSection.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToHome}
                className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors"
              >
                <Home className="h-5 w-5" />
                <span className="hidden sm:inline">Accueil</span>
              </button>
              <div className="h-6 w-px bg-slate-300"></div>
              <h1 className="text-lg font-semibold text-slate-900">
                Document de Cadrage - CIFOP
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleDownloadSectionPDF}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">PDF Section</span>
              </button>
              {currentSectionIndex === SECTIONS.length - 1 && (
                <button
                  onClick={handleDownloadFullPDF}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Download className="h-4 w-4" />
                  <span>PDF Complet</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <ProgressIndicator 
        currentSection={currentSectionIndex + 1}
        totalSections={SECTIONS.length}
        sectionTitle={currentSection.title}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200">
          <div className="p-6 sm:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                SECTION {currentSection.id} : {currentSection.title}
              </h2>
              <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-20"></div>
            </div>

            <CurrentSectionComponent
              data={formData[currentSection.id] || {}}
              onUpdate={(data: any) => updateFormData(currentSection.id, data)}
            />
          </div>

          {/* Navigation Footer */}
          <div className="bg-slate-50 px-6 sm:px-8 py-6 rounded-b-xl border-t border-slate-200">
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevSection}
                disabled={currentSectionIndex === 0}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Section Précédente</span>
              </button>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-500">
                  {currentSectionIndex + 1} / {SECTIONS.length}
                </span>
                
                {currentSectionIndex < SECTIONS.length - 1 ? (
                  <button
                    onClick={handleNextSection}
                    className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <span>Section Suivante</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleDownloadFullPDF}
                    className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <Download className="h-5 w-5" />
                    <span>Télécharger PDF Final</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
