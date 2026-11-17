import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Award,
  Sparkles,
  MapPin,
  ArrowRight,
  X,
  CheckCircle2
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { WEEKS_METADATA } from '../data/roadmapData';
import { BotanicalWreath } from './BotanicalDecorations';

export const WeeklyCompletionPopup: React.FC = () => {
  const {
    weeklyCelebrationOpen,
    justCompletedWeekNumber,
    closeWeeklyCelebration,
    setActiveTab,
    setInspectWeek
  } = useProgress();

  if (!weeklyCelebrationOpen || !justCompletedWeekNumber) return null;

  const completedMeta = WEEKS_METADATA.find(w => w.weekNumber === justCompletedWeekNumber) || WEEKS_METADATA[0];
  const nextWeekNum = Math.min(15, justCompletedWeekNumber + 1);
  const nextMeta = WEEKS_METADATA.find(w => w.weekNumber === nextWeekNum);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-boho-earth-900/45 backdrop-blur-md">
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="relative max-w-lg w-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EF] to-[#F5EFE6] rounded-4xl p-6 sm:p-9 border-2 border-boho-terracotta-300 shadow-soft-lg text-center overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={closeWeeklyCelebration}
            className="absolute top-4 right-4 p-2 rounded-full text-boho-earth-800/50 hover:text-boho-earth-900 hover:bg-boho-cream-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Wreath decoration */}
          <div className="relative mx-auto w-24 h-24 mb-4 flex items-center justify-center">
            <BotanicalWreath className="w-24 h-24 text-boho-sage-400" />
            <Award className="w-9 h-9 text-boho-terracotta-500 absolute" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-boho-sage-100 text-boho-sage-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Island Conquered</span>
          </span>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-boho-earth-900 leading-tight">
            Week {completedMeta.weekNumber}: {completedMeta.islandName}
          </h3>

          <p className="text-xs text-boho-earth-800/70 font-semibold tracking-wide uppercase mt-1">
            {completedMeta.badgeTitle} Badge Awarded
          </p>

          {/* Unique weekly quote */}
          <div className="mt-4 p-4 rounded-2xl bg-white/90 border border-boho-cream-300 shadow-sm text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-boho-terracotta-500 block mb-1">
              Chapter Wisdom
            </span>
            <p className="font-serif italic text-sm text-boho-earth-900 leading-relaxed">
              &ldquo;{completedMeta.quote}&rdquo;
            </p>
          </div>

          {/* Unlocked Next Island Notification */}
          {nextWeekNum <= 15 && nextWeekNum !== justCompletedWeekNumber && nextMeta && (
            <div className="mt-4 p-3 rounded-2xl bg-boho-peach-100/70 border border-boho-peach-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-left">
                <MapPin className="w-4 h-4 text-boho-terracotta-600 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-boho-earth-900 block">
                    Next Destination Unlocked:
                  </span>
                  <span className="text-boho-earth-800/80">
                    Week {nextMeta.weekNumber} — {nextMeta.islandName}
                  </span>
                </div>
              </div>
              <span className="text-boho-terracotta-600 font-bold uppercase tracking-wider text-[10px]">
                Ready
              </span>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              onClick={() => {
                closeWeeklyCelebration();
                setInspectWeek(nextWeekNum);
                setActiveTab('map');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-boho-terracotta-500 hover:bg-boho-terracotta-600 text-white font-medium text-xs shadow-soft transition-all"
            >
              <span>Explore Island On Map</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={closeWeeklyCelebration}
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-white hover:bg-boho-cream-100 border border-boho-cream-300 text-boho-earth-800 font-medium text-xs transition-colors"
            >
              Close
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
