import React, { useState, useMemo } from 'react';
import type { SavedAudit, FarmAttachment } from '../types/crop';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { getCloudCurrentMode } from '../services/firebase';
import { CloudStorageUploader } from './CloudStorageUploader';
import {
  Cloud,
  CheckCircle2,
  Trash2,
  ArrowRight,
  Plus,
  RefreshCw,
  Settings,
  Search,
  Paperclip,
  Download,
  Calendar,
  ChevronDown,
  ChevronUp,
  Lock
} from 'lucide-react';

interface SavedAuditHistoryProps {
  savedAudits: SavedAudit[];
  onLoadAudit: (audit: SavedAudit) => void;
  onDeleteAudit: (id: string) => void;
  onClearAll: () => void;
  onNavigateToForm: () => void;
  onOpenCloudSettings: () => void;
  onSyncCloud: () => void;
  isSyncing: boolean;
  onUpdateAuditAttachments?: (auditId: string, attachments: FarmAttachment[]) => void;
}

export const SavedAuditHistory: React.FC<SavedAuditHistoryProps> = ({
  savedAudits,
  onLoadAudit,
  onDeleteAudit,
  onClearAll,
  onNavigateToForm,
  onOpenCloudSettings,
  onSyncCloud,
  isSyncing,
  onUpdateAuditAttachments
}) => {
  const { t, translateCropName, translateSoilType, translateSeason } = useLanguage();
  const { hasPermission } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'synced' | 'with_attachments'>('all');
  const [expandedAttachmentAuditId, setExpandedAttachmentAuditId] = useState<string | null>(null);
  const [adminWarning, setAdminWarning] = useState<string | null>(null);

  const isLiveFirebase = getCloudCurrentMode() === 'firebase';
  const canClearDb = hasPermission('CLEAR_DATABASE');

  const handleClearAllWithAuth = () => {
    if (!canClearDb) {
      setAdminWarning('Action Restricted: Purging the entire database requires Administrator clearance. Please switch to the Administrator profile from the top-right user menu.');
      setTimeout(() => setAdminWarning(null), 5000);
      return;
    }
    onClearAll();
  };

  // Filtered audits
  const filteredAudits = useMemo(() => {
    return savedAudits.filter((audit) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        audit.title.toLowerCase().includes(q) ||
        audit.topCrop.toLowerCase().includes(q) ||
        audit.id.toLowerCase().includes(q) ||
        (audit.inputs.farmerName && audit.inputs.farmerName.toLowerCase().includes(q)) ||
        (audit.inputs.farmLocation && audit.inputs.farmLocation.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (filterMode === 'synced') {
        return audit.cloudSynced === true;
      }
      if (filterMode === 'with_attachments') {
        return audit.attachments && audit.attachments.length > 0;
      }
      return true;
    });
  }, [savedAudits, searchQuery, filterMode]);

  const handleExportSingleJson = (audit: SavedAudit) => {
    const blob = new Blob([JSON.stringify(audit, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-${audit.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (savedAudits.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
          <Cloud className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 m-0">No Farm Audits in Cloud Database</h2>
        <p className="text-sm text-slate-600 m-0 max-w-md mx-auto leading-relaxed">
          Evaluate field parameters or generate an agronomic advisory report to automatically archive recommendations
          in Google Cloud Firestore and upload Soil Health Cards into Firebase Cloud Storage.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onNavigateToForm}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.saved.createNewBtn}</span>
          </button>
          <button
            type="button"
            onClick={onOpenCloudSettings}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 transition inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Settings className="w-4 h-4 text-emerald-600" />
            <span>Cloud Settings</span>
          </button>
        </div>
      </div>
    );
  }

  const syncedCount = savedAudits.filter((a) => a.cloudSynced).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Cloud Database Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center flex-wrap gap-2">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                isLiveFirebase
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-teal-100 text-teal-800 border border-teal-300'
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              {isLiveFirebase ? 'Firebase Firestore & Cloud Storage' : 'Cloud Database (Sandbox Mode)'}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {syncedCount}/{savedAudits.length} Synced to Cloud
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-2 mb-1">
            Cloud Farm Audits &amp; Storage Records
          </h2>
          <p className="text-xs text-slate-600 m-0 leading-relaxed">
            Persisted across devices with real-time Firestore synchronization and Soil Health Card attachments in Cloud Storage.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2 shrink-0">
          <button
            type="button"
            onClick={onSyncCloud}
            disabled={isSyncing}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Force synchronization with Cloud Firestore"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Cloud'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenCloudSettings}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 transition flex items-center gap-1.5 cursor-pointer"
            title="Configure Firebase Keys & Cloud Bucket"
          >
            <Settings className="w-3.5 h-3.5 text-slate-600" />
            <span>Settings</span>
          </button>

          <button
            type="button"
            onClick={handleClearAllWithAuth}
            className={`px-3 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              canClearDb
                ? 'bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700'
                : 'bg-slate-100 text-slate-400 opacity-75'
            }`}
            title={canClearDb ? 'Delete all records' : 'Admin authorization required'}
          >
            {canClearDb ? <Trash2 className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5 text-amber-500" />}
            <span>{t.saved.clearAll}</span>
          </button>
        </div>
      </div>

      {adminWarning && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4 text-xs flex items-center gap-2 animate-in fade-in">
          <Lock className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="font-semibold">{adminWarning}</span>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by farm, location, or crop..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
              filterMode === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            All ({savedAudits.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('synced')}
            className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
              filterMode === 'synced'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            Synced ({syncedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('with_attachments')}
            className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
              filterMode === 'with_attachments'
                ? 'bg-blue-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            With Files ({savedAudits.filter((a) => a.attachments && a.attachments.length > 0).length})
          </button>
        </div>
      </div>

      {/* Audits List */}
      <div className="space-y-4">
        {filteredAudits.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 bg-white rounded-2xl border border-slate-200">
            No audits matched your search query.
          </div>
        ) : (
          filteredAudits.map((audit) => {
            const hasAttachments = audit.attachments && audit.attachments.length > 0;
            const isAttachmentExpanded = expandedAttachmentAuditId === audit.id;

            return (
              <div
                key={audit.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-emerald-300 transition space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="font-bold text-slate-900 text-sm">{audit.title}</span>
                      <span className="bg-slate-100 text-slate-600 font-mono text-[10px] px-2 py-0.5 rounded">
                        {audit.id}
                      </span>
                      {audit.cloudSynced ? (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Cloud Synced
                        </span>
                      ) : (
                        <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Local Only
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1.5 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {audit.timestamp}
                      </span>
                      {audit.inputs.farmerName && (
                        <span>• Farmer: <strong>{audit.inputs.farmerName}</strong></span>
                      )}
                      {audit.inputs.farmLocation && (
                        <span>• Location: <strong>{audit.inputs.farmLocation}</strong></span>
                      )}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onLoadAudit(audit)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{t.saved.loadAudit}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleExportSingleJson(audit)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                      title="Download JSON record"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteAudit(audit.id)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                      title="Delete audit from cloud and local storage"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Key Edaphic Parameters Pill Strip */}
                <div className="bg-slate-50 rounded-xl p-3 flex flex-wrap items-center gap-3 text-[11px] border border-slate-100">
                  <div className="font-semibold text-slate-800">
                    Top Crop:{' '}
                    <strong className="text-emerald-700 font-bold">
                      {translateCropName(audit.topCrop)}
                    </strong>{' '}
                    ({audit.topScore}% Match)
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="text-slate-600">
                    Soil: <strong className="text-slate-800">{translateSoilType(audit.inputs.soilType)}</strong>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="text-slate-600">
                    pH: <strong className="text-slate-800">{audit.inputs.soilPh}</strong>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="text-slate-600">
                    Rainfall: <strong className="text-slate-800">{audit.inputs.rainfall} mm</strong>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="text-slate-600">
                    Season: <strong className="text-slate-800">{translateSeason(audit.inputs.season)}</strong>
                  </div>
                  {audit.inputs.hasNpkData && (
                    <>
                      <span className="text-slate-300">|</span>
                      <div className="text-slate-600 font-mono text-[10px]">
                        N:{audit.inputs.nitrogen} P:{audit.inputs.phosphorus} K:{audit.inputs.potassium}
                      </div>
                    </>
                  )}
                </div>

                {/* Attachments Section Accordion / Toggle */}
                <div className="border-t border-slate-100 pt-2">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedAttachmentAuditId(isAttachmentExpanded ? null : audit.id)
                      }
                      className="text-xs font-semibold text-slate-700 hover:text-emerald-700 flex items-center gap-1.5 cursor-pointer py-1"
                    >
                      <Paperclip className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        Cloud Attachments &amp; Soil Cards (
                        {audit.attachments ? audit.attachments.length : 0})
                      </span>
                      {isAttachmentExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {hasAttachments && !isAttachmentExpanded && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {audit.attachments!.length} file(s) in Cloud Storage
                      </span>
                    )}
                  </div>

                  {isAttachmentExpanded && (
                    <div className="mt-3 p-3 bg-slate-50/70 rounded-xl border border-slate-200 animate-in fade-in duration-150">
                      <CloudStorageUploader
                        auditId={audit.id}
                        attachments={audit.attachments || []}
                        onAttachmentsChange={(newAttachments) => {
                          if (onUpdateAuditAttachments) {
                            onUpdateAuditAttachments(audit.id, newAttachments);
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
