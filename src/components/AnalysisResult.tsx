import type { AIAnalysis } from '@/types';
import { CategoryBadge, ConfidenceBadge, DifficultyBadge } from '@/components/Badges';
import { Film, Target, Brain, Sparkles, Tag, Link2, BarChart3 } from 'lucide-react';

interface AnalysisResultProps {
  analysis: AIAnalysis;
}

export function AnalysisResult({ analysis }: AnalysisResultProps) {
  const fields = [
    {
      icon: Film,
      label: 'Current Reel',
      value: analysis.currentReel,
      color: 'text-blue-400',
      border: 'border-blue-500/20',
    },
    {
      icon: Target,
      label: 'Interest Detected',
      value: analysis.interestDetected,
      color: 'text-violet-400',
      border: 'border-violet-500/20',
    },
    {
      icon: Brain,
      label: 'Why',
      value: analysis.why,
      color: 'text-cyan-400',
      border: 'border-cyan-500/20',
    },
    {
      icon: Sparkles,
      label: 'Recommended Tech Reel',
      value: analysis.recommendedTechReel,
      color: 'text-emerald-400',
      border: 'border-emerald-500/20',
    },
    {
      icon: Tag,
      label: 'Category',
      value: <CategoryBadge category={analysis.category} />,
      color: 'text-amber-400',
      border: 'border-amber-500/20',
    },
    {
      icon: Link2,
      label: 'Why This Recommendation',
      value: analysis.whyRecommendation,
      color: 'text-teal-400',
      border: 'border-teal-500/20',
    },
    {
      icon: BarChart3,
      label: 'Difficulty',
      value: <DifficultyBadge difficulty={analysis.difficulty} />,
      color: 'text-orange-400',
      border: 'border-orange-500/20',
    },
    {
      icon: BarChart3,
      label: 'Confidence',
      value: <ConfidenceBadge confidence={analysis.confidence} />,
      color: 'text-rose-400',
      border: 'border-rose-500/20',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
          <Sparkles className="h-4 w-4 text-emerald-400" />
        </div>
        <p className="text-sm font-medium text-emerald-400">AI Analysis Complete</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((field, i) => {
          const Icon = field.icon;
          return (
            <div
              key={i}
              className={`rounded-2xl border ${field.border} bg-white/[0.03] p-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.06]`}
              style={{ animation: `fadeInUp 0.4s ease ${i * 80}ms both` }}
            >
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${field.color}`} />
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  {field.label}
                </span>
              </div>
              <div className="mt-2 text-sm leading-relaxed text-gray-100">
                {field.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
