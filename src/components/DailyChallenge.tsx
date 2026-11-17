import React, { useState } from 'react';
import {
  Check,
  Calendar,
  Layers,
  Edit3,
  BookmarkPlus,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Lock,
  Clock
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { WEEKS_METADATA } from '../data/roadmapData';
import { DailyTask } from '../types';

interface DailyChallengeProps {
  onOpenRevisionModal?: (prefill: { topic: string; dayNumber: number }) => void;
}

export const DailyChallenge: React.FC<DailyChallengeProps> = ({ onOpenRevisionModal }) => {
  const {
    allDays,
    inspectWeek,
    setInspectWeek,
    unlockedWeeks,
    completedWeeks,
    toggleDailyTask,
    setDayNotes,
    currentDayNumber
  } = useProgress();

  const [activeNotesDay, setActiveNotesDay] = useState<number | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  const currentWeekMeta = WEEKS_METADATA.find(w => w.weekNumber === inspectWeek) || WEEKS_METADATA[0];
  const weekDays = allDays.filter(d => d.weekNumber === inspectWeek);
  const isWeekUnlocked = unlockedWeeks.includes(inspectWeek);
  const isWeekCompleted = completedWeeks.includes(inspectWeek);

  const handleOpenNotes = (day: DailyTask) => {
    setActiveNotesDay(day.dayNumber);
    setNoteText(day.notes || '');
  };

  const handleSaveNotes = (dayNumber: number) => {
    setDayNotes(dayNumber, noteText);
    setActiveNotesDay(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Week Header & Selector Bar */}
      <div className="rounded-3xl bg-white p-5 sm:p-6 border border-boho-cream-300 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full bg-boho-rose-100 text-boho-terracotta-600 font-semibold text-xs uppercase tracking-wider">
                Island #{inspectWeek} • {currentWeekMeta.islandName}
              </span>
              {isWeekCompleted && (
                <span className="px-2.5 py-0.5 rounded-full bg-boho-sage-100 text-boho-sage-700 text-xs font-semibold">
                  Conquered ✓
                </span>
              )}
              {!isWeekUnlocked && (
                <span className="px-2.5 py-0.5 rounded-full bg-boho-cream-300 text-boho-earth-800/70 text-xs font-semibold flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Locked
                </span>
              )}
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-boho-earth-900">
              {currentWeekMeta.subtitle}
            </h2>

            <p className="text-xs sm:text-sm text-boho-earth-800/70 mt-1 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-boho-terracotta-400" />
              <span>{currentWeekMeta.dateRange}</span>
              <span>•</span>
              <Layers className="w-3.5 h-3.5 text-boho-sage-500" />
              <span>{currentWeekMeta.weeklyTotal} Problems Target</span>
            </p>
          </div>

          {/* Week Selector Dropdown & Stepper */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setInspectWeek(Math.max(1, inspectWeek - 1))}
              disabled={inspectWeek <= 1}
              className="p-2 rounded-full border border-boho-cream-300 hover:bg-boho-cream-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Previous Week"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <select
              value={inspectWeek}
              onChange={(e) => setInspectWeek(Number(e.target.value))}
              className="px-3 py-2 rounded-2xl bg-boho-cream-100 border border-boho-cream-300 text-xs font-medium text-boho-earth-900 focus:outline-none focus:ring-2 focus:ring-boho-terracotta-400"
            >
              {WEEKS_METADATA.map(w => (
                <option key={w.weekNumber} value={w.weekNumber}>
                  Week {w.weekNumber}: {w.islandName} {unlockedWeeks.includes(w.weekNumber) ? '' : '🔒'}
                </option>
              ))}
            </select>

            <button
              onClick={() => setInspectWeek(Math.min(15, inspectWeek + 1))}
              disabled={inspectWeek >= 15}
              className="p-2 rounded-full border border-boho-cream-300 hover:bg-boho-cream-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Next Week"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Weekly Quote */}
        <div className="mt-4 pt-4 border-t border-boho-cream-200">
          <p className="font-serif italic text-sm text-boho-earth-800/80">
            &ldquo;{currentWeekMeta.quote}&rdquo;
          </p>
        </div>
      </div>

      {/* 7 Daily Slots Grid */}
      <div className="space-y-3.5">
        {weekDays.map(day => {
          const isToday = day.dayNumber === currentDayNumber;
          const isDone = day.completed;

          return (
            <div
              key={day.dayNumber}
              className={`rounded-3xl p-4 sm:p-5 transition-all duration-300 border ${
                isDone
                  ? 'bg-gradient-to-r from-boho-sage-50/60 to-white border-boho-sage-300/80 shadow-soft'
                  : isToday
                  ? 'bg-white border-boho-terracotta-300 shadow-soft-lg ring-2 ring-boho-peach-200'
                  : 'bg-white border-boho-cream-300 shadow-soft hover:shadow-soft-lg'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                {/* Left: Checkbox & Day Identification */}
                <div className="flex items-start sm:items-center gap-3.5">
                  
                  {/* Interactive Boho Checkbox */}
                  <button
                    onClick={() => toggleDailyTask(day.dayNumber)}
                    className={`mt-0.5 sm:mt-0 flex-shrink-0 w-8 h-8 rounded-2xl flex items-center justify-center transition-all duration-300 border ${
                      isDone
                        ? 'bg-boho-sage-500 border-boho-sage-600 text-white shadow-soft scale-105'
                        : 'bg-boho-cream-100 border-boho-cream-300 text-transparent hover:border-boho-terracotta-400 hover:bg-boho-rose-50'
                    }`}
                    title={isDone ? "Click to mark as incomplete" : "Click to complete daily target!"}
                  >
                    <Check className={`w-5 h-5 transition-transform duration-200 ${isDone ? 'scale-100' : 'scale-0'}`} />
                  </button>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-serif text-base sm:text-lg font-bold ${isDone ? 'text-boho-earth-900 line-through opacity-70' : 'text-boho-earth-900'}`}>
                        Day {day.dayNumber}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-boho-cream-200/80 text-boho-earth-800/80 font-medium">
                        {day.date}
                      </span>
                      {isToday && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-boho-peach-200 text-boho-terracotta-700 tracking-wider uppercase">
                          Today&apos;s Target
                        </span>
                      )}
                      {day.isRevisionDay && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-boho-lavender-200 text-boho-lavender-700 uppercase">
                          Final Revision Day
                        </span>
                      )}
                    </div>

                    {/* Topic Allocations for the day */}
                    <div className="flex items-center gap-2 flex-wrap mt-1.5">
                      {day.topics.map((t, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-xl bg-boho-cream-100 text-boho-earth-800 border border-boho-cream-200"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-boho-terracotta-400" />
                          <span>{t.topic}:</span>
                          <span className="text-boho-terracotta-600">{t.problemCount} {t.problemCount === 1 ? 'prob' : 'probs'}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right: Actions (Revision Log, Notes, Status) */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  
                  {/* Total problems tag */}
                  <span className="text-xs font-medium text-boho-earth-800/60 hidden md:inline">
                    {day.problemCount} {day.problemCount === 1 ? 'problem' : 'problems'}
                  </span>

                  {/* Quick Add to Revision Journal */}
                  <button
                    onClick={() => {
                      if (onOpenRevisionModal) {
                        onOpenRevisionModal({
                          topic: day.topics[0]?.topic || 'General DSA',
                          dayNumber: day.dayNumber
                        });
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white hover:bg-boho-rose-50 border border-boho-cream-300 text-xs font-medium text-boho-earth-800 transition-colors shadow-sm"
                    title="Log problem to revision journal"
                  >
                    <BookmarkPlus className="w-3.5 h-3.5 text-boho-terracotta-500" />
                    <span className="hidden sm:inline">Add Revision</span>
                  </button>

                  {/* Notes button */}
                  <button
                    onClick={() => handleOpenNotes(day)}
                    className={`p-2 rounded-2xl border transition-colors ${
                      day.notes
                        ? 'bg-boho-peach-100 border-boho-peach-300 text-boho-terracotta-600'
                        : 'bg-white border-boho-cream-300 text-boho-earth-800/60 hover:text-boho-earth-900'
                    }`}
                    title={day.notes ? "View/Edit personal notes" : "Add daily note"}
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                </div>

              </div>

              {/* Inline Notes Editor if opened */}
              {activeNotesDay === day.dayNumber && (
                <div className="mt-4 pt-3 border-t border-boho-cream-200">
                  <label className="block text-xs font-semibold text-boho-earth-800/70 mb-1">
                    Personal Reflection & Learnings for Day {day.dayNumber}:
                  </label>
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="E.g., Mastered two-pointer edge case today. Remember to check if left < right before swapping..."
                    rows={2}
                    className="w-full p-3 rounded-2xl bg-boho-cream-50 border border-boho-cream-300 text-xs text-boho-earth-900 focus:outline-none focus:ring-2 focus:ring-boho-terracotta-400 font-sans"
                  />
                  <div className="flex items-center justify-end gap-2 mt-2">
                    <button
                      onClick={() => setActiveNotesDay(null)}
                      className="px-3 py-1 rounded-xl text-xs text-boho-earth-800/60 hover:text-boho-earth-900"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveNotes(day.dayNumber)}
                      className="px-4 py-1 rounded-xl bg-boho-terracotta-500 hover:bg-boho-terracotta-600 text-white text-xs font-medium shadow-sm"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              )}

              {/* Display saved note preview */}
              {day.notes && activeNotesDay !== day.dayNumber && (
                <div className="mt-2.5 p-2.5 rounded-2xl bg-boho-cream-100/70 border border-boho-cream-200 text-xs text-boho-earth-800/80 italic font-serif">
                  &ldquo;{day.notes}&rdquo;
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
