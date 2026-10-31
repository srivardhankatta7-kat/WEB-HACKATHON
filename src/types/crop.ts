export type SoilType =
  | 'Alluvial'
  | 'Black'
  | 'Red'
  | 'Laterite'
  | 'Sandy'
  | 'Clayey'
  | 'Loamy'
  | 'Peaty'
  | 'Silt';

export type Season = 'Kharif' | 'Rabi' | 'Zaid' | 'Whole Year';

export type CropCategory =
  | 'Cereals'
  | 'Pulses'
  | 'Cash Crops'
  | 'Oilseeds'
  | 'Fruits & Plantation'
  | 'Vegetables & Tubers';

export type WaterRequirement = 'Low' | 'Moderate' | 'High' | 'Very High';

export interface NumericRange {
  minTolerable: number;
  minIdeal: number;
  maxIdeal: number;
  maxTolerable: number;
}

export interface IdealRange {
  min: number;
  max: number;
}

export interface Crop {
  id: string;
  name: string;
  scientificName: string;
  category: CropCategory;
  emoji: string;
  description: string;
  suitableSeasons: Season[];
  compatibleSoils: SoilType[];
  phRange: NumericRange;
  temperatureRange: NumericRange; // in °C
  rainfallRange: NumericRange; // in mm
  humidityRange: NumericRange; // in %
  nitrogenRange: IdealRange; // kg/ha
  phosphorusRange: IdealRange; // kg/ha
  potassiumRange: IdealRange; // kg/ha
  waterRequirement: WaterRequirement;
  typicalDurationDays: string;
  averageYield: string;
  marketValue: 'Low' | 'Medium' | 'High' | 'Very High';
  keyBenefits: string[];
  limitingFactorsAndRisks: string[];
  soilManagementTips: string[];
  sourceReference: string;
}

export interface FarmInputData {
  farmerName?: string;
  farmLocation?: string;
  soilType: SoilType;
  soilPh: number;
  hasNpkData: boolean;
  nitrogen: number; // kg/ha
  phosphorus: number; // kg/ha
  potassium: number; // kg/ha
  rainfall: number; // mm
  temperature: number; // °C
  humidity: number; // %
  season: Season;
}

export type SuitabilityCategory =
  | 'Highly Suitable'
  | 'Moderately Suitable'
  | 'Marginally Suitable'
  | 'Not Recommended';

export interface FactorScore {
  name: string;
  score: number; // 0 to 100
  weight: number; // percentage weight
  weightedScore: number;
  status: 'optimal' | 'acceptable' | 'marginal' | 'incompatible';
  userValue: string | number;
  idealRange: string;
  notes: string;
}

export interface CropRecommendation {
  crop: Crop;
  overallScore: number; // 0 to 100
  suitabilityCategory: SuitabilityCategory;
  rank: number;
  factorScores: {
    soilType: FactorScore;
    ph: FactorScore;
    nitrogen: FactorScore;
    phosphorus: FactorScore;
    potassium: FactorScore;
    rainfall: FactorScore;
    temperature: FactorScore;
    humidity: FactorScore;
    season: FactorScore;
  };
  strengths: string[];
  weaknesses: string[];
  warnings: string[];
  amendmentsNeeded: string[];
  knnSimilarity?: number;
}

export interface ExampleProfile {
  id: string;
  title: string;
  region: string;
  badge: string;
  description: string;
  expectedTopCrops: string[];
  expectedSuitabilitySummary: string;
  input: FarmInputData;
}

export interface SavedAudit {
  id: string;
  timestamp: string;
  title: string;
  inputs: FarmInputData;
  topCrop: string;
  topScore: number;
}

// --- Language Support ---
export type SupportedLanguage = 'en' | 'hi' | 'te' | 'ta' | 'pa' | 'mr' | 'bn' | 'kn';

