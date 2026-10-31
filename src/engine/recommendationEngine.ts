import type {
  Crop,
  CropRecommendation,
  FactorScore,
  FarmInputData,
  IdealRange,
  NumericRange,
  SoilType,
  SuitabilityCategory
} from '../types/crop';
import { CROPS_DATABASE } from '../data/cropsData';

// Continuous metric score generator with trapezoidal curve
function calculateContinuousScore(
  val: number,
  range: NumericRange,
  unit: string
): { score: number; status: FactorScore['status']; notes: string } {
  const { minTolerable, minIdeal, maxIdeal, maxTolerable } = range;

  if (val >= minIdeal && val <= maxIdeal) {
    return {
      score: 100,
      status: 'optimal',
      notes: `Optimal: ${val}${unit} matches the ideal range (${minIdeal}-${maxIdeal}${unit}).`
    };
  }

  // Tolerable low
  if (val >= minTolerable && val < minIdeal) {
    const fraction = (val - minTolerable) / Math.max(0.1, minIdeal - minTolerable);
    const score = Math.round(50 + fraction * 45);
    return {
      score,
      status: 'acceptable',
      notes: `Acceptable: ${val}${unit} is slightly below ideal (${minIdeal}-${maxIdeal}${unit}) but within tolerance.`
    };
  }

  // Tolerable high
  if (val > maxIdeal && val <= maxTolerable) {
    const fraction = (maxTolerable - val) / Math.max(0.1, maxTolerable - maxIdeal);
    const score = Math.round(50 + fraction * 45);
    return {
      score,
      status: 'acceptable',
      notes: `Acceptable: ${val}${unit} is slightly above ideal (${minIdeal}-${maxIdeal}${unit}) but within tolerance.`
    };
  }

  // Extreme low
  if (val < minTolerable) {
    const deficit = minTolerable - val;
    const penalty = Math.min(50, (deficit / Math.max(1, minTolerable * 0.5)) * 50);
    const score = Math.max(0, Math.round(45 - penalty));
    return {
      score,
      status: score > 25 ? 'marginal' : 'incompatible',
      notes: `Critical deficit: ${val}${unit} is below minimum tolerable threshold (${minTolerable}${unit}).`
    };
  }

  // Extreme high
  const excess = val - maxTolerable;
  const penalty = Math.min(50, (excess / Math.max(1, maxTolerable * 0.5)) * 50);
  const score = Math.max(0, Math.round(45 - penalty));
  return {
    score,
    status: score > 25 ? 'marginal' : 'incompatible',
    notes: `Critical excess: ${val}${unit} exceeds maximum tolerable threshold (${maxTolerable}${unit}).`
  };
}

// Soil compatibility lookup matrix
const SOIL_COMPATIBILITY_MAP: Record<SoilType, Partial<Record<SoilType, number>>> = {
  Alluvial: { Loamy: 90, Silt: 90, Clayey: 80, Black: 75, Red: 65, Sandy: 50, Laterite: 45, Peaty: 40 },
  Black: { Clayey: 85, Loamy: 80, Alluvial: 75, Red: 60, Silt: 65, Sandy: 35, Laterite: 40, Peaty: 30 },
  Red: { Loamy: 85, Sandy: 75, Laterite: 80, Alluvial: 70, Black: 60, Silt: 60, Clayey: 50, Peaty: 35 },
  Laterite: { Red: 80, Loamy: 75, Sandy: 60, Alluvial: 50, Black: 40, Clayey: 45, Silt: 50, Peaty: 50 },
  Sandy: { Loamy: 75, Red: 70, Alluvial: 60, Laterite: 50, Silt: 45, Black: 30, Clayey: 25, Peaty: 30 },
  Clayey: { Black: 85, Alluvial: 80, Loamy: 75, Silt: 75, Peaty: 60, Red: 55, Laterite: 45, Sandy: 25 },
  Loamy: { Alluvial: 95, Black: 85, Red: 85, Silt: 85, Clayey: 75, Sandy: 75, Laterite: 70, Peaty: 50 },
  Peaty: { Clayey: 65, Silt: 60, Alluvial: 55, Loamy: 50, Laterite: 50, Red: 40, Black: 30, Sandy: 20 },
  Silt: { Loamy: 90, Alluvial: 90, Clayey: 80, Black: 70, Red: 65, Sandy: 45, Laterite: 45, Peaty: 50 }
};

