import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  BookOpen,
  Scale,
  ShieldAlert,
  AlertTriangle
} from 'lucide-react';

export const MethodologyLimitationsView: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> {t.methodology.badge}
          </span>
          <span className="text-xs text-slate-500 font-mono">Reference ID: HACK-P302-DOC</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 mt-2 mb-1">
          {t.methodology.title}
        </h2>
        <p className="text-sm text-slate-600 m-0 leading-relaxed">
          {t.methodology.subtitle}
        </p>
      </div>

      {/* STATUTORY ADVISORY MANDATE */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 text-amber-950 space-y-2">
        <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <span>{t.methodology.disclaimerTitle}</span>
        </div>
        <p className="text-xs leading-relaxed m-0 text-amber-900">
          This system is an <strong>educational student hackathon prototype</strong>. Outputs represent advisory approximations calculated from historical agro-climatic ranges (FAO Ecocrop and ICAR guidelines). They do <strong>NOT</strong> guarantee specific crop yields, disease immunity, or market profitability. <strong>Farmers and researchers must always consult local Krishi Vigyan Kendras (KVK), district agricultural extension officers, or certified agronomists before committing capital or purchasing seed/fertilizer inputs.</strong>
        </p>
      </div>

      {/* 1. MATHEMATICAL FORMULATION OF RECOMMENDATION METHOD */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Scale className="w-5 h-5 text-emerald-600" />
          <span>{t.methodology.mathTitle}</span>
        </h3>

        <p className="text-xs text-slate-700 leading-relaxed">
          Unlike simplistic binary or lookup systems that classify environments as either valid or invalid, AgroGuide DSS employs a <strong>continuous trapezoidal membership function</strong> for each continuous environmental parameter (temperature, rainfall, soil pH, and humidity). The biological response curve is defined as:
        </p>

        {/* Formula Box */}
        <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs space-y-2 overflow-x-auto">
          <div className="text-emerald-400 font-bold">// Trapezoidal Membership Function f(x) for parameter x:</div>
          <div>If (x &gt;= minIdeal &amp;&amp; x &lt;= maxIdeal): &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score = 100%</div>
          <div>If (x &gt;= minTolerable &amp;&amp; x &lt; minIdeal): &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score = 50 + 45 * ((x - minTolerable) / (minIdeal - minTolerable))</div>
          <div>If (x &gt; maxIdeal &amp;&amp; x &lt;= maxTolerable): &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score = 50 + 45 * ((maxTolerable - x) / (maxTolerable - maxIdeal))</div>
          <div>If (x &lt; minTolerable || x &gt; maxTolerable): &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score = max(0, 45 - Penalty(x))</div>
        </div>

        {/* Weights Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-100 font-bold text-slate-700 text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3">Parameter</th>
                <th className="p-3 text-center">Standard Weight</th>
                <th className="p-3 text-center">No-NPK Weight</th>
                <th className="p-3">Agronomic Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-semibold text-slate-900">Annual / Seasonal Rainfall</td>
                <td className="p-3 text-center font-bold font-mono text-emerald-700">18%</td>
                <td className="p-3 text-center font-mono text-slate-600">21%</td>
                <td className="p-3 text-[11px]">Primary physiological growth driver; governs waterlogging vs drought stress.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Mean Temperature</td>
                <td className="p-3 text-center font-bold font-mono text-emerald-700">18%</td>
                <td className="p-3 text-center font-mono text-slate-600">21%</td>
                <td className="p-3 text-[11px]">Governs enzymatic activity, germination rate, flowering, and terminal heat stress.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Soil Reaction (pH)</td>
                <td className="p-3 text-center font-bold font-mono text-emerald-700">14%</td>
                <td className="p-3 text-center font-mono text-slate-600">16%</td>
                <td className="p-3 text-[11px]">Directly determines nutrient solubility, aluminum toxicity, and microbial health.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Soil Texture Compatibility</td>
                <td className="p-3 text-center font-bold font-mono text-emerald-700">14%</td>
                <td className="p-3 text-center font-mono text-slate-600">16%</td>
                <td className="p-3 text-[11px]">Determines internal drainage, aeration, root penetration, and cation exchange capacity (CEC).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Macronutrients (N-P-K)</td>
                <td className="p-3 text-center font-bold font-mono text-emerald-700">14% (5+4+5)</td>
                <td className="p-3 text-center font-mono text-rose-600">0% (Redistributed)</td>
                <td className="p-3 text-[11px]">Supplies vegetative vigor (N), root establishment (P), and drought/disease resilience (K).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Relative Humidity</td>
                <td className="p-3 text-center font-bold font-mono text-emerald-700">12%</td>
                <td className="p-3 text-center font-mono text-slate-600">14%</td>
                <td className="p-3 text-[11px]">Dictates atmospheric vapor pressure deficit (VPD) and fungal pathogen proliferation.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Cropping Season</td>
                <td className="p-3 text-center font-bold font-mono text-emerald-700">10%</td>
                <td className="p-3 text-center font-mono text-slate-600">12%</td>
                <td className="p-3 text-[11px]">Photoperiod matching across Kharif (monsoon), Rabi (winter), and Zaid (summer).</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Penalty Multipliers */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
          <div className="font-bold text-slate-900">Critical Factor Penalty Multiplication:</div>
          <p className="m-0 leading-relaxed text-[11px]">
            To prevent crops from scoring highly due to compensation by other factors when one vital physiological boundary is violated, the composite score is penalized with multiplicative reduction factors:
          </p>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600">
            <li>Temperature incompatibility (Score &lt; 20): Multiplier <strong>x0.55</strong></li>
            <li>Rainfall deficit/excess (Score &lt; 20): Multiplier <strong>x0.65</strong></li>
            <li>Soil pH extremes (Score &lt; 20): Multiplier <strong>x0.60</strong></li>
            <li>Off-season planting without greenhouse (Score &lt; 20): Multiplier <strong>x0.50</strong></li>
          </ul>
        </div>
      </div>

      {/* 2. INHERENT SYSTEM LIMITATIONS */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-rose-900 uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
          <span>{t.methodology.limitationsTitle}</span>
        </h3>
        <p className="text-xs text-slate-700 leading-relaxed">
          Agricultural systems are governed by highly non-linear, chaotic biological and environmental variables. The DSS explicitly identifies the following limitations:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              <span>1. Microclimatic &amp; Topographical Variations</span>
            </div>
            <p className="text-slate-600 m-0 leading-relaxed text-[11px]">
              Weather API and district-level averages cannot capture field-specific microclimates: frost pockets in valley bottoms, slope aspect (north vs. south facing solar radiation), windbreaks, and elevation changes within the same parcel.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              <span>2. Biological Pathogen &amp; Pest Outbreaks</span>
            </div>
            <p className="text-slate-600 m-0 leading-relaxed text-[11px]">
              The algorithm assumes standard pest control. It cannot anticipate catastrophic migratory pests (e.g., desert locust swarms), soil-borne cyst nematodes, or mutant fungal epidemics (e.g., wheat blast, bacterial leaf blight) that override environmental suitability.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              <span>3. Subsurface Soil Stratigraphy &amp; Drainage</span>
            </div>
            <p className="text-slate-600 m-0 leading-relaxed text-[11px]">
              The model evaluates topsoil texture (0-20 cm depth). Subsurface hardpans (dense clay or calcic layers at 40 cm), high perched water tables, or subsoil salinity layers cannot be detected without deep core auger boring.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              <span>4. Market Volatility &amp; Post-Harvest Infrastructure</span>
            </div>
            <p className="text-slate-600 m-0 leading-relaxed text-[11px]">
              A crop may have 98% agronomic suitability but prove economically unviable due to lack of local cold chain facilities (e.g. perishable fruits), distant APMC mandis, volatile market prices, or lack of government Minimum Support Price (MSP) procurement.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              <span>5. Farmer Self-Reporting &amp; Sensor Calibration</span>
            </div>
            <p className="text-slate-600 m-0 leading-relaxed text-[11px]">
              User inputs gathered via colorimetric paper pH strips or uncalibrated DIY soil sensors carry measurement uncertainties of ±0.5 pH units. In contrast, NABL-accredited laboratory spectrophotometry is needed for precision chemical balancing.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              <span>6. Climate Change &amp; Extreme Weather Anomaly Spikes</span>
            </div>
            <p className="text-slate-600 m-0 leading-relaxed text-[11px]">
              Traditional seasonal baselines are increasingly disrupted by flash droughts, unseasonal hailstorms during harvesting, and erratic cloudbursts that fall outside historical 30-year agro-climatic normal distributions.
            </p>
          </div>
        </div>
      </div>

      {/* 3. SCIENTIFIC DATASET SOURCES & CITATIONS */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>{t.methodology.sourcesTitle}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200">
            <div className="font-bold text-emerald-950 mb-1">FAO Ecocrop Database</div>
            <p className="text-emerald-800 m-0 leading-relaxed text-[11px]">
              United Nations Food and Agriculture Organization crop environmental requirements database, defining minimum, ideal, and maximum temperature, rainfall, and pH limits.
            </p>
          </div>
          <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-200">
            <div className="font-bold text-blue-950 mb-1">ICAR Handbooks of Agriculture</div>
            <p className="text-blue-800 m-0 leading-relaxed text-[11px]">
              Indian Council of Agricultural Research agronomy compendia across ICAR-IARI (Cereals), ICAR-IIPR (Pulses), ICAR-CICR (Cotton), and ICAR-IISR (Sugarcane).
            </p>
          </div>
          <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-900 mb-1">FAO Soil Bulletin No. 17 &amp; FAI</div>
            <p className="text-slate-700 m-0 leading-relaxed text-[11px]">
              Soil Test Crop Response (STCR) fertilizer calibration models and Fertilizer Association of India nutrient management recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
