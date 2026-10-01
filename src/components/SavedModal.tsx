/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Bookmark, ExternalLink, Trash2, ArrowUpRight } from 'lucide-react';
import { Resource } from '../types';

interface SavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedResources: Resource[];
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
  onOpenResource: (resource: Resource) => void;
}

export const SavedModal: React.FC<SavedModalProps> = ({
  isOpen,
  onClose,
  savedResources,
  onRemoveBookmark,
  onClearAll,
  onOpenResource,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="saved-title"
        className="relative w-full max-w-xl rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-2xl dark:border-white/[0.1] dark:bg-[#0E1017] text-neutral-900 dark:text-neutral-100"
      >
        {/* Top edge highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 border-neutral-100 dark:border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <Bookmark className="h-5 w-5 text-amber-500 fill-current" />
            <h2 id="saved-title" className="font-display text-lg font-bold text-neutral-900 dark:text-white">
              Saved Entertainment Hubs
            </h2>
            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-400/20 dark:text-amber-300 tabular-nums">
              {savedResources.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-neutral-200 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:border-white/[0.08] dark:text-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1">
          {savedResources.length === 0 ? (
            <div className="py-12 text-center">
              <Bookmark className="mx-auto h-10 w-10 text-neutral-300 dark:text-neutral-700 stroke-1" />
              <p className="mt-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                No saved resources yet
              </p>
              <p className="mt-1 text-xs text-neutral-500 max-w-xs mx-auto">
                Tap the bookmark icon on any movie, book, anime, game, or music card to curate your personal list.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedResources.map((res) => (
                <div
                  key={res.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-100 bg-neutral-50/70 p-3.5 transition-colors hover:border-amber-400/40 dark:border-white/[0.06] dark:bg-[#131622]/90 dark:hover:border-amber-500/30"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                        {res.categoryLabel.replace(' Websites', '')}
                      </span>
                      <span aria-hidden="true" className="opacity-40">·</span>
                      <span className="text-amber-600 dark:text-amber-400 font-semibold">{res.accessType}</span>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenResource(res);
                      }}
                      className="mt-1 text-left font-display text-sm font-bold text-neutral-900 hover:text-amber-600 dark:text-white dark:hover:text-amber-400 truncate block transition-colors"
                    >
                      {res.name}
                    </button>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">{res.shortDescription}</p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={res.accessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-sm hover:from-amber-400 hover:to-rose-500"
                      title={`Visit ${res.name}`}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <button
                      onClick={() => onRemoveBookmark(res.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-transparent text-neutral-400 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:hover:border-rose-900/50 dark:hover:bg-rose-950/30 dark:hover:text-rose-400"
                      title="Remove bookmark"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {savedResources.length > 0 && (
          <div className="mt-4 flex items-center justify-between border-t pt-3.5 border-neutral-100 dark:border-white/[0.08] text-xs">
            <button
              onClick={onClearAll}
              className="text-neutral-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors font-medium"
            >
              Clear all bookmarks
            </button>
            <button
              onClick={onClose}
              className="rounded-xl bg-neutral-900 px-4 py-2 font-bold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
