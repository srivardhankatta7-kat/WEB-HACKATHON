import React from 'react';
import type { CropRecommendation } from '../types/crop';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  TrendingUp,
  AlertTriangle,
  Scale,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

interface CropDetailModalProps {
  rec: CropRecommendation | null;
  onClose: () => void;
  onToggleCompare: (cropId: string) => void;
  isComparing: boolean;
}

export const CropDetailModal: React.FC<CropDetailModalProps> = ({
  rec,
  onClose,
  onToggleCompare,
  isComparing
}) => {
  const { translateCropName, translateCategory, translateSuitability } = useLanguage();
  if (!rec) return null;

  const { crop, factorScores, overallScore, suitabilityCategory, strengths, weaknesses, warnings, amendmentsNeeded } = rec;

  const factorsList = [
    factorScores.temperature,
    factorScores.rainfall,
    factorScores.humidity,
    factorScores.ph,
    factorScores.soilType,
    factorScores.season,
    factorScores.nitrogen,
    factorScores.phosphorus,
    factorScores.potassium
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 no-print">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-6 sticky top-0 z-10 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl p-2.5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shrink-0">
              {crop.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-emerald-700/80 text-emerald-100 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  Rank #{rec.rank}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                  {overallScore}% Match
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/20 text-white">
                  {translateSuitability(suitabilityCategory)}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1 mb-0.5">
                {translateCropName(crop.name)}
              </h2>
              <p className="text-xs text-emerald-200 italic m-0">
                {crop.scientificName} • {translateCategory(crop.category)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleCompare(crop.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition flex items-center gap-1 cursor-pointer ${
                isComparing
                  ? 'bg-amber-400 text-slate-950 border-amber-300'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isComparing ? 'Comparing' : 'Compare'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-xs text-slate-700">
          {/* Overview Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-slate-500 text-[11px]">Growing Period:</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">{crop.typicalDurationDays}</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-slate-500 text-[11px]">Water Footprint:</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">{crop.waterRequirement}</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-slate-500 text-[11px]">Average Yield:</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">{crop.averageYield}</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-slate-500 text-[11px]">Market Value:</div>
              <div className="font-bold text-emerald-700 text-sm mt-0.5">{crop.marketValue}</div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200/80 leading-relaxed text-slate-800">
            {crop.description}
          </div>

          {/* 9-Factor Alignment Matrix */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Multi-Factor Mathematical Alignment Matrix</span>
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 font-bold text-slate-700 uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Factor</th>
                    <th className="p-2.5">User Value</th>
                    <th className="p-2.5">Optimal Range</th>
                    <th className="p-2.5 text-center">Score</th>
                    <th className="p-2.5">Diagnostic Evaluation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {factorsList.map((f) => (
                    <tr key={f.name} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-900">{f.name}</td>
                      <td className="p-2.5 font-mono text-slate-700">{f.userValue}</td>
                      <td className="p-2.5 font-mono text-slate-500">{f.idealRange}</td>
                      <td className="p-2.5 text-center font-bold font-mono">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] ${
                            f.score >= 80
                              ? 'bg-emerald-100 text-emerald-800'
                              : f.score >= 60
                              ? 'bg-blue-100 text-blue-800'
                              : f.score >= 40
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {f.score}%
                        </span>
                      </td>
                      <td className="p-2.5 text-[11px] text-slate-600">{f.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-4 space-y-2">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5 text-xs">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Prime Agronomic Drivers</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-emerald-900 text-[11px]">
                {strengths.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="border border-amber-200 bg-amber-50/40 rounded-xl p-4 space-y-2">
              <div className="font-bold text-amber-950 flex items-center gap-1.5 text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Limiting Factors &amp; Risks</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-amber-900 text-[11px]">
                {weaknesses.map((w, idx) => (
                  <li key={idx}>{w}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Warnings & Amendments */}
          {(warnings.length > 0 || amendmentsNeeded.length > 0) && (
            <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-slate-50">
              <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Actionable Field Recommendations &amp; Warnings</span>
              </div>
              {warnings.map((warn, idx) => (
                <div key={idx} className="flex items-start gap-2 text-rose-800 text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-600" />
                  <span>{warn}</span>
                </div>
              ))}
              {amendmentsNeeded.map((amend, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-700 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-600" />
                  <span>{amend}</span>
                </div>
              ))}
            </div>
          )}

          {/* Scientific Source Reference */}
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>Calibrated Reference: {crop.sourceReference}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
