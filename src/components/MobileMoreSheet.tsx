/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, BookOpen, Gamepad2, Music, Film, Tv, Info, Mail, Moon, Sun, ShieldCheck } from 'lucide-react';
import { CategoryType } from '../types';

interface MobileMoreSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: CategoryType) => void;
  onNavigate: (page: 'catalog' | 'about' | 'contact') => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const MobileMoreSheet: React.FC<MobileMoreSheetProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onNavigate,
  isDarkMode,
  onToggleTheme,
}) => {
  if (!isOpen) return null;

  const handleCategoryClick = (category: CategoryType) => {
    onSelectCategory(category);
    onClose();
  };

  const handlePageClick = (page: 'catalog' | 'about' | 'contact') => {
    onNavigate(page);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet Container */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="More navigation options"
        className="relative z-10 w-full max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-neutral-200 bg-white p-5 pb-8 shadow-2xl dark:border-white/[0.1] dark:bg-[#0E1017] animate-in slide-in-from-bottom duration-200"
      >
        {/* Grab Handle */}
        <div className="mx-auto h-1.5 w-12 rounded-full bg-neutral-300 dark:bg-neutral-700 mb-4" />

        {/* Sheet Header */}
        <div className="flex items-center justify-between border-b pb-3.5 border-neutral-100 dark:border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 text-white font-display text-xs font-black shadow-sm">
              A
            </div>
            <div>
              <span className="font-display text-base font-extrabold text-neutral-900 dark:text-white">
                All<span className="text-cinema-gradient">Flix</span> Hub
              </span>
              <span className="block text-[9px] font-semibold uppercase tracking-widest text-amber-500 font-mono">
                Curated Cinema
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:border-white/[0.1] dark:text-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
            aria-label="Close sheet"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Theme Quick Toggle in Sheet */}
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-neutral-200/80 bg-neutral-50/80 p-3.5 dark:border-white/[0.08] dark:bg-[#151824]/90">
          <div className="flex items-center gap-2.5">
            {isDarkMode ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                <Sun className="h-4 w-4" />
              </div>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
                <Moon className="h-4 w-4" />
              </div>
            )}
            <div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white">
                {isDarkMode ? 'Dark Cinema Mode' : 'Light Mode'}
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                {isDarkMode ? 'Deep obsidian theater aesthetic' : 'Bright editorial daytime view'}
              </div>
            </div>
          </div>

          <button
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm active:scale-95 transition-all"
          >
            <span>Switch to {isDarkMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>

        {/* Categories Grid */}
        <div className="mt-5">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400/80 font-mono">
            Entertainment Categories
          </h4>
          <div className="mt-2.5 grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleCategoryClick('movies')}
              className="flex items-center gap-2.5 rounded-xl border border-neutral-100 bg-neutral-50 p-3 text-left transition-colors hover:border-amber-400/40 dark:border-white/[0.08] dark:bg-[#131620] dark:hover:border-amber-500/40 active:scale-95"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-500">
                <Film className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white">Movies</div>
                <div className="text-[10px] text-neutral-500">38 portals</div>
              </div>
            </button>

            <button
              onClick={() => handleCategoryClick('anime')}
              className="flex items-center gap-2.5 rounded-xl border border-neutral-100 bg-neutral-50 p-3 text-left transition-colors hover:border-rose-400/40 dark:border-white/[0.08] dark:bg-[#131620] dark:hover:border-rose-500/40 active:scale-95"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/15 text-rose-500">
                <Tv className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white">Anime</div>
                <div className="text-[10px] text-neutral-500">21 platforms</div>
              </div>
            </button>

            <button
              onClick={() => handleCategoryClick('books')}
              className="flex items-center gap-2.5 rounded-xl border border-neutral-100 bg-neutral-50 p-3 text-left transition-colors hover:border-emerald-400/40 dark:border-white/[0.08] dark:bg-[#131620] dark:hover:border-emerald-500/40 active:scale-95"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white">Free Books</div>
                <div className="text-[10px] text-neutral-500">6 archives</div>
              </div>
            </button>

            <button
              onClick={() => handleCategoryClick('games')}
              className="flex items-center gap-2.5 rounded-xl border border-neutral-100 bg-neutral-50 p-3 text-left transition-colors hover:border-cyan-400/40 dark:border-white/[0.08] dark:bg-[#131620] dark:hover:border-cyan-500/40 active:scale-95"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400">
                <Gamepad2 className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white">Free Games</div>
                <div className="text-[10px] text-neutral-500">5 stores</div>
              </div>
            </button>

            <button
              onClick={() => handleCategoryClick('music')}
              className="flex items-center gap-2.5 rounded-xl border border-neutral-100 bg-neutral-50 p-3 text-left transition-colors hover:border-violet-400/40 dark:border-white/[0.08] dark:bg-[#131620] dark:hover:border-violet-500/40 active:scale-95 col-span-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/15 text-violet-400">
                <Music className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white">Free Music</div>
                <div className="text-[10px] text-neutral-500">6 independent repositories & downloads</div>
              </div>
            </button>
          </div>
        </div>

        {/* Pages & Community */}
        <div className="mt-5 border-t pt-4 border-neutral-100 dark:border-white/[0.08]">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400/80 font-mono">
            Information & Support
          </h4>
          <div className="mt-2 space-y-1">
            <button
              onClick={() => handlePageClick('about')}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-white/[0.05]"
            >
              <div className="flex items-center gap-2.5">
                <Info className="h-4 w-4 text-amber-500" />
                <span>About AllFlix & Verification Standard</span>
              </div>
              <span className="text-[11px] text-neutral-400">&rarr;</span>
            </button>

            <button
              onClick={() => handlePageClick('contact')}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-white/[0.05]"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-500" />
                <span>Submit a Free Site or Report Broken Link</span>
              </div>
              <span className="text-[11px] text-neutral-400">&rarr;</span>
            </button>
          </div>
        </div>

        {/* Verification Guarantee */}
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3.5 py-2.5 text-[11px] text-amber-700 dark:text-amber-300">
          <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0" />
          <span>75+ verified 100% legal free portals. Zero piracy.</span>
        </div>

      </div>
    </div>
  );
};
