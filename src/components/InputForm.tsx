import React, { useState, useEffect, useRef } from 'react';
import type { FarmInputData, Season, SoilType } from '../types/crop';
import { calculateDataCompleteness } from '../engine/recommendationEngine';
import { useLanguage } from '../context/LanguageContext';
import {
  searchAllIndiaLocations,
  reverseGeocodeVillage,
  fetchLiveWeatherByCoords,
  type ResolvedIndiaLocation
} from '../services/weatherService';
import {
  Layers,
  FlaskConical,
  CloudSun,
  Calendar,
  AlertCircle,
  CheckCircle,
  User,
  MapPin,
  ArrowRight,
  Compass,
  RefreshCw,
  Home,
  Building,
  Sparkles
} from 'lucide-react';

interface InputFormProps {
  formData: FarmInputData;
  onChange: (updated: Partial<FarmInputData>) => void;
  onSubmit: () => void;
}

const SOIL_TYPES: SoilType[] = [
  'Alluvial',
  'Black',
  'Red',
  'Laterite',
  'Sandy',
  'Clayey',
  'Loamy',
  'Peaty',
  'Silt'
];

const SEASONS: Season[] = ['Kharif', 'Rabi', 'Zaid', 'Whole Year'];

export const InputForm: React.FC<InputFormProps> = ({
  formData,
  onChange,
  onSubmit
}) => {
  const { t, translateSoilType, translateSeason } = useLanguage();
  const completeness = calculateDataCompleteness(formData);

  const [villageSuggestions, setVillageSuggestions] = useState<ResolvedIndiaLocation[]>([]);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const locationDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(e.target as Node)) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    const trimmed = (formData.farmLocation || '').trim();
    if (trimmed.length < 2) return;

    const timer = setTimeout(async () => {
      setIsSearchingLocation(true);
      try {
        const matches = await searchAllIndiaLocations(trimmed);
        setVillageSuggestions(matches);
        setShowLocationDropdown(matches.length > 0);
      } catch {
        setVillageSuggestions([]);
      } finally {
        setIsSearchingLocation(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [formData.farmLocation]);

  const handleSelectVillage = async (loc: ResolvedIndiaLocation) => {
    setShowLocationDropdown(false);
    onChange({ farmLocation: loc.displayName });

    try {
      const weather = await fetchLiveWeatherByCoords(loc.lat, loc.lon, loc.displayName);
      onChange({
        farmLocation: loc.displayName,
        temperature: weather.temperature,
        humidity: weather.humidity,
        rainfall: weather.precipitation
      });
    } catch {
      // keep farmLocation
    }
  };

  const handleDetectGpsVillage = () => {
    if (!navigator.geolocation) return;
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const loc = await reverseGeocodeVillage(lat, lon);
          const weather = await fetchLiveWeatherByCoords(lat, lon, loc.displayName);
          onChange({
            farmLocation: loc.displayName,
            temperature: weather.temperature,
            humidity: weather.humidity,
            rainfall: weather.precipitation
          });
        } catch {
          // ignore
        } finally {
          setGpsLoading(false);
        }
      },
      () => setGpsLoading(false),
      { timeout: 9000, enableHighAccuracy: true }
    );
  };

  // Helper for pH classification
  const getPhCategory = (ph: number) => {
    if (ph < 5.0) return { label: 'Strongly Acidic', color: 'text-red-700 bg-red-100 border-red-200' };
    if (ph < 6.0) return { label: 'Moderately Acidic', color: 'text-amber-700 bg-amber-100 border-amber-200' };
    if (ph <= 7.5) return { label: 'Optimal / Neutral', color: 'text-emerald-700 bg-emerald-100 border-emerald-200' };
    if (ph <= 8.5) return { label: 'Moderately Alkaline', color: 'text-blue-700 bg-blue-100 border-blue-200' };
    return { label: 'Strongly Alkaline', color: 'text-purple-700 bg-purple-100 border-purple-200' };
  };

  // Helper for Rainfall category
  const getRainfallCategory = (rain: number) => {
    if (rain < 400) return 'Arid / Low Rainfall (Drought-Hardy)';
    if (rain < 750) return 'Semi-Arid (Moderate Moisture)';
    if (rain < 1200) return 'Sub-Humid (Good Natural Moisture)';
    if (rain < 2000) return 'Humid / High Rainfall (Wetland Crops)';
    return 'Hyper-Humid / Heavy Monsoon';
  };

  const phCategory = getPhCategory(formData.soilPh);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-emerald-200 text-xs font-semibold uppercase tracking-wider">
              {t.form.step1}
            </span>
            <h2 className="text-xl font-bold text-white mt-1 mb-1">
              {t.form.title}
            </h2>
            <p className="text-emerald-100 text-sm m-0">
              {t.form.subtitle}
            </p>
          </div>

          {/* Completeness & Confidence Widget */}
          <div className="bg-emerald-950/70 border border-emerald-700/60 p-3 rounded-xl min-w-[220px]">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-emerald-300 font-medium">{t.form.dataCompleteness}:</span>
              <span className="font-bold text-white">{completeness.score}%</span>
            </div>
            <div className="w-full bg-emerald-900 rounded-full h-2 mb-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  completeness.score >= 90
                    ? 'bg-emerald-400'
                    : completeness.score >= 65
                    ? 'bg-amber-400'
                    : 'bg-rose-400'
                }`}
                style={{ width: `${completeness.score}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-emerald-300">Confidence:</span>
              <span
                className={`font-semibold px-2 py-0.5 rounded ${
                  completeness.confidenceLevel === 'High'
                    ? 'bg-emerald-800 text-emerald-200'
                    : completeness.confidenceLevel === 'Moderate'
                    ? 'bg-amber-900/80 text-amber-200'
                    : 'bg-rose-900/80 text-rose-200'
                }`}
              >
                {completeness.confidenceLevel === 'High'
                  ? t.form.highConfidence
                  : completeness.confidenceLevel === 'Moderate'
                  ? t.form.moderateConfidence
                  : t.form.basicConfidence}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Farmer Info */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
          <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <User className="w-4 h-4 text-slate-500" />
            <span>Farm & Auditor Information</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {t.form.farmerNameLabel}
              </label>
              <input
                type="text"
                value={formData.farmerName || ''}
                onChange={(e) => onChange({ farmerName: e.target.value })}
                placeholder="e.g. Rameshwar Yadav"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-700">
                  {t.form.farmerLocationLabel}
                </label>
                <button
                  type="button"
                  onClick={handleDetectGpsVillage}
                  disabled={gpsLoading}
                  className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 cursor-pointer transition disabled:opacity-50"
                >
                  {gpsLoading ? (
                    <RefreshCw className="w-3 h-3 animate-spin" />
                  ) : (
                    <Compass className="w-3 h-3" />
                  )}
                  <span>{t.form.gpsDetectVillage}</span>
                </button>
              </div>
              <div className="relative" ref={locationDropdownRef}>
                <input
                  type="text"
                  value={formData.farmLocation || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({ farmLocation: val });
                    if (val.trim().length < 2) {
                      setVillageSuggestions([]);
                      setIsSearchingLocation(false);
                      setShowLocationDropdown(false);
                    }
                  }}
                  onFocus={() => {
                    if (villageSuggestions.length > 0) setShowLocationDropdown(true);
                  }}
                  placeholder="e.g. Ralegan Siddhi, Ahmednagar or 221002"
                  className="w-full pl-8 pr-8 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <MapPin className="w-4 h-4 text-emerald-600 absolute left-2.5 top-2.5" />
                {isSearchingLocation && (
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-500 animate-spin absolute right-2.5 top-2.5" />
                )}

                {/* Suggestions Dropdown */}
                {showLocationDropdown && villageSuggestions.length > 0 && (
                  <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-56 overflow-y-auto divide-y divide-slate-100">
                    <div className="px-3 py-1 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        Indian Villages &amp; Districts
                      </span>
                      <span className="text-emerald-600">Auto-syncs weather</span>
                    </div>
                    {villageSuggestions.map((loc) => (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => handleSelectVillage(loc)}
                        className="w-full px-3 py-2 text-left hover:bg-emerald-50 transition flex items-center justify-between gap-2 group cursor-pointer"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            {loc.type === 'Village' ? (
                              <Home className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            ) : (
                              <Building className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                            )}
                            <span className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700 truncate">
                              {loc.name}
                            </span>
                            <span className="text-[9px] px-1 py-0.2 rounded font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                              {loc.type}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 truncate mt-0.5 pl-5">
                            {loc.displayName}
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">
                          {loc.lat.toFixed(2)}°, {loc.lon.toFixed(2)}°
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-[10px] text-slate-400 mt-1 m-0">
                {t.form.locationHelper}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 1: SOIL PARAMETERS */}
        <div>
          <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 m-0">1. {t.form.soilType} &amp; {t.form.soilPh}</h3>
              <p className="text-xs text-slate-500 m-0">
                Soil physical texture and pH dictate nutrient absorption and root aeration.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Soil Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center justify-between">
                <span>{t.form.soilType} <span className="text-rose-500">*</span></span>
              </label>
              <select
                value={formData.soilType}
                onChange={(e) => onChange({ soilType: e.target.value as SoilType })}
                className="w-full px-3.5 py-2.5 text-sm font-medium bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                {SOIL_TYPES.map((st) => (
                  <option key={st} value={st}>
                    {translateSoilType(st)}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500 mt-1.5">
                Current selection: <strong className="text-slate-800">{translateSoilType(formData.soilType)}</strong>
              </p>
            </div>

            {/* Soil pH Slider + Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                  <span>{t.form.soilPh} <span className="text-rose-500">*</span></span>
                  <span className="text-xs text-slate-500 font-normal">(3.5 – 10.0)</span>
                </label>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${phCategory.color}`}>
                  {phCategory.label} (pH {formData.soilPh})
                </span>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="3.5"
                  max="10.0"
                  step="0.1"
                  value={formData.soilPh}
                  onChange={(e) => onChange({ soilPh: parseFloat(e.target.value) || 7.0 })}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <input
                  type="number"
                  min="3.5"
                  max="10.0"
                  step="0.1"
                  value={formData.soilPh}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val)) onChange({ soilPh: Math.min(10.0, Math.max(3.5, val)) });
                  }}
                  className="w-20 px-2.5 py-1.5 text-center text-sm font-bold bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 font-mono">
                <span>Acidic (&lt;6.0)</span>
                <span className="text-emerald-600 font-semibold">Ideal (6.0 - 7.5)</span>
                <span>Alkaline (&gt;7.5)</span>
              </div>
            </div>
          </div>

          {/* NPK Section with Toggle */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 m-0">
                  <FlaskConical className="w-4 h-4 text-emerald-600" />
                  <span>{t.form.nitrogen}, {t.form.phosphorus}, {t.form.potassium}</span>
                </h4>
                <p className="text-xs text-slate-500 m-0">
                  Optional laboratory soil fertility test readings.
                </p>
              </div>

              {/* NPK Toggle Button */}
              <button
                type="button"
                onClick={() => onChange({ hasNpkData: !formData.hasNpkData })}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition flex items-center gap-2 cursor-pointer ${
                  formData.hasNpkData
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-600 border-slate-300'
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${formData.hasNpkData ? 'bg-emerald-600' : 'bg-slate-400'}`}></span>
                <span>{formData.hasNpkData ? 'NPK Enabled (100% Precision)' : 'No NPK Lab Data (Baseline)'}</span>
              </button>
            </div>

            {formData.hasNpkData ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-emerald-50/40 p-4 rounded-xl border border-emerald-200">
                {/* Nitrogen */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.form.nitrogen}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="300"
                      value={formData.nitrogen}
                      onChange={(e) => onChange({ nitrogen: Math.max(0, parseInt(e.target.value) || 0) })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900"
                    />
                    <span className="text-xs text-slate-500 shrink-0">kg/ha</span>
                  </div>
                </div>

                {/* Phosphorus */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.form.phosphorus}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="150"
                      value={formData.phosphorus}
                      onChange={(e) => onChange({ phosphorus: Math.max(0, parseInt(e.target.value) || 0) })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900"
                    />
                    <span className="text-xs text-slate-500 shrink-0">kg/ha</span>
                  </div>
                </div>

                {/* Potassium */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.form.potassium}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="200"
                      value={formData.potassium}
                      onChange={(e) => onChange({ potassium: Math.max(0, parseInt(e.target.value) || 0) })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900"
                    />
                    <span className="text-xs text-slate-500 shrink-0">kg/ha</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>NPK weights (14%) are dynamically redistributed to climate and soil texture parameters.</span>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: CLIMATIC PARAMETERS */}
        <div>
          <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              <CloudSun className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 m-0">2. Climatic &amp; Atmospheric Conditions</h3>
              <p className="text-xs text-slate-500 m-0">
                Precipitation, temperature, and atmospheric moisture determine water availability and disease pressures.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rainfall */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                <span>{t.form.rainfall} <span className="text-rose-500">*</span></span>
                <span className="text-[10px] text-slate-500 font-mono">100 - 3500 mm</span>
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="number"
                  min="100"
                  max="4000"
                  value={formData.rainfall}
                  onChange={(e) => onChange({ rainfall: Math.max(0, parseInt(e.target.value) || 0) })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900"
                />
                <span className="text-xs text-slate-500 shrink-0">mm</span>
              </div>
              <input
                type="range"
                min="100"
                max="3500"
                step="25"
                value={formData.rainfall}
                onChange={(e) => onChange({ rainfall: parseInt(e.target.value) || 800 })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="text-[11px] text-emerald-700 font-medium mt-1">
                {getRainfallCategory(formData.rainfall)}
              </div>
            </div>

            {/* Temperature */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                <span>{t.form.temperature} <span className="text-rose-500">*</span></span>
                <span className="text-[10px] text-slate-500 font-mono">5 - 45 °C</span>
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="number"
                  min="5"
                  max="50"
                  value={formData.temperature}
                  onChange={(e) => onChange({ temperature: Math.max(0, parseInt(e.target.value) || 0) })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900"
                />
                <span className="text-xs text-slate-500 shrink-0">°C</span>
              </div>
              <input
                type="range"
                min="5"
                max="45"
                step="1"
                value={formData.temperature}
                onChange={(e) => onChange({ temperature: parseInt(e.target.value) || 25 })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="text-[11px] text-slate-500 mt-1">
                {formData.temperature < 18 ? 'Cool Vegetative Climate' : formData.temperature <= 32 ? 'Warm Tropical/Subtropical' : 'Hot Arid Climate'}
              </div>
            </div>

            {/* Humidity */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                <span>{t.form.humidity} <span className="text-rose-500">*</span></span>
                <span className="text-[10px] text-slate-500 font-mono">15 - 100 %</span>
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="number"
                  min="15"
                  max="100"
                  value={formData.humidity}
                  onChange={(e) => onChange({ humidity: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900"
                />
                <span className="text-xs text-slate-500 shrink-0">%</span>
              </div>
              <input
                type="range"
                min="15"
                max="100"
                step="1"
                value={formData.humidity}
                onChange={(e) => onChange({ humidity: parseInt(e.target.value) || 60 })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="text-[11px] text-slate-500 mt-1">
                {formData.humidity < 45 ? 'Dry / Low Vapor Pressure' : formData.humidity <= 75 ? 'Moderate / Balanced Humidity' : 'Humid / Fungal Risk Window'}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: SOWING SEASON */}
        <div>
          <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 m-0">3. {t.form.season}</h3>
              <p className="text-xs text-slate-500 m-0">
                Sowing season governs photoperiod daylight hours and natural vegetative maturity cycles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SEASONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onChange({ season: s })}
                className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                  formData.season === s
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <div className="font-bold text-sm">{translateSeason(s)}</div>
                <div className={`text-[10px] mt-1 ${formData.season === s ? 'text-emerald-100' : 'text-slate-500'}`}>
                  {s === 'Kharif' ? 'June – Oct (Monsoon)' : s === 'Rabi' ? 'Oct – March (Winter)' : s === 'Zaid' ? 'March – June (Summer)' : 'Perennial / Year-Round'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Multi-criteria continuous agronomic evaluation ready.</span>
          </div>

          <button
            type="button"
            onClick={onSubmit}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.form.evaluateBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
