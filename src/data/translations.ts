import type { CropCategory, Season, SoilType, SuitabilityCategory, SupportedLanguage } from '../types/crop';

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  advisoryAlert: string;
  tabs: {
    form: string;
    results: string;
    fertilizer: string;
    compare: string;
    evaluation: string;
    testReport: string;
    methodology: string;
    saved: string;
    report: string;
  };
  form: {
    step1: string;
    title: string;
    subtitle: string;
    farmerNameLabel: string;
    farmerLocationLabel: string;
    soilType: string;
    soilPh: string;
    npkToggle: string;
    nitrogen: string;
    phosphorus: string;
    potassium: string;
    rainfall: string;
    temperature: string;
    humidity: string;
    season: string;
    evaluateBtn: string;
    resetBtn: string;
    liveWeatherBtn: string;
    dataCompleteness: string;
    highConfidence: string;
    moderateConfidence: string;
    basicConfidence: string;
    autoFetchWeatherForVillage: string;
    gpsDetectVillage: string;
    locationHelper: string;
  };
  weather: {
    badge: string;
    title: string;
    subtitle: string;
    useGps: string;
    searchPlaceholder: string;
    lookupBtn: string;
    quickSelectHub: string;
    liveBadge: string;
    calibratedBadge: string;
    applyToForm: string;
    appliedSuccess: string;
    villageSearchPrompt: string;
    searching: string;
    noResults: string;
    detectedGps: string;
    villageBadge: string;
    tehsilBadge: string;
    districtBadge: string;
    stateBadge: string;
    allIndiaCoverage: string;
    browseByState: string;
    selectState: string;
    selectDistrict: string;
  };
  seasonBanner: {
    activeSeason: string;
    currentMonth: string;
    peakSowing: string;
    midSeason: string;
    lateSowing: string;
    syncBtn: string;
    filterActive: string;
    filterInSeason: string;
    calendarBtn: string;
    calendarTitle: string;
  };
  results: {
    fieldProfile: string;
    adjustParams: string;
    fertilizerGuide: string;
    allCategories: string;
    allSuitability: string;
    searchPlaceholder: string;
    topMatch: string;
    runnerUp: string;
    thirdChoice: string;
    match: string;
    compareBtn: string;
    auditBtn: string;
    strengths: string;
    weaknesses: string;
    warnings: string;
    amendments: string;
    dualEngineTitle: string;
    rulesEngine: string;
    knnEngine: string;
  };
  fertilizer: {
    badge: string;
    title: string;
    subtitle: string;
    selectTargetCrop: string;
    baselineAlert: string;
    nutrientStatusTitle: string;
    commercialProductsTitle: string;
    splitScheduleTitle: string;
    phAmendmentTitle: string;
    biofertilizersTitle: string;
    costEstimate: string;
    bagsUnit: string;
  };
  evaluation: {
    badge: string;
    title: string;
    subtitle: string;
    runBtn: string;
    top1Accuracy: string;
    top3Recall: string;
    macroF1: string;
    macroPrecision: string;
    knnBaseline: string;
    perCropTableTitle: string;
    confusionMatrixTitle: string;
    inspectorTitle: string;
  };
  testReport: {
    badge: string;
    title: string;
    subtitle: string;
    rerunBtn: string;
    printBtn: string;
    statusCard: string;
    latencyCard: string;
    engineCard: string;
    boundaryCard: string;
    comparisonTitle: string;
    detailedTitle: string;
  };
  methodology: {
    badge: string;
    title: string;
    subtitle: string;
    disclaimerTitle: string;
    mathTitle: string;
    limitationsTitle: string;
    sourcesTitle: string;
  };
  compare: {
    emptyTitle: string;
    emptyDesc: string;
    quickAdd: string;
    title: string;
    clearAll: string;
  };
  saved: {
    emptyTitle: string;
    emptyDesc: string;
    createNewBtn: string;
    title: string;
    loadAudit: string;
    deleteAudit: string;
    clearAll: string;
  };
  report: {
    printBtn: string;
    exportJsonBtn: string;
    saveAuditBtn: string;
    title: string;
    subtitle: string;
  };
  suitability: {
    highly: string;
    moderately: string;
    marginally: string;
    notRecommended: string;
  };
  seasons: {
    kharif: string;
    rabi: string;
    zaid: string;
    wholeYear: string;
  };
}

export const CROP_TRANSLATIONS: Record<string, Record<SupportedLanguage, string>> = {
  rice: {
    en: 'Rice (Paddy)',
    hi: 'चावल (धान)',
    te: 'వరి (వరి ధాన్యం)',
    ta: 'நெல் (பயிர்)',
    pa: 'ਝੋਨਾ (ਚੌਲ)',
    mr: 'भात (तांदूळ)',
    bn: 'ধান (চাল)',
    kn: 'ಭತ್ತ (ಅಕ್ಕಿ)'
  },
  wheat: {
    en: 'Wheat',
    hi: 'गेहूं',
    te: 'గోధుమ',
    ta: 'கோதுமை',
    pa: 'ਕਣਕ',
    mr: 'गहू',
    bn: 'গম',
    kn: 'ಗೋಧಿ'
  },
  maize: {
    en: 'Maize (Corn)',
    hi: 'मक्का',
    te: 'మొక్కజొన్న',
    ta: 'மக்காச்சோளம்',
    pa: 'ਮੱਕੀ',
    mr: 'मका',
    bn: 'ভুট্টা',
    kn: 'ಮೆಕ್ಕೆಜೋಳ'
  },
  pearl_millet: {
    en: 'Pearl Millet (Bajra)',
    hi: 'बाजरा',
    te: 'సజ్జలు',
    ta: 'கம்பு',
    pa: 'ਬਾਜਰਾ',
    mr: 'बाजरी',
    bn: 'বাজরা',
    kn: 'ಸಜ್ಜೆ'
  },
  sorghum: {
    en: 'Sorghum (Jowar)',
    hi: 'ज्वार',
    te: 'జొన్నలు',
    ta: 'சோளம்',
    pa: 'ਜਵਾਰ',
    mr: 'ज्वारी',
    bn: 'জোয়ার',
    kn: 'ಜೋಳ'
  },
  barley: {
    en: 'Barley',
    hi: 'जौ',
    te: 'బార్లీ',
    ta: 'பார்லி',
    pa: 'ਜੌਂ',
    mr: 'सातू (बार्ली)',
    bn: 'বার্লি',
    kn: 'ಬಾರ್ಲಿ'
  },
  finger_millet: {
    en: 'Finger Millet (Ragi)',
    hi: 'रागी (मडुआ)',
    te: 'రాగులు',
    ta: 'கேழ்வரகு (ராகி)',
    pa: 'ਰਾਗੀ',
    mr: 'नाचणी (रागी)',
    bn: 'রাগি',
    kn: 'ರಾಗಿ'
  },
  chickpea: {
    en: 'Chickpea (Gram)',
    hi: 'चना',
    te: 'శనగలు',
    ta: 'கொண்டைக்கடலை',
    pa: 'ਛੋਲੇ',
    mr: 'हरभरा (चना)',
    bn: 'ছোলা',
    kn: 'ಕಡಲೆ'
  },
  pigeon_pea: {
    en: 'Pigeon Pea (Tur / Arhar)',
    hi: 'अरहर (तूर)',
    te: 'కందులు',
    ta: 'துவரை',
    pa: 'ਅਰਹਰ',
    mr: 'तूर',
    bn: 'অড়হর',
    kn: 'ತೊಗರಿ'
  },
  lentil: {
    en: 'Lentil (Masoor)',
    hi: 'मसूर',
    te: 'మసూర్ పప్పు',
    ta: 'மசூர் பருப்பு',
    pa: 'ਮਸਰ',
    mr: 'मसूर',
    bn: 'মসুর ডাল',
    kn: 'ಮಸೂರ ಬೇಳೆ'
  },
  blackgram: {
    en: 'Black Gram (Urad)',
    hi: 'उड़द',
    te: 'మినుములు',
    ta: 'உளுந்து',
    pa: 'ਮਾਂਹ (ਉੜਦ)',
    mr: 'उडीद',
    bn: 'মাষকলাই',
    kn: 'ಉದ್ದು'
  },
  cotton: {
    en: 'Cotton',
    hi: 'कपास',
    te: 'పత్తి',
    ta: 'பருத்தி',
    pa: 'ਨਰਮਾ (ਕਪਾਹ)',
    mr: 'कापूस',
    bn: 'তুলা',
    kn: 'ಹತ್ತಿ'
  },
  sugarcane: {
    en: 'Sugarcane',
    hi: 'गन्ना',
    te: 'చెరకు',
    ta: 'கரும்பு',
    pa: 'ਗੰਨਾ',
    mr: 'ऊस',
    bn: 'আখ',
    kn: 'ಕಬ್ಬು'
  },
  jute: {
    en: 'Jute',
    hi: 'जूट (पटसन)',
    te: 'జనపనార',
    ta: 'சணல்',
    pa: 'ਪਟਸਨ',
    mr: 'ताग',
    bn: 'পাট',
    kn: 'ಸೆಣಬು'
  },
  groundnut: {
    en: 'Groundnut (Peanut)',
    hi: 'मूंगफली',
    te: 'వేరుశనగ',
    ta: 'நிலக்கடலை',
    pa: 'ਮੂੰਗਫਲੀ',
    mr: 'भुईमूग',
    bn: 'চিনাবাদাম',
    kn: 'ಕಡಲೆಕಾಯಿ'
  },
  mustard: {
    en: 'Mustard (Rapeseed)',
    hi: 'सरसों',
    te: 'ఆవాలు',
    ta: 'கடுகு',
    pa: 'ਸਰ੍ਹੋਂ',
    mr: 'मोहरी',
    bn: 'সরিষা',
    kn: 'ಸಾಸಿವೆ'
  },
  soybean: {
    en: 'Soybean',
    hi: 'सोयाबीन',
    te: 'సోయాబీన్',
    ta: 'சோயாபீன்',
    pa: 'ਸੋਇਆਬੀਨ',
    mr: 'सोयाबीन',
    bn: 'সয়াবিন',
    kn: 'ಸೋಯಾಬೀನ್'
  },
  sunflower: {
    en: 'Sunflower',
    hi: 'सूरजमुखी',
    te: 'పొద్దుతిరుగుడు',
    ta: 'சூரியகாந்தி',
    pa: 'ਸੂਰਜਮੁਖੀ',
    mr: 'सूर्यफूल',
    bn: 'সূর্যমুখী',
    kn: 'ಸೂರ್ಯಕಾಂತಿ'
  },
  tea: {
    en: 'Tea',
    hi: 'चाय',
    te: 'టీ',
    ta: 'தேயிலை',
    pa: 'ਚਾਹ',
    mr: 'चहा',
    bn: 'চা',
    kn: 'ಚಹಾ'
  },
  coffee: {
    en: 'Coffee',
    hi: 'कॉफी',
    te: 'కాఫీ',
    ta: 'காபி',
    pa: 'ਕੌਫੀ',
    mr: 'कॉफी',
    bn: 'কফি',
    kn: 'ಕಾಫಿ'
  },
  banana: {
    en: 'Banana',
    hi: 'केला',
    te: 'అరటి',
    ta: 'வாழைப்பழம்',
    pa: 'ਕੇਲਾ',
    mr: 'केळी',
    bn: 'কলা',
    kn: 'ಬಾಳೆಹಣ್ಣು'
  },
  mango: {
    en: 'Mango',
    hi: 'आम',
    te: 'మామిడి',
    ta: 'மாம்பழம்',
    pa: 'ਅੰਬ',
    mr: 'आंबा',
    bn: 'আম',
    kn: 'ಮಾವು'
  },
  potato: {
    en: 'Potato',
    hi: 'आलू',
    te: 'బంగాళాదుంప',
    ta: 'உருளைக்கிழங்கு',
    pa: 'ਆਲੂ',
    mr: 'बटाटा',
    bn: 'আলু',
    kn: 'ಆಲೂಗಡ್ಡೆ'
  },
  tomato: {
    en: 'Tomato',
    hi: 'टमाटर',
    te: 'టమోటా',
    ta: 'தக்காளி',
    pa: 'ਟਮਾਟਰ',
    mr: 'टोमॅटो',
    bn: 'টমেটো',
    kn: 'ಟೊಮ್ಯಾಟೊ'
  },
  onion: {
    en: 'Onion',
    hi: 'प्याज',
    te: 'ఉల్లిపాయ',
    ta: 'வெங்காயம்',
    pa: 'ਪਿਆਜ਼',
    mr: 'कांदा',
    bn: 'পেঁয়াজ',
    kn: 'ಈರುಳ್ಳಿ'
  },
  apple: {
    en: 'Apple',
    hi: 'सेब',
    te: 'ఆపిల్',
    ta: 'ஆப்பிள்',
    pa: 'ਸੇਬ',
    mr: 'सफरचंद',
    bn: 'আপেল',
    kn: 'ಸೇಬು'
  },
  orange: {
    en: 'Orange',
    hi: 'संतरा',
    te: 'నారింజ',
    ta: 'ஆரஞ்சு',
    pa: 'ਸੰਤਰਾ',
    mr: 'संत्रा',
    bn: 'কমলালেবু',
    kn: 'ಕಿತ್ತಳೆ'
  }
};

export const SOIL_TRANSLATIONS: Record<SoilType, Record<SupportedLanguage, string>> = {
  Alluvial: {
    en: 'Alluvial Soil',
    hi: 'जलोढ़ मिट्टी',
    te: 'ఒండ్రు నేల',
    ta: 'வண்டல் மண்',
    pa: 'ਜਲੋੜ ਮਿੱਟੀ',
    mr: 'गाळाची जमीन',
    bn: 'পলিমাটি',
    kn: 'ಮೆಕ್ಕಲು ಮಣ್ಣು'
  },
  Black: {
    en: 'Black / Regur Soil',
    hi: 'काली / रेगुर मिट्टी',
    te: 'నల్లరేగడి నేల',
    ta: 'கரிசல் மண்',
    pa: 'ਕਾਲੀ ਮਿੱਟੀ',
    mr: 'काळी / रेगूर माती',
    bn: 'কালো / রেগুর মাটি',
    kn: 'ಕಪ್ಪು / ರೆಗುರ್ ಮಣ್ಣು'
  },
  Red: {
    en: 'Red Soil',
    hi: 'लाल मिट्टी',
    te: 'ఎర్ర నేల',
    ta: 'செம்மண்',
    pa: 'ਲਾਲ ਮਿੱਟੀ',
    mr: 'तांबडी माती',
    bn: 'লাল মাটি',
    kn: 'ಕೆಂಪು ಮಣ್ಣು'
  },
  Laterite: {
    en: 'Laterite Soil',
    hi: 'लैटेराइट मिट्टी',
    te: 'లాటరైట్ నేల',
    ta: 'சரளை மண்',
    pa: 'ਲੈਟਰਾਈਟ ਮਿੱਟੀ',
    mr: 'जांभी माती',
    bn: 'ল্যাটেরাইট মাটি',
    kn: 'ಜಂಬಿಟ್ಟಿಗೆ ಮಣ್ಣು'
  },
  Sandy: {
    en: 'Sandy Soil',
    hi: 'बलुई / रेतीली मिट्टी',
    te: 'ఇసుక నేల',
    ta: 'மணல் மண்',
    pa: 'ਰੇਤਲੀ ਮਿੱਟੀ',
    mr: 'रेताड / वाळूयुक्त माती',
    bn: 'বেলে মাটি',
    kn: 'ಮರಳು ಮಣ್ಣು'
  },
  Clayey: {
    en: 'Clayey Soil',
    hi: 'चिकनी मिट्टी',
    te: 'బంకమన్ను నేల',
    ta: 'களிமண்',
    pa: 'ਚੀਕਣੀ ਮਿੱਟੀ',
    mr: 'चिकण माती',
    bn: 'এঁটেল মাটি',
    kn: 'ಜೇಡಿ ಮಣ್ಣು'
  },
  Loamy: {
    en: 'Loamy Soil',
    hi: 'दोमट मिट्टी',
    te: 'గరప నేల',
    ta: 'வண்டல் கலந்த மண் (Loam)',
    pa: 'ਦੋਮਟ ਮਿੱਟੀ',
    mr: 'दुमट माती',
    bn: 'দোআঁশ মাটি',
    kn: 'ಗೋಡು / ಲೋಮ್ ಮಣ್ಣು'
  },
  Peaty: {
    en: 'Peaty / Marshy Soil',
    hi: 'दलदली / पीट मिट्टी',
    te: 'జవుగు నేల',
    ta: 'சதுப்பு நில மண்',
    pa: 'ਪੀਟ ਮਿੱਟੀ',
    mr: 'दलदलीची माती',
    bn: 'পিট মাটি',
    kn: 'ಜೌಗು ಮಣ್ಣು'
  },
  Silt: {
    en: 'Silt Soil',
    hi: 'गाद युक्त मिट्टी',
    te: 'హూళు నేల',
    ta: 'மென் வண்டல் மண்',
    pa: 'ਗਾਦ ਮਿੱਟੀ',
    mr: 'गाळ माती',
    bn: 'পলি মাটি',
    kn: 'ಹೂಳು ಮಣ್ಣು'
  }
};

