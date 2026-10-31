import React, { useState } from 'react';
import {
  getStoredFirebaseConfig,
  saveStoredFirebaseConfig,
  clearStoredFirebaseConfig,
  testCloudConnection,
  getCloudSyncStatus,
  getCloudCurrentMode
} from '../services/firebase';
import type { FirebaseConfig, CloudSyncStatus } from '../types/crop';
import {
  Cloud,
  CheckCircle2,
  AlertCircle,
  Database,
  HardDrive,
  RefreshCw,
  X,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  Check,
  Zap
} from 'lucide-react';

interface CloudConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncNow: () => void;
  isSyncing: boolean;
  totalAuditsCount: number;
}

export const CloudConfigModal: React.FC<CloudConfigModalProps> = ({
  isOpen,
  onClose,
  onSyncNow,
  isSyncing,
  totalAuditsCount
}) => {
  const [config, setConfig] = useState<FirebaseConfig>(() => getStoredFirebaseConfig());
  const [cloudStatus, setCloudStatus] = useState<CloudSyncStatus>(() => getCloudSyncStatus());
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; latencyMs?: number } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'status' | 'credentials' | 'guide'>('status');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testCloudConnection();
      setTestResult(res);
      setCloudStatus(getCloudSyncStatus(0));
    } catch {
      setTestResult({
        success: false,
        message: 'Could not connect. Please check project ID, API keys, and internet connection.'
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredFirebaseConfig(config);
    setCloudStatus(getCloudSyncStatus(0));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
    handleTestConnection();
  };

  const handleResetToSimulated = () => {
    clearStoredFirebaseConfig();
    setConfig(getStoredFirebaseConfig());
    setCloudStatus(getCloudSyncStatus(0));
    setTestResult({
      success: true,
      message: 'Switched back to Simulated Cloud Database (Offline-First Sandbox).'
    });
  };

  const isLiveFirebase = getCloudCurrentMode() === 'firebase';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Cloud className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white m-0">Cloud Storage &amp; Database Settings</h3>
                <span className="bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  Firebase
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 m-0">
                Google Cloud Firestore (NoSQL Database) &amp; Firebase Storage (File Uploads)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveSubTab('status')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition cursor-pointer border-t border-x ${
              activeSubTab === 'status'
                ? 'bg-white text-emerald-800 border-slate-200 -mb-[1px]'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            Cloud Status &amp; Sync
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('credentials')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition cursor-pointer border-t border-x ${
              activeSubTab === 'credentials'
                ? 'bg-white text-emerald-800 border-slate-200 -mb-[1px]'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            Firebase Credentials
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('guide')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition cursor-pointer border-t border-x ${
              activeSubTab === 'guide'
                ? 'bg-white text-emerald-800 border-slate-200 -mb-[1px]'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            Setup Guide &amp; Architecture
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-slate-800 text-xs">
          {/* TAB 1: STATUS */}
          {activeSubTab === 'status' && (
            <div className="space-y-5">
              {/* Status Card */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full animate-pulse ${
                        isLiveFirebase ? 'bg-emerald-500 ring-4 ring-emerald-100' : 'bg-teal-500 ring-4 ring-teal-100'
                      }`}
                    />
                    <span className="font-bold text-sm text-slate-900">
                      {cloudStatus.activeProvider}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      isLiveFirebase ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-teal-800'
                    }`}
                  >
                    {isLiveFirebase ? 'LIVE CLOUD ACTIVE' : 'SANDBOX SIMULATED'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                  <div className="flex items-start gap-2">
                    <Database className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-700">Cloud Firestore Database</div>
                      <div className="text-slate-500 text-[11px]">
                        Collection: <code className="text-emerald-700 font-mono">agroguide_audits</code>
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        Archived Records: <strong className="text-slate-900">{totalAuditsCount}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <HardDrive className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-700">Firebase Cloud Storage</div>
                      <div className="text-slate-500 text-[11px]">
                        Bucket: <code className="text-teal-700 font-mono">{cloudStatus.storageBucket}</code>
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        Path: <code className="text-slate-600 font-mono">agroguide_attachments/</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={onSyncNow}
                  disabled={isSyncing}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing with Cloud...' : 'Sync Local Audits to Cloud'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTesting}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl border border-slate-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Zap className={`w-3.5 h-3.5 text-amber-500 ${isTesting ? 'animate-bounce' : ''}`} />
                  <span>{isTesting ? 'Pinging Cloud...' : 'Test Connection Latency'}</span>
                </button>
              </div>

              {/* Test Result Message */}
              {testResult && (
                <div
                  className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
                    testResult.success
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-bold text-xs">
                      {testResult.success ? 'Cloud Connectivity OK' : 'Cloud Connectivity Issue'}
                    </div>
                    <div className="text-[11px] mt-0.5 leading-relaxed">{testResult.message}</div>
                  </div>
                </div>
              )}

              {/* Offline-First Capability Note */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5 text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <strong>Offline-First Resiliency:</strong> The application automatically mirrors cloud database
                  operations to local storage. Even without active internet or when working offline in remote rural
                  fields, you can save farm audits, attach soil reports, and recommendations will sync seamlessly when
                  reconnected.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CREDENTIALS */}
          {activeSubTab === 'credentials' && (
            <form onSubmit={handleSaveCredentials} className="space-y-4">
              <p className="text-xs text-slate-600 m-0 leading-relaxed">
                Connect your real Google Firebase project by providing the configuration parameters below. You can find
                these in the <strong>Firebase Console &gt; Project Settings &gt; General &gt; Your apps</strong>.
              </p>

              {savedSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-xs">Firebase configuration saved successfully!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[11px]">API Key</label>
                  <input
                    type="text"
                    value={config.apiKey}
                    onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                    placeholder="AIzaSy..."
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs focus:bg-white focus:border-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[11px]">Project ID</label>
                  <input
                    type="text"
                    value={config.projectId}
                    onChange={(e) => setConfig({ ...config, projectId: e.target.value })}
                    placeholder="my-agroguide-project"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs focus:bg-white focus:border-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[11px]">Storage Bucket</label>
                  <input
                    type="text"
                    value={config.storageBucket}
                    onChange={(e) => setConfig({ ...config, storageBucket: e.target.value })}
                    placeholder="my-agroguide-project.appspot.com"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs focus:bg-white focus:border-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[11px]">Auth Domain</label>
                  <input
                    type="text"
                    value={config.authDomain}
                    onChange={(e) => setConfig({ ...config, authDomain: e.target.value })}
                    placeholder="my-agroguide-project.firebaseapp.com"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs focus:bg-white focus:border-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[11px]">Messaging Sender ID</label>
                  <input
                    type="text"
                    value={config.messagingSenderId}
                    onChange={(e) => setConfig({ ...config, messagingSenderId: e.target.value })}
                    placeholder="1029384756"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs focus:bg-white focus:border-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[11px]">App ID</label>
                  <input
                    type="text"
                    value={config.appId}
                    onChange={(e) => setConfig({ ...config, appId: e.target.value })}
                    placeholder="1:1029384756:web:abcd1234"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs focus:bg-white focus:border-emerald-600 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleResetToSimulated}
                  className="px-3.5 py-1.5 text-xs text-rose-700 hover:bg-rose-50 font-semibold rounded-lg transition cursor-pointer"
                >
                  Clear &amp; Use Sandbox Mode
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition cursor-pointer"
                  >
                    Save &amp; Connect to Cloud
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 3: ARCHITECTURE & GUIDE */}
          {activeSubTab === 'guide' && (
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 m-0">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  Cloud Database &amp; Storage Architecture
                </h4>
                <p className="text-slate-600 leading-relaxed m-0 text-xs">
                  This website utilizes a dual-tier cloud storage architecture tailored for agricultural decision support
                  systems:
                </p>
                <div className="space-y-2 pt-1">
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <strong className="text-emerald-800">1. Cloud Firestore (NoSQL Document Store):</strong>
                    <p className="text-slate-600 mt-0.5 m-0 text-[11px]">
                      Stores structured farm profiles, 9-parameter edaphic audits (pH, NPK, rainfall, temperature,
                      soil texture), ranked crop recommendations, and agronomic suitability indices.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <strong className="text-teal-800">2. Firebase Cloud Storage (Blob/Object Storage):</strong>
                    <p className="text-slate-600 mt-0.5 m-0 text-[11px]">
                      Stores binary agricultural artifacts: scanned Soil Health Cards (SHC PDFs), field satellite
                      imagery, disease symptom leaf photos, and exported audit certificates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs m-0">Quick 2-Minute Firebase Setup:</h4>
                <ol className="list-decimal pl-4 space-y-1 text-slate-600 text-[11px]">
                  <li>
                    Visit{' '}
                    <a
                      href="https://console.firebase.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 hover:underline font-semibold inline-flex items-center gap-0.5"
                    >
                      console.firebase.google.com <ExternalLink className="w-3 h-3" />
                    </a>{' '}
                    and create a new project.
                  </li>
                  <li>In the project dashboard, click <strong>Build &gt; Firestore Database</strong> and click Create Database (test mode).</li>
                  <li>Click <strong>Build &gt; Storage</strong> and click Get Started (test mode).</li>
                  <li>In Project Settings &gt; General &gt; Your Apps, register a <strong>Web App</strong>.</li>
                  <li>Copy the config credentials and paste them into the <strong>Firebase Credentials</strong> tab, or add them to your <code className="bg-slate-100 px-1 py-0.5 rounded">.env</code> file.</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <div>AgroGuide DSS v2.4 • Cloud Database Layer</div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
