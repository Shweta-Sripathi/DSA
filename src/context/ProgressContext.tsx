import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  DailyTask,
  GardenFlower,
  RevisionProblem,
  Achievement,
  AvatarStyle,
  UserProgressState,
  MotivationMessage,
  CheerMessage
} from '../types';
import { generateDailyTasks, WEEKS_METADATA, TOTAL_PROBLEMS, TOTAL_DAYS } from '../data/roadmapData';
import { MOTIVATIONS } from '../data/motivations';
import { CHEER_MESSAGES } from '../data/cheers';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { firePastelConfetti, fireGrandFinaleConfetti } from '../utils/confetti';

interface ProgressContextType {
  // Navigation & View state
  activeTab: 'dashboard' | 'map' | 'today' | 'garden' | 'revision' | 'profile' | 'achievements';
  setActiveTab: (tab: 'dashboard' | 'map' | 'today' | 'garden' | 'revision' | 'profile' | 'achievements') => void;
  hasStarted: boolean;
  setHasStarted: (val: boolean) => void;
  
  // Roadmap & Tasks
  allDays: DailyTask[];
  taskStateMap: Record<number, { completed: boolean; completedAt?: string; notes?: string }>;
  toggleDailyTask: (dayNumber: number) => void;
  setDayNotes: (dayNumber: number, notes: string) => void;
  
  // Islands & Navigation
  unlockedWeeks: number[];
  completedWeeks: number[];
  currentIslandWeek: number;
  setCurrentIslandWeek: (week: number) => void;
  inspectWeek: number;
  setInspectWeek: (week: number) => void;

  // Streaks & Garden
  currentStreak: number;
  longestStreak: number;
  gardenFlowers: GardenFlower[];

  // Motivation & Cheers
  dailyMotivation: MotivationMessage;
  cycleDailyMotivation: () => void;
  activeCheer: CheerMessage | null;
  dailyCelebrationOpen: boolean;
  closeDailyCelebration: () => void;
  weeklyCelebrationOpen: boolean;
  justCompletedWeekNumber: number | null;
  closeWeeklyCelebration: () => void;
  grandFinaleOpen: boolean;
  closeGrandFinale: () => void;

  // Stats
  completedProblemsCount: number;
  remainingProblemsCount: number;
  completedDaysCount: number;
  completionPercentage: number;
  currentDayNumber: number; // calculated from calendar or latest active
  currentWeekNumber: number;

  // Avatar
  avatarStyle: AvatarStyle;
  setAvatarStyle: (style: AvatarStyle) => void;
  avatarName: string;
  setAvatarName: (name: string) => void;

  // Revision Tracker
  revisionItems: RevisionProblem[];
  addRevisionProblem: (item: Omit<RevisionProblem, 'id' | 'dateAdded' | 'revised'>) => void;
  toggleRevisionStatus: (id: string) => void;
  deleteRevisionItem: (id: string) => void;
  updateRevisionItem: (id: string, updates: Partial<RevisionProblem>) => void;

  // Achievements
  achievements: Achievement[];

  // Persistence actions
  exportProgressJSON: () => void;
  importProgressJSON: (jsonString: string) => boolean;
  resetAllProgress: () => void;
}

