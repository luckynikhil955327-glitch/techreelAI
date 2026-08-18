import type { Difficulty, Confidence, Category } from '@/types';

const difficultyStyles: Record<Difficulty, string> = {
  Beginner: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Intermediate: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Advanced: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${difficultyStyles[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}

const confidenceStyles: Record<Confidence, string> = {
  High: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Low: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
};

export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${confidenceStyles[confidence]}`}
    >
      {confidence}
    </span>
  );
}

const categoryStyles: Record<Category, string> = {
  AI: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  DSA: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  Java: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  HLD: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  Cybersecurity: 'bg-red-500/15 text-red-400 border-red-500/30',
  Cloud: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  Hardware: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Career: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
  Other: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
};

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryStyles[category]}`}
    >
      {category}
    </span>
  );
}