export const SEASON_TRANSLATIONS: Record<Season, Record<SupportedLanguage, string>> = {
  Kharif: {
    en: 'Kharif (Monsoon)',
    hi: 'खरीफ (मानसून)',
    te: 'ఖరీఫ్ (వర్షాకాలం)',
    ta: 'காரிஃப் (மழைக்காலம்)',
    pa: 'ਖ਼ਰੀਫ਼ (ਮੌਨਸੂਨ)',
    mr: 'खरीप (पावसाळा)',
    bn: 'খরিফ (বর্ষাকাল)',
    kn: 'ಖಾರೀಫ್ (ಮುಂಗಾರು)'
  },
  Rabi: {
    en: 'Rabi (Winter)',
    hi: 'रबी (शीतकालीन)',
    te: 'రబీ (శీతాకాలం)',
    ta: 'ரபி (குளிர்காலம்)',
    pa: 'ਹਾੜੀ / ਰਬੀ (ਸਰਦੀ)',
    mr: 'रब्बी (हिवाळा)',
    bn: 'রবি (শীতকাল)',
    kn: 'ರಬಿ (ಹಿಂಗಾರು)'
  },
  Zaid: {
    en: 'Zaid (Summer)',
    hi: 'जायद (ग्रीष्मकालीन)',
    te: 'జాయెద్ (వేసవి)',
    ta: 'சையத் (கோடைகாலம்)',
    pa: 'ਜ਼ਾਇਦ (ਗਰਮੀਆਂ)',
    mr: 'उन्हाळी (झायद)',
    bn: 'জায়েদ (গ্রীষ্মকাল)',
    kn: 'ಜಾಯಿದ್ (ಬೇಸಿಗೆ)'
  },
  'Whole Year': {
    en: 'Perennial / Year-Round',
    hi: 'वार्षिक / बारहमासी',
    te: 'సంవత్సరమంతా',
    ta: 'ஆண்டு முழுவதும்',
    pa: 'ਸਾਰਾ ਸਾਲ',
    mr: 'वार्षिक / वर्षभर',
    bn: 'সারা বছর',
    kn: 'ವರ್ಷಪೂರ್ತಿ'
  }
};

export const CATEGORY_TRANSLATIONS: Record<CropCategory | 'All', Record<SupportedLanguage, string>> = {
  All: {
    en: 'All Categories',
    hi: 'सभी श्रेणियां',
    te: 'అన్ని రకాలు',
    ta: 'அனைத்து பிரிவுகள்',
    pa: 'ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ',
    mr: 'सर्व प्रकार',
    bn: 'সকল বিভাগ',
    kn: 'ಎಲ್ಲಾ ವರ್ಗಗಳು'
  },
  Cereals: {
    en: 'Cereals',
    hi: 'अनाज (खाद्यान्न)',
    te: 'ధాన్యాలు',
    ta: 'தானியங்கள்',
    pa: 'ਅਨਾਜ',
    mr: 'तृणधान्ये',
    bn: 'দানাশস্য',
    kn: 'ಧಾನ್ಯಗಳು'
  },
  Pulses: {
    en: 'Pulses & Legumes',
    hi: 'दलहन (दालें)',
    te: 'పప్పుధాన్యాలు',
    ta: 'பருப்பு வகைகள்',
    pa: 'ਦਾਲਾਂ',
    mr: 'कठोळे व डाळी',
    bn: 'ডালজাতীয় শস্য',
    kn: 'ಕಾಳುಗಳು ಮತ್ತು ಬೇಳೆಗಳು'
  },
  'Cash Crops': {
    en: 'Cash Crops',
    hi: 'नकदी फसलें',
    te: 'వాణిజ్య పంటలు',
    ta: 'பணப்பயிர்கள்',
    pa: 'ਨਕਦੀ ਫ਼ਸਲਾਂ',
    mr: 'नगदी पिके',
    bn: 'অর্থকরী ফসল',
    kn: 'ವಾಣಿಜ್ಯ ಬೆಳೆಗಳು'
  },
  Oilseeds: {
    en: 'Oilseeds',
    hi: 'तिलहन',
    te: 'నూనెగింజలు',
    ta: 'எண்ணெய் வித்துக்கள்',
    pa: 'ਤੇਲ ਬੀਜ',
    mr: 'गळित धान्ये (तेलबिया)',
    bn: 'তৈলবীজ',
    kn: 'ಎಣ್ಣೆಕಾಳುಗಳು'
  },
  'Fruits & Plantation': {
    en: 'Fruits & Plantation',
    hi: 'फल एवं बागवानी',
    te: 'పండ్లు మరియు తోటపంటలు',
    ta: 'பழங்கள் & தோட்டப்பயிர்கள்',
    pa: 'ਫਲ ਅਤੇ ਬਾਗਬਾਨੀ',
    mr: 'फळे व बागायती पिके',
    bn: 'ফলমূল ও বাগিচা ফসল',
    kn: 'ಹಣ್ಣುಗಳು ಮತ್ತು ತೋಟಗಾರಿಕೆ'
  },
  'Vegetables & Tubers': {
    en: 'Vegetables & Tubers',
    hi: 'सब्जियां एवं कंदमूल',
    te: 'కూరగాయలు మరియు దుంపలు',
    ta: 'காய்கறிகள் & கிழங்குகள்',
    pa: 'ਸਬਜ਼ੀਆਂ ਅਤੇ ਕੰਦ',
    mr: 'भाज्या व कंदमुळे',
    bn: 'শাকসবজি ও কন্দজাতীয়',
    kn: 'ತರಕಾರಿಗಳು ಮತ್ತು ಗೆಡ್ಡೆಗಳು'
  }
};

