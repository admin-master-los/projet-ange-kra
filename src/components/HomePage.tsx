import React from 'react';
import { FileText, Target, Users, Zap, Download, ArrowRight } from 'lucide-react';
import type { Project } from '../lib/supabase';

interface HomePageProps {
  onStart: () => void;
  savedProgress: number;
  projectInfo?: Project | null;
}

const HomePage: React.FC<HomePageProps> = ({ onStart, savedProgress, projectInfo }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm font-medium mb-8 backdrop-blur-sm">
              <FileText className="h-4 w-4 mr-2" />
              Document de Cadrage Interactif
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Plateforme de Formation et<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                Orientation Professionnelle
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Définissez précisément les besoins, fonctionnalités et priorités de votre projet 
              à travers 14 sections guidées. Téléchargez vos réponses en PDF professionnel.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onStart}
                className="group flex items-center space-x-3 px-8 py-4 bg-white text-blue-900 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <span>Commencer le Cadrage</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              {savedProgress > 0 && (
                <div className="flex items-center space-x-2 text-blue-200">
                  <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                  <span>{savedProgress} section{savedProgress > 1 ? 's' : ''} sauvegardée{savedProgress > 1 ? 's' : ''} dans Supabase</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Pourquoi utiliser cette plateforme ?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Transformez votre vision en projet structuré avec notre approche guidée
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full text-white mb-4">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Vision Claire</h3>
              <p className="text-slate-600">
                Définissez vos objectifs et cibles avec précision
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full text-white mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Personas Détaillés</h3>
              <p className="text-slate-600">
                Identifiez et caractérisez vos utilisateurs cibles
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full text-white mb-4">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Fonctionnalités MVP</h3>
              <p className="text-slate-600">
                Priorisez les features essentielles de votre plateforme
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full text-white mb-4">
                <Download className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">PDF Professionnel</h3>
              <p className="text-slate-600">
                Exportez vos réponses en document de qualité
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Client Info */}
      <div className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Client</h4>
                <p className="text-slate-600">{projectInfo?.client_name || 'M. Ange KRA'}</p>
                <p className="text-slate-500 text-sm">{projectInfo?.client_function || 'Manager Général CIFOP'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Date</h4>
                <p className="text-slate-600">{projectInfo ? new Date(projectInfo.created_at).toLocaleDateString('fr-FR') : '14 Décembre 2024'}</p>
                <p className="text-slate-500 text-sm">Version 1.0</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Sections</h4>
                <p className="text-slate-600">14 sections complètes</p>
                <p className="text-slate-500 text-sm">Statut: {projectInfo?.status === 'en_cours' ? 'En cours' : projectInfo?.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Leonce Ouattara Studio Group</h3>
              <p className="text-slate-300">Excellence en développement web et stratégie digitale</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-400">
              <a href="mailto:contact@leonceouattarastudiogroup.site" className="hover:text-white transition-colors">
                📧 contact@leonceouattarastudiogroup.site
              </a>
              <a href="https://wa.me/+2250545130739" className="hover:text-white transition-colors">
                💬 WhatsApp : (+225) 05 45 13 07 39
              </a>
              <a href="https://leonceouattarastudiogroup.site" className="hover:text-white transition-colors">
                🌐 leonceouattarastudiogroup.site
              </a>
              <a href="https://linkedin.com/company/leonceouattarastudio" className="hover:text-white transition-colors">
                💼 LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;