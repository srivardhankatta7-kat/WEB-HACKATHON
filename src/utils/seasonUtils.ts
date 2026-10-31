import type { Crop, Season, SeasonInfo } from '../types/crop';

export function getCurrentAgriculturalSeason(targetDate = new Date()): SeasonInfo {
  const month = targetDate.getMonth(); // 0 = Jan, 11 = Dec
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonthName = monthNames[month];

  // In India:
  // Kharif: June (5) to October (9) - Monsoon
  // Rabi: October (9) to March (2) - Winter
  // Zaid: March (2) to June (5) - Summer

  let activeSeason: Season = 'Kharif';
  let sowingStatus: SeasonInfo['sowingStatus'] = 'Peak Sowing Window';
  let daysLeftInSeason = 60;
  let description = '';

  if (month >= 5 && month <= 9) {
    // June - October
    activeSeason = 'Kharif';
    if (month === 5 || month === 6) {
      sowingStatus = 'Peak Sowing Window';
      description = 'Southwest monsoon onset. Ideal sowing window for Rice, Cotton, Maize, Groundnut, and Pulses.';
      daysLeftInSeason = Math.max(10, (10 - month) * 30 - targetDate.getDate());
    } else if (month === 7 || month === 8) {
      sowingStatus = 'Mid-Season Care';
      description = 'Vegetative growth phase. Focus on weed management, drainage, and split nitrogen fertilizer application.';
      daysLeftInSeason = Math.max(15, (10 - month) * 30 - targetDate.getDate());
    } else {
      sowingStatus = 'Late Sowing / Harvesting Window';
      description = 'Late Kharif harvesting and preparation for early Rabi land tillage.';
      daysLeftInSeason = Math.max(5, 31 - targetDate.getDate());
    }
  } else if (month >= 9 || month <= 2) {
    // October - March
    activeSeason = 'Rabi';
    if (month === 9 || month === 10) {
      sowingStatus = 'Peak Sowing Window';
      description = 'Post-monsoon cool window. Optimal sowing for Wheat, Mustard, Chickpea, Barley, and Winter Vegetables.';
      daysLeftInSeason = 120;
    } else if (month === 11 || month === 0) {
      sowingStatus = 'Mid-Season Care';
      description = 'Peak winter vegetative and flowering stage. Protect from frost spells and monitor soil moisture.';
      daysLeftInSeason = 60;
    } else {
      sowingStatus = 'Late Sowing / Harvesting Window';
      description = 'Grain ripening and harvesting stage. Ensure dry weather for threshing.';
      daysLeftInSeason = 25;
    }
  } else {
    // March - June (months 2, 3, 4)
    activeSeason = 'Zaid';
    sowingStatus = 'Peak Sowing Window';
    description = 'Short summer cropping season. Best for fast-growing Cucurbits, Watermelon, Moong bean, and Fodder crops with assured irrigation.';
    daysLeftInSeason = Math.max(10, (5 - month) * 30);
  }

  return {
    activeSeason,
    currentMonthName,
    sowingStatus,
    daysLeftInSeason,
    description
  };
}

export function getCropSeasonStatus(
  crop: Crop,
  selectedSeason: Season
): {
  status: 'optimal' | 'acceptable' | 'off-season';
  badgeText: string;
  badgeClass: string;
} {
  if (crop.suitableSeasons.includes(selectedSeason)) {
    return {
      status: 'optimal',
      badgeText: `In-Season (${selectedSeason})`,
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    };
  }

  if (crop.suitableSeasons.includes('Whole Year')) {
    return {
      status: 'acceptable',
      badgeText: 'Perennial / Year-Round',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-300'
    };
  }

  return {
    status: 'off-season',
    badgeText: `Off-Season (Sow in ${crop.suitableSeasons.join('/')})`,
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300'
  };
}
