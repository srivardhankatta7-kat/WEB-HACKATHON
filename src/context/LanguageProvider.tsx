import React, { useState, useEffect } from 'react';
import type { SupportedLanguage } from '../types/crop';
import {
  TRANSLATIONS,
  CROP_TRANSLATIONS,
  SOIL_TRANSLATIONS,
  SEASON_TRANSLATIONS,
  CATEGORY_TRANSLATIONS,
  SUITABILITY_TRANSLATIONS
} from '../data/translations';
import { LanguageContext } from './LanguageContext';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem('agroguide_language');
      return (saved as SupportedLanguage) || 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('agroguide_language', lang);
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const translateCropName = (cropNameOrId: string): string => {
    const key = cropNameOrId.toLowerCase().trim();
    for (const [id, translations] of Object.entries(CROP_TRANSLATIONS)) {
      if (
        id.toLowerCase() === key ||
        key.includes(id.toLowerCase()) ||
        translations.en.toLowerCase() === key ||
        translations.en.toLowerCase().includes(key) ||
        key.includes(translations.en.toLowerCase().split(' ')[0])
      ) {
        return translations[language] || translations.en;
      }
    }
    return cropNameOrId;
  };

  const translateSoilType = (soil: any): string => {
    const map = (SOIL_TRANSLATIONS as any)[soil];
    if (map) return map[language] || map.en;
    return soil;
  };

  const translateSeason = (season: any): string => {
    const map = (SEASON_TRANSLATIONS as any)[season];
    if (map) return map[language] || map.en;
    return season;
  };

  const translateCategory = (cat: any): string => {
    const map = (CATEGORY_TRANSLATIONS as any)[cat];
    if (map) return map[language] || map.en;
    return cat;
  };

  const translateSuitability = (suit: any): string => {
    const map = (SUITABILITY_TRANSLATIONS as any)[suit];
    if (map) return map[language] || map.en;
    return suit;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        translateCropName,
        translateSoilType,
        translateSeason,
        translateCategory,
        translateSuitability
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
