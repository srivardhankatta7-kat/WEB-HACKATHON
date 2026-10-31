import React, { useState } from 'react';
import { runDatasetEvaluation } from '../engine/modelEvaluationEngine';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles,
  BarChart3,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  Filter,
  RefreshCw,
  Search
} from 'lucide-react';

export const ModelEvaluationView: React.FC = () => {
  const { t, translateCropName } = useLanguage();
  const [evalState, setEvalState] = useState(() => runDatasetEvaluation());
  const [running, setRunning] = useState(false);
  const [sampleFilter, setSampleFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [searchCrop, setSearchCrop] = useState('');

  const { results, evaluatedSamples } = evalState;

  const handleRerun = () => {
    setRunning(true);
    setTimeout(() => {
      setEvalState(runDatasetEvaluation());
      setRunning(false);
    }, 400);
  };

  const filteredSamples = evaluatedSamples.filter((s) => {
    if (sampleFilter === 'correct' && !s.isTop1Correct) return false;
    if (sampleFilter === 'incorrect' && s.isTop1Correct) return false;
    if (searchCrop.trim()) {
      const q = searchCrop.toLowerCase();
      const localizedTrue = translateCropName(s.trueLabel).toLowerCase();
      const localizedPred = translateCropName(s.predictedCrop || '').toLowerCase();
      if (!s.trueLabel.toLowerCase().includes(q) && !(s.predictedCrop || '').toLowerCase().includes(q) && !localizedTrue.includes(q) && !localizedPred.includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-sm border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5" /> {t.evaluation.badge}
              </span>
              <span className="text-xs text-slate-400 font-mono">Dataset: 80 Verified Agro-Climatic Records</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-2 mb-1">
              {t.evaluation.title}
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed m-0">
              {t.evaluation.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={handleRerun}
            disabled={running}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            {running ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
            <span>{t.evaluation.runBtn}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Top-1 Accuracy */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t.evaluation.top1Accuracy}</div>
          <div className="text-3xl font-black text-emerald-600 mt-1">{results.top1Accuracy}%</div>
          <div className="text-[11px] text-slate-500 mt-1">Exact #1 Match Rate</div>
        </div>

        {/* Top-3 Accuracy */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t.evaluation.top3Recall}</div>
          <div className="text-3xl font-black text-blue-600 mt-1">{results.top3Accuracy}%</div>
          <div className="text-[11px] text-slate-500 mt-1">True Crop in Top 3</div>
        </div>

        {/* Macro F1 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t.evaluation.macroF1}</div>
          <div className="text-3xl font-black text-indigo-600 mt-1">{results.macroF1}%</div>
          <div className="text-[11px] text-slate-500 mt-1">Harmonic Precision/Recall</div>
        </div>

        {/* Macro Precision */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t.evaluation.macroPrecision}</div>
          <div className="text-3xl font-black text-teal-600 mt-1">{results.macroPrecision}%</div>
          <div className="text-[11px] text-slate-500 mt-1">Positive Prediction Rate</div>
        </div>

        {/* k-NN Baseline Comparison */}
        <div className="bg-white rounded-2xl p-4 border border-amber-200 bg-amber-50/20 shadow-xs col-span-2 lg:col-span-1">
          <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">{t.evaluation.knnBaseline}</div>
          <div className="text-3xl font-black text-amber-700 mt-1">{results.knnTop1Accuracy}%</div>
          <div className="text-[11px] text-amber-700 mt-1">
            Engine Delta: <strong className="text-emerald-700 font-bold">+{(results.top1Accuracy - results.knnTop1Accuracy).toFixed(1)}%</strong>
          </div>
        </div>
      </div>

      {/* Class Metrics Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
            <span>{t.evaluation.perCropTableTitle}</span>
          </h3>
          <span className="text-xs text-slate-500">Evaluated on {results.totalSamples} labelled test instances</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 font-bold text-slate-700 uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-3">Crop Name</th>
                <th className="p-3 text-center">Sample Count (Support)</th>
                <th className="p-3 text-center">Precision (%)</th>
                <th className="p-3 text-center">Recall (%)</th>
                <th className="p-3 text-center">F1-Score (%)</th>
                <th className="p-3">Performance Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {results.classMetrics.map((cm) => (
                <tr key={cm.crop} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-slate-900">{translateCropName(cm.crop)}</td>
                  <td className="p-3 text-center font-mono text-slate-600">{cm.support}</td>
                  <td className="p-3 text-center font-mono text-emerald-700 font-bold">{cm.precision}%</td>
                  <td className="p-3 text-center font-mono text-blue-700 font-bold">{cm.recall}%</td>
                  <td className="p-3 text-center font-mono text-indigo-700 font-bold">{cm.f1Score}%</td>
                  <td className="p-3">
                    {cm.f1Score >= 90 ? (
                      <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                        High Confidence
                      </span>
                    ) : cm.f1Score >= 75 ? (
                      <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                        Robust
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                        Borderline Boundary
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confusion Matrix */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <span>{t.evaluation.confusionMatrixTitle}</span>
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Rows represent Ground-Truth Labels; Columns represent Predicted Top-1 Recommendations. Diagonal cells denote correct classifications.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs border border-slate-200">
            <thead className="bg-slate-100 font-bold text-slate-700 text-[10px]">
              <tr>
                <th className="p-2 border border-slate-200 text-left">True ↓ \ Pred →</th>
                {results.confusionMatrix.labels.map((l) => (
                  <th key={l} className="p-2 border border-slate-200 max-w-[90px] truncate" title={translateCropName(l)}>
                    {translateCropName(l).split(' ')[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.confusionMatrix.matrix.map((row, rowIdx) => {
                const labelName = results.confusionMatrix.labels[rowIdx];
                return (
                  <tr key={labelName}>
                    <td className="p-2 border border-slate-200 font-bold text-left bg-slate-50 max-w-[130px] truncate" title={translateCropName(labelName)}>
                      {translateCropName(labelName)}
                    </td>
                    {row.map((val, colIdx) => {
                      const isDiagonal = rowIdx === colIdx;
                      return (
                        <td
                          key={colIdx}
                          className={`p-2 border border-slate-200 font-mono font-bold ${
                            isDiagonal
                              ? val > 0
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-50 text-slate-400'
                              : val > 0
                              ? 'bg-rose-100 text-rose-800'
                              : 'text-slate-300'
                          }`}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Sample Inspector */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Filter className="w-5 h-5 text-indigo-600" />
              <span>{t.evaluation.inspectorTitle}</span>
            </h3>
            <p className="text-xs text-slate-500 m-0">Inspect individual sample parameters and engine predictions</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchCrop}
                onChange={(e) => setSearchCrop(e.target.value)}
                placeholder="Filter by crop name..."
                className="text-xs bg-slate-50 border border-slate-200 pl-8 pr-3 py-1.5 rounded-lg outline-none"
              />
            </div>

            <div className="flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs">
              <button
                type="button"
                onClick={() => setSampleFilter('all')}
                className={`px-2.5 py-1 rounded-md font-medium cursor-pointer ${
                  sampleFilter === 'all' ? 'bg-white shadow-xs font-bold text-slate-900' : 'text-slate-600'
                }`}
              >
                All ({evaluatedSamples.length})
              </button>
              <button
                type="button"
                onClick={() => setSampleFilter('correct')}
                className={`px-2.5 py-1 rounded-md font-medium cursor-pointer ${
                  sampleFilter === 'correct' ? 'bg-white shadow-xs font-bold text-emerald-700' : 'text-slate-600'
                }`}
              >
                Correct
              </button>
              <button
                type="button"
                onClick={() => setSampleFilter('incorrect')}
                className={`px-2.5 py-1 rounded-md font-medium cursor-pointer ${
                  sampleFilter === 'incorrect' ? 'bg-white shadow-xs font-bold text-rose-700' : 'text-slate-600'
                }`}
              >
                Incorrect
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {filteredSamples.map((sample) => (
            <div
              key={sample.id}
              className={`p-3.5 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                sample.isTop1Correct
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-rose-50/40 border-rose-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {sample.isTop1Correct ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span>True: {translateCropName(sample.trueLabel)}</span>
                    <span className="text-slate-400 font-normal">→</span>
                    <span className={sample.isTop1Correct ? 'text-emerald-700' : 'text-rose-700 font-bold'}>
                      Predicted: {translateCropName(sample.predictedCrop || '')}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Soil: {sample.soilType} • pH: {sample.ph} • Rain: {sample.rainfall}mm • Temp: {sample.temperature}°C • Hum: {sample.humidity}% • Season: {sample.season}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] text-slate-500">
                  Top 3: {sample.top3Predictions?.map((c) => translateCropName(c)).join(', ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
