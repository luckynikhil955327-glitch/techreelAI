import { StatCard } from '@/components/StatCard';
import { InterestCard } from '@/components/InterestCard';
import { AIInsightCard } from '@/components/AIInsightCard';
import { ReelCard } from '@/components/ReelCard';
import { AgentPipeline } from '@/components/AgentPipeline';
import { useApp } from '@/context/AppContext';
import { mockInterests, mockInsights } from '@/data/mockData';
import { Eye, Target, Sparkles, Gauge } from 'lucide-react';
import type { Page } from '@/App';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { recommendations } = useApp();
  const topInterests = mockInterests.slice(0, 4);
  const topRecs = recommendations.filter((r) => !r.rejected).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-600/10 via-violet-600/5 to-transparent p-6 backdrop-blur-xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-10 left-1/3 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative">
          <h2 className="text-2xl font-bold text-white">Your AI Learning Feed</h2>
          <p className="mt-1 text-gray-400">
            Your scrolling patterns are helping us discover what you want to learn.
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Reels Analyzed" value={24} icon={Eye} accent="from-blue-500 to-cyan-500" delay={0} />
        <StatCard label="Interests Detected" value={6} icon={Target} accent="from-violet-500 to-purple-500" delay={80} />
        <StatCard label="Tech Recommendations" value={18} icon={Sparkles} accent="from-emerald-500 to-teal-500" delay={160} />
        <StatCard label="AI Confidence" value="87%" icon={Gauge} accent="from-amber-500 to-orange-500" delay={240} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column: top interests + insights */}
        <div className="space-y-6 lg:col-span-2">
          {/* Top interests */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Top Interests</h3>
              <button
                onClick={() => onNavigate('interests')}
                className="text-sm text-blue-400 transition hover:text-blue-300"
              >
                View all
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {topInterests.map((interest) => (
                <InterestCard key={interest.name} interest={interest} />
              ))}
            </div>
          </div>

          {/* Recent AI insights */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Recent AI Insights</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {mockInsights.slice(0, 4).map((insight) => (
                <AIInsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>

          {/* Recommended for you */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Recommended For You</h3>
              <button
                onClick={() => onNavigate('recommendations')}
                className="text-sm text-blue-400 transition hover:text-blue-300"
              >
                See all
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {topRecs.map((rec) => (
                <ReelCard key={rec.id} recommendation={rec} />
              ))}
            </div>
          </div>
        </div>

        {/* Right column: AI agent pipeline */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <AgentPipeline />
          </div>
        </div>
      </div>
    </div>
  );
}
