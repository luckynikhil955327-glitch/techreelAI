import type { Recommendation } from '@/types';
import { CategoryBadge, DifficultyBadge } from '@/components/Badges';
import { Thumbnail } from '@/components/Thumbnail';
import { Bookmark, ThumbsDown, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface ReelCardProps {
  recommendation: Recommendation;
  showActions?: boolean;
}

export function ReelCard({ recommendation, showActions = true }: ReelCardProps) {
  const { toggleSave, toggleReject } = useApp();
  const rec = recommendation;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
      <div className="relative">
        <Thumbnail gradient={rec.thumbnail} className="aspect-video w-full" />
        <div className="absolute right-2 top-2 rounded-lg bg-black/60 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md">
          {rec.matchScore}% match
        </div>
        {rec.saved && (
          <div className="absolute left-2 top-2 rounded-lg bg-blue-500/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md">
            Saved
          </div>
        )}
        {rec.rejected && (
          <div className="absolute left-2 top-2 rounded-lg bg-rose-500/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md">
            Hidden
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 font-semibold text-white">{rec.title}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <CategoryBadge category={rec.category} />
          <DifficultyBadge difficulty={rec.difficulty} />
          <span className="text-xs text-gray-500">{rec.duration}s</span>
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-3">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
          <p className="text-xs leading-relaxed text-gray-300">{rec.reason}</p>
        </div>

        {showActions && (
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => toggleSave(rec.id)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                rec.saved
                  ? 'border-blue-500/40 bg-blue-500/15 text-blue-400'
                  : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <Bookmark className="h-4 w-4" />
              {rec.saved ? 'Saved' : 'Save'}
            </button>
            <button
              onClick={() => toggleReject(rec.id)}
              className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                rec.rejected
                  ? 'border-rose-500/40 bg-rose-500/15 text-rose-400'
                  : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <ThumbsDown className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
