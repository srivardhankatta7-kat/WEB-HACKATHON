import { useState, useMemo, useEffect } from 'react';
import type { CropRecommendation, ExampleProfile, FarmInputData, SavedAudit, FarmAttachment } from './types/crop';
import type { AppTab } from './components/Header';
import { Header } from './components/Header';
import { SeasonBanner } from './components/SeasonBanner';
import { WeatherWidget } from './components/WeatherWidget';
import { ProfilePresets } from './components/ProfilePresets';
import { InputForm } from './components/InputForm';
import { RecommendationList } from './components/RecommendationList';
import { CropComparison } from './components/CropComparison';
import { CropDetailModal } from './components/CropDetailModal';
import { FertilizerGuidanceView } from './components/FertilizerGuidanceView';
import { ModelEvaluationView } from './components/ModelEvaluationView';
import { TestReportView } from './components/TestReportView';
import { MethodologyLimitationsView } from './components/MethodologyLimitationsView';
import { PrintReport } from './components/PrintReport';
import { SavedAuditHistory } from './components/SavedAuditHistory';
import { CloudConfigModal } from './components/CloudConfigModal';
import {
  saveAuditToCloud,
  fetchAuditsFromCloud,
  deleteAuditFromCloud,
  clearAllAuditsFromCloud,
  syncLocalAuditsWithCloud
} from './services/firebase';
import { rankCropRecommendations } from './engine/recommendationEngine';
import { EXAMPLE_PROFILES } from './data/exampleProfiles';
import { getCurrentAgriculturalSeason } from './utils/seasonUtils';
import { LanguageProvider } from './context/LanguageProvider';
import { useLanguage } from './context/LanguageContext';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './context/AuthContext';
import { LoginPage } from './components/LoginPage';
import { AuthGuard } from './components/AuthGuard';
import { Sprout, Sparkles, FileText, FlaskConical, BarChart3, FileCheck2, Info } from 'lucide-react';

const INITIAL_FORM_DATA: FarmInputData = {
  farmerName: 'Rameshwar Yadav',
  farmLocation: 'Varanasi / Patna Basin, Gangetic Plains',
  soilType: 'Alluvial',
  soilPh: 6.8,
  hasNpkData: true,
  nitrogen: 120,
  phosphorus: 50,
  potassium: 55,
  rainfall: 1350,
  temperature: 29,
  humidity: 82,
  season: 'Kharif'
};

