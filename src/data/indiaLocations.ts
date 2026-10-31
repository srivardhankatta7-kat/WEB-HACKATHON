export interface IndiaLocationRecord {
  name: string;
  district: string;
  state: string;
  type: 'District' | 'Tehsil/Taluk' | 'Agricultural Hub' | 'Village Cluster';
  lat: number;
  lon: number;
  specialty?: string;
  pincode?: string;
}

export const INDIA_STATES_AND_UTS = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

export const ALL_INDIA_DISTRICTS_AND_HUBS: IndiaLocationRecord[] = [
  // --- Punjab (Agricultural Heartlands & Village Clusters) ---
  { name: 'Ludhiana', district: 'Ludhiana', state: 'Punjab', type: 'District', lat: 30.9010, lon: 75.8573 },
  { name: 'Amritsar', district: 'Amritsar', state: 'Punjab', type: 'District', lat: 31.6340, lon: 74.8723 },
  { name: 'Jalandhar', district: 'Jalandhar', state: 'Punjab', type: 'District', lat: 31.3260, lon: 75.5762 },
  { name: 'Patiala', district: 'Patiala', state: 'Punjab', type: 'District', lat: 30.3398, lon: 76.3869 },
  { name: 'Bathinda', district: 'Bathinda', state: 'Punjab', type: 'District', lat: 30.2110, lon: 74.9455 },
  { name: 'Hoshiarpur', district: 'Hoshiarpur', state: 'Punjab', type: 'District', lat: 31.5143, lon: 75.9115 },
  { name: 'Moga', district: 'Moga', state: 'Punjab', type: 'District', lat: 30.8230, lon: 75.1734 },
  { name: 'Sangrur', district: 'Sangrur', state: 'Punjab', type: 'District', lat: 30.2458, lon: 75.8421 },
  { name: 'Faridkot', district: 'Faridkot', state: 'Punjab', type: 'District', lat: 30.6769, lon: 74.7583 },
  { name: 'Muktsar', district: 'Sri Muktsar Sahib', state: 'Punjab', type: 'District', lat: 30.4762, lon: 74.5173 },
  { name: 'Fazilka', district: 'Fazilka', state: 'Punjab', type: 'District', lat: 30.4037, lon: 74.0254 },
  { name: 'Firozpur', district: 'Firozpur', state: 'Punjab', type: 'District', lat: 30.9237, lon: 74.6138 },
  { name: 'Gurdaspur', district: 'Gurdaspur', state: 'Punjab', type: 'District', lat: 32.0419, lon: 75.4053 },
  { name: 'Kapurthala', district: 'Kapurthala', state: 'Punjab', type: 'District', lat: 31.3800, lon: 75.3800 },
  { name: 'Mansa', district: 'Mansa', state: 'Punjab', type: 'District', lat: 29.9880, lon: 75.3934 },
  { name: 'Rupnagar (Ropar)', district: 'Rupnagar', state: 'Punjab', type: 'District', lat: 30.9664, lon: 76.5331 },
  { name: 'Fatehgarh Sahib', district: 'Fatehgarh Sahib', state: 'Punjab', type: 'District', lat: 30.6431, lon: 76.3980 },
  { name: 'Tarn Taran', district: 'Tarn Taran', state: 'Punjab', type: 'District', lat: 31.4526, lon: 74.9255 },
  { name: 'Barnala', district: 'Barnala', state: 'Punjab', type: 'District', lat: 30.3819, lon: 75.5467 },
  { name: 'Kotkapura', district: 'Faridkot', state: 'Punjab', type: 'Tehsil/Taluk', lat: 30.5828, lon: 74.8291 },
  { name: 'Samrala', district: 'Ludhiana', state: 'Punjab', type: 'Tehsil/Taluk', lat: 30.8358, lon: 76.1917 },
  { name: 'Jagraon', district: 'Ludhiana', state: 'Punjab', type: 'Tehsil/Taluk', lat: 30.7858, lon: 75.4789 },
  { name: 'Khanna', district: 'Ludhiana', state: 'Punjab', type: 'Tehsil/Taluk', lat: 30.7071, lon: 76.2166 },
  { name: 'Malerkotla', district: 'Malerkotla', state: 'Punjab', type: 'District', lat: 30.5256, lon: 75.8850 },

  // --- Haryana ---
  { name: 'Karnal', district: 'Karnal', state: 'Haryana', type: 'District', lat: 29.6857, lon: 76.9905 },
  { name: 'Hisar', district: 'Hisar', state: 'Haryana', type: 'District', lat: 29.1492, lon: 75.7217 },
  { name: 'Rohtak', district: 'Rohtak', state: 'Haryana', type: 'District', lat: 28.8955, lon: 76.6066 },
  { name: 'Sirsa', district: 'Sirsa', state: 'Haryana', type: 'District', lat: 29.5349, lon: 75.0295 },
  { name: 'Ambala', district: 'Ambala', state: 'Haryana', type: 'District', lat: 30.3782, lon: 76.7767 },
  { name: 'Kurukshetra', district: 'Kurukshetra', state: 'Haryana', type: 'District', lat: 29.9695, lon: 76.8783 },
  { name: 'Sonipat', district: 'Sonipat', state: 'Haryana', type: 'District', lat: 28.9931, lon: 77.0151 },
  { name: 'Panipat', district: 'Panipat', state: 'Haryana', type: 'District', lat: 29.3909, lon: 76.9635 },
  { name: 'Yamunanagar', district: 'Yamunanagar', state: 'Haryana', type: 'District', lat: 30.1290, lon: 77.2674 },
  { name: 'Bhiwani', district: 'Bhiwani', state: 'Haryana', type: 'District', lat: 28.7831, lon: 76.1397 },
  { name: 'Jind', district: 'Jind', state: 'Haryana', type: 'District', lat: 29.3161, lon: 76.3146 },
  { name: 'Fatehabad', district: 'Fatehabad', state: 'Haryana', type: 'District', lat: 29.5147, lon: 75.4549 },
  { name: 'Kaithal', district: 'Kaithal', state: 'Haryana', type: 'District', lat: 29.7997, lon: 76.4027 },
  { name: 'Rewari', district: 'Rewari', state: 'Haryana', type: 'District', lat: 28.1837, lon: 76.6202 },
  { name: 'Gurugram', district: 'Gurugram', state: 'Haryana', type: 'District', lat: 28.4595, lon: 77.0266 },
  { name: 'Faridabad', district: 'Faridabad', state: 'Haryana', type: 'District', lat: 28.4089, lon: 77.3178 },
  { name: 'Palwal', district: 'Palwal', state: 'Haryana', type: 'District', lat: 28.1487, lon: 77.3260 },
  { name: 'Nuh (Mewat)', district: 'Nuh', state: 'Haryana', type: 'District', lat: 28.1065, lon: 77.0058 },
  { name: 'Charkhi Dadri', district: 'Charkhi Dadri', state: 'Haryana', type: 'District', lat: 28.5921, lon: 76.2653 },
  { name: 'Panchkula', district: 'Panchkula', state: 'Haryana', type: 'District', lat: 30.6942, lon: 76.8606 },

  // --- Uttar Pradesh ---
  { name: 'Varanasi', district: 'Varanasi', state: 'Uttar Pradesh', type: 'District', lat: 25.3176, lon: 82.9739 },
  { name: 'Lucknow', district: 'Lucknow', state: 'Uttar Pradesh', type: 'District', lat: 26.8467, lon: 80.9462 },
  { name: 'Kanpur', district: 'Kanpur Nagar', state: 'Uttar Pradesh', type: 'District', lat: 26.4499, lon: 80.3319 },
  { name: 'Prayagraj (Allahabad)', district: 'Prayagraj', state: 'Uttar Pradesh', type: 'District', lat: 25.4358, lon: 81.8463 },
  { name: 'Gorakhpur', district: 'Gorakhpur', state: 'Uttar Pradesh', type: 'District', lat: 26.7606, lon: 83.3732 },
  { name: 'Bareilly', district: 'Bareilly', state: 'Uttar Pradesh', type: 'District', lat: 28.3670, lon: 79.4304 },
  { name: 'Aligarh', district: 'Aligarh', state: 'Uttar Pradesh', type: 'District', lat: 27.8974, lon: 78.0880 },
  { name: 'Agra', district: 'Agra', state: 'Uttar Pradesh', type: 'District', lat: 27.1767, lon: 78.0081 },
  { name: 'Meerut', district: 'Meerut', state: 'Uttar Pradesh', type: 'District', lat: 28.9845, lon: 77.7064 },
  { name: 'Saharanpur', district: 'Saharanpur', state: 'Uttar Pradesh', type: 'District', lat: 29.9671, lon: 77.5460 },
  { name: 'Muzaffarnagar', district: 'Muzaffarnagar', state: 'Uttar Pradesh', type: 'District', lat: 29.4727, lon: 77.7085 },
  { name: 'Mathura', district: 'Mathura', state: 'Uttar Pradesh', type: 'District', lat: 27.4924, lon: 77.6737 },
  { name: 'Moradabad', district: 'Moradabad', state: 'Uttar Pradesh', type: 'District', lat: 28.8351, lon: 78.7747 },
  { name: 'Jhansi', district: 'Jhansi', state: 'Uttar Pradesh', type: 'District', lat: 25.4484, lon: 78.5685 },
  { name: 'Ayodhya (Faizabad)', district: 'Ayodhya', state: 'Uttar Pradesh', type: 'District', lat: 26.7922, lon: 82.1998 },
  { name: 'Basti', district: 'Basti', state: 'Uttar Pradesh', type: 'District', lat: 26.8000, lon: 82.7667 },
  { name: 'Azamgarh', district: 'Azamgarh', state: 'Uttar Pradesh', type: 'District', lat: 26.0687, lon: 83.1843 },
  { name: 'Jaunpur', district: 'Jaunpur', state: 'Uttar Pradesh', type: 'District', lat: 25.7464, lon: 82.6837 },
  { name: 'Mirzapur', district: 'Mirzapur', state: 'Uttar Pradesh', type: 'District', lat: 25.1337, lon: 82.5644 },
  { name: 'Ghazipur', district: 'Ghazipur', state: 'Uttar Pradesh', type: 'District', lat: 25.5866, lon: 83.5770 },
  { name: 'Ballia', district: 'Ballia', state: 'Uttar Pradesh', type: 'District', lat: 25.7584, lon: 84.1482 },
  { name: 'Deoria', district: 'Deoria', state: 'Uttar Pradesh', type: 'District', lat: 26.5020, lon: 83.7791 },
  { name: 'Kushinagar', district: 'Kushinagar', state: 'Uttar Pradesh', type: 'District', lat: 26.7408, lon: 83.8890 },
  { name: 'Lakhimpur Kheri', district: 'Kheri', state: 'Uttar Pradesh', type: 'District', lat: 27.9463, lon: 80.7787 },
  { name: 'Sitapur', district: 'Sitapur', state: 'Uttar Pradesh', type: 'District', lat: 27.5645, lon: 80.6829 },
  { name: 'Hardoi', district: 'Hardoi', state: 'Uttar Pradesh', type: 'District', lat: 27.3956, lon: 80.1313 },
  { name: 'Unnao', district: 'Unnao', state: 'Uttar Pradesh', type: 'District', lat: 26.5393, lon: 80.4878 },
  { name: 'Rae Bareli', district: 'Rae Bareli', state: 'Uttar Pradesh', type: 'District', lat: 26.2236, lon: 81.2409 },
  { name: 'Amethi', district: 'Amethi', state: 'Uttar Pradesh', type: 'District', lat: 26.1554, lon: 81.8159 },
  { name: 'Sultanpur', district: 'Sultanpur', state: 'Uttar Pradesh', type: 'District', lat: 26.2648, lon: 82.0727 },
  { name: 'Barabanki', district: 'Barabanki', state: 'Uttar Pradesh', type: 'District', lat: 26.9274, lon: 81.1850 },
  { name: 'Gonda', district: 'Gonda', state: 'Uttar Pradesh', type: 'District', lat: 27.1300, lon: 81.9600 },
  { name: 'Bahraich', district: 'Bahraich', state: 'Uttar Pradesh', type: 'District', lat: 27.5750, lon: 81.5940 },
  { name: 'Banda', district: 'Banda', state: 'Uttar Pradesh', type: 'District', lat: 25.4764, lon: 80.3353 },
  { name: 'Hamirpur', district: 'Hamirpur', state: 'Uttar Pradesh', type: 'District', lat: 25.9547, lon: 80.1517 },
  { name: 'Mahoba', district: 'Mahoba', state: 'Uttar Pradesh', type: 'District', lat: 25.2917, lon: 79.8732 },
  { name: 'Lalitpur', district: 'Lalitpur', state: 'Uttar Pradesh', type: 'District', lat: 24.6865, lon: 78.4116 },
  { name: 'Sonbhadra', district: 'Sonbhadra', state: 'Uttar Pradesh', type: 'District', lat: 24.6853, lon: 83.0645 },
  { name: 'Chandauli', district: 'Chandauli', state: 'Uttar Pradesh', type: 'District', lat: 25.2606, lon: 83.2662 },
  { name: 'Pilibhit', district: 'Pilibhit', state: 'Uttar Pradesh', type: 'District', lat: 28.6318, lon: 79.8043 },
  { name: 'Shahjahanpur', district: 'Shahjahanpur', state: 'Uttar Pradesh', type: 'District', lat: 27.8805, lon: 79.9120 },
  { name: 'Badaun', district: 'Budaun', state: 'Uttar Pradesh', type: 'District', lat: 28.0315, lon: 79.1257 },
  { name: 'Rampur', district: 'Rampur', state: 'Uttar Pradesh', type: 'District', lat: 28.8154, lon: 79.0257 },
  { name: 'Bijnor', district: 'Bijnor', state: 'Uttar Pradesh', type: 'District', lat: 29.3724, lon: 78.1358 },
  { name: 'Bulandshahr', district: 'Bulandshahr', state: 'Uttar Pradesh', type: 'District', lat: 28.4069, lon: 77.8498 },
  { name: 'Hapur', district: 'Hapur', state: 'Uttar Pradesh', type: 'District', lat: 28.7306, lon: 77.7759 },
  { name: 'Baghpat', district: 'Baghpat', state: 'Uttar Pradesh', type: 'District', lat: 28.9452, lon: 77.2223 },
  { name: 'Shamli', district: 'Shamli', state: 'Uttar Pradesh', type: 'District', lat: 29.4497, lon: 77.3090 },

  // --- Bihar ---
  { name: 'Patna', district: 'Patna', state: 'Bihar', type: 'District', lat: 25.5941, lon: 85.1376 },
  { name: 'Gaya', district: 'Gaya', state: 'Bihar', type: 'District', lat: 24.7955, lon: 85.0002 },
  { name: 'Bhagalpur', district: 'Bhagalpur', state: 'Bihar', type: 'District', lat: 25.2425, lon: 86.9842 },
  { name: 'Muzaffarpur', district: 'Muzaffarpur', state: 'Bihar', type: 'District', lat: 26.1209, lon: 85.3647 },
  { name: 'Darbhanga', district: 'Darbhanga', state: 'Bihar', type: 'District', lat: 26.1542, lon: 85.8918 },
  { name: 'Purnia', district: 'Purnia', state: 'Bihar', type: 'District', lat: 25.7771, lon: 87.4753 },
  { name: 'Begusarai', district: 'Begusarai', state: 'Bihar', type: 'District', lat: 25.4182, lon: 86.1272 },
  { name: 'Katihar', district: 'Katihar', state: 'Bihar', type: 'District', lat: 25.5541, lon: 87.5714 },
  { name: 'Nalanda (Bihar Sharif)', district: 'Nalanda', state: 'Bihar', type: 'District', lat: 25.1979, lon: 85.5186 },
  { name: 'Rohtas (Sasaram)', district: 'Rohtas', state: 'Bihar', type: 'District', lat: 24.9500, lon: 84.0300 },
  { name: 'Samastipur', district: 'Samastipur', state: 'Bihar', type: 'District', lat: 25.8628, lon: 85.7811 },
  { name: 'Bhojpur (Ara)', district: 'Bhojpur', state: 'Bihar', type: 'District', lat: 25.5560, lon: 84.6603 },
  { name: 'Buxar', district: 'Buxar', state: 'Bihar', type: 'District', lat: 25.5647, lon: 83.9777 },
  { name: 'Kaimur (Bhabua)', district: 'Kaimur', state: 'Bihar', type: 'District', lat: 25.0449, lon: 83.6163 },
  { name: 'Vaishali (Hajipur)', district: 'Vaishali', state: 'Bihar', type: 'District', lat: 25.6858, lon: 85.2146 },
  { name: 'Saran (Chhapra)', district: 'Saran', state: 'Bihar', type: 'District', lat: 25.7796, lon: 84.7499 },
  { name: 'Siwan', district: 'Siwan', state: 'Bihar', type: 'District', lat: 26.2196, lon: 84.3567 },
  { name: 'Gopalganj', district: 'Gopalganj', state: 'Bihar', type: 'District', lat: 26.4674, lon: 84.4447 },
  { name: 'East Champaran (Motihari)', district: 'East Champaran', state: 'Bihar', type: 'District', lat: 26.6469, lon: 84.9089 },
  { name: 'West Champaran (Bettiah)', district: 'West Champaran', state: 'Bihar', type: 'District', lat: 26.8024, lon: 84.5028 },
  { name: 'Madhubani', district: 'Madhubani', state: 'Bihar', type: 'District', lat: 26.3544, lon: 86.0718 },
  { name: 'Saharsa', district: 'Saharsa', state: 'Bihar', type: 'District', lat: 25.8835, lon: 86.6006 },
  { name: 'Madhepura', district: 'Madhepura', state: 'Bihar', type: 'District', lat: 25.9262, lon: 86.8622 },
  { name: 'Supaul', district: 'Supaul', state: 'Bihar', type: 'District', lat: 26.1260, lon: 86.6074 },
  { name: 'Kishanganj', district: 'Kishanganj', state: 'Bihar', type: 'District', lat: 26.0967, lon: 87.9430 },
  { name: 'Araria', district: 'Araria', state: 'Bihar', type: 'District', lat: 26.1511, lon: 87.5139 },
  { name: 'Khagaria', district: 'Khagaria', state: 'Bihar', type: 'District', lat: 25.5034, lon: 86.4827 },
  { name: 'Munger', district: 'Munger', state: 'Bihar', type: 'District', lat: 25.3757, lon: 86.4744 },
  { name: 'Jamui', district: 'Jamui', state: 'Bihar', type: 'District', lat: 24.9213, lon: 86.2235 },
  { name: 'Nawada', district: 'Nawada', state: 'Bihar', type: 'District', lat: 24.8878, lon: 85.5428 },
  { name: 'Aurangabad', district: 'Aurangabad', state: 'Bihar', type: 'District', lat: 24.7539, lon: 84.3742 },
  { name: 'Jehanabad', district: 'Jehanabad', state: 'Bihar', type: 'District', lat: 25.2141, lon: 84.9859 },
  { name: 'Arwal', district: 'Arwal', state: 'Bihar', type: 'District', lat: 25.2442, lon: 84.6751 },

  // --- Maharashtra ---
  { name: 'Solapur', district: 'Solapur', state: 'Maharashtra', type: 'District', lat: 17.6599, lon: 75.9064 },
  { name: 'Pune', district: 'Pune', state: 'Maharashtra', type: 'District', lat: 18.5204, lon: 73.8567 },
  { name: 'Nagpur', district: 'Nagpur', state: 'Maharashtra', type: 'District', lat: 21.1458, lon: 79.0882 },
  { name: 'Nashik', district: 'Nashik', state: 'Maharashtra', type: 'District', lat: 19.9975, lon: 73.7898 },
  { name: 'Chhatrapati Sambhajinagar (Aurangabad)', district: 'Chhatrapati Sambhajinagar', state: 'Maharashtra', type: 'District', lat: 19.8762, lon: 75.3433 },
  { name: 'Kolhapur', district: 'Kolhapur', state: 'Maharashtra', type: 'District', lat: 16.7050, lon: 74.2433 },
  { name: 'Sangli', district: 'Sangli', state: 'Maharashtra', type: 'District', lat: 16.8524, lon: 74.5815 },
  { name: 'Satara', district: 'Satara', state: 'Maharashtra', type: 'District', lat: 17.6805, lon: 74.0183 },
  { name: 'Ahmednagar (Ahilyanagar)', district: 'Ahmednagar', state: 'Maharashtra', type: 'District', lat: 19.0948, lon: 74.7480 },
  { name: 'Amravati', district: 'Amravati', state: 'Maharashtra', type: 'District', lat: 20.9374, lon: 77.7796 },
  { name: 'Akola', district: 'Akola', state: 'Maharashtra', type: 'District', lat: 20.7002, lon: 77.0082 },
  { name: 'Yavatmal', district: 'Yavatmal', state: 'Maharashtra', type: 'District', lat: 20.3888, lon: 78.1204 },
  { name: 'Nanded', district: 'Nanded', state: 'Maharashtra', type: 'District', lat: 19.1383, lon: 77.3210 },
  { name: 'Latur', district: 'Latur', state: 'Maharashtra', type: 'District', lat: 18.4088, lon: 76.5604 },
  { name: 'Dharashiv (Osmanabad)', district: 'Dharashiv', state: 'Maharashtra', type: 'District', lat: 18.1861, lon: 76.0419 },
  { name: 'Parbhani', district: 'Parbhani', state: 'Maharashtra', type: 'District', lat: 19.2608, lon: 76.7748 },
  { name: 'Jalna', district: 'Jalna', state: 'Maharashtra', type: 'District', lat: 19.8410, lon: 75.8864 },
  { name: 'Beed', district: 'Beed', state: 'Maharashtra', type: 'District', lat: 18.9891, lon: 75.7601 },
  { name: 'Jalgaon', district: 'Jalgaon', state: 'Maharashtra', type: 'District', lat: 21.0077, lon: 75.5626 },
  { name: 'Dhule', district: 'Dhule', state: 'Maharashtra', type: 'District', lat: 20.9042, lon: 74.7749 },
  { name: 'Nandurbar', district: 'Nandurbar', state: 'Maharashtra', type: 'District', lat: 21.3700, lon: 74.2400 },
  { name: 'Buldhana', district: 'Buldhana', state: 'Maharashtra', type: 'District', lat: 20.5312, lon: 76.1822 },
  { name: 'Washim', district: 'Washim', state: 'Maharashtra', type: 'District', lat: 20.1110, lon: 77.1350 },
  { name: 'Wardha', district: 'Wardha', state: 'Maharashtra', type: 'District', lat: 20.7453, lon: 78.6022 },
  { name: 'Chandrapur', district: 'Chandrapur', state: 'Maharashtra', type: 'District', lat: 19.9615, lon: 79.2961 },
  { name: 'Gadchiroli', district: 'Gadchiroli', state: 'Maharashtra', type: 'District', lat: 20.1809, lon: 80.0005 },
  { name: 'Bhandara', district: 'Bhandara', state: 'Maharashtra', type: 'District', lat: 21.1714, lon: 79.6543 },
  { name: 'Gondia', district: 'Gondia', state: 'Maharashtra', type: 'District', lat: 21.4624, lon: 80.1961 },
  { name: 'Baramati', district: 'Pune', state: 'Maharashtra', type: 'Tehsil/Taluk', lat: 18.1519, lon: 74.5775 },
  { name: 'Shirwal', district: 'Satara', state: 'Maharashtra', type: 'Village Cluster', lat: 18.1365, lon: 73.9856 },
  { name: 'Sangamner', district: 'Ahmednagar', state: 'Maharashtra', type: 'Tehsil/Taluk', lat: 19.5777, lon: 74.2081 },
  { name: 'Kopergaon', district: 'Ahmednagar', state: 'Maharashtra', type: 'Tehsil/Taluk', lat: 19.8914, lon: 74.4789 },
  { name: 'Phaltan', district: 'Satara', state: 'Maharashtra', type: 'Tehsil/Taluk', lat: 17.9866, lon: 74.4333 },
  { name: 'Pandharpur', district: 'Solapur', state: 'Maharashtra', type: 'Tehsil/Taluk', lat: 17.6775, lon: 75.3244 },
  { name: 'Malshiras', district: 'Solapur', state: 'Maharashtra', type: 'Tehsil/Taluk', lat: 17.8428, lon: 74.9658 },
  { name: 'Akluj', district: 'Solapur', state: 'Maharashtra', type: 'Village Cluster', lat: 17.8912, lon: 75.0245 },
  { name: 'Ratnagiri', district: 'Ratnagiri', state: 'Maharashtra', type: 'District', lat: 16.9902, lon: 73.3120 },
  { name: 'Sindhudurg (Oros)', district: 'Sindhudurg', state: 'Maharashtra', type: 'District', lat: 16.0354, lon: 73.6828 },
  { name: 'Raigad (Alibag)', district: 'Raigad', state: 'Maharashtra', type: 'District', lat: 18.6534, lon: 72.8777 },
  { name: 'Thane', district: 'Thane', state: 'Maharashtra', type: 'District', lat: 19.2183, lon: 72.9781 },
  { name: 'Palghar', district: 'Palghar', state: 'Maharashtra', type: 'District', lat: 19.6967, lon: 72.7699 },

  // --- Andhra Pradesh ---
  { name: 'Guntur', district: 'Guntur', state: 'Andhra Pradesh', type: 'District', lat: 16.3067, lon: 80.4365 },
  { name: 'Vijayawada (NTR District)', district: 'NTR', state: 'Andhra Pradesh', type: 'District', lat: 16.5062, lon: 80.6480 },
  { name: 'Visakhapatnam', district: 'Visakhapatnam', state: 'Andhra Pradesh', type: 'District', lat: 17.6868, lon: 83.2185 },
  { name: 'Kurnool', district: 'Kurnool', state: 'Andhra Pradesh', type: 'District', lat: 15.8281, lon: 78.0373 },
  { name: 'Anantapur', district: 'Ananthapuramu', state: 'Andhra Pradesh', type: 'District', lat: 14.6819, lon: 77.6006 },
  { name: 'Nellore (SPSR Nellore)', district: 'SPSR Nellore', state: 'Andhra Pradesh', type: 'District', lat: 14.4426, lon: 79.9865 },
  { name: 'Kadapa (YSR District)', district: 'YSR', state: 'Andhra Pradesh', type: 'District', lat: 14.4673, lon: 78.8242 },
  { name: 'Tirupati', district: 'Tirupati', state: 'Andhra Pradesh', type: 'District', lat: 13.6288, lon: 79.4192 },
  { name: 'Chittoor', district: 'Chittoor', state: 'Andhra Pradesh', type: 'District', lat: 13.2172, lon: 79.1003 },
  { name: 'Kakinada', district: 'Kakinada', state: 'Andhra Pradesh', type: 'District', lat: 16.9891, lon: 82.2475 },
  { name: 'Rajahmundry (East Godavari)', district: 'East Godavari', state: 'Andhra Pradesh', type: 'District', lat: 17.0005, lon: 81.8040 },
  { name: 'Eluru', district: 'Eluru', state: 'Andhra Pradesh', type: 'District', lat: 16.7107, lon: 81.0952 },
  { name: 'Bhimavaram (West Godavari)', district: 'West Godavari', state: 'Andhra Pradesh', type: 'District', lat: 16.5449, lon: 81.5212 },
  { name: 'Ongole (Prakasam)', district: 'Prakasam', state: 'Andhra Pradesh', type: 'District', lat: 15.5057, lon: 80.0499 },
  { name: 'Machilipatnam (Krishna)', district: 'Krishna', state: 'Andhra Pradesh', type: 'District', lat: 16.1875, lon: 81.1389 },
  { name: 'Srikakulam', district: 'Srikakulam', state: 'Andhra Pradesh', type: 'District', lat: 18.2949, lon: 83.8938 },
  { name: 'Vizianagaram', district: 'Vizianagaram', state: 'Andhra Pradesh', type: 'District', lat: 18.1133, lon: 83.3977 },
  { name: 'Nandyal', district: 'Nandyal', state: 'Andhra Pradesh', type: 'District', lat: 15.4851, lon: 78.4867 },
  { name: 'Dharmavaram', district: 'Sri Sathya Sai', state: 'Andhra Pradesh', type: 'Tehsil/Taluk', lat: 14.4137, lon: 77.7126 },
  { name: 'Tenali', district: 'Guntur', state: 'Andhra Pradesh', type: 'Tehsil/Taluk', lat: 16.2437, lon: 80.6400 },
  { name: 'Gudivada', district: 'Krishna', state: 'Andhra Pradesh', type: 'Tehsil/Taluk', lat: 16.4410, lon: 80.9926 },

  // --- Telangana ---
  { name: 'Hyderabad', district: 'Hyderabad', state: 'Telangana', type: 'District', lat: 17.3850, lon: 78.4867 },
  { name: 'Warangal', district: 'Warangal', state: 'Telangana', type: 'District', lat: 17.9689, lon: 79.5941 },
  { name: 'Karimnagar', district: 'Karimnagar', state: 'Telangana', type: 'District', lat: 18.4386, lon: 79.1288 },
  { name: 'Nizamabad', district: 'Nizamabad', state: 'Telangana', type: 'District', lat: 18.6725, lon: 78.0941 },
  { name: 'Khammam', district: 'Khammam', state: 'Telangana', type: 'District', lat: 17.2473, lon: 80.1514 },
  { name: 'Nalgonda', district: 'Nalgonda', state: 'Telangana', type: 'District', lat: 17.0577, lon: 79.2684 },
  { name: 'Mahabubnagar', district: 'Mahabubnagar', state: 'Telangana', type: 'District', lat: 16.7488, lon: 77.9840 },
  { name: 'Adilabad', district: 'Adilabad', state: 'Telangana', type: 'District', lat: 19.6641, lon: 78.5320 },
  { name: 'Medak', district: 'Medak', state: 'Telangana', type: 'District', lat: 18.0478, lon: 78.2618 },
  { name: 'Sangareddy', district: 'Sangareddy', state: 'Telangana', type: 'District', lat: 17.6193, lon: 78.0815 },
  { name: 'Siddipet', district: 'Siddipet', state: 'Telangana', type: 'District', lat: 18.1018, lon: 78.8520 },
  { name: 'Suryapet', district: 'Suryapet', state: 'Telangana', type: 'District', lat: 17.1439, lon: 79.6239 },
  { name: 'Jagtial', district: 'Jagtial', state: 'Telangana', type: 'District', lat: 18.7946, lon: 78.9125 },
  { name: 'Mancherial', district: 'Mancherial', state: 'Telangana', type: 'District', lat: 18.8679, lon: 79.4639 },
  { name: 'Bhadradri Kothagudem', district: 'Bhadradri Kothagudem', state: 'Telangana', type: 'District', lat: 17.5529, lon: 80.6186 },

  // --- Tamil Nadu ---
  { name: 'Coimbatore', district: 'Coimbatore', state: 'Tamil Nadu', type: 'District', lat: 11.0168, lon: 76.9558 },
  { name: 'Madurai', district: 'Madurai', state: 'Tamil Nadu', type: 'District', lat: 9.9252, lon: 78.1198 },
  { name: 'Tiruchirappalli (Trichy)', district: 'Tiruchirappalli', state: 'Tamil Nadu', type: 'District', lat: 10.7905, lon: 78.7047 },
  { name: 'Salem', district: 'Salem', state: 'Tamil Nadu', type: 'District', lat: 11.6643, lon: 78.1460 },
  { name: 'Tirunelveli', district: 'Tirunelveli', state: 'Tamil Nadu', type: 'District', lat: 8.7139, lon: 77.7567 },
  { name: 'Thanjavur (Tanjore Delta)', district: 'Thanjavur', state: 'Tamil Nadu', type: 'District', lat: 10.7870, lon: 79.1378 },
  { name: 'Erode', district: 'Erode', state: 'Tamil Nadu', type: 'District', lat: 11.3410, lon: 77.7172 },
  { name: 'Vellore', district: 'Vellore', state: 'Tamil Nadu', type: 'District', lat: 12.9165, lon: 79.1325 },
  { name: 'Thoothukudi (Tuticorin)', district: 'Thoothukudi', state: 'Tamil Nadu', type: 'District', lat: 8.7642, lon: 78.1348 },
  { name: 'Dindigul', district: 'Dindigul', state: 'Tamil Nadu', type: 'District', lat: 10.3673, lon: 77.9803 },
  { name: 'Tiruppur', district: 'Tiruppur', state: 'Tamil Nadu', type: 'District', lat: 11.1085, lon: 77.3411 },
  { name: 'Cuddalore', district: 'Cuddalore', state: 'Tamil Nadu', type: 'District', lat: 11.7480, lon: 79.7714 },
  { name: 'Kanchipuram', district: 'Kanchipuram', state: 'Tamil Nadu', type: 'District', lat: 12.8342, lon: 79.7036 },
  { name: 'Villupuram', district: 'Villupuram', state: 'Tamil Nadu', type: 'District', lat: 11.9401, lon: 79.4861 },
  { name: 'Nagapattinam', district: 'Nagapattinam', state: 'Tamil Nadu', type: 'District', lat: 10.7672, lon: 79.8449 },
  { name: 'Tiruvarur', district: 'Tiruvarur', state: 'Tamil Nadu', type: 'District', lat: 10.7725, lon: 79.6366 },
  { name: 'Pudukkottai', district: 'Pudukkottai', state: 'Tamil Nadu', type: 'District', lat: 10.3797, lon: 78.8208 },
  { name: 'Sivaganga', district: 'Sivaganga', state: 'Tamil Nadu', type: 'District', lat: 9.8433, lon: 78.4809 },
  { name: 'Virudhunagar', district: 'Virudhunagar', state: 'Tamil Nadu', type: 'District', lat: 9.5680, lon: 77.9624 },
  { name: 'Theni', district: 'Theni', state: 'Tamil Nadu', type: 'District', lat: 10.0104, lon: 77.4768 },
  { name: 'Karur', district: 'Karur', state: 'Tamil Nadu', type: 'District', lat: 10.9601, lon: 78.0766 },
  { name: 'Namakkal', district: 'Namakkal', state: 'Tamil Nadu', type: 'District', lat: 11.2189, lon: 78.1674 },
  { name: 'Dharmapuri', district: 'Dharmapuri', state: 'Tamil Nadu', type: 'District', lat: 12.1211, lon: 78.1582 },
  { name: 'Krishnagiri', district: 'Krishnagiri', state: 'Tamil Nadu', type: 'District', lat: 12.5186, lon: 78.2137 },
  { name: 'Tiruvannamalai', district: 'Tiruvannamalai', state: 'Tamil Nadu', type: 'District', lat: 12.2253, lon: 79.0747 },
  { name: 'Nilgiris (Ooty)', district: 'Nilgiris', state: 'Tamil Nadu', type: 'District', lat: 11.4102, lon: 76.6950 },
  { name: 'Kanniyakumari (Nagercoil)', district: 'Kanniyakumari', state: 'Tamil Nadu', type: 'District', lat: 8.1833, lon: 77.4119 },
  { name: 'Cumbum', district: 'Theni', state: 'Tamil Nadu', type: 'Tehsil/Taluk', lat: 9.7344, lon: 77.2811 },
  { name: 'Pollachi', district: 'Coimbatore', state: 'Tamil Nadu', type: 'Tehsil/Taluk', lat: 10.6582, lon: 77.0094 },
  { name: 'Kumbakonam', district: 'Thanjavur', state: 'Tamil Nadu', type: 'Tehsil/Taluk', lat: 10.9602, lon: 79.3845 },

  // --- Karnataka ---
  { name: 'Bengaluru (Bangalore)', district: 'Bengaluru Urban', state: 'Karnataka', type: 'District', lat: 12.9716, lon: 77.5946 },
  { name: 'Mysuru (Mysore)', district: 'Mysuru', state: 'Karnataka', type: 'District', lat: 12.2958, lon: 76.6394 },
  { name: 'Hubballi-Dharwad', district: 'Dharwad', state: 'Karnataka', type: 'District', lat: 15.3647, lon: 75.1240 },
  { name: 'Belagavi (Belgaum)', district: 'Belagavi', state: 'Karnataka', type: 'District', lat: 15.8497, lon: 74.4977 },
  { name: 'Kalaburagi (Gulbarga)', district: 'Kalaburagi', state: 'Karnataka', type: 'District', lat: 17.3297, lon: 76.8343 },
  { name: 'Ballari (Bellary)', district: 'Ballari', state: 'Karnataka', type: 'District', lat: 15.1394, lon: 76.9214 },
  { name: 'Vijayapura (Bijapur)', district: 'Vijayapura', state: 'Karnataka', type: 'District', lat: 16.8302, lon: 75.7100 },
  { name: 'Shivamogga (Shimoga)', district: 'Shivamogga', state: 'Karnataka', type: 'District', lat: 13.9299, lon: 75.5681 },
  { name: 'Tumakuru (Tumkur)', district: 'Tumakuru', state: 'Karnataka', type: 'District', lat: 13.3379, lon: 77.1010 },
  { name: 'Raichur', district: 'Raichur', state: 'Karnataka', type: 'District', lat: 16.2076, lon: 77.3463 },
  { name: 'Bidar', district: 'Bidar', state: 'Karnataka', type: 'District', lat: 17.9104, lon: 77.5199 },
  { name: 'Hassan', district: 'Hassan', state: 'Karnataka', type: 'District', lat: 13.0033, lon: 76.1004 },
  { name: 'Mandya', district: 'Mandya', state: 'Karnataka', type: 'District', lat: 12.5218, lon: 76.8951 },
  { name: 'Davangere', district: 'Davangere', state: 'Karnataka', type: 'District', lat: 14.4644, lon: 75.9218 },
  { name: 'Chikkamagaluru', district: 'Chikkamagaluru', state: 'Karnataka', type: 'District', lat: 13.3153, lon: 75.7754 },
  { name: 'Kodagu (Coorg / Madikeri)', district: 'Kodagu', state: 'Karnataka', type: 'District', lat: 12.4244, lon: 75.7382 },
  { name: 'Udupi', district: 'Udupi', state: 'Karnataka', type: 'District', lat: 13.3409, lon: 74.7421 },
  { name: 'Dakshina Kannada (Mangaluru)', district: 'Dakshina Kannada', state: 'Karnataka', type: 'District', lat: 12.9141, lon: 74.8560 },
  { name: 'Uttara Kannada (Karwar)', district: 'Uttara Kannada', state: 'Karnataka', type: 'District', lat: 14.8185, lon: 74.1416 },
  { name: 'Bagalkote', district: 'Bagalkote', state: 'Karnataka', type: 'District', lat: 16.1691, lon: 75.6615 },
  { name: 'Koppal', district: 'Koppal', state: 'Karnataka', type: 'District', lat: 15.3470, lon: 76.1550 },
  { name: 'Gadag', district: 'Gadag', state: 'Karnataka', type: 'District', lat: 15.4319, lon: 75.6358 },
  { name: 'Chitradurga', district: 'Chitradurga', state: 'Karnataka', type: 'District', lat: 14.2251, lon: 76.3980 },
  { name: 'Kolar', district: 'Kolar', state: 'Karnataka', type: 'District', lat: 13.1360, lon: 78.1292 },
  { name: 'Chikkaballapura', district: 'Chikkaballapura', state: 'Karnataka', type: 'District', lat: 13.4325, lon: 77.7275 },
  { name: 'Yadgir', district: 'Yadgir', state: 'Karnataka', type: 'District', lat: 16.7700, lon: 77.1300 },
  { name: 'Chamarajanagar', district: 'Chamarajanagar', state: 'Karnataka', type: 'District', lat: 11.9261, lon: 76.9437 },

  // --- Rajasthan ---
  { name: 'Jaipur', district: 'Jaipur', state: 'Rajasthan', type: 'District', lat: 26.9124, lon: 75.7873 },
  { name: 'Jodhpur', district: 'Jodhpur', state: 'Rajasthan', type: 'District', lat: 26.2389, lon: 73.0243 },
  { name: 'Kota', district: 'Kota', state: 'Rajasthan', type: 'District', lat: 25.2138, lon: 75.8648 },
  { name: 'Bikaner', district: 'Bikaner', state: 'Rajasthan', type: 'District', lat: 28.0229, lon: 73.3119 },
  { name: 'Ajmer', district: 'Ajmer', state: 'Rajasthan', type: 'District', lat: 26.4499, lon: 74.6399 },
  { name: 'Udaipur', district: 'Udaipur', state: 'Rajasthan', type: 'District', lat: 24.5854, lon: 73.7125 },
  { name: 'Sri Ganganagar', district: 'Ganganagar', state: 'Rajasthan', type: 'District', lat: 29.9038, lon: 73.8772 },
  { name: 'Hanumangarh', district: 'Hanumangarh', state: 'Rajasthan', type: 'District', lat: 29.5818, lon: 74.3294 },
  { name: 'Alwar', district: 'Alwar', state: 'Rajasthan', type: 'District', lat: 27.5530, lon: 76.6346 },
  { name: 'Bharatpur', district: 'Bharatpur', state: 'Rajasthan', type: 'District', lat: 27.2152, lon: 77.5030 },
  { name: 'Barmer', district: 'Barmer', state: 'Rajasthan', type: 'District', lat: 25.7521, lon: 71.3967 },
  { name: 'Nagaur', district: 'Nagaur', state: 'Rajasthan', type: 'District', lat: 27.1983, lon: 73.7493 },
  { name: 'Sikar', district: 'Sikar', state: 'Rajasthan', type: 'District', lat: 27.6094, lon: 75.1398 },
  { name: 'Pali', district: 'Pali', state: 'Rajasthan', type: 'District', lat: 25.7711, lon: 73.3234 },
  { name: 'Jaisalmer', district: 'Jaisalmer', state: 'Rajasthan', type: 'District', lat: 26.9157, lon: 70.9083 },
  { name: 'Chittorgarh', district: 'Chittorgarh', state: 'Rajasthan', type: 'District', lat: 24.8887, lon: 74.6269 },
  { name: 'Bhilwara', district: 'Bhilwara', state: 'Rajasthan', type: 'District', lat: 25.3407, lon: 74.6313 },
  { name: 'Jhalawar', district: 'Jhalawar', state: 'Rajasthan', type: 'District', lat: 24.5973, lon: 76.1611 },
  { name: 'Baran', district: 'Baran', state: 'Rajasthan', type: 'District', lat: 25.1011, lon: 76.5132 },
  { name: 'Tonk', district: 'Tonk', state: 'Rajasthan', type: 'District', lat: 26.1664, lon: 75.7885 },

  // --- Madhya Pradesh ---
  { name: 'Indore', district: 'Indore', state: 'Madhya Pradesh', type: 'District', lat: 22.7196, lon: 75.8577 },
  { name: 'Bhopal', district: 'Bhopal', state: 'Madhya Pradesh', type: 'District', lat: 23.2599, lon: 77.4126 },
  { name: 'Jabalpur', district: 'Jabalpur', state: 'Madhya Pradesh', type: 'District', lat: 23.1815, lon: 79.9864 },
  { name: 'Gwalior', district: 'Gwalior', state: 'Madhya Pradesh', type: 'District', lat: 26.2183, lon: 78.1828 },
  { name: 'Ujjain', district: 'Ujjain', state: 'Madhya Pradesh', type: 'District', lat: 23.1765, lon: 75.7885 },
  { name: 'Sagar', district: 'Sagar', state: 'Madhya Pradesh', type: 'District', lat: 23.8388, lon: 78.7378 },
  { name: 'Hoshangabad (Narmadapuram)', district: 'Narmadapuram', state: 'Madhya Pradesh', type: 'District', lat: 22.7519, lon: 77.7289 },
  { name: 'Dewas', district: 'Dewas', state: 'Madhya Pradesh', type: 'District', lat: 22.9676, lon: 76.0534 },
  { name: 'Satna', district: 'Satna', state: 'Madhya Pradesh', type: 'District', lat: 24.6005, lon: 80.8322 },
  { name: 'Rewa', district: 'Rewa', state: 'Madhya Pradesh', type: 'District', lat: 24.5362, lon: 81.3037 },
  { name: 'Ratlam', district: 'Ratlam', state: 'Madhya Pradesh', type: 'District', lat: 23.3315, lon: 75.0367 },
  { name: 'Chhindwara', district: 'Chhindwara', state: 'Madhya Pradesh', type: 'District', lat: 22.0574, lon: 78.9382 },
  { name: 'Sehore', district: 'Sehore', state: 'Madhya Pradesh', type: 'District', lat: 23.2031, lon: 77.0844 },
  { name: 'Vidisha', district: 'Vidisha', state: 'Madhya Pradesh', type: 'District', lat: 23.5251, lon: 77.8081 },
  { name: 'Morena', district: 'Morena', state: 'Madhya Pradesh', type: 'District', lat: 26.4947, lon: 77.9939 },
  { name: 'Bhind', district: 'Bhind', state: 'Madhya Pradesh', type: 'District', lat: 26.5652, lon: 78.7889 },
  { name: 'Shivpuri', district: 'Shivpuri', state: 'Madhya Pradesh', type: 'District', lat: 25.4244, lon: 77.6599 },
  { name: 'Mandsaur', district: 'Mandsaur', state: 'Madhya Pradesh', type: 'District', lat: 24.0725, lon: 75.0694 },
  { name: 'Neemuch', district: 'Neemuch', state: 'Madhya Pradesh', type: 'District', lat: 24.4746, lon: 74.8703 },
  { name: 'Khargone (West Nimar)', district: 'Khargone', state: 'Madhya Pradesh', type: 'District', lat: 21.8236, lon: 75.6094 },
  { name: 'Khandwa (East Nimar)', district: 'Khandwa', state: 'Madhya Pradesh', type: 'District', lat: 21.8314, lon: 76.3498 },
  { name: 'Pipariya', district: 'Narmadapuram', state: 'Madhya Pradesh', type: 'Tehsil/Taluk', lat: 22.7583, lon: 78.3546 },

  // --- Gujarat ---
  { name: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat', type: 'District', lat: 23.0225, lon: 72.5714 },
  { name: 'Surat', district: 'Surat', state: 'Gujarat', type: 'District', lat: 21.1702, lon: 72.8311 },
  { name: 'Vadodara (Baroda)', district: 'Vadodara', state: 'Gujarat', type: 'District', lat: 22.3072, lon: 73.1812 },
  { name: 'Rajkot', district: 'Rajkot', state: 'Gujarat', type: 'District', lat: 22.3039, lon: 70.8022 },
  { name: 'Bhavnagar', district: 'Bhavnagar', state: 'Gujarat', type: 'District', lat: 21.7645, lon: 72.1519 },
  { name: 'Jamnagar', district: 'Jamnagar', state: 'Gujarat', type: 'District', lat: 22.4707, lon: 70.0577 },
  { name: 'Junagadh', district: 'Junagadh', state: 'Gujarat', type: 'District', lat: 21.5222, lon: 70.4579 },
  { name: 'Anand (Milk Capital)', district: 'Anand', state: 'Gujarat', type: 'District', lat: 22.5645, lon: 72.9289 },
  { name: 'Mehsana', district: 'Mehsana', state: 'Gujarat', type: 'District', lat: 23.5880, lon: 72.3693 },
  { name: 'Banaskantha (Palanpur)', district: 'Banaskantha', state: 'Gujarat', type: 'District', lat: 24.1724, lon: 72.4346 },
  { name: 'Sabarkantha (Himmatnagar)', district: 'Sabarkantha', state: 'Gujarat', type: 'District', lat: 23.5977, lon: 72.9667 },
  { name: 'Kheda (Nadiad)', district: 'Kheda', state: 'Gujarat', type: 'District', lat: 22.6939, lon: 72.8616 },
  { name: 'Bharuch', district: 'Bharuch', state: 'Gujarat', type: 'District', lat: 21.7051, lon: 72.9959 },
  { name: 'Navsari', district: 'Navsari', state: 'Gujarat', type: 'District', lat: 20.9467, lon: 72.9520 },
  { name: 'Valsad', district: 'Valsad', state: 'Gujarat', type: 'District', lat: 20.5992, lon: 72.9342 },
  { name: 'Amreli', district: 'Amreli', state: 'Gujarat', type: 'District', lat: 21.6032, lon: 71.2221 },
  { name: 'Surendranagar', district: 'Surendranagar', state: 'Gujarat', type: 'District', lat: 22.7274, lon: 71.6370 },
  { name: 'Kutch (Bhuj)', district: 'Kutch', state: 'Gujarat', type: 'District', lat: 23.2420, lon: 69.6669 },
  { name: 'Patan', district: 'Patan', state: 'Gujarat', type: 'District', lat: 23.8493, lon: 72.1266 },

  // --- West Bengal ---
  { name: 'Kolkata', district: 'Kolkata', state: 'West Bengal', type: 'District', lat: 22.5726, lon: 88.3639 },
  { name: 'Bardhaman (Purba Bardhaman)', district: 'Purba Bardhaman', state: 'West Bengal', type: 'District', lat: 23.2324, lon: 87.8615 },
  { name: 'Hooghly (Chinsurah)', district: 'Hooghly', state: 'West Bengal', type: 'District', lat: 22.9089, lon: 88.3968 },
  { name: 'Murshidabad (Baharampur)', district: 'Murshidabad', state: 'West Bengal', type: 'District', lat: 24.0988, lon: 88.2679 },
  { name: 'Nadia (Krishnanagar)', district: 'Nadia', state: 'West Bengal', type: 'District', lat: 23.4013, lon: 88.4952 },
  { name: 'North 24 Parganas (Barasat)', district: 'North 24 Parganas', state: 'West Bengal', type: 'District', lat: 22.7230, lon: 88.4800 },
  { name: 'South 24 Parganas (Alipore)', district: 'South 24 Parganas', state: 'West Bengal', type: 'District', lat: 22.5312, lon: 88.3283 },
  { name: 'Midnapore (Paschim Medinipur)', district: 'Paschim Medinipur', state: 'West Bengal', type: 'District', lat: 22.4257, lon: 87.3199 },
  { name: 'Purba Medinipur (Tamluk)', district: 'Purba Medinipur', state: 'West Bengal', type: 'District', lat: 22.2982, lon: 87.9254 },
  { name: 'Malda', district: 'Malda', state: 'West Bengal', type: 'District', lat: 25.0108, lon: 88.1411 },
  { name: 'Jalpaiguri', district: 'Jalpaiguri', state: 'West Bengal', type: 'District', lat: 26.5405, lon: 88.7194 },
  { name: 'Darjeeling (Tea Hills)', district: 'Darjeeling', state: 'West Bengal', type: 'District', lat: 27.0410, lon: 88.2663 },
  { name: 'Cooch Behar', district: 'Cooch Behar', state: 'West Bengal', type: 'District', lat: 26.3239, lon: 89.4510 },
  { name: 'Alipurduar', district: 'Alipurduar', state: 'West Bengal', type: 'District', lat: 26.4919, lon: 89.5271 },
  { name: 'Birbhum (Suri)', district: 'Birbhum', state: 'West Bengal', type: 'District', lat: 23.9054, lon: 87.5246 },
  { name: 'Bankura', district: 'Bankura', state: 'West Bengal', type: 'District', lat: 23.2323, lon: 87.0716 },
  { name: 'Purulia', district: 'Purulia', state: 'West Bengal', type: 'District', lat: 23.3322, lon: 86.3652 },

  // --- Odisha ---
  { name: 'Bhubaneswar (Khurda)', district: 'Khurda', state: 'Odisha', type: 'District', lat: 20.2961, lon: 85.8245 },
  { name: 'Cuttack', district: 'Cuttack', state: 'Odisha', type: 'District', lat: 20.4625, lon: 85.8828 },
  { name: 'Sambalpur', district: 'Sambalpur', state: 'Odisha', type: 'District', lat: 21.4669, lon: 83.9812 },
  { name: 'Bargarh (Rice Bowl)', district: 'Bargarh', state: 'Odisha', type: 'District', lat: 21.3333, lon: 83.6167 },
  { name: 'Balasore', district: 'Balasore', state: 'Odisha', type: 'District', lat: 21.4934, lon: 86.9135 },
  { name: 'Bhadrak', district: 'Bhadrak', state: 'Odisha', type: 'District', lat: 21.0544, lon: 86.4955 },
  { name: 'Ganjam (Chhatrapur)', district: 'Ganjam', state: 'Odisha', type: 'District', lat: 19.3547, lon: 84.9866 },
  { name: 'Puri', district: 'Puri', state: 'Odisha', type: 'District', lat: 19.8135, lon: 85.8312 },
  { name: 'Kalahandi (Bhawanipatna)', district: 'Kalahandi', state: 'Odisha', type: 'District', lat: 19.9014, lon: 83.1649 },
  { name: 'Balangir', district: 'Balangir', state: 'Odisha', type: 'District', lat: 20.7107, lon: 83.4867 },
  { name: 'Koraput', district: 'Koraput', state: 'Odisha', type: 'District', lat: 18.8135, lon: 82.7118 },
  { name: 'Mayurbhanj (Baripada)', district: 'Mayurbhanj', state: 'Odisha', type: 'District', lat: 21.9322, lon: 86.7380 },
  { name: 'Angul', district: 'Angul', state: 'Odisha', type: 'District', lat: 20.8444, lon: 85.1011 },
  { name: 'Dhenkanal', district: 'Dhenkanal', state: 'Odisha', type: 'District', lat: 20.6698, lon: 85.5956 },

  // --- Assam & Northeast ---
  { name: 'Guwahati (Kamrup Metro)', district: 'Kamrup Metropolitan', state: 'Assam', type: 'District', lat: 26.1445, lon: 91.7362 },
  { name: 'Jorhat (Tea Research)', district: 'Jorhat', state: 'Assam', type: 'District', lat: 26.7509, lon: 94.2037 },
  { name: 'Dibrugarh', district: 'Dibrugarh', state: 'Assam', type: 'District', lat: 27.4728, lon: 94.9120 },
  { name: 'Silchar (Cachar)', district: 'Cachar', state: 'Assam', type: 'District', lat: 24.8333, lon: 92.7789 },
  { name: 'Tezpur (Sonitpur)', district: 'Sonitpur', state: 'Assam', type: 'District', lat: 26.6528, lon: 92.7926 },
  { name: 'Nagaon', district: 'Nagaon', state: 'Assam', type: 'District', lat: 26.3468, lon: 92.6840 },
  { name: 'Tinsukia', district: 'Tinsukia', state: 'Assam', type: 'District', lat: 27.4922, lon: 95.3468 },
  { name: 'Barpeta', district: 'Barpeta', state: 'Assam', type: 'District', lat: 26.3213, lon: 91.0060 },
  { name: 'Golaghat', district: 'Golaghat', state: 'Assam', type: 'District', lat: 26.5173, lon: 93.9688 },
  { name: 'Sivasagar', district: 'Sivasagar', state: 'Assam', type: 'District', lat: 26.9826, lon: 94.6425 },
  { name: 'Shillong (East Khasi Hills)', district: 'East Khasi Hills', state: 'Meghalaya', type: 'District', lat: 25.5788, lon: 91.8933 },
  { name: 'Imphal', district: 'Imphal West', state: 'Manipur', type: 'District', lat: 24.8170, lon: 93.9368 },
  { name: 'Aizawl', district: 'Aizawl', state: 'Mizoram', type: 'District', lat: 23.7271, lon: 92.7176 },
  { name: 'Kohima', district: 'Kohima', state: 'Nagaland', type: 'District', lat: 25.6751, lon: 94.1086 },
  { name: 'Agartala', district: 'West Tripura', state: 'Tripura', type: 'District', lat: 23.8315, lon: 91.2868 },
  { name: 'Gangtok', district: 'East Sikkim', state: 'Sikkim', type: 'District', lat: 27.3314, lon: 88.6138 },
  { name: 'Itanagar', district: 'Papum Pare', state: 'Arunachal Pradesh', type: 'District', lat: 27.0844, lon: 93.6053 },

  // --- Kerala ---
  { name: 'Thiruvananthapuram', district: 'Thiruvananthapuram', state: 'Kerala', type: 'District', lat: 8.5241, lon: 76.9366 },
  { name: 'Kochi (Ernakulam)', district: 'Ernakulam', state: 'Kerala', type: 'District', lat: 9.9312, lon: 76.2673 },
  { name: 'Kozhikode (Calicut)', district: 'Kozhikode', state: 'Kerala', type: 'District', lat: 11.2588, lon: 75.7804 },
  { name: 'Thrissur', district: 'Thrissur', state: 'Kerala', type: 'District', lat: 10.5276, lon: 76.2144 },
  { name: 'Palakkad (Rice Bowl of Kerala)', district: 'Palakkad', state: 'Kerala', type: 'District', lat: 10.7867, lon: 76.6548 },
  { name: 'Wayanad (Kalpetta - Plantation)', district: 'Wayanad', state: 'Kerala', type: 'District', lat: 11.6050, lon: 76.0830 },
  { name: 'Idukki (Painavu - Cardamom Hills)', district: 'Idukki', state: 'Kerala', type: 'District', lat: 9.8497, lon: 76.9723 },
  { name: 'Kottayam (Rubber Capital)', district: 'Kottayam', state: 'Kerala', type: 'District', lat: 9.5916, lon: 76.5222 },
  { name: 'Alappuzha (Kuttanad Wetland)', district: 'Alappuzha', state: 'Kerala', type: 'District', lat: 9.4981, lon: 76.3388 },
  { name: 'Kollam', district: 'Kollam', state: 'Kerala', type: 'District', lat: 8.8932, lon: 76.6141 },
  { name: 'Malappuram', district: 'Malappuram', state: 'Kerala', type: 'District', lat: 11.0510, lon: 76.0711 },
  { name: 'Kannur', district: 'Kannur', state: 'Kerala', type: 'District', lat: 11.8745, lon: 75.3704 },
  { name: 'Kasaragod', district: 'Kasaragod', state: 'Kerala', type: 'District', lat: 12.4996, lon: 74.9869 },
  { name: 'Pathanamthitta', district: 'Pathanamthitta', state: 'Kerala', type: 'District', lat: 9.2648, lon: 76.7870 },

  // --- Chhattisgarh & Jharkhand ---
  { name: 'Raipur', district: 'Raipur', state: 'Chhattisgarh', type: 'District', lat: 21.2514, lon: 81.6296 },
  { name: 'Bilaspur', district: 'Bilaspur', state: 'Chhattisgarh', type: 'District', lat: 22.0797, lon: 82.1409 },
  { name: 'Durg', district: 'Durg', state: 'Chhattisgarh', type: 'District', lat: 21.1904, lon: 81.2849 },
  { name: 'Rajnandgaon', district: 'Rajnandgaon', state: 'Chhattisgarh', type: 'District', lat: 21.0974, lon: 81.0374 },
  { name: 'Bastar (Jagdalpur)', district: 'Bastar', state: 'Chhattisgarh', type: 'District', lat: 19.0748, lon: 82.0081 },
  { name: 'Janjgir-Champa', district: 'Janjgir-Champa', state: 'Chhattisgarh', type: 'District', lat: 22.0167, lon: 82.5667 },
  { name: 'Raigarh', district: 'Raigarh', state: 'Chhattisgarh', type: 'District', lat: 21.8974, lon: 83.3950 },
  { name: 'Korba', district: 'Korba', state: 'Chhattisgarh', type: 'District', lat: 22.3595, lon: 82.7501 },
  { name: 'Ranchi', district: 'Ranchi', state: 'Jharkhand', type: 'District', lat: 23.3441, lon: 85.3096 },
  { name: 'Jamshedpur (East Singhbhum)', district: 'East Singhbhum', state: 'Jharkhand', type: 'District', lat: 22.8046, lon: 86.2029 },
  { name: 'Dhanbad', district: 'Dhanbad', state: 'Jharkhand', type: 'District', lat: 23.7957, lon: 86.4304 },
  { name: 'Bokaro', district: 'Bokaro', state: 'Jharkhand', type: 'District', lat: 23.6693, lon: 86.1511 },
  { name: 'Hazaribagh', district: 'Hazaribagh', state: 'Jharkhand', type: 'District', lat: 23.9937, lon: 85.3637 },
  { name: 'Deoghar', district: 'Deoghar', state: 'Jharkhand', type: 'District', lat: 24.4826, lon: 86.7011 },
  { name: 'Dumka', district: 'Dumka', state: 'Jharkhand', type: 'District', lat: 24.2694, lon: 87.2486 },
  { name: 'Giridih', district: 'Giridih', state: 'Jharkhand', type: 'District', lat: 24.1884, lon: 86.3093 },
  { name: 'Palamu (Medininagar)', district: 'Palamu', state: 'Jharkhand', type: 'District', lat: 24.0378, lon: 84.0700 },

  // --- Himachal Pradesh & Uttarakhand ---
  { name: 'Shimla', district: 'Shimla', state: 'Himachal Pradesh', type: 'District', lat: 31.1048, lon: 77.1734 },
  { name: 'Kullu', district: 'Kullu', state: 'Himachal Pradesh', type: 'District', lat: 31.9579, lon: 77.1095 },
  { name: 'Mandi', district: 'Mandi', state: 'Himachal Pradesh', type: 'District', lat: 31.7087, lon: 76.9320 },
  { name: 'Kangra (Dharamshala)', district: 'Kangra', state: 'Himachal Pradesh', type: 'District', lat: 32.2190, lon: 76.3234 },
  { name: 'Solan', district: 'Solan', state: 'Himachal Pradesh', type: 'District', lat: 30.9084, lon: 77.0999 },
  { name: 'Hamirpur', district: 'Hamirpur', state: 'Himachal Pradesh', type: 'District', lat: 31.6862, lon: 76.5213 },
  { name: 'Una', district: 'Una', state: 'Himachal Pradesh', type: 'District', lat: 31.4685, lon: 76.2708 },
  { name: 'Sirmaur (Nahan)', district: 'Sirmaur', state: 'Himachal Pradesh', type: 'District', lat: 30.5599, lon: 77.2955 },
  { name: 'Kinnaur (Reckong Peo)', district: 'Kinnaur', state: 'Himachal Pradesh', type: 'District', lat: 31.5381, lon: 78.2747 },
  { name: 'Dehradun', district: 'Dehradun', state: 'Uttarakhand', type: 'District', lat: 30.3165, lon: 78.0322 },
  { name: 'Haridwar', district: 'Haridwar', state: 'Uttarakhand', type: 'District', lat: 29.9457, lon: 78.1642 },
  { name: 'Udham Singh Nagar (Rudrapur)', district: 'Udham Singh Nagar', state: 'Uttarakhand', type: 'District', lat: 28.9800, lon: 79.4000 },
  { name: 'Nainital', district: 'Nainital', state: 'Uttarakhand', type: 'District', lat: 29.3803, lon: 79.4636 },
  { name: 'Almora', district: 'Almora', state: 'Uttarakhand', type: 'District', lat: 29.5971, lon: 79.6591 },
  { name: 'Pauri Garhwal', district: 'Pauri Garhwal', state: 'Uttarakhand', type: 'District', lat: 30.1473, lon: 78.7808 },
  { name: 'Tehri Garhwal', district: 'Tehri Garhwal', state: 'Uttarakhand', type: 'District', lat: 30.3800, lon: 78.4800 },
  { name: 'Kashipur', district: 'Udham Singh Nagar', state: 'Uttarakhand', type: 'Tehsil/Taluk', lat: 29.2106, lon: 78.9619 },

  // --- Jammu & Kashmir, Ladakh, Goa, Delhi ---
  { name: 'Srinagar', district: 'Srinagar', state: 'Jammu and Kashmir', type: 'District', lat: 34.0837, lon: 74.7973 },
  { name: 'Jammu', district: 'Jammu', state: 'Jammu and Kashmir', type: 'District', lat: 32.7266, lon: 74.8570 },
  { name: 'Anantnag', district: 'Anantnag', state: 'Jammu and Kashmir', type: 'District', lat: 33.7311, lon: 75.1522 },
  { name: 'Baramulla', district: 'Baramulla', state: 'Jammu and Kashmir', type: 'District', lat: 34.2090, lon: 74.3436 },
  { name: 'Leh', district: 'Leh', state: 'Ladakh', type: 'District', lat: 34.1526, lon: 77.5771 },
  { name: 'Kargil', district: 'Kargil', state: 'Ladakh', type: 'District', lat: 34.5539, lon: 76.1349 },
  { name: 'Panaji', district: 'North Goa', state: 'Goa', type: 'District', lat: 15.4909, lon: 73.8278 },
  { name: 'Margao', district: 'South Goa', state: 'Goa', type: 'District', lat: 15.2832, lon: 73.9862 },
  { name: 'New Delhi', district: 'New Delhi', state: 'Delhi', type: 'District', lat: 28.6139, lon: 77.2090 },
  { name: 'Puducherry', district: 'Puducherry', state: 'Puducherry', type: 'District', lat: 11.9416, lon: 79.8083 },

  // --- Prominent Agricultural Villages & Innovative Gram Panchayats Across India ---
  { name: 'Ralegan Siddhi', district: 'Ahmednagar', state: 'Maharashtra', type: 'Village Cluster', lat: 18.9100, lon: 74.4000, specialty: 'Watershed & Water Conservation Model Village' },
  { name: 'Hiware Bazar', district: 'Ahmednagar', state: 'Maharashtra', type: 'Village Cluster', lat: 19.0667, lon: 74.6333, specialty: 'India’s Millionaire Model Village (Drip Irrigation & Dairy)' },
  { name: 'Punsari', district: 'Sabarkantha', state: 'Gujarat', type: 'Village Cluster', lat: 23.5186, lon: 73.0163, specialty: 'Smart Gram Panchayat & Solar Agri-Tech' },
  { name: 'Dharmaj', district: 'Anand', state: 'Gujarat', type: 'Village Cluster', lat: 22.4167, lon: 72.8000, specialty: 'Prosperous Tobacco & Dairy Farming Cluster' },
  { name: 'Piplantri', district: 'Rajsamand', state: 'Rajasthan', type: 'Village Cluster', lat: 25.0483, lon: 73.8656, specialty: 'Eco-Feminist Agro-Forestry (111 Trees per Girl Child)' },
  { name: 'Dharnai', district: 'Jehanabad', state: 'Bihar', type: 'Village Cluster', lat: 25.0500, lon: 84.9500, specialty: 'India’s 1st Fully Solar-Powered Agricultural Village' },
  { name: 'Mawlynnong', district: 'East Khasi Hills', state: 'Meghalaya', type: 'Village Cluster', lat: 25.2019, lon: 91.9161, specialty: 'Cleanest Village in Asia & Arecanut/Broom Farming' },
  { name: 'Sukhomajri', district: 'Panchkula', state: 'Haryana', type: 'Village Cluster', lat: 30.7833, lon: 76.9167, specialty: 'Pioneer Social Fencing & Rainwater Harvesting' },
  { name: 'Kothapalli', district: 'Ranga Reddy', state: 'Telangana', type: 'Village Cluster', lat: 17.3667, lon: 78.1167, specialty: 'ICRISAT Benchmark Watershed Agricultural Model' },
  { name: 'Gangadevipally', district: 'Warangal', state: 'Telangana', type: 'Village Cluster', lat: 17.9167, lon: 79.6667, specialty: '100% Organic & Water-Self-Sufficient Model Village' },
  { name: 'Ankapur', district: 'Nizamabad', state: 'Telangana', type: 'Village Cluster', lat: 18.7333, lon: 78.2667, specialty: 'Pioneer Seed Village & Turmeric Commercial Hub' },
  { name: 'Odanthurai', district: 'Coimbatore', state: 'Tamil Nadu', type: 'Village Cluster', lat: 11.3000, lon: 76.9333, specialty: 'Wind & Biomass Energy Self-Sustaining Village' },
  { name: 'Kuttanad (Champakulam)', district: 'Alappuzha', state: 'Kerala', type: 'Village Cluster', lat: 9.4000, lon: 76.5167, specialty: 'Below Sea-Level Farming (FAO Heritage Site)' },
  { name: 'Marayoor', district: 'Idukki', state: 'Kerala', type: 'Village Cluster', lat: 10.2764, lon: 77.1606, specialty: 'Traditional Sugarcane Jaggery & Sandalwood Valley' },
  { name: 'Meenangadi', district: 'Wayanad', state: 'Kerala', type: 'Village Cluster', lat: 11.6667, lon: 76.1667, specialty: 'India’s 1st Carbon Neutral Panchayat' },
  { name: 'Joynagar', district: 'South 24 Parganas', state: 'West Bengal', type: 'Village Cluster', lat: 22.1764, lon: 88.4286, specialty: 'Nolen Gur Date Palm & Traditional Rice Hub' },
  { name: 'Singur', district: 'Hooghly', state: 'West Bengal', type: 'Village Cluster', lat: 22.8122, lon: 88.2325, specialty: 'Multicropping Intensive Vegetable Delta' },
  { name: 'Mayyil', district: 'Kannur', state: 'Kerala', type: 'Village Cluster', lat: 11.9772, lon: 75.4744, specialty: 'Indigenous Paddy Seed Conservation Village' },
  { name: 'Majuli (Kamalabari)', district: 'Majuli', state: 'Assam', type: 'Village Cluster', lat: 26.9500, lon: 94.2167, specialty: 'Largest River Island & Organic Komal Saul Rice' },
  { name: 'Khonoma', district: 'Kohima', state: 'Nagaland', type: 'Village Cluster', lat: 25.6500, lon: 94.0167, specialty: 'Alder-Based Agro-Forestry & 1st Green Village' },
  { name: 'Malana', district: 'Kullu', state: 'Himachal Pradesh', type: 'Village Cluster', lat: 32.0628, lon: 77.2644, specialty: 'Ancient Isolated Himalayan Village & Herbal Flora' },
  { name: 'Kotgarh', district: 'Shimla', state: 'Himachal Pradesh', type: 'Village Cluster', lat: 31.3167, lon: 77.4833, specialty: 'Apple Cradle of India (First Delicious Apples)' },
  { name: 'Chhatarpur', district: 'Mathura', state: 'Uttar Pradesh', type: 'Village Cluster', lat: 27.5333, lon: 77.5833, specialty: 'Braj Dairy & Fodder Cultivation Cluster' },
  { name: 'Dindori', district: 'Nashik', state: 'Maharashtra', type: 'Village Cluster', lat: 20.2000, lon: 73.8333, specialty: 'Grape & Agro-Horticulture Cluster' },
  { name: 'Pimpalgaon Baswant', district: 'Nashik', state: 'Maharashtra', type: 'Village Cluster', lat: 20.1667, lon: 73.9833, specialty: 'Asia’s Largest Tomato & Onion Mandi Cluster' },
  { name: 'Samrala', district: 'Ludhiana', state: 'Punjab', type: 'Village Cluster', lat: 30.8358, lon: 76.1917, specialty: 'Mechanized Wheat-Paddy Rotational Farming' },
  { name: 'Abohar', district: 'Fazilka', state: 'Punjab', type: 'Village Cluster', lat: 30.1453, lon: 74.1994, specialty: 'Kinnow Citrus Orchard Capital of India' },
  { name: 'Katrisarai', district: 'Nalanda', state: 'Bihar', type: 'Village Cluster', lat: 25.0833, lon: 85.5833, specialty: 'SRI Intensive Organic Rice Cultivation Cluster' },
  { name: 'Pipariya', district: 'Narmadapuram', state: 'Madhya Pradesh', type: 'Village Cluster', lat: 22.7597, lon: 78.3533, specialty: 'Central India Major Wheat & Pulses Mandi' },
  { name: 'Neemuch', district: 'Neemuch', state: 'Madhya Pradesh', type: 'Village Cluster', lat: 24.4600, lon: 74.8700, specialty: 'Global Mandi for Isabgol, Ashwagandha & Garlic' },
  { name: 'Byadgi', district: 'Haveri', state: 'Karnataka', type: 'Village Cluster', lat: 14.6800, lon: 75.4800, specialty: 'Famous Byadagi Red Chili & Oleoresin Capital' },
  { name: 'Sirsi', district: 'Uttara Kannada', state: 'Karnataka', type: 'Village Cluster', lat: 14.6195, lon: 74.8354, specialty: 'Western Ghats Spices, Vanilla & Arecanut Cluster' },
  { name: 'Koraput', district: 'Koraput', state: 'Odisha', type: 'Village Cluster', lat: 18.8135, lon: 82.7123, specialty: 'FAO Globally Important Agricultural Heritage Site' },
  { name: 'Bargarh', district: 'Bargarh', state: 'Odisha', type: 'Village Cluster', lat: 21.3333, lon: 83.6167, specialty: 'Rice Bowl of Odisha & Hirakud Canal Irrigation' }
];

// Helper: Haversine distance in km
export function haversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Search built-in Indian locations with 0ms offline latency
export function searchLocalIndiaLocations(query: string, maxResults = 15): IndiaLocationRecord[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return ALL_INDIA_DISTRICTS_AND_HUBS.filter(
    (loc) =>
      loc.name.toLowerCase().includes(q) ||
      loc.district.toLowerCase().includes(q) ||
      loc.state.toLowerCase().includes(q) ||
      (loc.specialty && loc.specialty.toLowerCase().includes(q))
  ).slice(0, maxResults);
}

// Find closest Indian location for any GPS coordinates
export function findNearestLocation(lat: number, lon: number): IndiaLocationRecord {
  let nearest = ALL_INDIA_DISTRICTS_AND_HUBS[0];
  let minDistance = Infinity;

  for (const loc of ALL_INDIA_DISTRICTS_AND_HUBS) {
    const dist = haversineDistanceKm(lat, lon, loc.lat, loc.lon);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = loc;
    }
  }

  return nearest;
}

// Return all districts and village clusters for a given state
export function getLocationsForState(stateName: string): IndiaLocationRecord[] {
  return ALL_INDIA_DISTRICTS_AND_HUBS.filter(
    (loc) => loc.state.toLowerCase() === stateName.toLowerCase()
  );
}

// Return unique district names for a given state
export function getDistrictsForState(stateName: string): string[] {
  const locs = getLocationsForState(stateName);
  const set = new Set<string>();
  locs.forEach((l) => set.add(l.district));
  return Array.from(set).sort();
}

