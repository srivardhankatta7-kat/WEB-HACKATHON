import React, { useState } from 'react';
import type { CropCategory, CropRecommendation, SuitabilityCategory } from '../types/crop';
import { useLanguage } from '../context/LanguageContext';
import {
  Search,
  Check,
  Scale,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Droplets,
  Calendar,
  Layers
} from 'lucide-react';

interface RecommendationListProps {
  recommendations: CropRecommendation[];
  selectedForCompare: string[];
  onToggleCompare: (cropId: string) => void;
  onOpenDetails: (crop: CropRecommendation) => void;
  onNavigateToCompare: () => void;
  engineMode: 'rules' | 'knn';
  setEngineMode: (mode: 'rules' | 'knn') => void;
}

const CATEGORIES: (CropCategory | 'All')[] = [
  'All',
  'Cereals',
  'Pulses',
  'Cash Crops',
  'Oilseeds',
  'Fruits & Plantation',
  'Vegetables & Tubers'
];

const SUITABILITY_LEVELS: (SuitabilityCategory | 'All')[] = [
  'All',
  'Highly Suitable',
  'Moderately Suitable',
  'Marginally Suitable',
  'Not Recommended'
];

export const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations,
  selectedForCompare,
  onToggleCompare,
  onOpenDetails,
  onNavigateToCompare,
  engineMode,
  setEngineMode
}) => {
  const { t, translateCropName, translateCategory, translateSuitability } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CropCategory | 'All'>('All');
  const [selectedSuitability, setSelectedSuitability] = useState<SuitabilityCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sort based on engine mode
  const displayedRecs = [...recommendations].sort((a, b) => {
    if (engineMode === 'knn') {
      return (b.knnSimilarity || 0) - (a.knnSimilarity || 0);
    }
    return b.overallScore - a.overallScore;
  });

  // Filter recommendations
  const filtered = displayedRecs.filter((rec) => {
    if (selectedCategory !== 'All' && rec.crop.category !== selectedCategory) return false;
    if (selectedSuitability !== 'All' && rec.suitabilityCategory !== selectedSuitability) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const localizedName = translateCropName(rec.crop.name).toLowerCase();
      const matchName = rec.crop.name.toLowerCase().includes(q) || localizedName.includes(q);
      const matchSci = rec.crop.scientificName.toLowerCase().includes(q);
      if (!matchName && !matchSci) return false;
    }
    return true;
  });

  const getScoreBadge = (category: SuitabilityCategory) => {
    if (category === 'Highly Suitable') {
      return {
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-500/20',
        pill: 'bg-emerald-600 text-white',
        scoreText: 'text-emerald-700'
      };
    }
    if (category === 'Moderately Suitable') {
      return {
        bg: 'bg-blue-50 text-blue-800 border-blue-300 ring-1 ring-blue-500/20',
        pill: 'bg-blue-600 text-white',
        scoreText: 'text-blue-700'
      };
    }
    if (category === 'Marginally Suitable') {
      return {
        bg: 'bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-500/20',
        pill: 'bg-amber-600 text-white',
        scoreText: 'text-amber-700'
      };
    }
    return {
      bg: 'bg-rose-50 text-rose-800 border-rose-300 ring-1 ring-rose-500/20',
      pill: 'bg-rose-600 text-white',
      scoreText: 'text-rose-700'
    };
  };

  return (
    <div className="space-y-6">
      {/* Controls & Filter Strip */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Dual Engine Paradigm Switcher */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t.results.dualEngineTitle}
            </span>
            <div className="flex rounded-xl border border-slate-200 p-1 bg-slate-50">
              <button
                type="button"
                onClick={() => setEngineMode('rules')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                  engineMode === 'rules'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.results.rulesEngine}</span>
              </button>

              <button
                type="button"
                onClick={() => setEngineMode('knn')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                  engineMode === 'knn'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{t.results.knnEngine}</span>
              </button>
            </div>
          </div>

          {/* Compare Toolbar */}
          {selectedForCompare.length > 0 && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-300 px-3 py-1.5 rounded-xl">
              <span className="text-xs font-bold text-amber-900">
                {selectedForCompare.length} {t.results.compareBtn}
              </span>
              <button
                type="button"
                onClick={onNavigateToCompare}
                className="px-3 py-1 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <span>{t.tabs.compare}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.results.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Dropdown Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {translateCategory(cat)}
                </option>
              ))}
            </select>

            {/* Suitability Level Filter */}
            <select
              value={selectedSuitability}
              onChange={(e) => setSelectedSuitability(e.target.value as any)}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {SUITABILITY_LEVELS.map((suit) => (
                <option key={suit} value={suit}>
                  {translateSuitability(suit)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      {selectedCategory === 'All' && selectedSuitability === 'All' && searchQuery === '' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayedRecs.slice(0, 3).map((rec, index) => {
            const isComparing = selectedForCompare.includes(rec.crop.id);
            const badgeStyle = getScoreBadge(rec.suitabilityCategory);
            const scoreToDisplay = engineMode === 'knn' ? rec.knnSimilarity : rec.overallScore;

            return (
              <div
                key={rec.crop.id}
                className={`relative rounded-2xl p-5 border shadow-sm transition hover:shadow-md ${
                  index === 0
                    ? 'bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-white border-amber-300'
                    : index === 1
                    ? 'bg-gradient-to-br from-slate-200/50 via-white to-white border-slate-300'
                    : 'bg-gradient-to-br from-amber-700/10 via-white to-white border-amber-200'
                }`}
              >
                {/* Podium Rank Ribbon */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${
                        index === 0
                          ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                          : index === 1
                          ? 'bg-slate-300 text-slate-800'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      #{index + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      {index === 0 ? t.results.topMatch : index === 1 ? t.results.runnerUp : t.results.thirdChoice}
                    </span>
                  </div>

                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeStyle.pill}`}>
                    {scoreToDisplay}% {t.results.match}
                  </span>
                </div>

                {/* Crop Name & Details */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl p-2 bg-white rounded-xl shadow-xs border border-slate-100">
                    {rec.crop.emoji}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 m-0">
                      {translateCropName(rec.crop.name)}
                    </h3>
                    <p className="text-xs italic text-slate-500 m-0">{rec.crop.scientificName}</p>
                    <span className="inline-block mt-1 text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {translateCategory(rec.crop.category)}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                  {rec.crop.description}
                </p>

                {/* Key Driver Badge */}
                {rec.strengths[0] && (
                  <div className="bg-emerald-50 border border-emerald-200/80 rounded-lg p-2 text-xs text-emerald-800 mb-3 flex items-start gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-[11px] font-medium line-clamp-2">{rec.strengths[0]}</span>
                  </div>
                )}

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onOpenDetails(rec)}
                    className="flex-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition text-center cursor-pointer"
                  >
                    {t.results.auditBtn}
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleCompare(rec.crop.id)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition flex items-center gap-1 cursor-pointer ${
                      isComparing
                        ? 'bg-amber-400 text-slate-950 border-amber-400'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {isComparing ? <Check className="w-3.5 h-3.5" /> : null}
                    <Scale className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Crop Recommendations List */}
      <div className="space-y-3.5">
        {filtered.map((rec) => {
          const isComparing = selectedForCompare.includes(rec.crop.id);
          const badgeStyle = getScoreBadge(rec.suitabilityCategory);
          const scoreToDisplay = engineMode === 'knn' ? rec.knnSimilarity : rec.overallScore;

          return (
            <div
              key={rec.crop.id}
              className={`bg-white rounded-2xl p-5 border shadow-xs transition hover:shadow-md ${
                isComparing ? 'border-amber-400 ring-2 ring-amber-300/30' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="text-4xl p-2.5 bg-slate-50 rounded-2xl border border-slate-100 shrink-0">
                    {rec.crop.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-400 text-xs font-mono">
                        #{rec.rank}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 m-0">
                        {translateCropName(rec.crop.name)}
                      </h3>
                      <span className="text-xs text-slate-500 italic">
                        ({rec.crop.scientificName})
                      </span>
                      <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                        {translateCategory(rec.crop.category)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1 mb-2 line-clamp-1">
                      {rec.crop.description}
                    </p>

                    {/* Metadata Badges */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Droplets className="w-3.5 h-3.5 text-cyan-600" />
                        Water: <strong>{rec.crop.waterRequirement}</strong>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        Duration: <strong>{rec.crop.typicalDurationDays}</strong>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-emerald-600" />
                        Yield: <strong>{rec.crop.averageYield}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score & Actions Right */}
                <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-0 border-slate-100">
                  <div className="text-right">
                    <div className="text-2xl font-black text-slate-900">
                      {scoreToDisplay}%
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${badgeStyle.bg}`}>
                      {translateSuitability(rec.suitabilityCategory)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onToggleCompare(rec.crop.id)}
                      className={`px-3 py-2 text-xs font-bold rounded-xl border transition flex items-center gap-1 cursor-pointer ${
                        isComparing
                          ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {isComparing ? <Check className="w-3.5 h-3.5" /> : null}
                      <span>{t.results.compareBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenDetails(rec)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>{t.results.auditBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
