import type { LabelledSample } from '../types/crop';

export const LABELLED_AGRICULTURAL_DATASET: LabelledSample[] = [
  // --- Rice (Paddy) Samples (Warm, Humid, High Rain, Clay/Alluvial, Kharif) ---
  { id: 1, n: 90, p: 42, k: 43, temperature: 26.5, humidity: 82.0, ph: 6.5, rainfall: 2100, soilType: 'Clayey', season: 'Kharif', trueLabel: 'Rice (Paddy)' },
  { id: 2, n: 85, p: 58, k: 41, temperature: 24.3, humidity: 80.3, ph: 6.8, rainfall: 1850, soilType: 'Alluvial', season: 'Kharif', trueLabel: 'Rice (Paddy)' },
  { id: 3, n: 100, p: 48, k: 38, temperature: 28.1, humidity: 85.0, ph: 6.2, rainfall: 1950, soilType: 'Clayey', season: 'Kharif', trueLabel: 'Rice (Paddy)' },
  { id: 4, n: 78, p: 39, k: 40, temperature: 25.8, humidity: 83.2, ph: 6.4, rainfall: 2200, soilType: 'Silt', season: 'Kharif', trueLabel: 'Rice (Paddy)' },
  { id: 5, n: 92, p: 45, k: 42, temperature: 27.2, humidity: 84.6, ph: 6.9, rainfall: 2050, soilType: 'Alluvial', season: 'Kharif', trueLabel: 'Rice (Paddy)' },
  { id: 6, n: 110, p: 52, k: 44, temperature: 29.0, humidity: 79.5, ph: 6.1, rainfall: 1750, soilType: 'Clayey', season: 'Kharif', trueLabel: 'Rice (Paddy)' },
  { id: 7, n: 88, p: 40, k: 39, temperature: 26.0, humidity: 81.2, ph: 6.7, rainfall: 2300, soilType: 'Peaty', season: 'Kharif', trueLabel: 'Rice (Paddy)' },
  { id: 8, n: 95, p: 46, k: 41, temperature: 25.1, humidity: 82.5, ph: 6.3, rainfall: 1900, soilType: 'Alluvial', season: 'Kharif', trueLabel: 'Rice (Paddy)' },

  // --- Wheat Samples (Cool, Moderate Rain, Loam/Alluvial, Rabi) ---
  { id: 9, n: 120, p: 55, k: 45, temperature: 17.5, humidity: 62.0, ph: 6.9, rainfall: 420, soilType: 'Loamy', season: 'Rabi', trueLabel: 'Wheat' },
  { id: 10, n: 130, p: 60, k: 48, temperature: 16.2, humidity: 58.5, ph: 7.2, rainfall: 380, soilType: 'Alluvial', season: 'Rabi', trueLabel: 'Wheat' },
  { id: 11, n: 115, p: 52, k: 42, temperature: 18.0, humidity: 65.0, ph: 6.8, rainfall: 450, soilType: 'Loamy', season: 'Rabi', trueLabel: 'Wheat' },
  { id: 12, n: 135, p: 64, k: 50, temperature: 15.8, humidity: 60.1, ph: 7.1, rainfall: 350, soilType: 'Alluvial', season: 'Rabi', trueLabel: 'Wheat' },
  { id: 13, n: 125, p: 58, k: 46, temperature: 17.0, humidity: 63.4, ph: 7.3, rainfall: 400, soilType: 'Silt', season: 'Rabi', trueLabel: 'Wheat' },
  { id: 14, n: 140, p: 62, k: 52, temperature: 16.5, humidity: 59.8, ph: 7.0, rainfall: 370, soilType: 'Loamy', season: 'Rabi', trueLabel: 'Wheat' },
  { id: 15, n: 118, p: 50, k: 44, temperature: 18.4, humidity: 64.2, ph: 6.7, rainfall: 480, soilType: 'Clayey', season: 'Rabi', trueLabel: 'Wheat' },
  { id: 16, n: 128, p: 56, k: 47, temperature: 16.9, humidity: 61.5, ph: 7.2, rainfall: 390, soilType: 'Loamy', season: 'Rabi', trueLabel: 'Wheat' },

  // --- Maize Samples (Warm, Moderate Rain, Well-drained Loam, Kharif/Whole Year) ---
  { id: 17, n: 80, p: 48, k: 25, temperature: 24.8, humidity: 65.5, ph: 6.4, rainfall: 850, soilType: 'Loamy', season: 'Kharif', trueLabel: 'Maize (Corn)' },
  { id: 18, n: 85, p: 52, k: 28, temperature: 25.4, humidity: 68.2, ph: 6.6, rainfall: 920, soilType: 'Alluvial', season: 'Kharif', trueLabel: 'Maize (Corn)' },
  { id: 19, n: 75, p: 45, k: 22, temperature: 26.1, humidity: 64.0, ph: 6.2, rainfall: 780, soilType: 'Red', season: 'Kharif', trueLabel: 'Maize (Corn)' },
  { id: 20, n: 90, p: 54, k: 30, temperature: 24.2, humidity: 67.8, ph: 6.8, rainfall: 880, soilType: 'Loamy', season: 'Kharif', trueLabel: 'Maize (Corn)' },
  { id: 21, n: 82, p: 49, k: 26, temperature: 25.8, humidity: 66.1, ph: 6.5, rainfall: 830, soilType: 'Alluvial', season: 'Kharif', trueLabel: 'Maize (Corn)' },
  { id: 22, n: 78, p: 46, k: 24, temperature: 26.5, humidity: 63.5, ph: 6.3, rainfall: 750, soilType: 'Black', season: 'Kharif', trueLabel: 'Maize (Corn)' },
  { id: 23, n: 88, p: 51, k: 29, temperature: 24.6, humidity: 69.0, ph: 6.7, rainfall: 900, soilType: 'Loamy', season: 'Kharif', trueLabel: 'Maize (Corn)' },
  { id: 24, n: 84, p: 47, k: 27, temperature: 25.2, humidity: 65.8, ph: 6.4, rainfall: 820, soilType: 'Silt', season: 'Kharif', trueLabel: 'Maize (Corn)' },

  // --- Cotton Samples (Warm, Deep Black Soil, Moderate Rain, Kharif) ---
  { id: 25, n: 118, p: 46, k: 20, temperature: 28.5, humidity: 72.0, ph: 7.4, rainfall: 780, soilType: 'Black', season: 'Kharif', trueLabel: 'Cotton' },
  { id: 26, n: 125, p: 50, k: 24, temperature: 29.2, humidity: 74.5, ph: 7.8, rainfall: 820, soilType: 'Black', season: 'Kharif', trueLabel: 'Cotton' },
  { id: 27, n: 110, p: 42, k: 18, temperature: 27.8, humidity: 70.2, ph: 7.2, rainfall: 710, soilType: 'Alluvial', season: 'Kharif', trueLabel: 'Cotton' },
  { id: 28, n: 130, p: 52, k: 25, temperature: 30.1, humidity: 75.8, ph: 7.6, rainfall: 860, soilType: 'Black', season: 'Kharif', trueLabel: 'Cotton' },
  { id: 29, n: 115, p: 44, k: 21, temperature: 28.0, humidity: 71.4, ph: 7.5, rainfall: 750, soilType: 'Black', season: 'Kharif', trueLabel: 'Cotton' },
  { id: 30, n: 122, p: 48, k: 22, temperature: 29.5, humidity: 73.1, ph: 7.7, rainfall: 800, soilType: 'Loamy', season: 'Kharif', trueLabel: 'Cotton' },
  { id: 31, n: 108, p: 40, k: 19, temperature: 27.4, humidity: 69.5, ph: 7.1, rainfall: 690, soilType: 'Red', season: 'Kharif', trueLabel: 'Cotton' },
  { id: 32, n: 128, p: 51, k: 23, temperature: 28.8, humidity: 74.0, ph: 7.9, rainfall: 840, soilType: 'Black', season: 'Kharif', trueLabel: 'Cotton' },

  // --- Chickpea (Gram) Samples (Cool, Dry, Moderate/Low Rain, Rabi) ---
  { id: 33, n: 38, p: 68, k: 79, temperature: 19.5, humidity: 45.0, ph: 7.3, rainfall: 320, soilType: 'Loamy', season: 'Rabi', trueLabel: 'Chickpea (Gram)' },
  { id: 34, n: 42, p: 72, k: 82, temperature: 18.2, humidity: 42.5, ph: 7.6, rainfall: 280, soilType: 'Sandy', season: 'Rabi', trueLabel: 'Chickpea (Gram)' },
  { id: 35, n: 35, p: 65, k: 76, temperature: 20.1, humidity: 48.0, ph: 7.1, rainfall: 360, soilType: 'Black', season: 'Rabi', trueLabel: 'Chickpea (Gram)' },
  { id: 36, n: 45, p: 75, k: 85, temperature: 17.8, humidity: 40.2, ph: 7.5, rainfall: 250, soilType: 'Loamy', season: 'Rabi', trueLabel: 'Chickpea (Gram)' },
  { id: 37, n: 39, p: 70, k: 80, temperature: 19.0, humidity: 44.1, ph: 7.4, rainfall: 310, soilType: 'Alluvial', season: 'Rabi', trueLabel: 'Chickpea (Gram)' },
  { id: 38, n: 36, p: 66, k: 77, temperature: 20.5, humidity: 46.8, ph: 7.0, rainfall: 340, soilType: 'Red', season: 'Rabi', trueLabel: 'Chickpea (Gram)' },
  { id: 39, n: 44, p: 74, k: 84, temperature: 18.6, humidity: 41.5, ph: 7.7, rainfall: 290, soilType: 'Sandy', season: 'Rabi', trueLabel: 'Chickpea (Gram)' },
  { id: 40, n: 40, p: 69, k: 81, temperature: 19.8, humidity: 43.9, ph: 7.2, rainfall: 330, soilType: 'Loamy', season: 'Rabi', trueLabel: 'Chickpea (Gram)' },

  // --- Sugarcane Samples (Warm, High Moisture, Alluvial/Loam, Long Season) ---
  { id: 41, n: 180, p: 75, k: 90, temperature: 29.5, humidity: 78.0, ph: 6.8, rainfall: 1650, soilType: 'Alluvial', season: 'Whole Year', trueLabel: 'Sugarcane' },
  { id: 42, n: 195, p: 82, k: 98, temperature: 30.2, humidity: 81.5, ph: 7.2, rainfall: 1800, soilType: 'Clayey', season: 'Whole Year', trueLabel: 'Sugarcane' },
  { id: 43, n: 170, p: 70, k: 85, temperature: 28.8, humidity: 75.0, ph: 6.5, rainfall: 1500, soilType: 'Loamy', season: 'Whole Year', trueLabel: 'Sugarcane' },
  { id: 44, n: 200, p: 85, k: 105, temperature: 31.0, humidity: 83.2, ph: 7.0, rainfall: 1900, soilType: 'Alluvial', season: 'Whole Year', trueLabel: 'Sugarcane' },
  { id: 45, n: 185, p: 78, k: 92, temperature: 29.1, humidity: 79.4, ph: 6.9, rainfall: 1700, soilType: 'Black', season: 'Whole Year', trueLabel: 'Sugarcane' },
  { id: 46, n: 175, p: 72, k: 88, temperature: 28.4, humidity: 76.5, ph: 6.6, rainfall: 1580, soilType: 'Silt', season: 'Whole Year', trueLabel: 'Sugarcane' },
  { id: 47, n: 190, p: 80, k: 95, temperature: 30.5, humidity: 82.0, ph: 7.1, rainfall: 1750, soilType: 'Alluvial', season: 'Whole Year', trueLabel: 'Sugarcane' },
  { id: 48, n: 182, p: 76, k: 91, temperature: 29.8, humidity: 77.8, ph: 6.7, rainfall: 1620, soilType: 'Clayey', season: 'Whole Year', trueLabel: 'Sugarcane' },

  // --- Pearl Millet (Bajra) Samples (Hot, Semi-arid, Low Rain, Sandy/Red, Kharif) ---
  { id: 49, n: 35, p: 25, k: 28, temperature: 33.5, humidity: 42.0, ph: 7.4, rainfall: 380, soilType: 'Sandy', season: 'Kharif', trueLabel: 'Pearl Millet (Bajra)' },
  { id: 50, n: 40, p: 28, k: 32, temperature: 34.8, humidity: 38.5, ph: 7.8, rainfall: 320, soilType: 'Sandy', season: 'Kharif', trueLabel: 'Pearl Millet (Bajra)' },
  { id: 51, n: 30, p: 22, k: 25, temperature: 32.1, humidity: 45.0, ph: 7.1, rainfall: 420, soilType: 'Red', season: 'Kharif', trueLabel: 'Pearl Millet (Bajra)' },
  { id: 52, n: 45, p: 30, k: 35, temperature: 35.5, humidity: 36.2, ph: 8.0, rainfall: 290, soilType: 'Sandy', season: 'Kharif', trueLabel: 'Pearl Millet (Bajra)' },
  { id: 53, n: 38, p: 26, k: 29, temperature: 33.0, humidity: 41.5, ph: 7.5, rainfall: 360, soilType: 'Loamy', season: 'Kharif', trueLabel: 'Pearl Millet (Bajra)' },
  { id: 54, n: 32, p: 23, k: 26, temperature: 32.8, humidity: 44.0, ph: 7.2, rainfall: 400, soilType: 'Red', season: 'Kharif', trueLabel: 'Pearl Millet (Bajra)' },
  { id: 55, n: 42, p: 29, k: 33, temperature: 34.2, humidity: 39.8, ph: 7.7, rainfall: 340, soilType: 'Sandy', season: 'Kharif', trueLabel: 'Pearl Millet (Bajra)' },
  { id: 56, n: 36, p: 24, k: 27, temperature: 33.7, humidity: 43.1, ph: 7.3, rainfall: 370, soilType: 'Sandy', season: 'Kharif', trueLabel: 'Pearl Millet (Bajra)' },

  // --- Tea Samples (Cool Subtropical, High Rain, Acidic Laterite, Whole Year) ---
  { id: 57, n: 120, p: 40, k: 80, temperature: 21.5, humidity: 86.0, ph: 4.8, rainfall: 2400, soilType: 'Laterite', season: 'Whole Year', trueLabel: 'Tea' },
  { id: 58, n: 130, p: 45, k: 85, temperature: 20.2, humidity: 88.5, ph: 4.5, rainfall: 2600, soilType: 'Laterite', season: 'Whole Year', trueLabel: 'Tea' },
  { id: 59, n: 115, p: 38, k: 75, temperature: 22.8, humidity: 84.0, ph: 5.1, rainfall: 2200, soilType: 'Laterite', season: 'Whole Year', trueLabel: 'Tea' },
  { id: 60, n: 135, p: 48, k: 90, temperature: 19.8, humidity: 89.2, ph: 4.6, rainfall: 2750, soilType: 'Red', season: 'Whole Year', trueLabel: 'Tea' },
  { id: 61, n: 125, p: 42, k: 82, temperature: 21.0, humidity: 87.1, ph: 4.9, rainfall: 2450, soilType: 'Laterite', season: 'Whole Year', trueLabel: 'Tea' },
  { id: 62, n: 118, p: 39, k: 78, temperature: 22.2, humidity: 85.3, ph: 5.0, rainfall: 2300, soilType: 'Laterite', season: 'Whole Year', trueLabel: 'Tea' },
  { id: 63, n: 128, p: 44, k: 84, temperature: 20.6, humidity: 88.0, ph: 4.7, rainfall: 2550, soilType: 'Laterite', season: 'Whole Year', trueLabel: 'Tea' },
  { id: 64, n: 122, p: 41, k: 81, temperature: 21.8, humidity: 86.4, ph: 4.8, rainfall: 2380, soilType: 'Red', season: 'Whole Year', trueLabel: 'Tea' },

  // --- Mustard (Rapeseed) Samples (Cool, Dry-Moderate Rain, Loam, Rabi) ---
  { id: 65, n: 75, p: 38, k: 35, temperature: 17.5, humidity: 55.0, ph: 6.8, rainfall: 350, soilType: 'Loamy', season: 'Rabi', trueLabel: 'Mustard (Rapeseed)' },
  { id: 66, n: 82, p: 42, k: 38, temperature: 16.5, humidity: 52.0, ph: 7.1, rainfall: 310, soilType: 'Alluvial', season: 'Rabi', trueLabel: 'Mustard (Rapeseed)' },
  { id: 67, n: 70, p: 35, k: 32, temperature: 18.5, humidity: 58.0, ph: 6.5, rainfall: 390, soilType: 'Sandy', season: 'Rabi', trueLabel: 'Mustard (Rapeseed)' },
  { id: 68, n: 85, p: 45, k: 40, temperature: 15.8, humidity: 50.5, ph: 7.3, rainfall: 280, soilType: 'Loamy', season: 'Rabi', trueLabel: 'Mustard (Rapeseed)' },
  { id: 69, n: 78, p: 39, k: 36, temperature: 17.0, humidity: 54.2, ph: 6.9, rainfall: 340, soilType: 'Silt', season: 'Rabi', trueLabel: 'Mustard (Rapeseed)' },
  { id: 70, n: 72, p: 36, k: 33, temperature: 18.0, humidity: 56.8, ph: 6.6, rainfall: 370, soilType: 'Loamy', season: 'Rabi', trueLabel: 'Mustard (Rapeseed)' },
  { id: 71, n: 80, p: 41, k: 37, temperature: 16.8, humidity: 53.4, ph: 7.0, rainfall: 320, soilType: 'Alluvial', season: 'Rabi', trueLabel: 'Mustard (Rapeseed)' },
  { id: 72, n: 76, p: 38, k: 34, temperature: 17.4, humidity: 55.6, ph: 6.7, rainfall: 360, soilType: 'Sandy', season: 'Rabi', trueLabel: 'Mustard (Rapeseed)' },

  // --- Groundnut Samples (Warm, Well-drained Sandy/Red, Kharif) ---
  { id: 73, n: 25, p: 48, k: 42, temperature: 27.5, humidity: 62.0, ph: 6.5, rainfall: 620, soilType: 'Sandy', season: 'Kharif', trueLabel: 'Groundnut (Peanut)' },
  { id: 74, n: 28, p: 52, k: 45, temperature: 28.2, humidity: 65.5, ph: 6.8, rainfall: 680, soilType: 'Red', season: 'Kharif', trueLabel: 'Groundnut (Peanut)' },
  { id: 75, n: 22, p: 45, k: 38, temperature: 26.8, humidity: 60.1, ph: 6.3, rainfall: 580, soilType: 'Loamy', season: 'Kharif', trueLabel: 'Groundnut (Peanut)' },
  { id: 76, n: 30, p: 55, k: 48, temperature: 29.0, humidity: 67.2, ph: 7.0, rainfall: 720, soilType: 'Sandy', season: 'Kharif', trueLabel: 'Groundnut (Peanut)' },
  { id: 77, n: 26, p: 49, k: 43, temperature: 27.8, humidity: 63.4, ph: 6.6, rainfall: 640, soilType: 'Red', season: 'Kharif', trueLabel: 'Groundnut (Peanut)' },
  { id: 78, n: 24, p: 46, k: 40, temperature: 27.1, humidity: 61.8, ph: 6.4, rainfall: 600, soilType: 'Sandy', season: 'Kharif', trueLabel: 'Groundnut (Peanut)' },
  { id: 79, n: 29, p: 53, k: 46, temperature: 28.5, humidity: 66.0, ph: 6.9, rainfall: 700, soilType: 'Loamy', season: 'Kharif', trueLabel: 'Groundnut (Peanut)' },
  { id: 80, n: 25, p: 47, k: 41, temperature: 27.4, humidity: 62.9, ph: 6.5, rainfall: 630, soilType: 'Red', season: 'Kharif', trueLabel: 'Groundnut (Peanut)' }
];