function calculateSoilScore(
  userSoil: SoilType,
  cropSoils: SoilType[]
): { score: number; status: FactorScore['status']; notes: string } {
  if (cropSoils.includes(userSoil)) {
    return {
      score: 100,
      status: 'optimal',
      notes: `Optimal: ${userSoil} soil is a prime recommended substrate for this crop.`
    };
  }

  // Check highest compatible neighbor
  let highestScore = 30;
  const affinities = SOIL_COMPATIBILITY_MAP[userSoil] || {};
  for (const cs of cropSoils) {
    if (affinities[cs] && affinities[cs]! > highestScore) {
      highestScore = affinities[cs]!;
    }
  }

  const status: FactorScore['status'] =
    highestScore >= 80 ? 'optimal' : highestScore >= 60 ? 'acceptable' : highestScore >= 40 ? 'marginal' : 'incompatible';

  return {
    score: highestScore,
    status,
    notes:
      highestScore >= 70
        ? `Moderate compatibility: ${userSoil} has acceptable physical texture for this crop.`
        : `Texture mismatch: Crop thrives best in ${cropSoils.join(', ')} rather than ${userSoil}.`
  };
}

function calculateSeasonScore(
  userSeason: string,
  cropSeasons: string[]
): { score: number; status: FactorScore['status']; notes: string } {
  if (cropSeasons.includes(userSeason)) {
    return {
      score: 100,
      status: 'optimal',
      notes: `In-season planting: Sowing in ${userSeason} aligns with natural photoperiod and harvest cycle.`
    };
  }

  if (cropSeasons.includes('Whole Year')) {
    return {
      score: 95,
      status: 'optimal',
      notes: `Year-round crop: Compatible with planting across multiple seasons.`
    };
  }

  return {
    score: 25,
    status: 'incompatible',
    notes: `Off-season: Typical sowing season is ${cropSeasons.join(' or ')}. Off-season cultivation requires greenhouse/protected cultivation.`
  };
}

function calculateNutrientScore(
  val: number,
  ideal: IdealRange,
  nutrientName: string
): { score: number; status: FactorScore['status']; notes: string } {
  if (val >= ideal.min && val <= ideal.max) {
    return {
      score: 100,
      status: 'optimal',
      notes: `Optimal ${nutrientName}: ${val} kg/ha matches requirement (${ideal.min}-${ideal.max} kg/ha).`
    };
  }

  if (val < ideal.min) {
    const deficitRatio = val / Math.max(1, ideal.min);
    const score = Math.max(10, Math.round(deficitRatio * 85));
    return {
      score,
      status: score >= 60 ? 'acceptable' : 'marginal',
      notes: `Deficit: ${val} kg/ha is below optimal ${ideal.min}-${ideal.max} kg/ha. Supplemental fertilization recommended.`
    };
  }

  // Excess
  const excessRatio = (val - ideal.max) / ideal.max;
  const score = Math.max(40, Math.round(90 - excessRatio * 35));
  return {
    score,
    status: score >= 70 ? 'acceptable' : 'marginal',
    notes: `Surplus: ${val} kg/ha exceeds crop requirement (${ideal.min}-${ideal.max} kg/ha). May lead to luxury consumption or leaching.`
  };
}

