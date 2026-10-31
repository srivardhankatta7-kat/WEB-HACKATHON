import type { Crop, FarmInputData, FertilizerGuidance, NutrientDeficit, FertilizerProductRequirement, SplitDosingStage } from '../types/crop';

export function generateFertilizerGuidance(crop: Crop, input: FarmInputData): FertilizerGuidance {
  // Institutional standards from ICAR (Indian Council of Agricultural Research) and FAO Soil Bulletin 17
  const targetN = (crop.nitrogenRange.min + crop.nitrogenRange.max) / 2;
  const targetP = (crop.phosphorusRange.min + crop.phosphorusRange.max) / 2;
  const targetK = (crop.potassiumRange.min + crop.potassiumRange.max) / 2;

  const currentN = input.hasNpkData ? input.nitrogen : targetN * 0.75;
  const currentP = input.hasNpkData ? input.phosphorus : targetP * 0.75;
  const currentK = input.hasNpkData ? input.potassium : targetK * 0.75;

  const getStatus = (current: number, target: number): 'Low' | 'Medium' | 'High' => {
    if (current < target * 0.75) return 'Low';
    if (current > target * 1.25) return 'High';
    return 'Medium';
  };

  const nStatus = getStatus(currentN, targetN);
  const pStatus = getStatus(currentP, targetP);
  const kStatus = getStatus(currentK, targetK);

  // Deficit calculation
  const nDeficit = Math.max(0, Math.round(targetN - currentN * 0.3)); // 30% available soil release
  const pDeficit = Math.max(0, Math.round(targetP - currentP * 0.25));
  const kDeficit = Math.max(0, Math.round(targetK - currentK * 0.5));

  const deficits: NutrientDeficit[] = [
    {
      nutrient: 'Nitrogen (N)',
      soilStatus: nStatus,
      targetRequirementKgHa: Math.round(targetN),
      soilSupplyKgHa: Math.round(currentN),
      netDeficitKgHa: nDeficit
    },
    {
      nutrient: 'Phosphorus (P)',
      soilStatus: pStatus,
      targetRequirementKgHa: Math.round(targetP),
      soilSupplyKgHa: Math.round(currentP),
      netDeficitKgHa: pDeficit
    },
    {
      nutrient: 'Potassium (K)',
      soilStatus: kStatus,
      targetRequirementKgHa: Math.round(targetK),
      soilSupplyKgHa: Math.round(currentK),
      netDeficitKgHa: kDeficit
    }
  ];

  // Commercial Fertilizer Calculation
  // 1. DAP supplies 18% N and 46% P2O5
  // 2. Urea supplies 46% N
  // 3. MOP supplies 60% K2O
  const dapKg = Math.round((pDeficit / 0.46));
  const nFromDap = Math.round(dapKg * 0.18);
  const remainingN = Math.max(0, nDeficit - nFromDap);
  const ureaKg = Math.round(remainingN / 0.46);
  const mopKg = Math.round(kDeficit / 0.60);

  const commercialFertilizers: FertilizerProductRequirement[] = [
    {
      name: 'Urea (46% N)',
      nutrientSupplied: `Supplies ~${Math.round(ureaKg * 0.46)} kg/ha Nitrogen`,
      rateKgHa: ureaKg,
      bags50kgPerHa: +(ureaKg / 50).toFixed(1),
      costEstimateInr: Math.round(ureaKg * 6.5) // Subsidized rate estimate ~₹300/50kg bag
    },
    {
      name: 'Di-Ammonium Phosphate (DAP 18-46-0)',
      nutrientSupplied: `Supplies ~${pDeficit} kg/ha P₂O₅ + ${nFromDap} kg/ha N`,
      rateKgHa: dapKg,
      bags50kgPerHa: +(dapKg / 50).toFixed(1),
      costEstimateInr: Math.round(dapKg * 27) // Subsidized rate estimate ~₹1350/50kg bag
    },
    {
      name: 'Muriate of Potash (MOP 60% K₂O)',
      nutrientSupplied: `Supplies ~${kDeficit} kg/ha K₂O`,
      rateKgHa: mopKg,
      bags50kgPerHa: +(mopKg / 50).toFixed(1),
      costEstimateInr: Math.round(mopKg * 34) // Subsidized rate estimate ~₹1700/50kg bag
    }
  ];

  // Split Application Stages
  const isPaddy = crop.id === 'rice';
  const isLegume = crop.category === 'Pulses';

  const splitSchedule: SplitDosingStage[] = [
    {
      stage: 'Basal Dose (Sowing / Final Land Preparation)',
      timing: 'At the time of seed sowing / transplanting',
      fertilizers: [
        {
          productName: 'DAP (18-46-0)',
          dosageKgHa: dapKg,
          applicationMethod: 'Band placement 5cm below and beside seed furrow'
        },
        {
          productName: 'MOP (60% K₂O)',
          dosageKgHa: Math.round(mopKg * 0.5),
          applicationMethod: 'Incorporate thoroughly during secondary tillage'
        },
        {
          productName: 'Urea',
          dosageKgHa: Math.round(ureaKg * 0.25),
          applicationMethod: 'Broadcast and mix into topsoil before sowing'
        }
      ],
      notes: 'Phosphorus and potassium encourage rapid root ramification and early seedling vigor.'
    },
    {
      stage: 'First Top-Dressing (Active Tillering / Vegetative Branching)',
      timing: '20 - 30 days after sowing (DAS)',
      fertilizers: [
        {
          productName: 'Urea',
          dosageKgHa: Math.round(ureaKg * 0.45),
          applicationMethod: 'Top dress after weeding; ensure optimal soil moisture'
        }
      ],
      notes: isPaddy
        ? 'Maintain thin water layer in paddy field; do not drain immediately after urea top dressing.'
        : 'Apply after first irrigation or intercultivation weeding to prevent nitrogen volatilization.'
    },
    {
      stage: 'Second Top-Dressing (Panicle Initiation / Pre-Flowering)',
      timing: '45 - 60 days after sowing (DAS)',
      fertilizers: [
        {
          productName: 'Urea',
          dosageKgHa: Math.round(ureaKg * 0.30),
          applicationMethod: 'Even broadcast in late afternoon'
        },
        {
          productName: 'MOP (60% K₂O)',
          dosageKgHa: Math.round(mopKg * 0.5),
          applicationMethod: 'Broadcast along with nitrogen'
        }
      ],
      notes: 'Potassium at panicle initiation strengthens straw, enhances grain filling, and prevents lodging.'
    }
  ];

  // Biofertilizers
  const biofertilizers = [
    isLegume
      ? {
          name: 'Rhizobium Culture',
          targetRole: 'Symbiotic Nitrogen Fixation in root nodules',
          dosage: '200g per 10kg seed (Jaggery slurry carrier)',
          method: 'Seed dressing 30 minutes before shade drying and sowing',
          trustedSourceCitation: 'ICAR-IIPR Pulses Agronomy Compendium'
        }
      : {
          name: 'Azotobacter / Azospirillum',
          targetRole: 'Non-symbiotic / Associative atmospheric Nitrogen fixation (saves 20-25 kg N/ha)',
          dosage: '5 kg/ha mixed with 100 kg Farmyard Manure',
          method: 'Soil application at sowing or seedling root dip',
          trustedSourceCitation: 'FAO Soils Bulletin No. 17 / ICAR Microbes Directorate'
        },
    {
      name: 'Phosphate Solubilizing Bacteria (PSB - Bacillus megaterium)',
      targetRole: 'Solubilizes insoluble rock phosphate and fixed soil phosphorus into plant-available orthophosphate',
      dosage: '4 kg/ha mixed with well-rotted FYM',
      method: 'Broadcasting in moist soil prior to last ploughing',
      trustedSourceCitation: 'FAI Fertilizer Handbooks / ICAR-IISS Bhopal'
    },
    {
      name: 'VAM (Vesicular Arbuscular Mycorrhiza)',
      targetRole: 'Expands root surface area by 300% for zinc, phosphorus, and moisture absorption',
      dosage: '10 kg/ha granulated inoculum',
      method: 'Furrow application during sowing',
      trustedSourceCitation: 'ICAR Central Agroforestry Research Institute'
    }
  ];

  // pH Amendment check
  let phAmendment = undefined;
  if (input.soilPh < 6.0) {
    const limeRate = Math.round((6.5 - input.soilPh) * 600);
    phAmendment = {
      material: 'Agricultural Limestone (CaCO₃, 80-90% Neutralizing Value)',
      rateKgHa: Math.max(300, limeRate),
      reason: `Soil is acidic (pH ${input.soilPh}). Acidity locks phosphorus and causes toxic aluminum solubility.`,
      applicationTiming: 'Broadcast and thoroughly disk into top 15cm soil 3-4 weeks before sowing.'
    };
  } else if (input.soilPh > 8.0) {
    const gypsumRate = Math.round((input.soilPh - 7.5) * 800);
    phAmendment = {
      material: 'Agricultural Gypsum (CaSO₄·2H₂O)',
      rateKgHa: Math.max(400, gypsumRate),
      reason: `Soil is alkaline/sodic (pH ${input.soilPh}). Calcium displaces excess sodium from soil colloids, improving water infiltration.`,
      applicationTiming: 'Apply during pre-monsoon summer ploughing followed by light leaching irrigation.'
    };
  }

  const inmPractices = [
    'Apply 8-10 tonnes/ha well-decomposed Farmyard Manure (FYM) or 2.5 tonnes/ha Vermicompost to restore soil microbial ecology.',
    'Incorporate Dhaincha (Sesbania aculeata) or Sunnhemp as green manure prior to Kharif puddling.',
    'Apply 25 kg/ha Zinc Sulfate (ZnSO₄·7H₂O) once every 3 cropping seasons in rice-wheat systems to cure zinc deficiency.',
    'Always conduct split applications during cool morning or evening hours on moist soil to minimize ammonia volatilization.'
  ];

  return {
    cropName: crop.name,
    cropEmoji: crop.emoji,
    institutionalSource: 'ICAR (Indian Council of Agricultural Research) & FAO Soil Bulletin 17 STCR Guidelines',
    soilInterpretation: {
      nStatus,
      pStatus,
      kStatus
    },
    deficits,
    commercialFertilizers,
    splitSchedule,
    biofertilizers,
    phAmendment,
    inmPractices
  };
}
