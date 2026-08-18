export type Category =
  | 'AI'
  | 'DSA'
  | 'Java'
  | 'HLD'
  | 'Cybersecurity'
  | 'Cloud'
  | 'Hardware'
  | 'Career'
  | 'Other';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type Confidence = 'High' | 'Medium' | 'Low';

export type Trend = 'increasing' | 'stable' | 'decreasing';

export interface Reel {
  id: string;
  title: string;
  caption: string;
  category: Category;
  thumbnail: string;
  duration: number;
  transcript?: string;
}

export interface Interaction {
  reelId: string;
  watchPercentage: number;
  liked: boolean;
  saved: boolean;
  shared: boolean;
  skipped: boolean;
  timestamp: string;
}

export interface Interest {
  name: string;
  confidence: number;
  interactionCount: number;
  trend: Trend;
  relatedTopics: string[];
}

export interface Recommendation {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  matchScore: number;
  reason: string;
  thumbnail: string;
  duration: number;
  saved?: boolean;
  rejected?: boolean;
}

export interface AIAnalysis {
  currentReel: string;
  interestDetected: string;
  why: string;
  recommendedTechReel: string;
  category: Category;
  whyRecommendation: string;
  difficulty: Difficulty;
  confidence: Confidence;
}

export interface HistoryEntry {
  id: string;
  reelTitle: string;
  detectedInterest: string;
  category: Category;
  confidence: Confidence;
  date: string;
  recommendation: string;
}

export interface Insight {
  id: string;
  text: string;
  type: 'trend' | 'behavior' | 'preference';
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export interface Settings {
  learningInterests: string[];
  preferredDifficulty: Difficulty | 'Any';
  recommendationCategories: Category[];
  aiPersonalization: boolean;
}
