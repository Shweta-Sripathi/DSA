import React from 'react';
import {
  CheckCircle2,
  Calendar,
  Flame,
  Target,
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { TOTAL_PROBLEMS, TOTAL_DAYS, TOTAL_WEEKS } from '../data/roadmapData';

export const DashboardStats: React.FC = () => {
  const {
    completedProblemsCount,
    remainingProblemsCount,
    completedDaysCount,
    completionPercentage,
    currentWeekNumber,
    currentDayNumber,
    currentStreak,
    completedWeeks,
    setActiveTab
  } = useProgress();

  const stats = [
    {
      label: "Problems Completed",
      value: `${completedProblemsCount}`,
      subtext: `of ${TOTAL_PROBLEMS} total`,
      icon: CheckCircle2,
      color: "text-boho-terracotta-500",
      bg: "bg-boho-peach-50",
      border: "border-boho-peach-200"
    },
    {
      label: "Remaining Target",
      value: `${remainingProblemsCount}`,
      subtext: `${completionPercentage}% progress`,
      icon: Target,
      color: "text-boho-rose-500",
      bg: "bg-boho-rose-50",
      border: "border-boho-rose-200"
    },
    {
      label: "Days Conquered",
      value: `${completedDaysCount}`,
      subtext: `of ${TOTAL_DAYS} days planned`,
      icon: Calendar,
      color: "text-boho-sage-600",
      bg: "bg-boho-sage-50",
      border: "border-boho-sage-200"
    },
    {
      label: "Weeks Unlocked",
      value: `${completedWeeks.length} / ${TOTAL_WEEKS}`,
      subtext: `Active on Week ${currentWeekNumber}`,
      icon: Award,
      color: "text-boho-teal-600",
      bg: "bg-boho-teal-50",
      border: "border-boho-teal-200"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* 4 Primary Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className={`rounded-3xl p-4 sm:p-5 bg-white border ${s.border} shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-boho-earth-800/60 uppercase tracking-wider">
                  {s.label}
                </span>
                <span className={`p-2 rounded-2xl ${s.bg} ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-boho-earth-900 block leading-tight">
                  {s.value}
                </span>
                <span className="text-xs text-boho-earth-800/60 font-sans mt-0.5 block">
                  {s.subtext}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar with Milestone Markers */}
      <div className="rounded-3xl bg-white p-5 sm:p-6 border border-boho-cream-300 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-boho-rose-100 text-boho-terracotta-500">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span className="font-serif font-bold text-base text-boho-earth-900">
              Roadmap Trajectory
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-boho-peach-100 text-boho-terracotta-600">
              {completionPercentage}% Complete
            </span>
          </div>
          <span className="text-xs text-boho-earth-800/60 font-medium">
            {completedProblemsCount} of 413 problems solved • {remainingProblemsCount} to go
          </span>
        </div>

        {/* Outer bar */}
        <div className="relative w-full h-4 bg-boho-cream-200 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-boho-rose-400 via-boho-peach-400 to-boho-sage-400 transition-all duration-700 ease-out shadow-inner-soft"
            style={{ width: `${Math.max(2, completionPercentage)}%` }}
          />
        </div>

        {/* Milestone labels */}
        <div className="flex items-center justify-between text-[11px] text-boho-earth-800/50 mt-2 font-medium">
          <span>Day 1 (Nov 29)</span>
          <span>Week 5 (140)</span>
          <span>Week 10 (280)</span>
          <span>Grand Finale: 413 (Mar 13)</span>
        </div>
      </div>

      {/* Key Reminders Card (Section 16 of specification) */}
      <div className="rounded-3xl bg-gradient-to-r from-boho-sage-50/70 via-white to-boho-cream-100/60 p-5 sm:p-6 border border-boho-sage-200/80 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-boho-sage-200 text-boho-sage-600">
              <BookOpen className="w-4 h-4" />
            </span>
            <h3 className="font-serif font-bold text-base text-boho-earth-900">
              Core Principles & Reminders
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('revision')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-boho-sage-600 hover:text-boho-sage-700 transition-colors"
          >
            <span>Open Revision Journal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/80 border border-boho-sage-100">
            <span className="text-boho-terracotta-500 font-serif font-bold text-sm">1.</span>
            <p className="text-xs text-boho-earth-800/80 leading-relaxed">
              <strong className="text-boho-earth-900">Solve four problems per day.</strong> Consistency beats sporadic marathon sessions every time.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/80 border border-boho-sage-100">
            <span className="text-boho-terracotta-500 font-serif font-bold text-sm">2.</span>
            <p className="text-xs text-boho-earth-800/80 leading-relaxed">
              <strong className="text-boho-earth-900">Revise daily, as and when you solve.</strong> Do not defer revision to an elusive future date.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/80 border border-boho-sage-100">
            <span className="text-boho-terracotta-500 font-serif font-bold text-sm">3.</span>
            <p className="text-xs text-boho-earth-800/80 leading-relaxed">
              <strong className="text-boho-earth-900">Maintain an error log.</strong> Document the mistake, the learned pattern, and clean approach.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/80 border border-boho-sage-100">
            <span className="text-boho-terracotta-500 font-serif font-bold text-sm">4.</span>
            <p className="text-xs text-boho-earth-800/80 leading-relaxed">
              <strong className="text-boho-earth-900">Focus on patterns.</strong> Sliding window, two pointers, tree recursion, memoization states.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/80 border border-boho-sage-100">
            <span className="text-boho-terracotta-500 font-serif font-bold text-sm">5.</span>
            <p className="text-xs text-boho-earth-800/80 leading-relaxed">
              <strong className="text-boho-earth-900">Understand the approach.</strong> Never memorize syntax. Train your mental simulator.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/80 border border-boho-sage-100">
            <span className="text-boho-terracotta-500 font-serif font-bold text-sm">6.</span>
            <p className="text-xs text-boho-earth-800/80 leading-relaxed">
              <strong className="text-boho-earth-900">Final Revision: 13 March 2027.</strong> The closing scene where all 413 problems lock in.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
