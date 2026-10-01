/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CategoryType } from '../types';

interface FooterProps {
  onSelectCategory: (category: CategoryType) => void;
  onNavigate: (page: 'catalog' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onNavigate }) => {
  return (
    <footer className="border-t border-neutral-200/80 bg-neutral-100/70 text-neutral-600 transition-colors dark:border-white/[0.08] dark:bg-[#07080B] dark:text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 text-white font-display text-sm font-bold shadow-sm">
                A
              </div>
              <span className="font-display text-lg font-black text-neutral-900 dark:text-white">
                All<span className="text-cinema-gradient">Flix</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              The premier index of verified, 100% legal free movies, public domain literature, retro anime, DRM-free games, and independent audio.
            </p>
            <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400/90 font-mono">
              75+ Curated Portals · Zero Paywalls
            </p>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400/80 font-mono">
              Entertainment Hubs
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    onSelectCategory('movies');
                  }}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Free Movies Websites (38)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    onSelectCategory('anime');
                  }}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Free Anime Websites (21)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    onSelectCategory('books');
                  }}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Free Books Websites (6)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    onSelectCategory('games');
                  }}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Free Games Websites (5)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    onSelectCategory('music');
                  }}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Free Music Websites (6)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400/80 font-mono">
              Navigation
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    onSelectCategory('all');
                  }}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Full Media Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  About AllFlix Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Submit a Free Platform
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Report Broken Link
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Disclaimer */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400/80 font-mono">
              Ethics & Copyright
            </h4>
            <p className="mt-3 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              All trademarks, service marks, trade names, and logos referenced belong to their respective owners. AllFlix operates purely as an editorial curation directory.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-white/[0.08]">
          <div>
            &copy; {new Date().getFullYear()} AllFlix Entertainment Hub. Curated for the open web.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('about')} className="hover:text-amber-500">
              Terms & Curation Standards
            </button>
            <span aria-hidden="true" className="opacity-40">·</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-amber-500">
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
