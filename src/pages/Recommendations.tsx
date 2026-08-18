import { useState, useMemo } from 'react';
import { ReelCard } from '@/components/ReelCard';
import { useApp } from '@/context/AppContext';
import type { Category } from '@/types';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

const categories: (Category | 'All')[] = ['All', 'AI', 'DSA', 'Java', 'HLD', 'Cybersecurity', 'Cloud', 'Hardware', 'Career'];

type SortOption = 'Best Match' | 'Newest' | 'Beginner Friendly' | 'Most Relevant';

const sortOptions: SortOption[] = ['Best Match', 'Newest', 'Beginner Friendly', 'Most Relevant'];

export function Recommendations() {
  const { recommendations } = useApp();
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [sort, setSort] = useState<SortOption>('Best Match');

  const filtered = useMemo(() => {
    let list = recommendations.filter((r) => !r.rejected);

    if (filter !== 'All') {
      list = list.filter((r) => r.category === filter);
    }

    switch (sort) {
      case 'Best Match':
        list = [...list].sort((a, b) => b.matchScore - a.matchScore);
        break;
      case 'Newest':
        list = [...list].reverse();
        break;
      case 'Beginner Friendly':
        list = [...list].sort((a, b) => {
          const order = { Beginner: 0, Intermediate: 1, Advanced: 2 };
          return order[a.difficulty] - order[b.difficulty];
        });
        break;
      case 'Most Relevant':
        list = [...list].sort((a, b) => b.matchScore - a.matchScore);
        break;
    }
    return list;
  }, [recommendations, filter, sort]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                filter === cat
                  ? 'border-blue-500/40 bg-blue-500/15 text-blue-400'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-gray-400" />
          <div className="relative">
            <ArrowUpDown className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none rounded-lg border border-white/10 bg-white/5 py-1.5 pl-8 pr-8 text-xs font-medium text-white outline-none transition focus:border-blue-500/40"
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-[#0a0a0f]">
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <SlidersHorizontal className="h-8 w-8 text-gray-500" />
          </div>
          <p className="mt-4 text-gray-400">No recommendations match this filter.</p>
          <button
            onClick={() => setFilter('All')}
            className="mt-3 text-sm text-blue-400 transition hover:text-blue-300"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((rec) => (
            <ReelCard key={rec.id} recommendation={rec} />
          ))}
        </div>
      )}
    </div>
  );
}