// Calculate k-NN Euclidean distance similarity for ML benchmark comparison
function calculateKnnSimilarity(input: FarmInputData, crop: Crop): number {
  // Normalize each dimension to 0-1 range
  const normPh = (input.soilPh - 3.5) / 6.0;
  const cropMidPh = ((crop.phRange.minIdeal + crop.phRange.maxIdeal) / 2 - 3.5) / 6.0;

  const normTemp = (input.temperature - 5) / 40.0;
  const cropMidTemp = ((crop.temperatureRange.minIdeal + crop.temperatureRange.maxIdeal) / 2 - 5) / 40.0;

  const normRain = (input.rainfall - 100) / 3000.0;
  const cropMidRain = ((crop.rainfallRange.minIdeal + crop.rainfallRange.maxIdeal) / 2 - 100) / 3000.0;

  const normHum = (input.humidity - 10) / 90.0;
  const cropMidHum = ((crop.humidityRange.minIdeal + crop.humidityRange.maxIdeal) / 2 - 10) / 90.0;

  let distanceSq =
    Math.pow(normPh - cropMidPh, 2) * 1.5 +
    Math.pow(normTemp - cropMidTemp, 2) * 2.0 +
    Math.pow(normRain - cropMidRain, 2) * 2.0 +
    Math.pow(normHum - cropMidHum, 2) * 1.0;

  if (input.hasNpkData) {
    const normN = (input.nitrogen - 10) / 250.0;
    const cropMidN = ((crop.nitrogenRange.min + crop.nitrogenRange.max) / 2 - 10) / 250.0;
    distanceSq += Math.pow(normN - cropMidN, 2) * 1.2;
  }

  const distance = Math.sqrt(distanceSq);
  // Convert distance to percentage similarity
  const similarity = Math.max(0, Math.min(100, Math.round((1 / (1 + distance * 1.5)) * 100)));
  return similarity;
}