// --- Weather API Integration ---
export interface WeatherData {
  city: string;
  region?: string;
  latitude: number;
  longitude: number;
  temperature: number; // °C
  humidity: number; // %
  precipitation: number; // mm
  windSpeed: number; // km/h
  weatherCode: number;
  description: string;
  isLive: boolean;
  fetchedAt: string;
}

// --- Season-Aware Suggestions ---
export interface SeasonInfo {
  activeSeason: Season;
  currentMonthName: string;
  sowingStatus: 'Peak Sowing Window' | 'Mid-Season Care' | 'Late Sowing / Harvesting Window';
  daysLeftInSeason: number;
  description: string;
}

// --- Fertilizer Guidance (ICAR / FAO Trusted Source) ---
export interface NutrientDeficit {
  nutrient: 'Nitrogen (N)' | 'Phosphorus (P)' | 'Potassium (K)';
  soilStatus: 'Low' | 'Medium' | 'High';
  targetRequirementKgHa: number;
  soilSupplyKgHa: number;
  netDeficitKgHa: number;
}

export interface FertilizerProductRequirement {
  name: string;
  nutrientSupplied: string;
  rateKgHa: number;
  bags50kgPerHa: number;
  costEstimateInr?: number;
}

export interface SplitDosingStage {
  stage: string;
  timing: string;
  fertilizers: {
    productName: string;
    dosageKgHa: number;
    applicationMethod: string;
  }[];
  notes: string;
}

export interface BiofertilizerRecommendation {
  name: string;
  targetRole: string;
  dosage: string;
  method: string;
  trustedSourceCitation: string;
}

export interface FertilizerGuidance {
  cropName: string;
  cropEmoji: string;
  institutionalSource: string;
  soilInterpretation: {
    nStatus: 'Low' | 'Medium' | 'High';
    pStatus: 'Low' | 'Medium' | 'High';
    kStatus: 'Low' | 'Medium' | 'High';
  };
  deficits: NutrientDeficit[];
  commercialFertilizers: FertilizerProductRequirement[];
  splitSchedule: SplitDosingStage[];
  biofertilizers: BiofertilizerRecommendation[];
  phAmendment?: {
    material: string;
    rateKgHa: number;
    reason: string;
    applicationTiming: string;
  };
  inmPractices: string[];
}

// --- Model Evaluation Against Labelled Dataset ---
export interface LabelledSample {
  id: number;
  n: number;
  p: number;
  k: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
  soilType: SoilType;
  season: Season;
  trueLabel: string;
  predictedCrop?: string;
  top3Predictions?: string[];
  isTop1Correct?: boolean;
  isTop3Correct?: boolean;
}

export interface ClassMetrics {
  crop: string;
  support: number;
  precision: number;
  recall: number;
  f1Score: number;
}

export interface EvaluationResults {
  totalSamples: number;
  top1Accuracy: number; // percentage
  top3Accuracy: number; // percentage
  macroPrecision: number;
  macroRecall: number;
  macroF1: number;
  knnTop1Accuracy: number;
  confusionMatrix: {
    labels: string[];
    matrix: number[][]; // true x pred
  };
  classMetrics: ClassMetrics[];
  evaluatedAt: string;
}

// --- Test Report & Comparison ---
export interface AgriTestCase {
  id: string;
  title: string;
  agroZone: string;
  input: FarmInputData;
  expectedTopCrops: string[];
  disqualifiedCrops: string[];
  assertions: {
    description: string;
    check: (recommendations: CropRecommendation[]) => boolean;
  }[];
}

export interface TestCaseResult {
  testId: string;
  title: string;
  agroZone: string;
  passed: boolean;
  topRecommendation: string;
  topScore: number;
  assertionsPassed: number;
  assertionsTotal: number;
  executionTimeMs: number;
  details: string[];
}

export interface ShortTestReport {
  timestamp: string;
  engineVersion: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  successRate: number;
  averageLatencyMs: number;
  results: TestCaseResult[];
  benchmarkComparisonSummary: {
    ruleEngineConsistency: string;
    knnBenchmarkAgreement: string;
    missingDataGracefulness: string;
  };
}
