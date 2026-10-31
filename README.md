# 🌱 AgroGuide DSS (v2.4 Pro)
### Crop Recommendation & Agronomic Decision Support System

An advanced agricultural decision-support software application engineered for smallholder farmers, agronomists, and researchers. The system combines continuous biological trapezoidal response functions with empirical machine learning benchmarks to deliver transparent, explainable, and multi-factor crop recommendations.

---

## 🌟 Key Features Implemented

### 1. 📖 Documented Recommendation Method & Inherent Limitations
- **Multi-Factor Agronomic Scoring Engine:**
  - Evaluates **9 environmental and edaphic parameters**: Rainfall (18%), Ambient Temperature (18%), Soil pH (14%), Soil Texture Compatibility (14%), NPK Macronutrients (14%), Atmospheric Humidity (12%), and Sowing Season (10%).
  - Employs **continuous trapezoidal biological membership functions** with non-linear penalty multipliers ($0.50 - 0.65\times$) for critical limiting factors (e.g. extreme pH, water deficit, thermal stress, off-season sowing).
  - **Graceful Missing Data Handling:** Automatically activates proportional weight redistribution when lab NPK data is omitted, while adjusting the Data Completeness Index and safety confidence flags.
- **Explicit System Limitations Documented:**
  - *Microclimatic & Topographical Variations:* Inability of macro-weather data to capture slope aspect, valley frost pockets, and windbreaks.
  - *Biological Vectors:* Unpredictable pest migrations (e.g., locust swarms), soil cyst nematodes, and viral pathogens.
  - *Sub-surface Stratigraphy:* Subsoil hardpans and calcic horizons below 20 cm topsoil.
  - *Socio-Economic & Mandi Dynamics:* Market price volatility, cold storage deficits, and distance to APMC procurement centers.
  - *Farmer Self-Reporting Bias:* Paper test strip inaccuracies vs. NABL-accredited spectrophotometry.
  - *Statutory Advisory Mandate:* Clear guidance recommending consultation with local Krishi Vigyan Kendras (KVK) and ICAR extension officers.

---

### 2. ⚖️ Comparison Results & Automated Short Test Report
- **Multi-Crop Side-by-Side Trade-off Analysis:**
  - Interactive comparison tool comparing up to 4 crops across overall suitability, water footprint, duration, yields, market value, and factor-by-factor radars.
- **Rule Engine vs. k-NN Algorithmic Comparison:**
  - Side-by-side execution comparing continuous agronomic rules against normalized multi-dimensional Euclidean k-NN distance vectors.
- **Automated Verification Test Suite (8 Test Suites):**
  - TC-01: Indo-Gangetic Wetland Kharif Scenario (Rice/Sugarcane verified top, Bajra penalized).
  - TC-02: Semi-Arid Deccan Plateau Low Rainfall Scenario (Pearl Millet/Sorghum top, Rice penalized).
  - TC-03: Northwest Irrigated Cool Rabi Scenario (Wheat/Mustard/Gram top, tropical crops penalized).
  - TC-04: Subtropical Hill Slopes Acidic Soil Scenario (Tea/Coffee top, field cereals penalized).
  - TC-05: Missing NPK Graceful Degradation & Completeness Index Test.
  - TC-06: Severe Acid Soil Boundary Stress Test (pH 4.0; verifies Lime amendment trigger).
  - TC-07: Extreme Heatwave Stress Boundary Test (42°C; verifies thermal penalty).
  - TC-08: Severe Drought Boundary Test (160 mm; verifies drought warnings).
- **Short Test Report:** Real-time test execution status (8/8 passed, 100% success rate, latency < 5ms) with print/export capabilities and SHA256 integrity checksum.

---

### 3. 🌦️ Weather API Integration
- Integrated with the **Open-Meteo live API** (free, no API key required, reliable global & Indian agro-meteorological coverage).
- Features:
  - **GPS Geolocation:** One-click "Use My GPS" to query current field coordinates.
  - **City & District Geocoding:** Search any district or region (e.g. Ludhiana, Varanasi, Solapur, Patna, Coimbatore).
  - **Offline Agricultural Hub Fallback:** Pre-configured calibrated agro-climatic profiles for seamless offline operation.
  - **One-Click Form Sync:** Automatically populates ambient temperature, relative humidity, and precipitation estimates into the field evaluation form.

---

