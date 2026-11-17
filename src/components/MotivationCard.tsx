import React, { useState } from 'react';
import { Quote, Sparkles, RefreshCw, Check, Copy } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { BotanicalFlower } from './BotanicalDecorations';

export const MotivationCard: React.FC = () => {
  const { dailyMotivation, cycleDailyMotivation } = useProgress();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${dailyMotivation.text}" — ${dailyMotivation.author || 'Do It for the Plot'}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-boho-cream-50 to-boho-rose-50/60 p-6 sm:p-7 border border-boho-rose-200/80 shadow-soft">
      {/* Decorative floral corner */}
      <div className="absolute top-2 right-2 pointer-events-none opacity-40">
        <BotanicalFlower className="w-16 h-16" color="#D98880" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div className="flex-1">
          {/* Tag & Icon */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="p-1.5 rounded-full bg-boho-peach-100 text-boho-terracotta-500">
              <Quote className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-boho-terracotta-500 font-sans">
              Daily Mantra • {dailyMotivation.tag}
            </span>
          </div>

          {/* Quote text */}
          <blockquote className="font-serif italic text-lg sm:text-xl text-boho-earth-900 leading-snug font-medium pr-6">
            &ldquo;{dailyMotivation.text}&rdquo;
          </blockquote>

          {/* Author/source */}
          {dailyMotivation.author && (
            <p className="mt-2 text-xs font-serif text-boho-earth-800/60 tracking-wide">
              — {dailyMotivation.author}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0 pt-2 md:pt-0">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-boho-cream-300 text-xs font-medium text-boho-earth-800/80 hover:text-boho-earth-900 shadow-sm transition-all"
            title="Copy quote"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-boho-sage-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>

          <button
            onClick={cycleDailyMotivation}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-boho-rose-100/70 hover:bg-boho-rose-200/80 border border-boho-rose-200 text-xs font-medium text-boho-rose-600 transition-all shadow-sm"
            title="Next inspirational note"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Cycle</span>
          </button>
        </div>

      </div>
    </div>
  );
};
