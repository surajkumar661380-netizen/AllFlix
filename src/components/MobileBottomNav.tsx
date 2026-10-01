/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Film, Tv, Bookmark, LayoutGrid } from 'lucide-react';
import { CategoryType } from '../types';

interface MobileBottomNavProps {
  currentPage: 'catalog' | 'about' | 'contact';
  currentCategory: CategoryType;
  savedCount: number;
  onNavigateHome: () => void;
  onNavigateCategory: (category: CategoryType) => void;
  onOpenSaved: () => void;
  onOpenMore: () => void;
  isMoreOpen: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  currentCategory,
  savedCount,
  onNavigateHome,
  onNavigateCategory,
  onOpenSaved,
  onOpenMore,
  isMoreOpen,
}) => {
  const isHomeActive = currentPage === 'catalog' && currentCategory === 'all' && !isMoreOpen;
  const isMoviesActive = currentPage === 'catalog' && currentCategory === 'movies' && !isMoreOpen;
  const isAnimeActive = currentPage === 'catalog' && currentCategory === 'anime' && !isMoreOpen;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-neutral-200/80 bg-white/95 backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[#08090C]/95 transition-colors duration-200 shadow-2xl">
      <nav 
        aria-label="Mobile Bottom Navigation"
        className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto px-2"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        
        {/* Tab 1: Home / Catalog */}
        <button
          onClick={onNavigateHome}
          className={`group flex flex-col items-center justify-center min-h-[48px] py-1 transition-all active:scale-95 ${
            isHomeActive
              ? 'text-amber-500 font-bold'
              : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
          }`}
          aria-label="Home catalog"
        >
          <div className="relative">
            <Home className={`h-5 w-5 transition-transform duration-150 ${isHomeActive ? 'scale-110 drop-shadow-sm' : ''}`} />
            {isHomeActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Catalog</span>
        </button>

        {/* Tab 2: Movies */}
        <button
          onClick={() => onNavigateCategory('movies')}
          className={`group flex flex-col items-center justify-center min-h-[48px] py-1 transition-all active:scale-95 ${
            isMoviesActive
              ? 'text-amber-500 font-bold'
              : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
          }`}
          aria-label="Free Movies"
        >
          <div className="relative">
            <Film className={`h-5 w-5 transition-transform duration-150 ${isMoviesActive ? 'scale-110 drop-shadow-sm' : ''}`} />
            {isMoviesActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Movies</span>
        </button>

        {/* Tab 3: Anime */}
        <button
          onClick={() => onNavigateCategory('anime')}
          className={`group flex flex-col items-center justify-center min-h-[48px] py-1 transition-all active:scale-95 ${
            isAnimeActive
              ? 'text-rose-500 font-bold'
              : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
          }`}
          aria-label="Free Anime"
        >
          <div className="relative">
            <Tv className={`h-5 w-5 transition-transform duration-150 ${isAnimeActive ? 'scale-110 drop-shadow-sm' : ''}`} />
            {isAnimeActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Anime</span>
        </button>

        {/* Tab 4: Saved */}
        <button
          onClick={onOpenSaved}
          className="group flex flex-col items-center justify-center min-h-[48px] py-1 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-all active:scale-95"
          aria-label="Saved Bookmarks"
        >
          <div className="relative">
            <Bookmark className="h-5 w-5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-rose-600 px-1 text-[9px] font-bold text-white tabular-nums shadow-sm">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Saved</span>
        </button>

        {/* Tab 5: More Menu */}
        <button
          onClick={onOpenMore}
          className={`group flex flex-col items-center justify-center min-h-[48px] py-1 transition-all active:scale-95 ${
            isMoreOpen || currentPage !== 'catalog' || ['books', 'games', 'music'].includes(currentCategory)
              ? 'text-amber-500 font-bold'
              : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
          }`}
          aria-label="More categories and menu"
        >
          <div className="relative">
            <LayoutGrid className="h-5 w-5" />
            {(isMoreOpen || currentPage !== 'catalog') && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">More</span>
        </button>

      </nav>
    </div>
  );
};