export const SUITABILITY_TRANSLATIONS: Record<SuitabilityCategory | 'All', Record<SupportedLanguage, string>> = {
  All: {
    en: 'All Suitability Levels',
    hi: 'सभी उपयुक्तता स्तर',
    te: 'అన్ని అనుకూలత స్థాయిలు',
    ta: 'அனைத்து பொருத்தம் அளவுகள்',
    pa: 'ਸਾਰੇ ਪੱਧਰ',
    mr: 'सर्व पात्रता पातळी',
    bn: 'সকল উপযোগিতা মাত্রা',
    kn: 'ಎಲ್ಲಾ ಸೂಕ್ತತೆ ಮಟ್ಟಗಳು'
  },
  'Highly Suitable': {
    en: 'Highly Suitable',
    hi: 'अत्यधिक उपयुक्त',
    te: 'అత్యంత అనుకూలం',
    ta: 'மிகவும் பொருத்தமானது',
    pa: 'ਬਹੁਤ ਢੁਕਵਾਂ',
    mr: 'अतिशय योग्य',
    bn: 'অত্যন্ত উপযুক্ত',
    kn: 'ಅತ್ಯಂತ ಸೂಕ್ತ'
  },
  'Moderately Suitable': {
    en: 'Moderately Suitable',
    hi: 'मध्यम उपयुक्त',
    te: 'మధ్యస్థ అనుకూలం',
    ta: 'மிதமான பொருத்தம்',
    pa: 'ਦਰਮਿਆਨਾ ਢੁਕਵਾਂ',
    mr: 'मध्यम योग्य',
    bn: 'মাঝারি উপযুক্ত',
    kn: 'ಮಧ್ಯಮ ಸೂಕ್ತ'
  },
  'Marginally Suitable': {
    en: 'Marginally Suitable',
    hi: 'सीमित उपयुक्त',
    te: 'కొద్దిగా అనుకూలం',
    ta: 'குறைந்த பொருத்தம்',
    pa: 'ਥੋੜ੍ਹਾ ਢੁਕਵਾਂ',
    mr: 'मर्यादित योग्य',
    bn: 'সামান্য উপযুক্ত',
    kn: 'ಕಡಿಮೆ ಸೂಕ್ತ'
  },
  'Not Recommended': {
    en: 'Not Recommended',
    hi: 'अनुशंसित नहीं',
    te: 'సిఫార్సు చేయబడలేదు',
    ta: 'பரிந்துரைக்கப்படவில்லை',
    pa: 'ਸਿਫ਼ਾਰਸ਼ ਨਹੀਂ',
    mr: 'शिफारस नाही',
    bn: 'সুপারিশযোগ্য নয়',
    kn: 'ಶಿಫಾರಸು ಮಾಡಲಾಗಿಲ್ಲ'
  }
};

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appName: 'AgroGuide DSS',
    appSubtitle: 'Crop Recommendation & Agronomic Decision Support System',
    advisoryAlert: 'Educational DSS Prototype: Advisory estimates based on FAO & ICAR standards. Consult local KVK / certified agronomists.',
    tabs: {
      form: 'Farm Inputs',
      results: 'Ranked Crops',
      fertilizer: 'Fertilizer Guide',
      compare: 'Crop Compare',
      evaluation: 'Model Evaluation',
      testReport: 'Test Report',
      methodology: 'Methodology & Limits',
      saved: 'Saved Audits',
      report: 'Audit Report'
    },
    form: {
      step1: 'Step 1 • Field Parameters',
      title: 'Farm Edaphic & Climatic Parameters',
      subtitle: 'Enter laboratory soil test readings and local climate conditions to generate agronomic recommendations.',
      farmerNameLabel: 'Farmer / Enterprise Name',
      farmerLocationLabel: 'Field Location / District',
      soilType: 'Soil Texture / Order',
      soilPh: 'Soil Reaction (pH)',
      npkToggle: 'Include Soil N-P-K Lab Test Values',
      nitrogen: 'Available Nitrogen (N)',
      phosphorus: 'Available Phosphorus (P)',
      potassium: 'Available Potassium (K)',
      rainfall: 'Annual / Seasonal Rainfall',
      temperature: 'Ambient Mean Temperature',
      humidity: 'Relative Atmospheric Humidity',
      season: 'Target Sowing Season',
      evaluateBtn: 'Compute Crop Recommendations',
      resetBtn: 'Reset Parameters',
      liveWeatherBtn: 'Fetch Live Weather (GPS / City)',
      dataCompleteness: 'Data Completeness Index',
      highConfidence: 'High Confidence Evaluation',
      moderateConfidence: 'Moderate Confidence (Regional Fertility Assumed)',
      basicConfidence: 'Basic Confidence (Incomplete Parameters)',
      autoFetchWeatherForVillage: 'Auto-fetch Weather',
      gpsDetectVillage: 'GPS Village',
      locationHelper: 'Search any village, gram panchayat, taluk, district or 6-digit PIN code across India'
    },
    weather: {
      badge: 'Live Open-Meteo API',
      title: 'Automated Field Weather & Climate Sync',
      subtitle: 'Fetch live temperature, ambient humidity, and precipitation via GPS or district name to auto-fill farm parameters.',
      useGps: 'Use My GPS',
      searchPlaceholder: 'Search district, city or agricultural belt (e.g. Ludhiana, Solapur, Varanasi)...',
      lookupBtn: 'Lookup',
      quickSelectHub: 'Or Quick Select Major Agro-Climatic Zone:',
      liveBadge: 'LIVE',
      calibratedBadge: 'CALIBRATED MODEL',
      applyToForm: 'Apply to Field Form',
      appliedSuccess: 'Values Applied to Form!',
      villageSearchPrompt: 'Search any village, tehsil, district or PIN code in India (e.g. Ralegan Siddhi, Kothapalli, 221002, Moga)...',
      searching: 'Searching Indian villages, tehsils & districts...',
      noResults: 'No village found. Try searching district or state name.',
      detectedGps: 'GPS Village Pinpoint',
      villageBadge: 'Village / Basti',
      tehsilBadge: 'Tehsil / Mandal',
      districtBadge: 'District',
      stateBadge: 'State',
      allIndiaCoverage: 'All-India Coverage: 600,000+ Villages & 780+ Districts',
      browseByState: 'Browse by State & District',
      selectState: 'Select State / UT',
      selectDistrict: 'Select District'
    },
    seasonBanner: {
      activeSeason: 'Active Season',
      currentMonth: 'Current Month',
      peakSowing: 'Peak Sowing Window',
      midSeason: 'Mid-Season Care',
      lateSowing: 'Late Sowing / Harvesting Window',
      syncBtn: 'Sync Form to Active Season',
      filterActive: '✓ Season Filter Active',
      filterInSeason: 'Filter In-Season Only',
      calendarBtn: 'Calendar',
      calendarTitle: 'National Agricultural Cropping Calendar (FAO / ICAR Standard)'
    },
    results: {
      fieldProfile: 'Field Profile:',
      adjustParams: 'Adjust Parameters',
      fertilizerGuide: 'Fertilizer Guide',
      allCategories: 'All Categories',
      allSuitability: 'All Suitability Levels',
      searchPlaceholder: 'Search recommended crop by name...',
      topMatch: 'Top Match',
      runnerUp: 'Runner Up',
      thirdChoice: '3rd Choice',
      match: 'Match',
      compareBtn: 'Compare',
      auditBtn: 'Full Agronomic Audit',
      strengths: 'Prime Agronomic Drivers',
      weaknesses: 'Limiting Factors & Risks',
      warnings: 'Important Agronomic Warnings',
      amendments: 'Soil & Chemical Amendments Needed',
      dualEngineTitle: 'Engine Scoring Paradigm:',
      rulesEngine: 'Agronomic Rules (Continuous)',
      knnEngine: 'k-NN Similarity Benchmark'
    },
    fertilizer: {
      badge: 'Soil Test Crop Response (STCR)',
      title: 'Precision Fertilizer & Integrated Nutrient Advisory',
      subtitle: 'Targeted fertilizer calculations calibrated using the Indian Council of Agricultural Research (ICAR) STCR equations and FAO Soil Bulletin No. 17.',
      selectTargetCrop: 'Select Target Crop:',
      baselineAlert: 'Baseline Soil Fertility Assumed: Laboratory N-P-K soil test readings were not provided. Recommendations reflect regional medium fertility baselines.',
      nutrientStatusTitle: '1. Soil Nutrient Status & Net Field Deficit',
      commercialProductsTitle: '2. Recommended Commercial Fertilizer Grades & Dosages',
      splitScheduleTitle: '3. Scientific Split Application Schedule (Preventing Leaching)',
      phAmendmentTitle: 'Soil pH Amendment (Lime / Gypsum)',
      biofertilizersTitle: 'Biofertilizer & Microbial Inoculation',
      costEstimate: 'Est. Cost:',
      bagsUnit: 'bags (50 kg each)'
    },
    evaluation: {
      badge: 'Empirical Model Evaluation',
      title: 'Agronomic Engine vs. Ground-Truth Dataset',
      subtitle: 'Rigorous benchmarking of the Decision Support System against a multi-crop labelled dataset across distinct soil types, rainfall profiles, and nutrient conditions.',
      runBtn: 'Run Benchmark Suite',
      top1Accuracy: 'Top-1 Accuracy',
      top3Recall: 'Top-3 Recall',
      macroF1: 'Macro F1-Score',
      macroPrecision: 'Macro Precision',
      knnBaseline: 'k-NN ML Baseline',
      perCropTableTitle: 'Per-Crop Performance Metrics',
      confusionMatrixTitle: 'Multi-Class Confusion Matrix',
      inspectorTitle: 'Interactive Instance Inspector'
    },
    testReport: {
      badge: 'Automated Test Suite',
      title: 'Agronomic Engine Verification & Short Test Report',
      subtitle: 'Deterministic verification across standard agro-ecological test scenarios, extreme boundary stress tests, and algorithmic comparison results.',
      rerunBtn: 'Rerun Suite',
      printBtn: 'Print Report',
      statusCard: 'Test Suite Status',
      latencyCard: 'Average Latency',
      engineCard: 'Engine Architecture',
      boundaryCard: 'Boundary Resilience',
      comparisonTitle: 'Algorithmic Comparison Results (Rule Engine vs. k-NN Benchmark)',
      detailedTitle: 'Detailed Test Case Verification Results'
    },
    methodology: {
      badge: 'Technical Specification',
      title: 'Documented Recommendation Method & System Limitations',
      subtitle: 'Comprehensive scientific documentation of the mathematical recommendation architecture, biological response functions, weight redistribution mechanics, and inherent agronomic limitations.',
      disclaimerTitle: 'Statutory Disclaimer & Ethical AI Decision-Support Mandate',
      mathTitle: '1. Recommendation Method: Continuous Trapezoidal Scoring Architecture',
      limitationsTitle: '2. System Limitations & Scientific Boundary Conditions',
      sourcesTitle: '3. Institutional Agronomic Data Sources'
    },
    compare: {
      emptyTitle: 'No Crops Selected for Comparison',
      emptyDesc: 'Select at least two crops from the recommendations list to see a comprehensive side-by-side trade-off analysis.',
      quickAdd: 'Quick Add From Top Ranked Crops:',
      title: 'Side-by-Side Trade-off Analysis',
      clearAll: 'Clear Comparison'
    },
    saved: {
      emptyTitle: 'No Saved Farm Audits Yet',
      emptyDesc: 'When you analyze a farm profile or generate an advisory report, you can save it here for quick reference and reloading.',
      createNewBtn: 'Create New Farm Evaluation',
      title: 'Local Storage Farm Evaluation History',
      loadAudit: 'Load Parameters',
      deleteAudit: 'Delete Record',
      clearAll: 'Clear History'
    },
    report: {
      printBtn: 'Print Audit Document',
      exportJsonBtn: 'Export Raw JSON Data',
      saveAuditBtn: 'Save to Audit History',
      title: 'Farm Agronomic Audit & Crop Feasibility Assessment',
      subtitle: 'Multi-Factor Edaphic & Climatic Evaluation Report'
    },
    suitability: {
      highly: 'Highly Suitable',
      moderately: 'Moderately Suitable',
      marginally: 'Marginally Suitable',
      notRecommended: 'Not Recommended'
    },
    seasons: {
      kharif: 'Kharif (Monsoon)',
      rabi: 'Rabi (Winter)',
      zaid: 'Zaid (Summer)',
      wholeYear: 'Perennial / Year-Round'
    }
  },
  hi: {
    appName: 'एग्रोगाइड डीएसएस',
    appSubtitle: 'फसल सिफारिश एवं कृषि निर्णय सहायता प्रणाली',
    advisoryAlert: 'कृषि सलाहकार प्रोटोटाइप: यह अनुमान एफएओ और आईसीएआर मानकों पर आधारित हैं। बुवाई से पूर्व कृषि विज्ञान केंद्र (KVK) से संपर्क करें।',
    tabs: {
      form: 'खेत विवरण',
      results: 'अनुशंसित फसलें',
      fertilizer: 'उर्वरक सलाह',
      compare: 'फसल तुलना',
      evaluation: 'मॉडल मूल्यांकन',
      testReport: 'परीक्षण रिपोर्ट',
      methodology: 'कार्यप्रणाली व सीमाएं',
      saved: 'सहेजे गए ऑडिट',
      report: 'ऑडिट रिपोर्ट'
    },
    form: {
      step1: 'चरण 1 • खेत के मापदंड',
      title: 'मृदा एवं जलवायु मापदंड',
      subtitle: 'सटीक फसल सिफारिश हेतु अपनी मिट्टी और मौसम की जानकारी दर्ज करें।',
      farmerNameLabel: 'किसान / उद्यम का नाम',
      farmerLocationLabel: 'खेत का स्थान / जिला',
      soilType: 'मिट्टी का प्रकार',
      soilPh: 'मृदा पीएच (pH)',
      npkToggle: 'मृदा एन-पी-के (N-P-K) परीक्षण मान शामिल करें',
      nitrogen: 'उपलब्ध नाइट्रोजन (N)',
      phosphorus: 'उपलब्ध फास्फोरस (P)',
      potassium: 'उपलब्ध पोटाश (K)',
      rainfall: 'वार्षिक / मौसमी वर्षा',
      temperature: 'औसत तापमान',
      humidity: 'सापेक्षिक आर्द्रता (नमी)',
      season: 'बुवाई का मौसम',
      evaluateBtn: 'फसल सिफारिशें प्राप्त करें',
      resetBtn: 'रीसेट करें',
      liveWeatherBtn: 'लाइव मौसम प्राप्त करें (जीपीएस / शहर)',
      dataCompleteness: 'डेटा पूर्णता सूचकांक',
      highConfidence: 'उच्च विश्वसनीयता मूल्यांकन',
      moderateConfidence: 'मध्यम विश्वसनीयता (क्षेत्रीय औसत मान)',
            basicConfidence: 'बुनियादी सटीकता (अपूर्ण इनपुट)',
      autoFetchWeatherForVillage: 'मौसम प्राप्त करें',
      gpsDetectVillage: 'जीपीएस गाँव',
      locationHelper: 'भारत के किसी भी गाँव, ग्राम पंचायत, तहसील या 6 अंकों का पिन कोड खोजें'
    },
    weather: {
      badge: 'लाइव ओपन-मेटियो एपीआई',
      title: 'स्वचालित मौसम व जलवायु सिंक',
      subtitle: 'जीपीएस या शहर द्वारा तापमान, नमी और वर्षा का वास्तविक डेटा प्राप्त करें।',
      useGps: 'जीपीएस का उपयोग करें',
      searchPlaceholder: 'जिला या शहर खोजें (उदा. लुधियाना, सोलापुर, वाराणसी)...',
      lookupBtn: 'खोजें',
      quickSelectHub: 'या प्रमुख कृषि क्षेत्र चुनें:',
      liveBadge: 'लाइव',
      calibratedBadge: 'मॉडल अनुमान',
      applyToForm: 'फॉर्म में भरें',
            appliedSuccess: 'फॉर्म में मौसम लागू किया गया!',
      villageSearchPrompt: 'भारत के किसी भी गाँव, तहसील, ज़िला या पिन कोड को खोजें (उदा. रालेगण सिद्धि, कोथापल्ली, 221002)...',
      searching: 'भारतीय गाँवों और ज़िलों को खोज रहे हैं...',
      noResults: 'कोई गाँव नहीं मिला। ज़िले या राज्य का नाम लिखकर देखें।',
      detectedGps: 'जीपीएस द्वारा पहचाना गाँव',
      villageBadge: 'गाँव / बस्ती',
      tehsilBadge: 'तहसील / ब्लॉक',
      districtBadge: 'ज़िला',
      stateBadge: 'राज्य',
      allIndiaCoverage: 'संपूर्ण भारत कवरेज: 6,00,000+ गाँव और 780+ ज़िले',
      browseByState: 'राज्य व ज़िले अनुसार खोजें',
      selectState: 'राज्य / केंद्र शासित प्रदेश चुनें',
      selectDistrict: 'ज़िला चुनें'
    },
    seasonBanner: {
      activeSeason: 'वर्तमान मौसम',
      currentMonth: 'वर्तमान माह',
      peakSowing: 'मुख्य बुवाई अवधि',
      midSeason: 'फसल विकास व देखभाल',
      lateSowing: 'कटाई / आगामी तैयारी',
      syncBtn: 'वर्तमान मौसम लागू करें',
      filterActive: '✓ मौसमी फिल्टर चालू',
      filterInSeason: 'केवल मौसमी फसलें देखें',
      calendarBtn: 'फसल कैलेंडर',
      calendarTitle: 'राष्ट्रीय कृषि बुवाई एवं कटाई कैलेंडर (FAO / ICAR मानक)'
    },
    results: {
      fieldProfile: 'खेत प्रोफाइल:',
      adjustParams: 'मापदंड बदलें',
      fertilizerGuide: 'उर्वरक सलाह',
      allCategories: 'सभी श्रेणियां',
      allSuitability: 'सभी उपयुक्तता स्तर',
      searchPlaceholder: 'फसल का नाम खोजें...',
      topMatch: 'सर्वश्रेष्ठ पसंद',
      runnerUp: 'द्वितीय पसंद',
      thirdChoice: 'तृतीय पसंद',
      match: 'मेल',
      compareBtn: 'तुलना करें',
      auditBtn: 'विस्तृत कृषि ऑडिट',
      strengths: 'प्रमुख अनुकूल कारक',
      weaknesses: 'सीमाएं व जोखिम',
      warnings: 'महत्वपूर्ण कृषि चेतावनियां',
      amendments: 'आवश्यक मृदा व रासायनिक सुधार',
      dualEngineTitle: 'कलन विधि मॉडल:',
      rulesEngine: 'कृषि नियम (सतत)',
      knnEngine: 'k-NN समानता बेंचमार्क'
    },
    fertilizer: {
      badge: 'मृदा परीक्षण फसल अनुक्रिया (STCR)',
      title: 'सटीक उर्वरक एवं एकीकृत पोषण प्रबंधन',
      subtitle: 'भारतीय कृषि अनुसंधान परिषद (ICAR) और FAO मानकों पर आधारित पोषक तत्व गणना।',
      selectTargetCrop: 'लक्षित फसल चुनें:',
      baselineAlert: 'प्रयोगशाला मान उपलब्ध नहीं: गणना क्षेत्रीय मध्यम उर्वरता पर आधारित है। कृपया मिट्टी की जांच करवाएं।',
      nutrientStatusTitle: '1. मिट्टी में पोषक तत्वों की स्थिति व कमी',
      commercialProductsTitle: '2. अनुशंसित रासायनिक उर्वरक व मात्रा',
      splitScheduleTitle: '3. वैज्ञानिक विभाजन समय-सारणी (लीचिंग रोकथाम)',
      phAmendmentTitle: 'मृदा पीएच सुधार (चूना / जिप्सम)',
      biofertilizersTitle: 'जैव उर्वरक एवं जीवाणु संवर्धन',
      costEstimate: 'अनुमानित लागत:',
      bagsUnit: 'बोरी (50 किग्रा प्रत्येक)'
    },
    evaluation: {
      badge: 'प्रायोगिक मॉडल मूल्यांकन',
      title: 'कृषि मॉडल बनाम सत्यापित डेटासेट',
      subtitle: 'विभिन्न मिट्टी, वर्षा और पोषक तत्वों के डेटासेट पर सिफारिश प्रणाली का गहन परीक्षण।',
      runBtn: 'बेंचमार्क टेस्ट चलाएं',
      top1Accuracy: 'टॉप-1 सटीकता',
      top3Recall: 'टॉप-3 रिकॉल',
      macroF1: 'मैक्रो F1-स्कोर',
      macroPrecision: 'मैक्रो प्रिसिजन',
      knnBaseline: 'k-NN तुलना',
      perCropTableTitle: 'फसलवार प्रदर्शन मेट्रिक्स',
      confusionMatrixTitle: 'कन्फ्यूजन मैट्रिक्स',
      inspectorTitle: 'नमूना डेटा निरीक्षक'
    },
    testReport: {
      badge: 'स्वचालित परीक्षण सूट',
      title: 'कृषि इंजन सत्यापन व संक्षिप्त परीक्षण रिपोर्ट',
      subtitle: 'मानक कृषि-पारिस्थितिक परिदृश्यों और सीमांत तनाव परीक्षणों का स्वचालित सत्यापन।',
      rerunBtn: 'पुनः चलाएं',
      printBtn: 'रिपोर्ट प्रिंट करें',
      statusCard: 'परीक्षण स्थिति',
      latencyCard: 'औसत विलंबता',
      engineCard: 'इंजन संरचना',
      boundaryCard: 'तनाव सहनशीलता',
      comparisonTitle: 'एल्गोरिदम तुलना परिणाम (नियम बनाम k-NN)',
      detailedTitle: 'विस्तृत परीक्षण केस परिणाम'
    },
    methodology: {
      badge: 'तकनीकी विवरण',
      title: 'दस्तावेजीकृत सिफारिश विधि एवं सीमाएं',
      subtitle: 'गणितीय एल्गोरिदम, जैविक प्रतिक्रिया वक्र, भार पुनर्वितरण और अंतर्निहित सीमाओं का पूरा विवरण।',
      disclaimerTitle: 'वैधानिक अस्वीकरण व नैतिक एआई जनादेश',
      mathTitle: '1. सिफारिश विधि: सतत समलम्बाकार स्कोरिंग संरचना',
      limitationsTitle: '2. प्रणाली की सीमाएं और वैज्ञानिक सीमाएं',
      sourcesTitle: '3. आधिकारिक कृषि डेटा स्रोत'
    },
    compare: {
      emptyTitle: 'तुलना के लिए कोई फसल नहीं चुनी गई',
      emptyDesc: 'तुलना देखने के लिए सिफारिश सूची में से कम से कम दो फसलें चुनें।',
      quickAdd: 'शीर्ष फसलों से तुरंत जोड़ें:',
      title: 'फसल तुलना व विश्लेषण',
      clearAll: 'तुलना साफ करें'
    },
    saved: {
      emptyTitle: 'कोई सहेजा गया ऑडिट नहीं है',
      emptyDesc: 'जब आप किसी खेत का विश्लेषण करते हैं, तो उसे त्वरित संदर्भ के लिए यहां सहेज सकते हैं।',
      createNewBtn: 'नया खेत मूल्यांकन शुरू करें',
      title: 'स्थानीय मेमोरी ऑडिट इतिहास',
      loadAudit: 'मापदंड लोड करें',
      deleteAudit: 'रिकॉर्ड हटाएं',
      clearAll: 'इतिहास साफ करें'
    },
    report: {
      printBtn: 'ऑडिट दस्तावेज प्रिंट करें',
      exportJsonBtn: 'JSON डेटा निर्यात करें',
      saveAuditBtn: 'ऑडिट इतिहास में सहेजें',
      title: 'खेत कृषि ऑडिट एवं फसल उपयुक्तता रिपोर्ट',
      subtitle: 'मृदा एवं जलवायु मूल्यांकन दस्तावेज'
    },
    suitability: {
      highly: 'अत्यधिक उपयुक्त',
      moderately: 'मध्यम उपयुक्त',
      marginally: 'सीमित उपयुक्त',
      notRecommended: 'अनुशंसित नहीं'
    },
    seasons: {
      kharif: 'खरीफ (मानसून)',
      rabi: 'रबी (शीतकालीन)',
      zaid: 'जायद (ग्रीष्मकालीन)',
      wholeYear: 'वार्षिक / बारहमासी'
    }
  },
  te: {
    appName: 'ఆగ్రోగైడ్ డీఎస్ఎస్',
    appSubtitle: 'పంట సిఫార్సు మరియు వ్యవసాయ నిర్ణయ మద్దతు వ్యవస్థ',
    advisoryAlert: 'వ్యవసాయ సలహా ప్రోటోటైప్: FAO మరియు ICAR ప్రమాణాల ఆధారంగా ఫలితాలు. స్థానిక కృషి విజ్ఞాన కేంద్రం (KVK) ను సంప్రదించండి.',
    tabs: {
      form: 'పొలం వివరాలు',
      results: 'సిఫార్సు పంటలు',
      fertilizer: 'ఎరువుల మార్గదర్శి',
      compare: 'పంటల పోలిక',
      evaluation: 'మోడల్ మూల్యాంకనం',
      testReport: 'పరీక్ష నివేదిక',
      methodology: 'పద్ధతి & పరిమితులు',
      saved: 'భద్రపరచినవి',
      report: 'ఆడిట్ నివేదిక'
    },
    form: {
      step1: 'దశ 1 • పొలం వివరాలు',
      title: 'నేల మరియు వాతావరణ పారామితులు',
      subtitle: 'సిఫార్సుల కోసం మీ నేల పరీక్ష మరియు వాతావరణ డేటాను నమోదు చేయండి.',
      farmerNameLabel: 'రైతు / సంస్థ పేరు',
      farmerLocationLabel: 'ప్రాంతం / జిల్లా',
      soilType: 'నేల రకం',
      soilPh: 'నేల పిహెచ్ (pH)',
      npkToggle: 'ఎన్‌పికె (N-P-K) ల్యాబ్ విలువలను చేర్చండి',
      nitrogen: 'నత్రజని (N)',
      phosphorus: 'భాస్వరం (P)',
      potassium: 'పొటాషియం (K)',
      rainfall: 'వర్షపాతం (మి.మీ)',
      temperature: 'ఉష్ణోగ్రత (°C)',
      humidity: 'తేమ శాతం (%)',
      season: 'సాగు సీజన్',
      evaluateBtn: 'సిఫార్సులు లెక్కించండి',
      resetBtn: 'రీసెట్ చేయండి',
      liveWeatherBtn: 'లైవ్ వాతావరణం తీసుకోండి',
      dataCompleteness: 'డేటా సమగ్రత',
      highConfidence: 'అధిక విశ్వసనీయత',
      moderateConfidence: 'మధ్యస్థ విశ్వసనీయత (ప్రాంతీయ సగటు)',
      basicConfidence: 'ప్రాథమిక స్థాయి',
      autoFetchWeatherForVillage: 'వాతావరణం పొందండి',
      gpsDetectVillage: 'జీపీఎస్ గ్రామం',
      locationHelper: 'భారతదేశంలోని ఏదైనా గ్రామం, పంచాయతీ, మండలం లేదా పిన్ కోడ్ నమోదు చేయండి'
    },
    weather: {
      badge: 'లైవ్ ఓపెన్-మెటియో API',
      title: 'స్వయంచాలక వాతావరణ సమకాలీకరణ',
      subtitle: 'GPS లేదా నగరం పేరు ద్వారా ఉష్ణోగ్రత, తేమ మరియు వర్షపాతం డేటాను పొందండి.',
      useGps: 'నా GPS ఉపయోగించండి',
      searchPlaceholder: 'జిల్లా లేదా నగరం పేరు నమోదు చేయండి...',
      lookupBtn: 'వెతకండి',
      quickSelectHub: 'ప్రధాన వ్యవసాయ జోన్ ఎంచుకోండి:',
      liveBadge: 'లైవ్',
      calibratedBadge: 'మోడల్ డేటా',
      applyToForm: 'ఫారమ్‌కు వర్తింపజేయండి',
      appliedSuccess: 'వాతావరణ వివరాలు వర్తింపజేయబడ్డాయి!',
      villageSearchPrompt: 'భారతదేశంలోని ఏ గ్రామమైనా, తహసీల్, జిల్లా లేదా పిన్ కోడ్ వెతకండి (ఉదా. కొత్తపల్లి, 500001)...',
      searching: 'గ్రామాలు మరియు జిల్లాలను శోధిస్తోంది...',
      noResults: 'గ్రామం కనుగొనబడలేదు. జిల్లా పేరును శోధించండి.',
      detectedGps: 'జీపీఎస్ ద్వారా గుర్తించిన గ్రామం',
      villageBadge: 'గ్రామం',
      tehsilBadge: 'మండలం / తాలూకా',
      districtBadge: 'జిల్లా',
      stateBadge: 'రాష్ట్రం',
      allIndiaCoverage: 'సమగ్ర భారతదేశం: 6,00,000+ గ్రామాలు & 780+ జిల్లాలు',
      browseByState: 'రాష్ట్రం & జిల్లా వారీగా శోధించండి',
      selectState: 'రాష్ట్రాన్ని ఎంచుకోండి',
      selectDistrict: 'జిల్లాను ఎంచుకోండి'
    },
    seasonBanner: {
      activeSeason: 'ప్రస్తుత సీజన్',
      currentMonth: 'ప్రస్తుత నెల',
      peakSowing: 'ప్రధాన విత్తే సమయం',
      midSeason: 'మధ్యస్థ పెరుగుదల దశ',
      lateSowing: 'కోత సమయం / సన్నద్ధత',
      syncBtn: 'ప్రస్తుత సీజన్ మార్చండి',
      filterActive: '✓ సీజన్ ఫిల్టర్ ఆన్‌లో ఉంది',
      filterInSeason: 'ఈ సీజన్ పంటలు మాత్రమే',
      calendarBtn: 'క్యాలెండర్',
      calendarTitle: 'జాతీయ పంటల క్యాలెండర్ (FAO / ICAR ప్రమాణాలు)'
    },
    results: {
      fieldProfile: 'పొలం సమాచారం:',
      adjustParams: 'వివరాలు సవరించండి',
      fertilizerGuide: 'ఎరువుల మార్గదర్శి',
      allCategories: 'అన్ని విభాగాలు',
      allSuitability: 'అన్ని అనుకూలతలు',
      searchPlaceholder: 'పంట పేరుతో వెతకండి...',
      topMatch: 'మొదటి ఎంపిక',
      runnerUp: 'రెండవ ఎంపిక',
      thirdChoice: 'మూడవ ఎంపిక',
      match: 'సరిపోలిక',
      compareBtn: 'పోల్చండి',
      auditBtn: 'పూర్తి ఆడిట్',
      strengths: 'అనుకూల అంశాలు',
      weaknesses: 'పరిమితులు & ప్రమాదాలు',
      warnings: 'ముఖ్యమైన హెచ్చరికలు',
      amendments: 'అవసరమైన నేల సవరణలు',
      dualEngineTitle: 'అల్గారిథమ్ మోడల్:',
      rulesEngine: 'వ్యవసాయ నియమాలు',
      knnEngine: 'k-NN పోలిక బెంచ్‌మార్క్'
    },
    fertilizer: {
      badge: 'సాయిల్ టెస్ట్ క్రాప్ రెస్పాన్స్ (STCR)',
      title: 'ఖచ్చితమైన ఎరువుల సమగ్ర పోషణ సలహా',
      subtitle: 'ICAR మరియు FAO ప్రమాణాల ఆధారంగా సమగ్ర ఎరువుల లెక్కలు.',
      selectTargetCrop: 'పంటను ఎంచుకోండి:',
      baselineAlert: 'ల్యాబ్ విలువలు లేవు: ప్రాంతీయ సగటు ఆధారంగా లెక్కించబడింది.',
      nutrientStatusTitle: '1. నేల పోషకాల స్థితి & లోటు',
      commercialProductsTitle: '2. సిఫార్సు చేసిన రసాయన ఎరువులు & మోతాదు',
      splitScheduleTitle: '3. ఎరువులు వేసే సమయాలు (దశలవారీగా)',
      phAmendmentTitle: 'నేల pH సవరణ (సున్నం / జిప్సం)',
      biofertilizersTitle: 'జీవ ఎరువులు & సూక్ష్మజీవులు',
      costEstimate: 'అంచనా ఖర్చు:',
      bagsUnit: 'బస్తాలు (50 కిలోలు)'
    },
    evaluation: {
      badge: 'మోడల్ మూల్యాంకనం',
      title: 'నిజమైన డేటాతో మోడల్ పరీక్ష',
      subtitle: 'వివిధ నేలలు మరియు వాతావరణాలలో సిఫార్సుల ఖచ్చితత్వాన్ని పరిశీలించండి.',
      runBtn: 'బెంచ్‌మార్క్ రన్ చేయండి',
      top1Accuracy: 'టాప్-1 ఖచ్చితత్వం',
      top3Recall: 'టాప్-3 రీకాల్',
      macroF1: 'మాక్రో F1-స్కోరు',
      macroPrecision: 'ఖచ్చితత్వ నిష్పత్తి',
      knnBaseline: 'k-NN బేస్‌లైన్',
      perCropTableTitle: 'పంటల వారీగా గణాంకాలు',
      confusionMatrixTitle: 'కన్ఫ్యూజన్ మాట్రిక్స్',
      inspectorTitle: 'నమూనా డేటా తనిఖీ'
    },
    testReport: {
      badge: 'ఆటోమేటెడ్ టెస్ట్ సూట్',
      title: 'ఇంజన్ ధృవీకరణ & పరీక్ష నివేదిక',
      subtitle: 'వివిధ ప్రమాణాల ప్రకారం వ్యవస్థ పనితీరును స్వయంచాలకంగా పరీక్షించండి.',
      rerunBtn: 'మళ్లీ పరీక్షించండి',
      printBtn: 'నివేదిక ప్రింట్ చేయండి',
      statusCard: 'పరీక్ష స్థితి',
      latencyCard: 'సగటు వేగం',
      engineCard: 'ఆర్కిటెక్చర్',
      boundaryCard: 'సహన శక్తి',
      comparisonTitle: 'అల్గారిథమ్ పోలిక ఫలితాలు',
      detailedTitle: 'వివరణాత్మక పరీక్ష ఫలితాలు'
    },
    methodology: {
      badge: 'సాంకేతిక వివరాలు',
      title: 'సిఫార్సు పద్ధతి & పరిమితులు',
      subtitle: 'గణిత సూత్రాలు, పద్ధతులు మరియు వ్యవసాయ పరిమితుల పూర్తి వివరణ.',
      disclaimerTitle: 'చట్టపరమైన హెచ్చరిక & సలహా విధానం',
      mathTitle: '1. సిఫార్సు పద్ధతి: ట్రాపెజాయిడల్ స్కోరింగ్ విధానం',
      limitationsTitle: '2. వ్యవస్థ పరిమితులు',
      sourcesTitle: '3. అధికారిక డేటా మూలాలు'
    },
    compare: {
      emptyTitle: 'పోలిక కోసం ఏ పంట ఎంపిక కాలేదు',
      emptyDesc: 'పోల్చడానికి కనీసం రెండు పంటలను ఎంచుకోండి.',
      quickAdd: 'ముఖ్య పంటలను చేర్చండి:',
      title: 'పంటల సమగ్ర పోలిక',
      clearAll: 'అన్నీ తొలగించండి'
    },
    saved: {
      emptyTitle: 'భద్రపరచిన ఆడిట్‌లు లేవు',
      emptyDesc: 'భవిష్యత్తు సూచన కోసం మీ పొలం వివరాలను ఇక్కడ భద్రపరుచుకోవచ్చు.',
      createNewBtn: 'కొత్త మూల్యాంకనం ప్రారంభించండి',
      title: 'భద్రపరచిన పొలం రికార్డులు',
      loadAudit: 'వివరాలు లోడ్ చేయండి',
      deleteAudit: 'తొలగించండి',
      clearAll: 'మొత్తం క్లియర్ చేయండి'
    },
    report: {
      printBtn: 'ఆడిట్ పత్రం ప్రింట్ చేయండి',
      exportJsonBtn: 'JSON ఎగుమతి చేయండి',
      saveAuditBtn: 'రికార్డులలో భద్రపరచండి',
      title: 'పొలం వ్యవసాయ ఆడిట్ & పంట సాధ్యాసాధ్యాల నివేదిక',
      subtitle: 'సమగ్ర మూల్యాంకన పత్రం'
    },
    suitability: {
      highly: 'అత్యంత అనుకూలం',
      moderately: 'మధ్యస్థ అనుకూలం',
      marginally: 'కొద్దిగా అనుకూలం',
      notRecommended: 'సిఫార్సు చేయబడలేదు'
    },
    seasons: {
      kharif: 'ఖరీఫ్ (వర్షాకాలం)',
      rabi: 'రబీ (శీతాకాలం)',
      zaid: 'జాయెద్ (వేసవి)',
      wholeYear: 'సంవత్సరమంతా'
    }
  },
  ta: {
    appName: 'அக்ரோகைடு டிஎஸ்எஸ்',
    appSubtitle: 'பயிர் பரிந்துரை & வேளாண் முடிவு ஆதரவு அமைப்பு',
    advisoryAlert: 'வேளாண் ஆலோசனை முன்மாதிரி: FAO & ICAR அடிப்படையிலான முடிவுகள். உள்ளூர் வேளாண் அறிவியல் மையத்தை (KVK) அணுகவும்.',
    tabs: {
      form: 'பண்ணை உள்ளீடுகள்',
      results: 'பரிந்துரைக்கப்பட்ட பயிர்கள்',
      fertilizer: 'உர வழிகாட்டி',
      compare: 'பயிர் ஒப்பீடு',
      evaluation: 'மாதிரி மதிப்பீடு',
      testReport: 'சோதனை அறிக்கை',
      methodology: 'முறை & வரம்புகள்',
      saved: 'சேமிக்கப்பட்டவை',
      report: 'ஆடிட் அறிக்கை'
    },
    form: {
      step1: 'படி 1 • நில அளவீடுகள்',
      title: 'மண் மற்றும் காலநிலை அளவீடுகள்',
      subtitle: 'பயிர் பரிந்துரைகளைப் பெற உங்கள் மண் பரிசோதனை மற்றும் வானிலை தகவல்களை உள்ளிடவும்.',
      farmerNameLabel: 'விவசாயி / நிறுவன பெயர்',
      farmerLocationLabel: 'இடம் / மாவட்டம்',
      soilType: 'மண் வகை',
      soilPh: 'மண் அமிலத்தன்மை (pH)',
      npkToggle: 'NPK ஆய்வக முடிவுகளைச் சேர்க்கவும்',
      nitrogen: 'நைட்ரஜன் (N)',
      phosphorus: 'பாஸ்பரஸ் (P)',
      potassium: 'பொட்டாசியம் (K)',
      rainfall: 'மழைப்பொழிவு (மிமீ)',
      temperature: 'வெப்பநிலை (°C)',
      humidity: 'ஈரப்பதம் (%)',
      season: 'விதைப்பு பருவம்',
      evaluateBtn: 'பரிந்துரைகளைக் கணக்கிடுக',
      resetBtn: 'மீட்டமைக்க',
      liveWeatherBtn: 'நேரலை வானிலை பெறுக',
      dataCompleteness: 'தரவு முழுமை',
      highConfidence: 'உயர் துல்லியம்',
      moderateConfidence: 'மிதமான துல்லியம்',
            basicConfidence: 'அடிப்படை நம்பிக்கை (முழுமையற்ற அளவுருக்கள்)',
      autoFetchWeatherForVillage: 'வானிலையைப் பெறுக',
      gpsDetectVillage: 'ஜிபிஎஸ் கிராமம்',
      locationHelper: 'இந்தியாவின் எந்தவொரு கிராமம், பஞ்சாயத்து அல்லது 6 இலக்க பின்கோடை உள்ளிடவும்'
    },
    weather: {
      badge: 'நேரலை Open-Meteo API',
      title: 'தானியங்கி வானிலை ஒருங்கிணைப்பு',
      subtitle: 'GPS அல்லது மாவட்ட பெயர் மூலம் வானிலை தகவல்களைப் பெறவும்.',
      useGps: 'GPS பயன்படுத்து',
      searchPlaceholder: 'மாவட்டம் அல்லது ஊர் பெயர்...',
      lookupBtn: 'தேடுக',
      quickSelectHub: 'முக்கிய வேளாண் மண்டலம்:',
      liveBadge: 'நேரலை',
      calibratedBadge: 'மாதிரி கணிப்பு',
      applyToForm: 'படிவத்தில் சேர்க்கவும்',
            appliedSuccess: 'மதிப்புகள் படிவத்தில் சேர்க்கப்பட்டன!',
      villageSearchPrompt: 'இந்தியாவின் எந்தவொரு கிராமம், தாலுகா, மாவட்டம் அல்லது பின்கோடைத் தேடுங்கள்...',
      searching: 'கிராமங்கள் மற்றும் மாவட்டங்களைத் தேடுகிறது...',
      noResults: 'கிராமம் கிடைக்கவில்லை. மாவட்ட பெயரைத் தேடவும்.',
      detectedGps: 'ஜிபிஎஸ் கண்டறிந்த கிராமம்',
      villageBadge: 'கிராமம்',
      tehsilBadge: 'வட்டம் / தாலுகா',
      districtBadge: 'மாவட்டம்',
      stateBadge: 'மாநிலம்',
      allIndiaCoverage: 'முழு இந்திய கவரேஜ்: 6,00,000+ கிராமங்கள் & 780+ மாவட்டங்கள்',
      browseByState: 'மாநிலம் & மாவட்டம் மூலம் உலாவுக',
      selectState: 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்',
      selectDistrict: 'மாவட்டத்தைத் தேர்ந்தெடுக்கவும்'
    },
    seasonBanner: {
      activeSeason: 'தற்போதைய பருவம்',
      currentMonth: 'தற்போதைய மாதம்',
      peakSowing: 'விதைப்பு உச்சக்கட்டம்',
      midSeason: 'வளர்ச்சி பராமரிப்பு',
      lateSowing: 'அறுவடை காலம்',
      syncBtn: 'பருவத்தை மாற்றுக',
      filterActive: '✓ பருவ வடிகட்டி ஆன்',
      filterInSeason: 'பருவப் பயிர்கள் மட்டும்',
      calendarBtn: 'நாட்காட்டி',
      calendarTitle: 'தேசிய பயிர் சாகுபடி நாட்காட்டி'
    },
    results: {
      fieldProfile: 'பண்ணை விவரம்:',
      adjustParams: 'அளவீடுகளை மாற்று',
      fertilizerGuide: 'உர வழிகாட்டி',
      allCategories: 'அனைத்து பிரிவுகள்',
      allSuitability: 'அனைத்து நிலைகள்',
      searchPlaceholder: 'பயிர் பெயரைத் தேடவும்...',
      topMatch: 'சிறந்த தேர்வு',
      runnerUp: 'இரண்டாம் தேர்வு',
      thirdChoice: 'மூன்றாம் தேர்வு',
      match: 'பொருத்தம்',
      compareBtn: 'ஒப்பிடு',
      auditBtn: 'முழு விவரங்கள்',
      strengths: 'சாதகமான காரணிகள்',
      weaknesses: 'வரம்புகள் & அபாயங்கள்',
      warnings: 'முக்கிய எச்சரிக்கைகள்',
      amendments: 'மண் மேம்பாட்டு நடவடிக்கைகள்',
      dualEngineTitle: 'கணிப்பு மாதிரி:',
      rulesEngine: 'வேளாண் விதிகள்',
      knnEngine: 'k-NN ஒற்றுமை ஒப்பீடு'
    },
    fertilizer: {
      badge: 'மண் பரிசோதனை பயிர் விளைச்சல் (STCR)',
      title: 'துல்லிய உர மற்றும் ஊட்டச்சத்து மேலாண்மை',
      subtitle: 'ICAR மற்றும் FAO வழிகாட்டுதலின்படி உரம் மற்றும் சத்துக்கள் கணக்கீடு.',
      selectTargetCrop: 'பயிரைத் தேர்ந்தெடுக்கவும்:',
      baselineAlert: 'ஆய்வக முடிவுகள் இல்லை: பிராந்திய சராசரி அடிப்படையில் கணக்கிடப்பட்டுள்ளது.',
      nutrientStatusTitle: '1. மண் சத்து நிலை & பற்றாக்குறை',
      commercialProductsTitle: '2. பரிந்துரைக்கப்படும் உரங்கள் & அளவு',
      splitScheduleTitle: '3. உரமிடும் கால அட்டவணை',
      phAmendmentTitle: 'மண் pH சீரமைப்பு (சுண்ணாம்பு / ஜிப்சம்)',
      biofertilizersTitle: 'உயிர் உரங்கள் & நுண்ணுயிரிகள்',
      costEstimate: 'மதிப்பிடப்பட்ட செலவு:',
      bagsUnit: 'மூட்டைகள் (50 கிலோ)'
    },
    evaluation: {
      badge: 'மாதிரி மதிப்பீடு',
      title: 'உண்மைத் தரவுகளுடன் மாதிரி ஒப்பீடு',
      subtitle: 'பல்வேறு மண் மற்றும் வானிலையில் பயிர் பரிந்துரையின் துல்லியத்தை சரிபார்க்கவும்.',
      runBtn: 'மதிப்பீடு இயக்கு',
      top1Accuracy: 'டாப்-1 துல்லியம்',
      top3Recall: 'டாப்-3 மீட்பு',
      macroF1: 'மேக்ரோ F1-மதிப்பெண்',
      macroPrecision: 'துல்லிய விகிதம்',
      knnBaseline: 'k-NN ஒப்பீடு',
      perCropTableTitle: 'பயிர் வாரியான புள்ளிவிவரங்கள்',
      confusionMatrixTitle: 'குழப்ப அணி (Confusion Matrix)',
      inspectorTitle: 'தரவு ஆய்வாளர்'
    },
    testReport: {
      badge: 'தானியங்கி சோதனை தொகுப்பு',
      title: 'அமைப்பு சரிபார்ப்பு & சோதனை அறிக்கை',
      subtitle: 'பல்வேறு வேளாண் சூழல்களில் அமைப்பின் செயல்பாட்டை சோதித்தல்.',
      rerunBtn: 'மீண்டும் இயக்கு',
      printBtn: 'அச்சிடுக',
      statusCard: 'சோதனை நிலை',
      latencyCard: 'செயல் வேக அளவு',
      engineCard: 'கட்டமைப்பு',
      boundaryCard: 'தாங்கும் திறன்',
      comparisonTitle: 'வழிமுறை ஒப்பீட்டு முடிவுகள்',
      detailedTitle: 'விரிவான சோதனை முடிவுகள்'
    },
    methodology: {
      badge: 'தொழில்நுட்ப விவரம்',
      title: 'பரிந்துரை முறை & வரம்புகள்',
      subtitle: 'கணித சூத்திரங்கள் மற்றும் அமைப்பின் வரம்புகள் பற்றிய முழு ஆவணம்.',
      disclaimerTitle: 'சட்டரீதியான பொறுப்புத்துறப்பு',
      mathTitle: '1. பரிந்துரை முறை: ட்ரெப்சாய்டல் மதிப்பீட்டு முறை',
      limitationsTitle: '2. அமைப்பின் வரம்புகள்',
      sourcesTitle: '3. அதிகாரப்பூர்வ வேளாண் தகவல் மூலங்கள்'
    },
    compare: {
      emptyTitle: 'ஒப்பீட்டிற்கு பயிர் தேர்வு செய்யப்படவில்லை',
      emptyDesc: 'ஒப்பிட குறைந்தது இரண்டு பயிர்களைத் தேர்ந்தெடுக்கவும்.',
      quickAdd: 'முக்கிய பயிர்களை சேர்க்க:',
      title: 'பயிர்களின் விரிவான ஒப்பீடு',
      clearAll: 'நீக்குக'
    },
    saved: {
      emptyTitle: 'சேமிக்கப்பட்ட பதிவுகள் இல்லை',
      emptyDesc: 'எதிர்கால தேவைக்கு உங்கள் பண்ணை விவரங்களை இங்கே சேமிக்கலாம்.',
      createNewBtn: 'புதிய மதிப்பீடு தொடங்கவும்',
      title: 'சேமிக்கப்பட்ட பதிவுகள்',
      loadAudit: 'பதிவை ஏற்றுக',
      deleteAudit: 'நீக்குக',
      clearAll: 'அனைத்தையும் அழிக்க'
    },
    report: {
      printBtn: 'அறிக்கையை அச்சிடுக',
      exportJsonBtn: 'JSON ஏற்றுமதி',
      saveAuditBtn: 'பதிவுகளில் சேமிக்க',
      title: 'வேளாண் தணிக்கை & பயிர் சாத்தியக்கூறு அறிக்கை',
      subtitle: 'விரிவான பண்ணை மதிப்பீட்டு ஆவணம்'
    },
    suitability: {
      highly: 'மிகவும் பொருத்தமானது',
      moderately: 'மிதமான பொருத்தம்',
      marginally: 'குறைந்த பொருத்தம்',
      notRecommended: 'பரிந்துரைக்கப்படவில்லை'
    },
    seasons: {
      kharif: 'காரிஃப் (மழைக்காலம்)',
      rabi: 'ரபி (குளிர்காலம்)',
      zaid: 'சையத் (கோடைகாலம்)',
      wholeYear: 'ஆண்டு முழுவதும்'
    }
  },
  pa: {
    appName: 'ਐਗਰੋਗਾਈਡ ਡੀਐਸਐਸ',
    appSubtitle: 'ਫ਼ਸਲ ਸਿਫ਼ਾਰਸ਼ ਅਤੇ ਖੇਤੀਬਾੜੀ ਫ਼ੈਸਲਾ ਪ੍ਰਣਾਲੀ',
    advisoryAlert: 'ਖੇਤੀਬਾੜੀ ਸਲਾਹਕਾਰੀ ਪ੍ਰੋਟੋਟਾਈਪ: FAO ਅਤੇ ICAR ਮਿਆਰਾਂ \'ਤੇ ਅਧਾਰਤ। ਬਿਜਾਈ ਤੋਂ ਪਹਿਲਾਂ ਕ੍ਰਿਸ਼ੀ ਵਿਗਿਆਨ ਕੇਂਦਰ (KVK) ਨਾਲ ਸੰਪਰਕ ਕਰੋ।',
    tabs: {
      form: 'ਖੇਤ ਦੇ ਵੇਰਵੇ',
      results: 'ਸਿਫ਼ਾਰਸ਼ ਫ਼ਸਲਾਂ',
      fertilizer: 'ਖਾਦ ਗਾਈਡ',
      compare: 'ਫ਼ਸਲਾਂ ਦੀ ਤੁਲਨਾ',
      evaluation: 'ਮਾਡਲ ਮੁਲਾਂਕਣ',
      testReport: 'ਟੈਸਟ ਰਿਪੋਰਟ',
      methodology: 'ਢੰਗ ਤੇ ਸੀਮਾਵਾਂ',
      saved: 'ਸੰਭਾਲੇ ਆਡਿਟ',
      report: 'ਆਡਿਟ ਰਿਪੋਰਟ'
    },
    form: {
      step1: 'ਕਦਮ 1 • ਖੇਤ ਦੇ ਮਾਪਦੰਡ',
      title: 'ਮਿੱਟੀ ਅਤੇ ਮੌਸਮ ਦੇ ਮਾਪਦੰਡ',
      subtitle: 'ਸਹੀ ਸਿਫ਼ਾਰਸ਼ਾਂ ਲਈ ਆਪਣੀ ਮਿੱਟੀ ਟੈਸਟ ਅਤੇ ਮੌਸਮ ਜਾਣਕਾਰੀ ਦਰਜ ਕਰੋ।',
      farmerNameLabel: 'ਕਿਸਾਨ / ਫਾਰਮ ਦਾ ਨਾਂ',
      farmerLocationLabel: 'ਖੇਤ ਦਾ ਸਥਾਨ / ਜ਼ਿਲ੍ਹਾ',
      soilType: 'ਮਿੱਟੀ ਦੀ ਕਿਸਮ',
      soilPh: 'ਮਿੱਟੀ ਦਾ ਪੀਐਚ (pH)',
      npkToggle: 'NPK ਲੈਬ ਮੁੱਲ ਸ਼ਾਮਲ ਕਰੋ',
      nitrogen: 'ਨਾਈਟ੍ਰੋਜਨ (N)',
      phosphorus: 'ਫਾਸਫੋਰਸ (P)',
      potassium: 'ਪੋਟਾਸ਼ੀਅਮ (K)',
      rainfall: 'ਮੀਂਹ (ਮਿ.ਮੀ.)',
      temperature: 'ਤਾਪਮਾਨ (°C)',
      humidity: 'ਨਮੀ (%)',
      season: 'ਬਿਜਾਈ ਦਾ ਸੀਜ਼ਨ',
      evaluateBtn: 'ਫ਼ਸਲਾਂ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਲਓ',
      resetBtn: 'ਰੀਸੈਟ ਕਰੋ',
      liveWeatherBtn: 'ਲਾਈਵ ਮੌਸਮ ਲਵੋ',
      dataCompleteness: 'ਡਾਟਾ ਪੂਰਨਤਾ',
      highConfidence: 'ਉੱਚ ਵਿਸ਼ਵਾਸ ਪੱਧਰ',
      moderateConfidence: 'ਦਰਮਿਆਨਾ ਪੱਧਰ',
            basicConfidence: 'ਮੁੱਢਲਾ ਭਰੋਸਾ (ਅਧੂਰੇ ਪੈਰਾਮੀਟਰ)',
      autoFetchWeatherForVillage: 'ਮੌਸਮ ਪ੍ਰਾਪਤ ਕਰੋ',
      gpsDetectVillage: 'ਜੀਪੀਐਸ ਪਿੰਡ',
      locationHelper: 'ਭਾਰਤ ਦੇ ਕਿਸੇ ਵੀ ਪਿੰਡ, ਗ੍ਰਾਮ ਪੰਚਾਇਤ, ਤਹਿਸੀਲ ਜਾਂ 6 ਅੰਕਾਂ ਦਾ ਪਿੰਨ ਕੋਡ ਦਰਜ ਕਰੋ'
    },
    weather: {
      badge: 'ਲਾਈਵ ਓਪਨ-ਮੀਟੀਓ API',
      title: 'ਮੌਸਮ ਜਾਣਕਾਰੀ ਸਮਕਾਲੀਕਰਨ',
      subtitle: 'GPS ਜਾਂ ਸ਼ਹਿਰ ਦੀ ਭਾਲ ਕਰਕੇ ਤਾਪਮਾਨ ਅਤੇ ਮੀਂਹ ਦਾ ਡਾਟਾ ਭਰੋ।',
      useGps: 'ਮੇਰਾ GPS ਵਰਤੋ',
      searchPlaceholder: 'ਜ਼ਿਲ੍ਹਾ ਜਾਂ ਸ਼ਹਿਰ ਲਿਖੋ...',
      lookupBtn: 'ਭਾਲੋ',
      quickSelectHub: 'ਮੁੱਖ ਖੇਤੀ ਖੇਤਰ ਚੁਣੋ:',
      liveBadge: 'ਲਾਈਵ',
      calibratedBadge: 'ਮਾਡਲ ਡਾਟਾ',
      applyToForm: 'ਫਾਰਮ ਵਿੱਚ ਲਾਗੂ ਕਰੋ',
            appliedSuccess: 'ਮੁੱਲ ਫਾਰਮ ਵਿੱਚ ਲਾਗੂ ਕੀਤੇ ਗਏ!',
      villageSearchPrompt: 'ਭਾਰਤ ਦੇ ਕਿਸੇ ਵੀ ਪਿੰਡ, ਤਹਿਸੀਲ, ਜ਼ਿਲ੍ਹਾ ਜਾਂ ਪਿੰਨ ਕੋਡ ਦੀ ਖੋਜ ਕਰੋ (ਜਿਵੇਂ ਰਾਲੇਗਣ ਸਿੱਧੀ, ਮੋਗਾ, 141001)...',
      searching: 'ਭਾਰਤੀ ਪਿੰਡਾਂ ਅਤੇ ਜ਼ਿਲ੍ਹਿਆਂ ਦੀ ਖੋਜ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...',
      noResults: 'ਕੋਈ ਪਿੰਡ ਨਹੀਂ ਮਿਲਿਆ। ਜ਼ਿਲ੍ਹੇ ਦੇ ਨਾਮ ਨਾਲ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
      detectedGps: 'ਜੀਪੀਐਸ ਦੁਆਰਾ ਪਛਾਣਿਆ ਪਿੰਡ',
      villageBadge: 'ਪਿੰਡ',
      tehsilBadge: 'ਤਹਿਸੀਲ / ਬਲਾਕ',
      districtBadge: 'ਜ਼ਿਲ੍ਹਾ',
      stateBadge: 'ਸੂਬਾ',
      allIndiaCoverage: 'ਪੂਰੇ ਭਾਰਤ ਦਾ ਕਵਰੇਜ: 6,00,000+ ਪਿੰਡ ਅਤੇ 780+ ਜ਼ਿਲ੍ਹੇ',
      browseByState: 'ਸੂਬੇ ਅਤੇ ਜ਼ਿਲ੍ਹੇ ਅਨੁਸਾਰ ਦੇਖੋ',
      selectState: 'ਸੂਬਾ ਚੁਣੋ',
      selectDistrict: 'ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ'
    },
    seasonBanner: {
      activeSeason: 'ਮੌਜੂਦਾ ਸੀਜ਼ਨ',
      currentMonth: 'ਮੌਜੂਦਾ ਮਹੀਨਾ',
      peakSowing: 'ਮੁੱਖ ਬਿਜਾਈ ਸਮਾਂ',
      midSeason: 'ਵਿਕਾਸ ਤੇ ਸੰਭਾਲ',
      lateSowing: 'ਵਾਢੀ ਦਾ ਸਮਾਂ',
      syncBtn: 'ਮੌਜੂਦਾ ਸੀਜ਼ਨ ਚੁਣੋ',
      filterActive: '✓ ਸੀਜ਼ਨ ਫਿਲਟਰ ਚਾਲੂ',
      filterInSeason: 'ਸਿਰਫ਼ ਮੌਸਮੀ ਫ਼ਸਲਾਂ',
      calendarBtn: 'ਕੈਲੰਡਰ',
      calendarTitle: 'ਰਾਸ਼ਟਰੀ ਖੇਤੀਬਾੜੀ ਕੈਲੰਡਰ'
    },
    results: {
      fieldProfile: 'ਖੇਤ ਵੇਰਵਾ:',
      adjustParams: 'ਮਾਪਦੰਡ ਬਦਲੋ',
      fertilizerGuide: 'ਖਾਦ ਗਾਈਡ',
      allCategories: 'ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ',
      allSuitability: 'ਸਾਰੇ ਪੱਧਰ',
      searchPlaceholder: 'ਫ਼ਸਲ ਦਾ ਨਾਂ ਲਿਖੋ...',
      topMatch: 'ਪਹਿਲੀ ਪਸੰਦ',
      runnerUp: 'ਦੂਜੀ ਪਸੰਦ',
      thirdChoice: 'ਤੀਜੀ ਪਸੰਦ',
      match: 'ਮੇਲ',
      compareBtn: 'ਤੁਲਨਾ ਕਰੋ',
      auditBtn: 'ਵੇਰਵਾ ਦੇਖੋ',
      strengths: 'ਅਨੁਕੂਲ ਕਾਰਕ',
      weaknesses: 'ਕਮੀਆਂ ਤੇ ਜੋਖਮ',
      warnings: 'ਜ਼ਰੂਰੀ ਚੇਤਾਵਨੀਆਂ',
      amendments: 'ਲੋੜੀਂਦੇ ਸੁਧਾਰ',
      dualEngineTitle: 'ਇੰਜਣ ਮਾਡਲ:',
      rulesEngine: 'ਖੇਤੀਬਾੜੀ ਨਿਯਮ',
      knnEngine: 'k-NN ਸਮਾਨਤਾ ਬੈਂਚਮਾਰਕ'
    },
    fertilizer: {
      badge: 'ਮਿੱਟੀ ਪਰਖ ਅਧਾਰਤ ਖਾਦ (STCR)',
      title: 'ਸਟੀਕ ਖਾਦ ਅਤੇ ਪੋਸ਼ਣ ਪ੍ਰਬੰਧਨ',
      subtitle: 'ICAR ਅਤੇ FAO ਅਨੁਸਾਰ ਸੰਤੁਲਿਤ ਖਾਦਾਂ ਦੀ ਗਣਨਾ।',
      selectTargetCrop: 'ਫ਼ਸਲ ਚੁਣੋ:',
      baselineAlert: 'ਲੈਬ ਰਿਪੋਰਟ ਨਹੀਂ ਮਿਲੀ: ਖੇਤਰੀ ਔਸਤ ਅਨੁਸਾਰ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਗਈ ਹੈ।',
      nutrientStatusTitle: '1. ਮਿੱਟੀ ਵਿੱਚ ਤੱਤਾਂ ਦੀ ਘਾਟ',
      commercialProductsTitle: '2. ਰਸਾਇਣਕ ਖਾਦਾਂ ਦੀ ਮਾਤਰਾ',
      splitScheduleTitle: '3. ਖਾਦ ਪਾਉਣ ਦੇ ਪੜਾਅ',
      phAmendmentTitle: 'ਮਿੱਟੀ ਸੁਧਾਰ (ਚੂਨਾ / ਜਿਪਸਮ)',
      biofertilizersTitle: 'ਜੈਵਿਕ ਖਾਦਾਂ',
      costEstimate: 'ਅੰਦਾਜ਼ਨ ਲਾਗਤ:',
      bagsUnit: 'ਬੋਰੀਆਂ (50 ਕਿਲੋ)'
    },
    evaluation: {
      badge: 'ਮਾਡਲ ਮੁਲਾਂਕਣ',
      title: 'ਅਸਲ ਡਾਟਾ ਬਨਾਮ ਸਿਫ਼ਾਰਸ਼ਾਂ',
      subtitle: 'ਵੱਖ-ਵੱਖ ਮਿੱਟੀਆਂ ਅਤੇ ਮੌਸਮਾਂ ਵਿੱਚ ਮਾਡਲ ਦੀ ਪਰਖ ਕਰੋ।',
      runBtn: 'ਬੈਂਚਮਾਰਕ ਚਲਾਓ',
      top1Accuracy: 'ਟਾਪ-1 ਸ਼ੁੱਧਤਾ',
      top3Recall: 'ਟਾਪ-3 ਰੀਕਾਲ',
      macroF1: 'F1-ਸਕੋਰ',
      macroPrecision: 'ਸ਼ੁੱਧਤਾ',
      knnBaseline: 'k-NN ਤੁਲਨਾ',
      perCropTableTitle: 'ਫ਼ਸਲਵਾਰ ਅੰਕੜੇ',
      confusionMatrixTitle: 'ਕਨਫਿਊਜ਼ਨ ਮੈਟ੍ਰਿਕਸ',
      inspectorTitle: 'ਨਮੂਨਾ ਡਾਟਾ ਪਰਖ'
    },
    testReport: {
      badge: 'ਟੈਸਟ ਸਿਸਟਮ',
      title: 'ਸਿਸਟਮ ਪਰਖ ਤੇ ਰਿਪੋਰਟ',
      subtitle: 'ਸਵੈਚਲਿਤ ਟੈਸਟਾਂ ਰਾਹੀਂ ਪ੍ਰਣਾਲੀ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ।',
      rerunBtn: 'ਦੁਬਾਰਾ ਚਲਾਓ',
      printBtn: 'ਪ੍ਰਿੰਟ ਕਰੋ',
      statusCard: 'ਟੈਸਟ ਸਥਿਤੀ',
      latencyCard: 'ਔਸਤ ਸਮਾਂ',
      engineCard: 'ਢਾਂਚਾ',
      boundaryCard: 'ਸਹਿਣਸ਼ੀਲਤਾ',
      comparisonTitle: 'ਤੁਲਨਾ ਨਤੀਜੇ',
      detailedTitle: 'ਵੇਰਵੇ ਸਹਿਤ ਨਤੀਜੇ'
    },
    methodology: {
      badge: 'ਤਕਨੀਕੀ ਜਾਣਕਾਰੀ',
      title: 'ਸਿਫ਼ਾਰਸ਼ ਵਿਧੀ ਅਤੇ ਸੀਮਾਵਾਂ',
      subtitle: 'ਗਣਿਤਕ ਫਾਰਮੂਲੇ ਅਤੇ ਸਿਸਟਮ ਦੀਆਂ ਸੀਮਾਵਾਂ ਦਾ ਪੂਰਾ ਵੇਰਵਾ।',
      disclaimerTitle: 'ਕਾਨੂੰਨੀ ਚੇਤਾਵਨੀ',
      mathTitle: '1. ਸਿਫ਼ਾਰਸ਼ ਵਿਧੀ: ਸਕੋਰਿੰਗ ਢਾਂਚਾ',
      limitationsTitle: '2. ਪ੍ਰਣਾਲੀ ਦੀਆਂ ਸੀਮਾਵਾਂ',
      sourcesTitle: '3. ਡਾਟਾ ਸਰੋਤ'
    },
    compare: {
      emptyTitle: 'ਤੁਲਨਾ ਲਈ ਕੋਈ ਫ਼ਸਲ ਨਹੀਂ ਚੁਣੀ ਗਈ',
      emptyDesc: 'ਤੁਲਨਾ ਕਰਨ ਲਈ ਘੱਟੋ-ਘੱਟ ਦੋ ਫ਼ਸਲਾਂ ਚੁਣੋ।',
      quickAdd: 'ਮੁੱਖ ਫ਼ਸਲਾਂ ਸ਼ਾਮਲ ਕਰੋ:',
      title: 'ਫ਼ਸਲਾਂ ਦੀ ਤੁਲਨਾ',
      clearAll: 'ਸਭ ਹਟਾਓ'
    },
    saved: {
      emptyTitle: 'ਕੋਈ ਸੰਭਾਲਿਆ ਆਡਿਟ ਨਹੀਂ ਹੈ',
      emptyDesc: 'ਆਪਣੇ ਖੇਤ ਦੀ ਜਾਣਕਾਰੀ ਇੱਥੇ ਸੰਭਾਲ ਸਕਦੇ ਹੋ।',
      createNewBtn: 'ਨਵਾਂ ਮੁਲਾਂਕਣ ਕਰੋ',
      title: 'ਸੰਭਾਲਿਆ ਆਡਿਟ ਇਤਿਹਾਸ',
      loadAudit: 'ਵੇਰਵਾ ਲੋਡ ਕਰੋ',
      deleteAudit: 'ਹਟਾਓ',
      clearAll: 'ਸਭ ਸਾਫ਼ ਕਰੋ'
    },
    report: {
      printBtn: 'ਪ੍ਰਿੰਟ ਕਰੋ',
      exportJsonBtn: 'JSON ਐਕਸਪੋਰਟ',
      saveAuditBtn: 'ਸੰਭਾਲੋ',
      title: 'ਖੇਤ ਆਡਿਟ ਤੇ ਫ਼ਸਲ ਅਨੁਕੂਲਤਾ ਰਿਪੋਰਟ',
      subtitle: 'ਮੁਲਾਂਕਣ ਦਸਤਾਵੇਜ਼'
    },
    suitability: {
      highly: 'ਬਹੁਤ ਢੁਕਵਾਂ',
      moderately: 'ਦਰਮਿਆਨਾ ਢੁਕਵਾਂ',
      marginally: 'ਥੋੜ੍ਹਾ ਢੁਕਵਾਂ',
      notRecommended: 'ਸਿਫ਼ਾਰਸ਼ ਨਹੀਂ'
    },
    seasons: {
      kharif: 'ਖ਼ਰੀਫ਼ (ਮੌਨਸੂਨ)',
      rabi: 'ਹਾੜੀ / ਰਬੀ (ਸਰਦੀ)',
      zaid: 'ਜ਼ਾਇਦ (ਗਰਮੀਆਂ)',
      wholeYear: 'ਸਾਰਾ ਸਾਲ'
    }
  },
  mr: {
    appName: 'ॲग्रोगाइड डीएसएस',
    appSubtitle: 'पीक शिफारस व शेती निर्णय सहाय्य प्रणाली',
    advisoryAlert: 'कृषी सल्लागार प्रणाली: FAO आणि ICAR निकषांवर आधारित अंदाज. पेरणीपूर्वी कृषी विज्ञान केंद्र (KVK) चा सल्ला घ्या.',
    tabs: {
      form: 'शेती माहिती',
      results: 'शिफारस पिके',
      fertilizer: 'खत मार्गदर्शन',
      compare: 'पीक तुलना',
      evaluation: 'मॉडेल मूल्यांकन',
      testReport: 'चाचणी अहवाल',
      methodology: 'पद्धती व मर्यादा',
      saved: 'जतन केलेले',
      report: 'ऑडिट अहवाल'
    },
    form: {
      step1: 'पायरी १ • शेतीचे मापदंड',
      title: 'मृदा आणि हवामान मापदंड',
      subtitle: 'पीक शिफारसींसाठी माती परीक्षण आणि हवामानाची माहिती प्रविष्ट करा.',
      farmerNameLabel: 'शेतकरी / संस्थेचे नाव',
      farmerLocationLabel: 'शेताचे ठिकाण / जिल्हा',
      soilType: 'मातीचा प्रकार',
      soilPh: 'मातीचा सामू (pH)',
      npkToggle: 'NPK प्रयोगशाळा नोंदी समाविष्ट करा',
      nitrogen: 'नायट्रोजन (N)',
      phosphorus: 'फॉस्फरस (P)',
      potassium: 'पोटॅशियम (K)',
      rainfall: 'पाऊस (मिमी)',
      temperature: 'तापमान (°C)',
      humidity: 'हवेतील आर्द्रता (%)',
      season: 'हंगाम',
      evaluateBtn: 'शिफारशी शोधा',
      resetBtn: 'रीसेट करा',
      liveWeatherBtn: 'थेट हवामान मिळवा',
      dataCompleteness: 'माहिती पूर्णता',
      highConfidence: 'उच्च अचूकता',
      moderateConfidence: 'मध्यम अचूकता',
            basicConfidence: 'मूलभूत अचूकता (अपूर्ण मापदंड)',
      autoFetchWeatherForVillage: 'हवामान मिळवा',
      gpsDetectVillage: 'जीपीएस गाव',
      locationHelper: 'भारतातील कोणत्याही गावाचे नाव, ग्रामपंचायत, तालुका किंवा 6 अंकी पिन कोड प्रविष्ट करा'
    },
    weather: {
      badge: 'थेट Open-Meteo API',
      title: 'स्वयंचलित हवामान माहिती',
      subtitle: 'GPS किंवा जिल्ह्याच्या नावाने तापमान, आर्द्रता व पावसाची माहिती मिळवा.',
      useGps: 'माझे GPS वापरा',
      searchPlaceholder: 'जिल्हा किंवा शहर शोधा...',
      lookupBtn: 'शोधा',
      quickSelectHub: 'प्रमुख कृषी विभाग निवडा:',
      liveBadge: 'थेट',
      calibratedBadge: 'मॉडेल डेटा',
      applyToForm: 'माहिती फॉर्ममध्ये भरा',
            appliedSuccess: 'फॉर्ममध्ये लागू केले!',
      villageSearchPrompt: 'भारतातील कोणतेही गाव, तालुका, जिल्हा किंवा पिन कोड शोधा (उदा. राळेगण सिद्धी, हिवरे बाजार, बारामती)...',
      searching: 'भारतीय गावे आणि जिल्हे शोधत आहे...',
      noResults: 'गाव सापडले नाही. जिल्ह्याच्या नावाने शोधा.',
      detectedGps: 'जीपीएसने शोधलेले गाव',
      villageBadge: 'गाव / वस्ती',
      tehsilBadge: 'तालुका',
      districtBadge: 'जिल्हा',
      stateBadge: 'राज्य',
      allIndiaCoverage: 'संपूर्ण भारत व्याप्ती: 6,00,000+ गावे आणि 780+ जिल्हे',
      browseByState: 'राज्य व जिल्ह्यानुसार शोधा',
      selectState: 'राज्य निवडा',
      selectDistrict: 'जिल्हा निवडा'
    },
    seasonBanner: {
      activeSeason: 'चालू हंगाम',
      currentMonth: 'चालू महिना',
      peakSowing: 'मुख्य पेरणी कालावधी',
      midSeason: 'पीक वाढ व काळजी',
      lateSowing: 'कापणीचा काळ',
      syncBtn: 'चालू हंगाम निवडा',
      filterActive: '✓ हंगाम फिल्टर चालू',
      filterInSeason: 'फक्त हंगामी पिके',
      calendarBtn: 'दिनदर्शिका',
      calendarTitle: 'राष्ट्रीय पीक पेरणी दिनदर्शिका'
    },
    results: {
      fieldProfile: 'शेताची माहिती:',
      adjustParams: 'मापदंड बदला',
      fertilizerGuide: 'खत मार्गदर्शन',
      allCategories: 'सर्व प्रकार',
      allSuitability: 'सर्व पातळी',
      searchPlaceholder: 'पिकाचे नाव शोधा...',
      topMatch: 'उत्तम पर्याय',
      runnerUp: 'दुसरा पर्याय',
      thirdChoice: 'तिसरा पर्याय',
      match: 'जुळणी',
      compareBtn: 'तुलना करा',
      auditBtn: 'तपशील',
      strengths: 'अनुकूल घटक',
      weaknesses: 'मर्यादा व धोके',
      warnings: 'महत्त्वाच्या सूचना',
      amendments: 'माती सुधारणा उपाय',
      dualEngineTitle: 'मॉडेल प्रकार:',
      rulesEngine: 'कृषी नियम',
      knnEngine: 'k-NN तुलना बेंचमार्क'
    },
    fertilizer: {
      badge: 'माती परीक्षणानुसार खत (STCR)',
      title: 'अचूक खत व पोषण व्यवस्थापन',
      subtitle: 'ICAR आणि FAO मार्गदर्शक तत्त्वांनुसार खतांचे संतुलित प्रमाण.',
      selectTargetCrop: 'पीक निवडा:',
      baselineAlert: 'लॅब अहवाल उपलब्ध नाही: प्रादेशिक सरासरीनुसार शिफारस केली आहे.',
      nutrientStatusTitle: '१. जमिनीतील पोषक घटकांची कमतरता',
      commercialProductsTitle: '२. रासायनिक खतांचे प्रमाण',
      splitScheduleTitle: '३. खते देण्याचे टप्पे',
      phAmendmentTitle: 'सामू सुधारणा (चुना / जिप्सम)',
      biofertilizersTitle: 'जैविक खते',
      costEstimate: 'अंदाजे खर्च:',
      bagsUnit: 'पोती (५० किलो)'
    },
    evaluation: {
      badge: 'मॉडेल मूल्यांकन',
      title: 'खरे आकडे बनाम शिफारस प्रणाली',
      subtitle: 'विविध जमिनी आणि हवामानात मॉडेलच्या अचूकतेची चाचणी घ्या.',
      runBtn: 'मूल्यांकन चालवा',
      top1Accuracy: 'टॉप-१ अचूकता',
      top3Recall: 'टॉप-३ रिकॉल',
      macroF1: 'F1-स्कोर',
      macroPrecision: 'अचूकता गुणोत्तर',
      knnBaseline: 'k-NN तुलना',
      perCropTableTitle: 'पीकनिहाय आकडेवारी',
      confusionMatrixTitle: 'कन्फ्यूजन मॅट्रिक्स',
      inspectorTitle: 'डेटा तपासणी'
    },
    testReport: {
      badge: 'चाचणी संच',
      title: 'प्रणाली पडताळणी अहवाल',
      subtitle: 'स्वयंचलित चाचण्यांद्वारे प्रणालीची खात्री करा.',
      rerunBtn: 'पुन्हा चालवा',
      printBtn: 'अहवाल प्रिंट करा',
      statusCard: 'चाचणी स्थिती',
      latencyCard: 'सरासरी वेळ',
      engineCard: 'रचना',
      boundaryCard: 'ताण सहनक्षमता',
      comparisonTitle: 'तुलना निकाल',
      detailedTitle: 'सविस्तर निकाल'
    },
    methodology: {
      badge: 'तांत्रिक माहिती',
      title: 'शिफारस पद्धती व मर्यादा',
      subtitle: 'गणितीय सूत्रे आणि प्रणालीच्या मर्यादांचे स्पष्टीकरण.',
      disclaimerTitle: 'कायदेशीर सूचना',
      mathTitle: '१. शिफारस पद्धती रचना',
      limitationsTitle: '२. प्रणालीच्या मर्यादा',
      sourcesTitle: '३. माहितीचे स्रोत'
    },
    compare: {
      emptyTitle: 'तुलनेसाठी पीक निवडलेले नाही',
      emptyDesc: 'तुलना पाहण्यासाठी किमान दोन पिके निवडा.',
      quickAdd: 'मुख्य पिके जोडा:',
      title: 'पिकांची तुलना',
      clearAll: 'सर्व काढा'
    },
    saved: {
      emptyTitle: 'जतन केलेले ऑडिट नाहीत',
      emptyDesc: 'पुढील संदर्भासाठी आपल्या शेताची माहिती येथे जतन करा.',
      createNewBtn: 'नवीन मूल्यांकन करा',
      title: 'जतन केलेले शेती रेकॉर्ड',
      loadAudit: 'माहिती लोड करा',
      deleteAudit: 'हटवा',
      clearAll: 'सर्व साफ करा'
    },
    report: {
      printBtn: 'अहवाल प्रिंट करा',
      exportJsonBtn: 'JSON निर्यात करा',
      saveAuditBtn: 'जतन करा',
      title: 'शेती ऑडिट व पीक योग्यता अहवाल',
      subtitle: 'सर्वसमावेशक मूल्यमापन दस्तऐवज'
    },
    suitability: {
      highly: 'अतिशय योग्य',
      moderately: 'मध्यम योग्य',
      marginally: 'मर्यादित योग्य',
      notRecommended: 'शिफारस नाही'
    },
    seasons: {
      kharif: 'खरीप (पावसाळा)',
      rabi: 'रब्बी (हिवाळा)',
      zaid: 'उन्हाळी',
      wholeYear: 'वार्षिक / वर्षभर'
    }
  },
  bn: {
    appName: 'অ্যাগ্রোগাইড ডিএসএস',
    appSubtitle: 'ফসল সুপারিশ ও কৃষি সিদ্ধান্ত সহায়তা ব্যবস্থা',
    advisoryAlert: 'কৃষি উপদেষ্টা প্রোটোটাইপ: FAO এবং ICAR মানদণ্ডের উপর ভিত্তি করে। স্থানীয় কৃষি বিজ্ঞান কেন্দ্রের (KVK) পরামর্শ নিন।',
    tabs: {
      form: 'জমির তথ্য',
      results: 'সুপারিশকৃত ফসল',
      fertilizer: 'সার নির্দেশিকা',
      compare: 'ফসল তুলনা',
      evaluation: 'মডেল মূল্যায়ন',
      testReport: 'টেস্ট রিপোর্ট',
      methodology: 'পদ্ধতি ও সীমাবদ্ধতা',
      saved: 'সংরক্ষিত অডিট',
      report: 'অডিট রিপোর্ট'
    },
    form: {
      step1: 'ধাপ ১ • জমির পরামিতি',
      title: 'মাটি ও আবহাওয়া প্যারামিটার',
      subtitle: 'সঠিক ফসল সুপারিশ পেতে মাটির পরীক্ষা এবং আবহাওয়ার তথ্য দিন।',
      farmerNameLabel: 'কৃষক / খামারের নাম',
      farmerLocationLabel: 'জমির অবস্থান / জেলা',
      soilType: 'মাটির ধরন',
      soilPh: 'মাটির পিএইচ (pH)',
      npkToggle: 'NPK ল্যাব মান যোগ করুন',
      nitrogen: 'নাইট্রোজেন (N)',
      phosphorus: 'ফসফরাস (P)',
      potassium: 'পটাশিয়াম (K)',
      rainfall: 'বৃষ্টিপাত (মিমি)',
      temperature: 'তাপমাত্রা (°C)',
      humidity: 'বাতাসের আর্দ্রতা (%)',
      season: 'বপনের মৌসুম',
      evaluateBtn: 'ফসল সুপারিশ গণনা করুন',
      resetBtn: 'রিসেট করুন',
      liveWeatherBtn: 'লাইভ আবহাওয়া পান',
      dataCompleteness: 'তথ্য সম্পূর্ণতা',
      highConfidence: 'উচ্চ নির্ভুলতা',
      moderateConfidence: 'মাঝারি নির্ভুলতা',
            basicConfidence: 'প্রাথমিক আস্থা (অসম্পূর্ণ প্যারামিটার)',
      autoFetchWeatherForVillage: 'আবহাওয়া আনুন',
      gpsDetectVillage: 'জিপিএস গ্রাম',
      locationHelper: 'ভারতের যেকোনো গ্রাম, পঞ্চায়েত, ব্লক বা ৬ অঙ্কের পিন কোড লিখুন'
    },
    weather: {
      badge: 'লাইভ Open-Meteo API',
      title: 'স্বয়ংক্রিয় আবহাওয়া সিঙ্ক',
      subtitle: 'GPS বা জেলার নাম দ্বারা বর্তমান তাপমাত্রা ও বৃষ্টিপাতের তথ্য পান।',
      useGps: 'GPS ব্যবহার করুন',
      searchPlaceholder: 'জেলা বা শহরের নাম...',
      lookupBtn: 'অনুসন্ধান',
      quickSelectHub: 'প্রধান কৃষি অঞ্চল:',
      liveBadge: 'লাইভ',
      calibratedBadge: 'মডেল ডেটা',
      applyToForm: 'ফর্মে প্রয়োগ করুন',
            appliedSuccess: 'মানগুলি ফর্মে প্রয়োগ করা হয়েছে!',
      villageSearchPrompt: 'ভারতের যেকোনো গ্রাম, ব্লক, জেলা বা পিন কোড অনুসন্ধান করুন (যেমন জয়নগর, সিঙ্গুর, 700001)...',
      searching: 'গ্রাম ও জেলা অনুসন্ধান করা হচ্ছে...',
      noResults: 'গ্রাম পাওয়া যায়নি। জেলার নাম দিয়ে চেষ্টা করুন।',
      detectedGps: 'জিপিএস দ্বারা চিহ্নিত গ্রাম',
      villageBadge: 'গ্রাম',
      tehsilBadge: 'ব্লক / মহকুমা',
      districtBadge: 'জেলা',
      stateBadge: 'রাজ্য',
      allIndiaCoverage: 'সমগ্র ভারত কভারেজ: ৬,০০,০০০+ গ্রাম ও ৭8০+ জেলা',
      browseByState: 'রাজ্য ও জেলা অনুযায়ী ব্রাউজ করুন',
      selectState: 'রাজ্য নির্বাচন করুন',
      selectDistrict: 'জেলা নির্বাচন করুন'
    },
    seasonBanner: {
      activeSeason: 'বর্তমান মৌসুম',
      currentMonth: 'চলতি মাস',
      peakSowing: 'প্রধান বপন সময়',
      midSeason: 'পরিচর্যা পর্যায়',
      lateSowing: 'ফসল তোলার সময়',
      syncBtn: 'মৌসুম নির্বাচন করুন',
      filterActive: '✓ মৌসুম ফিল্টার চালু',
      filterInSeason: 'কেবল মৌসুমী ফসল',
      calendarBtn: 'ক্যালেন্ডার',
      calendarTitle: 'জাতীয় ফসল বপন বর্ষপঞ্জি'
    },
    results: {
      fieldProfile: 'জমির তথ্য:',
      adjustParams: 'তথ্য পরিবর্তন',
      fertilizerGuide: 'সার নির্দেশিকা',
      allCategories: 'সকল বিভাগ',
      allSuitability: 'সকল মাত্রা',
      searchPlaceholder: 'ফসলের নাম দিয়ে খুঁজুন...',
      topMatch: 'সেরা পছন্দ',
      runnerUp: 'দ্বিতীয় পছন্দ',
      thirdChoice: 'তৃতীয় পছন্দ',
      match: 'মিল',
      compareBtn: 'তুলনা করুন',
      auditBtn: 'সম্পূর্ণ বিবরণ',
      strengths: 'অনুকূল উপাদান',
      weaknesses: 'সীমাবদ্ধতা ও ঝুঁকি',
      warnings: 'গুরুত্বপূর্ণ সতর্কতা',
      amendments: 'মাটি সংশোধনের পরামর্শ',
      dualEngineTitle: 'ইঞ্জিন মডেল:',
      rulesEngine: 'কৃষি নিয়মবিধি',
      knnEngine: 'k-NN বেঞ্চমার্ক'
    },
    fertilizer: {
      badge: 'মাটি পরীক্ষা ভিত্তিক সার (STCR)',
      title: 'সঠিক সার ও পুষ্টি ব্যবস্থাপনা',
      subtitle: 'ICAR এবং FAO নির্দেশিকা অনুযায়ী সুষম সারের পরিমাণ।',
      selectTargetCrop: 'ফসল নির্বাচন করুন:',
      baselineAlert: 'ল্যাব রিপোর্ট নেই: আঞ্চলিক গড়ের ভিত্তিতে গণনা করা হয়েছে।',
      nutrientStatusTitle: '১. মাটিতে পুষ্টির ঘাটতি',
      commercialProductsTitle: '২. বাণিজ্যিক সারের মাত্রা',
      splitScheduleTitle: '৩. সার প্রয়োগের সময়সূচী',
      phAmendmentTitle: 'পিএইচ সংশোধন (চুন / জিপসাম)',
      biofertilizersTitle: 'জৈব সার ও অনুজীব',
      costEstimate: 'আনুমানিক খরচ:',
      bagsUnit: 'বস্তা (৫০ কেজি)'
    },
    evaluation: {
      badge: 'মডেল মূল্যায়ন',
      title: 'প্রকৃত তথ্য বনাম মডেল পরীক্ষা',
      subtitle: 'বিভিন্ন মাটিতে মডেলের কার্যকারিতা যাচাই করুন।',
      runBtn: 'টেস্ট চালান',
      top1Accuracy: 'টপ-১ নির্ভুলতা',
      top3Recall: 'টপ-৩ রিকল',
      macroF1: 'F1-স্কোর',
      macroPrecision: 'প্রিসিশন',
      knnBaseline: 'k-NN তুলনা',
      perCropTableTitle: 'ফসলভিত্তিক পরিসংখ্যান',
      confusionMatrixTitle: 'কনফিউশন ম্যাট্রিক্স',
      inspectorTitle: 'তথ্য পরিদর্শক'
    },
    testReport: {
      badge: 'স্বয়ংক্রিয় টেস্ট স্যুট',
      title: 'সিস্টেম যাচাই ও টেস্ট রিপোর্ট',
      subtitle: 'স্বয়ংক্রিয়ভাবে সিস্টেমের কার্যকারিতা নিশ্চিত করুন।',
      rerunBtn: 'পুনরায় চালান',
      printBtn: 'প্রিন্ট করুন',
      statusCard: 'পরীক্ষার অবস্থা',
      latencyCard: 'গড় সময়',
      engineCard: 'কাঠামো',
      boundaryCard: 'সহনশীলতা',
      comparisonTitle: 'পদ্ধতি তুলনা ফলাফল',
      detailedTitle: 'বিস্তারিত ফলাফল'
    },
    methodology: {
      badge: 'প্রযুক্তিগত তথ্য',
      title: 'পদ্ধতি ও সীমাবদ্ধতা',
      subtitle: 'গাণিতিক সূত্র ও সিস্টেমের সীমাবদ্ধতার সম্পূর্ণ বিবরণ।',
      disclaimerTitle: 'আইনি ঘোষণা',
      mathTitle: '১. স্কোরিং কাঠামো',
      limitationsTitle: '২. সিস্টেমের সীমাবদ্ধতা',
      sourcesTitle: '৩. তথ্যের উৎস'
    },
    compare: {
      emptyTitle: 'তুলনার জন্য ফসল নির্বাচন করা হয়নি',
      emptyDesc: 'তুলনা দেখতে কমপক্ষে দুটি ফসল বেছে নিন।',
      quickAdd: 'শীর্ষ ফসল যোগ করুন:',
      title: 'ফসলের তুলনা',
      clearAll: 'সব মুছুন'
    },
    saved: {
      emptyTitle: 'কোনো সংরক্ষিত অডিট নেই',
      emptyDesc: 'ভবিষ্যতের জন্য আপনার জমির তথ্য সংরক্ষণ করুন।',
      createNewBtn: 'নতুন মূল্যায়ন শুরু করুন',
      title: 'সংরক্ষিত জমির তালিকা',
      loadAudit: 'লোড করুন',
      deleteAudit: 'মুছুন',
      clearAll: 'সব পরিষ্কার করুন'
    },
    report: {
      printBtn: 'প্রিন্ট করুন',
      exportJsonBtn: 'JSON ডাউনলোড',
      saveAuditBtn: 'সংরক্ষণ করুন',
      title: 'খামার কৃষি অডিট ও ফসল উপযোগিতা রিপোর্ট',
      subtitle: 'জমির মূল্যায়ন সনদ'
    },
    suitability: {
      highly: 'অত্যন্ত উপযুক্ত',
      moderately: 'মাঝারি উপযুক্ত',
      marginally: 'সামান্য উপযুক্ত',
      notRecommended: 'সুপারিশযোগ্য নয়'
    },
    seasons: {
      kharif: 'খরিফ (বর্ষাকাল)',
      rabi: 'রবি (শীতকাল)',
      zaid: 'জায়েদ (গ্রীষ্মকাল)',
      wholeYear: 'সারা বছর'
    }
  },
  kn: {
    appName: 'ಅಗ್ರೋಗೈಡ್ ಡಿಎಸ್‌ಎಸ್',
    appSubtitle: 'ಬೆಳೆ ಶಿಫಾರಸು ಮತ್ತು ಕೃಷಿ ನಿರ್ಧಾರ ಬೆಂಬಲ ವ್ಯವಸ್ಥೆ',
    advisoryAlert: 'ಕೃಷಿ ಸಲಹಾ ಪ್ರೋಟೋಟೈಪ್: FAO ಮತ್ತು ICAR ಮಾನದಂಡಗಳ ಆಧಾರಿತ ಅಂದಾಜುಗಳು. ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರವನ್ನು (KVK) ಸಂಪರ್ಕಿಸಿ.',
    tabs: {
      form: 'ಜಮೀನಿನ ವಿವರ',
      results: 'ಶಿಫಾರಸು ಬೆಳೆಗಳು',
      fertilizer: 'ಗೊಬ್ಬರ ಮಾರ್ಗದರ್ಶಿ',
      compare: 'ಬೆಳೆ ಹೋಲಿಕೆ',
      evaluation: 'ಮಾದರಿ ಮೌಲ್ಯಮಾಪನ',
      testReport: 'ಪರೀಕ್ಷಾ ವರದಿ',
      methodology: 'ವಿಧಾನ ಮತ್ತು ಮಿತಿಗಳು',
      saved: 'ಉಳಿಸಿದ ಆಡಿಟ್',
      report: 'ಆಡಿಟ್ ವರದಿ'
    },
    form: {
      step1: 'ಹಂತ ೧ • ಜಮೀನಿನ ಅಳತೆಗಳು',
      title: 'ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನ ವಿವರಗಳು',
      subtitle: 'ಬೆಳೆ ಶಿಫಾರಸು ಪಡೆಯಲು ಮಣ್ಣು ಪರೀಕ್ಷೆ ಮತ್ತು ಹವಾಮಾನ ಡೇಟಾ ನಮೂದಿಸಿ.',
      farmerNameLabel: 'ರೈತರ / ಸಂಸ್ಥೆಯ ಹೆಸರು',
      farmerLocationLabel: 'ಸ್ಥಳ / ಜಿಲ್ಲೆ',
      soilType: 'ಮಣ್ಣಿನ ವಿಧ',
      soilPh: 'ಮಣ್ಣಿನ ಪಿಹೆಚ್ (pH)',
      npkToggle: 'NPK ಲ್ಯಾಬ್ ಮೌಲ್ಯಗಳನ್ನು ಸೇರಿಸಿ',
      nitrogen: 'ಸಾರಜನಕ (N)',
      phosphorus: 'ರಂಜಕ (P)',
      potassium: 'ಪೊಟ್ಯಾಶ್ (K)',
      rainfall: 'ಮಳೆ ಪ್ರಮಾಣ (ಮಿ.ಮೀ)',
      temperature: 'ತಾಪಮಾನ (°C)',
      humidity: 'ತೇವಾಂಶ (%)',
      season: 'ಬಿತ್ತನೆ ಹಂಗಾಮು',
      evaluateBtn: 'ಶಿಫಾರಸು ಪಡೆಯಿರಿ',
      resetBtn: 'ಮರುಹೊಂದಿಸಿ',
      liveWeatherBtn: 'ಲೈವ್ ಹವಾಮಾನ ಪಡೆಯಿರಿ',
      dataCompleteness: 'ಡೇಟಾ ಸಂಪೂರ್ಣತೆ',
      highConfidence: 'ಹೆಚ್ಚಿನ ನಿಖರತೆ',
      moderateConfidence: 'ಮಧ್ಯಮ ನಿಖರತೆ',
            basicConfidence: 'ಮೂಲ ವಿಶ್ವಾಸಾರ್ಹತೆ (ಅಪೂರ್ಣ ನಿಯತಾಂಕಗಳು)',
      autoFetchWeatherForVillage: 'ಹವಾಮಾನ ಪಡೆಯಿರಿ',
      gpsDetectVillage: 'ಜಿಪಿಎಸ್ ಗ್ರಾಮ',
      locationHelper: 'ಭಾರತದ ಯಾವುದೇ ಗ್ರಾಮ, ಪಂಚಾಯಿತಿ, ತಾಲೂಕು ಅಥವಾ 6 ಅಂಕಿಗಳ ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ'
    },
    weather: {
      badge: 'ಲೈವ್ Open-Meteo API',
      title: 'ಸ್ವಯಂಚಾಲಿತ ಹವಾಮಾನ ಸಿಂಕ್',
      subtitle: 'GPS ಅಥವಾ ಜಿಲ್ಲೆಯ ಹೆಸರಿನ ಮೂಲಕ ನೈಜ ತಾಪಮಾನ ಮತ್ತು ಮಳೆಯ ವಿವರ ಪಡೆಯಿರಿ.',
      useGps: 'ನನ್ನ GPS ಬಳಸಿ',
      searchPlaceholder: 'ಜಿಲ್ಲೆ ಅಥವಾ ಊರಿನ ಹೆಸರು...',
      lookupBtn: 'ಹುಡುಕಿ',
      quickSelectHub: 'ಪ್ರಮುಖ ಕೃಷಿ ವಲಯ:',
      liveBadge: 'ಲೈವ್',
      calibratedBadge: 'ಮಾದರಿ ವಿವರ',
      applyToForm: 'ಫಾರ್ಮ್‌ಗೆ ಅನ್ವಯಿಸಿ',
            appliedSuccess: 'ಫಾರ್ಮ್‌ಗೆ ಅನ್ವಯಿಸಲಾಗಿದೆ!',
      villageSearchPrompt: 'ಭಾರತದ ಯಾವುದೇ ಗ್ರಾಮ, ತಾಲೂಕು, ಜಿಲ್ಲೆ ಅಥವಾ ಪಿನ್ ಕೋಡ್ ಹುಡುಕಿ (ಉದಾ. ಮಂಡ್ಯ, ಬೈಯಾದಗಿ, 560001)...',
      searching: 'ಗ್ರಾಮಗಳು ಮತ್ತು ಜಿಲ್ಲೆಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...',
      noResults: 'ಗ್ರಾಮ ಕಂಡುಬಂದಿಲ್ಲ. ಜಿಲ್ಲೆಯ ಹೆಸರಿನ ಮೂಲಕ ಹುಡುಕಿ.',
      detectedGps: 'ಜಿಪಿಎಸ್ ಗುರುತಿಸಿದ ಗ್ರಾಮ',
      villageBadge: 'ಗ್ರಾಮ',
      tehsilBadge: 'ತಾಲೂಕು',
      districtBadge: 'ಜಿಲ್ಲೆ',
      stateBadge: 'ರಾಜ್ಯ',
      allIndiaCoverage: 'ಸಮಗ್ರ ಭಾರತ: 6,00,000+ ಗ್ರಾಮಗಳು ಮತ್ತು 780+ ಜಿಲ್ಲೆಗಳು',
      browseByState: 'ರಾಜ್ಯ ಮತ್ತು ಜಿಲ್ಲೆ ಪ್ರಕಾರ ಹುಡುಕಿ',
      selectState: 'ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      selectDistrict: 'ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ'
    },
    seasonBanner: {
      activeSeason: 'ಪ್ರಸ್ತುತ ಹಂಗಾಮು',
      currentMonth: 'ಪ್ರಸ್ತುತ ತಿಂಗಳು',
      peakSowing: 'ಮುಖ್ಯ ಬಿತ್ತನೆ ಸಮಯ',
      midSeason: 'ಬೆಳೆ ಪೋಷಣೆ ಹಂತ',
      lateSowing: 'ಕೊಯ್ಲು ಸಮಯ',
      syncBtn: 'ಹಂಗಾಮು ಬದಲಾಯಿಸಿ',
      filterActive: '✓ ಹಂಗಾಮು ಫಿಲ್ಟರ್ ಆನ್ ಆಗಿದೆ',
      filterInSeason: 'ಈ ಹಂಗಾಮಿನ ಬೆಳೆಗಳು ಮಾತ್ರ',
      calendarBtn: 'ಕ್ಯಾಲೆಂಡರ್',
      calendarTitle: 'ರಾಷ್ಟ್ರೀಯ ಕೃಷಿ ಬಿತ್ತನೆ ಕ್ಯಾಲೆಂಡರ್'
    },
    results: {
      fieldProfile: 'ಜಮೀನಿನ ವಿವರ:',
      adjustParams: 'ವಿವರ ಬದಲಾಯಿಸಿ',
      fertilizerGuide: 'ಗೊಬ್ಬರ ಮಾರ್ಗದರ್ಶಿ',
      allCategories: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
      allSuitability: 'ಎಲ್ಲಾ ಮಟ್ಟಗಳು',
      searchPlaceholder: 'ಬೆಳೆಯ ಹೆಸರಿನಿಂದ ಹುಡುಕಿ...',
      topMatch: 'ಪ್ರಥಮ ಆಯ್ಕೆ',
      runnerUp: 'ದ್ವಿತೀಯ ಆಯ್ಕೆ',
      thirdChoice: 'ತೃತೀಯ ಆಯ್ಕೆ',
      match: 'ಹೊಂದಾಣಿಕೆ',
      compareBtn: 'ಹೋಲಿಸಿ',
      auditBtn: 'ಸಂಪೂರ್ಣ ಮಾಹಿತಿ',
      strengths: 'ಅನುಕೂಲಕರ ಅಂಶಗಳು',
      weaknesses: 'ಮಿತಿಗಳು ಮತ್ತು ಅಪಾಯಗಳು',
      warnings: 'ಪ್ರಮುಖ ಎಚ್ಚರಿಕೆಗಳು',
      amendments: 'ಮಣ್ಣು ಸುಧಾರಣಾ ಕ್ರಮಗಳು',
      dualEngineTitle: 'ಮಾದರಿ ಪದ್ಧತಿ:',
      rulesEngine: 'ಕೃಷಿ ನಿಯಮಗಳು',
      knnEngine: 'k-NN ಹೋಲಿಕೆ ಬೆಂಚ್‌ಮಾರ್ಕ್'
    },
    fertilizer: {
      badge: 'ಮಣ್ಣು ಪರೀಕ್ಷೆ ಆಧಾರಿತ ಗೊಬ್ಬರ (STCR)',
      title: 'ಖಚಿತ ರಸಗೊಬ್ಬರ ಮತ್ತು ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ',
      subtitle: 'ICAR ಮತ್ತು FAO ಮಾನದಂಡಗಳ ಪ್ರಕಾರ ಸಮತೋಲಿತ ಗೊಬ್ಬರದ ಲೆಕ್ಕಾಚಾರ.',
      selectTargetCrop: 'ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ:',
      baselineAlert: 'ಲ್ಯಾಬ್ ವರದಿ ಇಲ್ಲ: ಪ್ರಾದೇಶಿಕ ಸರಾಸರಿಯಂತೆ ಲೆಕ್ಕಾಚಾರ ಮಾಡಲಾಗಿದೆ.',
      nutrientStatusTitle: '೧. ಮಣ್ಣಿನಲ್ಲಿ ಪೋಷಕಾಂಶಗಳ ಕೊರತೆ',
      commercialProductsTitle: '೨. ರಾಸಾಯನಿಕ ಗೊಬ್ಬರಗಳ ಪ್ರಮಾಣ',
      splitScheduleTitle: '೩. ಗೊಬ್ಬರ ಹಾಕುವ ಹಂತಗಳು',
      phAmendmentTitle: 'ಪಿಹೆಚ್ ತಿದ್ದುಪಡಿ (ಸುಣ್ಣ / ಜಿಪ್ಸಮ್)',
      biofertilizersTitle: 'ಜೈವಿಕ ಗೊಬ್ಬರಗಳು',
      costEstimate: 'ಅಂದಾಜು ವೆಚ್ಚ:',
      bagsUnit: 'ಚೀಲಗಳು (೫೦ ಕೆಜಿ)'
    },
    evaluation: {
      badge: 'ಮಾದರಿ ಮೌಲ್ಯಮಾಪನ',
      title: 'ನಿಜವಾದ ದತ್ತಾಂಶದೊಂದಿಗೆ ಪರೀಕ್ಷೆ',
      subtitle: 'ವಿವಿಧ ಮಣ್ಣುಗಳಲ್ಲಿ ಶಿಫಾರಸಿನ ನಿಖರತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.',
      runBtn: 'ಬೆಂಚ್‌ಮಾರ್ಕ್ ರನ್ ಮಾಡಿ',
      top1Accuracy: 'ಟಾಪ್-೧ ನಿಖರತೆ',
      top3Recall: 'ಟಾಪ್-೩ ರೀಕಾಲ್',
      macroF1: 'F1-ಸ್ಕೋರ್',
      macroPrecision: 'ನಿಖರತೆ ಅನುಪಾತ',
      knnBaseline: 'k-NN ಹೋಲಿಕೆ',
      perCropTableTitle: 'ಬೆಳೆವಾರು ಅಂಕಿಅಂಶಗಳು',
      confusionMatrixTitle: 'ಕನ್‌ಫ್ಯೂಷನ್ ಮ್ಯಾಟ್ರಿಕ್ಸ್',
      inspectorTitle: 'ದತ್ತಾಂಶ ಪರಿಶೀಲನೆ'
    },
    testReport: {
      badge: 'ಸ್ವಯಂಚಾಲಿತ ಪರೀಕ್ಷಾ ಸೂಟ್',
      title: 'ವ್ಯವಸ್ಥೆ ಪರಿಶೀಲನೆ & ಪರೀಕ್ಷಾ ವರದಿ',
      subtitle: 'ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸಿಸ್ಟಮ್ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
      rerunBtn: 'ಮತ್ತೆ ರನ್ ಮಾಡಿ',
      printBtn: 'ಪ್ರಿಂಟ್ ಮಾಡಿ',
      statusCard: 'ಪರೀಕ್ಷಾ ಸ್ಥಿತಿ',
      latencyCard: 'ಸರಾಸರಿ ಸಮಯ',
      engineCard: 'ರಚನೆ',
      boundaryCard: 'ತಾಳಿಕೆ ಸಾಮರ್ಥ್ಯ',
      comparisonTitle: 'ವಿಧಾನ ಹೋಲಿಕೆ ಫಲಿತಾಂಶಗಳು',
      detailedTitle: 'ವಿವರವಾದ ಫಲಿತಾಂಶಗಳು'
    },
    methodology: {
      badge: 'ತಾಂತ್ರಿಕ ವಿವರಣೆ',
      title: 'ವಿಧಾನ ಮತ್ತು ಮಿತಿಗಳು',
      subtitle: 'ಗಣಿತ ಸೂತ್ರಗಳು ಮತ್ತು ಕೃಷಿ ಮಿತಿಗಳ ಪೂರ್ಣ ವಿವರಣೆ.',
      disclaimerTitle: 'ಕಾನೂನು ಎಚ್ಚರಿಕೆ',
      mathTitle: '೧. ಶಿಫಾರಸು ಪದ್ಧತಿಯ ರಚನೆ',
      limitationsTitle: '೨. ವ್ಯವಸ್ಥೆಯ ಮಿತಿಗಳು',
      sourcesTitle: '೩. ದತ್ತಾಂಶ ಮೂಲಗಳು'
    },
    compare: {
      emptyTitle: 'ಹೋಲಿಕೆಗೆ ಯಾವುದೇ ಬೆಳೆ ಆಯ್ಕೆಯಾಗಿಲ್ಲ',
      emptyDesc: 'ಹೋಲಿಕೆ ನೋಡಲು ಕನಿಷ್ಠ ಎರಡು ಬೆಳೆಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
      quickAdd: 'ಪ್ರಮುಖ ಬೆಳೆಗಳನ್ನು ಸೇರಿಸಿ:',
      title: 'ಬೆಳೆಗಳ ಸಮಗ್ರ ಹೋಲಿಕೆ',
      clearAll: 'ಎಲ್ಲವನ್ನೂ ತೆಗೆದುಹಾಕಿ'
    },
    saved: {
      emptyTitle: 'ಉಳಿಸಿದ ಆಡಿಟ್‌ಗಳಿಲ್ಲ',
      emptyDesc: 'ಮುಂದಿನ ಉಲ್ಲೇಖಕ್ಕಾಗಿ ನಿಮ್ಮ ಜಮೀನಿನ ಮಾಹಿತಿಯನ್ನು ಇಲ್ಲಿ ಉಳಿಸಿ.',
      createNewBtn: 'ಹೊಸ ಮೌಲ್ಯಮಾಪನ ಆರಂಭಿಸಿ',
      title: 'ಉಳಿಸಿದ ಜಮೀನಿನ ಪಟ್ಟಿ',
      loadAudit: 'ವಿವರ ಲೋಡ್ ಮಾಡಿ',
      deleteAudit: 'ಅಳಿಸಿ',
      clearAll: 'ಎಲ್ಲವನ್ನೂ ತೆರವುಗೊಳಿಸಿ'
    },
    report: {
      printBtn: 'ವರದಿ ಮುದ್ರಿಸಿ',
      exportJsonBtn: 'JSON ಡೌನ್‌ಲೋಡ್',
      saveAuditBtn: 'ಉಳಿಸಿ',
      title: 'ಜಮೀನು ಆಡಿಟ್ ಮತ್ತು ಬೆಳೆ ಸೂಕ್ತತೆ ವರದಿ',
      subtitle: 'ಸಮಗ್ರ ಮೌಲ್ಯಮಾಪನ ದಾಖಲೆ'
    },
    suitability: {
      highly: 'ಅತ್ಯಂತ ಸೂಕ್ತ',
      moderately: 'ಮಧ್ಯಮ ಸೂಕ್ತ',
      marginally: 'ಕಡಿಮೆ ಸೂಕ್ತ',
      notRecommended: 'ಶಿಫಾರಸು ಮಾಡಲಾಗಿಲ್ಲ'
    },
    seasons: {
      kharif: 'ಖಾರೀಫ್ (ಮುಂಗಾರು)',
      rabi: 'ರಬಿ (ಹಿಂಗಾರು)',
      zaid: 'ಜಾಯಿದ್ (ಬೇಸಿಗೆ)',
      wholeYear: 'ವರ್ಷಪೂರ್ತಿ'
    }
  }
};
