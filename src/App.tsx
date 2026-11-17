import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useProgress, ProgressProvider } from './context/ProgressContext';
import { LandingPage } from './components/LandingPage';
import { Header } from './components/Header';
import { HomeDashboard } from './components/HomeDashboard';
import { AdventureMap } from './components/AdventureMap';
import { DailyChallenge } from './components/DailyChallenge';
import { StreakGarden } from './components/StreakGarden';
import { RevisionTracker } from './components/RevisionTracker';
import { ProfilePage } from './components/ProfilePage';
import { AchievementSection } from './components/AchievementSection';
import { CelebrationPopup } from './components/CelebrationPopup';
import { WeeklyCompletionPopup } from './components/WeeklyCompletionPopup';
import { GrandFinalePopup } from './components/GrandFinalePopup';
import { SettingsModal } from './components/SettingsModal';
import { BotanicalVineBorder } from './components/BotanicalDecorations';

const MainAppContent: React.FC = () => {
  const {
    hasStarted,
    setHasStarted,
    activeTab,
    setActiveTab
  } = useProgress();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [revisionPrefill, setRevisionPrefill] = useState<{ topic: string; dayNumber: number } | null>(null);

  const handleOpenRevisionPrefill = (prefill: { topic: string; dayNumber: number }) => {
    setRevisionPrefill(prefill);
    setActiveTab('revision');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-boho-earth-800 font-sans selection:bg-boho-rose-200 selection:text-boho-earth-900">
      
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <LandingPage
            key="landing"
            onBeginJourney={() => setHasStarted(true)}
          />
        ) : (
          <motion.div
            key="dashboard-app"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            {/* Header */}
            <Header onOpenSettings={() => setSettingsOpen(true)} />

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              {activeTab === 'dashboard' && <HomeDashboard />}
              {activeTab === 'map' && <AdventureMap />}
              {activeTab === 'today' && (
                <DailyChallenge onOpenRevisionModal={handleOpenRevisionPrefill} />
              )}
              {activeTab === 'garden' && <StreakGarden />}
              {activeTab === 'revision' && (
                <RevisionTracker
                  initialPrefill={revisionPrefill}
                  onClearPrefill={() => setRevisionPrefill(null)}
                />
              )}
              {activeTab === 'achievements' && <AchievementSection />}
              {activeTab === 'profile' && <ProfilePage />}
            </main>

            {/* Footer with Boho Stationery Styling */}
            <footer className="mt-auto border-t border-boho-cream-300 bg-white/60 py-6 text-center text-xs text-boho-earth-800/60">
              <div className="max-w-7xl mx-auto px-4 space-y-2">
                <BotanicalVineBorder className="w-64 mx-auto text-boho-sage-300 opacity-60" />
                <p className="font-serif font-semibold tracking-wider text-boho-earth-900">
                  DO IT FOR THE PLOT
                </p>
                <p className="text-[11px] font-sans">
                  A personal journey of discipline, growth, ambition and self-improvement • 413 Problems • 15 Weeks
                </p>
                <div className="pt-1 flex items-center justify-center gap-3 text-[10px] text-boho-earth-800/50">
                  <button
                    onClick={() => setHasStarted(false)}
                    className="hover:text-boho-terracotta-600 underline"
                  >
                    View Opening Scene
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setSettingsOpen(true)}
                    className="hover:text-boho-terracotta-600 underline"
                  >
                    Data & Backups
                  </button>
                </div>
              </div>
            </footer>

            {/* Celebrations & Dialog Modals */}
            <CelebrationPopup />
            <WeeklyCompletionPopup />
            <GrandFinalePopup />
            <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export function App() {
  return (
    <ProgressProvider>
      <MainAppContent />
    </ProgressProvider>
  );
}

export default App;
