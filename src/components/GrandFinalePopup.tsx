import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Crown,
  Sparkles,
  Heart,
  X,
  Share2,
  CalendarCheck
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { BotanicalWreath } from './BotanicalDecorations';
import { TOTAL_PROBLEMS } from '../data/roadmapData';

export const GrandFinalePopup: React.FC = () => {
  const {
    grandFinaleOpen,
    closeGrandFinale,
    avatarName,
    longestStreak,
    completedDaysCount,
    setActiveTab
  } = useProgress();

  if (!grandFinaleOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-boho-earth-900/60 backdrop-blur-md">
        
        <motion.div
          initial={{ scale: 0.75, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="relative max-w-xl w-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5E8D8] rounded-4xl p-6 sm:p-10 border-4 border-boho-peach-300 shadow-2xl text-center overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={closeGrandFinale}
            className="absolute top-4 right-4 p-2 rounded-full text-boho-earth-800/50 hover:text-boho-earth-900 hover:bg-boho-cream-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Golden Crown & Wreath */}
          <div className="relative mx-auto w-28 h-28 mb-4 flex items-center justify-center">
            <BotanicalWreath className="w-28 h-28 text-boho-terracotta-400" />
            <Crown className="w-12 h-12 text-[#D4AF37] fill-[#D4AF37] absolute animate-bounce" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-boho-rose-100 to-boho-peach-200 text-boho-terracotta-700 text-xs font-bold uppercase tracking-widest mb-3 shadow-sm">
            <Sparkles className="w-4 h-4 text-boho-terracotta-500" />
            <span>The Grand Finale • Destination Reached</span>
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-boho-earth-900 leading-tight tracking-tight">
            {TOTAL_PROBLEMS} / {TOTAL_PROBLEMS}
          </h2>
          <p className="font-serif text-lg sm:text-xl font-semibold text-boho-terracotta-600 mt-1 uppercase tracking-wider">
            Problems Completed
          </p>

          <p className="font-serif italic text-base sm:text-lg text-boho-earth-800/90 mt-4 max-w-md mx-auto leading-relaxed">
            &ldquo;You didn&apos;t just practice algorithms. You proved that quiet consistency, self-trust, and daily discipline can rewrite your future. The plot is yours forever.&rdquo;
          </p>

          {/* Grand Stats Ribbon */}
          <div className="mt-6 grid grid-cols-3 gap-2 bg-white/90 p-4 rounded-3xl border border-boho-cream-300 shadow-sm">
            <div>
              <span className="text-[10px] sm:text-xs font-semibold text-boho-earth-800/60 uppercase block">
                Heroine
              </span>
              <span className="font-serif font-bold text-sm sm:text-base text-boho-earth-900 truncate block">
                {avatarName}
              </span>
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-semibold text-boho-earth-800/60 uppercase block">
                Peak Streak
              </span>
              <span className="font-serif font-bold text-sm sm:text-base text-boho-terracotta-600">
                {longestStreak} Days
              </span>
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-semibold text-boho-earth-800/60 uppercase block">
                Total Days
              </span>
              <span className="font-serif font-bold text-sm sm:text-base text-boho-sage-600">
                {completedDaysCount} Days
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                closeGrandFinale();
                setActiveTab('profile');
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-boho-terracotta-500 hover:bg-boho-terracotta-600 text-white font-semibold text-sm shadow-soft transition-all"
            >
              View Full Adventure Analytics
            </button>

            <button
              onClick={closeGrandFinale}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-boho-cream-100 border border-boho-cream-300 text-boho-earth-800 font-medium text-sm transition-colors"
            >
              Cherish the Moment
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