const STORAGE_KEY = 'DO_IT_FOR_THE_PLOT_PROGRESS_V1';

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const allGeneratedDays = useMemo(() => generateDailyTasks(), []);

  // Determine current day number based on actual calendar or simulation
  const todayCalendarDayNumber = useMemo(() => {
    const today = new Date();
    const startDate = new Date(2026, 10, 29); // 29 Nov 2026
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    if (diffDays < 1) return 1;
    if (diffDays > TOTAL_DAYS) return TOTAL_DAYS;
    return diffDays;
  }, []);

  // Primary state
  const [activeTab, setActiveTab] = useState<'dashboard' | 'map' | 'today' | 'garden' | 'revision' | 'profile' | 'achievements'>('dashboard');
  const [hasStarted, setHasStarted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return !!parsed.hasStarted;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  });

  const [avatarStyle, setAvatarStyle] = useState<AvatarStyle>('botanist');
  const [avatarName, setAvatarName] = useState<string>('The Wandering Botanist');
  const [taskStateMap, setTaskStateMap] = useState<Record<number, { completed: boolean; completedAt?: string; notes?: string }>>({});
  const [unlockedWeeks, setUnlockedWeeks] = useState<number[]>([1]);
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);
  const [currentIslandWeek, setCurrentIslandWeek] = useState<number>(1);
  const [inspectWeek, setInspectWeek] = useState<number>(1);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [gardenFlowers, setGardenFlowers] = useState<GardenFlower[]>([]);
  const [revisionItems, setRevisionItems] = useState<RevisionProblem[]>([]);
  const [achievementsState, setAchievementsState] = useState<Record<string, { unlocked: boolean; unlockedAt?: string }>>({});

  // Daily motivation system: 110 original messages, shuffled, non-repeating cycle, persistent for that day
  const [currentMotivationIndex, setCurrentMotivationIndex] = useState<number>(0);
  const [usedMotivationIndices, setUsedMotivationIndices] = useState<number[]>([]);
  const [lastMotivationDate, setLastMotivationDate] = useState<string>('');

  // Celebrations
  const [usedCheerIndices, setUsedCheerIndices] = useState<number[]>([]);
  const [activeCheer, setActiveCheer] = useState<CheerMessage | null>(null);
  const [dailyCelebrationOpen, setDailyCelebrationOpen] = useState<boolean>(false);
  const [weeklyCelebrationOpen, setWeeklyCelebrationOpen] = useState<boolean>(false);
  const [justCompletedWeekNumber, setJustCompletedWeekNumber] = useState<number | null>(null);
  const [grandFinaleOpen, setGrandFinaleOpen] = useState<boolean>(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data: Partial<UserProgressState> = JSON.parse(raw);
        if (data.hasStarted !== undefined) setHasStarted(data.hasStarted);
        if (data.avatarStyle) setAvatarStyle(data.avatarStyle);
        if (data.avatarName) setAvatarName(data.avatarName);
        if (data.dailyTasks) setTaskStateMap(data.dailyTasks);
        if (data.unlockedWeeks) setUnlockedWeeks(data.unlockedWeeks);
        if (data.completedWeeks) setCompletedWeeks(data.completedWeeks);
        if (data.currentIslandWeek) {
          setCurrentIslandWeek(data.currentIslandWeek);
          setInspectWeek(data.currentIslandWeek);
        }
        if (data.currentStreak !== undefined) setCurrentStreak(data.currentStreak);
        if (data.longestStreak !== undefined) setLongestStreak(data.longestStreak);
        if (data.gardenFlowers) setGardenFlowers(data.gardenFlowers);
        if (data.revisionItems) setRevisionItems(data.revisionItems);
        if (data.achievements) setAchievementsState(data.achievements);
        if (data.usedMotivationIndices) setUsedMotivationIndices(data.usedMotivationIndices);
        if (data.currentMotivationIndex !== undefined) setCurrentMotivationIndex(data.currentMotivationIndex);
        if (data.dailyMotivationSeedDate) setLastMotivationDate(data.dailyMotivationSeedDate);
        if (data.usedCheerIndices) setUsedCheerIndices(data.usedCheerIndices);
      }
    } catch (err) {
      console.error('Failed to load saved progress:', err);
    }
  }, []);

  // Save to LocalStorage whenever key states change
  useEffect(() => {
    const stateToSave: UserProgressState = {
      hasStarted,
      avatarStyle,
      avatarName,
      dailyTasks: taskStateMap,
      unlockedWeeks,
      completedWeeks,
      currentIslandWeek,
      currentStreak,
      longestStreak,
      gardenFlowers,
      revisionItems,
      achievements: achievementsState,
      usedMotivationIndices,
      dailyMotivationSeedDate: lastMotivationDate,
      currentMotivationIndex,
      usedCheerIndices
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [
    hasStarted,
    avatarStyle,
    avatarName,
    taskStateMap,
    unlockedWeeks,
    completedWeeks,
    currentIslandWeek,
    currentStreak,
    longestStreak,
    gardenFlowers,
    revisionItems,
    achievementsState,
    usedMotivationIndices,
    lastMotivationDate,
    currentMotivationIndex,
    usedCheerIndices
  ]);

  // Daily motivation rotation logic
  useEffect(() => {
    const todayStr = new Date().toDateString();
    if (lastMotivationDate !== todayStr) {
      let pool = usedMotivationIndices;
      if (pool.length >= MOTIVATIONS.length) {
        pool = []; // reset cycle after all 110 used
      }
      const availableIndices = MOTIVATIONS.map((_, i) => i).filter(i => !pool.includes(i));
      const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      
      setCurrentMotivationIndex(randomIndex);
      setUsedMotivationIndices([...pool, randomIndex]);
      setLastMotivationDate(todayStr);
    }
  }, [lastMotivationDate, usedMotivationIndices]);

  const dailyMotivation = useMemo(() => {
    return MOTIVATIONS[currentMotivationIndex] || MOTIVATIONS[0];
  }, [currentMotivationIndex]);

  const cycleDailyMotivation = () => {
    const nextIdx = (currentMotivationIndex + 1) % MOTIVATIONS.length;
    setCurrentMotivationIndex(nextIdx);
  };

  // Merge generated days with state
  const allDays = useMemo(() => {
    return allGeneratedDays.map(day => ({
      ...day,
      completed: !!taskStateMap[day.dayNumber]?.completed,
      completedAt: taskStateMap[day.dayNumber]?.completedAt,
      notes: taskStateMap[day.dayNumber]?.notes
    }));
  }, [allGeneratedDays, taskStateMap]);

  // Derived statistics
  const { completedProblemsCount, completedDaysCount } = useMemo(() => {
    let pCount = 0;
    let dCount = 0;
    allDays.forEach(d => {
      if (d.completed) {
        pCount += d.problemCount;
        dCount += 1;
      }
    });
    return {
      completedProblemsCount: pCount,
      completedDaysCount: dCount
    };
  }, [allDays]);

  const remainingProblemsCount = TOTAL_PROBLEMS - completedProblemsCount;
  const completionPercentage = Math.round((completedProblemsCount / TOTAL_PROBLEMS) * 100);

  // Active current week number (based on highest unlocked or inspected)
  const currentWeekNumber = useMemo(() => {
    const maxUnlocked = Math.max(...unlockedWeeks, 1);
    return Math.min(maxUnlocked, 15);
  }, [unlockedWeeks]);

  // Helper to pick next cheer message without immediate repetition
  const getNextCheerMessage = (): CheerMessage => {
    let pool = [...usedCheerIndices];
    if (pool.length >= CHEER_MESSAGES.length) {
      pool = [];
    }
    const available = CHEER_MESSAGES.map((_, i) => i).filter(i => !pool.includes(i));
    const chosenIdx = available[Math.floor(Math.random() * available.length)];
    setUsedCheerIndices([...pool, chosenIdx]);
    return CHEER_MESSAGES[chosenIdx];
  };

  // Helper to generate a flower for the garden
  const generateFlowerForDay = (dayNum: number, streak: number, isWeekEnd: boolean): GardenFlower => {
    const flowerTypes: GardenFlower['flowerType'][] = [
      'rose', 'chamomile', 'lavender', 'peony', 'sunflower', 'tulip', 'lotus', 'wildflower'
    ];
    const flowerColors = [
      '#D98880', // rose
      '#E8A598', // soft peach
      '#C86D51', // terracotta
      '#A3B18A', // sage
      '#B89BC7', // lavender
      '#E6CFED', // light lilac
      '#F8A17E', // peach
      '#D4AF37', // golden
      '#649794'  // teal
    ];

    // Seeded coordinates across the garden meadow
    // Grid-like with organic jitter so 105 flowers distribute gracefully
    const row = Math.floor((dayNum - 1) / 7); // 0 to 14
    const col = (dayNum - 1) % 7; // 0 to 6
    
    // Spread evenly across 85% width and height with organic jitter
    const baseX = 8 + (col / 6) * 84;
    const baseY = 12 + (row / 14) * 78;
    const jitterX = ((dayNum * 17) % 7) - 3.5;
    const jitterY = ((dayNum * 29) % 7) - 3.5;
    
    const xPercent = Math.min(95, Math.max(5, baseX + jitterX));
    const yPercent = Math.min(92, Math.max(8, baseY + jitterY));

    const selectedType = isWeekEnd ? 'golden-rose' : flowerTypes[dayNum % flowerTypes.length];
    const selectedColor = isWeekEnd ? '#D4AF37' : flowerColors[(dayNum * 3) % flowerColors.length];

    let growthStage: GardenFlower['growthStage'] = 'bud';
    if (streak >= 7 || isWeekEnd) growthStage = 'bloomed-special';
    else if (streak >= 3) growthStage = 'mature';
    else if (streak >= 1) growthStage = 'blooming';

    return {
      dayNumber: dayNum,
      date: allGeneratedDays[dayNum - 1]?.date || `Day ${dayNum}`,
      flowerType: selectedType,
      color: selectedColor,
      size: isWeekEnd ? 34 : (streak >= 3 ? 28 : 22),
      xPercent,
      yPercent,
      growthStage,
      streakAtTime: streak
    };
  };

  // Recalculate and unlock achievements
  const checkAchievements = (
    newCompletedDays: number,
    newProblems: number,
    newStreak: number,
    newUnlockedWeeks: number[],
    newRevisionCount: number
  ) => {
    const updated = { ...achievementsState };
    const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const unlockIf = (id: string, condition: boolean) => {
      if (condition && !updated[id]?.unlocked) {
        updated[id] = { unlocked: true, unlockedAt: now };
      }
    };

    unlockIf('first-step', newCompletedDays >= 1);
    unlockIf('consistency-bloom', newStreak >= 3);
    unlockIf('one-week-strong', newUnlockedWeeks.includes(2) || newCompletedDays >= 7);
    unlockIf('botanical-tender', newCompletedDays >= 10);
    unlockIf('century-club', newProblems >= 100);
    unlockIf('island-explorer', newUnlockedWeeks.length >= 5);
    unlockIf('pattern-master', newProblems >= 168);
    unlockIf('halfway-hero', newProblems >= 200);
    unlockIf('revision-scholar', newRevisionCount >= 10);
    unlockIf('arboretum-queen', newProblems >= 280);
    unlockIf('ten-week-titan', newUnlockedWeeks.length >= 10);
    unlockIf('graph-voyager', newProblems >= 364);
    unlockIf('iron-habit', newStreak >= 21);
    unlockIf('memoization-empress', newProblems >= 392);
    unlockIf('grand-revisionist', !!taskStateMap[105]?.completed);
    unlockIf('the-final-bloom', newProblems >= 413);

    setAchievementsState(updated);
  };

  // Toggle Daily Task Completion Checkbox
  const toggleDailyTask = (dayNumber: number) => {
    const targetDay = allGeneratedDays.find(d => d.dayNumber === dayNumber);
    if (!targetDay) return;

    const isCurrentlyCompleted = !!taskStateMap[dayNumber]?.completed;
    const newCompleted = !isCurrentlyCompleted;

    const nowIso = new Date().toISOString();
    const updatedMap = {
      ...taskStateMap,
      [dayNumber]: {
        ...taskStateMap[dayNumber],
        completed: newCompleted,
        completedAt: newCompleted ? nowIso : undefined
      }
    };
    setTaskStateMap(updatedMap);

    if (newCompleted) {
      // 1. Calculate streak
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }

      // 2. Add flower to garden
      const isWeekEnd = targetDay.dayOfWeek === 7;
      const newFlower = generateFlowerForDay(dayNumber, newStreak, isWeekEnd);
      setGardenFlowers(prev => [...prev.filter(f => f.dayNumber !== dayNumber), newFlower]);

      // 3. Show celebration popup with confetti
      firePastelConfetti();
      const cheer = getNextCheerMessage();
      setActiveCheer(cheer);
      setDailyCelebrationOpen(true);

      // 4. Check if current week's 7 days are all completed
      const weekDays = allGeneratedDays.filter(d => d.weekNumber === targetDay.weekNumber);
      const isWeekFullyDone = weekDays.every(d => {
        if (d.dayNumber === dayNumber) return true;
        return !!updatedMap[d.dayNumber]?.completed;
      });

      let updatedUnlocked = [...unlockedWeeks];
      if (isWeekFullyDone) {
        if (!completedWeeks.includes(targetDay.weekNumber)) {
          setCompletedWeeks(prev => [...prev, targetDay.weekNumber]);
        }
        const nextWeekNum = targetDay.weekNumber + 1;
        if (nextWeekNum <= 15 && !unlockedWeeks.includes(nextWeekNum)) {
          updatedUnlocked = [...unlockedWeeks, nextWeekNum];
          setUnlockedWeeks(updatedUnlocked);
          setCurrentIslandWeek(nextWeekNum);
          setInspectWeek(nextWeekNum);
        }
        setJustCompletedWeekNumber(targetDay.weekNumber);
        setWeeklyCelebrationOpen(true);
      }

      // 5. Check if all 413 problems completed (Day 104+ completed)
      let totalProblemsNow = 0;
      let totalDaysDone = 0;
      allGeneratedDays.forEach(d => {
        const isDone = d.dayNumber === dayNumber ? true : !!updatedMap[d.dayNumber]?.completed;
        if (isDone) {
          totalProblemsNow += d.problemCount;
          totalDaysDone += 1;
        }
      });

      if (totalProblemsNow >= TOTAL_PROBLEMS) {
        fireGrandFinaleConfetti();
        setGrandFinaleOpen(true);
      }

      // 6. Check achievements
      checkAchievements(totalDaysDone, totalProblemsNow, newStreak, updatedUnlocked, revisionItems.length);
    } else {
      // Undo completion
      const newStreak = Math.max(0, currentStreak - 1);
      setCurrentStreak(newStreak);
      // Remove flower for this day
      setGardenFlowers(prev => prev.filter(f => f.dayNumber !== dayNumber));

      // Remove from completed weeks if needed
      const weekDays = allGeneratedDays.filter(d => d.weekNumber === targetDay.weekNumber);
      const stillAllDone = weekDays.every(d => {
        if (d.dayNumber === dayNumber) return false;
        return !!updatedMap[d.dayNumber]?.completed;
      });
      if (!stillAllDone) {
        setCompletedWeeks(prev => prev.filter(w => w !== targetDay.weekNumber));
      }
    }
  };

  const setDayNotes = (dayNumber: number, notes: string) => {
    setTaskStateMap(prev => ({
      ...prev,
      [dayNumber]: {
        ...prev[dayNumber],
        notes
      }
    }));
  };

  // Revision Tracker operations
  const addRevisionProblem = (item: Omit<RevisionProblem, 'id' | 'dateAdded' | 'revised'>) => {
    const newItem: RevisionProblem = {
      ...item,
      id: 'rev_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      dateAdded: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      revised: false
    };
    setRevisionItems(prev => [newItem, ...prev]);
    checkAchievements(completedDaysCount, completedProblemsCount, currentStreak, unlockedWeeks, revisionItems.length + 1);
  };

  const toggleRevisionStatus = (id: string) => {
    setRevisionItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.revised;
        return {
          ...item,
          revised: nextState,
          revisedAt: nextState ? new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : undefined
        };
      }
      return item;
    }));
  };

  const deleteRevisionItem = (id: string) => {
    setRevisionItems(prev => prev.filter(item => item.id !== id));
  };

  const updateRevisionItem = (id: string, updates: Partial<RevisionProblem>) => {
    setRevisionItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  // Export JSON backup
  const exportProgressJSON = () => {
    const stateToExport: UserProgressState = {
      hasStarted,
      avatarStyle,
      avatarName,
      dailyTasks: taskStateMap,
      unlockedWeeks,
      completedWeeks,
      currentIslandWeek,
      currentStreak,
      longestStreak,
      gardenFlowers,
      revisionItems,
      achievements: achievementsState,
      usedMotivationIndices,
      dailyMotivationSeedDate: lastMotivationDate,
      currentMotivationIndex,
      usedCheerIndices
    };
    const jsonStr = JSON.stringify(stateToExport, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `do-it-for-the-plot-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import JSON backup
  const importProgressJSON = (jsonString: string): boolean => {
    try {
      const data: UserProgressState = JSON.parse(jsonString);
      if (!data.dailyTasks) {
        throw new Error('Invalid backup file format');
      }
      setHasStarted(!!data.hasStarted);
      if (data.avatarStyle) setAvatarStyle(data.avatarStyle);
      if (data.avatarName) setAvatarName(data.avatarName);
      setTaskStateMap(data.dailyTasks || {});
      setUnlockedWeeks(data.unlockedWeeks || [1]);
      setCompletedWeeks(data.completedWeeks || []);
      setCurrentIslandWeek(data.currentIslandWeek || 1);
      setInspectWeek(data.currentIslandWeek || 1);
      setCurrentStreak(data.currentStreak || 0);
      setLongestStreak(data.longestStreak || 0);
      setGardenFlowers(data.gardenFlowers || []);
      setRevisionItems(data.revisionItems || []);
      setAchievementsState(data.achievements || {});
      return true;
    } catch (err) {
      console.error('Failed to import backup:', err);
      return false;
    }
  };

  // Reset all progress with clean defaults
  const resetAllProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHasStarted(false);
    setAvatarStyle('botanist');
    setAvatarName('The Wandering Botanist');
    setTaskStateMap({});
    setUnlockedWeeks([1]);
    setCompletedWeeks([]);
    setCurrentIslandWeek(1);
    setInspectWeek(1);
    setCurrentStreak(0);
    setLongestStreak(0);
    setGardenFlowers([]);
    setRevisionItems([]);
    setAchievementsState({});
    setActiveTab('dashboard');
  };

  // Achievements merged with progress data
  const achievements = useMemo(() => {
    return INITIAL_ACHIEVEMENTS.map(ach => {
      let curVal = 0;
      if (ach.id === 'first-step') curVal = completedDaysCount;
      else if (ach.id === 'consistency-bloom') curVal = currentStreak;
      else if (ach.id === 'one-week-strong') curVal = completedWeeks.length;
      else if (ach.id === 'botanical-tender') curVal = gardenFlowers.length;
      else if (ach.id === 'century-club') curVal = completedProblemsCount;
      else if (ach.id === 'island-explorer') curVal = unlockedWeeks.length;
      else if (ach.id === 'pattern-master') curVal = completedProblemsCount;
      else if (ach.id === 'halfway-hero') curVal = completedProblemsCount;
      else if (ach.id === 'revision-scholar') curVal = revisionItems.length;
      else if (ach.id === 'arboretum-queen') curVal = completedProblemsCount;
      else if (ach.id === 'ten-week-titan') curVal = unlockedWeeks.length;
      else if (ach.id === 'graph-voyager') curVal = completedProblemsCount;
      else if (ach.id === 'iron-habit') curVal = currentStreak;
      else if (ach.id === 'memoization-empress') curVal = completedProblemsCount;
      else if (ach.id === 'grand-revisionist') curVal = taskStateMap[105]?.completed ? 1 : 0;
      else if (ach.id === 'the-final-bloom') curVal = completedProblemsCount;

      const isUnlocked = !!achievementsState[ach.id]?.unlocked || curVal >= ach.targetValue;
      return {
        ...ach,
        currentValue: Math.min(curVal, ach.targetValue),
        unlocked: isUnlocked,
        unlockedAt: achievementsState[ach.id]?.unlockedAt
      };
    });
  }, [
    completedDaysCount,
    currentStreak,
    completedWeeks,
    gardenFlowers,
    completedProblemsCount,
    unlockedWeeks,
    revisionItems,
    taskStateMap,
    achievementsState
  ]);

  return (
    <ProgressContext.Provider
      value={{
        activeTab,
        setActiveTab,
        hasStarted,
        setHasStarted,
        allDays,
        taskStateMap,
        toggleDailyTask,
        setDayNotes,
        unlockedWeeks,
        completedWeeks,
        currentIslandWeek,
        setCurrentIslandWeek,
        inspectWeek,
        setInspectWeek,
        currentStreak,
        longestStreak,
        gardenFlowers,
        dailyMotivation,
        cycleDailyMotivation,
        activeCheer,
        dailyCelebrationOpen,
        closeDailyCelebration: () => setDailyCelebrationOpen(false),
        weeklyCelebrationOpen,
        justCompletedWeekNumber,
        closeWeeklyCelebration: () => setWeeklyCelebrationOpen(false),
        grandFinaleOpen,
        closeGrandFinale: () => setGrandFinaleOpen(false),
        completedProblemsCount,
        remainingProblemsCount,
        completedDaysCount,
        completionPercentage,
        currentDayNumber: todayCalendarDayNumber,
        currentWeekNumber,
        avatarStyle,
        setAvatarStyle,
        avatarName,
        setAvatarName,
        revisionItems,
        addRevisionProblem,
        toggleRevisionStatus,
        deleteRevisionItem,
        updateRevisionItem,
        achievements,
        exportProgressJSON,
        importProgressJSON,
        resetAllProgress
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
