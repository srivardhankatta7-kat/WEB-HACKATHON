import type { Crop } from '../types/crop';

export const CROPS_DATABASE: Crop[] = [
  {
    id: 'rice',
    name: 'Rice (Paddy)',
    scientificName: 'Oryza sativa',
    category: 'Cereals',
    emoji: '🌾',
    description: 'A primary staple food grain requiring warm temperatures, high humidity, and abundant water or standing water during early vegetative stages.',
    suitableSeasons: ['Kharif', 'Whole Year'],
    compatibleSoils: ['Clayey', 'Alluvial', 'Silt', 'Peaty'],
    phRange: { minTolerable: 5.0, minIdeal: 6.0, maxIdeal: 7.0, maxTolerable: 8.2 },
    temperatureRange: { minTolerable: 20, minIdeal: 24, maxIdeal: 32, maxTolerable: 38 },
    rainfallRange: { minTolerable: 900, minIdeal: 1100, maxIdeal: 2200, maxTolerable: 3500 },
    humidityRange: { minTolerable: 60, minIdeal: 75, maxIdeal: 95, maxTolerable: 100 },
    nitrogenRange: { min: 80, max: 130 },
    phosphorusRange: { min: 35, max: 60 },
    potassiumRange: { min: 35, max: 60 },
    waterRequirement: 'Very High',
    typicalDurationDays: '115 - 150 days',
    averageYield: '3.5 - 6.0 t/ha',
    marketValue: 'Medium',
    keyBenefits: [
      'High caloric staple with strong guaranteed local procurement',
      'Tolerates heavy poorly-drained clay soils where other crops suffer root rot',
      'Multiple crop rotations possible with pulses or mustard in Rabi'
    ],
    limitingFactorsAndRisks: [
      'Severe yield penalty if water deficit occurs during panicle initiation & flowering',
      'Susceptible to blast fungus under prolonged high humidity and excessive nitrogen',
      'High methane emissions under continuous submerged conditions'
    ],
    soilManagementTips: [
      'Puddle soil thoroughly to create an impermeable hardpan preventing water percolation',
      'Split nitrogen application into 3 doses: basal, tillering, and panicle initiation',
      'Apply 25 kg/ha zinc sulfate in zinc-deficient calcareous or alkaline soils'
    ],
    sourceReference: 'FAO Ecocrop 1547 / ICAR Rice Directorate Guidelines'
  },
  {
    id: 'wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    category: 'Cereals',
    emoji: '🌾',
    description: 'Premier temperate/subtropical winter cereal crop that thrives in cool vegetative weather and bright sunny, warm ripening periods.',
    suitableSeasons: ['Rabi'],
    compatibleSoils: ['Loamy', 'Alluvial', 'Clayey', 'Silt'],
    phRange: { minTolerable: 5.5, minIdeal: 6.2, maxIdeal: 7.5, maxTolerable: 8.5 },
    temperatureRange: { minTolerable: 10, minIdeal: 15, maxIdeal: 22, maxTolerable: 30 },
    rainfallRange: { minTolerable: 250, minIdeal: 400, maxIdeal: 750, maxTolerable: 1100 },
    humidityRange: { minTolerable: 40, minIdeal: 50, maxIdeal: 70, maxTolerable: 85 },
    nitrogenRange: { min: 100, max: 150 },
    phosphorusRange: { min: 40, max: 70 },
    potassiumRange: { min: 30, max: 55 },
    waterRequirement: 'Moderate',
    typicalDurationDays: '120 - 145 days',
    averageYield: '4.0 - 5.8 t/ha',
    marketValue: 'Medium',
    keyBenefits: [
      'Stable winter crop with robust market liquidity and government minimum support price',
      'Excellent nutritional balance with protein and carbohydrate supply',
      'Crop residue (straw/bhusa) provides essential dry livestock fodder'
    ],
    limitingFactorsAndRisks: [
      'Terminal heat stress: Temperatures above 30°C during grain filling cause shriveled grains',
      'Extremely sensitive to waterlogging at Crown Root Initiation (CRI) stage',
      'Yellow rust epidemic risk under cool, moist overcast conditions'
    ],
    soilManagementTips: [
      'Ensure deep pre-sowing irrigation and laser land leveling to avoid localized water pools',
      'Apply critical irrigation at Crown Root Initiation (20-25 days after sowing)',
      'Incorporate green manure (dhaincha) or farmyard manure before sowing'
    ],
    sourceReference: 'FAO Ecocrop 2095 / ICAR-IIWBR Karnal'
  },
  {
    id: 'maize',
    name: 'Maize (Corn)',
    scientificName: 'Zea mays',
    category: 'Cereals',
    emoji: '🌽',
    description: 'Versatile "Queen of Cereals" with high photosynthetic efficiency (C4 plant), suitable for food, starch, and poultry feed production.',
    suitableSeasons: ['Kharif', 'Rabi', 'Zaid'],
    compatibleSoils: ['Loamy', 'Alluvial', 'Red', 'Black'],
    phRange: { minTolerable: 5.5, minIdeal: 6.0, maxIdeal: 7.2, maxTolerable: 8.0 },
    temperatureRange: { minTolerable: 16, minIdeal: 21, maxIdeal: 30, maxTolerable: 37 },
    rainfallRange: { minTolerable: 450, minIdeal: 600, maxIdeal: 1000, maxTolerable: 1500 },
    humidityRange: { minTolerable: 45, minIdeal: 60, maxIdeal: 80, maxTolerable: 90 },
    nitrogenRange: { min: 90, max: 140 },
    phosphorusRange: { min: 40, max: 65 },
    potassiumRange: { min: 35, max: 55 },
    waterRequirement: 'Moderate',
    typicalDurationDays: '90 - 120 days',
    averageYield: '4.5 - 7.5 t/ha',
    marketValue: 'Medium',
    keyBenefits: [
      'Very rapid biomass accumulation and high yield response to balanced fertilization',
      'Broad agro-climatic adaptability across three cropping seasons',
      'Ever-growing commercial industrial demand from poultry feed & starch processing'
    ],
    limitingFactorsAndRisks: [
      'Zero tolerance for waterlogging during initial 30 days',
      'Fall Armyworm (Spodoptera frugiperda) infestation requires vigilance',
      'Moisture stress during silking and tasseling causes poor cob pollination'
    ],
    soilManagementTips: [
      'Plant on ridges and furrows to facilitate both drainage during rain and furrow irrigation',
      'Apply nitrogen in three splits: 25% at planting, 50% at knee-high, 25% at tasseling',
      'Ensure adequate organic matter to maintain loose root penetration'
    ],
    sourceReference: 'FAO Ecocrop 2154 / ICAR-IIMR Ludhiana'
  },
  {
    id: 'pearl_millet',
    name: 'Pearl Millet (Bajra)',
    scientificName: 'Pennisetum glaucum',
    category: 'Cereals',
    emoji: '🌾',
    description: 'Extremely drought-resilient and heat-tolerant dryland cereal suited for sandy, low-fertility arid to semi-arid regions.',
    suitableSeasons: ['Kharif', 'Zaid'],
    compatibleSoils: ['Sandy', 'Red', 'Loamy', 'Black'],
    phRange: { minTolerable: 5.2, minIdeal: 6.5, maxIdeal: 7.8, maxTolerable: 8.5 },
    temperatureRange: { minTolerable: 20, minIdeal: 28, maxIdeal: 38, maxTolerable: 45 },
    rainfallRange: { minTolerable: 250, minIdeal: 350, maxIdeal: 650, maxTolerable: 950 },
    humidityRange: { minTolerable: 25, minIdeal: 40, maxIdeal: 65, maxTolerable: 80 },
    nitrogenRange: { min: 35, max: 65 },
    phosphorusRange: { min: 15, max: 35 },
    potassiumRange: { min: 15, max: 35 },
    waterRequirement: 'Low',
    typicalDurationDays: '75 - 90 days',
    averageYield: '2.0 - 3.5 t/ha',
    marketValue: 'Medium',
    keyBenefits: [
      'Can produce grain and stover under harsh low rainfall (300-450 mm) where other crops fail',
      'Rich in iron, zinc, and dietary fiber (Nutri-cereal designation)',
      'Low chemical fertilizer and pesticide requirement saves input costs'
    ],
    limitingFactorsAndRisks: [
      'Grain mold and ergot risk if heavy rains coincide with flowering/harvest',
      'Lower commercial market liquidity compared to wheat and paddy',
      'Poor seed emergence if heavy rains cause crusting over sandy soils'
    ],
    soilManagementTips: [
      'Adopt conservation furrow system between pairs of rows for in-situ moisture retention',
      'Seed treatment with bio-fertilizers (Azospirillum and PSB) at 25 g/kg seed',
      'Maintain adequate plant population without over-crowding to conserve soil moisture'
    ],
    sourceReference: 'ICRISAT Dryland Millets / ICAR-AICRP Pearl Millet'
  },
  {
    id: 'sorghum',
    name: 'Sorghum (Jowar)',
    scientificName: 'Sorghum bicolor',
    category: 'Cereals',
    emoji: '🌾',
    description: 'Dual-purpose dryland champion providing human food and sweet nutritious cattle fodder in semi-arid tropical soils.',
    suitableSeasons: ['Kharif', 'Rabi'],
    compatibleSoils: ['Black', 'Loamy', 'Clayey', 'Red'],
    phRange: { minTolerable: 5.5, minIdeal: 6.2, maxIdeal: 7.8, maxTolerable: 8.5 },
    temperatureRange: { minTolerable: 18, minIdeal: 25, maxIdeal: 35, maxTolerable: 42 },
    rainfallRange: { minTolerable: 350, minIdeal: 450, maxIdeal: 800, maxTolerable: 1200 },
    humidityRange: { minTolerable: 30, minIdeal: 45, maxIdeal: 70, maxTolerable: 85 },
    nitrogenRange: { min: 50, max: 85 },
    phosphorusRange: { min: 25, max: 45 },
    potassiumRange: { min: 25, max: 45 },
    waterRequirement: 'Low',
    typicalDurationDays: '100 - 120 days',
    averageYield: '2.2 - 4.2 t/ha',
    marketValue: 'Medium',
    keyBenefits: [
      'Deep rooting system extracts residual moisture from deep black vertisols',
      'Can survive temporary drought dormancy and resume growth when rains return',
      'High biomass production for livestock feed'
    ],
    limitingFactorsAndRisks: [
      'Shoot fly attack during first 30 days after germination requires early preventive sowing',
      'Striga parasitic weed infestation in degraded soils',
      'Young green shoots contain toxic hydrocyanic acid (Dhurrin) before 50% flowering'
    ],
    soilManagementTips: [
      'Deep summer ploughing to eradicate perennial weeds and conserve monsoon moisture',
      'Intercrop with pigeon pea (2:1 or 3:1 ratio) for improved soil nitrogen and insurance',
      'Apply organic farmyard manure at 5-10 t/ha before sowing'
    ],
    sourceReference: 'ICAR-IIMR Hyderabad / FAO Ecocrop 1980'
  },
  {
    id: 'barley',
    name: 'Barley',
    scientificName: 'Hordeum vulgare',
    category: 'Cereals',
    emoji: '🌾',
    description: 'Tolerant cereal crop with superior salinity, drought, and alkalinity tolerance compared to wheat.',
    suitableSeasons: ['Rabi'],
    compatibleSoils: ['Loamy', 'Sandy', 'Alluvial', 'Clayey'],
    phRange: { minTolerable: 6.0, minIdeal: 6.5, maxIdeal: 8.2, maxTolerable: 9.0 },
    temperatureRange: { minTolerable: 8, minIdeal: 14, maxIdeal: 22, maxTolerable: 30 },
    rainfallRange: { minTolerable: 200, minIdeal: 350, maxIdeal: 600, maxTolerable: 900 },
    humidityRange: { minTolerable: 35, minIdeal: 45, maxIdeal: 65, maxTolerable: 80 },
    nitrogenRange: { min: 50, max: 80 },
    phosphorusRange: { min: 25, max: 45 },
    potassiumRange: { min: 20, max: 40 },
    waterRequirement: 'Low',
    typicalDurationDays: '110 - 130 days',
    averageYield: '3.0 - 4.5 t/ha',
    marketValue: 'Medium',
    keyBenefits: [
      'Highest tolerance to soil salinity (EC up to 8 dS/m) among winter cereals',
      'Premium pricing for two-row malting grade varieties for brewing industry',
      'Low irrigation requirement (2-3 irrigations total)'
    ],
    limitingFactorsAndRisks: [
      'Very acidic soils (pH < 6.0) cause acute aluminum toxicity',
      'Lodging risk if excessive nitrogen fertilizer is applied',
      'Moisture stress during flag leaf stage reduces grain number'
    ],
    soilManagementTips: [
      'Avoid excessive nitrogen to prevent lodging and maintain low grain protein for malting',
      'Gypsum application recommended on sodic/alkaline soils',
      'Timely sowing in November to capture cool winter vegetative window'
    ],
    sourceReference: 'ICAR-IIWBR / FAO Ecocrop 1238'
  },
  {
    id: 'finger_millet',
    name: 'Finger Millet (Ragi)',
    scientificName: 'Eleusine coracana',
    category: 'Cereals',
    emoji: '🌾',
    description: 'Hardy small millet famous for very high calcium content and long seed shelf life without insect damage.',
    suitableSeasons: ['Kharif', 'Rabi'],
    compatibleSoils: ['Red', 'Laterite', 'Loamy', 'Sandy'],
    phRange: { minTolerable: 5.0, minIdeal: 5.5, maxIdeal: 7.2, maxTolerable: 8.2 },
    temperatureRange: { minTolerable: 18, minIdeal: 22, maxIdeal: 32, maxTolerable: 38 },
    rainfallRange: { minTolerable: 400, minIdeal: 550, maxIdeal: 950, maxTolerable: 1400 },
    humidityRange: { minTolerable: 40, minIdeal: 55, maxIdeal: 75, maxTolerable: 90 },
    nitrogenRange: { min: 40, max: 70 },
    phosphorusRange: { min: 20, max: 40 },
    potassiumRange: { min: 20, max: 40 },
    waterRequirement: 'Low',
    typicalDurationDays: '95 - 120 days',
    averageYield: '2.0 - 3.8 t/ha',
    marketValue: 'Medium',
    keyBenefits: [
      'Highest calcium content (344 mg/100g) among all cereals',
      'Excellent performance in acidic red and lateritic hill soils',
      'Grains can be stored for 5+ years without pesticide protection'
    ],
    limitingFactorsAndRisks: [
      'Blast disease (Magnaporthe grisea) during cloudy damp spells',
      'Very tiny seeds require fine seedbed preparation for uniform germination',
      'Labor-intensive manual harvesting if smallholder equipment unavailable'
    ],
    soilManagementTips: [
      'Prepare a very fine firm seedbed and broadcast or drill seeds shallowly (1-2 cm)',
      'Apply lime (1-2 t/ha) if cultivating in strongly acidic laterite soils (pH < 5.0)',
      'Transplanting 20-day old seedlings improves yield significantly over direct seeding'
    ],
    sourceReference: 'ICAR-AICRP Small Millets'
  },
  {
    id: 'chickpea',
    name: 'Chickpea (Gram)',
    scientificName: 'Cicer arietinum',
    category: 'Pulses',
    emoji: '🫘',
    description: 'Major cool-season pulse crop that fixes atmospheric nitrogen, restoring soil fertility while producing protein-rich grain.',
    suitableSeasons: ['Rabi'],
    compatibleSoils: ['Loamy', 'Black', 'Alluvial', 'Clayey'],
    phRange: { minTolerable: 6.0, minIdeal: 6.5, maxIdeal: 7.8, maxTolerable: 8.6 },
    temperatureRange: { minTolerable: 12, minIdeal: 18, maxIdeal: 26, maxTolerable: 32 },
    rainfallRange: { minTolerable: 250, minIdeal: 350, maxIdeal: 600, maxTolerable: 850 },
    humidityRange: { minTolerable: 30, minIdeal: 40, maxIdeal: 60, maxTolerable: 75 },
    nitrogenRange: { min: 15, max: 30 }, // low N because of Rhizobium
    phosphorusRange: { min: 40, max: 65 },
    potassiumRange: { min: 20, max: 40 },
    waterRequirement: 'Low',
    typicalDurationDays: '95 - 125 days',
    averageYield: '1.5 - 2.8 t/ha',
    marketValue: 'High',
    keyBenefits: [
      'Fixes 40-70 kg/ha atmospheric nitrogen through Rhizobium leguminosarum symbiosis',
      'Low nitrogen fertilizer requirement saves farm budget',
      'High protein (20-22%) and commanding market prices'
    ],
    limitingFactorsAndRisks: [
      'Extremely susceptible to Fusarium wilt and root rot in waterlogged soils',
      'Pod borer (Helicoverpa armigera) causes devastating yield loss if uncontrolled',
      'Frost injury during pod-setting stage'
    ],
    soilManagementTips: [
      'Inoculate seeds with Mesorhizobium ciceri and Trichoderma viride culture before sowing',
      'Strictly avoid over-irrigation; 1 or 2 light irrigations at pre-flowering and pod development',
      'Apply single superphosphate (SSP) to deliver both required phosphorus and sulfur'
    ],
    sourceReference: 'ICAR-IIPR Kanpur / FAO Ecocrop 755'
  },
  {
    id: 'pigeon_pea',
    name: 'Pigeon Pea (Tur/Arhar)',
    scientificName: 'Cajanus cajan',
    category: 'Pulses',
    emoji: '🫘',
    description: 'Deep-rooted perennial/semi-perennial legume that breaks plow pans, fixes nitrogen, and provides premium dhal pulse.',
    suitableSeasons: ['Kharif', 'Whole Year'],
    compatibleSoils: ['Black', 'Loamy', 'Red', 'Alluvial'],
    phRange: { minTolerable: 5.5, minIdeal: 6.2, maxIdeal: 7.5, maxTolerable: 8.2 },
    temperatureRange: { minTolerable: 18, minIdeal: 24, maxIdeal: 34, maxTolerable: 40 },
    rainfallRange: { minTolerable: 450, minIdeal: 600, maxIdeal: 950, maxTolerable: 1400 },
    humidityRange: { minTolerable: 40, minIdeal: 55, maxIdeal: 75, maxTolerable: 85 },
    nitrogenRange: { min: 20, max: 35 },
    phosphorusRange: { min: 45, max: 70 },
    potassiumRange: { min: 20, max: 40 },
    waterRequirement: 'Moderate',
    typicalDurationDays: '140 - 180 days',
    averageYield: '1.5 - 2.6 t/ha',
    marketValue: 'High',
    keyBenefits: [
      'Deep taproot (up to 2 meters) recycles nutrients and opens subsoil compaction',
      'Essential source of protein in vegetarian diets with premium market price stability',
      'Excellent intercropping partner for cotton, soybean, and pearl millet'
    ],
    limitingFactorsAndRisks: [
      'Sterility mosaic disease and Phytophthora stem blight in humid stagnant fields',
      'Long maturity duration blocks subsequent winter crop in some varieties',
      'Intolerant to soil waterlogging lasting more than 48 hours'
    ],
    soilManagementTips: [
      'Ridge planting strongly advised to avoid collar rot in heavy black or clay soils',
      'Seed treatment with Rhizobium and PSB biofertilizer',
      'Nip terminal shoots at 45-50 days to encourage profuse lateral branching'
    ],
    sourceReference: 'ICAR-IIPR / ICRISAT Pulse Division'
  },
  {
    id: 'lentil',
    name: 'Lentil (Masoor)',
    scientificName: 'Lens culinaris',
    category: 'Pulses',
    emoji: '🫘',
    description: 'Hardy cool-season pulse crop that tolerates low temperatures and moisture stress better than most legumes.',
    suitableSeasons: ['Rabi'],
    compatibleSoils: ['Loamy', 'Alluvial', 'Clayey', 'Silt'],
    phRange: { minTolerable: 5.5, minIdeal: 6.0, maxIdeal: 7.5, maxTolerable: 8.2 },
    temperatureRange: { minTolerable: 8, minIdeal: 15, maxIdeal: 24, maxTolerable: 30 },
    rainfallRange: { minTolerable: 200, minIdeal: 300, maxIdeal: 550, maxTolerable: 800 },
    humidityRange: { minTolerable: 35, minIdeal: 45, maxIdeal: 65, maxTolerable: 80 },
    nitrogenRange: { min: 15, max: 25 },
    phosphorusRange: { min: 35, max: 60 },
    potassiumRange: { min: 15, max: 35 },
    waterRequirement: 'Low',
    typicalDurationDays: '100 - 120 days',
    averageYield: '1.2 - 2.2 t/ha',
    marketValue: 'High',
    keyBenefits: [
      'Can be cultivated as a catch crop or paira/utera crop in standing rice fallows',
      'Rapid cooking time and high iron/protein bioavailability',
      'Enhances soil nitrogen reserves for the succeeding Kharif crop'
    ],
    limitingFactorsAndRisks: [
      'Rust and wilt disease under waterlogged or foggy high-humidity conditions',
      'Slow early growth makes it uncompetitive against broadleaved winter weeds',
      'Yield decreases sharply if hot winds arrive early in March'
    ],
    soilManagementTips: [
      'Use zero-tillage or relay sowing into standing rice stubble to retain moisture',
      'Pre-emergence pendimethalin application controls early weed competition',
      'Foliar spray of 2% DAP at pre-flowering boosts pod set'
    ],
    sourceReference: 'ICAR-IIPR Kanpur / ICARDA'
  },
  {
    id: 'blackgram',
    name: 'Blackgram (Urad)',
    scientificName: 'Vigna mungo',
    category: 'Pulses',
    emoji: '🫘',
    description: 'Fast-growing warm-season pulse used extensively for staple dishes, papads, and green manuring.',
    suitableSeasons: ['Kharif', 'Zaid'],
    compatibleSoils: ['Loamy', 'Black', 'Alluvial', 'Red'],
    phRange: { minTolerable: 5.8, minIdeal: 6.2, maxIdeal: 7.5, maxTolerable: 8.0 },
    temperatureRange: { minTolerable: 20, minIdeal: 25, maxIdeal: 35, maxTolerable: 40 },
    rainfallRange: { minTolerable: 400, minIdeal: 550, maxIdeal: 800, maxTolerable: 1100 },
    humidityRange: { minTolerable: 50, minIdeal: 65, maxIdeal: 85, maxTolerable: 95 },
    nitrogenRange: { min: 15, max: 30 },
    phosphorusRange: { min: 35, max: 55 },
    potassiumRange: { min: 15, max: 30 },
    waterRequirement: 'Low',
    typicalDurationDays: '70 - 85 days',
    averageYield: '0.9 - 1.6 t/ha',
    marketValue: 'High',
    keyBenefits: [
      'Short maturity duration (70-85 days) makes it ideal for intercropping or catch cropping',
      'Excellent canopy cover suppresses weeds and prevents soil erosion during rains',
      'High market demand across domestic pulse processing industries'
    ],
    limitingFactorsAndRisks: [
      'Yellow Mosaic Virus (MYMV) transmitted by whitefly causes severe damage',
      'Heavy continuous rains at maturity cause seed sprouting inside pods',
      'Sensitive to salinity and saline irrigation water'
    ],
    soilManagementTips: [
      'Select MYMV-resistant varieties (e.g. Uttara, Pant U-31)',
      'Seed treatment with imidacloprid to protect seedlings against whitefly vectors',
      'Provide ridge and furrow drainage to prevent water stagnation'
    ],
    sourceReference: 'ICAR-IIPR / Agricultural Compendium'
  },
  {
    id: 'cotton',
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    category: 'Cash Crops',
    emoji: '🧶',
    description: 'The "White Gold" commercial fiber crop that thrives in deep moisture-retentive black vertisols and warm climates.',
    suitableSeasons: ['Kharif'],
    compatibleSoils: ['Black', 'Alluvial', 'Red', 'Loamy'],
    phRange: { minTolerable: 6.0, minIdeal: 6.5, maxIdeal: 8.0, maxTolerable: 8.5 },
    temperatureRange: { minTolerable: 20, minIdeal: 25, maxIdeal: 34, maxTolerable: 42 },
    rainfallRange: { minTolerable: 500, minIdeal: 650, maxIdeal: 1000, maxTolerable: 1400 },
    humidityRange: { minTolerable: 45, minIdeal: 60, maxIdeal: 80, maxTolerable: 90 },
    nitrogenRange: { min: 75, max: 120 },
    phosphorusRange: { min: 35, max: 60 },
    potassiumRange: { min: 40, max: 75 },
    waterRequirement: 'Moderate',
    typicalDurationDays: '150 - 180 days',
    averageYield: '2.0 - 3.5 t/ha (seed cotton)',
    marketValue: 'High',
    keyBenefits: [
      'High cash return with well-organized global and domestic textile market linkages',
      'Deep taproot utilizes subsoil nutrients and residual vertisol moisture',
      'Cottonseed cake byproduct is a prized high-protein cattle feed'
    ],
    limitingFactorsAndRisks: [
      'Pink Bollworm and sucking pest complex (aphids, jassids, thrips) escalate management cost',
      'Rainfall during boll opening stains lint, drastically reducing commercial grade',
      'Excessive nitrogen induces luxuriant vegetative growth at the expense of fruiting bolls'
    ],
    soilManagementTips: [
      'Deep summer plowing and maintain optimal plant spacing (90x60 cm or 120x45 cm)',
      'Split nitrogen into 3-4 stages with foliar magnesium and boron spray during square formation',
      'Drip irrigation with fertigation increases water use efficiency by 40%'
    ],
    sourceReference: 'ICAR-CICR Nagpur / FAO Ecocrop 1133'
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    scientificName: 'Saccharum officinarum',
    category: 'Cash Crops',
    emoji: '🎋',
    description: 'Long-duration heavy industrial cash crop requiring rich fertile soils, perennial warm sunshine, and assured irrigation.',
    suitableSeasons: ['Whole Year', 'Kharif', 'Rabi'],
    compatibleSoils: ['Loamy', 'Clayey', 'Alluvial', 'Black'],
    phRange: { minTolerable: 5.5, minIdeal: 6.2, maxIdeal: 7.5, maxTolerable: 8.5 },
    temperatureRange: { minTolerable: 18, minIdeal: 25, maxIdeal: 35, maxTolerable: 42 },
    rainfallRange: { minTolerable: 1000, minIdeal: 1400, maxIdeal: 2200, maxTolerable: 3000 },
    humidityRange: { minTolerable: 55, minIdeal: 70, maxIdeal: 85, maxTolerable: 95 },
    nitrogenRange: { min: 140, max: 250 },
    phosphorusRange: { min: 60, max: 100 },
    potassiumRange: { min: 80, max: 150 },
    waterRequirement: 'Very High',
    typicalDurationDays: '300 - 365 days',
    averageYield: '70 - 115 t/ha',
    marketValue: 'High',
    keyBenefits: [
      'Substantial gross income per hectare with direct sugar mill purchase agreements',
      'Multiple ratoon crops (1-2 ratoons) can be harvested without re-planting seeds',
      'Bagasse, molasses, and press mud provide renewable energy, ethanol, and bio-fertilizer'
    ],
    limitingFactorsAndRisks: [
      'Extremely high water footprint; unsustainable in groundwater-depleted regions without drip',
      'Requires year-long land occupation, preventing seasonal multi-cropping',
      'Red rot disease (Colletotrichum falcatum) can wipe out entire plantations'
    ],
    soilManagementTips: [
      'Adopt Sustainable Sugarcane Initiative (SSI) with single bud chips and drip fertigation',
      'Trash mulching in ratoon crops reduces evaporation and suppresses weeds',
      'Apply press mud or compost at 15-20 t/ha to sustain intensive nutrient extraction'
    ],
    sourceReference: 'ICAR-IISR Lucknow / FAO Ecocrop 1928'
  },
  {
    id: 'jute',
    name: 'Jute',
    scientificName: 'Corchorus olitorius',
    category: 'Cash Crops',
    emoji: '🌾',
    description: 'The golden biodegradable natural fiber crop thriving in warm, humid alluvial river basins of eastern deltaic belts.',
    suitableSeasons: ['Zaid', 'Kharif'],
    compatibleSoils: ['Alluvial', 'Clayey', 'Loamy', 'Silt'],
    phRange: { minTolerable: 5.5, minIdeal: 6.2, maxIdeal: 7.2, maxTolerable: 7.8 },
    temperatureRange: { minTolerable: 22, minIdeal: 26, maxIdeal: 34, maxTolerable: 39 },
    rainfallRange: { minTolerable: 1100, minIdeal: 1400, maxIdeal: 2000, maxTolerable: 2800 },
    humidityRange: { minTolerable: 70, minIdeal: 80, maxIdeal: 95, maxTolerable: 100 },
    nitrogenRange: { min: 50, max: 80 },
    phosphorusRange: { min: 25, max: 45 },
    potassiumRange: { min: 35, max: 60 },
    waterRequirement: 'High',
    typicalDurationDays: '110 - 130 days',
    averageYield: '2.5 - 3.8 t/ha (fiber)',
    marketValue: 'Medium',
    keyBenefits: [
      'High international demand for eco-friendly packaging and geo-textiles',
      'Leaves 10-12 t/ha of organic plant residues and leaf-fall, restoring soil fertility',
      'Excellent precursor crop to Aman Kharif paddy'
    ],
    limitingFactorsAndRisks: [
      'Requires slow-moving fresh water bodies for microbial retting to extract clean fiber',
      'Inundation in early vegetative stages before plants reach 1 meter height kills crop',
      'Stem rot and semilooper pest attacks under humid overcast weather'
    ],
    soilManagementTips: [
      'Ensure soil has sufficient potassium to enhance fiber tensile strength and resist lodging',
      'Sow with seed drill to maintain uniform plant density and suppress basal weed competition',
      'Harvest at 50% flowering stage for optimum balance between fiber yield and softness'
    ],
    sourceReference: 'ICAR-CRIJAF Barrackpore / FAO Ecocrop 818'
  },
  {
    id: 'groundnut',
    name: 'Groundnut (Peanut)',
    scientificName: 'Arachis hypogaea',
    category: 'Oilseeds',
    emoji: '🥜',
    description: 'Major edible oilseed and protein food crop that requires loose, friable sandy loam to allow peg penetration into the soil.',
    suitableSeasons: ['Kharif', 'Rabi', 'Zaid'],
    compatibleSoils: ['Sandy', 'Loamy', 'Red', 'Alluvial'],
    phRange: { minTolerable: 5.5, minIdeal: 6.0, maxIdeal: 7.0, maxTolerable: 8.0 },
    temperatureRange: { minTolerable: 20, minIdeal: 25, maxIdeal: 32, maxTolerable: 38 },
    rainfallRange: { minTolerable: 400, minIdeal: 550, maxIdeal: 850, maxTolerable: 1250 },
    humidityRange: { minTolerable: 45, minIdeal: 55, maxIdeal: 75, maxTolerable: 85 },
    nitrogenRange: { min: 20, max: 40 },
    phosphorusRange: { min: 40, max: 60 },
    potassiumRange: { min: 35, max: 55 },
    waterRequirement: 'Moderate',
    typicalDurationDays: '105 - 130 days',
    averageYield: '2.0 - 3.4 t/ha',
    marketValue: 'High',
    keyBenefits: [
      'Dual economic stream: high-grade edible oil (45-50%) and nutritious protein-dense kernels',
      'Symbiotic nitrogen fixation enriches soil nitrogen bank for subsequent crops',
      'Haulms provide high-value green and dry livestock fodder'
    ],
    limitingFactorsAndRisks: [
      'Heavy clay soils cause pod loss during harvesting due to soil compaction',
      'Aflatoxin contamination (Aspergillus flavus) if end-season drought or wet storage occurs',
      'Calcium deficiency leads to empty "pops" (pods without developed kernels)'
    ],
    soilManagementTips: [
      'Crucial: Apply gypsum (200-400 kg/ha) at flowering/pegging to provide calcium for pod fill',
      'Maintain friable loose topsoil through light intercultivation before peg entry',
      'Avoid hard crusting soils that prevent pegs from entering ground'
    ],
    sourceReference: 'ICAR-DGR Junagadh / ICRISAT Oilseeds'
  },
  {
    id: 'mustard',
    name: 'Mustard (Rapeseed)',
    scientificName: 'Brassica juncea',
    category: 'Oilseeds',
    emoji: '🌼',
    description: 'Leading winter oilseed with bright yellow flowers, low water requirement, and high response to sulfur nutrition.',
    suitableSeasons: ['Rabi'],
    compatibleSoils: ['Loamy', 'Alluvial', 'Sandy', 'Clayey'],
    phRange: { minTolerable: 5.5, minIdeal: 6.2, maxIdeal: 7.5, maxTolerable: 8.5 },
    temperatureRange: { minTolerable: 10, minIdeal: 15, maxIdeal: 25, maxTolerable: 32 },
    rainfallRange: { minTolerable: 200, minIdeal: 300, maxIdeal: 550, maxTolerable: 800 },
    humidityRange: { minTolerable: 35, minIdeal: 45, maxIdeal: 65, maxTolerable: 80 },
    nitrogenRange: { min: 60, max: 95 },
    phosphorusRange: { min: 30, max: 50 },
    potassiumRange: { min: 25, max: 45 },
    waterRequirement: 'Low',
    typicalDurationDays: '105 - 130 days',
    averageYield: '1.6 - 2.8 t/ha',
    marketValue: 'High',
    keyBenefits: [
      'High oil content (38-42%) with strong domestic demand for pungent culinary cooking oil',
      'Thrives with just 2-3 irrigations or even under conserved rainfed moisture',
      'Excellent companion intercrop with wheat, chickpea, and potato'
    ],
    limitingFactorsAndRisks: [
      'Aphid outbreak (Lipaphis erysimi) during cloudy weather can destroy siliques',
      'White rust and Alternaria blight under cold humid morning conditions',
      'Frost vulnerability during flowering and pod development'
    ],
    soilManagementTips: [
      'Mandatory: Apply 20-30 kg/ha elemental sulfur or gypsum to elevate oil concentration',
      'Timely sowing in October avoids peak mustard aphid infestation period',
      'Irrigate at flowering and siliquae formation stages'
    ],
    sourceReference: 'ICAR-DRMR Bharatpur / FAO Ecocrop 587'
  },
  {
    id: 'soybean',
    name: 'Soybean',
    scientificName: 'Glycine max',
    category: 'Oilseeds',
    emoji: '🫘',
    description: 'The "Miracle Bean" rich in protein (40%) and oil (20%), dominating black vertisol tracts of central rainfed regions.',
    suitableSeasons: ['Kharif'],
    compatibleSoils: ['Black', 'Loamy', 'Alluvial', 'Clayey'],
    phRange: { minTolerable: 5.8, minIdeal: 6.3, maxIdeal: 7.5, maxTolerable: 8.2 },
    temperatureRange: { minTolerable: 20, minIdeal: 24, maxIdeal: 32, maxTolerable: 38 },
    rainfallRange: { minTolerable: 550, minIdeal: 700, maxIdeal: 1050, maxTolerable: 1450 },
    humidityRange: { minTolerable: 55, minIdeal: 65, maxIdeal: 80, maxTolerable: 90 },
    nitrogenRange: { min: 25, max: 40 }, // fixes N
    phosphorusRange: { min: 50, max: 75 },
    potassiumRange: { min: 35, max: 55 },
    waterRequirement: 'Moderate',
    typicalDurationDays: '90 - 110 days',
    averageYield: '1.8 - 3.0 t/ha',
    marketValue: 'High',
    keyBenefits: [
      'High protein-to-oil combination drives immense feed meal and solvent extraction demand',
      'Fixes 60-100 kg/ha atmospheric nitrogen through Bradyrhizobium japonicum',
      'Provides quick cash returns within 90-100 days, leaving land open for timely Rabi wheat'
    ],
    limitingFactorsAndRisks: [
      'Girdle beetle and tobacco caterpillar infestations can devastate early canopy',
      'Extreme sensitivity to moisture stress at flowering and pod filling',
      'Poor seed longevity; viability degrades rapidly if stored in warm humid conditions'
    ],
    soilManagementTips: [
      'Broad bed furrow (BBF) or ridge-furrow planting prevents waterlogging in black soils',
      'Seed inoculation with Bradyrhizobium japonicum and PSB bio-fertilizers is essential',
      'Apply single superphosphate (SSP) to satisfy high phosphorus and sulfur requirements'
    ],
    sourceReference: 'ICAR-IISR Indore / FAO Ecocrop 1121'
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    scientificName: 'Helianthus annuus',
    category: 'Oilseeds',
    emoji: '🌻',
    description: 'Photo-insensitive oilseed crop with premium polyunsaturated fatty acids, capable of fitting into diverse crop sequences.',
    suitableSeasons: ['Kharif', 'Rabi', 'Zaid'],
    compatibleSoils: ['Black', 'Loamy', 'Alluvial', 'Red'],
    phRange: { minTolerable: 6.0, minIdeal: 6.5, maxIdeal: 7.8, maxTolerable: 8.5 },
    temperatureRange: { minTolerable: 16, minIdeal: 22, maxIdeal: 30, maxTolerable: 38 },
    rainfallRange: { minTolerable: 400, minIdeal: 550, maxIdeal: 850, maxTolerable: 1200 },
    humidityRange: { minTolerable: 40, minIdeal: 50, maxIdeal: 70, maxTolerable: 85 },
    nitrogenRange: { min: 55, max: 85 },
    phosphorusRange: { min: 40, max: 65 },
    potassiumRange: { min: 35, max: 55 },
    waterRequirement: 'Moderate',
    typicalDurationDays: '85 - 105 days',
    averageYield: '1.5 - 2.5 t/ha',
    marketValue: 'High',
    keyBenefits: [
      'Day-neutral photoperiod response allows year-round flexible sowing',
      'Produces light, heart-healthy cooking oil high in linoleic acid',
      'Deep root system scavenges moisture and nutrients left behind by shallow crops'
    ],
    limitingFactorsAndRisks: [
      'Poor seed filling and hollow seeds in center of capitulum if bee pollination is deficient',
      'Parrot and bird damage during seed maturity stages requires active scaring',
      'Alternaria leaf blight in humid warm microclimates'
    ],
    soilManagementTips: [
      'Foliar spray of 0.2% Borax at capitulum emergence ensures complete seed setting',
      'Keep 4-5 beehives per hectare or practice hand pollination during morning hours (7-11 AM)',
      'Maintain adequate spacing (60x30 cm) for well-developed flower heads'
    ],
    sourceReference: 'ICAR-IIOR Hyderabad / FAO Ecocrop 1184'
  },
  {
    id: 'tea',
    name: 'Tea',
    scientificName: 'Camellia sinensis',
    category: 'Fruits & Plantation',
    emoji: '🍵',
    description: 'Perennial plantation crop thriving in warm, humid subtropical hill slopes with well-drained, acidic soils.',
    suitableSeasons: ['Whole Year'],
    compatibleSoils: ['Laterite', 'Red', 'Loamy'],
    phRange: { minTolerable: 4.2, minIdeal: 4.8, maxIdeal: 5.6, maxTolerable: 6.0 },
    temperatureRange: { minTolerable: 14, minIdeal: 20, maxIdeal: 28, maxTolerable: 35 },
    rainfallRange: { minTolerable: 1400, minIdeal: 1800, maxIdeal: 2800, maxTolerable: 4000 },
    humidityRange: { minTolerable: 70, minIdeal: 80, maxIdeal: 95, maxTolerable: 100 },
    nitrogenRange: { min: 90, max: 150 },
    phosphorusRange: { min: 30, max: 60 },
    potassiumRange: { min: 70, max: 130 },
    waterRequirement: 'High',
    typicalDurationDays: 'Perennial (harvest 8-9 months/yr)',
    averageYield: '1.8 - 3.2 t/ha (made tea)',
    marketValue: 'Very High',
    keyBenefits: [
      'High-value cash generation with sustained export and premium domestic brand consumption',
      'Decades of productive harvest life once bushes mature',
      'Protects sloped hillsides against soil erosion via dense evergreen canopy'
    ],
    limitingFactorsAndRisks: [
      'Completely intolerant to neutral or alkaline soils (pH > 6.0 causes severe chlorosis)',
      'Water stagnation causes instantaneous root asphyxiation; slopes are mandatory',
      'Red spider mite and tea mosquito bug attacks reduce tender flush quality'
    ],
    soilManagementTips: [
      'Strictly avoid lime; aluminum and iron availability in acidic soil is necessary for tea',
      'Plant along contour lines on hill gradients with shade trees (e.g. Albizia lebbeck)',
      'Maintain deep organic mulching to preserve acidity and suppress hill weeds'
    ],
    sourceReference: 'Tea Board of India / UPASI Tea Research Institute / FAO 621'
  },
  {
    id: 'coffee',
    name: 'Coffee (Arabica & Robusta)',
    scientificName: 'Coffea arabica',
    category: 'Fruits & Plantation',
    emoji: '☕',
    description: 'Shade-loving perennial beverage crop cultivated under two-tier forest canopy in elevated tropical hill regions.',
    suitableSeasons: ['Whole Year'],
    compatibleSoils: ['Red', 'Laterite', 'Loamy'],
    phRange: { minTolerable: 5.0, minIdeal: 5.5, maxIdeal: 6.5, maxTolerable: 7.0 },
    temperatureRange: { minTolerable: 15, minIdeal: 20, maxIdeal: 28, maxTolerable: 34 },
    rainfallRange: { minTolerable: 1200, minIdeal: 1500, maxIdeal: 2400, maxTolerable: 3200 },
    humidityRange: { minTolerable: 65, minIdeal: 75, maxIdeal: 90, maxTolerable: 95 },
    nitrogenRange: { min: 80, max: 130 },
    phosphorusRange: { min: 40, max: 70 },
    potassiumRange: { min: 75, max: 140 },
    waterRequirement: 'High',
    typicalDurationDays: 'Perennial (annual bean harvest)',
    averageYield: '0.9 - 1.8 t/ha (clean coffee)',
    marketValue: 'Very High',
    keyBenefits: [
      'Premium export commodity with strong international futures trading value',
      'Eco-friendly agroforestry system sustains biodiversity and forest canopy',
      'Intercropping with black pepper, cardamom, and citrus boosts secondary revenue'
    ],
    limitingFactorsAndRisks: [
      'Coffee White Stem Borer (Xylotrechus quadripes) bores woody trunks, destroying plants',
      'Coffee Leaf Rust (Hemileia vastatrix) during prolonged overcast monsoons',
      'Requires blossom showers (25-40 mm in March-April) for uniform flowering'
    ],
    soilManagementTips: [
      'Maintain balanced two-tier shade trees to modulate leaf temperature and light intensity',
      'Apply balanced NPK with emphasis on potassium for bean density and cup flavor',
      'Mulch basins with dry weed foliage and coffee pulp compost'
    ],
    sourceReference: 'Central Coffee Research Institute (CCRI) / International Coffee Org'
  },
  {
    id: 'banana',
    name: 'Banana',
    scientificName: 'Musa acuminata',
    category: 'Fruits & Plantation',
    emoji: '🍌',
    description: 'Giant herbaceous fruit crop with heavy nutrient and water demands, producing massive fruit bunches in tropical warmth.',
    suitableSeasons: ['Whole Year', 'Kharif'],
    compatibleSoils: ['Loamy', 'Alluvial', 'Clayey'],
    phRange: { minTolerable: 5.5, minIdeal: 6.5, maxIdeal: 7.5, maxTolerable: 8.2 },
    temperatureRange: { minTolerable: 18, minIdeal: 25, maxIdeal: 34, maxTolerable: 40 },
    rainfallRange: { minTolerable: 1100, minIdeal: 1500, maxIdeal: 2200, maxTolerable: 3000 },
    humidityRange: { minTolerable: 60, minIdeal: 75, maxIdeal: 90, maxTolerable: 98 },
    nitrogenRange: { min: 150, max: 250 },
    phosphorusRange: { min: 50, max: 90 },
    potassiumRange: { min: 180, max: 320 }, // potassium hungry
    waterRequirement: 'Very High',
    typicalDurationDays: '300 - 365 days',
    averageYield: '45 - 85 t/ha',
    marketValue: 'High',
    keyBenefits: [
      'Tremendous fruit tonnage and continuous weekly cash flow in wholesale fruit markets',
      'Tissue culture technology enables disease-free, high-uniformity plantations',
      'High potassium demand matches agricultural fertilizer availability'
    ],
    limitingFactorsAndRisks: [
      'Gale winds or cyclonic storms topple heavy fruiting pseudostems (requires propping)',
      'Panama Wilt (Fusarium oxysporum f. sp. cubense TR4) threat to Cavendish clones',
      'Extremely frost sensitive; temperatures below 10°C cause chilling injury'
    ],
    soilManagementTips: [
      'Implement drip irrigation and fertigation to meet gigantic daily potassium demand',
      'Provide bamboo or nylon rope propping once fruit bunch emerges',
      'Desuckering: remove extra suckers to retain only one mother plant and one follower'
    ],
    sourceReference: 'ICAR-NRCB Tiruchirappalli / FAO Ecocrop 1461'
  },
  {
    id: 'mango',
    name: 'Mango',
    scientificName: 'Mangifera indica',
    category: 'Fruits & Plantation',
    emoji: '🥭',
    description: 'The "King of Fruits" deep-rooted subtropical/tropical tree thriving in well-drained soils with distinct dry spell for flowering.',
    suitableSeasons: ['Whole Year'],
    compatibleSoils: ['Alluvial', 'Loamy', 'Red', 'Laterite'],
    phRange: { minTolerable: 5.5, minIdeal: 6.2, maxIdeal: 7.5, maxTolerable: 8.2 },
    temperatureRange: { minTolerable: 16, minIdeal: 24, maxIdeal: 35, maxTolerable: 44 },
    rainfallRange: { minTolerable: 600, minIdeal: 800, maxIdeal: 1500, maxTolerable: 2200 },
    humidityRange: { minTolerable: 45, minIdeal: 55, maxIdeal: 75, maxTolerable: 88 },
    nitrogenRange: { min: 70, max: 120 },
    phosphorusRange: { min: 35, max: 65 },
    potassiumRange: { min: 65, max: 110 },
    waterRequirement: 'Moderate',
    typicalDurationDays: 'Perennial (fruit harvest in summer)',
    averageYield: '8.0 - 16.0 t/ha (mature orchard)',
    marketValue: 'Very High',
    keyBenefits: [
      'Lucrative export market and domestic premium pricing for top commercial cultivars',
      'Drought hardy once established due to expansive deep taproot system',
      'Intercropping vegetables and pulses possible during first 4-5 orchard years'
    ],
    limitingFactorsAndRisks: [
      'Rainfall or heavy dew during flowering washes away pollen and sparks anthracnose blight',
      'Mango hopper and fruit fly infestations degrade fruit export grade',
      'Alternate bearing habit (on-year vs off-year) in traditional cultivars'
    ],
    soilManagementTips: [
      'Withhold irrigation 2 months prior to flowering to encourage flower bud differentiation',
      'Soil must be well-drained with at least 2 meters soil depth above hard rock pan',
      'Apply paclobutrazol growth regulator to manage vegetative vigor and induce annual flowering'
    ],
    sourceReference: 'ICAR-CISH Lucknow / FAO Ecocrop 1411'
  },
  {
    id: 'potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    category: 'Vegetables & Tubers',
    emoji: '🥔',
    description: 'Short-duration, high-yielding tuber crop requiring cool night temperatures for tuberization and loose, well-aerated sandy loam.',
    suitableSeasons: ['Rabi'],
    compatibleSoils: ['Loamy', 'Sandy', 'Alluvial'],
    phRange: { minTolerable: 5.0, minIdeal: 5.5, maxIdeal: 6.5, maxTolerable: 7.8 },
    temperatureRange: { minTolerable: 10, minIdeal: 16, maxIdeal: 22, maxTolerable: 28 },
    rainfallRange: { minTolerable: 300, minIdeal: 450, maxIdeal: 700, maxTolerable: 1000 },
    humidityRange: { minTolerable: 50, minIdeal: 65, maxIdeal: 80, maxTolerable: 90 },
    nitrogenRange: { min: 120, max: 180 },
    phosphorusRange: { min: 60, max: 100 },
    potassiumRange: { min: 100, max: 160 },
    waterRequirement: 'Moderate',
    typicalDurationDays: '80 - 110 days',
    averageYield: '22 - 38 t/ha',
    marketValue: 'High',
    keyBenefits: [
      'Very high calorie and carbohydrate production per hectare in a brief 90-day window',
      'Huge industrial processing demand (chips, French fries, starch)',
      'Fits neatly into intensive three-crop annual rotations (Paddy-Potato-Sunflower)'
    ],
    limitingFactorsAndRisks: [
      'Night temperatures above 21°C completely stop tuber bulking',
      'Late blight disease (Phytophthora infestans) can destroy foliage in 48 hours under fog',
      'Heavy alkaline soils promote severe potato common scab disease'
    ],
    soilManagementTips: [
      'Earthing-up operation at 30 and 45 days covers tubers to prevent greening from sunlight',
      'Ensure slightly acidic pH (5.5-6.5) to keep common scab disease dormant',
      'Apply balanced potassium sulfate (SOP) instead of MOP for superior crisp processing quality'
    ],
    sourceReference: 'ICAR-CPRI Shimla / FAO Ecocrop 1985'
  },
  {
    id: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetables & Tubers',
    emoji: '🍅',
    description: 'Ubiquitous vegetable that requires warm days, moderate nights, abundant sunlight, and fertile, well-drained loamy soils.',
    suitableSeasons: ['Rabi', 'Kharif', 'Zaid'],
    compatibleSoils: ['Loamy', 'Alluvial', 'Red', 'Sandy'],
    phRange: { minTolerable: 5.5, minIdeal: 6.0, maxIdeal: 7.0, maxTolerable: 8.0 },
    temperatureRange: { minTolerable: 15, minIdeal: 20, maxIdeal: 28, maxTolerable: 35 },
    rainfallRange: { minTolerable: 400, minIdeal: 600, maxIdeal: 900, maxTolerable: 1300 },
    humidityRange: { minTolerable: 45, minIdeal: 60, maxIdeal: 75, maxTolerable: 88 },
    nitrogenRange: { min: 100, max: 150 },
    phosphorusRange: { min: 60, max: 90 },
    potassiumRange: { min: 80, max: 140 },
    waterRequirement: 'Moderate',
    typicalDurationDays: '100 - 135 days',
    averageYield: '30 - 55 t/ha',
    marketValue: 'High',
    keyBenefits: [
      'High economic return with continuous harvests over several weeks',
      'Rich in antioxidant lycopene, vitamin C, and culinary versatility',
      'Adaptable to open field, drip fertigation, and polyhouse protected cultivation'
    ],
    limitingFactorsAndRisks: [
      'Extreme price volatility in agricultural wholesale spot markets',
      'Tomato Leaf Curl Virus (ToLCV) transmitted by whiteflies',
      'Blossom-end rot caused by localized calcium deficiency during dry spells'
    ],
    soilManagementTips: [
      'Stake determinate and indeterminate plants to prevent fruit contact with wet soil',
      'Apply calcium nitrate and boron foliar sprays during fruit setting to prevent blossom-end rot',
      'Mulching with silver-black polyethylene reduces whitefly vectors and saves irrigation'
    ],
    sourceReference: 'ICAR-IIHR Bengaluru / AVRDC World Vegetable Center'
  },
  {
    id: 'onion',
    name: 'Onion',
    scientificName: 'Allium cepa',
    category: 'Vegetables & Tubers',
    emoji: '🧅',
    description: 'Essential bulb vegetable requiring friable, humus-rich soil, cool initial vegetative stage, and warm dry weather for bulb curing.',
    suitableSeasons: ['Rabi', 'Kharif', 'Zaid'],
    compatibleSoils: ['Loamy', 'Alluvial', 'Clayey', 'Red'],
    phRange: { minTolerable: 5.8, minIdeal: 6.2, maxIdeal: 7.2, maxTolerable: 8.0 },
    temperatureRange: { minTolerable: 12, minIdeal: 18, maxIdeal: 28, maxTolerable: 36 },
    rainfallRange: { minTolerable: 350, minIdeal: 500, maxIdeal: 750, maxTolerable: 1050 },
    humidityRange: { minTolerable: 40, minIdeal: 55, maxIdeal: 70, maxTolerable: 85 },
    nitrogenRange: { min: 80, max: 130 },
    phosphorusRange: { min: 40, max: 65 },
    potassiumRange: { min: 50, max: 90 },
    waterRequirement: 'Moderate',
    typicalDurationDays: '110 - 140 days',
    averageYield: '18 - 30 t/ha',
    marketValue: 'High',
    keyBenefits: [
      'High domestic consumption volume with price spikes yielding windfall farmer profit',
      'Rabi onions have good storage longevity (4-6 months in ventilated onion chawls)',
      'High sulfur requirement imparts signature pungency and medicinal properties'
    ],
    limitingFactorsAndRisks: [
      'Purple blotch (Alternaria porri) and thrips infestation during overcast humid periods',
      'Bolting (premature flowering) if young crops face prolonged unexpected cold spells',
      'Very sensitive to water stagnation and saline soils'
    ],
    soilManagementTips: [
      'Apply 30-40 kg/ha sulfur at transplanting to improve bulb firmness and pungency',
      'Stop irrigation 10-15 days before harvest to allow neck fall and bulb skin drying',
      'Transplant sturdy 45-day-old nursery seedlings on raised beds'
    ],
    sourceReference: 'ICAR-DOGR Rajgurunagar / FAO Ecocrop 204'
  },
  {
    id: 'apple',
    name: 'Apple',
    scientificName: 'Malus domestica',
    category: 'Fruits & Plantation',
    emoji: '🍎',
    description: 'Temperate deciduous fruit tree requiring 800-1200 chilling hours (< 7°C) during winter dormancy and well-drained mountain loams.',
    suitableSeasons: ['Whole Year'],
    compatibleSoils: ['Loamy', 'Alluvial', 'Silt'],
    phRange: { minTolerable: 5.5, minIdeal: 6.0, maxIdeal: 6.8, maxTolerable: 7.5 },
    temperatureRange: { minTolerable: -5, minIdeal: 8, maxIdeal: 22, maxTolerable: 30 },
    rainfallRange: { minTolerable: 700, minIdeal: 1000, maxIdeal: 1500, maxTolerable: 2100 },
    humidityRange: { minTolerable: 50, minIdeal: 65, maxIdeal: 80, maxTolerable: 90 },
    nitrogenRange: { min: 60, max: 100 },
    phosphorusRange: { min: 30, max: 55 },
    potassiumRange: { min: 70, max: 120 },
    waterRequirement: 'Moderate',
    typicalDurationDays: 'Perennial (harvest in late summer/autumn)',
    averageYield: '10 - 22 t/ha',
    marketValue: 'Very High',
    keyBenefits: [
      'Premium high-value fruit crop supporting high rural mountain livelihood prosperity',
      'High cold storage stability and nationwide distribution networks',
      'Modern high-density rootstocks (M9, MM106) offer rapid fruiting from Year 3'
    ],
    limitingFactorsAndRisks: [
      'Strict requirement for chilling units; climate warming causes delayed foliation and poor fruit set',
      'Apple scab fungus (Venturia inaequalis) in wet spring seasons',
      'Hailstorm injury during fruit development (requires anti-hail netting)'
    ],
    soilManagementTips: [
      'Deep loamy soils with high organic matter (> 1.5%) on sloping terrain to ensure drainage',
      'Plant pollinizer varieties (e.g. Golden Delicious, Granny Smith) at 20-25% tree proportion',
      'Maintain dormant season pruning and winter tree oil spraying'
    ],
    sourceReference: 'ICAR-CITH Srinagar / FAO Ecocrop 1385'
  },
  {
    id: 'orange',
    name: 'Citrus / Orange',
    scientificName: 'Citrus sinensis',
    category: 'Fruits & Plantation',
    emoji: '🍊',
    description: 'Subtropical fruit tree producing sweet fragrant citrus fruits in well-drained loams with moderate humidity and sunshine.',
    suitableSeasons: ['Whole Year'],
    compatibleSoils: ['Loamy', 'Black', 'Alluvial', 'Red'],
    phRange: { minTolerable: 5.8, minIdeal: 6.5, maxIdeal: 7.5, maxTolerable: 8.3 },
    temperatureRange: { minTolerable: 13, minIdeal: 20, maxIdeal: 32, maxTolerable: 39 },
    rainfallRange: { minTolerable: 600, minIdeal: 850, maxIdeal: 1400, maxTolerable: 1900 },
    humidityRange: { minTolerable: 45, minIdeal: 55, maxIdeal: 75, maxTolerable: 88 },
    nitrogenRange: { min: 80, max: 130 },
    phosphorusRange: { min: 35, max: 60 },
    potassiumRange: { min: 60, max: 110 },
    waterRequirement: 'Moderate',
    typicalDurationDays: 'Perennial (fruit flush twice/year)',
    averageYield: '12 - 24 t/ha',
    marketValue: 'High',
    keyBenefits: [
      'High consumer demand for fresh fruit and fresh juice processing',
      'Can produce two commercial crop flushes (Ambia and Mrig bahar) through water regulation',
      'Deep rooting provides resilience once established'
    ],
    limitingFactorsAndRisks: [
      'Citrus Greening (Huanglongbing) disease spread by Asian citrus psyllid',
      'Extreme sensitivity to root waterlogging and Phytophthora gummosis',
      'Micronutrient deficiencies (zinc, iron, manganese) frequent in alkaline soils'
    ],
    soilManagementTips: [
      'Plant on raised beds or ridges to avoid stagnant water contacting trunk collar',
      'Foliar spray of zinc sulfate, manganese sulfate, and ferrous sulfate twice annually',
      'Stress water induction (bahr treatment) regulates synchrony of flowering'
    ],
    sourceReference: 'ICAR-CCRI Nagpur / FAO Ecocrop 778'
  }
];
