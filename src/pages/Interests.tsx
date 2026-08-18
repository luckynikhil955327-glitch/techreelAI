import { InterestCard } from '@/components/InterestCard';
import { InterestGraph } from '@/components/InterestGraph';
import { mockInterests } from '@/data/mockData';
import { Network } from 'lucide-react';

export function Interests() {
  return (
    <div className="space-y-6">
      {/* Interest Map header */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/10 via-blue-600/5 to-transparent p-6 backdrop-blur-xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600">
            <Network className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Interest Map</h2>
            <p className="text-sm text-gray-400">Your AI-inferred interests and how they connect</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Interest cards */}
        <div className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {mockInterests.map((interest) => (
              <InterestCard key={interest.name} interest={interest} />
            ))}
          </div>
        </div>

        {/* Interest graph */}
        <div className="lg:col-span-1">
          <InterestGraph />
        </div>
      </div>
    </div>
  );
}
