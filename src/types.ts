/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CategoryType = 'all' | 'movies' | 'books' | 'anime' | 'games' | 'music';

export type AccessType = 'All' | 'No Sign-up' | 'Ad-Supported' | 'Public Domain' | 'Library Card' | 'Free Tier' | 'Free Account';

export type SortOption = 'popular' | 'alpha' | 'rating';

export interface Resource {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: 'movies' | 'books' | 'anime' | 'games' | 'music';
  categoryLabel: string;
  accessUrl: string;
  accessType: 'No Sign-up' | 'Ad-Supported' | 'Public Domain' | 'Library Card' | 'Free Tier' | 'Free Account';
  pricing: string;
  provider: string;
  features: string[];
  highlight: string;
  rating: number;
  reviewCount: number;
  legalStatus: string;
  supportedPlatforms: string[];
  recommendedFor: string;
  themeAccent: string;
}

export interface CategoryMeta {
  id: CategoryType;
  label: string;
  iconName: string;
  description: string;
  badge: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  resourceSuggestionUrl?: string;
  message: string;
  timestamp: string;
}
