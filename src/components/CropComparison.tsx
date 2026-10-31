import React from 'react';
import type { CropRecommendation } from '../types/crop';
import { useLanguage } from '../context/LanguageContext';
import {
  Scale,
  X,
  Plus,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

interface CropComparisonProps {
  allRecommendations: CropRecommendation[];
  selectedCropIds: string[];
  onToggleCompare: (cropId: string) => void;
  onClearCompare: () => void;
}

export const CropComparison: React.FC<CropComparisonProps> = ({
  allRecommendations,
  selectedCropIds,
  onToggleCompare,
  onClearCompare
}) => {
  const { t, translateCropName, translateCategory, translateSuitability } = useLanguage();
  const comparedRecs = allRecommendations.filter((r) =>
    selectedCropIds.includes(r.crop.id)
  );

  const availableToAdd = allRecommendations.filter(
    (r) => !selectedCropIds.includes(r.crop.id)
  );

  if (comparedRecs.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
          <Scale className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 m-0">{t.compare.emptyTitle}</h2>
        <p className="text-sm text-slate-600 m-0 max-w-md mx-auto">
          {t.compare.emptyDesc}
        </p>
        <div className="pt-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            {t.compare.quickAdd}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {allRecommendations.slice(0, 4).map((r) => (
              <button
                key={r.crop.id}
                type="button"
                onClick={() => onToggleCompare(r.crop.id)}
                className="px-3.5 py-1.5 text-xs font-medium bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 rounded-xl transition flex items-center gap-1.5 border border-slate-200 cursor-pointer"
              >
                <span>{r.crop.emoji}</span>
                <span>{translateCropName(r.crop.name)}</span>
                <Plus className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-100 text-amber-900 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Scale className="w-3.5 h-3.5" /> {t.compare.title}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Comparing {comparedRecs.length} Crops (Max 4)
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-2 mb-1">
            Side-by-Side Trade-off &amp; Agronomic Risk Analysis
          </h2>
          <p className="text-xs text-slate-600 m-0 leading-relaxed">
            Directly compare biological requirements, water footprints, economic yields, and limiting factors.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {availableToAdd.length > 0 && comparedRecs.length < 4 && (
            <select
              onChange={(e) => {
                if (e.target.value) onToggleCompare(e.target.value);
              }}
              value=""
              className="px-3 py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl cursor-pointer"
            >
              <option value="">+ Add Crop to Comparison...</option>
              {availableToAdd.map((r) => (
                <option key={r.crop.id} value={r.crop.id}>
                  {r.crop.emoji} {translateCropName(r.crop.name)} ({r.overallScore}%)
                </option>
              ))}
            </select>
          )}

          <button
            type="button"
            onClick={onClearCompare}
            className="px-3.5 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 rounded-xl transition cursor-pointer"
          >
            {t.compare.clearAll}
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="overflow-x-auto">
        <div
          className={`grid gap-4 min-w-[700px] ${
            comparedRecs.length === 1
              ? 'grid-cols-1 max-w-lg mx-auto'
              : comparedRecs.length === 2
              ? 'grid-cols-2'
              : comparedRecs.length === 3
              ? 'grid-cols-3'
              : 'grid-cols-4'
          }`}
        >
          {comparedRecs.map((rec) => {
            const { crop, overallScore, suitabilityCategory, factorScores, strengths, weaknesses } = rec;

            return (
              <div
                key={crop.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between space-y-4 relative"
              >
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => onToggleCompare(crop.id)}
                  className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 flex items-center justify-center transition cursor-pointer"
                  title="Remove from comparison"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Crop Header */}
                <div>
                  <div className="text-4xl p-2 bg-slate-50 rounded-xl w-fit mb-2">
                    {crop.emoji}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 m-0">
                    {translateCropName(crop.name)}
                  </h3>
                  <div className="text-xs text-slate-500 italic mb-2">
                    {crop.scientificName}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-slate-900">
                      {overallScore}%
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        suitabilityCategory === 'Highly Suitable'
                          ? 'bg-emerald-100 text-emerald-800'
                          : suitabilityCategory === 'Moderately Suitable'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {translateSuitability(suitabilityCategory)}
                    </span>
                  </div>
                </div>

                {/* Quick Attributes */}
                <div className="bg-slate-50 rounded-xl p-3 space-y-2 text-xs border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Category:</span>
                    <span className="font-semibold text-slate-800">{translateCategory(crop.category)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration:</span>
                    <span className="font-semibold text-slate-800">{crop.typicalDurationDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Water Need:</span>
                    <span className="font-semibold text-slate-800">{crop.waterRequirement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Avg Yield:</span>
                    <span className="font-semibold text-slate-800">{crop.averageYield}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Market Value:</span>
                    <span className="font-semibold text-emerald-700">{crop.marketValue}</span>
                  </div>
                </div>

                {/* Factor Scores Breakdown */}
                <div className="space-y-1.5 text-xs">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Factor Alignment:
                  </div>
                  {[
                    factorScores.temperature,
                    factorScores.rainfall,
                    factorScores.ph,
                    factorScores.soilType,
                    factorScores.season
                  ].map((f) => (
                    <div key={f.name} className="flex items-center justify-between py-0.5">
                      <span className="text-slate-600">{f.name}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              f.score >= 80 ? 'bg-emerald-500' : f.score >= 60 ? 'bg-blue-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${f.score}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-[11px] text-slate-700">{f.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Primary Strength */}
                {strengths[0] && (
                  <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-2.5 text-xs text-emerald-900">
                    <div className="font-bold mb-0.5 text-[11px] flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Key Advantage:
                    </div>
                    <div className="text-[11px] leading-relaxed">{strengths[0]}</div>
                  </div>
                )}

                {/* Primary Limiting Factor */}
                {weaknesses[0] && (
                  <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-2.5 text-xs text-amber-950">
                    <div className="font-bold mb-0.5 text-[11px] flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Critical Limitation:
                    </div>
                    <div className="text-[11px] leading-relaxed">{weaknesses[0]}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
