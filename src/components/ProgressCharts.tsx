import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  Calendar,
  Layers,
  Flame,
  CheckCircle2,
  PieChart
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { TOPIC_COUNTS, WEEKS_METADATA, TOTAL_PROBLEMS, TOTAL_DAYS } from '../data/roadmapData';

export const ProgressCharts: React.FC = () => {
  const { allDays, completedProblemsCount, completedWeeks } = useProgress();
  const [activeChartTab, setActiveChartTab] = useState<'topics' | 'weeks' | 'trajectory' | 'heatmap' | 'recent'>('topics');

  // 1. Topic Breakdown calculation
  const topicStats = Object.keys(TOPIC_COUNTS).map(topicName => {
    const target = TOPIC_COUNTS[topicName];
    // Find all days where this topic was allocated and completed
    let solved = 0;
    allDays.forEach(day => {
      if (day.completed) {
        day.topics.forEach(t => {
          if (t.topic === topicName) {
            solved += t.problemCount;
          }
        });
      }
    });

    const percent = target > 0 ? Math.min(100, Math.round((solved / target) * 100)) : 100;
    return {
      topic: topicName,
      target,
      solved,
      percent
    };
  });

  // 2. Weekly target vs actual
  const weeklyStats = WEEKS_METADATA.map(w => {
    const weekDays = allDays.filter(d => d.weekNumber === w.weekNumber);
    const solved = weekDays.filter(d => d.completed).reduce((acc, d) => acc + d.problemCount, 0);
    return {
      weekNumber: w.weekNumber,
      islandName: w.islandName,
      target: w.weeklyTotal,
      solved,
      percent: Math.round((solved / w.weeklyTotal) * 100)
    };
  });

  // 3. Cumulative trajectory calculation (15 weeks)
  let cumulativePlanned = 0;
  let cumulativeActual = 0;
  const trajectoryPoints = WEEKS_METADATA.map(w => {
    cumulativePlanned += w.weeklyTotal;
    const weekDays = allDays.filter(d => d.weekNumber === w.weekNumber);
    const weekSolved = weekDays.filter(d => d.completed).reduce((acc, d) => acc + d.problemCount, 0);
    cumulativeActual += weekSolved;

    return {
      week: w.weekNumber,
      planned: cumulativePlanned,
      actual: cumulativeActual
    };
  });

  return (
    <div className="space-y-6">
      
      {/* Chart Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-white p-1.5 rounded-2xl border border-boho-cream-300 shadow-soft">
        {[
          { id: 'topics', label: 'Topic Breakdown', icon: Layers },
          { id: 'weeks', label: 'Weekly Targets', icon: BarChart3 },
          { id: 'trajectory', label: 'Cumulative Trajectory', icon: TrendingUp },
          { id: 'heatmap', label: '105-Day Heatmap', icon: Calendar },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeChartTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveChartTab(tab.id as any)}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-boho-terracotta-500 text-white font-semibold shadow-soft'
                  : 'text-boho-earth-800/70 hover:bg-boho-cream-100 hover:text-boho-earth-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Chart 1: Topic Breakdown */}
      {activeChartTab === 'topics' && (
        <div className="rounded-3xl bg-white p-5 sm:p-6 border border-boho-cream-300 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-boho-earth-900">
                DSA Topics Mastery
              </h3>
              <p className="text-xs text-boho-earth-800/60 mt-0.5">
                Progress across each of the 18 syllabus domains.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-boho-sage-100 text-boho-sage-700">
              {topicStats.filter(t => t.solved >= t.target && t.target > 0).length} / 17 Mastered
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {topicStats.map(item => {
              if (item.target === 0) return null; // skip 0-target topic like Time & Space Complexity

              return (
                <div
                  key={item.topic}
                  className="p-3.5 rounded-2xl bg-boho-cream-50/70 border border-boho-cream-200 hover:border-boho-peach-300 transition-all"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-serif font-bold text-boho-earth-900">
                      {item.topic}
                    </span>
                    <span className="font-medium text-boho-earth-800/70">
                      <strong className="text-boho-terracotta-600">{item.solved}</strong> / {item.target} ({item.percent}%)
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-boho-cream-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.percent >= 100
                          ? 'bg-boho-sage-500'
                          : item.percent > 50
                          ? 'bg-boho-peach-400'
                          : 'bg-boho-rose-400'
                      }`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Chart 2: Weekly Progress (15 Weeks Bar Chart) */}
      {activeChartTab === 'weeks' && (
        <div className="rounded-3xl bg-white p-5 sm:p-6 border border-boho-cream-300 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-boho-earth-900">
                Weekly Target vs Actual Solved
              </h3>
              <p className="text-xs text-boho-earth-800/60 mt-0.5">
                Target: 28 problems/week (Week 15: 21 problems).
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-boho-peach-100 text-boho-terracotta-600">
              15 Weeks Planned
            </span>
          </div>

          <div className="space-y-2.5">
            {weeklyStats.map(w => {
              const barWidth = Math.min(100, Math.round((w.solved / w.target) * 100));

              return (
                <div key={w.weekNumber} className="flex items-center gap-3 text-xs">
                  <div className="w-20 sm:w-24 font-serif font-bold text-boho-earth-900 truncate">
                    W{w.weekNumber}: {w.islandName.split(' ')[0]}
                  </div>

                  <div className="flex-1 h-5 rounded-xl bg-boho-cream-200 overflow-hidden p-0.5 relative">
                    <div
                      className={`h-full rounded-lg transition-all duration-500 ${
                        barWidth >= 100 ? 'bg-boho-sage-500' : 'bg-boho-terracotta-400'
                      }`}
                      style={{ width: `${barWidth}%` }}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-boho-earth-800">
                      {w.solved} / {w.target}
                    </span>
                  </div>

                  <span className="w-10 text-right font-medium text-[11px] text-boho-earth-800/70">
                    {barWidth}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Chart 3: Cumulative Trajectory */}
      {activeChartTab === 'trajectory' && (
        <div className="rounded-3xl bg-white p-5 sm:p-6 border border-boho-cream-300 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-boho-earth-900">
                Cumulative Pace Curve
              </h3>
              <p className="text-xs text-boho-earth-800/60 mt-0.5">
                Target pace ascending from 0 to 413 problems.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-boho-sage-600 font-medium">
                <span className="w-3 h-1 bg-boho-sage-500 rounded-full" /> Actual
              </span>
              <span className="flex items-center gap-1.5 text-boho-earth-800/50 font-medium">
                <span className="w-3 h-1 bg-boho-cream-400 rounded-full" /> Target
              </span>
            </div>
          </div>

          {/* SVG Trajectory Graph */}
          <div className="w-full h-64 sm:h-72 relative">
            <svg viewBox="0 0 750 300" className="w-full h-full overflow-visible">
              {/* Grid lines */}
              {[0, 100, 200, 300, 413].map((val, i) => {
                const y = 270 - (val / 413) * 240;
                return (
                  <g key={i}>
                    <line x1="40" y1={y} x2="720" y2={y} stroke="#EDE0D4" strokeDasharray="4 4" strokeWidth="1" />
                    <text x="32" y={y + 4} fill="#8C7A6B" fontSize="11" textAnchor="end">{val}</text>
                  </g>
                );
              })}

              {/* Target Line */}
              <polyline
                fill="none"
                stroke="#D8C3E5"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                points={trajectoryPoints.map((pt, i) => {
                  const x = 50 + (i / 14) * 660;
                  const y = 270 - (pt.planned / 413) * 240;
                  return `${x},${y}`;
                }).join(' ')}
              />

              {/* Actual Line */}
              <polyline
                fill="none"
                stroke="#C86D51"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={trajectoryPoints.map((pt, i) => {
                  const x = 50 + (i / 14) * 660;
                  const y = 270 - (pt.actual / 413) * 240;
                  return `${x},${y}`;
                }).join(' ')}
              />

              {/* Data points for actual */}
              {trajectoryPoints.map((pt, i) => {
                const x = 50 + (i / 14) * 660;
                const y = 270 - (pt.actual / 413) * 240;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4.5"
                    fill="#C86D51"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs text-boho-earth-800/60 mt-3 pt-3 border-t border-boho-cream-200">
            <span>Start: Nov 29, 2026 (Day 1)</span>
            <span className="font-semibold text-boho-terracotta-600">
              {completedProblemsCount} of 413 Conquered
            </span>
            <span>Finale: Mar 13, 2027 (Day 105)</span>
          </div>
        </div>
      )}

      {/* Chart 4: 105-Day Heatmap Calendar */}
      {activeChartTab === 'heatmap' && (
        <div className="rounded-3xl bg-white p-5 sm:p-6 border border-boho-cream-300 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-boho-earth-900">
                105-Day Habit Calendar
              </h3>
              <p className="text-xs text-boho-earth-800/60 mt-0.5">
                Every cell represents 1 calendar day of the 15-week journey.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-boho-earth-800/70">
              <span>Less</span>
              <span className="w-3 h-3 rounded-md bg-boho-cream-200" />
              <span className="w-3 h-3 rounded-md bg-boho-peach-200" />
              <span className="w-3 h-3 rounded-md bg-boho-rose-300" />
              <span className="w-3 h-3 rounded-md bg-boho-sage-500" />
              <span>More</span>
            </div>
          </div>

          {/* 15 Weeks Grid (15 columns x 7 rows) */}
          <div className="grid grid-cols-15 gap-1.5 sm:gap-2">
            {allDays.map(day => {
              return (
                <div
                  key={day.dayNumber}
                  title={`Day ${day.dayNumber} (${day.date}): ${day.completed ? 'Completed ✓' : 'Pending'}`}
                  className={`aspect-square rounded-lg transition-all border flex items-center justify-center text-[9px] font-medium cursor-pointer ${
                    day.completed
                      ? 'bg-boho-sage-500 border-boho-sage-600 text-white shadow-sm'
                      : 'bg-boho-cream-100 border-boho-cream-300 text-boho-earth-800/40 hover:border-boho-terracotta-300'
                  }`}
                >
                  {day.dayNumber}
                </div>
              );
            })}
          </div>

          <p className="text-xs text-boho-earth-800/60 mt-4 text-center">
            Completed: {allDays.filter(d => d.completed).length} of 105 Days
          </p>
        </div>
      )}

    </div>
  );
};
