/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ResourceCard } from './components/ResourceCard';
import { ResourceModal } from './components/ResourceModal';
import { SavedModal } from './components/SavedModal';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileMoreSheet } from './components/MobileMoreSheet';
import { CATEGORIES, RESOURCES } from './data/resources';
import { AccessType, CategoryType, Resource, SortOption } from './types';
import { Sparkles, RefreshCw, BookmarkCheck, SearchX } from 'lucide-react';

export default function App() {
  // ==========================================
  // SECTION 1: THEME & PERSISTENCE STATE
  // ==========================================
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('allflix_theme');
      if (stored) {
        return stored === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  // Sync dark class on documentElement, body, and storage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('allflix_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('allflix_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // ==========================================
  // SECTION 2: BOOKMARK & FAVORITES STATE
  // ==========================================
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('allflix_saved_ids');
        return stored ? JSON.parse(stored) : [];
      } catch (err) {
        console.error('Failed to parse saved bookmarks', err);
        return [];
      }
    }
    return [];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('allflix_saved_ids', JSON.stringify(savedIds));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [savedIds]);

  const toggleBookmark = (id: string) => {
    setSavedIds((prev) => {
      const isAlreadySaved = prev.includes(id);
      const res = RESOURCES.find((r) => r.id === id);
      if (isAlreadySaved) {
        showToast(`Removed "${res?.name || 'Resource'}" from saved`);
        return prev.filter((item) => item !== id);
      } else {
        showToast(`Saved "${res?.name || 'Resource'}" to bookmarks`);
        return [...prev, id];
      }
    });
  };

  const removeBookmark = (id: string) => {
    setSavedIds((prev) => prev.filter((item) => item !== id));
  };

  const clearAllBookmarks = () => {
    setSavedIds([]);
    showToast('Cleared all saved bookmarks');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // ==========================================
  // SECTION 3: NAVIGATION & VIEW STATE
  // ==========================================
  const [currentPage, setCurrentPage] = useState<'catalog' | 'about' | 'contact'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccessType, setSelectedAccessType] = useState<AccessType>('All');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  // Modals and Sheet state
  const [activeModalResource, setActiveModalResource] = useState<Resource | null>(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isMoreSheetOpen, setIsMoreSheetOpen] = useState(false);

  const catalogRef = useRef<HTMLDivElement>(null);

  const handleSelectCategory = (cat: CategoryType) => {
    setSelectedCategory(cat);
    if (currentPage !== 'catalog') {
      setCurrentPage('catalog');
    }
    setIsMoreSheetOpen(false);
    // Smooth scroll to catalog section if user is scrolled past
    if (catalogRef.current && window.scrollY > 300) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedAccessType('All');
    setSortBy('popular');
  };

  const handleFocusSearch = () => {
    if (currentPage !== 'catalog') {
      setCurrentPage('catalog');
    }
    setTimeout(() => {
      const searchEl = document.getElementById('allflix-search-input');
      if (searchEl) {
        searchEl.focus();
        searchEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  // ==========================================
  // SECTION 4: SEARCH & FILTERING COMPUTATION
  // ==========================================
  const filteredResources = useMemo(() => {
    let result = [...RESOURCES];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Filter by Access Type
    if (selectedAccessType !== 'All') {
      result = result.filter((item) => item.accessType === selectedAccessType);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.shortDescription.toLowerCase().includes(q) ||
          item.fullDescription.toLowerCase().includes(q) ||
          item.provider.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q) ||
          item.features.some((f) => f.toLowerCase().includes(q)) ||
          item.recommendedFor.toLowerCase().includes(q)
      );
    }

    // Sort Results
    result.sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'alpha') {
        return a.name.localeCompare(b.name);
      }
      // 'popular'
      return b.reviewCount - a.reviewCount;
    });

    return result;
  }, [selectedCategory, selectedAccessType, searchQuery, sortBy]);

  const savedResourcesList = useMemo(() => {
    return RESOURCES.filter((res) => savedIds.includes(res.id));
  }, [savedIds]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDarkMode ? 'dark' : ''} bg-neutral-50 text-neutral-900 dark:bg-[#08090C] dark:text-neutral-100 pb-20 md:pb-0`}>
      
      {/* SECTION A: TOP APP BAR */}
      <Navbar
        currentCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedIds.length}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onFocusSearch={handleFocusSearch}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <aside
          aria-live="polite"
          className="fixed bottom-24 md:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-[#0E1017]/95 px-4 py-3 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-2 duration-150"
        >
          <BookmarkCheck className="h-4 w-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </aside>
      )}

      {/* SECTION B: MAIN VIEW CONTENT ROUTING */}
      <main className="flex-1">
        {currentPage === 'catalog' && (
          <>
            {/* Modern Hero Banner with integrated quick search and category jump */}
            <Hero
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              totalResources={RESOURCES.length}
            />

            {/* Resource Catalog Container */}
            <section ref={catalogRef} className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8">
              
              {/* Category Filter, Access Selector, and Sort Controls */}
              <div className="mb-6">
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleSelectCategory}
                  selectedAccessType={selectedAccessType}
                  onSelectAccessType={setSelectedAccessType}
                  sortBy={sortBy}
                  onSelectSort={setSortBy}
                  resultCount={filteredResources.length}
                />
              </div>

              {/* Resource Cards Grid */}
              {filteredResources.length === 0 ? (
                <div className="rounded-3xl border border-neutral-200 bg-white p-10 sm:p-14 text-center dark:border-white/[0.08] dark:bg-[#0E1017] shadow-xl">
                  <SearchX className="mx-auto h-12 w-12 text-amber-500/60 stroke-1" />
                  <h3 className="mt-4 font-display text-lg font-bold text-neutral-900 dark:text-white">
                    No resources matched your search
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                    We could not find any portals matching &ldquo;{searchQuery}&rdquo; with the selected filters.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-rose-500 transition-all active:scale-95"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredResources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      isBookmarked={savedIds.includes(resource.id)}
                      onToggleBookmark={toggleBookmark}
                      onOpenDetails={(res) => setActiveModalResource(res)}
                    />
                  ))}
                </div>
              )}

              {/* Category Deep Dives Guide (Shown on full catalog) */}
              {selectedCategory === 'all' && !searchQuery && (
                <div className="mt-14 rounded-3xl border border-neutral-200/90 bg-white p-5 sm:p-8 dark:border-white/[0.08] dark:bg-[#0E1017] shadow-xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span>AllFlix Curation Index</span>
                  </div>
                  <h2 className="mt-2 font-display text-xl font-bold text-neutral-900 dark:text-white sm:text-2xl">
                    Explore Entertainment by Medium
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                    Select any category below to filter exclusively for those portals:
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleSelectCategory(cat.id)}
                        className="group flex flex-col justify-between rounded-2xl border border-neutral-100 bg-neutral-50/80 p-4 text-left transition-all hover:border-amber-400/50 hover:bg-white hover:shadow-lg dark:border-white/[0.06] dark:bg-[#131622] dark:hover:border-amber-500/35 dark:hover:bg-[#171B2B] active:scale-98"
                      >
                        <div>
                          <h4 className="font-display text-sm font-bold text-neutral-900 group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400">
                            {cat.label}
                          </h4>
                          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                            {cat.description}
                          </p>
                        </div>
                        <div className="mt-3 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                          {cat.badge} &rarr;
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </section>
          </>
        )}

        {currentPage === 'about' && (
          <AboutPage
            onGoToCatalog={() => {
              setCurrentPage('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToContact={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* SECTION C: MODALS & BOTTOM SHEETS */}
      {/* 1. Resource Detail Modal */}
      <ResourceModal
        resource={activeModalResource}
        onClose={() => setActiveModalResource(null)}
        isBookmarked={activeModalResource ? savedIds.includes(activeModalResource.id) : false}
        onToggleBookmark={toggleBookmark}
      />

      {/* 2. Bookmarked Favorites Drawer/Modal */}
      <SavedModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedResources={savedResourcesList}
        onRemoveBookmark={removeBookmark}
        onClearAll={clearAllBookmarks}
        onOpenResource={(res) => setActiveModalResource(res)}
      />

      {/* 3. Mobile More Bottom Sheet */}
      <MobileMoreSheet
        isOpen={isMoreSheetOpen}
        onClose={() => setIsMoreSheetOpen(false)}
        onSelectCategory={handleSelectCategory}
        onNavigate={(page) => {
          setCurrentPage(page);
          setIsMoreSheetOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* SECTION D: DESKTOP FOOTER */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* SECTION E: MOBILE BOTTOM NAVIGATION BAR */}
      <MobileBottomNav
        currentPage={currentPage}
        currentCategory={selectedCategory}
        savedCount={savedIds.length}
        onNavigateHome={() => {
          setCurrentPage('catalog');
          setSelectedCategory('all');
          setIsMoreSheetOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateCategory={(category) => {
          handleSelectCategory(category);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onOpenMore={() => setIsMoreSheetOpen((prev) => !prev)}
        isMoreOpen={isMoreSheetOpen}
      />

    </div>
  );
}
