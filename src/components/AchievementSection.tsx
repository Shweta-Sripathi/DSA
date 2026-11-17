import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  Footprints,
  Compass,
  Flower2,
  GitFork,
  Crown,
  BookOpen,
  Trees,
  ShieldCheck,
  Network,
  Flame,
  Cpu,
  CheckCheck,
  HeartHandshake,
  Lock,
  Check
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { Achievement } from '../types';

const ICON_MAP: Record<string, React.ElementType> = {
  Footprints,
  Sparkles,
  Compass,
  Flower2,
  Award,
  MapPin: Compass,
  GitFork,
  Crown,
  BookOpen,
  Trees,
  ShieldCheck,
  Network,
  Flame,
  Cpu,
  CheckCheck,
  HeartHandshake
};

export const AchievementSection: React.FC = () => {
  const { achievements } = useProgress();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'streak' | 'problems' | 'weeks' | 'revision'>('all');

  const filtered = achievements.filter(a => {
    if (selectedCategory === 'all') return true;
    return a.category === selectedCategory;
  });

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="rounded-3xl bg-white p-5 sm:p-6 border border-boho-cream-300 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-full bg-boho-rose-100 text-boho-terracotta-500">
                <Award className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-boho-terracotta-500">
                Trophies & Milestones
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-boho-earth-900">
              Your Hall of Achievements
            </h2>
            <p className="text-xs sm:text-sm text-boho-earth-800/70 mt-1">
              Every stage of your discipline unlocks botanical tokens of honor.
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-boho-peach-50 border border-boho-peach-200 text-center self-start md:self-auto min-w-[7rem]">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-boho-terracotta-600 block">
              {unlockedCount} / {achievements.length}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-boho-earth-800/70 uppercase tracking-wider">
              Badges Earned
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 mt-5 overflow-x-auto no-scrollbar">
          {(['all', 'streak', 'problems', 'weeks', 'revision'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-medium capitalize whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-boho-terracotta-500 text-white font-semibold shadow-soft'
                  : 'bg-boho-cream-100 text-boho-earth-800/70 hover:bg-boho-cream-200'
              }`}
            >
              {cat === 'all' ? 'All Badges' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(ach => {
          const Icon = ICON_MAP[ach.iconName] || Award;
          const pct = Math.round((ach.currentValue / ach.targetValue) * 100);

          return (
            <div
              key={ach.id}
              className={`rounded-3xl p-5 border transition-all duration-300 relative flex flex-col justify-between ${
                ach.unlocked
                  ? 'bg-gradient-to-b from-white via-boho-cream-50 to-boho-rose-50/50 border-boho-peach-300 shadow-soft hover:shadow-soft-lg'
                  : 'bg-white/80 border-boho-cream-300 opacity-65'
              }`}
            >
              <div>
                {/* Top icon and tier tag */}
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-soft ${
                      ach.unlocked
                        ? 'bg-boho-peach-100 border-boho-peach-300 text-boho-terracotta-600'
                        : 'bg-boho-cream-200 border-boho-cream-300 text-boho-earth-800/40'
                    }`}
                  >
                    {ach.unlocked ? (
                      <Icon className="w-6 h-6 animate-pulse" />
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    ach.unlocked
                      ? 'bg-boho-sage-100 text-boho-sage-700'
                      : 'bg-boho-cream-200 text-boho-earth-800/60'
                  }`}>
                    {ach.badgeTier}
                  </span>
                </div>

                {/* Title & Description */}
                <h4 className="font-serif font-bold text-base text-boho-earth-900 leading-snug">
                  {ach.title}
                </h4>
                <p className="text-xs text-boho-earth-800/70 mt-1 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              {/* Bottom progress or unlocked stamp */}
              <div className="mt-4 pt-3 border-t border-boho-cream-200">
                {ach.unlocked ? (
                  <div className="flex items-center justify-between text-xs text-boho-sage-600 font-semibold">
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Unlocked</span>
                    </span>
                    {ach.unlockedAt && (
                      <span className="text-[11px] text-boho-earth-800/50 font-normal">
                        {ach.unlockedAt}
                      </span>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-boho-earth-800/60 mb-1">
                      <span>Progress</span>
                      <span>{ach.currentValue} / {ach.targetValue}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-boho-cream-200 overflow-hidden">
                      <div
                        className="h-full bg-boho-terracotta-400 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
