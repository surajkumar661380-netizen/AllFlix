/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Film, BookOpen, Tv, Gamepad2, Music, Sparkles, Filter, ArrowUpDown } from 'lucide-react';
import { AccessType, CategoryType, SortOption } from '../types';
import { CATEGORIES } from '../data/resources';

interface CategoryFilterProps {
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  selectedAccessType: AccessType;
  onSelectAccessType: (access: AccessType) => void;
  sortBy: SortOption;
  onSelectSort: (sort: SortOption) => void;
  resultCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedAccessType,
  onSelectAccessType,
  sortBy,
  onSelectSort,
  resultCount,
}) => {
  const getCategoryIcon = (id: CategoryType) => {
    switch (id) {
      case 'movies':
        return <Film className="h-4 w-4 shrink-0" />;
      case 'anime':
        return <Tv className="h-4 w-4 shrink-0" />;
      case 'books':
        return <BookOpen className="h-4 w-4 shrink-0" />;
      case 'games':
        return <Gamepad2 className="h-4 w-4 shrink-0" />;
      case 'music':
        return <Music className="h-4 w-4 shrink-0" />;
      default:
        return <Sparkles className="h-4 w-4 shrink-0" />;
    }
  };

  const getCategoryCountBadge = (id: CategoryType) => {
    switch (id) {
      case 'all':
        return '76';
      case 'movies':
        return '38';
      case 'anime':
        return '21';
      case 'books':
        return '6';
      case 'games':
        return '5';
      case 'music':
        return '6';
      default:
        return '';
    }
  };

  const accessOptions: AccessType[] = [
    'All',
    'No Sign-up',
    'Ad-Supported',
    'Public Domain',
    'Library Card',
    'Free Tier',
    'Free Account',
  ];

  return (
    <div className="space-y-3.5">
      {/* Horizontal Touch Rail with Premium Category Pills */}
      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        <div 
          role="tablist"
          aria-label="Filter by media category"
          className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 touch-pan-x scrollbar-none"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = getCategoryCountBadge(cat.id);
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex shrink-0 items-center gap-2 min-h-[42px] rounded-xl px-4 py-2 text-xs font-semibold transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-rose-600 text-white shadow-md shadow-amber-500/20 font-bold'
                    : 'border border-neutral-200/90 bg-white text-neutral-700 hover:border-amber-400/40 hover:bg-neutral-50 dark:border-white/[0.08] dark:bg-[#12141D] dark:text-neutral-300 dark:hover:border-amber-500/30 dark:hover:bg-[#171A26]'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-neutral-100 text-neutral-600 dark:bg-white/[0.08] dark:text-amber-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Controls Bar with Glass Treatment */}
      <div className="flex flex-col gap-3 rounded-2xl border p-3.5 sm:flex-row sm:items-center sm:justify-between border-neutral-200/80 bg-white/80 shadow-sm backdrop-blur-md dark:border-white/[0.08] dark:bg-[#10121A]/80">
        
        {/* Results Counter & Context */}
        <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
          <span className="font-bold text-neutral-900 dark:text-amber-400 tabular-nums">
            {resultCount} {resultCount === 1 ? 'Portal' : 'Portals'}
          </span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span className="truncate font-medium text-neutral-800 dark:text-neutral-200">
            {selectedCategory === 'all'
              ? 'All Hubs'
              : CATEGORIES.find((c) => c.id === selectedCategory)?.label}
          </span>
          {selectedAccessType !== 'All' && (
            <>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold truncate">
                {selectedAccessType}
              </span>
            </>
          )}
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Access Type Filter */}
          <div className="flex flex-1 sm:flex-initial items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
            <Filter className="h-3.5 w-3.5 text-amber-500/80 shrink-0" />
            <select
              value={selectedAccessType}
              onChange={(e) => onSelectAccessType(e.target.value as AccessType)}
              className="w-full sm:w-auto rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 transition-colors focus:border-amber-500 focus:outline-none dark:border-white/[0.08] dark:bg-[#151824] dark:text-neutral-200 dark:focus:border-amber-500/50"
              aria-label="Filter by access model"
            >
              {accessOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === 'All' ? 'All Access Types' : opt}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex flex-1 sm:flex-initial items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
            <ArrowUpDown className="h-3.5 w-3.5 text-amber-500/80 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => onSelectSort(e.target.value as SortOption)}
              className="w-full sm:w-auto rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 transition-colors focus:border-amber-500 focus:outline-none dark:border-white/[0.08] dark:bg-[#151824] dark:text-neutral-200 dark:focus:border-amber-500/50"
              aria-label="Sort resources"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="alpha">Alphabetical (A–Z)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
