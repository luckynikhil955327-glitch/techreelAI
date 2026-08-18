import type { Interest } from '@/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const trendConfig = {
  increasing: { icon: TrendingUp, color: 'text-emerald-400', label: 'Increasing' },
  stable: { icon: Minus, color: 'text-gray-400', label: 'Stable' },
  decreasing: { icon: TrendingDown, color: 'text-rose-400', label: 'Decreasing' },
};

export function InterestCard({ interest }: { interest: Interest }) {
  const trend = trendConfig[interest.trend];
  const TrendIcon = trend.icon;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{interest.name}</h3>
        <div className={`flex items-center gap-1 text-xs font-medium ${trend.color}`}>
          <TrendIcon className="h-3.5 w-3.5" />
          {trend.label}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Confidence</span>
          <span className="font-semibold text-white">{interest.confidence}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500"
            style={{ width: `${interest.confidence}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <span>{interest.interactionCount} interactions</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {interest.relatedTopics.map((topic) => (
          <span
            key={topic}
            className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-300"
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}
