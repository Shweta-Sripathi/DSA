import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flower2,
  Sparkles,
  Heart,
  Calendar,
  Flame,
  Info,
  Droplets,
  Layers
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { GardenFlower } from '../types';
import { TOTAL_DAYS } from '../data/roadmapData';

export const StreakGarden: React.FC = () => {
  const {
    gardenFlowers,
    currentStreak,
    completedDaysCount,
    allDays
  } = useProgress();

  const [selectedFlower, setSelectedFlower] = useState<GardenFlower | null>(null);

  // Render individual SVG flower blossom based on type
  const renderFlowerSVG = (flower: GardenFlower) => {
    const isSpecial = flower.flowerType === 'golden-rose' || flower.growthStage === 'bloomed-special';

    return (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow transition-transform duration-300 group-hover:scale-125"
      >
        {/* Stem and gentle green leaf */}
        <path
          d="M 50 50 Q 48 75 50 96"
          stroke="#75885C"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 50 72 Q 38 68 34 76 Q 44 80 50 72 Z"
          fill="#A3B18A"
          opacity="0.85"
        />
        {flower.streakAtTime >= 3 && (
          <path
            d="M 50 64 Q 62 60 66 68 Q 56 72 50 64 Z"
            fill="#75885C"
            opacity="0.85"
          />
        )}

        {/* Petals */}
        <g transform="translate(50, 48)">
          {isSpecial ? (
            // Golden Masterpiece Rose
            <>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <path
                  key={i}
                  d="M 0 0 C -14 -22 -12 -35 0 -42 C 12 -35 14 -22 0 0"
                  fill="#D4AF37"
                  opacity="0.9"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="14" fill="#FDEBD0" />
              <circle cx="0" cy="0" r="7" fill="#C86D51" />
            </>
          ) : flower.flowerType === 'lavender' ? (
            // Lavender sprig
            <>
              {[-16, -8, 0, 8, 16].map((yOff, i) => (
                <g key={i} transform={`translate(0, ${yOff - 12})`}>
                  <ellipse cx="-7" cy="0" rx="6" ry="3.5" fill={flower.color} opacity="0.85" transform="rotate(-20)" />
                  <ellipse cx="7" cy="0" rx="6" ry="3.5" fill={flower.color} opacity="0.85" transform="rotate(20)" />
                </g>
              ))}
              <circle cx="0" cy="-28" r="4" fill="#E8D7F1" />
            </>
          ) : flower.flowerType === 'chamomile' ? (
            // Delicate white & peach chamomile
            <>
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
                <ellipse
                  key={i}
                  cx="0"
                  cy="-18"
                  rx="4.5"
                  ry="12"
                  fill="#FFF7F2"
                  stroke="#EDE0D4"
                  strokeWidth="0.5"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="9" fill="#F5CBA7" />
              <circle cx="0" cy="0" r="5" fill="#C86D51" />
            </>
          ) : (
            // Romantic Rose / Peony
            <>
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <path
                  key={i}
                  d="M 0 0 C -12 -20 -10 -32 0 -38 C 10 -32 12 -20 0 0"
                  fill={flower.color}
                  opacity="0.88"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="8" fill="#FADBD8" />
              <circle cx="0" cy="0" r="4" fill="#C86D51" />
            </>
          )}
        </g>
      </svg>
    );
  };

  const gardenDensity = Math.round((gardenFlowers.length / TOTAL_DAYS) * 100);

  return (
    <div className="space-y-6">
      
      {/* Garden Intro & Stats Header */}
      <div className="rounded-3xl bg-white p-5 sm:p-6 border border-boho-cream-300 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-full bg-boho-sage-100 text-boho-sage-600">
                <Flower2 className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-boho-sage-600">
                The Streak Garden
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-boho-earth-900">
              Your Living Meadow of Consistency
            </h2>
            <p className="text-xs sm:text-sm text-boho-earth-800/70 mt-1 max-w-xl">
              Every day you conquer your 4 DSA problems, a flower takes root here. Your effort never withers—even if life interrupts, every flower you earned remains preserved.
            </p>
          </div>

          {/* Quick Garden Counters */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <div className="p-3 sm:p-4 rounded-2xl bg-boho-peach-50 border border-boho-peach-200 text-center min-w-[5.5rem]">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-boho-terracotta-600">
                {gardenFlowers.length}
              </span>
              <span className="text-[11px] font-semibold text-boho-earth-800/70 uppercase tracking-wider">
                Blossoms
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-boho-sage-50 border border-boho-sage-200 text-center min-w-[5.5rem]">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-boho-sage-700">
                {gardenDensity}%
              </span>
              <span className="text-[11px] font-semibold text-boho-earth-800/70 uppercase tracking-wider">
                Density
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-boho-rose-50 border border-boho-rose-200 text-center min-w-[5.5rem]">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-boho-rose-600 flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 fill-boho-rose-500" />
                <span>{currentStreak}</span>
              </span>
              <span className="text-[11px] font-semibold text-boho-earth-800/70 uppercase tracking-wider">
                Streak
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Interactive Garden Meadow */}
      <div className="relative w-full min-h-[520px] sm:min-h-[640px] rounded-4xl overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#EBE2D5] border-2 border-boho-cream-300 shadow-soft-lg p-6">
        
        {/* Soft grass & soil textures */}
        <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#A3B18A_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Stepping stone path across the garden */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <path
            d="M 50 50 Q 250 180 500 240 T 950 480"
            fill="none"
            stroke="#DFD0C0"
            strokeWidth="45"
            strokeDasharray="18 14"
            strokeLinecap="round"
          />
        </svg>

        {/* Empty state encouragement if no flowers yet */}
        {gardenFlowers.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
            <div className="w-16 h-16 rounded-full bg-white/80 border border-boho-cream-300 flex items-center justify-center mb-3 shadow-soft">
              <Droplets className="w-7 h-7 text-boho-sage-500 animate-bounce" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-boho-earth-900">
              The Soil is Prepared
            </h3>
            <p className="text-xs sm:text-sm text-boho-earth-800/70 max-w-sm mt-1">
              Conquer your first daily challenge on Day 1 to plant your first botanical blossom!
            </p>
          </div>
        )}

        {/* Render Bloomed Flowers */}
        <div className="relative w-full h-full min-h-[480px]">
          {gardenFlowers.map(flower => {
            return (
              <motion.div
                key={flower.dayNumber}
                initial={{ scale: 0, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                style={{
                  left: `${flower.xPercent}%`,
                  top: `${flower.yPercent}%`,
                  width: `${flower.size * 1.5}px`,
                  height: `${flower.size * 1.8}px`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                onClick={() => setSelectedFlower(flower)}
              >
                {renderFlowerSVG(flower)}

                {/* Day label badge on hover */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-boho-earth-900 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-md pointer-events-none">
                  Day {flower.dayNumber}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Flower Inspection Modal / Bottom Sheet */}
        <AnimatePresence>
          {selectedFlower && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-boho-rose-200 shadow-soft-lg z-30"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-boho-peach-100 flex items-center justify-center">
                    <Flower2 className="w-5 h-5 text-boho-terracotta-500" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-boho-earth-900">
                      Day {selectedFlower.dayNumber} Blossom
                    </h4>
                    <span className="text-xs text-boho-earth-800/60 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{selectedFlower.date}</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedFlower(null)}
                  className="text-xs text-boho-earth-800/60 hover:text-boho-earth-900 p-1"
                >
                  ✕
                </button>
              </div>

              <div className="mt-3.5 space-y-2 text-xs border-t border-boho-cream-200 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-boho-earth-800/70">Flower Variety:</span>
                  <span className="font-semibold text-boho-earth-900 capitalize">
                    {selectedFlower.flowerType.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-boho-earth-800/70">Growth Stage:</span>
                  <span className="font-semibold text-boho-sage-600 capitalize">
                    {selectedFlower.growthStage}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-boho-earth-800/70">Active Streak at Bloom:</span>
                  <span className="font-semibold text-boho-terracotta-600 flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-boho-terracotta-500" />
                    <span>{selectedFlower.streakAtTime} Days</span>
                  </span>
                </div>
                {allDays[selectedFlower.dayNumber - 1]?.notes && (
                  <div className="mt-2 p-2 rounded-xl bg-boho-cream-100 text-boho-earth-800 italic font-serif">
                    &ldquo;{allDays[selectedFlower.dayNumber - 1]?.notes}&rdquo;
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
};
