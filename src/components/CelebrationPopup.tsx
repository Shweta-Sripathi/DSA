import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Flower2,
  Flame,
  CheckCircle2,
  Undo2,
  ArrowRight,
  X
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { BotanicalFlower } from './BotanicalDecorations';

export const CelebrationPopup: React.FC = () => {
  const {
    dailyCelebrationOpen,
    closeDailyCelebration,
    activeCheer,
    currentStreak,
    completedProblemsCount,
    completionPercentage,
    setActiveTab
  } = useProgress();

  if (!dailyCelebrationOpen || !activeCheer) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-boho-earth-900/40 backdrop-blur-sm">
        
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 15 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative max-w-md w-full bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EE] rounded-4xl p-6 sm:p-8 border-2 border-boho-rose-200 shadow-soft-lg text-center overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={closeDailyCelebration}
            className="absolute top-4 right-4 p-2 rounded-full text-boho-earth-800/50 hover:text-boho-earth-900 hover:bg-boho-cream-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Decorative floral burst */}
          <div className="relative mx-auto w-20 h-20 mb-4 flex items-center justify-center">
            <BotanicalFlower className="w-20 h-20 animate-spin-slow" color="#D98880" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center text-boho-terracotta-500"
            >
              <Sparkles className="w-8 h-8 animate-pulse" />
            </motion.div>
          </div>

          {/* Cheer message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-boho-rose-100 text-boho-terracotta-600 text-xs font-semibold uppercase tracking-wider mb-2">
              <Heart className="w-3.5 h-3.5 fill-boho-terracotta-500" />
              <span>Target Completed</span>
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-boho-earth-900 leading-tight">
              {activeCheer.text}
            </h3>

            <p className="font-serif italic text-sm text-boho-earth-800/80 mt-2">
              &ldquo;{activeCheer.subtext}&rdquo;
            </p>
          </motion.div>

          {/* Stats quick pill */}
          <div className="mt-5 grid grid-cols-2 gap-2.5 bg-white/80 p-3.5 rounded-2xl border border-boho-cream-300">
            <div className="text-center">
              <span className="text-[11px] text-boho-earth-800/60 uppercase font-semibold block">
                Active Streak
              </span>
              <span className="font-serif text-xl font-bold text-boho-terracotta-600 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 fill-boho-terracotta-500" />
                <span>{currentStreak} Days</span>
              </span>
            </div>

            <div className="text-center">
              <span className="text-[11px] text-boho-earth-800/60 uppercase font-semibold block">
                Roadmap Progress
              </span>
              <span className="font-serif text-xl font-bold text-boho-sage-600">
                {completedProblemsCount} / 413 ({completionPercentage}%)
              </span>
            </div>
          </div>

          {/* Notice: Flower bloomed in garden */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-boho-earth-800/70 font-medium">
            <Flower2 className="w-4 h-4 text-boho-rose-500" />
            <span>A fresh botanical blossom took root in your Streak Garden!</span>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              onClick={() => {
                closeDailyCelebration();
                setActiveTab('garden');
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-boho-terracotta-500 hover:bg-boho-terracotta-600 text-white font-medium text-xs shadow-soft transition-all"
            >
              Visit Streak Garden
            </button>

            <button
              onClick={closeDailyCelebration}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white hover:bg-boho-cream-100 border border-boho-cream-300 text-boho-earth-800 font-medium text-xs transition-colors"
            >
              Keep Going
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
