/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExternalLink, Bookmark, Star, Film, BookOpen, Tv, Gamepad2, Music, Info, ArrowUpRight } from 'lucide-react';
import { Resource } from '../types';

interface ResourceCardProps {
  resource: Resource;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenDetails: (resource: Resource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  isBookmarked,
  onToggleBookmark,
  onOpenDetails,
}) => {
  const getCategoryIcon = (category: Resource['category']) => {
    switch (category) {
      case 'movies':
        return <Film className="h-4 w-4 text-amber-500" />;
      case 'anime':
        return <Tv className="h-4 w-4 text-rose-500" />;
      case 'books':
        return <BookOpen className="h-4 w-4 text-emerald-400" />;
      case 'games':
        return <Gamepad2 className="h-4 w-4 text-cyan-400" />;
      case 'music':
        return <Music className="h-4 w-4 text-violet-400" />;
    }
  };

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 border-neutral-200/90 bg-white hover:border-amber-400/50 hover:shadow-xl dark:border-white/[0.08] dark:bg-[#0E1017]/95 dark:hover:border-amber-500/35 dark:hover:shadow-2xl dark:hover:shadow-amber-500/[0.04]">
      
      {/* Subtle top edge specular highlight in dark mode */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/15" />

      {/* Card Header & Body */}
      <div>
        <div className="flex items-center justify-between gap-2">
          {/* Category & Provider unboxed text metadata */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            {getCategoryIcon(resource.category)}
            <span className="font-bold text-neutral-900 dark:text-neutral-100">
              {resource.categoryLabel.replace(' Websites', '')}
            </span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="truncate max-w-[130px] font-medium">{resource.provider}</span>
          </div>

          {/* Bookmark Button with Amber Glow */}
          <button
            onClick={() => onToggleBookmark(resource.id)}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all active:scale-90 ${
              isBookmarked
                ? 'border-amber-500/50 bg-amber-500/15 text-amber-500 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-400'
                : 'border-transparent text-neutral-400 hover:border-neutral-200 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:border-white/[0.1] dark:hover:bg-white/[0.06] dark:hover:text-amber-400'
            }`}
            title={isBookmarked ? 'Remove from saved' : 'Save to bookmarks'}
            aria-label={isBookmarked ? `Remove ${resource.name} from saved` : `Save ${resource.name}`}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Resource Name */}
        <h3 className="mt-3 font-display text-lg font-bold text-neutral-900 transition-colors group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400">
          {resource.name}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
          {resource.shortDescription}
        </p>

        {/* Highlights & Access Details (Unboxed typography) */}
        <div className="mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold text-amber-600 dark:text-amber-400">
            {resource.accessType}
          </span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span>{resource.pricing}</span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span className="flex items-center gap-1 text-amber-500">
            <Star className="h-3 w-3 fill-current" />
            <span className="tabular-nums font-bold text-neutral-900 dark:text-amber-300">{resource.rating.toFixed(1)}</span>
          </span>
        </div>
      </div>

      {/* Card Footer: Action Links */}
      <div className="mt-5 border-t pt-3.5 border-neutral-100 dark:border-white/[0.06]">
        <div className="flex items-center justify-between gap-2">
          {/* Quick info trigger */}
          <button
            onClick={() => onOpenDetails(resource)}
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-amber-600 dark:text-neutral-400 dark:hover:text-amber-400 transition-colors py-1 px-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.05]"
          >
            <Info className="h-3.5 w-3.5" />
            <span>Details</span>
          </button>

          {/* Premium Direct Free Access Link */}
          <a
            href={resource.accessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm shadow-amber-500/20 hover:from-amber-400 hover:to-rose-500 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <span>Access Free</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
};
