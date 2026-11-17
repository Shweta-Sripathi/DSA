import { DailyTask, WeekPlan, TopicAllocation } from '../types';

export const TOPIC_COUNTS: Record<string, number> = {
  'Basics': 12,
  'Arrays': 31,
  'Time & Space Complexity': 0,
  'Strings': 14,
  'Sorting': 5,
  'Binary Search': 28,
  'Matrix': 7,
  'Linked List': 35,
  'Recursion & Backtracking': 25,
  'Stack': 22,
  'Queue': 11,
  'Sliding Window': 23,
  'Trees': 56,
  'Heaps': 25,
  'Trie': 6,
  'Greedy': 23,
  'Graphs': 25,
  'Dynamic Programming': 65,
};

export const TOTAL_PROBLEMS = 413;
export const TOTAL_WEEKS = 15;
export const TOTAL_DAYS = 105;
export const START_DATE_ISO = '2026-11-29';
export const COMPLETION_DATE_ISO = '2027-03-12';
export const FINAL_REVISION_DATE_ISO = '2027-03-13';

export const WEEKS_METADATA: WeekPlan[] = [
  {
    weekNumber: 1,
    islandName: "Whispering Woods",
    subtitle: "Foundations & The Art of Syntax",
    dateRange: "29 Nov 2026 – 05 Dec 2026",
    startDate: "2026-11-29",
    endDate: "2026-12-05",
    topics: [
      { topic: "Basics", problemCount: 12 },
      { topic: "Arrays", problemCount: 16 }
    ],
    weeklyTotal: 28,
    cumulativeTotal: 28,
    quote: "Every master of logic once sat staring at a blank terminal. Plant your roots deeply.",
    themeColor: "from-boho-sage-100 to-boho-rose-100",
    badgeTitle: "The Awakening Sprout"
  },
  {
    weekNumber: 2,
    islandName: "Rosetta Coast",
    subtitle: "Arrays Mastery & String Symphony",
    dateRange: "06 Dec 2026 – 12 Dec 2026",
    startDate: "2026-12-06",
    endDate: "2026-12-12",
    topics: [
      { topic: "Arrays", problemCount: 15 },
      { topic: "Strings", problemCount: 13 }
    ],
    weeklyTotal: 28,
    cumulativeTotal: 56,
    quote: "Strings weave into narratives; arrays hold the chapters of your resilience.",
    themeColor: "from-boho-rose-100 to-boho-peach-100",
    badgeTitle: "Symphony Weaver"
  },
  {
    weekNumber: 3,
    islandName: "Binary Bluffs",
    subtitle: "Strings, Sorting & The Divide",
    dateRange: "13 Dec 2026 – 19 Dec 2026",
    startDate: "2026-12-13",
    endDate: "2026-12-19",
    topics: [
      { topic: "Strings", problemCount: 1 },
      { topic: "Sorting", problemCount: 5 },
      { topic: "Binary Search", problemCount: 22 }
    ],
    weeklyTotal: 28,
    cumulativeTotal: 84,
    quote: "Cut the chaos in half at every step. Elegance is knowing what noise to discard.",
    themeColor: "from-boho-teal-100 to-boho-cream-200",
    badgeTitle: "Searcher of Truth"
  },
  {
    weekNumber: 4,
    islandName: "Matrix Meadow",
    subtitle: "2D Realms & The First Links",
    dateRange: "20 Dec 2026 – 26 Dec 2026",
    startDate: "2026-12-20",
    endDate: "2026-12-26",
    topics: [
      { topic: "Binary Search", problemCount: 6 },
      { topic: "Matrix", problemCount: 7 },
      { topic: "Linked List", problemCount: 15 }
    ],
    weeklyTotal: 28,
    cumulativeTotal: 112,
    quote: "Navigate the grid row by row, cell by cell. Life unfolds in dimensions you learn to master.",
    themeColor: "from-boho-sage-100 to-boho-lavender-100",
    badgeTitle: "Dimensional Cartographer"
  },
  {
    weekNumber: 5,
    islandName: "Labyrinth of Links",
    subtitle: "Pointers, Reversals & Recursion Whispers",
    dateRange: "27 Dec 2026 – 02 Jan 2027",
    startDate: "2026-12-27",
    endDate: "2027-01-02",
    topics: [
      { topic: "Linked List", problemCount: 20 },
      { topic: "Recursion & Backtracking", problemCount: 8 }
    ],
    weeklyTotal: 28,
    cumulativeTotal: 140,
    quote: "When a pointer breaks, trust your intuition to re-anchor it. New Year, unshakeable ambition.",
    themeColor: "from-boho-peach-100 to-boho-rose-200",
    badgeTitle: "Pointer Alchemist"
  },
  {
    weekNumber: 6,
    islandName: "Echoing Caverns",
    subtitle: "Deep Backtracking & The Stacks",
    dateRange: "03 Jan 2027 – 09 Jan 2027",
    startDate: "2027-01-03",
    endDate: "2027-01-09",
    topics: [
      { topic: "Recursion & Backtracking", problemCount: 17 },
      { topic: "Stack", problemCount: 11 }
    ],
    weeklyTotal: 28,
    cumulativeTotal: 168,
    quote: "Daring to step backwards is not surrender—it is the prerequisite of correct discovery.",
    themeColor: "from-boho-lavender-100 to-boho-teal-100",
    badgeTitle: "Subtree Explorer"
  },
  {
    weekNumber: 7,
    islandName: "Flowing Sanctuary",
    subtitle: "Stack Depth, Queue Flow & First Windows",
    dateRange: "10 Jan 2027 – 16 Jan 2027",
    startDate: "2027-01-10",
    endDate: "2027-01-16",
    topics: [
      { topic: "Stack", problemCount: 11 },
      { topic: "Queue", problemCount: 11 },
      { topic: "Sliding Window", problemCount: 6 }
    ],
    weeklyTotal: 28,
    cumulativeTotal: 196,
    quote: "First in, first out, or deep memory—discipline chooses the right order for every dream.",
    themeColor: "from-boho-cream-200 to-boho-sage-100",
    badgeTitle: "The Gatekeeper"
  },
  {
    weekNumber: 8,
    islandName: "Sliding Foothills",
    subtitle: "Subarrays & The Great Arboretum",
    dateRange: "17 Jan 2027 – 23 Jan 2027",
    startDate: "2027-01-17",
    endDate: "2027-01-23",
    topics: [
      { topic: "Sliding Window", problemCount: 17 },
      { topic: "Trees", problemCount: 11 }
    ],
    weeklyTotal: 28,
    cumulativeTotal: 224,
    quote: "Expand your window, contract when needed, and stand tall as the grand trees ahead.",
    themeColor: "from-boho-rose-100 to-boho-terracotta-100",
    badgeTitle: "Horizon Glider"
  },
  {
    weekNumber: 9,
    islandName: "The Canopy Realm",
    subtitle: "Binary Trees, Traversals & Ancestry",
    dateRange: "24 Jan 2027 – 30 Jan 2027",
    startDate: "2027-01-24",
    endDate: "2027-01-30",
    topics: [
      { topic: "Trees", problemCount: 28 }
    ],
    weeklyTotal: 28,
    cumulativeTotal: 252,
    quote: "A tree doesn't rush its branches; it builds strength in silence and reaches toward light.",
    themeColor: "from-boho-sage-200 to-boho-cream-100",
    badgeTitle: "Arbor Sovereign"
  },
  {
    weekNumber: 10,
    islandName: "Crown of Branches",
    subtitle: "BST Majesty & Heaps of Priority",
    dateRange: "31 Jan 2027 – 06 Feb 2027",
    startDate: "2027-01-31",
    endDate: "2027-02-06",
    topics: [
      { topic: "Trees", problemCount: 17 },
      { topic: "Heaps", problemCount: 11 }
    ],
    weeklyTotal: 28,
    cumulativeTotal: 280,
    quote: "Order your priorities like a max-heap. Put what truly matters right at the peak.",
    themeColor: "from-boho-peach-100 to-boho-lavender-100",
    badgeTitle: "Peak Ascender"
  },
  {
    weekNumber: 11,
    islandName: "The Trie Terraces",
    subtitle: "Heaps, Prefixes & Greedy Whispers",
    dateRange: "07 Feb 2027 – 13 Feb 2027",
    startDate: "2027-02-07",
    endDate: "2027-02-13",
    topics: [
      { topic: "Heaps", problemCount: 14 },
      { topic: "Trie", problemCount: 6 },
      { topic: "Greedy", problemCount: 8 }
    ],
    weeklyTotal: 28,
    cumulativeTotal: 308,
    quote: "Share prefixes, reuse your wisdom, and take the best local choice with full conviction.",
    themeColor: "from-boho-teal-100 to-boho-rose-100",
    badgeTitle: "Prefix Priestess"
  },
  {
    weekNumber: 12,
    islandName: "The Verdant Commons",
    subtitle: "Optimal Choices & Graph Networks",
    dateRange: "14 Feb 2027 – 20 Feb 2027",
    startDate: "2027-02-14",
    endDate: "2027-02-20",
    topics: [
      { topic: "Greedy", problemCount: 15 },
      { topic: "Graphs", problemCount: 13 }
    ],
    weeklyTotal: 28,
    cumulativeTotal: 336,
    quote: "Connect the vertices of ambition. No node stands isolated when purpose drives the journey.",
    themeColor: "from-boho-rose-200 to-boho-terracotta-100",
    badgeTitle: "Network Visionary"
  },
  {
    weekNumber: 13,
    islandName: "Bridge of Cycles",
    subtitle: "Shortest Paths & Dynamic Awakenings",
    dateRange: "21 Feb 2027 – 27 Feb 2027",
    startDate: "2027-02-21",
    endDate: "2027-02-27",
    topics: [
      { topic: "Graphs", problemCount: 12 },
      { topic: "Dynamic Programming", problemCount: 16 }
    ],
    weeklyTotal: 28,
    cumulativeTotal: 364,
    quote: "Do not solve the same pain twice. Remember your answers, memoize your growth.",
    themeColor: "from-boho-lavender-200 to-boho-peach-100",
    badgeTitle: "Memoization Sage"
  },
  {
    weekNumber: 14,
    islandName: "The Subproblem Valley",
    subtitle: "The Depths of Dynamic Mastery",
    dateRange: "28 Feb 2027 – 06 Mar 2027",
    startDate: "2027-02-28",
    endDate: "2027-03-06",
    topics: [
      { topic: "Dynamic Programming", problemCount: 28 }
    ],
    weeklyTotal: 28,
    cumulativeTotal: 392,
    quote: "Optimal substructure: small daily acts compound into an invincible foundation.",
    themeColor: "from-boho-sage-100 to-boho-teal-100",
    badgeTitle: "DP Empress"
  },
  {
    weekNumber: 15,
    islandName: "Summit of the Plot",
    subtitle: "The Final Breakthrough & Grand Revision",
    dateRange: "07 Mar 2027 – 13 Mar 2027",
    startDate: "2027-03-07",
    endDate: "2027-03-13",
    topics: [
      { topic: "Dynamic Programming", problemCount: 21 }
    ],
    weeklyTotal: 21,
    cumulativeTotal: 413,
    quote: "You didn't just study algorithms. You re-wrote your destiny. The plot is yours forever.",
    themeColor: "from-boho-peach-200 to-boho-rose-300",
    badgeTitle: "Master of the Plot"
  }
];