export function evaluateCropRecommendation(
  crop: Crop,
  input: FarmInputData
): CropRecommendation {
  // Define base weights
  let weights = {
    temperature: 0.18,
    rainfall: 0.18,
    humidity: 0.12,
    ph: 0.14,
    soilType: 0.14,
    season: 0.10,
    nitrogen: 0.05,
    phosphorus: 0.04,
    potassium: 0.05
  };

  // If user does not have NPK data, redistribute NPK weights (14%) to climate & soil
  if (!input.hasNpkData) {
    const redistributionScale = 1 / (1 - (weights.nitrogen + weights.phosphorus + weights.potassium));
    weights = {
      temperature: weights.temperature * redistributionScale,
      rainfall: weights.rainfall * redistributionScale,
      humidity: weights.humidity * redistributionScale,
      ph: weights.ph * redistributionScale,
      soilType: weights.soilType * redistributionScale,
      season: weights.season * redistributionScale,
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0
    };
  }

  // 1. Temperature score
  const tempRes = calculateContinuousScore(input.temperature, crop.temperatureRange, '°C');
  const tempScore: FactorScore = {
    name: 'Temperature',
    score: tempRes.score,
    weight: Math.round(weights.temperature * 100),
    weightedScore: +(tempRes.score * weights.temperature).toFixed(1),
    status: tempRes.status,
    userValue: `${input.temperature}°C`,
    idealRange: `${crop.temperatureRange.minIdeal} - ${crop.temperatureRange.maxIdeal}°C`,
    notes: tempRes.notes
  };

  // 2. Rainfall score
  const rainRes = calculateContinuousScore(input.rainfall, crop.rainfallRange, ' mm');
  const rainScore: FactorScore = {
    name: 'Rainfall',
    score: rainRes.score,
    weight: Math.round(weights.rainfall * 100),
    weightedScore: +(rainRes.score * weights.rainfall).toFixed(1),
    status: rainRes.status,
    userValue: `${input.rainfall} mm`,
    idealRange: `${crop.rainfallRange.minIdeal} - ${crop.rainfallRange.maxIdeal} mm`,
    notes: rainRes.notes
  };

  // 3. Humidity score
  const humRes = calculateContinuousScore(input.humidity, crop.humidityRange, '%');
  const humScore: FactorScore = {
    name: 'Humidity',
    score: humRes.score,
    weight: Math.round(weights.humidity * 100),
    weightedScore: +(humRes.score * weights.humidity).toFixed(1),
    status: humRes.status,
    userValue: `${input.humidity}%`,
    idealRange: `${crop.humidityRange.minIdeal} - ${crop.humidityRange.maxIdeal}%`,
    notes: humRes.notes
  };

  // 4. pH score
  const phRes = calculateContinuousScore(input.soilPh, crop.phRange, '');
  const phScore: FactorScore = {
    name: 'Soil pH',
    score: phRes.score,
    weight: Math.round(weights.ph * 100),
    weightedScore: +(phRes.score * weights.ph).toFixed(1),
    status: phRes.status,
    userValue: input.soilPh.toFixed(1),
    idealRange: `${crop.phRange.minIdeal} - ${crop.phRange.maxIdeal}`,
    notes: phRes.notes
  };

  // 5. Soil Type score
  const soilRes = calculateSoilScore(input.soilType, crop.compatibleSoils);
  const soilScore: FactorScore = {
    name: 'Soil Type',
    score: soilRes.score,
    weight: Math.round(weights.soilType * 100),
    weightedScore: +(soilRes.score * weights.soilType).toFixed(1),
    status: soilRes.status,
    userValue: input.soilType,
    idealRange: crop.compatibleSoils.join(', '),
    notes: soilRes.notes
  };

  // 6. Season score
  const seasonRes = calculateSeasonScore(input.season, crop.suitableSeasons);
  const seasonScore: FactorScore = {
    name: 'Season',
    score: seasonRes.score,
    weight: Math.round(weights.season * 100),
    weightedScore: +(seasonRes.score * weights.season).toFixed(1),
    status: seasonRes.status,
    userValue: input.season,
    idealRange: crop.suitableSeasons.join(', '),
    notes: seasonRes.notes
  };

  // 7, 8, 9. NPK scores (if available)
  let nScore: FactorScore;
  let pScore: FactorScore;
  let kScore: FactorScore;

  if (input.hasNpkData) {
    const nRes = calculateNutrientScore(input.nitrogen, crop.nitrogenRange, 'Nitrogen');
    nScore = {
      name: 'Nitrogen (N)',
      score: nRes.score,
      weight: Math.round(weights.nitrogen * 100),
      weightedScore: +(nRes.score * weights.nitrogen).toFixed(1),
      status: nRes.status,
      userValue: `${input.nitrogen} kg/ha`,
      idealRange: `${crop.nitrogenRange.min} - ${crop.nitrogenRange.max} kg/ha`,
      notes: nRes.notes
    };

    const pRes = calculateNutrientScore(input.phosphorus, crop.phosphorusRange, 'Phosphorus');
    pScore = {
      name: 'Phosphorus (P)',
      score: pRes.score,
      weight: Math.round(weights.phosphorus * 100),
      weightedScore: +(pRes.score * weights.phosphorus).toFixed(1),
      status: pRes.status,
      userValue: `${input.phosphorus} kg/ha`,
      idealRange: `${crop.phosphorusRange.min} - ${crop.phosphorusRange.max} kg/ha`,
      notes: pRes.notes
    };

    const kRes = calculateNutrientScore(input.potassium, crop.potassiumRange, 'Potassium');
    kScore = {
      name: 'Potassium (K)',
      score: kRes.score,
      weight: Math.round(weights.potassium * 100),
      weightedScore: +(kRes.score * weights.potassium).toFixed(1),
      status: kRes.status,
      userValue: `${input.potassium} kg/ha`,
      idealRange: `${crop.potassiumRange.min} - ${crop.potassiumRange.max} kg/ha`,
      notes: kRes.notes
    };
  } else {
    // Neutral fallback indicators
    nScore = {
      name: 'Nitrogen (N)',
      score: 75,
      weight: 0,
      weightedScore: 0,
      status: 'acceptable',
      userValue: 'Not Provided (Baseline Assumed)',
      idealRange: `${crop.nitrogenRange.min} - ${crop.nitrogenRange.max} kg/ha`,
      notes: 'No lab test data provided. Regional average fertility assumed.'
    };
    pScore = {
      name: 'Phosphorus (P)',
      score: 75,
      weight: 0,
      weightedScore: 0,
      status: 'acceptable',
      userValue: 'Not Provided (Baseline Assumed)',
      idealRange: `${crop.phosphorusRange.min} - ${crop.phosphorusRange.max} kg/ha`,
      notes: 'No lab test data provided. Regional average fertility assumed.'
    };
    kScore = {
      name: 'Potassium (K)',
      score: 75,
      weight: 0,
      weightedScore: 0,
      status: 'acceptable',
      userValue: 'Not Provided (Baseline Assumed)',
      idealRange: `${crop.potassiumRange.min} - ${crop.potassiumRange.max} kg/ha`,
      notes: 'No lab test data provided. Regional average fertility assumed.'
    };
  }

  // Calculate composite weighted score
  const totalWeighted =
    tempScore.weightedScore +
    rainScore.weightedScore +
    humScore.weightedScore +
    phScore.weightedScore +
    soilScore.weightedScore +
    seasonScore.weightedScore +
    nScore.weightedScore +
    pScore.weightedScore +
    kScore.weightedScore;

  // Multiplier penalty if any critical factor is completely incompatible (< 20)
  let penaltyMultiplier = 1.0;
  if (tempScore.score < 20) penaltyMultiplier *= 0.55;
  if (rainScore.score < 20) penaltyMultiplier *= 0.65;
  if (phScore.score < 20) penaltyMultiplier *= 0.60;
  if (seasonScore.score < 20) penaltyMultiplier *= 0.50;

  let finalScore = Math.round(Math.min(100, Math.max(0, totalWeighted * penaltyMultiplier)));

  // Categorize
  let suitabilityCategory: SuitabilityCategory = 'Not Recommended';
  if (finalScore >= 85) {
    suitabilityCategory = 'Highly Suitable';
  } else if (finalScore >= 70) {
    suitabilityCategory = 'Moderately Suitable';
  } else if (finalScore >= 50) {
    suitabilityCategory = 'Marginally Suitable';
  }

  // Compile strengths, weaknesses, warnings, and amendments
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const warnings: string[] = [];
  const amendmentsNeeded: string[] = [];

  // Check strengths
  if (tempScore.score >= 90) strengths.push(`Optimal temperature (${input.temperature}°C) promotes strong vegetative & reproductive stages.`);
  if (rainScore.score >= 90) strengths.push(`Ideal rainfall (${input.rainfall} mm) satisfies water requirements with minimal irrigation.`);
  if (phScore.score >= 90) strengths.push(`Soil pH (${input.soilPh}) matches the crop's preferred chemical uptake balance.`);
  if (soilScore.score >= 90) strengths.push(`${input.soilType} soil provides prime physical structure and root anchorage.`);
  if (seasonScore.score >= 90) strengths.push(`Sowing during ${input.season} optimizes daylight hours and seasonal temperature cycle.`);

  // Check weaknesses
  if (tempScore.score < 60) weaknesses.push(`Temperature (${input.temperature}°C) is sub-optimal; growth velocity may decrease.`);
  if (rainScore.score < 60) {
    if (input.rainfall < crop.rainfallRange.minIdeal) {
      weaknesses.push(`Rainfall deficit (${input.rainfall} mm vs ideal ${crop.rainfallRange.minIdeal}+ mm). Supplemental irrigation essential.`);
    } else {
      weaknesses.push(`Excess rainfall (${input.rainfall} mm vs ideal ${crop.rainfallRange.maxIdeal} mm). Drainage channels recommended.`);
    }
  }
  if (phScore.score < 60) weaknesses.push(`Soil pH ${input.soilPh} diverges from preferred range (${crop.phRange.minIdeal} - ${crop.phRange.maxIdeal}).`);
  if (soilScore.score < 60) weaknesses.push(`Soil texture (${input.soilType}) is less suitable than preferred (${crop.compatibleSoils.join(', ')}).`);
  if (seasonScore.score < 60) weaknesses.push(`Outside primary planting season (${crop.suitableSeasons.join(', ')}).`);

  // Amendments and Warnings
  if (input.soilPh < crop.phRange.minIdeal) {
    const limeAmount = Math.round((crop.phRange.minIdeal - input.soilPh) * 350);
    amendmentsNeeded.push(`Apply agricultural lime (calcium carbonate) at ~${limeAmount} kg/ha to raise soil pH to at least ${crop.phRange.minIdeal}.`);
  } else if (input.soilPh > crop.phRange.maxIdeal) {
    amendmentsNeeded.push(`Soil is alkaline. Apply agricultural gypsum (calcium sulfate) or organic compost to buffer pH towards ${crop.phRange.maxIdeal}.`);
  }

  if (input.hasNpkData) {
    if (input.nitrogen < crop.nitrogenRange.min) {
      const deficit = crop.nitrogenRange.min - input.nitrogen;
      amendmentsNeeded.push(`Nitrogen deficit: Apply ~${Math.round(deficit * 2.17)} kg/ha Urea (or farmyard compost) to supply ${deficit} kg/ha N.`);
    }
    if (input.phosphorus < crop.phosphorusRange.min) {
      const deficit = crop.phosphorusRange.min - input.phosphorus;
      amendmentsNeeded.push(`Phosphorus deficit: Apply ~${Math.round(deficit * 6.25)} kg/ha Single Super Phosphate (SSP) to deliver ${deficit} kg/ha P.`);
    }
    if (input.potassium < crop.potassiumRange.min) {
      const deficit = crop.potassiumRange.min - input.potassium;
      amendmentsNeeded.push(`Potassium deficit: Apply ~${Math.round(deficit * 1.67)} kg/ha Muriate of Potash (MOP) to deliver ${deficit} kg/ha K.`);
    }
  } else {
    warnings.push('NPK laboratory readings were not provided. Soil nutrient fertility is estimated based on regional baseline.');
  }

  if (crop.waterRequirement === 'Very High' && input.rainfall < 900) {
    warnings.push(`High Water Alert: ${crop.name} requires abundant water. Without assured canal or borewell irrigation, rainfed cultivation carries severe risk.`);
  }

  const knnSim = calculateKnnSimilarity(input, crop);

  return {
    crop,
    overallScore: finalScore,
    suitabilityCategory,
    rank: 0, // Assigned after sorting
    factorScores: {
      temperature: tempScore,
      rainfall: rainScore,
      humidity: humScore,
      ph: phScore,
      soilType: soilScore,
      season: seasonScore,
      nitrogen: nScore,
      phosphorus: pScore,
      potassium: kScore
    },
    strengths,
    weaknesses,
    warnings,
    amendmentsNeeded,
    knnSimilarity: knnSim
  };
}

