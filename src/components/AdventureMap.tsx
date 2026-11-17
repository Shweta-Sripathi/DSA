import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Compass,
  MapPin,
  Calendar,
  Layers,
  Crosshair
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { WEEKS_METADATA } from '../data/roadmapData';
import { JourneyAvatar } from './JourneyAvatar';
import { BotanicalFlower } from './BotanicalDecorations';

// Island coordinates on a 1000x2000 virtual canvas (ascending from bottom to top)
const ISLAND_COORDINATES = [
  { week: 1, x: 220, y: 1840 },
  { week: 2, x: 500, y: 1730 },
  { week: 3, x: 780, y: 1620 },
  { week: 4, x: 840, y: 1470 },
  { week: 5, x: 560, y: 1360 },
  { week: 6, x: 240, y: 1250 },
  { week: 7, x: 180, y: 1100 },
  { week: 8, x: 450, y: 990 },
  { week: 9, x: 760, y: 890 },
  { week: 10, x: 820, y: 740 },
  { week: 11, x: 580, y: 630 },
  { week: 12, x: 260, y: 520 },
  { week: 13, x: 200, y: 380 },
  { week: 14, x: 520, y: 260 },
  { week: 15, x: 760, y: 130 },
];

export const AdventureMap: React.FC = () => {
  const {
    unlockedWeeks,
    completedWeeks,
    currentIslandWeek,
    setCurrentIslandWeek,
    setInspectWeek,
    setActiveTab,
    avatarStyle,
    allDays
  } = useProgress();

  const mapTopRef = useRef<HTMLDivElement>(null);
  const currentIslandRef = useRef<HTMLDivElement>(null);

  // Automatic slide from top to current position on load
  useEffect(() => {
    // 1. Instantly jump to the very top of the map/page
    if (mapTopRef.current) {
      mapTopRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // 2. Smoothly slide/glide down to the user's current island position
    const timer = setTimeout(() => {
      if (currentIslandRef.current) {
        currentIslandRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [currentIslandWeek]);

  const slideToCurrentIsland = () => {
    if (currentIslandRef.current) {
      currentIslandRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  };

  const handleSelectIsland = (weekNum: number) => {
    setInspectWeek(weekNum);
    setCurrentIslandWeek(weekNum);
    setActiveTab('today');
  };

  // Build SVG path data connecting the 15 islands
  const pathD = ISLAND_COORDINATES.reduce((acc, pt, idx) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = ISLAND_COORDINATES[idx - 1];
    const midY = (prev.y + pt.y) / 2;
    // Cubic bezier curve for organic winding path
    return `${acc} C ${prev.x} ${midY}, ${pt.x} ${midY}, ${pt.x} ${pt.y}`;
  }, '');

  return (
    <div ref={mapTopRef} className="space-y-6">
      
      {/* Map Control Bar & Storyteller Intro */}
      <div className="rounded-3xl bg-white p-5 sm:p-6 border border-boho-cream-300 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-full bg-boho-rose-100 text-boho-terracotta-500">
              <Compass className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-boho-terracotta-500">
              Illustrated Journey Map
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-boho-earth-900">
            The 15 Islands of Discipline
          </h2>
          <p className="text-xs sm:text-sm text-boho-earth-800/70 mt-1">
            Follow the winding trail from the Whispering Woods up to the Summit of the Plot. Each conquered week unlocks the next territory.
          </p>
        </div>

        {/* Legend & Auto-Slide Button */}
        <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap">
          <button
            onClick={slideToCurrentIsland}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-boho-peach-100 hover:bg-boho-peach-200 border border-boho-peach-300 text-xs font-semibold text-boho-terracotta-600 transition-all shadow-sm"
            title="Slide view directly to current active island"
          >
            <Crosshair className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Slide to Week {currentIslandWeek}</span>
          </button>

          <div className="flex items-center gap-3 text-xs font-medium bg-boho-cream-100/70 p-2 sm:p-2.5 rounded-2xl border border-boho-cream-200">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-boho-sage-500" />
              <span>Done</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-boho-terracotta-500 animate-pulse" />
              <span>Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-boho-cream-300 border border-boho-cream-400" />
              <span>Locked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Illustrated Map Canvas Container */}
      <div className="relative w-full rounded-4xl overflow-hidden bg-gradient-to-b from-[#FAF4EC] via-[#FDFBF7] to-[#F5EBE0] border-2 border-boho-cream-300/80 shadow-soft-lg p-4 sm:p-8">
        
        {/* Soft botanical ambient textures */}
        <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-boho-rose-100 blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 right-8 w-96 h-96 rounded-full bg-boho-sage-100 blur-3xl opacity-35 pointer-events-none" />
        <div className="absolute bottom-20 left-12 w-80 h-80 rounded-full bg-boho-peach-100 blur-3xl opacity-40 pointer-events-none" />

        {/* SVG Drawing Layer for Paths, Stepping Stones, Bridges */}
        <svg
          viewBox="0 0 1000 2000"
          className="w-full h-auto drop-shadow-sm select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradients for islands */}
            <linearGradient id="pathGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#D98880" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#A3B18A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.7" />
            </linearGradient>

            <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#3D312A" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* Stepping Stone Dots along the path */}
          <path
            d={pathD}
            fill="none"
            stroke="#EDE0D4"
            strokeWidth="28"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d={pathD}
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="8"
            strokeDasharray="14 12"
            strokeLinecap="round"
          />

          {/* Little Decorative Stepping Stones / Flowers along path */}
          {ISLAND_COORDINATES.map((pt, i) => (
            <g key={`stone_${i}`} transform={`translate(${pt.x}, ${pt.y})`}>
              {/* Stepping ripple */}
              <circle cx="0" cy="0" r="48" fill="#FFFFFF" opacity="0.6" filter="url(#shadowFilter)" />
              <circle cx="0" cy="0" r="38" fill="#FDFCF9" stroke="#E2EDED" strokeWidth="2" />
            </g>
          ))}
        </svg>

        {/* Interactive Island Cards Layer (Positioned over coordinates) */}
        <div className="absolute inset-0 pointer-events-auto">
          {ISLAND_COORDINATES.map(coord => {
            const weekMeta = WEEKS_METADATA.find(w => w.weekNumber === coord.week)!;
            const isUnlocked = unlockedWeeks.includes(coord.week);
            const isCompleted = completedWeeks.includes(coord.week);
            const isCurrent = currentIslandWeek === coord.week;

            // Calculate week problems completed
            const weekTasks = allDays.filter(d => d.weekNumber === coord.week);
            const solvedInWeek = weekTasks.filter(d => d.completed).reduce((sum, d) => sum + d.problemCount, 0);

            // Responsive positioning percentage
            const leftPercent = (coord.x / 1000) * 100;
            const topPercent = (coord.y / 2000) * 100;

            return (
              <div
                key={coord.week}
                ref={isCurrent ? currentIslandRef : undefined}
                style={{
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute z-20 transition-all duration-500 ${isCurrent ? 'scale-105' : ''}`}
              >
                {/* Glowing beacon for current island */}
                {isCurrent && (
                  <div className="absolute -inset-2 rounded-4xl bg-boho-terracotta-400/25 blur-md animate-pulse pointer-events-none" />
                )}

                {/* Island Card */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`cursor-pointer rounded-3xl p-3 sm:p-4 w-44 sm:w-56 text-left transition-all duration-300 border ${
                    isCompleted
                      ? 'bg-gradient-to-br from-white via-boho-sage-50 to-boho-cream-50 border-boho-sage-300 shadow-soft-lg ring-2 ring-boho-sage-200'
                      : isCurrent
                      ? 'bg-gradient-to-br from-white via-boho-rose-50 to-boho-peach-50 border-boho-terracotta-400 shadow-soft-lg ring-4 ring-boho-peach-300/70'
                      : isUnlocked
                      ? 'bg-white border-boho-cream-300 shadow-soft'
                      : 'bg-boho-cream-100/90 border-boho-cream-200 opacity-70 shadow-sm'
                  }`}
                  onClick={() => handleSelectIsland(coord.week)}
                >
                  {/* Card Top: Week Badge & Status */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-boho-cream-200/90 text-boho-earth-800">
                      Week {coord.week}
                    </span>

                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-boho-sage-600">
                        <CheckCircle2 className="w-3.5 h-3.5 fill-boho-sage-100" />
                        <span>Done</span>
                      </span>
                    ) : isCurrent ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-boho-terracotta-600 animate-pulse">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Current</span>
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-[11px] font-medium text-boho-earth-800/60">
                        Unlocked
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-boho-earth-800/50">
                        <Lock className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  {/* Island Title */}
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-boho-earth-900 leading-tight">
                    {weekMeta.islandName}
                  </h4>

                  {/* Topics string */}
                  <p className="text-[10px] sm:text-xs text-boho-earth-800/70 truncate mt-0.5">
                    {weekMeta.topics.map(t => `${t.topic} (${t.problemCount})`).join(', ')}
                  </p>

                  {/* Progress & Target */}
                  <div className="mt-2 pt-2 border-t border-boho-cream-200 flex items-center justify-between text-[10px] sm:text-[11px]">
                    <span className="text-boho-earth-800/60 font-medium">
                      {solvedInWeek} / {weekMeta.weeklyTotal} solved
                    </span>
                    <span className="text-boho-terracotta-500 font-semibold flex items-center gap-0.5">
                      View <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </motion.div>

                {/* If this is the current island, render the animated Journey Avatar resting on it */}
                {isCurrent && (
                  <motion.div
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: [-4, 4, -4], opacity: 1 }}
                    transition={{
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                      opacity: { duration: 0.5 }
                    }}
                    className="absolute -top-12 -right-4 z-30 pointer-events-none"
                  >
                    <JourneyAvatar style={avatarStyle} size="md" isCelebrating={false} />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
