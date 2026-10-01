/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, ChevronDown, ChevronUp, ArrowRight, Heart, BookOpen, Film, Gamepad2, Tv, Music } from 'lucide-react';

interface AboutPageProps {
  onGoToCatalog: () => void;
  onGoToContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onGoToCatalog, onGoToContact }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: 'Are all resources indexed on AllFlix truly free?',
      a: 'Yes, 100%. Every single website in the AllFlix directory is selected because it provides legitimate, free entertainment. Some platforms are funded via brief commercial breaks (like Tubi and Pluto TV), others are supported by public libraries and universities (like Kanopy and Hoopla), while others are public domain or open source archives (like Project Gutenberg and Standard Ebooks). None require a paid subscription.',
    },
    {
      q: 'Will I ever be asked for a credit card?',
      a: 'Never on AllFlix, and none of our recommended access links require a credit card. Platforms like Tubi, itch.io, Project Gutenberg, and RetroCrush allow you to read, stream, or play directly without even creating an account or entering payment details.',
    },
    {
      q: 'Does AllFlix host pirate or illegal content?',
      a: 'Strictly no. AllFlix operates under an editorial zero-piracy mandate. We never link to torrent scrapers, unverified stream mirrors, or copyright-infringing lockers. We exclusively index authorized studio distributors (Paramount, Fox, Sony), recognized educational non-profits, public library partners, and verified Creative Commons creators.',
    },
    {
      q: 'What is the difference between Public Domain and Ad-Supported?',
      a: 'Public Domain refers to creative works whose copyright terms have expired or were dedicated to the public (e.g., Jane Austen novels, Charlie Chaplin silent movies, Beethoven symphonies). Anyone may freely download, remix, and preserve them. Ad-Supported platforms (FAST channels like Pluto or Tubi) license modern Hollywood and television content legally, funding creators through occasional short sponsor advertisements.',
    },
    {
      q: 'How can I submit or recommend a free entertainment portal?',
      a: 'We welcome community suggestions! Head over to our Contact page and choose "Resource Suggestion" in the subject dropdown with the official website URL. Our curation team manually audits every recommendation for security, legality, and user experience before indexing.',
    },
  ];

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero Area */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>About AllFlix</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-black tracking-tight text-neutral-900 sm:text-5xl dark:text-white text-balance">
            The Free Entertainment Hub <br className="hidden sm:inline" />
            <span className="text-cinema-gradient">for the Open Web.</span>
          </h1>
          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-300 sm:text-lg text-balance leading-relaxed">
            AllFlix was founded on a simple conviction: world-class art, timeless literature, captivating cinema,
            and playful games should be freely accessible to anyone with an internet connection.
          </p>
        </div>

        {/* The Mission Statement Card */}
        <div className="mt-12 rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-10 dark:border-white/[0.08] dark:bg-[#0E1017] shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-500">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
                Our Verification & Safety Standard
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Every portal undergoes rigorous 4-step auditing</p>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">100% Legal Distribution</h4>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Every site is verified through studio licensing agreements, 501(c)(3) status, or official Creative Commons licenses.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">No Malicious Ads or Popups</h4>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  We rigorously disqualify sites with deceptive redirect ads, phishing prompts, or cryptocurrency mining scripts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Zero Hidden Charges</h4>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  No surprise trial expirations, deceptive subscriptions, or credit card capture funnels.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Device Accessibility</h4>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Optimized for modern browsers, mobile devices, tablets, e-readers, and living room streaming sticks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Entertainment Pillars */}
        <div className="mt-14">
          <h2 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">
            What We Index
          </h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            A comprehensive spectrum of free digital culture:
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 dark:border-white/[0.08] dark:bg-[#0E1017]">
              <Film className="h-5 w-5 text-amber-500" />
              <h3 className="mt-3 font-display text-base font-bold text-neutral-900 dark:text-white">Free Movies</h3>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                38 portals featuring Hollywood blockbusters, art-house cinema, and classic film noir.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 dark:border-white/[0.08] dark:bg-[#0E1017]">
              <Tv className="h-5 w-5 text-rose-500" />
              <h3 className="mt-3 font-display text-base font-bold text-neutral-900 dark:text-white">Free Anime</h3>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                21 platforms streaming subbed & dubbed simulcasts, retro animation, and OVA films.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 dark:border-white/[0.08] dark:bg-[#0E1017]">
              <BookOpen className="h-5 w-5 text-emerald-400" />
              <h3 className="mt-3 font-display text-base font-bold text-neutral-900 dark:text-white">Free Books</h3>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Over 100,000 classics in ePub, Kindle, and volunteer-read LibriVox audiobooks.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 dark:border-white/[0.08] dark:bg-[#0E1017]">
              <Gamepad2 className="h-5 w-5 text-cyan-400" />
              <h3 className="mt-3 font-display text-base font-bold text-neutral-900 dark:text-white">Free Games</h3>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Weekly AAA permanent giveaways, experimental indie creations, and browser DOSBox emulation.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 dark:border-white/[0.08] dark:bg-[#0E1017]">
              <Music className="h-5 w-5 text-violet-400" />
              <h3 className="mt-3 font-display text-base font-bold text-neutral-900 dark:text-white">Free Music</h3>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Over half a million indie tracks, lossless FLAC downloads, and royalty-free score archives.
              </p>
            </div>

            <div className="rounded-2xl border border-dashed border-amber-500/30 bg-amber-500/[0.04] p-5 flex flex-col justify-between">
              <div>
                <Heart className="h-5 w-5 text-amber-500" />
                <h3 className="mt-3 font-display text-base font-bold text-neutral-900 dark:text-white">Open to Everyone</h3>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  No subscription ever. Bookmark, share, and enjoy entertainment on your terms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="mt-14">
          <h2 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-neutral-200 bg-white dark:border-white/[0.08] dark:bg-[#0E1017] overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between p-4 text-left font-display text-sm font-semibold text-neutral-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 shrink-0 text-amber-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-neutral-400" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed border-t pt-3 border-neutral-100 dark:border-white/[0.06]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="mt-14 rounded-3xl bg-[#0E1017] border border-white/[0.1] p-8 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-violet-500/10 opacity-50" />
          <h3 className="relative font-display text-2xl font-bold">Ready to start discovering?</h3>
          <p className="relative mt-2 text-sm text-neutral-300">
            Browse our catalog or recommend a favorite legal free site to our curation team.
          </p>
          <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onGoToCatalog}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-amber-500/20 transition-all hover:from-amber-400 hover:to-rose-500 active:scale-95"
            >
              <span>Explore Resource Catalog</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={onGoToContact}
              className="rounded-xl border border-white/[0.15] bg-white/[0.05] px-4 py-2.5 text-xs font-semibold text-neutral-200 hover:bg-white/[0.1] hover:text-white transition-colors"
            >
              Contact Curators
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
