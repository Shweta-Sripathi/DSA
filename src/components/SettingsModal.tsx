import React, { useState, useRef } from 'react';
import {
  Settings,
  Download,
  Upload,
  RotateCcw,
  AlertTriangle,
  X,
  Check,
  ShieldCheck
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    exportProgressJSON,
    importProgressJSON,
    resetAllProgress
  } = useProgress();

  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importProgressJSON(content);
        if (success) {
          setImportStatus('Backup restored successfully!');
          setTimeout(() => {
            setImportStatus(null);
            onClose();
          }, 1500);
        } else {
          setImportStatus('Failed to restore backup. Invalid format.');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmReset = () => {
    resetAllProgress();
    setConfirmResetOpen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-boho-earth-900/40 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-white rounded-4xl p-6 sm:p-7 border border-boho-cream-300 shadow-soft-lg">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-boho-cream-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-boho-cream-200 text-boho-earth-800">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-boho-earth-900">
                Settings & Data Backup
              </h3>
              <p className="text-xs text-boho-earth-800/60">
                Manage your personal roadmap records
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-boho-earth-800/60 hover:text-boho-earth-900 hover:bg-boho-cream-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Persistence Notice */}
        <div className="my-4 p-3.5 rounded-2xl bg-boho-sage-50 border border-boho-sage-200 flex items-start gap-2.5 text-xs text-boho-earth-800/80">
          <ShieldCheck className="w-4 h-4 text-boho-sage-600 flex-shrink-0 mt-0.5" />
          <p>
            Your progress is automatically saved to your browser&apos;s LocalStorage. To switch devices or prevent accidental browser data clearing, export a backup copy below.
          </p>
        </div>

        {/* Backup Actions */}
        <div className="space-y-3">
          
          {/* Export JSON Button */}
          <button
            onClick={exportProgressJSON}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-boho-cream-300 hover:bg-boho-peach-50/60 transition-all text-xs font-semibold text-boho-earth-900"
          >
            <div className="flex items-center gap-2.5">
              <Download className="w-4 h-4 text-boho-terracotta-500" />
              <span>Export Progress Backup (.json)</span>
            </div>
            <span className="text-[10px] text-boho-earth-800/50 uppercase">Download</span>
          </button>

          {/* Import JSON Button */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-boho-cream-300 hover:bg-boho-sage-50/60 transition-all text-xs font-semibold text-boho-earth-900"
            >
              <div className="flex items-center gap-2.5">
                <Upload className="w-4 h-4 text-boho-sage-600" />
                <span>Restore Progress from Backup</span>
              </div>
              <span className="text-[10px] text-boho-earth-800/50 uppercase">Upload</span>
            </button>
          </div>

          {importStatus && (
            <p className="text-xs font-semibold text-center text-boho-terracotta-600 mt-2">
              {importStatus}
            </p>
          )}

          {/* Reset All Progress with Confirmation Dialog */}
          <div className="pt-2">
            {!confirmResetOpen ? (
              <button
                onClick={() => setConfirmResetOpen(true)}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-rose-200 hover:bg-rose-50/60 transition-all text-xs font-semibold text-rose-700"
              >
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-rose-600" />
                  <span>Reset All Progress</span>
                </div>
                <span className="text-[10px] text-rose-500 uppercase">Caution</span>
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs">
                <div className="flex items-center gap-2 text-rose-800 font-bold mb-1">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Are you completely sure?</span>
                </div>
                <p className="text-rose-700/80 mb-3">
                  This will erase all checked tasks, streak garden flowers, error notes, and unlocked islands. This cannot be undone unless you have an exported JSON backup.
                </p>
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setConfirmResetOpen(false)}
                    className="px-3 py-1.5 rounded-xl text-boho-earth-800/70 hover:text-boho-earth-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmReset}
                    className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium shadow-sm"
                  >
                    Yes, Reset Everything
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
