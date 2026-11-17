import React from 'react';
import {
  Compass,
  CalendarCheck,
  Flower2,
  BookOpen,
  ArrowRight,
  Sparkles,
  Flame,
  Award
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { MotivationCard } from './MotivationCard';
import { DashboardStats } from './DashboardStats';
import { JourneyAvatar } from './JourneyAvatar';
import { WEEKS_METADATA } from '../data/roadmapData';

export const HomeDashboard: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentWeekNumber,
    currentStreak,
    gardenFlowers,
    avatarStyle,
    avatarName,
    allDays,
    currentDayNumber
  } = useProgress();

  const currentWeekMeta = WEEKS_METADATA.find(w => w.weekNumber === currentWeekNumber) || WEEKS_METADATA[0];
  const todayTask = allDays.find(d => d.dayNumber === currentDayNumber) || allDays[0];

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner Card */}
      <div className="relative overflow-hidden rounded-4xl bg-gradient-to-r from-boho-peach-100 via-boho-cream-100 to-boho-rose-100 p-6 sm:p-8 border border-boho-peach-300 shadow-soft">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-boho-peach-200 text-xs font-semibold text-boho-terracotta-600 mb-2 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chapter Active: Island #{currentWeekNumber}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-boho-earth-900 leading-tight">
              Welcome back, {avatarName}
            </h1>
            <p className="text-xs sm:text-sm text-boho-earth-800/80 mt-1 max-w-xl leading-relaxed">
              Today you are sailing toward <strong className="text-boho-earth-900">{currentWeekMeta.islandName}</strong>. Show up, solve your 4 problems, and plant today&apos;s bloom.
            </p>

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setActiveTab('today')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-boho-terracotta-500 hover:bg-boho-terracotta-600 text-white font-medium text-xs shadow-soft transition-all"
              >
                <span>Conquer Today&apos;s Tasks</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('map')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-boho-earth-900 border border-boho-cream-300 font-medium text-xs shadow-sm transition-all"
              >
                <Compass className="w-4 h-4 text-boho-terracotta-500" />
                <span>Open Adventure Map</span>
              </button>
            </div>
          </div>

          {/* Avatar representation badge */}
          <div className="self-center md:self-auto flex items-center justify-center p-3 rounded-3xl bg-white/70 border border-white/80 shadow-soft">
            <JourneyAvatar style={avatarStyle} size="lg" />
          </div>
        </div>
      </div>

      {/* Daily Motivation Card (110 curated original quotes) */}
      <MotivationCard />

      {/* Primary Dashboard Stats & Key Reminders */}
      <DashboardStats />

      {/* Quick Launchpad to Core Experiences */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Adventure Map card */}
        <div
          onClick={() => setActiveTab('map')}
          className="cursor-pointer rounded-3xl bg-white p-5 border border-boho-cream-300 shadow-soft hover:shadow-soft-lg hover:border-boho-peach-300 transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-boho-peach-100 flex items-center justify-center text-boho-terracotta-600 mb-3 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-boho-earth-900">
              15-Island Adventure Map
            </h3>
            <p className="text-xs text-boho-earth-800/70 mt-1">
              Explore your winding path from Basics to Dynamic Programming. Watch your avatar travel forward.
            </p>
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-boho-terracotta-600 group-hover:translate-x-1 transition-transform">
            <span>Explore Islands</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Streak Garden card */}
        <div
          onClick={() => setActiveTab('garden')}
          className="cursor-pointer rounded-3xl bg-white p-5 border border-boho-cream-300 shadow-soft hover:shadow-soft-lg hover:border-boho-sage-300 transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-boho-sage-100 flex items-center justify-center text-boho-sage-600 mb-3 group-hover:scale-105 transition-transform">
              <Flower2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-boho-earth-900">
              Personal Streak Garden
            </h3>
            <p className="text-xs text-boho-earth-800/70 mt-1">
              Currently flourishing with {gardenFlowers.length} botanical blossoms. Consistency nurtured day by day.
            </p>
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-boho-sage-600 group-hover:translate-x-1 transition-transform">
            <span>Visit Meadow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Revision Tracker card */}
        <div
          onClick={() => setActiveTab('revision')}
          className="cursor-pointer rounded-3xl bg-white p-5 border border-boho-cream-300 shadow-soft hover:shadow-soft-lg hover:border-boho-rose-300 transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-boho-rose-100 flex items-center justify-center text-boho-rose-600 mb-3 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-boho-earth-900">
              Revision & Error Log
            </h3>
            <p className="text-xs text-boho-earth-800/70 mt-1">
              Keep an active record of tricky patterns, pitfall mistakes, and clean approach formulations.
            </p>
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-boho-rose-600 group-hover:translate-x-1 transition-transform">
            <span>Open Journal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

      </div>

    </div>
  );
};
