import React, { useState } from 'react';
import {
  User,
  Flame,
  Award,
  Flower2,
  Calendar,
  CheckCircle2,
  Target,
  Edit2,
  Check
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { JourneyAvatar } from './JourneyAvatar';
import { ProgressCharts } from './ProgressCharts';
import { TOTAL_PROBLEMS, TOTAL_DAYS, TOTAL_WEEKS } from '../data/roadmapData';
import { AvatarStyle } from '../types';

export const ProfilePage: React.FC = () => {
  const {
    avatarStyle,
    setAvatarStyle,
    avatarName,
    setAvatarName,
    completedProblemsCount,
    remainingProblemsCount,
    completionPercentage,
    completedDaysCount,
    currentStreak,
    longestStreak,
    completedWeeks,
    gardenFlowers,
    achievements
  } = useProgress();

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(avatarName);

  const handleSaveName = () => {
    if (tempName.trim()) {
      setAvatarName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const unlockedBadgesCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-6">
      
      {/* Profile Overview Card */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-boho-cream-300 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            {/* Journey Avatar Preview */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-boho-peach-100 to-boho-rose-100 border-2 border-boho-terracotta-300 flex items-center justify-center shadow-soft">
                <JourneyAvatar style={avatarStyle} size="lg" />
              </div>
            </div>

            <div>
              {/* Name and editing */}
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="px-3 py-1 rounded-xl bg-boho-cream-100 border border-boho-cream-300 text-sm font-serif font-bold text-boho-earth-900 focus:outline-none"
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-1.5 rounded-lg bg-boho-sage-500 text-white"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-boho-earth-900">
                      {avatarName}
                    </h2>
                    <button
                      onClick={() => {
                        setTempName(avatarName);
                        setIsEditingName(true);
                      }}
                      className="p-1 rounded-lg text-boho-earth-800/50 hover:text-boho-earth-900 transition-colors"
                      title="Edit name"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>

              <p className="text-xs sm:text-sm text-boho-terracotta-600 font-medium mt-0.5">
                Heroine of the 15-Week DSA Plot • Nov 29, 2026 – Mar 13, 2027
              </p>

              {/* Avatar Style Picker */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs text-boho-earth-800/60 font-medium">Style:</span>
                {(['botanist', 'scholar', 'sage', 'coder'] as AvatarStyle[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setAvatarStyle(s)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-medium capitalize transition-all ${
                      avatarStyle === s
                        ? 'bg-boho-terracotta-500 text-white font-semibold shadow-soft'
                        : 'bg-boho-cream-100 text-boho-earth-800/70 hover:bg-boho-cream-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Trophy & Blossom Summary */}
          <div className="flex items-center gap-3 sm:gap-4 self-start md:self-auto">
            <div className="p-3 sm:p-4 rounded-2xl bg-boho-peach-50 border border-boho-peach-200 text-center min-w-[5.5rem]">
              <span className="font-serif text-xl sm:text-2xl font-bold text-boho-terracotta-600 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 fill-boho-terracotta-500" />
                <span>{currentStreak}</span>
              </span>
              <span className="text-[10px] font-semibold text-boho-earth-800/70 uppercase">
                Active Streak
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-boho-rose-50 border border-boho-rose-200 text-center min-w-[5.5rem]">
              <span className="font-serif text-xl sm:text-2xl font-bold text-boho-rose-600 flex items-center justify-center gap-1">
                <Flower2 className="w-4 h-4" />
                <span>{gardenFlowers.length}</span>
              </span>
              <span className="text-[10px] font-semibold text-boho-earth-800/70 uppercase">
                Blossoms
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-boho-sage-50 border border-boho-sage-200 text-center min-w-[5.5rem]">
              <span className="font-serif text-xl sm:text-2xl font-bold text-boho-sage-700 flex items-center justify-center gap-1">
                <Award className="w-4 h-4" />
                <span>{unlockedBadgesCount}</span>
              </span>
              <span className="text-[10px] font-semibold text-boho-earth-800/70 uppercase">
                Badges
              </span>
            </div>
          </div>

        </div>

        {/* 8 Metric KPI Strip (Section 10 requirements) */}
        <div className="mt-6 pt-6 border-t border-boho-cream-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-boho-cream-100/70">
            <span className="text-[11px] text-boho-earth-800/60 uppercase font-semibold block">Total Problems</span>
            <span className="font-serif text-xl font-bold text-boho-earth-900">{TOTAL_PROBLEMS}</span>
          </div>
          <div className="p-3 rounded-2xl bg-boho-cream-100/70">
            <span className="text-[11px] text-boho-earth-800/60 uppercase font-semibold block">Problems Solved</span>
            <span className="font-serif text-xl font-bold text-boho-terracotta-600">{completedProblemsCount}</span>
          </div>
          <div className="p-3 rounded-2xl bg-boho-cream-100/70">
            <span className="text-[11px] text-boho-earth-800/60 uppercase font-semibold block">Remaining Problems</span>
            <span className="font-serif text-xl font-bold text-boho-earth-900">{remainingProblemsCount}</span>
          </div>
          <div className="p-3 rounded-2xl bg-boho-cream-100/70">
            <span className="text-[11px] text-boho-earth-800/60 uppercase font-semibold block">Completion %</span>
            <span className="font-serif text-xl font-bold text-boho-sage-600">{completionPercentage}%</span>
          </div>
          <div className="p-3 rounded-2xl bg-boho-cream-100/70">
            <span className="text-[11px] text-boho-earth-800/60 uppercase font-semibold block">Days Completed</span>
            <span className="font-serif text-xl font-bold text-boho-earth-900">{completedDaysCount} / {TOTAL_DAYS}</span>
          </div>
          <div className="p-3 rounded-2xl bg-boho-cream-100/70">
            <span className="text-[11px] text-boho-earth-800/60 uppercase font-semibold block">Weeks Completed</span>
            <span className="font-serif text-xl font-bold text-boho-earth-900">{completedWeeks.length} / {TOTAL_WEEKS}</span>
          </div>
          <div className="p-3 rounded-2xl bg-boho-cream-100/70">
            <span className="text-[11px] text-boho-earth-800/60 uppercase font-semibold block">Current Streak</span>
            <span className="font-serif text-xl font-bold text-boho-terracotta-600">{currentStreak} Days</span>
          </div>
          <div className="p-3 rounded-2xl bg-boho-cream-100/70">
            <span className="text-[11px] text-boho-earth-800/60 uppercase font-semibold block">Longest Streak</span>
            <span className="font-serif text-xl font-bold text-boho-terracotta-600">{longestStreak} Days</span>
          </div>
        </div>
      </div>

      {/* Render 5 Progress Graphs */}
      <ProgressCharts />

    </div>
  );
};