// Generate 105 daily tasks mathematically aligned with the user prompt tables
export function generateDailyTasks(): DailyTask[] {
  const days: DailyTask[] = [];
  const startDate = new Date(2026, 10, 29); // Nov 29, 2026

  const rawDailyAllocations: Array<{
    week: number;
    dayInWeek: number;
    topics: TopicAllocation[];
    problemCount: number;
    isRevision: boolean;
  }> = [
    // Week 1 (Basics 12, Arrays 16 -> 28)
    { week: 1, dayInWeek: 1, topics: [{ topic: 'Basics', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 1, dayInWeek: 2, topics: [{ topic: 'Basics', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 1, dayInWeek: 3, topics: [{ topic: 'Basics', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 1, dayInWeek: 4, topics: [{ topic: 'Arrays', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 1, dayInWeek: 5, topics: [{ topic: 'Arrays', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 1, dayInWeek: 6, topics: [{ topic: 'Arrays', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 1, dayInWeek: 7, topics: [{ topic: 'Arrays', problemCount: 4 }], problemCount: 4, isRevision: false },

    // Week 2 (Arrays 15, Strings 13 -> 28)
    { week: 2, dayInWeek: 1, topics: [{ topic: 'Arrays', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 2, dayInWeek: 2, topics: [{ topic: 'Arrays', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 2, dayInWeek: 3, topics: [{ topic: 'Arrays', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 2, dayInWeek: 4, topics: [{ topic: 'Arrays', problemCount: 3 }, { topic: 'Strings', problemCount: 1 }], problemCount: 4, isRevision: false },
    { week: 2, dayInWeek: 5, topics: [{ topic: 'Strings', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 2, dayInWeek: 6, topics: [{ topic: 'Strings', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 2, dayInWeek: 7, topics: [{ topic: 'Strings', problemCount: 4 }], problemCount: 4, isRevision: false },

    // Week 3 (Strings 1, Sorting 5, Binary Search 22 -> 28)
    { week: 3, dayInWeek: 1, topics: [{ topic: 'Strings', problemCount: 1 }, { topic: 'Sorting', problemCount: 3 }], problemCount: 4, isRevision: false },
    { week: 3, dayInWeek: 2, topics: [{ topic: 'Sorting', problemCount: 2 }, { topic: 'Binary Search', problemCount: 2 }], problemCount: 4, isRevision: false },
    { week: 3, dayInWeek: 3, topics: [{ topic: 'Binary Search', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 3, dayInWeek: 4, topics: [{ topic: 'Binary Search', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 3, dayInWeek: 5, topics: [{ topic: 'Binary Search', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 3, dayInWeek: 6, topics: [{ topic: 'Binary Search', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 3, dayInWeek: 7, topics: [{ topic: 'Binary Search', problemCount: 4 }], problemCount: 4, isRevision: false },

    // Week 4 (Binary Search 6, Matrix 7, Linked List 15 -> 28)
    { week: 4, dayInWeek: 1, topics: [{ topic: 'Binary Search', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 4, dayInWeek: 2, topics: [{ topic: 'Binary Search', problemCount: 2 }, { topic: 'Matrix', problemCount: 2 }], problemCount: 4, isRevision: false },
    { week: 4, dayInWeek: 3, topics: [{ topic: 'Matrix', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 4, dayInWeek: 4, topics: [{ topic: 'Matrix', problemCount: 1 }, { topic: 'Linked List', problemCount: 3 }], problemCount: 4, isRevision: false },
    { week: 4, dayInWeek: 5, topics: [{ topic: 'Linked List', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 4, dayInWeek: 6, topics: [{ topic: 'Linked List', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 4, dayInWeek: 7, topics: [{ topic: 'Linked List', problemCount: 4 }], problemCount: 4, isRevision: false },

    // Week 5 (Linked List 20, Recursion & Backtracking 8 -> 28)
    { week: 5, dayInWeek: 1, topics: [{ topic: 'Linked List', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 5, dayInWeek: 2, topics: [{ topic: 'Linked List', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 5, dayInWeek: 3, topics: [{ topic: 'Linked List', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 5, dayInWeek: 4, topics: [{ topic: 'Linked List', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 5, dayInWeek: 5, topics: [{ topic: 'Linked List', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 5, dayInWeek: 6, topics: [{ topic: 'Recursion & Backtracking', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 5, dayInWeek: 7, topics: [{ topic: 'Recursion & Backtracking', problemCount: 4 }], problemCount: 4, isRevision: false },

    // Week 6 (Recursion & Backtracking 17, Stack 11 -> 28)
    { week: 6, dayInWeek: 1, topics: [{ topic: 'Recursion & Backtracking', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 6, dayInWeek: 2, topics: [{ topic: 'Recursion & Backtracking', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 6, dayInWeek: 3, topics: [{ topic: 'Recursion & Backtracking', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 6, dayInWeek: 4, topics: [{ topic: 'Recursion & Backtracking', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 6, dayInWeek: 5, topics: [{ topic: 'Recursion & Backtracking', problemCount: 1 }, { topic: 'Stack', problemCount: 3 }], problemCount: 4, isRevision: false },
    { week: 6, dayInWeek: 6, topics: [{ topic: 'Stack', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 6, dayInWeek: 7, topics: [{ topic: 'Stack', problemCount: 4 }], problemCount: 4, isRevision: false },

    // Week 7 (Stack 11, Queue 11, Sliding Window 6 -> 28)
    { week: 7, dayInWeek: 1, topics: [{ topic: 'Stack', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 7, dayInWeek: 2, topics: [{ topic: 'Stack', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 7, dayInWeek: 3, topics: [{ topic: 'Stack', problemCount: 3 }, { topic: 'Queue', problemCount: 1 }], problemCount: 4, isRevision: false },
    { week: 7, dayInWeek: 4, topics: [{ topic: 'Queue', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 7, dayInWeek: 5, topics: [{ topic: 'Queue', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 7, dayInWeek: 6, topics: [{ topic: 'Queue', problemCount: 2 }, { topic: 'Sliding Window', problemCount: 2 }], problemCount: 4, isRevision: false },
    { week: 7, dayInWeek: 7, topics: [{ topic: 'Sliding Window', problemCount: 4 }], problemCount: 4, isRevision: false },

    // Week 8 (Sliding Window 17, Trees 11 -> 28)
    { week: 8, dayInWeek: 1, topics: [{ topic: 'Sliding Window', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 8, dayInWeek: 2, topics: [{ topic: 'Sliding Window', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 8, dayInWeek: 3, topics: [{ topic: 'Sliding Window', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 8, dayInWeek: 4, topics: [{ topic: 'Sliding Window', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 8, dayInWeek: 5, topics: [{ topic: 'Sliding Window', problemCount: 1 }, { topic: 'Trees', problemCount: 3 }], problemCount: 4, isRevision: false },
    { week: 8, dayInWeek: 6, topics: [{ topic: 'Trees', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 8, dayInWeek: 7, topics: [{ topic: 'Trees', problemCount: 4 }], problemCount: 4, isRevision: false },

    // Week 9 (Trees 28 -> 28)
    { week: 9, dayInWeek: 1, topics: [{ topic: 'Trees', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 9, dayInWeek: 2, topics: [{ topic: 'Trees', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 9, dayInWeek: 3, topics: [{ topic: 'Trees', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 9, dayInWeek: 4, topics: [{ topic: 'Trees', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 9, dayInWeek: 5, topics: [{ topic: 'Trees', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 9, dayInWeek: 6, topics: [{ topic: 'Trees', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 9, dayInWeek: 7, topics: [{ topic: 'Trees', problemCount: 4 }], problemCount: 4, isRevision: false },

    // Week 10 (Trees 17, Heaps 11 -> 28)
    { week: 10, dayInWeek: 1, topics: [{ topic: 'Trees', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 10, dayInWeek: 2, topics: [{ topic: 'Trees', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 10, dayInWeek: 3, topics: [{ topic: 'Trees', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 10, dayInWeek: 4, topics: [{ topic: 'Trees', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 10, dayInWeek: 5, topics: [{ topic: 'Trees', problemCount: 1 }, { topic: 'Heaps', problemCount: 3 }], problemCount: 4, isRevision: false },
    { week: 10, dayInWeek: 6, topics: [{ topic: 'Heaps', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 10, dayInWeek: 7, topics: [{ topic: 'Heaps', problemCount: 4 }], problemCount: 4, isRevision: false },

    // Week 11 (Heaps 14, Trie 6, Greedy 8 -> 28)
    { week: 11, dayInWeek: 1, topics: [{ topic: 'Heaps', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 11, dayInWeek: 2, topics: [{ topic: 'Heaps', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 11, dayInWeek: 3, topics: [{ topic: 'Heaps', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 11, dayInWeek: 4, topics: [{ topic: 'Heaps', problemCount: 2 }, { topic: 'Trie', problemCount: 2 }], problemCount: 4, isRevision: false },
    { week: 11, dayInWeek: 5, topics: [{ topic: 'Trie', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 11, dayInWeek: 6, topics: [{ topic: 'Greedy', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 11, dayInWeek: 7, topics: [{ topic: 'Greedy', problemCount: 4 }], problemCount: 4, isRevision: false },

    // Week 12 (Greedy 15, Graphs 13 -> 28)
    { week: 12, dayInWeek: 1, topics: [{ topic: 'Greedy', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 12, dayInWeek: 2, topics: [{ topic: 'Greedy', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 12, dayInWeek: 3, topics: [{ topic: 'Greedy', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 12, dayInWeek: 4, topics: [{ topic: 'Greedy', problemCount: 3 }, { topic: 'Graphs', problemCount: 1 }], problemCount: 4, isRevision: false },
    { week: 12, dayInWeek: 5, topics: [{ topic: 'Graphs', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 12, dayInWeek: 6, topics: [{ topic: 'Graphs', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 12, dayInWeek: 7, topics: [{ topic: 'Graphs', problemCount: 4 }], problemCount: 4, isRevision: false },

    // Week 13 (Graphs 12, Dynamic Programming 16 -> 28)
    { week: 13, dayInWeek: 1, topics: [{ topic: 'Graphs', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 13, dayInWeek: 2, topics: [{ topic: 'Graphs', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 13, dayInWeek: 3, topics: [{ topic: 'Graphs', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 13, dayInWeek: 4, topics: [{ topic: 'Dynamic Programming', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 13, dayInWeek: 5, topics: [{ topic: 'Dynamic Programming', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 13, dayInWeek: 6, topics: [{ topic: 'Dynamic Programming', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 13, dayInWeek: 7, topics: [{ topic: 'Dynamic Programming', problemCount: 4 }], problemCount: 4, isRevision: false },

    // Week 14 (Dynamic Programming 28 -> 28)
    { week: 14, dayInWeek: 1, topics: [{ topic: 'Dynamic Programming', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 14, dayInWeek: 2, topics: [{ topic: 'Dynamic Programming', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 14, dayInWeek: 3, topics: [{ topic: 'Dynamic Programming', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 14, dayInWeek: 4, topics: [{ topic: 'Dynamic Programming', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 14, dayInWeek: 5, topics: [{ topic: 'Dynamic Programming', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 14, dayInWeek: 6, topics: [{ topic: 'Dynamic Programming', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 14, dayInWeek: 7, topics: [{ topic: 'Dynamic Programming', problemCount: 4 }], problemCount: 4, isRevision: false },

    // Week 15 (Dynamic Programming 21 + Final Revision -> 21)
    { week: 15, dayInWeek: 1, topics: [{ topic: 'Dynamic Programming', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 15, dayInWeek: 2, topics: [{ topic: 'Dynamic Programming', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 15, dayInWeek: 3, topics: [{ topic: 'Dynamic Programming', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 15, dayInWeek: 4, topics: [{ topic: 'Dynamic Programming', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 15, dayInWeek: 5, topics: [{ topic: 'Dynamic Programming', problemCount: 4 }], problemCount: 4, isRevision: false },
    { week: 15, dayInWeek: 6, topics: [{ topic: 'Dynamic Programming', problemCount: 1 }], problemCount: 1, isRevision: false },
    { week: 15, dayInWeek: 7, topics: [{ topic: 'Final Comprehensive Revision', problemCount: 0 }], problemCount: 0, isRevision: true },
  ];

  rawDailyAllocations.forEach((item, index) => {
    const dayNumber = index + 1;
    const taskDate = new Date(startDate);
    taskDate.setDate(startDate.getDate() + index);

    const dateFormatted = taskDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const isoDate = taskDate.toISOString().split('T')[0];

    days.push({
      dayNumber,
      weekNumber: item.week,
      dayOfWeek: item.dayInWeek,
      date: dateFormatted,
      isoDate,
      isRevisionDay: item.isRevision,
      topics: item.topics,
      problemCount: item.problemCount,
      completed: false,
    });
  });

  return days;
}
