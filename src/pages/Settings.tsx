import { useApp } from '@/context/AppContext';
import type { Category, Difficulty } from '@/types';
import { Trash2, Sparkles, SlidersHorizontal, Layers, ToggleLeft } from 'lucide-react';

const allCategories: Category[] = ['AI', 'DSA', 'Java', 'HLD', 'Cybersecurity', 'Cloud', 'Hardware', 'Career'];
const allInterests = ['Java', 'DSA', 'AI', 'Web Development', 'Cybersecurity', 'Cloud', 'Hardware', 'Career'];
const difficulties: (Difficulty | 'Any')[] = ['Any', 'Beginner', 'Intermediate', 'Advanced'];

export function Settings() {
  const { settings, updateSettings, clearHistory, addToast } = useApp();

  const toggleInterest = (interest: string) => {
    const current = settings.learningInterests;
    if (current.includes(interest)) {
      updateSettings({ learningInterests: current.filter((i) => i !== interest) });
    } else {
      updateSettings({ learningInterests: [...current, interest] });
    }
  };

  const toggleCategory = (cat: Category) => {
    const current = settings.recommendationCategories;
    if (current.includes(cat)) {
      updateSettings({ recommendationCategories: current.filter((c) => c !== cat) });
    } else {
      updateSettings({ recommendationCategories: [...current, cat] });
    }
  };

  return (
    <div className="space-y-6">
      {/* Learning interests */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Learning Interests</h3>
            <p className="text-sm text-gray-400">Select topics you want the AI to prioritize</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {allInterests.map((interest) => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-all ${
                settings.learningInterests.includes(interest)
                  ? 'border-blue-500/40 bg-blue-500/15 text-blue-400'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Preferred difficulty */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
            <SlidersHorizontal className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Preferred Difficulty</h3>
            <p className="text-sm text-gray-400">Filter recommendations by skill level</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => updateSettings({ preferredDifficulty: diff })}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                settings.preferredDifficulty === diff
                  ? 'border-amber-500/40 bg-amber-500/15 text-amber-400'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendation categories */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
            <Layers className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Recommendation Categories</h3>
            <p className="text-sm text-gray-400">Choose which categories appear in your feed</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-all ${
                settings.recommendationCategories.includes(cat)
                  ? 'border-violet-500/40 bg-violet-500/15 text-violet-400'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* AI personalization toggle */}
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
            <ToggleLeft className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">AI Personalization</h3>
            <p className="text-sm text-gray-400">Let the AI adapt recommendations to your behavior</p>
          </div>
        </div>
        <button
          onClick={() => {
            updateSettings({ aiPersonalization: !settings.aiPersonalization });
            addToast(settings.aiPersonalization ? 'AI personalization disabled' : 'AI personalization enabled', 'info');
          }}
          className={`relative h-7 w-14 rounded-full transition-colors ${
            settings.aiPersonalization ? 'bg-emerald-500' : 'bg-white/10'
          }`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
              settings.aiPersonalization ? 'translate-x-8' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Clear history */}
      <div className="flex items-center justify-between rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/20">
            <Trash2 className="h-4 w-4 text-rose-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Clear Interaction History</h3>
            <p className="text-sm text-gray-400">Remove all analyzed reels and interaction data</p>
          </div>
        </div>
        <button
          onClick={clearHistory}
          className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-400 transition hover:bg-rose-500/20"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
