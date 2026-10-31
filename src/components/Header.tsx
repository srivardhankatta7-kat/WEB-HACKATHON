import React, { useState, useRef, useEffect } from 'react';
import type { SupportedLanguage } from '../types/crop';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { getRoleMeta } from '../services/authService';
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
  Globe,
  Cloud,
  Lock,
  LogOut,
  KeyRound,
  ChevronDown
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
  onOpenCloudSettings?: () => void;
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
  savedCount,
  onOpenCloudSettings
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, role, logout, openLoginModal, switchQuickDemoUser, hasPermission } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roleMeta = getRoleMeta(role);

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

        <div className="flex items-center gap-2.5 text-xs">
          {/* Cloud Database Indicator Button */}
          {onOpenCloudSettings && (
            <button
              type="button"
              onClick={onOpenCloudSettings}
              className="flex items-center gap-1.5 bg-emerald-900/90 hover:bg-emerald-800 border border-emerald-700/80 rounded-lg px-2.5 py-1 text-emerald-100 transition cursor-pointer text-xs"
              title="Cloud Database & Storage (Firebase)"
            >
              <Cloud className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-[11px] hidden sm:inline">Cloud DB</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          )}

          {/* User Authentication & Role Dropdown */}
          <div className="relative" ref={userMenuRef}>
            {isAuthenticated && user ? (
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 bg-emerald-900/90 hover:bg-emerald-800 border border-emerald-700/80 rounded-lg px-2.5 py-1 text-emerald-100 transition cursor-pointer text-xs"
                title="User Clearances & RBAC Profile"
              >
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-emerald-950 flex items-center justify-center text-[10px] font-black uppercase">
                  {user.fullName.charAt(0)}
                </div>
                <span className="font-semibold text-[11px] max-w-[90px] truncate hidden sm:inline">
                  {user.fullName.split(' ')[0]}
                </span>
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${roleMeta.badgeBg} ${roleMeta.badgeText}`}>
                  {role.toUpperCase()}
                </span>
                <ChevronDown className="w-3 h-3 text-emerald-300" />
              </button>
            ) : (
              <button
                type="button"
                onClick={openLoginModal}
                className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg px-2.5 py-1 transition cursor-pointer text-xs shadow-sm"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Profile & Clearance Dropdown */}
            {isUserMenuOpen && user && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 text-slate-800 z-50 animate-in fade-in duration-150">
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div>
                    <div className="font-bold text-xs text-slate-900">{user.fullName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">@{user.username}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[170px]">{user.email}</div>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${roleMeta.badgeBg} ${roleMeta.badgeText}`}>
                    {roleMeta.label}
                  </span>
                </div>

                {user.organization && (
                  <div className="text-[10px] text-slate-600 bg-slate-50 p-2 rounded-lg mt-2 border border-slate-100">
                    <strong className="text-slate-700">Affiliation:</strong> {user.organization}
                  </div>
                )}

                {/* Role Switcher */}
                <div className="mt-3 pt-2 border-t border-slate-100">
                  <div className="text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                    Quick Role Switcher (RBAC):
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        switchQuickDemoUser('farmer');
                        setIsUserMenuOpen(false);
                      }}
                      className={`p-1.5 text-[10px] font-bold rounded-lg border text-center transition cursor-pointer ${
                        role === 'farmer' ? 'bg-emerald-100 border-emerald-400 text-emerald-900' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      🌾 Farmer
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        switchQuickDemoUser('agronomist');
                        setIsUserMenuOpen(false);
                      }}
                      className={`p-1.5 text-[10px] font-bold rounded-lg border text-center transition cursor-pointer ${
                        role === 'agronomist' ? 'bg-blue-100 border-blue-400 text-blue-900' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      🔬 Officer
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        switchQuickDemoUser('admin');
                        setIsUserMenuOpen(false);
                      }}
                      className={`p-1.5 text-[10px] font-bold rounded-lg border text-center transition cursor-pointer ${
                        role === 'admin' ? 'bg-purple-100 border-purple-400 text-purple-900' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      ⚙️ Admin
                    </button>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      openLoginModal();
                    }}
                    className="text-[11px] text-emerald-700 hover:underline font-semibold cursor-pointer"
                  >
                    Switch Account
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

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
            {!hasPermission('VIEW_MODEL_EVALUATION') && (
              <span title="Restricted to Agronomist or Admin role" className="inline-flex items-center">
                <Lock className="w-3 h-3 text-amber-300" />
              </span>
            )}
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
            {!hasPermission('RUN_TEST_SUITE') && (
              <span title="Restricted to Agronomist or Admin role" className="inline-flex items-center">
                <Lock className="w-3 h-3 text-amber-300" />
              </span>
            )}
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
