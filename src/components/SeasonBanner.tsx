import React, { useState } from 'react';
import type { Season } from '../types/crop';
import { getCurrentAgriculturalSeason } from '../utils/seasonUtils';
import { useLanguage } from '../context/LanguageContext';
import {
  Calendar,
  Clock,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface SeasonBannerProps {
  selectedSeason: Season;
  onSelectSeason: (season: Season) => void;
  filterBySeasonOnly: boolean;
  onToggleFilterBySeason: () => void;
}

export const SeasonBanner: React.FC<SeasonBannerProps> = ({
  selectedSeason,
  onSelectSeason,
  filterBySeasonOnly,
  onToggleFilterBySeason
}) => {
  const { t, translateSeason } = useLanguage();
  const currentSeasonInfo = getCurrentAgriculturalSeason();
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-green-950 text-white rounded-2xl p-5 shadow-sm border border-emerald-800/80 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Season Info Left */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-amber-400 text-slate-950 text-[11px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-slate-950" />
                {t.seasonBanner.activeSeason}: {translateSeason(currentSeasonInfo.activeSeason)} ({currentSeasonInfo.currentMonthName})
              </span>
              <span className="bg-emerald-800/80 text-emerald-200 border border-emerald-700 text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {currentSeasonInfo.sowingStatus}
              </span>
            </div>
            <p className="text-xs text-emerald-100 mt-1.5 mb-0 max-w-2xl leading-relaxed">
              {currentSeasonInfo.description}
            </p>
          </div>
        </div>

        {/* Action Controls Right */}
        <div className="flex items-center gap-2 flex-wrap">
          {selectedSeason !== currentSeasonInfo.activeSeason && (
            <button
              type="button"
              onClick={() => onSelectSeason(currentSeasonInfo.activeSeason)}
              className="text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3 py-1.5 rounded-xl transition shadow flex items-center gap-1 cursor-pointer"
            >
              <span>{t.seasonBanner.syncBtn}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onToggleFilterBySeason}
            className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition flex items-center gap-1.5 cursor-pointer ${
              filterBySeasonOnly
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                : 'bg-emerald-950/80 text-emerald-200 border-emerald-700 hover:bg-emerald-800/60'
            }`}
          >
            <span>{filterBySeasonOnly ? t.seasonBanner.filterActive : t.seasonBanner.filterInSeason}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCalendar(!showCalendar)}
            className="text-xs bg-emerald-950/80 hover:bg-emerald-800/60 text-emerald-200 border border-emerald-700 px-3 py-1.5 rounded-xl transition flex items-center gap-1 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{t.seasonBanner.calendarBtn}</span>
            {showCalendar ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Sowing Calendar Drawer */}
      {showCalendar && (
        <div className="mt-4 pt-4 border-t border-emerald-800/80 text-xs">
          <div className="font-bold text-emerald-200 uppercase tracking-wider mb-2 text-[11px]">
            {t.seasonBanner.calendarTitle}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className={`p-3 rounded-xl border ${currentSeasonInfo.activeSeason === 'Kharif' ? 'bg-emerald-800/50 border-emerald-400' : 'bg-slate-900/40 border-emerald-900'}`}>
              <div className="font-bold text-white flex items-center justify-between">
                <span>{translateSeason('Kharif')}</span>
                {currentSeasonInfo.activeSeason === 'Kharif' && <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 rounded font-black">CURRENT</span>}
              </div>
              <div className="text-[11px] text-emerald-300 mt-1">Sowing: June – July • Harvesting: Oct – Nov</div>
              <div className="text-[11px] text-slate-300 mt-1">Crops: Rice, Cotton, Maize, Groundnut, Soybean, Pigeon Pea, Jute</div>
            </div>

            <div className={`p-3 rounded-xl border ${currentSeasonInfo.activeSeason === 'Rabi' ? 'bg-emerald-800/50 border-emerald-400' : 'bg-slate-900/40 border-emerald-900'}`}>
              <div className="font-bold text-white flex items-center justify-between">
                <span>{translateSeason('Rabi')}</span>
                {currentSeasonInfo.activeSeason === 'Rabi' && <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 rounded font-black">CURRENT</span>}
              </div>
              <div className="text-[11px] text-emerald-300 mt-1">Sowing: Oct – Nov • Harvesting: March – April</div>
              <div className="text-[11px] text-slate-300 mt-1">Crops: Wheat, Mustard, Chickpea (Gram), Barley, Potato, Peas</div>
            </div>

            <div className={`p-3 rounded-xl border ${currentSeasonInfo.activeSeason === 'Zaid' ? 'bg-emerald-800/50 border-emerald-400' : 'bg-slate-900/40 border-emerald-900'}`}>
              <div className="font-bold text-white flex items-center justify-between">
                <span>{translateSeason('Zaid')}</span>
                {currentSeasonInfo.activeSeason === 'Zaid' && <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 rounded font-black">CURRENT</span>}
              </div>
              <div className="text-[11px] text-emerald-300 mt-1">Sowing: March – April • Harvesting: May – June</div>
              <div className="text-[11px] text-slate-300 mt-1">Crops: Watermelon, Cucumber, Muskmelon, Moong Bean, Fodder</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
