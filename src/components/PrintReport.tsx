import React from 'react';
import type { CropRecommendation, FarmInputData } from '../types/crop';
import { calculateDataCompleteness } from '../engine/recommendationEngine';
import { useLanguage } from '../context/LanguageContext';
import {
  Printer,
  Download,
  FileSpreadsheet,
  BookmarkCheck,
  ShieldAlert,
  Sprout,
  CheckCircle
} from 'lucide-react';

interface PrintReportProps {
  inputData: FarmInputData;
  recommendations: CropRecommendation[];
  onSaveAudit: () => void;
}

export const PrintReport: React.FC<PrintReportProps> = ({
  inputData,
  recommendations,
  onSaveAudit
}) => {
  const { t, translateCropName, translateCategory, translateSuitability, translateSoilType, translateSeason } = useLanguage();
  const completeness = calculateDataCompleteness(inputData);
  const topCrops = recommendations.slice(0, 5);
  const [auditDate] = React.useState(() =>
    new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  );
  const auditId = `AGRI-${Math.abs(
    (inputData.rainfall * 31 + inputData.temperature * 17 + inputData.soilPh * 7) | 0
  )
    .toString(16)
    .toUpperCase()}`;

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const exportData = {
      auditId,
      timestamp: new Date().toISOString(),
      problemId: 'HACK-P302',
      farmer: {
        name: inputData.farmerName || 'Anonymous Farmer',
        location: inputData.farmLocation || 'Unspecified Location'
      },
      inputParameters: inputData,
      completeness,
      topRecommendations: topCrops.map((r) => ({
        rank: r.rank,
        crop: r.crop.name,
        scientificName: r.crop.scientificName,
        category: r.crop.category,
        overallScore: r.overallScore,
        suitabilityCategory: r.suitabilityCategory,
        keyStrengths: r.strengths,
        limitingFactors: r.weaknesses,
        amendments: r.amendmentsNeeded
      })),
      disclaimer:
        'Outputs are decision-support estimates based on FAO Ecocrop and ICAR guidelines. Local agricultural extension consultation is recommended.'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crop-recommendation-${auditId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    const headers = [
      'Rank',
      'Crop Name',
      'Scientific Name',
      'Category',
      'Suitability Score (%)',
      'Suitability Category',
      'Water Requirement',
      'Expected Yield',
      'Duration'
    ];

    const rows = recommendations.map((r) => [
      r.rank,
      `"${r.crop.name}"`,
      `"${r.crop.scientificName}"`,
      `"${r.crop.category}"`,
      r.overallScore,
      `"${r.suitabilityCategory}"`,
      `"${r.crop.waterRequirement}"`,
      `"${r.crop.averageYield}"`,
      `"${r.crop.typicalDurationDays}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const a = document.createElement('a');
    a.href = encodedUri;
    a.download = `crop-recommendations-${auditId}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar (Hidden in Print) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Print & Export Deliverable
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1 mb-0.5">
              Official Recommendation Audit Summary
            </h2>
            <p className="text-sm text-slate-600 m-0">
              Generate a publication-grade agronomic advisory report formatted for print or download.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{t.report.printBtn}</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 transition flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleExportJson}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>{t.report.exportJsonBtn}</span>
            </button>

            <button
              onClick={onSaveAudit}
              className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs rounded-xl border border-emerald-300 transition flex items-center gap-1.5 cursor-pointer"
            >
              <BookmarkCheck className="w-4 h-4 text-emerald-600" />
              <span>{t.report.saveAuditBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* PRINTABLE REPORT SHEET CONTAINER */}
      <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-md border border-slate-300 text-slate-900 max-w-4xl mx-auto print:shadow-none print:border-none print:p-0">
        {/* Document Header */}
        <div className="border-b-2 border-emerald-800 pb-5 mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold">
              <Sprout className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest font-bold text-emerald-800">
                AgroGuide Decision Support System
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">
                CROP SUITABILITY AUDIT & ADVISORY REPORT
              </h1>
              <div className="text-xs text-slate-500 font-mono mt-0.5">
                Benchmark Standard: FAO Ecocrop & ICAR Agronomic Compendia • Project HACK-P302
              </div>
            </div>
          </div>

          <div className="text-right text-xs text-slate-600 font-mono">
            <div>
              Audit Ref: <strong className="text-slate-900">{auditId}</strong>
            </div>
            <div>Date: {auditDate}</div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1">
              {completeness.confidenceLevel} Confidence ({completeness.score}% Data Completeness)
            </div>
          </div>
        </div>

        {/* Farmer & Location Profile */}
        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-xs">
          <div>
            <div className="text-slate-500 uppercase font-semibold text-[10px]">Farmer / Grower</div>
            <div className="font-bold text-sm text-slate-900">
              {inputData.farmerName || 'Independent Farmer / Field Auditor'}
            </div>
          </div>
          <div>
            <div className="text-slate-500 uppercase font-semibold text-[10px]">Farm Location</div>
            <div className="font-bold text-sm text-slate-900">
              {inputData.farmLocation || 'Specified Agro-Ecological Test Basin'}
            </div>
          </div>
        </div>

        {/* Input Parameters Summary Table */}
        <div className="mb-6">
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-700 mb-2">
            1. Verified Soil & Environmental Input Parameters
          </h2>
          <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 font-bold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Parameter</th>
                  <th className="p-2.5">Recorded Field Value</th>
                  <th className="p-2.5">Unit</th>
                  <th className="p-2.5">Agronomic Quality Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2.5 font-semibold">Soil Texture / Type</td>
                  <td className="p-2.5 font-bold text-slate-900">{translateSoilType(inputData.soilType)}</td>
                  <td className="p-2.5 text-slate-500 font-mono">Texture Class</td>
                  <td className="p-2.5 text-emerald-700 font-semibold">Physical Structure Active</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold">Soil Reaction (pH)</td>
                  <td className="p-2.5 font-bold text-slate-900 font-mono">{inputData.soilPh.toFixed(1)}</td>
                  <td className="p-2.5 text-slate-500 font-mono">pH units (0-14)</td>
                  <td className="p-2.5">
                    {inputData.soilPh < 6.0
                      ? 'Acidic (Lime recommended)'
                      : inputData.soilPh > 7.5
                      ? 'Alkaline (Gypsum buffer)'
                      : 'Optimal Nutrient Neutral'}
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold">Rainfall (Seasonal/Annual)</td>
                  <td className="p-2.5 font-bold text-slate-900 font-mono">{inputData.rainfall}</td>
                  <td className="p-2.5 text-slate-500 font-mono">mm</td>
                  <td className="p-2.5">
                    {inputData.rainfall > 1200
                      ? 'High moisture / Monsoon wet'
                      : inputData.rainfall < 450
                      ? 'Arid / Low moisture reserve'
                      : 'Moderate precipitation'}
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold">Ambient Temperature</td>
                  <td className="p-2.5 font-bold text-slate-900 font-mono">{inputData.temperature}</td>
                  <td className="p-2.5 text-slate-500 font-mono">°C</td>
                  <td className="p-2.5">Vegetative thermal window</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold">Relative Atmospheric Humidity</td>
                  <td className="p-2.5 font-bold text-slate-900 font-mono">{inputData.humidity}</td>
                  <td className="p-2.5 text-slate-500 font-mono">%</td>
                  <td className="p-2.5">Vapor pressure balance</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold">Cropping Season</td>
                  <td className="p-2.5 font-bold text-slate-900">{translateSeason(inputData.season)}</td>
                  <td className="p-2.5 text-slate-500 font-mono">Agro-Season</td>
                  <td className="p-2.5">Seasonal calendar alignment</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold">Macronutrients (N - P - K)</td>
                  <td className="p-2.5 font-bold text-slate-900 font-mono">
                    {inputData.hasNpkData
                      ? `N: ${inputData.nitrogen} | P: ${inputData.phosphorus} | K: ${inputData.potassium}`
                      : 'Omitted (Baseline Assumed)'}
                  </td>
                  <td className="p-2.5 text-slate-500 font-mono">kg/ha</td>
                  <td className="p-2.5">
                    {inputData.hasNpkData
                      ? 'Direct laboratory readings active'
                      : 'Estimated regional baseline (Testing advised)'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* TOP 5 RECOMMENDATIONS TABLE */}
        <div className="mb-6">
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-700 mb-2">
            2. Top Ranked Crop Recommendations
          </h2>
          <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 font-bold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="p-2.5 text-center">Rank</th>
                  <th className="p-2.5">Crop Name</th>
                  <th className="p-2.5">Scientific Name</th>
                  <th className="p-2.5 text-center">Match %</th>
                  <th className="p-2.5">Category</th>
                  <th className="p-2.5">Water Requirement</th>
                  <th className="p-2.5">Primary Justification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topCrops.map((r) => (
                  <tr key={r.crop.id} className="hover:bg-slate-50">
                    <td className="p-2.5 text-center font-bold text-slate-800">
                      #{r.rank}
                    </td>
                    <td className="p-2.5 font-bold text-slate-900">
                      {r.crop.emoji} {translateCropName(r.crop.name)}
                    </td>
                    <td className="p-2.5 italic text-slate-600">
                      {r.crop.scientificName}
                    </td>
                    <td className="p-2.5 text-center font-black text-emerald-800 font-mono">
                      {r.overallScore}%
                    </td>
                    <td className="p-2.5 font-semibold text-slate-700">
                      {translateSuitability(r.suitabilityCategory)}
                    </td>
                    <td className="p-2.5 text-slate-600">
                      {translateCategory(r.crop.category)}
                    </td>
                    <td className="p-2.5 text-slate-700 text-[11px]">
                      {r.strengths[0] || 'Matches prevailing climatic ranges.'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Soil Health & Prescriptions */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-xs">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>3. Soil Health & Amendment Advisory for Top Recommendation ({topCrops[0]?.crop.name})</span>
          </h3>
          <div className="space-y-1.5 text-slate-700">
            {topCrops[0]?.amendmentsNeeded.length > 0 ? (
              topCrops[0].amendmentsNeeded.map((a, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>{a}</span>
                </div>
              ))
            ) : (
              <div className="text-emerald-800 font-semibold">
                Soil parameters and nutrient levels are well-balanced for {topCrops[0]?.crop.name}. Standard farmyard manure (FYM) application is recommended.
              </div>
            )}
          </div>
        </div>

        {/* STATUTORY ADVISORY DISCLAIMER */}
        <div className="border-t-2 border-dashed border-slate-300 pt-5 space-y-3 text-[11px] text-slate-600 leading-relaxed">
          <div className="flex items-start gap-2 bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-xs uppercase tracking-wide">
                Mandatory Agricultural Advisory & Safety Notice
              </strong>
              This recommendation report is generated by a student hackathon decision-support prototype (Problem HACK-P302) using standard agro-ecological threshold rules (FAO Ecocrop / ICAR). The results are algorithmic approximations and depend entirely upon user input accuracy. Real agricultural yields vary according to microclimates, seed varieties, pest epidemics, drainage, and market conditions. <strong>Farmers and growers must consult local agricultural extension officers (e.g. Krishi Vigyan Kendra - KVK, district agronomists) before making commercial, financial, or large-scale planting commitments.</strong>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-2 gap-8 text-center text-xs">
            <div className="border-t border-slate-300 pt-2 text-slate-500">
              Field Auditor / Farmer Signature
            </div>
            <div className="border-t border-slate-300 pt-2 text-slate-500">
              Extension Officer / KVK Agronomist Verification
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