function MainApp() {
  const { t, translateSoilType, translateSeason } = useLanguage();
  const { isLoginModalOpen, closeLoginModal } = useAuth();
  const [formData, setFormData] = useState<FarmInputData>(INITIAL_FORM_DATA);
  const [activeTab, setActiveTab] = useState<AppTab>('form');
  const [engineMode, setEngineMode] = useState<'rules' | 'knn'>('rules');
  const [compareCropIds, setCompareCropIds] = useState<string[]>(['rice', 'maize']);
  const [selectedCropForDetail, setSelectedCropForDetail] = useState<CropRecommendation | null>(null);
  const [currentProfileId, setCurrentProfileId] = useState<string | null>('gangetic-alluvial');
  const [filterBySeasonOnly, setFilterBySeasonOnly] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCloudModalOpen, setIsCloudModalOpen] = useState<boolean>(false);
  const [isSyncingCloud, setIsSyncingCloud] = useState<boolean>(false);

  // Local storage for saved audits with cloud metadata
  const [savedAudits, setSavedAudits] = useState<SavedAudit[]>(() => {
    try {
      const saved = localStorage.getItem('agroguide_saved_audits');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('agroguide_saved_audits', JSON.stringify(savedAudits));
    } catch {
      // Ignore storage errors
    }
  }, [savedAudits]);

  // Synchronize with Cloud Database on component mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const cloudAudits = await fetchAuditsFromCloud();
        if (isMounted && cloudAudits.length > 0) {
          setSavedAudits((prev) => {
            const map = new Map<string, SavedAudit>();
            cloudAudits.forEach((a) => map.set(a.id, a));
            prev.forEach((a) => {
              if (!map.has(a.id)) map.set(a.id, a);
            });
            return Array.from(map.values()).sort(
              (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
          });
        }
      } catch (err) {
        console.warn('Initial cloud sync skipped or offline:', err);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute recommendations
  const allRecommendations = useMemo(() => {
    return rankCropRecommendations(formData);
  }, [formData]);

  // Filter recommendations if season filter active
  const displayedRecommendations = useMemo(() => {
    if (!filterBySeasonOnly) return allRecommendations;
    const currentSeason = getCurrentAgriculturalSeason().activeSeason;
    return allRecommendations.filter(
      (r) =>
        r.crop.suitableSeasons.includes(currentSeason) ||
        r.crop.suitableSeasons.includes('Whole Year')
    );
  }, [allRecommendations, filterBySeasonOnly]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleFormChange = (updated: Partial<FarmInputData>) => {
    setFormData((prev) => ({ ...prev, ...updated }));
    setCurrentProfileId(null);
  };

  const handleApplyWeather = (weather: Partial<FarmInputData>, cityName?: string) => {
    setFormData((prev) => ({
      ...prev,
      ...weather,
      ...(cityName ? { farmLocation: cityName } : {})
    }));
    setCurrentProfileId(null);
    showToast(`Live weather from ${cityName || 'Station'} applied!`);
  };

  const handleSelectProfile = (profile: ExampleProfile) => {
    setFormData({ ...profile.input });
    setCurrentProfileId(profile.id);
    showToast(`Loaded agro-climatic profile: ${profile.title}`);
  };

  const handleResetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setCurrentProfileId('gangetic-alluvial');
    showToast('Reset form to baseline parameters.');
  };

  const handleRandomizeForm = () => {
    const randomIdx = Math.floor(Math.random() * EXAMPLE_PROFILES.length);
    handleSelectProfile(EXAMPLE_PROFILES[randomIdx]);
  };

  const handleToggleCompare = (cropId: string) => {
    setCompareCropIds((prev) => {
      if (prev.includes(cropId)) {
        return prev.filter((id) => id !== cropId);
      }
      if (prev.length >= 4) {
        showToast('Maximum 4 crops can be compared simultaneously.');
        return prev;
      }
      return [...prev, cropId];
    });
  };

  const handleClearCompare = () => {
    setCompareCropIds([]);
  };

  const handleSaveAudit = async (attachments?: FarmAttachment[]) => {
    const topRec = allRecommendations[0];
    const newAudit: SavedAudit = {
      id: `AUDIT-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      title: `${formData.farmLocation || 'Field'} - ${formData.soilType} (${formData.season})`,
      inputs: { ...formData },
      topCrop: topRec ? topRec.crop.name : 'None',
      topScore: topRec ? topRec.overallScore : 0,
      attachments: attachments || [],
      cloudSynced: false
    };

    setSavedAudits((prev) => [newAudit, ...prev]);

    // Save to Cloud Firestore & Cloud Storage metadata
    try {
      const res = await saveAuditToCloud(newAudit);
      if (res.success) {
        setSavedAudits((prev) =>
          prev.map((a) => (a.id === newAudit.id ? { ...a, cloudSynced: true, cloudId: res.cloudId } : a))
        );
        showToast('Audit report synchronized with Cloud Database!');
      }
    } catch {
      showToast('Saved locally; will sync with Cloud once connected.');
    }
  };

  const handleUpdateAuditAttachments = async (auditId: string, attachments: FarmAttachment[]) => {
    setSavedAudits((prev) =>
      prev.map((a) => {
        if (a.id === auditId) {
          const updated = { ...a, attachments };
          saveAuditToCloud(updated).catch(() => {});
          return updated;
        }
        return a;
      })
    );
    showToast('Cloud attachments updated successfully.');
  };

  const handleSyncCloud = async () => {
    setIsSyncingCloud(true);
    try {
      const res = await syncLocalAuditsWithCloud(savedAudits);
      setSavedAudits(res.merged);
      showToast(`Cloud Sync Complete: ${res.syncedCount} audit(s) synced.`);
    } catch {
      showToast('Cloud sync encountered an issue. Please check settings.');
    } finally {
      setIsSyncingCloud(false);
    }
  };

  const handleLoadAudit = (audit: SavedAudit) => {
    setFormData({ ...audit.inputs });
    setActiveTab('form');
    showToast(`Loaded saved audit: ${audit.title}`);
  };

  const handleDeleteAudit = async (id: string) => {
    setSavedAudits((prev) => prev.filter((a) => a.id !== id));
    await deleteAuditFromCloud(id).catch(() => {});
    showToast('Audit record removed from cloud and local storage.');
  };

  const handleClearAllAudits = async () => {
    setSavedAudits([]);
    await clearAllAuditsFromCloud().catch(() => {});
    showToast('Cleared all archived audits from cloud database.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        comparedCount={compareCropIds.length}
        savedCount={savedAudits.length}
        onOpenCloudSettings={() => setIsCloudModalOpen(true)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab 1: Form & Inputs */}
        {activeTab === 'form' && (
          <div className="space-y-6">
            {/* Season-Aware Suggestions Banner */}
            <SeasonBanner
              selectedSeason={formData.season}
              onSelectSeason={(season) => handleFormChange({ season })}
              filterBySeasonOnly={filterBySeasonOnly}
              onToggleFilterBySeason={() => setFilterBySeasonOnly(!filterBySeasonOnly)}
            />

            {/* Live Weather API Integration Widget */}
            <WeatherWidget onApplyWeather={handleApplyWeather} />

            {/* Quick Profile Presets */}
            <ProfilePresets
              currentProfileId={currentProfileId}
              onSelectProfile={handleSelectProfile}
              onReset={handleResetForm}
              onRandomize={handleRandomizeForm}
            />

            {/* Comprehensive Input Form */}
            <InputForm
              formData={formData}
              onChange={handleFormChange}
              onSubmit={() => {
                setActiveTab('results');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* Tab 2: Ranked Recommendations */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            {/* Top Quick Status Strip */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">{t.results.fieldProfile}</span>
                <span className="bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-lg">
                  {formData.farmLocation || 'Field'} • {translateSoilType(formData.soilType)} • pH {formData.soilPh} • {formData.rainfall}mm Rain • {translateSeason(formData.season)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('form')}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition cursor-pointer"
                >
                  {t.results.adjustParams}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('fertilizer')}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>{t.results.fertilizerGuide}</span>
                </button>
              </div>
            </div>

            {/* Recommendations List View */}
            <RecommendationList
              recommendations={displayedRecommendations}
              selectedForCompare={compareCropIds}
              onToggleCompare={handleToggleCompare}
              onOpenDetails={(crop) => setSelectedCropForDetail(crop)}
              onNavigateToCompare={() => setActiveTab('compare')}
              engineMode={engineMode}
              setEngineMode={setEngineMode}
            />
          </div>
        )}

        {/* Tab 3: Fertilizer Guidance from Trusted Source (ICAR / FAO) */}
        {activeTab === 'fertilizer' && (
          <FertilizerGuidanceView
            inputData={formData}
            recommendations={allRecommendations}
          />
        )}

        {/* Tab 4: Crop Comparison */}
        {activeTab === 'compare' && (
          <CropComparison
            allRecommendations={allRecommendations}
            selectedCropIds={compareCropIds}
            onToggleCompare={handleToggleCompare}
            onClearCompare={handleClearCompare}
          />
        )}

        {/* Tab 5: Empirical Model Evaluation (Labelled Dataset) */}
        {activeTab === 'evaluation' && (
          <AuthGuard
            permission="VIEW_MODEL_EVALUATION"
            fallbackTitle="Empirical Model Benchmarking Restricted"
            fallbackDescription="Access to ground-truth dataset cross-validation, confusion matrices, and precision-recall curves is restricted to certified Agronomists and System Administrators."
          >
            <ModelEvaluationView />
          </AuthGuard>
        )}

        {/* Tab 6: Comparison Results & Short Test Report */}
        {activeTab === 'testreport' && (
          <AuthGuard
            permission="RUN_TEST_SUITE"
            fallbackTitle="Automated Verification Test Suite Restricted"
            fallbackDescription="Executing the 8-suite regression test runner and cryptographic SHA256 integrity report generation requires Agronomist or Administrator clearance."
          >
            <TestReportView />
          </AuthGuard>
        )}

        {/* Tab 7: Documented Methodology & Inherent Limitations */}
        {activeTab === 'methodology' && <MethodologyLimitationsView />}

        {/* Tab 8: Saved Cloud & Local History */}
        {activeTab === 'saved' && (
          <SavedAuditHistory
            savedAudits={savedAudits}
            onLoadAudit={handleLoadAudit}
            onDeleteAudit={handleDeleteAudit}
            onClearAll={handleClearAllAudits}
            onNavigateToForm={() => setActiveTab('form')}
            onOpenCloudSettings={() => setIsCloudModalOpen(true)}
            onSyncCloud={handleSyncCloud}
            isSyncing={isSyncingCloud}
            onUpdateAuditAttachments={handleUpdateAuditAttachments}
          />
        )}

        {/* Tab 9: Print / Export Audit Report */}
        {activeTab === 'report' && (
          <PrintReport
            inputData={formData}
            recommendations={allRecommendations}
            onSaveAudit={handleSaveAudit}
          />
        )}
      </main>

      {/* Cloud Configuration Modal */}
      <CloudConfigModal
        key={isCloudModalOpen ? 'open' : 'closed'}
        isOpen={isCloudModalOpen}
        onClose={() => setIsCloudModalOpen(false)}
        onSyncNow={handleSyncCloud}
        isSyncing={isSyncingCloud}
        totalAuditsCount={savedAudits.length}
      />

      {/* Crop Detail Modal Dialog */}
      {selectedCropForDetail && (
        <CropDetailModal
          rec={selectedCropForDetail}
          onClose={() => setSelectedCropForDetail(null)}
          onToggleCompare={handleToggleCompare}
          isComparing={compareCropIds.includes(selectedCropForDetail.crop.id)}
        />
      )}

      {/* Authentication & Authorization Login Portal */}
      <LoginPage
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
      />

      {/* Global Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 no-print mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">{t.appName}</span>
            <span>• {t.appSubtitle}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTab('methodology')}
              className="hover:text-emerald-400 transition cursor-pointer flex items-center gap-1"
            >
              <Info className="w-3.5 h-3.5" /> {t.tabs.methodology}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('testreport')}
              className="hover:text-emerald-400 transition cursor-pointer flex items-center gap-1"
            >
              <FileCheck2 className="w-3.5 h-3.5" /> {t.tabs.testReport}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('evaluation')}
              className="hover:text-emerald-400 transition cursor-pointer flex items-center gap-1"
            >
              <BarChart3 className="w-3.5 h-3.5" /> {t.tabs.evaluation}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('fertilizer')}
              className="hover:text-emerald-400 transition cursor-pointer flex items-center gap-1"
            >
              <FlaskConical className="w-3.5 h-3.5" /> {t.tabs.fertilizer}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('report')}
              className="hover:text-emerald-400 transition cursor-pointer flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" /> {t.tabs.report}
            </button>
          </div>

          <div className="text-[11px] text-slate-500">
            FAO Ecocrop &amp; ICAR Calibrated • Hackathon Prototype (HACK-P302)
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </AuthProvider>
  );
}
