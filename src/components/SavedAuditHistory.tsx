import React from 'react';
import type { SavedAudit } from '../types/crop';
import { useLanguage } from '../context/LanguageContext';
import {
  BookmarkCheck,
  Trash2,
  ArrowRight,
  Plus
} from 'lucide-react';

interface SavedAuditHistoryProps {
  savedAudits: SavedAudit[];
  onLoadAudit: (audit: SavedAudit) => void;
  onDeleteAudit: (id: string) => void;
  onClearAll: () => void;
  onNavigateToForm: () => void;
}

export const SavedAuditHistory: React.FC<SavedAuditHistoryProps> = ({
  savedAudits,
  onLoadAudit,
  onDeleteAudit,
  onClearAll,
  onNavigateToForm
}) => {
  const { t, translateCropName } = useLanguage();

  if (savedAudits.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
          <BookmarkCheck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 m-0">{t.saved.emptyTitle}</h2>
        <p className="text-sm text-slate-600 m-0 max-w-md mx-auto">
          {t.saved.emptyDesc}
        </p>
        <button
          type="button"
          onClick={onNavigateToForm}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t.saved.createNewBtn}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Local Storage History
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {savedAudits.length} Saved Evaluations
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-2 mb-1">
            {t.saved.title}
          </h2>
          <p className="text-xs text-slate-600 m-0 leading-relaxed">
            Quickly reload prior farm edaphic parameters or export saved audits to CSV/PDF.
          </p>
        </div>

        <button
          type="button"
          onClick={onClearAll}
          className="px-4 py-2 bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t.saved.clearAll}</span>
        </button>
      </div>

      <div className="space-y-3">
        {savedAudits.map((audit) => (
          <div
            key={audit.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-300 transition"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{audit.title}</span>
                <span className="bg-slate-100 text-slate-600 font-mono text-[10px] px-2 py-0.5 rounded">
                  {audit.id}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 mb-2">
                Evaluated: {audit.timestamp}
              </p>
              <div className="text-xs text-slate-700">
                Top Crop: <strong className="text-emerald-700">{translateCropName(audit.topCrop)}</strong> ({audit.topScore}% Match)
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onLoadAudit(audit)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>{t.saved.loadAudit}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onDeleteAudit(audit.id)}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 flex items-center justify-center transition cursor-pointer"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
