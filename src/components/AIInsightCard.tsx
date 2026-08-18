import type { Insight } from '@/types';
import { TrendingUp, Eye, SlidersHorizontal } from 'lucide-react';

const typeConfig = {
  trend: { icon: TrendingUp, color: 'text-blue-400', bg: 'from-blue-500/10' },
  behavior: { icon: Eye, color: 'text-violet-400', bg: 'from-violet-500/10' },
  preference: { icon: SlidersHorizontal, color: 'text-emerald-400', bg: 'from-emerald-500/10' },
};

export function AIInsightCard({ insight }: { insight: Insight }) {
  const config = typeConfig[insight.type];
  const Icon = config.icon;

  return (
    <div className="group relative flex items-start gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
      <div className={`absolute inset-0 bg-gradient-to-r ${config.bg} to-transparent opacity-50`} />
      <div className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5`}>
        <Icon className={`h-4 w-4 ${config.color}`} />
      </div>
      <p className="relative text-sm leading-relaxed text-gray-200">{insight.text}</p>
    </div>
  );
}
