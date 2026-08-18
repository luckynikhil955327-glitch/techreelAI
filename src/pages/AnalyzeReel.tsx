import { useState } from 'react';
import { AnalysisResult } from '@/components/AnalysisResult';
import { analyzeReelAsync } from '@/services/aiService';
import { useApp } from '@/context/AppContext';
import type { AIAnalysis, Category, HistoryEntry } from '@/types';
import { Search, Loader2, Link2, FileText, MessageSquare, Eye, Heart, Bookmark, Share2, SkipForward } from 'lucide-react';

const categories: Category[] = ['AI', 'DSA', 'Java', 'HLD', 'Cybersecurity', 'Cloud', 'Hardware', 'Career', 'Other'];

export function AnalyzeReel() {
  const { setLastAnalysis, addToHistory, addToast } = useApp();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [transcript, setTranscript] = useState('');
  const [category, setCategory] = useState<Category>('Java');
  const [watchPercentage, setWatchPercentage] = useState(75);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!title.trim()) {
      addToast('Please enter a reel title', 'error');
      return;
    }
    setLoading(true);
    setResult(null);

    const analysis = await analyzeReelAsync({
      reel: { title, caption, category, transcript },
      interaction: { watchPercentage, liked, saved, shared, skipped },
    });

    setResult(analysis);
    setLastAnalysis(analysis);
    addToHistory({
      id: `h${Date.now()}`,
      reelTitle: analysis.currentReel,
      detectedInterest: analysis.interestDetected,
      category: analysis.category,
      confidence: analysis.confidence,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      recommendation: analysis.recommendedTechReel,
    } as HistoryEntry);
    setLoading(false);
    addToast('AI analysis complete');
  };

  const toggleChip = (state: boolean, setter: (v: boolean) => void, label: string, icon: typeof Eye) => {
    const Icon = icon;
    return (
      <button
        onClick={() => setter(!state)}
        className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all ${
          state
            ? 'border-blue-500/40 bg-blue-500/15 text-blue-400'
            : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'
        }`}
      >
        <Icon className="h-4 w-4" />
        {label}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <h3 className="mb-4 text-lg font-semibold text-white">Submit a Reel for Analysis</h3>

          <div className="space-y-4">
            {/* URL */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm text-gray-400">
                <Link2 className="h-4 w-4" /> Reel URL
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://instagram.com/reel/..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-blue-500/40 focus:bg-white/10"
              />
            </div>

            {/* Title */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm text-gray-400">
                <FileText className="h-4 w-4" /> Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="How I built a calculator using Java classes"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-blue-500/40 focus:bg-white/10"
              />
            </div>

            {/* Caption */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm text-gray-400">
                <FileText className="h-4 w-4" /> Caption
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Object-oriented programming made simple #java #oop"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-blue-500/40 focus:bg-white/10"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-1.5 block text-sm text-gray-400">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                      category === cat
                        ? 'border-blue-500/40 bg-blue-500/15 text-blue-400'
                        : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Transcript */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm text-gray-400">
                <MessageSquare className="h-4 w-4" /> Transcript (optional)
              </label>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste the reel transcript here for deeper analysis..."
                rows={3}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-blue-500/40 focus:bg-white/10"
              />
            </div>

            {/* Watch percentage */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <Eye className="h-4 w-4" /> Watched
                </label>
                <span className="text-sm font-semibold text-white">{watchPercentage}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={watchPercentage}
                onChange={(e) => setWatchPercentage(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            {/* Interaction chips */}
            <div>
              <label className="mb-2 block text-sm text-gray-400">Interaction Signals</label>
              <div className="flex flex-wrap gap-2">
                {toggleChip(liked, setLiked, 'Liked', Heart)}
                {toggleChip(saved, setSaved, 'Saved', Bookmark)}
                {toggleChip(shared, setShared, 'Shared', Share2)}
                {toggleChip(skipped, setSkipped, 'Skipped', SkipForward)}
              </div>
            </div>

            {/* Analyze button */}
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Analyze Reel
                </>
              )}
            </button>
          </div>
        </div>

        {/* Result / loading / empty */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          {loading && (
            <div className="flex h-full flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-2 border-white/10" />
                <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-2 border-transparent border-t-blue-500 border-r-violet-500" />
              </div>
              <p className="mt-6 text-lg font-semibold text-white">AI Agent is analyzing content...</p>
              <p className="mt-1 text-sm text-gray-400">Understanding context, interactions, and underlying interests</p>
              <div className="mt-6 flex flex-col gap-2">
                {['Understanding reel content', 'Analyzing interaction signals', 'Inferring underlying interest', 'Generating recommendation'].map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-400"
                    style={{ animation: `fadeInUp 0.4s ease ${i * 500}ms both` }}
                  >
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" />
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && !result && (
            <div className="flex h-full flex-col items-center justify-center py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Search className="h-8 w-8 text-gray-500" />
              </div>
              <p className="mt-4 text-gray-400">Submit a reel and click "Analyze Reel" to see the AI agent's analysis.</p>
              <p className="mt-1 text-sm text-gray-500">The AI will detect the underlying interest and recommend a tech reel.</p>
            </div>
          )}

          {!loading && result && <AnalysisResult analysis={result} />}
        </div>
      </div>
    </div>
  );
}
