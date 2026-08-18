import type {
  AIAnalysis,
  Category,
  Confidence,
  Difficulty,
  Interaction,
  Recommendation,
  Reel,
} from '@/types';
import { mockRecommendations } from '@/data/mockData';

export interface AnalyzeInput {
  reel: Pick<Reel, 'title' | 'caption' | 'category' | 'transcript'>;
  interaction: Omit<Interaction, 'reelId' | 'timestamp'>;
}

export interface DetectedInterest {
  topic: string;
  concepts: string[];
  preference: string;
}

/**
 * Analyzes reel content (title, caption, transcript) to understand the topic
 * and context — not just keywords. In production this calls an NLP/embedding API.
 */
export function analyzeContent(
  reel: AnalyzeInput['reel']
): { topic: string; concepts: string[]; preference: string } {
  const text = `${reel.title} ${reel.caption} ${reel.transcript ?? ''}`.toLowerCase();

  const conceptMap: Record<string, string[]> = {
    java: ['OOP', 'Classes', 'Encapsulation', 'Collections'],
    python: ['Automation', 'Scripting', 'Productivity'],
    dsa: ['Arrays', 'Two Pointers', 'Patterns', 'Optimization'],
    ai: ['Agents', 'LangChain', 'LLMs', 'Reasoning'],
    cloud: ['AWS', 'Deployment', 'DevOps', 'Scaling'],
    cybersecurity: ['Encryption', 'Auth', 'Security', 'OWASP'],
    hardware: ['CPU', 'RAM', 'GPU', 'Workstation'],
    career: ['Interviews', 'System Design', 'Prep', 'Behavioral'],
  };

  const detected: string[] = [];
  for (const [keyword, concepts] of Object.entries(conceptMap)) {
    if (text.includes(keyword)) {
      detected.push(...concepts);
    }
  }

  // Contextual inference: look at project-related phrases
  const isPractical = /built|build|project|real|example|practical|demo/.test(text);
  const isTheory = /explain|theory|concept|understand|how/.test(text);

  const preference = isPractical && !isTheory ? 'practical coding' : isTheory ? 'conceptual understanding' : 'mixed';

  return {
    topic: reel.title,
    concepts: detected.length > 0 ? detected : ['General Programming'],
    preference,
  };
}

/**
 * Combines content analysis with user interaction signals to infer
 * the underlying interest — not just surface keywords.
 */
export function detectInterest(input: AnalyzeInput): DetectedInterest {
  const content = analyzeContent(input.reel);
  const { watchPercentage, liked, saved, shared, skipped } = input.interaction;

  // Interaction signal weighting
  let engagementScore = 0;
  if (!skipped) {
    engagementScore += watchPercentage * 0.4;
    if (liked) engagementScore += 20;
    if (saved) engagementScore += 25;
    if (shared) engagementScore += 15;
  } else {
    engagementScore = 5; // skipped = low engagement
  }

  // Infer preference from interaction behavior
  let preference = content.preference;
  if (saved && watchPercentage > 80) {
    preference = 'practical coding';
  } else if (skipped || watchPercentage < 30) {
    preference = 'low engagement';
  }

  return {
    topic: content.topic,
    concepts: content.concepts,
    preference,
  };
}

/**
 * Generates a recommendation based on the detected underlying interest,
 * related technology concepts, and difficulty — not keyword matching.
 */
export function generateRecommendation(
  interest: DetectedInterest
): { recommendation: Recommendation; category: Category; whyRecommendation: string; difficulty: Difficulty } {
  // Match interest concepts to recommendation pool
  const pool = mockRecommendations.filter((r) => !r.rejected && !r.saved);

  // Semantic matching: find recommendations whose category aligns with detected concepts
  const conceptCategories: Record<string, Category> = {
    OOP: 'Java',
    Classes: 'Java',
    Encapsulation: 'Java',
    Collections: 'Java',
    Arrays: 'DSA',
    'Two Pointers': 'DSA',
    Patterns: 'DSA',
    Agents: 'AI',
    LangChain: 'AI',
    LLMs: 'AI',
    Reasoning: 'AI',
    Automation: 'AI',
    Encryption: 'Cybersecurity',
    Auth: 'Cybersecurity',
    Security: 'Cybersecurity',
    Interviews: 'Career',
    'System Design': 'Career',
    Prep: 'Career',
    AWS: 'Cloud',
    Deployment: 'Cloud',
    DevOps: 'Cloud',
    CPU: 'Hardware',
    RAM: 'Hardware',
    GPU: 'Hardware',
  };

  const targetCategories = new Set<Category>();
  for (const concept of interest.concepts) {
    const cat = conceptCategories[concept];
    if (cat) targetCategories.add(cat);
  }

  // Find best match from the pool
  let best = pool[0];
  let bestScore = -1;
  for (const rec of pool) {
    let score = rec.matchScore;
    if (targetCategories.has(rec.category)) score += 15;
    // Prefer practical content if user prefers practical
    if (interest.preference === 'practical coding' && /build|project|example|practical/i.test(rec.reason)) {
      score += 10;
    }
    if (score > bestScore) {
      bestScore = score;
      best = rec;
    }
  }

  const category = best.category;
  const difficulty = best.difficulty;
  const whyRecommendation = best.reason;

  return { recommendation: best, category, whyRecommendation, difficulty };
}

function confidenceFromScore(score: number): Confidence {
  if (score >= 80) return 'High';
  if (score >= 50) return 'Medium';
  return 'Low';
}

/**
 * Full pipeline: content + context + interaction + previous interests
 * → underlying interest → recommended reel.
 * Returns the structured AIAnalysis for display.
 */
export function analyzeReel(input: AnalyzeInput): AIAnalysis {
  const interest = detectInterest(input);
  const { recommendation, category, whyRecommendation, difficulty } = generateRecommendation(interest);

  const engagementScore =
    input.interaction.watchPercentage * 0.4 +
    (input.interaction.liked ? 20 : 0) +
    (input.interaction.saved ? 25 : 0) +
    (input.interaction.shared ? 15 : 0);

  const confidence = confidenceFromScore(engagementScore);

  const whyParts: string[] = [];
  whyParts.push(`Content analysis detected concepts: ${interest.concepts.join(', ')}.`);
  if (input.interaction.saved) whyParts.push('User saved this reel, indicating strong interest.');
  if (input.interaction.liked) whyParts.push('User liked the content.');
  if (input.interaction.watchPercentage > 80) whyParts.push(`High watch rate (${input.interaction.watchPercentage}%).`);
  if (input.interaction.skipped) whyParts.push('User skipped quickly — low engagement signal.');
  whyParts.push(`Inferred preference: ${interest.preference}.`);

  return {
    currentReel: input.reel.title,
    interestDetected: `${interest.concepts.slice(0, 3).join(' + ')} + ${interest.preference}`,
    why: whyParts.join(' '),
    recommendedTechReel: recommendation.title,
    category,
    whyRecommendation,
    difficulty,
    confidence,
  };
}

/** Simulated async wrapper for the loading state demo */
export function analyzeReelAsync(input: AnalyzeInput): Promise<AIAnalysis> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(analyzeReel(input)), 2200);
  });
}
