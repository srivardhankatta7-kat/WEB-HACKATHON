import React, { useState } from 'react';
import type { CropRecommendation, FarmInputData } from '../types/crop';
import { generateFertilizerGuidance } from '../services/fertilizerAdvisor';
import { CROPS_DATABASE } from '../data/cropsData';
import { useLanguage } from '../context/LanguageContext';
import {
  FlaskConical,
  Sprout,
  ShieldAlert,
  Package,
  Calendar,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

interface FertilizerGuidanceViewProps {
  inputData: FarmInputData;
  recommendations: CropRecommendation[];
}

export const FertilizerGuidanceView: React.FC<FertilizerGuidanceViewProps> = ({
  inputData,
  recommendations
}) => {
  const { t, translateCropName } = useLanguage();
  const initialCropId = recommendations[0]?.crop.id || 'rice';
  const [selectedCropId, setSelectedCropId] = useState<string>(initialCropId);

  const selectedCrop =
    CROPS_DATABASE.find((c) => c.id === selectedCropId) || CROPS_DATABASE[0];

  const guidance = generateFertilizerGuidance(selectedCrop, inputData);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Institutional Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 shadow-sm border border-emerald-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <FlaskConical className="w-3.5 h-3.5" /> {t.fertilizer.badge}
              </span>
              <span className="text-xs text-emerald-200">ICAR & FAO Scientific Compendium</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-2 mb-1">
              {t.fertilizer.title}
            </h2>
            <p className="text-xs text-emerald-100 max-w-2xl leading-relaxed m-0">
              {t.fertilizer.subtitle}
            </p>
          </div>

          {/* Crop Selector Dropdown */}
          <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-800/80 min-w-[240px]">
            <label className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block mb-1.5">
              {t.fertilizer.selectTargetCrop}
            </label>
            <select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              className="w-full bg-slate-900 border border-emerald-700 text-white text-xs rounded-lg px-3 py-2 outline-none font-medium"
            >
              <optgroup label="Top Recommended Crops">
                {recommendations.slice(0, 5).map((r) => (
                  <option key={r.crop.id} value={r.crop.id}>
                    {r.crop.emoji} {translateCropName(r.crop.name)} (#{r.rank} - {r.overallScore}% {t.results.match})
                  </option>
                ))}
              </optgroup>
              <optgroup label="All Database Crops">
                {CROPS_DATABASE.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.emoji} {translateCropName(c.name)}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      {/* Advisory Status Alert */}
      {!inputData.hasNpkData && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-amber-950 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-amber-900">Baseline Soil Fertility Assumed: </span>
            {t.fertilizer.baselineAlert}
          </div>
        </div>
      )}

      {/* 1. Soil Interpretation & Deficit Analysis */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-600" />
          <span>{t.fertilizer.nutrientStatusTitle} ({translateCropName(selectedCrop.name)})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {guidance.deficits.map((d) => (
            <div
              key={d.nutrient}
              className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 text-sm">{d.nutrient}</span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    d.soilStatus === 'Low'
                      ? 'bg-rose-100 text-rose-800'
                      : d.soilStatus === 'Medium'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  Soil Level: {d.soilStatus}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Crop Ideal Need:</span>
                  <span className="font-mono font-semibold text-slate-800">{d.targetRequirementKgHa} kg/ha</span>
                </div>
                <div className="flex justify-between">
                  <span>Soil Available Supply:</span>
                  <span className="font-mono font-semibold text-slate-800">{d.soilSupplyKgHa} kg/ha</span>
                </div>
                <div className="border-t border-slate-200 pt-1.5 flex justify-between font-bold text-emerald-800">
                  <span>Supplemental Deficit:</span>
                  <span className="font-mono text-sm">{d.netDeficitKgHa} kg/ha</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Commercial Fertilizer Dosages */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-600" />
            <span>{t.fertilizer.commercialProductsTitle}</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">Standard 50 kg Bag Equivalent</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {guidance.commercialFertilizers.map((fert) => (
            <div
              key={fert.name}
              className="border-2 border-emerald-100 bg-emerald-50/30 rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <div className="font-bold text-slate-900 text-sm">{fert.name}</div>
                <div className="text-[11px] text-emerald-800 font-medium mt-0.5">{fert.nutrientSupplied}</div>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">{fert.rateKgHa}</span>
                  <span className="text-xs font-semibold text-slate-500">kg/hectare</span>
                </div>

                <div className="text-xs font-medium text-slate-700 mt-1">
                  ≈ <strong className="text-emerald-700">{fert.bags50kgPerHa} {t.fertilizer.bagsUnit}</strong>
                </div>
              </div>

              {fert.costEstimateInr && (
                <div className="mt-4 pt-3 border-t border-emerald-200/60 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> {t.fertilizer.costEstimate}
                  </span>
                  <span className="font-bold text-slate-900 font-mono">₹{fert.costEstimateInr.toLocaleString()} / ha</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Split Application Timeline */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <span>{t.fertilizer.splitScheduleTitle}</span>
        </h3>

        <div className="space-y-3">
          {guidance.splitSchedule.map((stage, idx) => (
            <div
              key={stage.stage}
              className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  #{idx + 1}
                </span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{stage.stage}</div>
                  <div className="text-xs text-emerald-700 font-medium mt-0.5">{stage.timing}</div>
                  <p className="text-xs text-slate-600 mt-1 mb-0 leading-relaxed">{stage.notes}</p>
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 shrink-0 md:w-72">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Product Dosages:
                </div>
                {stage.fertilizers.map((f) => (
                  <div key={f.productName} className="text-xs flex justify-between py-0.5 border-b border-slate-100 last:border-0">
                    <span className="font-medium text-slate-800">{f.productName}:</span>
                    <span className="font-bold text-emerald-700">{f.dosageKgHa} kg/ha</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Soil pH Amendment & Biofertilizers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* pH Remediation */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>{t.fertilizer.phAmendmentTitle}</span>
          </h3>

          {guidance.phAmendment ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2 text-xs">
              <div className="font-bold text-amber-950 text-sm">{guidance.phAmendment.material}</div>
              <div className="text-amber-900 leading-relaxed">{guidance.phAmendment.reason}</div>
              <div className="flex items-center justify-between font-bold text-amber-950 pt-2 border-t border-amber-200">
                <span>Application Rate:</span>
                <span className="font-mono text-sm">{guidance.phAmendment.rateKgHa} kg / ha</span>
              </div>
              <div className="text-[11px] text-amber-800 mt-1 italic">{guidance.phAmendment.applicationTiming}</div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Current soil pH ({inputData.soilPh}) is within the optimal balanced range. No lime or gypsum amendment required.</span>
            </div>
          )}
        </div>

        {/* Biofertilizers */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-600" />
            <span>{t.fertilizer.biofertilizersTitle}</span>
          </h3>

          <div className="space-y-2.5">
            {guidance.biofertilizers.map((bio) => (
              <div key={bio.name} className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-xs">
                <div className="font-bold text-slate-900">{bio.name}</div>
                <div className="text-[11px] text-slate-600 mt-0.5">{bio.targetRole}</div>
                <div className="mt-1 text-emerald-800 font-medium">Dosage: {bio.dosage}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Institutional Citation Footer */}
      <div className="bg-slate-100 rounded-xl p-4 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800">Trusted Agronomic Authority: </span>
          {guidance.institutionalSource}. Formulated in accordance with the Fertilizer Control Order (FCO) of India and State Agricultural University (SAU) package of practices.
        </div>
      </div>
    </div>
  );
};
