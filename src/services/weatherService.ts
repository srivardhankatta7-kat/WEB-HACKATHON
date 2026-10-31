import type { WeatherData } from '../types/crop';
import {
  findNearestLocation,
  searchLocalIndiaLocations
} from '../data/indiaLocations';

export interface ResolvedIndiaLocation {
  id: string;
  name: string;
  village?: string;
  tehsil?: string;
  district: string;
  state: string;
  pincode?: string;
  displayName: string;
  type: 'Village' | 'Tehsil/Taluk' | 'District' | 'City' | 'State' | 'PIN Code' | 'Agricultural Hub';
  lat: number;
  lon: number;
  source: 'OpenStreetMap' | 'Open-Meteo' | 'Local Directory';
}

export const AGRICULTURAL_HUBS = [
  { name: 'Ludhiana, Punjab', lat: 30.9010, lon: 75.8573, temp: 18, hum: 60, rain: 220 },
  { name: 'Varanasi, Uttar Pradesh', lat: 25.3176, lon: 82.9739, temp: 29, hum: 80, rain: 1100 },
  { name: 'Solapur, Maharashtra', lat: 17.6599, lon: 75.9064, temp: 33, hum: 42, rain: 450 },
  { name: 'Patna, Bihar', lat: 25.5941, lon: 85.1376, temp: 28, hum: 78, rain: 1150 },
  { name: 'Coimbatore, Tamil Nadu', lat: 11.0168, lon: 76.9558, temp: 28, hum: 68, rain: 650 },
  { name: 'Jorhat / Assam Tea Belt', lat: 26.7509, lon: 94.2037, temp: 24, hum: 85, rain: 2100 },
  { name: 'Nagpur / Vidarbha', lat: 21.1458, lon: 79.0882, temp: 32, hum: 55, rain: 850 },
  { name: 'Jaipur, Rajasthan', lat: 26.9124, lon: 75.7873, temp: 32, hum: 35, rain: 380 }
];

// Helper to decode WMO weather codes
function decodeWmoWeather(code: number): string {
  if (code === 0) return 'Clear Sky';
  if (code === 1 || code === 2) return 'Mainly Clear / Partly Cloudy';
  if (code === 3) return 'Overcast';
  if (code === 45 || code === 48) return 'Foggy / Hazy';
  if (code >= 51 && code <= 55) return 'Light Drizzle';
  if (code >= 61 && code <= 65) return 'Rain Showers';
  if (code >= 71 && code <= 77) return 'Snow / Cold Precipitation';
  if (code >= 80 && code <= 82) return 'Torrential Rain Showers';
  if (code >= 95) return 'Thunderstorm';
  return 'Normal Atmospheric Conditions';
}

/**
 * Searches across entire India including small villages, gram panchayats,
 * tehsils, mandals, districts, and PIN codes using a hybrid 3-tier resolver:
 * 1. Offline high-speed directory (instant)
 * 2. OpenStreetMap Nominatim India Geocoder (covers 600,000+ Indian villages & hamlets)
 * 3. Open-Meteo Geocoding (fast settlement lookup)
 */
