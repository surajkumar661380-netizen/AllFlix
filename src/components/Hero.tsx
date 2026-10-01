/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Film, BookOpen, Tv, Gamepad2, Music, CheckCircle2, ShieldCheck, X, Sparkles } from 'lucide-react';
import { CategoryType } from '../types';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  totalResources: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  totalResources,
}) => {
  const quickCategories: { id: CategoryType; label: string; icon: React.ReactNode }[] = [
    { id: 'movies', label: 'Movies', icon: <Film className="h-4 w-4" /> },
    { id: 'anime', label: 'Anime', icon: <Tv className="h-4 w-4" /> },
    { id: 'books', label: 'Books', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'games', label: 'Games', icon: <Gamepad2 className="h-4 w-4" /> },
    { id: 'music', label: 'Music', icon: <Music className="h-4 w-4" /> },
  ];

  return (
    <div className="relative overflow-hidden border-b border-neutral-200/80 bg-[#090A0F] text-white dark:border-white/[0.08]">
      
      {/* Volumetric Theater Ambient Lighting Effects */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% -10%, rgba(245, 158, 11, 0.35) 0%, transparent 50%),
            radial-gradient(circle at 10% 30%, rgba(225, 29, 72, 0.25) 0%, transparent 45%),
            radial-gradient(circle at 90% 40%, rgba(139, 92, 246, 0.25) 0%, transparent 45%)
          `
        }}
      />
      
      {/* Subtle Studio Geometry Scrim */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          
          {/* Editorial Cinema Trust Marker */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>The Premier Index of 100% Legal Free Entertainment</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl text-balance">
            Stream, Read & Play <br className="hidden sm:inline" />
            <span className="text-cinema-gradient drop-shadow-sm">Without a Paywall.</span>
          </h1>

          {/* Subtitle Value Proposition */}
          <p className="mt-4 text-sm sm:text-base text-neutral-300 text-balance leading-relaxed max-w-2xl mx-auto">
            Discover 75+ verified streaming platforms, public domain literature, retro anime libraries, DRM-free games, and independent audio.
          </p>

          {/* Luxury Search Bar Container */}
          <div className="mt-8">
            <div className="relative mx-auto max-w-xl group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-amber-400/80 group-focus-within:text-amber-400 transition-colors">
                <Search className="h-5 w-5" />
              </div>
              <input
                id="allflix-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search 75+ free movies, anime, books, games, or music..."
                className="w-full rounded-2xl border border-white/[0.12] bg-[#12141D]/90 py-3.5 pr-10 pl-11 text-sm text-white placeholder-neutral-400 shadow-xl backdrop-blur-md transition-all focus:border-amber-500 focus:bg-[#151824] focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400 hover:text-white"
                  title="Clear search"
                  aria-label="Clear search input"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Fast Category Jump Row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => onSelectCategory('all')}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-md shadow-amber-500/20'
                  : 'border border-white/[0.08] bg-white/[0.06] text-neutral-300 hover:bg-white/[0.12] hover:text-white'
              }`}
            >
              <span>All Catalogs</span>
              <span className="text-[11px] opacity-80 tabular-nums">({totalResources})</span>
            </button>
            {quickCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-md shadow-amber-500/20'
                    : 'border border-white/[0.08] bg-white/[0.06] text-neutral-300 hover:bg-white/[0.12] hover:text-white'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Trust markers */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
              <span>100% Free & Legal</span>
            </div>
            <span aria-hidden="true" className="hidden sm:inline opacity-40">·</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
              <span>Zero Credit Card</span>
            </div>
            <span aria-hidden="true" className="hidden sm:inline opacity-40">·</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
              <span>Direct Fast Streaming</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
