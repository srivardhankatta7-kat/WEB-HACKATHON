import React from 'react';
import type { SupportedLanguage } from '../types/crop';
import { useLanguage } from '../context/LanguageContext';
import {
  Sprout,
  Scale,
  FileText,
  Info,
  BookmarkCheck,
  ShieldAlert,
  Sparkles,
  FlaskConical,
  BarChart3,
  FileCheck2,
  Globe
} from 'lucide-react';

export type AppTab =
  | 'form'
  | 'results'
  | 'fertilizer'
  | 'compare'
  | 'evaluation'
  | 'testreport'
  | 'methodology'
  | 'saved'
  | 'report';

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  comparedCount: number;
  savedCount: number;
}

const LANGUAGES: { code: SupportedLanguage; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' }
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  comparedCount,
  savedCount
}) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-emerald-900 text-white shadow-lg sticky top-0 z-30 no-print border-b border-emerald-800">
      {/* Top Advisory Bar */}
      <div className="bg-emerald-950 px-4 py-1.5 text-xs text-emerald-200 border-b border-emerald-800/60 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-medium text-amber-200">
            Advisory Prototype (HACK-P302):
          </span>
          <span className="text-emerald-300 hidden md:inline">
            {t.advisoryAlert}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-emerald-900/90 border border-emerald-700/80 rounded-lg px-2.5 py-1">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent text-emerald-100 text-xs outline-none cursor-pointer font-bold"
              aria-label="Select Interface Language"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-emerald-950 text-white font-medium">
                  {lang.native} ({lang.label})
                </option>
              ))}
            </select>
          </div>

          <span className="bg-emerald-800/80 px-2 py-0.5 rounded text-emerald-200 text-[11px] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Hackathon Edition
          </span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-md shadow-emerald-950/40 shrink-0">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white m-0">{t.appName}</h1>
              <span className="bg-emerald-700 text-emerald-100 text-[10px] px-2 py-0.5 rounded-full font-bold">
                v2.4 Pro
              </span>
            </div>
            <p className="text-[11px] text-emerald-200 m-0">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-emerald-950/70 p-1 rounded-xl border border-emerald-800/80 overflow-x-auto max-w-full">
          {/* Farm Inputs */}
          <button
            type="button"
            onClick={() => setActiveTab('form')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'form'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>{t.tabs.form}</span>
          </button>

          {/* Ranked Crops */}
          <button
            type="button"
            onClick={() => setActiveTab('results')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'results'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <span>{t.tabs.results}</span>
          </button>

          {/* Fertilizer Guidance (ICAR / FAO Trusted Source) */}
          <button
            type="button"
            onClick={() => setActiveTab('fertilizer')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'fertilizer'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>{t.tabs.fertilizer}</span>
          </button>

          {/* Compare */}
          <button
            type="button"
            onClick={() => setActiveTab('compare')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'compare'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{t.tabs.compare}</span>
            {comparedCount > 0 && (
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                {comparedCount}
              </span>
            )}
          </button>

          {/* Model Evaluation (Against Labelled Dataset) */}
          <button
            type="button"
            onClick={() => setActiveTab('evaluation')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'evaluation'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{t.tabs.evaluation}</span>
          </button>

          {/* Short Test Report */}
          <button
            type="button"
            onClick={() => setActiveTab('testreport')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'testreport'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>{t.tabs.testReport}</span>
          </button>

          {/* Methodology & Limitations */}
          <button
            type="button"
            onClick={() => setActiveTab('methodology')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'methodology'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>{t.tabs.methodology}</span>
          </button>

          {/* Saved Audits */}
          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>{t.tabs.saved}</span>
            {savedCount > 0 && (
              <span className="bg-emerald-700 text-emerald-200 text-[10px] font-bold rounded-full px-1.5 py-0.2">
                {savedCount}
              </span>
            )}
          </button>

          {/* Audit Report */}
          <button
            type="button"
            onClick={() => setActiveTab('report')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'report'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.tabs.report}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