export async function searchAllIndiaLocations(query: string): Promise<ResolvedIndiaLocation[]> {
  const cleanQ = query.trim();
  if (!cleanQ) return [];

  // 1. First get local instant matches
  const localMatches = searchLocalIndiaLocations(cleanQ, 10).map((loc, idx) => ({
    id: `local-${loc.name}-${idx}`,
    name: loc.name,
    district: loc.district,
    state: loc.state,
    displayName: `${loc.name}, ${loc.district}, ${loc.state}`,
    type: loc.type === 'Village Cluster' ? ('Village' as const) : (loc.type as any),
    lat: loc.lat,
    lon: loc.lon,
    source: 'Local Directory' as const
  }));

  // If query is short, return local matches right away
  if (cleanQ.length < 2) {
    return localMatches;
  }

  const results: ResolvedIndiaLocation[] = [...localMatches];
  const seenKeys = new Set(localMatches.map((m) => `${m.name.toLowerCase()}-${m.state.toLowerCase()}`));

  // 2. Fetch live village & subdistrict data with timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const isPinCode = /^\d{6}$/.test(cleanQ);

    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      cleanQ
    )}&countrycodes=in&format=json&addressdetails=1&limit=10`;

    const openMeteoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      cleanQ
    )}&count=8&language=en&country_code=IN&format=json`;

    const [osmRes, omRes] = await Promise.allSettled([
      fetch(nominatimUrl, {
        signal: controller.signal,
        headers: { 'Accept-Language': 'en' }
      }),
      fetch(openMeteoUrl, { signal: controller.signal })
    ]);

    clearTimeout(timeoutId);

    // Parse OpenStreetMap Nominatim response (has comprehensive village & gram panchayat coverage)
    if (osmRes.status === 'fulfilled' && osmRes.value.ok) {
      const osmData = await osmRes.value.json();
      if (Array.isArray(osmData)) {
        for (const item of osmData) {
          const addr = item.address || {};
          const villageName =
            addr.village || addr.hamlet || addr.suburb || addr.neighbourhood || addr.residential;
          const tehsilName = addr.subdistrict || addr.tehsil || addr.taluk || addr.county;
          const districtName = addr.state_district || addr.district || tehsilName || 'Local District';
          const stateName = addr.state || 'India';
          const postcode = addr.postcode;

          const primaryName = villageName || item.name || cleanQ;

          let locType: ResolvedIndiaLocation['type'] = 'Village';
          if (isPinCode || postcode === cleanQ) {
            locType = 'PIN Code';
          } else if (villageName || item.type === 'village' || item.type === 'hamlet') {
            locType = 'Village';
          } else if (tehsilName && !villageName) {
            locType = 'Tehsil/Taluk';
          } else if (item.addresstype === 'state_district' || item.addresstype === 'district') {
            locType = 'District';
          } else if (item.addresstype === 'city' || item.addresstype === 'town') {
            locType = 'City';
          }

          const key = `${primaryName.toLowerCase()}-${stateName.toLowerCase()}`;
          if (!seenKeys.has(key)) {
            seenKeys.add(key);

            const displayParts = [
              primaryName,
              tehsilName && tehsilName !== primaryName ? tehsilName : null,
              districtName && districtName !== primaryName && districtName !== tehsilName
                ? districtName
                : null,
              stateName,
              postcode ? `PIN ${postcode}` : null
            ].filter(Boolean);

            results.push({
              id: `osm-${item.place_id || item.osm_id || Math.random()}`,
              name: primaryName,
              village: villageName,
              tehsil: tehsilName,
              district: districtName,
              state: stateName,
              pincode: postcode,
              displayName: displayParts.join(', '),
              type: locType,
              lat: parseFloat(item.lat),
              lon: parseFloat(item.lon),
              source: 'OpenStreetMap'
            });
          }
        }
      }
    }

    // Parse Open-Meteo response
    if (omRes.status === 'fulfilled' && omRes.value.ok) {
      const omData = await omRes.value.json();
      if (omData.results && Array.isArray(omData.results)) {
        for (const item of omData.results) {
          const primaryName = item.name;
          const stateName = item.admin1 || 'India';
          const districtName = item.admin2 || item.admin3 || primaryName;
          const key = `${primaryName.toLowerCase()}-${stateName.toLowerCase()}`;

          if (!seenKeys.has(key)) {
            seenKeys.add(key);
            results.push({
              id: `om-${item.id || Math.random()}`,
              name: primaryName,
              district: districtName,
              state: stateName,
              displayName: `${primaryName}, ${districtName}, ${stateName}`,
              type: item.feature_code === 'PPL' ? 'Village' : 'City',
              lat: item.latitude,
              lon: item.longitude,
              source: 'Open-Meteo'
            });
          }
        }
      }
    }
  } catch {
    // Network fail or timeout - silently return local matched records
  }

  return results.slice(0, 15);
}

/**
 * Reverse geocode any latitude and longitude to pinpoint the exact
 * village, taluk, district, state and PIN code in India.
 */