export function rankCropRecommendations(input: FarmInputData): CropRecommendation[] {
  const recommendations = CROPS_DATABASE.map((crop) => evaluateCropRecommendation(crop, input));

  // Sort by overallScore descending
  recommendations.sort((a, b) => b.overallScore - a.overallScore);

  // Assign ranks
  recommendations.forEach((rec, idx) => {
    rec.rank = idx + 1;
  });

  return recommendations;
}

export function calculateDataCompleteness(input: FarmInputData): {
  score: number;
  missingFields: string[];
  confidenceLevel: 'High' | 'Moderate' | 'Basic';
} {
  let filledPoints = 0;
  const totalPoints = 9;
  const missing: string[] = [];

  if (input.soilType) filledPoints += 1;
  else missing.push('Soil Type');

  if (input.soilPh > 0) filledPoints += 1;
  else missing.push('Soil pH');

  if (input.rainfall > 0) filledPoints += 1;
  else missing.push('Rainfall');

  if (input.temperature > 0) filledPoints += 1;
  else missing.push('Temperature');

  if (input.humidity > 0) filledPoints += 1;
  else missing.push('Humidity');

  if (input.season) filledPoints += 1;
  else missing.push('Season');

  if (input.hasNpkData) {
    if (input.nitrogen >= 0) filledPoints += 1;
    else missing.push('Nitrogen (N)');

    if (input.phosphorus >= 0) filledPoints += 1;
    else missing.push('Phosphorus (P)');

    if (input.potassium >= 0) filledPoints += 1;
    else missing.push('Potassium (K)');
  } else {
    missing.push('Soil N-P-K Lab Test Values');
  }

  const score = Math.round((filledPoints / totalPoints) * 100);
  let confidenceLevel: 'High' | 'Moderate' | 'Basic' = 'High';

  if (!input.hasNpkData || score < 75) {
    confidenceLevel = score >= 50 ? 'Moderate' : 'Basic';
  }

  return {
    score,
    missingFields: missing,
    confidenceLevel
  };
}
