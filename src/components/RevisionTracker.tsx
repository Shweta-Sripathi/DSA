import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  CheckCircle2,
  Circle,
  Search,
  Filter,
  Trash2,
  Sparkles,
  Lightbulb,
  AlertCircle,
  Code2,
  X
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { RevisionProblem } from '../types';

interface RevisionTrackerProps {
  initialPrefill?: { topic: string; dayNumber: number } | null;
  onClearPrefill?: () => void;
}

export const RevisionTracker: React.FC<RevisionTrackerProps> = ({
  initialPrefill,
  onClearPrefill
}) => {
  const {
    revisionItems,
    addRevisionProblem,
    toggleRevisionStatus,
    deleteRevisionItem
  } = useProgress();

  const [filterMode, setFilterMode] = useState<'all' | 'pending' | 'revised'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New item form state
  const [formTitle, setFormTitle] = useState('');
  const [formTopic, setFormTopic] = useState('Arrays');
  const [formDayNumber, setFormDayNumber] = useState(1);
  const [formDifficulty, setFormDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [formMistakes, setFormMistakes] = useState('');
  const [formPattern, setFormPattern] = useState('');
  const [formApproach, setFormApproach] = useState('');

  // Handle prefill if passed from DailyChallenge
  React.useEffect(() => {
    if (initialPrefill) {
      setFormTopic(initialPrefill.topic);
      setFormDayNumber(initialPrefill.dayNumber);
      setIsModalOpen(true);
      if (onClearPrefill) onClearPrefill();
    }
  }, [initialPrefill, onClearPrefill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    addRevisionProblem({
      title: formTitle.trim(),
      topic: formTopic,
      dayNumber: formDayNumber,
      difficulty: formDifficulty,
      mistakes: formMistakes.trim(),
      patternLearned: formPattern.trim(),
      correctApproach: formApproach.trim()
    });

    // Reset form
    setFormTitle('');
    setFormMistakes('');
    setFormPattern('');
    setFormApproach('');
    setIsModalOpen(false);
  };

  // Filtered items
  const filteredItems = revisionItems.filter(item => {
    if (filterMode === 'pending' && item.revised) return false;
    if (filterMode === 'revised' && !item.revised) return false;
    if (selectedTopic !== 'all' && item.topic !== selectedTopic) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchTopic = item.topic.toLowerCase().includes(q);
      const matchPattern = item.patternLearned.toLowerCase().includes(q);
      return matchTitle || matchTopic || matchPattern;
    }
    return true;
  });

  const pendingCount = revisionItems.filter(r => !r.revised).length;
  const revisedCount = revisionItems.filter(r => r.revised).length;

  const topicsList = Array.from(new Set(revisionItems.map(r => r.topic)));

  return (
    <div className="space-y-6">
      
      {/* Header & Prominent Reminder Card */}
      <div className="rounded-3xl bg-white p-5 sm:p-6 border border-boho-cream-300 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-full bg-boho-peach-100 text-boho-terracotta-500">
                <BookOpen className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-boho-terracotta-500">
                Daily Error Log & Insights
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-boho-earth-900">
              The Revision Journal
            </h2>
            <p className="text-xs sm:text-sm text-boho-earth-800/70 mt-1">
              Document your stumble-points, recognize patterns, and cement the exact intuition so you never make the same error twice.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-boho-terracotta-500 hover:bg-boho-terracotta-600 text-white font-medium text-xs shadow-soft transition-all self-start md:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Log Problem</span>
          </button>
        </div>

        {/* Required Prominent Reminder Quote */}
        <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-boho-peach-50 to-boho-rose-50 border border-boho-peach-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-boho-terracotta-500 flex-shrink-0" />
            <span className="font-serif italic text-sm text-boho-earth-900 font-semibold">
              &ldquo;Revise daily, as and when you solve.&rdquo;
            </span>
          </div>
          <span className="text-xs text-boho-earth-800/60 font-medium hidden sm:inline">
            {pendingCount} Pending • {revisedCount} Revised
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-3xl bg-white p-4 border border-boho-cream-300 shadow-soft flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-boho-earth-800/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems, patterns..."
            className="w-full pl-9 pr-3.5 py-2 rounded-2xl bg-boho-cream-100 border border-boho-cream-300 text-xs text-boho-earth-900 placeholder:text-boho-earth-800/40 focus:outline-none focus:ring-2 focus:ring-boho-terracotta-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
          {/* Status filters */}
          <div className="flex items-center gap-1 bg-boho-cream-100 p-1 rounded-2xl border border-boho-cream-200">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                filterMode === 'all'
                  ? 'bg-white text-boho-earth-900 shadow-sm font-semibold'
                  : 'text-boho-earth-800/60 hover:text-boho-earth-900'
              }`}
            >
              All ({revisionItems.length})
            </button>
            <button
              onClick={() => setFilterMode('pending')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                filterMode === 'pending'
                  ? 'bg-white text-boho-terracotta-600 shadow-sm font-semibold'
                  : 'text-boho-earth-800/60 hover:text-boho-earth-900'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setFilterMode('revised')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                filterMode === 'revised'
                  ? 'bg-white text-boho-sage-600 shadow-sm font-semibold'
                  : 'text-boho-earth-800/60 hover:text-boho-earth-900'
              }`}
            >
              Revised ({revisedCount})
            </button>
          </div>

          {/* Topic filter dropdown */}
          {topicsList.length > 0 && (
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-1.5 rounded-2xl bg-boho-cream-100 border border-boho-cream-300 text-xs font-medium text-boho-earth-900 focus:outline-none"
            >
              <option value="all">All Topics</option>
              {topicsList.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Revision Problem Cards List */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center border border-boho-cream-300 shadow-soft">
            <div className="w-12 h-12 rounded-full bg-boho-peach-100 mx-auto flex items-center justify-center mb-3">
              <BookOpen className="w-6 h-6 text-boho-terracotta-500" />
            </div>
            <h4 className="font-serif text-lg font-bold text-boho-earth-900">
              No Revision Entries Found
            </h4>
            <p className="text-xs text-boho-earth-800/60 mt-1 max-w-sm mx-auto">
              Whenever you encounter a tricky LeetCode problem, log your approach and mistake here to build your personalized exam sheet!
            </p>
          </div>
        ) : (
          filteredItems.map(item => (
            <div
              key={item.id}
              className={`rounded-3xl p-5 sm:p-6 transition-all border ${
                item.revised
                  ? 'bg-gradient-to-r from-boho-sage-50/50 to-white border-boho-sage-300 shadow-soft'
                  : 'bg-white border-boho-cream-300 shadow-soft hover:shadow-soft-lg'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* Mark as revised toggle */}
                  <button
                    onClick={() => toggleRevisionStatus(item.id)}
                    className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      item.revised
                        ? 'bg-boho-sage-500 text-white'
                        : 'border-2 border-boho-cream-300 text-transparent hover:border-boho-sage-400'
                    }`}
                    title={item.revised ? "Mark as pending revision" : "Mark as revised"}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className={`font-serif text-base sm:text-lg font-bold ${item.revised ? 'line-through text-boho-earth-800/60' : 'text-boho-earth-900'}`}>
                        {item.title}
                      </h4>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-boho-cream-200 text-boho-earth-800 font-medium">
                        {item.topic}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.difficulty === 'Easy'
                          ? 'bg-emerald-100 text-emerald-700'
                          : item.difficulty === 'Medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}>
                        {item.difficulty}
                      </span>
                      <span className="text-xs text-boho-earth-800/50">
                        Day {item.dayNumber} • Added {item.dateAdded}
                      </span>
                      {item.revised && item.revisedAt && (
                        <span className="text-xs text-boho-sage-600 font-semibold">
                          Revised on {item.revisedAt}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteRevisionItem(item.id)}
                  className="p-1.5 rounded-xl hover:bg-rose-50 text-boho-earth-800/40 hover:text-rose-600 transition-colors self-end sm:self-auto"
                  title="Delete note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Error Note & Pattern details */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-boho-cream-200 text-xs">
                {/* Mistakes made */}
                <div className="p-3 rounded-2xl bg-boho-rose-50/60 border border-boho-rose-100">
                  <div className="flex items-center gap-1.5 font-semibold text-boho-rose-600 mb-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Mistakes / Pitfall</span>
                  </div>
                  <p className="text-boho-earth-800/80 leading-relaxed font-sans">
                    {item.mistakes || 'No mistakes recorded.'}
                  </p>
                </div>

                {/* Pattern Learned */}
                <div className="p-3 rounded-2xl bg-boho-sage-50/60 border border-boho-sage-100">
                  <div className="flex items-center gap-1.5 font-semibold text-boho-sage-600 mb-1">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Pattern Learned</span>
                  </div>
                  <p className="text-boho-earth-800/80 leading-relaxed font-sans">
                    {item.patternLearned || 'No pattern noted.'}
                  </p>
                </div>

                {/* Correct Approach */}
                <div className="p-3 rounded-2xl bg-boho-peach-50/60 border border-boho-peach-100">
                  <div className="flex items-center gap-1.5 font-semibold text-boho-terracotta-600 mb-1">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Correct Approach</span>
                  </div>
                  <p className="text-boho-earth-800/80 leading-relaxed font-sans">
                    {item.correctApproach || 'No approach summary noted.'}
                  </p>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Log Problem Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-boho-earth-900/40 backdrop-blur-sm">
          <div className="relative max-w-lg w-full bg-white rounded-4xl p-6 sm:p-7 border border-boho-cream-300 shadow-soft-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-bold text-boho-earth-900">
                Log Problem to Revision
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-boho-earth-800/60 hover:text-boho-earth-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-boho-earth-800 mb-1">
                  Problem Title / LeetCode #
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. 15. 3Sum or Trapping Rain Water"
                  className="w-full p-2.5 rounded-2xl bg-boho-cream-50 border border-boho-cream-300 text-xs focus:ring-2 focus:ring-boho-terracotta-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block font-semibold text-boho-earth-800 mb-1">
                    Topic
                  </label>
                  <input
                    type="text"
                    required
                    value={formTopic}
                    onChange={(e) => setFormTopic(e.target.value)}
                    className="w-full p-2.5 rounded-2xl bg-boho-cream-50 border border-boho-cream-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-boho-earth-800 mb-1">
                    Day Number
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={105}
                    value={formDayNumber}
                    onChange={(e) => setFormDayNumber(Number(e.target.value))}
                    className="w-full p-2.5 rounded-2xl bg-boho-cream-50 border border-boho-cream-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-boho-earth-800 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(e.target.value as any)}
                    className="w-full p-2.5 rounded-2xl bg-boho-cream-50 border border-boho-cream-300 text-xs"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-boho-earth-800 mb-1">
                  Mistakes Made / Why Did It Fail?
                </label>
                <textarea
                  rows={2}
                  value={formMistakes}
                  onChange={(e) => setFormMistakes(e.target.value)}
                  placeholder="Forgot to skip duplicates when summing; got TLE by not sorting first..."
                  className="w-full p-2.5 rounded-2xl bg-boho-cream-50 border border-boho-cream-300 text-xs font-sans"
                />
              </div>

              <div>
                <label className="block font-semibold text-boho-earth-800 mb-1">
                  Core Pattern Learned
                </label>
                <textarea
                  rows={2}
                  value={formPattern}
                  onChange={(e) => setFormPattern(e.target.value)}
                  placeholder="Two Pointers with sorting; shrink left and right while avoiding identical values..."
                  className="w-full p-2.5 rounded-2xl bg-boho-cream-50 border border-boho-cream-300 text-xs font-sans"
                />
              </div>

              <div>
                <label className="block font-semibold text-boho-earth-800 mb-1">
                  Clean Approach Summary
                </label>
                <textarea
                  rows={2}
                  value={formApproach}
                  onChange={(e) => setFormApproach(e.target.value)}
                  placeholder="Sort array. For i in 0..n: if nums[i] > 0 break. Run two-pointer on remaining subarray..."
                  className="w-full p-2.5 rounded-2xl bg-boho-cream-50 border border-boho-cream-300 text-xs font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-2xl text-xs text-boho-earth-800/70 hover:text-boho-earth-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-boho-terracotta-500 hover:bg-boho-terracotta-600 text-white font-medium text-xs shadow-soft"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
