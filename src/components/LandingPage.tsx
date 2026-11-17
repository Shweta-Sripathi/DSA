import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { BotanicalWreath, BotanicalLeaf } from './BotanicalDecorations';

interface LandingPageProps {
  onBeginJourney: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onBeginJourney }) => {
  const fullTitle = "Do It for the Plot";
  const [typedTitle, setTypedTitle] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setTypedTitle(fullTitle.slice(0, index));
      if (index >= fullTitle.length) {
        clearInterval(interval);
        setTimeout(() => setTypingDone(true), 400);
      }
    }, 110);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 py-12 bg-gradient-to-b from-[#FDFCF9] via-[#FAF7F2] to-[#F5EBE0]"
    >
      {/* Decorative ambient background orbs */}
      <div className="absolute top-12 left-10 w-72 h-72 rounded-full bg-boho-rose-100 blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-16 right-10 w-96 h-96 rounded-full bg-boho-sage-100 blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-boho-peach-100 blur-3xl opacity-35 pointer-events-none" />

      {/* Floating subtle botanical leaves */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 left-1/4 hidden md:block opacity-35"
      >
        <BotanicalLeaf className="w-10 h-10 text-boho-sage-400" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-24 left-16 hidden md:block opacity-30"
      >
        <BotanicalLeaf className="w-12 h-12 text-boho-rose-400" />
      </motion.div>

      {/* Center Cinematic Card */}
      <div className="relative z-10 max-w-2xl w-full mx-auto text-center flex flex-col items-center">
        {/* Step 2: Decorative detail fading in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-4 relative"
        >
          <BotanicalWreath className="w-24 h-24 text-boho-sage-400 mx-auto" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute inset-0 flex items-center justify-center text-boho-terracotta-400"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Small prelude tag */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-boho-rose-50 border border-boho-rose-200 text-xs font-medium text-boho-terracotta-600 tracking-wider uppercase mb-5"
        >
          <span>A Personal DSA Adventure</span>
          <span>•</span>
          <span>413 Problems</span>
          <span>•</span>
          <span>15 Weeks</span>
        </motion.div>

        {/* Step 3: Typewriter Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-boho-earth-900 leading-tight min-h-[5rem] flex items-center justify-center">
          <span>{typedTitle}</span>
          {!typingDone && (
            <span className="inline-block w-1 h-10 sm:h-14 ml-1 bg-boho-terracotta-500 animate-pulse rounded-full" />
          )}
        </h1>

        {/* Step 5: Subtitle reveal */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: typingDone ? 1 : 0, y: typingDone ? 0 : 15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-serif italic text-lg sm:text-xl md:text-2xl text-boho-earth-800/80 mt-4 mb-2 max-w-lg leading-relaxed"
        >
          &ldquo;A little discipline, a little courage, and a plot worth remembering.&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: typingDone ? 1 : 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="text-xs sm:text-sm text-boho-earth-800/60 max-w-md mx-auto mb-8 font-sans"
        >
          Nov 29, 2026 – Mar 13, 2027 • An illustrated odyssey from fundamentals to dynamic programming mastery.
        </motion.p>

        {/* Step 6: Begin My Journey Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: typingDone ? 1 : 0, scale: typingDone ? 1 : 0.9 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <button
            onClick={onBeginJourney}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-boho-terracotta-500 hover:bg-boho-terracotta-600 text-white font-medium text-base shadow-soft-lg hover:shadow-boho transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            <span>Begin My Journey</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <span className="text-xs text-boho-earth-800/50 flex items-center gap-1.5 mt-2">
            <span>Plant seeds today, harvest mastery tomorrow</span>
            <Heart className="w-3.5 h-3.5 text-boho-rose-400 fill-boho-rose-400" />
          </span>
        </motion.div>
      </div>

      {/* Bottom subtle stationery border */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-[11px] text-boho-earth-800/40 tracking-widest uppercase">
        DO IT FOR THE PLOT • 15 WEEKS • 105 DAYS • 413 PROBLEMS
      </div>
    </motion.div>
  );
};
