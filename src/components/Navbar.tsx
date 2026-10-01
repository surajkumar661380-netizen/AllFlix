/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Bookmark, Moon, Sun, Search, Sparkles } from 'lucide-react';
import { CategoryType } from '../types';

interface NavbarProps {
  currentCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  currentPage: 'catalog' | 'about' | 'contact';
  onNavigate: (page: 'catalog' | 'about' | 'contact') => void;
  savedCount: number;
  onOpenSavedModal: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onFocusSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCategory,
  onSelectCategory,
  currentPage,
  onNavigate,
  savedCount,
  onOpenSavedModal,
  isDarkMode,
  onToggleTheme,
  onFocusSearch,
}) => {
  const handleNavClick = (page: 'catalog' | 'about' | 'contact', category?: CategoryType) => {
    onNavigate(page);
    if (category) {
      onSelectCategory(category);
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b backdrop-blur-xl transition-colors duration-200 border-neutral-200/80 bg-white/90 dark:border-white/[0.08] dark:bg-[#08090C]/90">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-3.5 sm:px-6 lg:px-8">
        
        {/* Zone 1: Premium Wordmark with Cinema Crest */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNavClick('catalog', 'all')}
            className="group flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg active:scale-98 transition-transform"
            aria-label="AllFlix Home"
          >
            <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 text-white shadow-md shadow-amber-500/20 transition-transform duration-200 group-hover:scale-105">
              <span className="font-display text-base sm:text-lg font-black tracking-wider drop-shadow-sm">A</span>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-amber-400 to-rose-500 opacity-0 group-hover:opacity-30 blur-sm transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl font-black tracking-tight text-neutral-900 dark:text-white leading-none">
                All<span className="text-cinema-gradient">Flix</span>
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400/90 font-mono mt-0.5">
                Curated Cinema
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          <button
            onClick={() => handleNavClick('catalog', 'all')}
            className={`transition-colors hover:text-amber-600 dark:hover:text-amber-400 ${
              currentPage === 'catalog' && currentCategory === 'all'
                ? 'font-semibold text-amber-600 dark:text-amber-400 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-400 after:to-rose-500 after:rounded-full'
                : ''
            }`}
          >
            Catalog
          </button>
          <button
            onClick={() => handleNavClick('catalog', 'movies')}
            className={`transition-colors hover:text-amber-600 dark:hover:text-amber-400 ${
              currentPage === 'catalog' && currentCategory === 'movies'
                ? 'font-semibold text-amber-600 dark:text-amber-400 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-400 after:to-rose-500 after:rounded-full'
                : ''
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => handleNavClick('catalog', 'anime')}
            className={`transition-colors hover:text-amber-600 dark:hover:text-amber-400 ${
              currentPage === 'catalog' && currentCategory === 'anime'
                ? 'font-semibold text-amber-600 dark:text-amber-400 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-400 after:to-rose-500 after:rounded-full'
                : ''
            }`}
          >
            Anime
          </button>
          <button
            onClick={() => handleNavClick('catalog', 'books')}
            className={`transition-colors hover:text-amber-600 dark:hover:text-amber-400 ${
              currentPage === 'catalog' && currentCategory === 'books'
                ? 'font-semibold text-amber-600 dark:text-amber-400 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-400 after:to-rose-500 after:rounded-full'
                : ''
            }`}
          >
            Books
          </button>
          <button
            onClick={() => handleNavClick('catalog', 'games')}
            className={`transition-colors hover:text-amber-600 dark:hover:text-amber-400 ${
              currentPage === 'catalog' && currentCategory === 'games'
                ? 'font-semibold text-amber-600 dark:text-amber-400 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-400 after:to-rose-500 after:rounded-full'
                : ''
            }`}
          >
            Games
          </button>
          <button
            onClick={() => handleNavClick('catalog', 'music')}
            className={`transition-colors hover:text-amber-600 dark:hover:text-amber-400 ${
              currentPage === 'catalog' && currentCategory === 'music'
                ? 'font-semibold text-amber-600 dark:text-amber-400 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-400 after:to-rose-500 after:rounded-full'
                : ''
            }`}
          >
            Music
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors hover:text-amber-600 dark:hover:text-amber-400 ${
              currentPage === 'about'
                ? 'font-semibold text-amber-600 dark:text-amber-400 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-400 after:to-rose-500 after:rounded-full'
                : ''
            }`}
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`transition-colors hover:text-amber-600 dark:hover:text-amber-400 ${
              currentPage === 'contact'
                ? 'font-semibold text-amber-600 dark:text-amber-400 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-400 after:to-rose-500 after:rounded-full'
                : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Actions (Search, Saved, and Theme) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Quick Search Jump Trigger */}
          {onFocusSearch && (
            <button
              onClick={onFocusSearch}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200/80 bg-neutral-50/80 text-neutral-600 hover:border-amber-400/50 hover:bg-neutral-100 hover:text-neutral-900 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-neutral-300 dark:hover:border-amber-500/40 dark:hover:bg-white/[0.08] dark:hover:text-white transition-all active:scale-95"
              title="Search 75+ free entertainment portals"
              aria-label="Search resources"
            >
              <Search className="h-4 w-4" />
            </button>
          )}

          {/* Saved bookmarks trigger button with gold counter */}
          <button
            onClick={onOpenSavedModal}
            className="relative flex h-9 items-center gap-1.5 rounded-xl border border-neutral-200/80 bg-neutral-50/80 px-3 text-xs font-semibold text-neutral-800 hover:border-amber-400/50 hover:bg-neutral-100 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-neutral-200 dark:hover:border-amber-500/40 dark:hover:bg-white/[0.08] dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 active:scale-95 transition-all"
            title="Saved entertainment hubs"
            aria-label="View saved resources"
          >
            <Bookmark className="h-4 w-4 text-amber-500" />
            <span className="hidden sm:inline">Saved</span>
            <span className="ml-0.5 rounded-full bg-amber-500/15 px-1.5 py-0.2 text-[11px] font-bold text-amber-700 dark:bg-amber-400/20 dark:text-amber-300 tabular-nums">
              {savedCount}
            </span>
          </button>

          {/* Premium Theme Switcher */}
          <button
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200/80 bg-neutral-50/80 text-neutral-700 hover:border-amber-400/50 hover:bg-neutral-100 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-neutral-200 dark:hover:border-amber-500/40 dark:hover:bg-white/[0.08] dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 active:scale-95 transition-all"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-700 transition-transform duration-300 rotate-0 hover:-rotate-12" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
