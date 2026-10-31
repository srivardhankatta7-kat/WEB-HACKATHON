import React from 'react';
import {
  ShieldAlert,
  BookOpen,
  Scale,
  FlaskConical,
  Sparkles
} from 'lucide-react';

export const AssumptionsModal: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> Agronomic Documentation
          </span>
          <span className="text-xs text-slate-500 font-medium">Problem ID: HACK-P302</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 mt-2 mb-1">
          System Assumptions, Decision Rules & Safety Disclaimers
        </h2>
        <p className="text-sm text-slate-600 m-0 leading-relaxed">
          Full scientific transparency on factor weighting, biological response functions, dataset sources, and ethical AI safety standards for agricultural decision support.
        </p>
      </div>

      {/* STATUTORY ADVISORY MANDATE */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 text-amber-950 space-y-2">
        <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <span>Statutory Advisory & Ethical AI Mandate</span>
        </div>
        <p className="text-xs leading-relaxed m-0 text-amber-900">
          This system is an <strong>educational student hackathon prototype</strong>. Outputs represent advisory approximations based on historical agronomic ranges. They do NOT guarantee specific crop yields, disease resistance, or commercial profitability. Soil conditions, microclimatic variations, seed cultivars, and pest outbreaks cannot be fully captured through online forms alone. <strong>Always consult certified agronomists, district agricultural officers, or local Krishi Vigyan Kendras (KVKs) before making substantial financial investments or sowing decisions.</strong>
        </p>
      </div>

      {/* 1. FACTOR WEIGHTING METHODOLOGY */}
      <div>
        <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-600" />
          <span>1. Multi-Factor Scoring Architecture</span>
        </h3>
        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
          Crop suitability is computed via a composite agronomic scoring function that evaluates nine distinct environmental and edaphic parameters. Each parameter uses a trapezoidal response function modeled on crop biological thresholds:
        </p>

        <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-100 font-bold text-slate-700 text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3">Factor</th>
                <th className="p-3 text-center">Standard Weight</th>
                <th className="p-3 text-center">No-NPK Weight</th>
                <th className="p-3">Agronomic Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-semibold text-slate-900">Rainfall / Moisture</td>
                <td className="p-3 text-center font-bold font-mono text-emerald-700">18%</td>
                <td className="p-3 text-center font-mono text-slate-600">21%</td>
                <td className="p-3 text-slate-600 text-[11px]">Primary physiological growth driver; governs drought or waterlogging risks.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Ambient Temperature</td>
                <td className="p-3 text-center font-bold font-mono text-emerald-700">18%</td>
                <td className="p-3 text-center font-mono text-slate-600">21%</td>
                <td className="p-3 text-slate-600 text-[11px]">Governs enzymatic activity, germination speed, flowering, and terminal heat stress.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Soil Reaction (pH)</td>
                <td className="p-3 text-center font-bold font-mono text-emerald-700">14%</td>
                <td className="p-3 text-center font-mono text-slate-600">16%</td>
                <td className="p-3 text-slate-600 text-[11px]">Directly determines availability and solubility of essential micro and macro nutrients.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Soil Texture Compatibility</td>
                <td className="p-3 text-center font-bold font-mono text-emerald-700">14%</td>
                <td className="p-3 text-center font-mono text-slate-600">16%</td>
                <td className="p-3 text-slate-600 text-[11px]">Determines internal drainage, aeration, root anchorage, and cation exchange capacity.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Macronutrients (N-P-K)</td>
                <td className="p-3 text-center font-bold font-mono text-emerald-700">14% (5+4+5)</td>
                <td className="p-3 text-center font-mono text-rose-600">0% (Redistributed)</td>
                <td className="p-3 text-slate-600 text-[11px]">Supplies vegetative vigor (N), root establishment (P), and disease resilience (K).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Atmospheric Humidity</td>
                <td className="p-3 text-center font-bold font-mono text-emerald-700">12%</td>
                <td className="p-3 text-center font-mono text-slate-600">14%</td>
                <td className="p-3 text-slate-600 text-[11px]">Affects transpiration rate and fungal spore proliferation (e.g. blast, rust).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Cropping Season</td>
                <td className="p-3 text-center font-bold font-mono text-emerald-700">10%</td>
                <td className="p-3 text-center font-mono text-slate-600">12%</td>
                <td className="p-3 text-slate-600 text-[11px]">Photoperiod alignment (Kharif, Rabi, Zaid, Perennial).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. MISSING DATA HANDLING */}
      <div>
        <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-emerald-600" />
          <span>2. Graceful Missing Data Handling</span>
        </h3>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
          <p className="m-0 leading-relaxed">
            In many developing agricultural regions, smallholder farmers lack immediate laboratory soil test data for Nitrogen, Phosphorus, and Potassium. Rather than blocking recommendations or fabricating readings, AgroGuide DSS implements:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-700">
            <li>
              <strong>Dynamic Weight Redistribution:</strong> When NPK is toggled off, the 14% nutrient weight is proportionally redistributed to climate and soil texture parameters.
            </li>
            <li>
              <strong>Data Completeness Index:</strong> The system displays an explicit completeness rating (e.g. 67% without NPK, 100% with NPK) and reduces the recommendation confidence flag from High to Moderate.
            </li>
            <li>
              <strong>Soil Health Testing Notice:</strong> An advisory banner reminds the farmer that laboratory soil analysis is necessary before purchasing high-cost fertilizers.
            </li>
          </ul>
        </div>
      </div>

      {/* 3. SCIENTIFIC DATASET SOURCES */}
      <div>
        <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>3. Agronomic Data Sources & Baselines</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200">
            <div className="font-bold text-emerald-950 mb-1">FAO Ecocrop Database</div>
            <p className="text-emerald-800 m-0 leading-relaxed text-[11px]">
              United Nations Food and Agriculture Organization crop environmental requirements database, defining minimum, ideal, and maximum temperature, rainfall, and pH limits.
            </p>
          </div>
          <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-200">
            <div className="font-bold text-blue-950 mb-1">ICAR Crop Compendia</div>
            <p className="text-blue-800 m-0 leading-relaxed text-[11px]">
              Indian Council of Agricultural Research handbooks across IIWBR (Wheat), NRRI (Rice), CICR (Cotton), and IIPR (Pulses) providing regional agro-climatic adaptability.
            </p>
          </div>
          <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-900 mb-1">USDA NRCS Soil Guidelines</div>
            <p className="text-slate-700 m-0 leading-relaxed text-[11px]">
              Natural Resources Conservation Service soil texture classification tables and drainage affinity ratings across Alluvial, Vertisol, and Laterite orders.
            </p>
          </div>
        </div>
      </div>

      {/* 4. DUAL ENGINE METHODOLOGY */}
      <div>
        <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>4. Multi-Paradigm Comparison (Rules vs k-NN)</span>
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          To promote academic rigour and comparative transparency, AgroGuide DSS provides both a deterministic <strong>Agronomic Rule Engine</strong> (with explicit factor penalties and trapezoidal curves) and an empirical <strong>k-NN Similarity Benchmark</strong> (which calculates normalized Euclidean distance to standardized crop centroids). This enables researchers to verify algorithmic consistency.
        </p>
      </div>
    </div>
  );
};