export async function reverseGeocodeVillage(lat: number, lon: number): Promise<ResolvedIndiaLocation> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`,
      {
        signal: controller.signal,
        headers: { 'Accept-Language': 'en' }
      }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const village =
        addr.village || addr.hamlet || addr.suburb || addr.town || addr.city || 'Local Gram Panchayat';
      const tehsil = addr.subdistrict || addr.tehsil || addr.taluk;
      const district = addr.state_district || addr.district || tehsil || 'Agricultural District';
      const state = addr.state || 'India';
      const pincode = addr.postcode;

      const displayParts = [
        village,
        tehsil && tehsil !== village ? tehsil : null,
        district && district !== village ? district : null,
        state,
        pincode ? `PIN ${pincode}` : null
      ].filter(Boolean);

      return {
        id: `reverse-gps-${lat}-${lon}`,
        name: village,
        village,
        tehsil,
        district,
        state,
        pincode,
        displayName: displayParts.join(', '),
        type: 'Village',
        lat,
        lon,
        source: 'OpenStreetMap'
      };
    }
  } catch {
    // Fall through to offline lookup
  }

  // Offline fallback: Use Haversine distance to locate closest Indian district or hub
  const nearest = findNearestLocation(lat, lon);
  return {
    id: `local-nearest-${nearest.name}`,
    name: nearest.name,
    district: nearest.district,
    state: nearest.state,
    displayName: `${nearest.name}, ${nearest.district}, ${nearest.state}`,
    type: nearest.type === 'Village Cluster' ? 'Village' : (nearest.type as any),
    lat: nearest.lat,
    lon: nearest.lon,
    source: 'Local Directory'
  };
}

/**
 * Fetch live weather from Open-Meteo for any Indian village or farm coordinates.
 * In case of offline or failure, falls back to regional calibrated agro-climatic model.
 */
export async function fetchLiveWeatherByCoords(
  lat: number,
  lon: number,
  cityName = 'Local Field Station'
): Promise<WeatherData> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather API HTTP ${res.status}`);
    const data = await res.json();
    const current = data.current;

    const precip = current.precipitation ?? 0;
    const estRainfall = Math.max(300, Math.min(2400, Math.round(precip * 300 + 650)));

    return {
      city: cityName,
      latitude: lat,
      longitude: lon,
      temperature: Math.round(current.temperature_2m ?? 26),
      humidity: Math.round(current.relative_humidity_2m ?? 65),
      precipitation: estRainfall,
      windSpeed: Math.round(current.wind_speed_10m ?? 10),
      weatherCode: current.weather_code ?? 0,
      description: decodeWmoWeather(current.weather_code ?? 0),
      isLive: true,
      fetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  } catch (err) {
    console.warn('Weather API online fetch failed, using fallback hub calibration:', err);
    // Find closest agricultural hub or district
    const nearest = findNearestLocation(lat, lon);
    const matchedHub = AGRICULTURAL_HUBS.find((h) =>
      h.name.toLowerCase().includes(nearest.state.toLowerCase())
    ) || AGRICULTURAL_HUBS[0];

    return {
      city: `${cityName} (Calibrated Model)`,
      latitude: lat,
      longitude: lon,
      temperature: matchedHub.temp,
      humidity: matchedHub.hum,
      precipitation: matchedHub.rain,
      windSpeed: 12,
      weatherCode: 2,
      description: 'Typical Seasonal Conditions (Regional Agro-Climatic Baseline)',
      isLive: false,
      fetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }
}

/**
 * High-accuracy search for any Indian location: village, taluk, district, or city.
 */
export async function searchCityWeather(cityName: string): Promise<WeatherData> {
  const cleanCity = cityName.trim();
  if (!cleanCity) throw new Error('Please enter a valid village, tehsil, or district name.');

  const matches = await searchAllIndiaLocations(cleanCity);
  if (matches.length > 0) {
    const best = matches[0];
    return await fetchLiveWeatherByCoords(best.lat, best.lon, best.displayName);
  }

  // Fallback to nearest hub
  const matchedHub = AGRICULTURAL_HUBS.find((h) =>
    h.name.toLowerCase().includes(cleanCity.toLowerCase())
  );
  if (matchedHub) {
    return {
      city: matchedHub.name,
      latitude: matchedHub.lat,
      longitude: matchedHub.lon,
      temperature: matchedHub.temp,
      humidity: matchedHub.hum,
      precipitation: matchedHub.rain,
      windSpeed: 10,
      weatherCode: 1,
      description: 'Typical Seasonal Conditions (Offline Cache)',
      isLive: false,
      fetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }

  throw new Error(`Location "${cleanCity}" not found in Indian Directory.`);
}
