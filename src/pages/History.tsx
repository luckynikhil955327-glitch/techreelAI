import { useApp } from '@/context/AppContext';
import { CategoryBadge, ConfidenceBadge } from '@/components/Badges';
import { Trash2, History as HistoryIcon, ArrowRight } from 'lucide-react';

export function History() {
  const { history, clearHistory } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
            <HistoryIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Analysis History</h2>
            <p className="text-sm text-gray-400">Previously analyzed reels and their AI results</p>
          </div>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/5 px-3 py-2 text-sm font-medium text-rose-400 transition hover:bg-rose-500/15"
          >
            <Trash2 className="h-4 w-4" />
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <HistoryIcon className="h-8 w-8 text-gray-500" />
          </div>
          <p className="mt-4 text-gray-400">No reels analyzed yet.</p>
          <p className="mt-1 text-sm text-gray-500">Head to the Analyze Reel page to submit your first reel.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
          {/* Desktop table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-3 font-medium">Reel</th>
                  <th className="px-5 py-3 font-medium">Detected Interest</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Confidence</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-white/5 transition hover:bg-white/[0.03]"
                  >
                    <td className="max-w-[200px] px-5 py-4 text-sm text-white">{entry.reelTitle}</td>
                    <td className="px-5 py-4 text-sm text-gray-300">{entry.detectedInterest}</td>
                    <td className="px-5 py-4"><CategoryBadge category={entry.category} /></td>
                    <td className="px-5 py-4"><ConfidenceBadge confidence={entry.confidence} /></td>
                    <td className="px-5 py-4 text-sm text-gray-400">{entry.date}</td>
                    <td className="max-w-[200px] px-5 py-4 text-sm text-gray-300">{entry.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 p-4 lg:hidden">
            {history.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white">{entry.reelTitle}</p>
                <p className="mt-1 text-sm text-gray-400">{entry.detectedInterest}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <CategoryBadge category={entry.category} />
                  <ConfidenceBadge confidence={entry.confidence} />
                  <span className="text-xs text-gray-500">{entry.date}</span>
                </div>
                <div className="mt-3 flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
                  <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <p className="text-xs text-gray-300">{entry.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
