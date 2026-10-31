import React from 'react';
import type { ExampleProfile } from '../types/crop';
import { EXAMPLE_PROFILES } from '../data/exampleProfiles';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles,
  MapPin,
  Droplets,
  Thermometer,
  Layers,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface ProfilePresetsProps {
  currentProfileId: string | null;
  onSelectProfile: (profile: ExampleProfile) => void;
  onReset: () => void;
  onRandomize: () => void;
}

export const ProfilePresets: React.FC<ProfilePresetsProps> = ({
  currentProfileId,
  onSelectProfile,
  onReset,
  onRandomize
}) => {
  const { translateCropName } = useLanguage();
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Required Deliverable
            </span>
            <span className="text-xs text-slate-500 font-medium">5 Agro-Ecological Test Profiles</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1 mb-0.5">
            Example Input Profiles & Benchmark Scenarios
          </h2>
          <p className="text-sm text-slate-600 m-0">
            Select a preloaded agro-climatic profile to test the recommendation engine against certified FAO & ICAR regional standards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRandomize}
            className="px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            title="Generate a random realistic agricultural combination"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Randomize Profile
          </button>
          <button
            onClick={onReset}
            className="px-3.5 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
          >
            Clear / Custom
          </button>
        </div>
      </div>

      {/* Grid of 5 Presets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
        {EXAMPLE_PROFILES.map((profile) => {
          const isSelected = currentProfileId === profile.id;
          return (
            <div
              key={profile.id}
              className={`rounded-xl border p-4 transition flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/30'
                  : 'border-slate-200 bg-slate-50/50 hover:border-emerald-300 hover:bg-white'
              }`}
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                    {profile.badge}
                  </span>
                  {isSelected && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1">
                  {profile.title}
                </h3>

                <p className="text-xs text-slate-500 flex items-center gap-1 mb-2.5">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{profile.region}</span>
                </p>

                {/* Key Inputs Badge Row */}
                <div className="grid grid-cols-2 gap-1.5 text-[11px] bg-white/80 p-2 rounded-lg border border-slate-100 mb-2.5">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Layers className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{profile.input.soilType}</span>
                  </div>
                  <div className="text-slate-600 font-mono">
                    pH: <strong className="text-slate-900">{profile.input.soilPh}</strong>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600">
                    <Droplets className="w-3 h-3 text-blue-500 shrink-0" />
                    <span>{profile.input.rainfall} mm</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600">
                    <Thermometer className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{profile.input.temperature}°C</span>
                  </div>
                </div>

                {/* Expected Outputs Section */}
                <div className="mb-3">
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Expected Matches:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {profile.expectedTopCrops.map((cropName) => (
                      <span
                        key={cropName}
                        className="text-[11px] font-medium bg-emerald-100/80 text-emerald-800 px-1.5 py-0.5 rounded"
                      >
                        {translateCropName(cropName)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectProfile(profile)}
                className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white border border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-700'
                }`}
              >
                <span>{isSelected ? 'Loaded' : 'Load Profile'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
