import type { ExampleProfile } from '../types/crop';

export const EXAMPLE_PROFILES: ExampleProfile[] = [
  {
    id: 'gangetic-alluvial',
    title: 'Indo-Gangetic Basin (Kharif Wetland)',
    region: 'Eastern UP / Bihar / West Bengal alluvial plains',
    badge: 'Heavy Monsoon Wetland',
    description: 'Deep alluvial silt-clay soils with high monsoon rainfall and warm, humid conditions during Kharif.',
    expectedTopCrops: ['Rice (Paddy)', 'Sugarcane', 'Jute', 'Maize'],
    expectedSuitabilitySummary: 'Favors water-intensive cereals and industrial fibers due to heavy rainfall (1350 mm), clay-alluvial moisture retention, and high Kharif humidity (82%). Dryland millets are penalized due to excessive waterlogging risk.',
    input: {
      farmerName: 'Rameshwar Yadav',
      farmLocation: 'Varanasi / Patna Basin, Gangetic Plains',
      soilType: 'Alluvial',
      soilPh: 6.8,
      hasNpkData: true,
      nitrogen: 120,
      phosphorus: 50,
      potassium: 55,
      rainfall: 1350,
      temperature: 29,
      humidity: 82,
      season: 'Kharif'
    }
  },
  {
    id: 'deccan-semi-arid',
    title: 'Semi-Arid Deccan Plateau (Drought-Resilient)',
    region: 'Marathwada / North Karnataka / Rajasthan fringe',
    badge: 'Low-Rainfall Dryland',
    description: 'Light sandy-red soils with scarce rainfall, warm sunny temperatures, and low ambient humidity.',
    expectedTopCrops: ['Pearl Millet (Bajra)', 'Sorghum (Jowar)', 'Pigeon Pea (Tur)', 'Groundnut'],
    expectedSuitabilitySummary: 'Nutri-cereals and deep-rooted pulses score highest due to superior drought tolerance and low water footprint (360 mm). Water-hungry crops like Rice and Sugarcane receive strict penalties.',
    input: {
      farmerName: 'Anil Deshmukh',
      farmLocation: 'Solapur / Kalaburagi Rainfed Belt',
      soilType: 'Sandy',
      soilPh: 7.2,
      hasNpkData: true,
      nitrogen: 40,
      phosphorus: 25,
      potassium: 30,
      rainfall: 360,
      temperature: 34,
      humidity: 38,
      season: 'Kharif'
    }
  },
  {
    id: 'northwest-rabi',
    title: 'Northwest Plains (Cool Rabi Irrigated)',
    region: 'Punjab / Haryana / Western UP fertile wheat belt',
    badge: 'Cool Winter Grain',
    description: 'Rich fertile loam with cool winter vegetative window, neutral soil pH, and high fertilizer management.',
    expectedTopCrops: ['Wheat', 'Mustard (Rapeseed)', 'Chickpea (Gram)', 'Barley', 'Potato'],
    expectedSuitabilitySummary: 'Cool winter temperatures (17°C) and neutral fertile loam create ideal conditions for premier Rabi staples (Wheat, Mustard, Chickpea). Tropical Kharif crops are disqualified by the cool season and lower winter rainfall.',
    input: {
      farmerName: 'Gurpreet Singh',
      farmLocation: 'Ludhiana / Karnal Agro-Climatic Zone',
      soilType: 'Loamy',
      soilPh: 7.3,
      hasNpkData: true,
      nitrogen: 135,
      phosphorus: 55,
      potassium: 50,
      rainfall: 220,
      temperature: 17,
      humidity: 62,
      season: 'Rabi'
    }
  },
  {
    id: 'northeast-tea',
    title: 'Subtropical Hill Slopes (Acidic Plantation)',
    region: 'Upper Assam / Nilgiri / Darjeeling tea belts',
    badge: 'Acidic High Rainfall',
    description: 'Strongly acidic lateritic hillside soil with heavy cloud cover, torrential rainfall, and mild temperatures.',
    expectedTopCrops: ['Tea', 'Coffee (Arabica & Robusta)'],
    expectedSuitabilitySummary: 'Tea achieves top rank because of its obligate requirement for acidic soil (pH 4.9) and high rainfall (2200 mm). Common field crops like Wheat, Cotton, and Barley are strongly eliminated due to severe soil acidity and root water saturation.',
    input: {
      farmerName: 'Devika Sharma',
      farmLocation: 'Jorhat / Dibrugarh Hill Foothills',
      soilType: 'Laterite',
      soilPh: 4.9,
      hasNpkData: true,
      nitrogen: 95,
      phosphorus: 35,
      potassium: 90,
      rainfall: 2200,
      temperature: 22,
      humidity: 86,
      season: 'Whole Year'
    }
  },
  {
    id: 'central-black-soil',
    title: 'Central Vertisol Tract (Black Cotton Soil)',
    region: 'Vidarbha / Malwa / Saurashtra vertisol tract',
    badge: 'Deep Black Vertisol',
    description: 'Moisture-retentive deep black soils, warm subtropical climate, and moderate monsoon rainfall.',
    expectedTopCrops: ['Cotton', 'Soybean', 'Sorghum (Jowar)', 'Pigeon Pea'],
    expectedSuitabilitySummary: 'Black clayey/loam soils with moderate rainfall (740 mm) and warm Kharif temperature (28°C) are specifically optimal for commercial fiber (Cotton) and oilseed (Soybean). Tea and Apple are completely rejected.',
    input: {
      farmerName: 'Kavita Patel',
      farmLocation: 'Nagpur / Indore Agricultural Belt',
      soilType: 'Black',
      soilPh: 7.8,
      hasNpkData: true,
      nitrogen: 85,
      phosphorus: 45,
      potassium: 75,
      rainfall: 740,
      temperature: 28,
      humidity: 68,
      season: 'Kharif'
    }
  }
];
