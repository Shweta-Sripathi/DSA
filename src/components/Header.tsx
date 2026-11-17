import React from 'react';
import {
  Compass,
  CalendarCheck,
  Flower2,
  BookOpen,
  User,
  Award,
  Sparkles,
  Settings,
  Flame,
  LayoutDashboard
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { JourneyAvatar } from './JourneyAvatar';

interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const {
    activeTab,
    setActiveTab,
    currentStreak,
    avatarStyle,
    avatarName,
    completedProblemsCount
  } = useProgress();

  // Current formatted date
  const todayFormatted = new Date().toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'Adventure Map', icon: Compass },
    { id: 'today', label: "Today's Tasks", icon: CalendarCheck },
    { id: 'garden', label: 'Streak Garden', icon: Flower2 },
    { id: 'revision', label: 'Revision', icon: BookOpen },
    { id: 'achievements', label: 'Badges', icon: Award },
    { id: 'profile', label: 'Analytics', icon: User },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-boho-cream-50/90 backdrop-blur-md border-b border-boho-cream-300 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="text-left group flex items-center gap-2.5"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-boho-rose-200 to-boho-peach-200 flex items-center justify-center border border-boho-rose-300 shadow-soft group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-boho-terracotta-600" />
              </div>
              <div>
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-boho-earth-900 block leading-tight">
                  DO IT FOR THE PLOT
                </span>
                <span className="text-[10px] tracking-widest uppercase text-boho-terracotta-500 font-sans font-semibold">
                  DSA Adventure Journal
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-boho-cream-200/60 p-1.5 rounded-full border border-boho-cream-300">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-boho-terracotta-600 shadow-soft font-semibold'
                      : 'text-boho-earth-800/70 hover:text-boho-earth-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-boho-terracotta-500' : 'text-boho-earth-800/60'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick status badges */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Streak Pill */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-boho-peach-100 border border-boho-peach-300 text-xs font-semibold text-boho-terracotta-600 shadow-sm"
              title={`${currentStreak} consecutive days showing up!`}
            >
              <Flame className="w-4 h-4 text-boho-terracotta-500 fill-boho-terracotta-500 animate-pulse" />
              <span>{currentStreak} Day Streak</span>
            </div>

            {/* Date Badge */}
            <div className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-boho-cream-200/70 border border-boho-cream-300 text-xs text-boho-earth-800/80 font-medium">
              <span>{todayFormatted}</span>
            </div>

            {/* Quick Avatar Profile Button */}
            <button
              onClick={() => setActiveTab('profile')}
              className="relative p-0.5 rounded-full border-2 border-boho-sage-300 hover:border-boho-terracotta-400 transition-colors shadow-soft"
              title={`View ${avatarName}'s profile (${completedProblemsCount}/413 solved)`}
            >
              <JourneyAvatar style={avatarStyle} size="sm" />
            </button>

            {/* Settings & Backup Modal Button */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-full hover:bg-boho-cream-200 text-boho-earth-800/70 hover:text-boho-earth-900 transition-colors"
              title="Settings & Data Backup"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1.5 no-scrollbar border-t border-boho-cream-200">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-boho-terracotta-500 text-white shadow-soft font-semibold'
                    : 'bg-white/80 text-boho-earth-800/70 hover:bg-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
