import React, { useState, useEffect, useRef } from 'react';
import type { FarmInputData, WeatherData } from '../types/crop';
import {
  AGRICULTURAL_HUBS,
  fetchLiveWeatherByCoords,
  searchAllIndiaLocations,
  reverseGeocodeVillage,
  type ResolvedIndiaLocation
} from '../services/weatherService';
import {
  INDIA_STATES_AND_UTS,
  getLocationsForState
} from '../data/indiaLocations';
import { useLanguage } from '../context/LanguageContext';
import {
  CloudSun,
  MapPin,
  Compass,
  ArrowDownToLine,
  Search,
  RefreshCw,
  Thermometer,
  Droplets,
  CloudRain,
  CheckCircle2,
  AlertCircle,
  Building,
  Home,
  Layers,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface WeatherWidgetProps {
  onApplyWeather: (weather: Partial<FarmInputData>, cityName?: string) => void;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ onApplyWeather }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  // Village autocomplete state
  const [suggestions, setSuggestions] = useState<ResolvedIndiaLocation[]>([]);
  const [isSearchingVillage, setIsSearchingVillage] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // State & District Browser state
  const [showStateBrowser, setShowStateBrowser] = useState(false);
  const [selectedState, setSelectedState] = useState<string>('Punjab');
  const [stateLocations, setStateLocations] = useState(() => getLocationsForState('Punjab'));

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Update locations when state selection changes
  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    setStateLocations(getLocationsForState(stateName));
  };

  // Debounced search for all-India villages & districts
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (trimmed.length < 2) return;

    const timer = setTimeout(async () => {
      setIsSearchingVillage(true);
      try {
        const matches = await searchAllIndiaLocations(trimmed);
        setSuggestions(matches);
        setShowDropdown(matches.length > 0);
      } catch {
        setSuggestions([]);
      } finally {
        setIsSearchingVillage(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectLocation = async (loc: ResolvedIndiaLocation) => {
    setLoading(true);
    setError(null);
    setApplied(false);
    setShowDropdown(false);
    setSearchQuery(loc.displayName);

    try {
      const data = await fetchLiveWeatherByCoords(loc.lat, loc.lon, loc.displayName);
      setWeather(data);
    } catch {
      setError(`Failed to fetch weather for "${loc.name}". Loaded calibrated baseline.`);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchGps = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError(null);
    setApplied(false);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const resolvedLoc = await reverseGeocodeVillage(lat, lon);
          setSearchQuery(resolvedLoc.displayName);

          const data = await fetchLiveWeatherByCoords(lat, lon, resolvedLoc.displayName);
          setWeather(data);
        } catch {
          setError('Failed to reverse-geocode your GPS village position.');
        } finally {
          setLoading(false);
        }
      },
      () => {
        const defaultHub = AGRICULTURAL_HUBS[0];
        fetchLiveWeatherByCoords(defaultHub.lat, defaultHub.lon, defaultHub.name).then((data) => {
          setWeather(data);
          setLoading(false);
        });
      },
      { timeout: 9000, enableHighAccuracy: true }
    );
  };

  const handleApply = () => {
    if (!weather) return;
    onApplyWeather(
      {
        temperature: weather.temperature,
        humidity: weather.humidity,
        rainfall: weather.precipitation
      },
      weather.city
    );
    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  };

  const getTypeBadge = (type: ResolvedIndiaLocation['type']) => {
    switch (type) {
      case 'Village':
        return {
          label: t.weather.villageBadge,
          cls: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
        };
      case 'Tehsil/Taluk':
        return {
          label: t.weather.tehsilBadge,
          cls: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        };
      case 'District':
        return {
          label: t.weather.districtBadge,
          cls: 'bg-sky-500/20 text-sky-300 border-sky-500/40'
        };
      case 'PIN Code':
        return {
          label: 'PIN Code',
          cls: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
        };
      default:
        return {
          label: type,
          cls: 'bg-slate-700 text-slate-300 border-slate-600'
        };
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white rounded-2xl p-5 shadow-lg border border-emerald-800/60 mb-6">
      {/* Header & Badges */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CloudSun className="w-3.5 h-3.5" /> {t.weather.badge}
            </span>
            <span className="bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> {t.weather.allIndiaCoverage}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1.5 mb-0.5 flex items-center gap-2">
            <span>{t.weather.title}</span>
          </h3>
          <p className="text-xs text-slate-300 m-0">
            {t.weather.subtitle}
          </p>
        </div>

        {/* GPS Button */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            type="button"
            onClick={handleFetchGps}
            disabled={loading}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
          >
            {loading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Compass className="w-3.5 h-3.5" />
            )}
            <span>{t.weather.useGps}</span>
          </button>
        </div>
      </div>

      {/* Village & District Search Input with Autocomplete Dropdown */}
      <div className="relative mb-3" ref={dropdownRef}>
        <div className="relative flex items-center">
          <MapPin className="w-4 h-4 text-emerald-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              const val = e.target.value;
              setSearchQuery(val);
              if (val.trim().length < 2) {
                setSuggestions([]);
                setIsSearchingVillage(false);
                setShowDropdown(false);
              }
            }}
            onFocus={() => {
              if (suggestions.length > 0) setShowDropdown(true);
            }}
            placeholder={t.weather.villageSearchPrompt}
            className="w-full bg-slate-900/90 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white text-xs pl-10 pr-10 py-2.5 rounded-xl placeholder-slate-400 outline-none transition"
          />
          {isSearchingVillage ? (
            <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin absolute right-3" />
          ) : (
            <Search className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
          )}
        </div>

        {/* Autocomplete Dropdown Menu */}
        {showDropdown && suggestions.length > 0 && (
          <div className="absolute z-50 left-0 right-0 mt-1.5 bg-slate-900 border border-emerald-700/70 rounded-xl shadow-2xl max-h-72 overflow-y-auto divide-y divide-slate-800">
            <div className="px-3 py-1.5 bg-slate-950/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Matching Indian Locations ({suggestions.length})</span>
              <span className="text-emerald-400">Click to fetch weather & sync</span>
            </div>
            {suggestions.map((loc) => {
              const badge = getTypeBadge(loc.type);
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => handleSelectLocation(loc)}
                  className="w-full px-3.5 py-2.5 text-left hover:bg-emerald-950/60 transition flex items-center justify-between gap-3 group cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {loc.type === 'Village' ? (
                        <Home className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <Building className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      )}
                      <span className="font-semibold text-white text-xs group-hover:text-emerald-300 truncate">
                        {loc.name}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase tracking-wider ${badge.cls}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5 pl-5">
                      {loc.displayName}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-500 font-mono">
                      {loc.lat.toFixed(2)}°, {loc.lon.toFixed(2)}°
                    </span>
                    <div className="text-[9px] text-emerald-400/80">{loc.source}</div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* State & District Browser Toggle */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={() => setShowStateBrowser(!showStateBrowser)}
            className="text-xs text-emerald-300 hover:text-emerald-200 flex items-center gap-1 font-semibold transition cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.weather.browseByState} (All 28 States &amp; 8 UTs)</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${showStateBrowser ? 'rotate-180' : ''}`}
            />
          </button>
          <span className="text-[10px] text-slate-400">Offline Directory Ready</span>
        </div>

        {showStateBrowser && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 mb-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                {t.weather.selectState}
              </label>
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-emerald-500 cursor-pointer"
              >
                {INDIA_STATES_AND_UTS.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                {t.weather.selectDistrict} &amp; Village Clusters ({stateLocations.length})
              </label>
              <select
                onChange={(e) => {
                  const loc = stateLocations.find((l) => l.name === e.target.value);
                  if (loc) {
                    handleSelectLocation({
                      id: `state-browser-${loc.name}`,
                      name: loc.name,
                      district: loc.district,
                      state: loc.state,
                      displayName: `${loc.name}, ${loc.district}, ${loc.state}`,
                      type: loc.type === 'Village Cluster' ? 'Village' : (loc.type as any),
                      lat: loc.lat,
                      lon: loc.lon,
                      source: 'Local Directory'
                    });
                  }
                }}
                className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="">-- Choose District / Village Cluster --</option>
                {stateLocations.map((loc) => (
                  <option key={loc.name} value={loc.name}>
                    {loc.name} ({loc.type})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Quick Regional Hub Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            {t.weather.quickSelectHub}
          </span>
          {AGRICULTURAL_HUBS.map((hub) => (
            <button
              key={hub.name}
              type="button"
              onClick={() => {
                handleSelectLocation({
                  id: `hub-${hub.name}`,
                  name: hub.name.split(',')[0],
                  district: hub.name.split(',')[0],
                  state: hub.name.split(',')[1]?.trim() || 'India',
                  displayName: hub.name,
                  type: 'Agricultural Hub',
                  lat: hub.lat,
                  lon: hub.lon,
                  source: 'Local Directory'
                });
              }}
              className="text-[11px] bg-slate-800/80 hover:bg-emerald-800/60 border border-slate-700 hover:border-emerald-600 px-2 py-0.8 rounded-lg text-slate-200 transition cursor-pointer"
            >
              {hub.name.split(',')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-rose-950/60 border border-rose-800 text-rose-200 text-xs p-3 rounded-xl mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Weather Result Card */}
      {weather && (
        <div className="bg-slate-900/90 border border-emerald-700/60 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
              <CloudSun className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-white text-sm">{weather.city}</span>
                {weather.isLive ? (
                  <span className="bg-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border border-emerald-500/50">
                    {t.weather.liveBadge}
                  </span>
                ) : (
                  <span className="bg-amber-500/30 text-amber-300 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border border-amber-500/50">
                    {t.weather.calibratedBadge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 m-0">
                {weather.description} • Coordinates: {weather.latitude.toFixed(3)}°N, {weather.longitude.toFixed(3)}°E
              </p>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700">
              <Thermometer className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-[10px] text-slate-400 leading-tight">Temperature</div>
                <div className="font-bold text-white text-xs">{weather.temperature}°C</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-[10px] text-slate-400 leading-tight">Humidity</div>
                <div className="font-bold text-white text-xs">{weather.humidity}%</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700">
              <CloudRain className="w-4 h-4 text-blue-400" />
              <div>
                <div className="text-[10px] text-slate-400 leading-tight">Precipitation Est.</div>
                <div className="font-bold text-white text-xs">{weather.precipitation} mm</div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleApply}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition shadow flex items-center gap-1.5 cursor-pointer ${
                applied
                  ? 'bg-emerald-500 text-slate-950 font-black'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {applied ? <CheckCircle2 className="w-4 h-4" /> : <ArrowDownToLine className="w-4 h-4" />}
              <span>{applied ? t.weather.appliedSuccess : t.weather.applyToForm}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