### 4. 🌐 Local-Language Interface (Multilingual)
- Instant, non-reloading language switching directly from the navbar with full support for **8 major languages**:
  1. 🇬🇧 **English**
  2. 🇮🇳 **हिन्दी (Hindi)**
  3. 🇮🇳 **తెలుగు (Telugu)**
  4. 🇮🇳 **தமிழ் (Tamil)**
  5. 🇮🇳 **ਪੰਜਾਬੀ (Punjabi)**
  6. 🇮🇳 **मराठी (Marathi)**
  7. 🇮🇳 **বাংলা (Bengali)**
  8. 🇮🇳 **ಕನ್ನಡ (Kannada)**
- Translates navigation tabs, form labels, parameter descriptions, suitability ratings, advisory warnings, and action buttons.

---

### 5. 🗓️ Season-Aware Suggestions & Sowing Calendar
- **Dynamic Season Detection:** Real-time calculation of the current active Indian agricultural season based on calendar month:
  - **Kharif** (June – October: Monsoon onset, vegetative growth, harvest window)
  - **Rabi** (October – March: Cool post-monsoon winter sowing, grain ripening)
  - **Zaid** (March – June: Fast-maturing summer cash crops & cucurbits)
- **Season Smart Filter:** One-click toggle to highlight in-season crops and flag off-season crops requiring polyhouse/protected cultivation.
- **National Agricultural Cropping Calendar:** Expandable reference guide for sowing and harvest cycles across major Indian field crops.

---

### 6. 🧪 Fertilizer Guidance from Trusted Sources (ICAR & FAO)
- Calibrated strictly against **ICAR (Indian Council of Agricultural Research) STCR (Soil Test Crop Response)** equations and **FAO Soil Bulletin No. 17**.
- Features:
  - **Nutrient Deficit Analysis:** Translates soil test values into available N, P, K status (Low / Medium / High) and calculates net kg/ha field deficits.
  - **Commercial Fertilizer Formulation:** Computes exact application rates and **50 kg bag equivalents** for:
    - Urea (46% N)
    - Di-Ammonium Phosphate (DAP 18-46-0)
    - Single Super Phosphate (SSP 16% P₂O₅)
    - Muriate of Potash (MOP 60% K₂O)
    - Subsidized farm cost estimates in INR (₹).
  - **Split Application Timeline:** Step-by-step guidance for Basal dose, First Top-Dressing (active tillering), and Second Top-Dressing (panicle initiation) to prevent nitrogen leaching.
  - **Biofertilizers & INM:** Crop-specific biological cultures: *Rhizobium* for pulses, *Azotobacter* / *Azospirillum* for cereals, PSB (*Bacillus megaterium*) for phosphorus mobilization, and Farmyard Manure (FYM).
  - **Soil pH Remediation:** Automatic dosage calculation for Agricultural Lime ($\text{CaCO}_3$) in acidic soils and Agricultural Gypsum ($\text{CaSO}_4\cdot2\text{H}_2\text{O}$) in alkaline soils.

---

### 7. 📊 Empirical Model Evaluation against Labelled Dataset
- Comprehensive benchmarking suite evaluated against a **ground-truth agricultural dataset of verified field records**.
- Metrics Computed:
  - **Top-1 Accuracy:** Exact match rate for highest-ranking recommended crop.
  - **Top-3 Recall:** Presence of true optimal crop within top 3 recommendations.
  - **Macro Precision, Recall, and F1-Score.**
  - **k-NN Baseline Comparison:** Demonstrating engine accuracy deltas over standard machine learning clustering.
  - **Interactive Multi-Class Confusion Matrix:** Visual grid of True Labels vs. Predicted Recommendations.
  - **Interactive Instance Inspector:** Filter and inspect individual records, predictions, and parameter distributions.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Run developer server with Hot Module Replacement (HMR)
npm run dev

# 3. Run type check and production build
npm run build

# 4. Run Oxlint code quality verification
npm run lint
```

The application will be accessible at `http://localhost:5173/`.

---

## 🛠️ Technology Stack
- **Framework:** React 19 + TypeScript (strict mode, zero build errors)
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 + Responsive Print Stylesheet
- **Icons:** Lucide React
- **Linter:** Oxlint (0 errors, 0 warnings)
- **Live Data:** Open-Meteo Forecast & Geocoding REST APIs (No API key required)

---

## 📜 Regulatory & Safety Notice
AgroGuide DSS is developed as an educational hackathon software solution (Problem ID: **HACK-P302**). Agricultural recommendations are advisory approximations and do not constitute legal or commercial warranties. Field decisions should incorporate local extension advice from Krishi Vigyan Kendras (KVK), district agriculture officers, and soil health testing laboratories.
#   W E B - H A C K A T H O N  
 #   W E B - H A C K A T H O N  
 