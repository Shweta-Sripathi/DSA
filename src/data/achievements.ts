import { Achievement } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Began the adventure and conquered your very first day of DSA.',
    iconName: 'Footprints',
    badgeTier: 'bronze',
    category: 'problems',
    currentValue: 0,
    targetValue: 1,
    unlocked: false
  },
  {
    id: 'consistency-bloom',
    title: 'Consistency Bloom',
    description: 'Maintained a 3-day active streak in your journey.',
    iconName: 'Sparkles',
    badgeTier: 'bronze',
    category: 'streak',
    currentValue: 0,
    targetValue: 3,
    unlocked: false
  },
  {
    id: 'one-week-strong',
    title: 'One Week Strong',
    description: 'Conquered Week 1 with all 7 days completed (28 problems).',
    iconName: 'Compass',
    badgeTier: 'silver',
    category: 'weeks',
    currentValue: 0,
    targetValue: 1,
    unlocked: false
  },
  {
    id: 'botanical-tender',
    title: 'Botanical Tender',
    description: 'Grew 10 blossoms in your Streak Garden.',
    iconName: 'Flower2',
    badgeTier: 'silver',
    category: 'streak',
    currentValue: 0,
    targetValue: 10,
    unlocked: false
  },
  {
    id: 'century-club',
    title: 'The Century Club',
    description: 'Solved 100 problems on the roadmap.',
    iconName: 'Award',
    badgeTier: 'silver',
    category: 'problems',
    currentValue: 0,
    targetValue: 100,
    unlocked: false
  },
  {
    id: 'island-explorer',
    title: 'Island Explorer',
    description: 'Unlocked 5 different weekly adventure islands.',
    iconName: 'MapPin',
    badgeTier: 'gold',
    category: 'weeks',
    currentValue: 0,
    targetValue: 5,
    unlocked: false
  },
  {
    id: 'pattern-master',
    title: 'Pattern Master',
    description: 'Conquered all Linked List and Recursion milestones (Week 5 & 6).',
    iconName: 'GitFork',
    badgeTier: 'gold',
    category: 'problems',
    currentValue: 0,
    targetValue: 168,
    unlocked: false
  },
  {
    id: 'halfway-hero',
    title: 'Halfway Hero',
    description: 'Crossed the 200 problems milestone on the roadmap.',
    iconName: 'Crown',
    badgeTier: 'gold',
    category: 'problems',
    currentValue: 0,
    targetValue: 200,
    unlocked: false
  },
  {
    id: 'revision-scholar',
    title: 'Revision Scholar',
    description: 'Logged and marked 10 problems with error notes and patterns.',
    iconName: 'BookOpen',
    badgeTier: 'silver',
    category: 'revision',
    currentValue: 0,
    targetValue: 10,
    unlocked: false
  },
  {
    id: 'arboretum-queen',
    title: 'Arboretum Queen',
    description: 'Completed the entire Tree realm (Weeks 8, 9 & 10).',
    iconName: 'Trees',
    badgeTier: 'rose-gold',
    category: 'problems',
    currentValue: 0,
    targetValue: 280,
    unlocked: false
  },
  {
    id: 'ten-week-titan',
    title: 'Ten Week Titan',
    description: 'Successfully finished 10 weeks of the adventure.',
    iconName: 'ShieldCheck',
    badgeTier: 'rose-gold',
    category: 'weeks',
    currentValue: 0,
    targetValue: 10,
    unlocked: false
  },
  {
    id: 'graph-voyager',
    title: 'Graph Voyager',
    description: 'Traversed all Graph and Greedy problems (Week 12 & 13).',
    iconName: 'Network',
    badgeTier: 'rose-gold',
    category: 'problems',
    currentValue: 0,
    targetValue: 364,
    unlocked: false
  },
  {
    id: 'iron-habit',
    title: 'Iron Habit',
    description: 'Maintained a 21-day consecutive streak of showing up.',
    iconName: 'Flame',
    badgeTier: 'rose-gold',
    category: 'streak',
    currentValue: 0,
    targetValue: 21,
    unlocked: false
  },
  {
    id: 'memoization-empress',
    title: 'Memoization Empress',
    description: 'Entered the Dynamic Programming final stretch (Week 14).',
    iconName: 'Cpu',
    badgeTier: 'diamond',
    category: 'problems',
    currentValue: 0,
    targetValue: 392,
    unlocked: false
  },
  {
    id: 'grand-revisionist',
    title: 'Grand Revisionist',
    description: 'Completed the 13 March 2027 Final Comprehensive Revision.',
    iconName: 'CheckCheck',
    badgeTier: 'diamond',
    category: 'revision',
    currentValue: 0,
    targetValue: 1,
    unlocked: false
  },
  {
    id: 'the-final-bloom',
    title: 'The Final Bloom',
    description: 'Conquered all 413 problems. The plot is yours forever!',
    iconName: 'HeartHandshake',
    badgeTier: 'diamond',
    category: 'problems',
    currentValue: 0,
    targetValue: 413,
    unlocked: false
  }
];
