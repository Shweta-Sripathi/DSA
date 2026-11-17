export interface TopicAllocation {
  topic: string;
  problemCount: number;
}

export interface DailyTask {
  dayNumber: number; // 1 to 105
  weekNumber: number; // 1 to 15
  dayOfWeek: number; // 1 to 7
  date: string; // "29 Nov 2026"
  isoDate: string; // "2026-11-29"
  isRevisionDay: boolean; // true only for day 105
  topics: TopicAllocation[];
  problemCount: number; // 4 (Day 104 is 1, Day 105 is 0)
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

export interface WeekPlan {
  weekNumber: number;
  islandName: string;
  subtitle: string;
  dateRange: string;
  startDate: string;
  endDate: string;
  topics: TopicAllocation[];
  weeklyTotal: number;
  cumulativeTotal: number;
  quote: string;
  themeColor: string;
  badgeTitle: string;
}

export interface MotivationMessage {
  id: number;
  text: string;
  author?: string;
  tag: string;
}

export interface CheerMessage {
  id: number;
  text: string;
  subtext: string;
}

export interface RevisionProblem {
  id: string;
  title: string;
  topic: string;
  dayNumber: number;
  dateAdded: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  mistakes: string;
  patternLearned: string;
  correctApproach: string;
  revised: boolean;
  revisedAt?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badgeTier: 'bronze' | 'silver' | 'gold' | 'rose-gold' | 'diamond';
  category: 'streak' | 'problems' | 'weeks' | 'revision';
  currentValue: number;
  targetValue: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface GardenFlower {
  dayNumber: number;
  date: string;
  flowerType: 'rose' | 'chamomile' | 'lavender' | 'peony' | 'sunflower' | 'tulip' | 'lotus' | 'wildflower' | 'golden-rose';
  color: string;
  size: number;
  xPercent: number;
  yPercent: number;
  growthStage: 'bud' | 'blooming' | 'mature' | 'bloomed-special';
  streakAtTime: number;
}

export type AvatarStyle = 'botanist' | 'scholar' | 'sage' | 'coder';

export interface UserProgressState {
  hasStarted: boolean;
  avatarStyle: AvatarStyle;
  avatarName: string;
  dailyTasks: Record<number, { completed: boolean; completedAt?: string; notes?: string }>;
  unlockedWeeks: number[];
  currentIslandWeek: number;
  completedWeeks: number[];
  revisionItems: RevisionProblem[];
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate?: string;
  usedMotivationIndices: number[];
  dailyMotivationSeedDate?: string;
  currentMotivationIndex: number;
  usedCheerIndices: number[];
  gardenFlowers: GardenFlower[];
  achievements: Record<string, { unlocked: boolean; unlockedAt?: string }>;
}
