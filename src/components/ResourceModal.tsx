/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X, ExternalLink, Bookmark, CheckCircle2, ShieldCheck, Star, Monitor, ThumbsUp, ArrowUpRight } from 'lucide-react';
import { Resource } from '../types';

interface ResourceModalProps {
  resource: Resource | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const ResourceModal: React.FC<ResourceModalProps> = ({
  resource,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-2xl rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-2xl transition-all sm:p-8 dark:border-white/[0.1] dark:bg-[#0E1017] text-neutral-900 dark:text-neutral-100"
      >
        {/* Subtle top edge highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-xl border border-neutral-200 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:border-white/[0.08] dark:text-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Metadata */}
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
          <span className="text-amber-600 dark:text-amber-400 font-bold">{resource.categoryLabel}</span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span>{resource.provider}</span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{resource.legalStatus}</span>
          </span>
        </div>

        {/* Title */}
        <h2 id="modal-title" className="mt-2 font-display text-2xl font-black text-neutral-900 dark:text-white sm:text-3xl">
          {resource.name}
        </h2>

        {/* Pricing & Access summary */}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-600 dark:text-neutral-300">
          <span className="font-bold text-amber-600 dark:text-amber-400">{resource.pricing}</span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span>Access Model: <strong className="font-semibold text-neutral-900 dark:text-white">{resource.accessType}</strong></span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span className="flex items-center gap-1 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="font-bold text-neutral-900 dark:text-amber-300">{resource.rating.toFixed(1)}</span>
            <span className="text-neutral-500">({resource.reviewCount} community ratings)</span>
          </span>
        </div>

        {/* Detailed Description */}
        <div className="mt-5 border-t pt-4 border-neutral-100 dark:border-white/[0.08]">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400/80 font-mono">Overview</h4>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            {resource.fullDescription}
          </p>
        </div>

        {/* Key Features */}
        <div className="mt-5">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400/80 font-mono">Key Features & Capabilities</h4>
          <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {resource.features.map((feat, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Platforms & Recommendations */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 border-t pt-4 border-neutral-100 dark:border-white/[0.08]">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              <Monitor className="h-3.5 w-3.5 text-amber-500" />
              <span>Supported Platforms</span>
            </div>
            <p className="mt-1 text-xs text-neutral-700 dark:text-neutral-300">
              {resource.supportedPlatforms.join(', ')}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              <ThumbsUp className="h-3.5 w-3.5 text-amber-500" />
              <span>Recommended For</span>
            </div>
            <p className="mt-1 text-xs text-neutral-700 dark:text-neutral-300">
              {resource.recommendedFor}
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4 border-neutral-100 dark:border-white/[0.08]">
          <button
            onClick={() => onToggleBookmark(resource.id)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all active:scale-95 ${
              isBookmarked
                ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-neutral-300'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current text-amber-500' : ''}`} />
            <span>{isBookmarked ? 'Saved to Favorites' : 'Save to Favorites'}</span>
          </button>

          <a
            href={resource.accessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-amber-500/20 transition-all hover:from-amber-400 hover:to-rose-500 active:scale-95"
          >
            <span>Visit {resource.name}</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
