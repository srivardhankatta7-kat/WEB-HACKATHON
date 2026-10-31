import { createContext, useContext } from 'react';
import type { CropCategory, Season, SoilType, SuitabilityCategory, SupportedLanguage } from '../types/crop';
import type { TranslationDictionary } from '../data/translations';

export interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
  translateCropName: (cropNameOrId: string) => string;
  translateSoilType: (soil: SoilType) => string;
  translateSeason: (season: Season) => string;
  translateCategory: (category: CropCategory | 'All') => string;
  translateSuitability: (suitability: SuitabilityCategory | 'All') => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
