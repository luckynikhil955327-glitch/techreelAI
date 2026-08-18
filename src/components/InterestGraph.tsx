import { mockInterests } from '@/data/mockData';

const nodePositions: Record<string, { x: number; y: number; size: number }> = {
  Java: { x: 50, y: 25, size: 48 },
  DSA: { x: 25, y: 50, size: 42 },
  AI: { x: 75, y: 45, size: 38 },
  'Web Development': { x: 50, y: 75, size: 34 },
  Cybersecurity: { x: 80, y: 75, size: 30 },
  Cloud: { x: 20, y: 80, size: 28 },
  Hardware: { x: 85, y: 20, size: 24 },
  Career: { x: 15, y: 20, size: 26 },
};

const connections: [string, string][] = [
  ['Java', 'DSA'],
  ['Java', 'Web Development'],
  ['DSA', 'Career'],
  ['AI', 'Web Development'],
  ['AI', 'Career'],
  ['Cybersecurity', 'Cloud'],
  ['Cloud', 'Web Development'],
  ['Career', 'AI'],
];

export function InterestGraph() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
      <h3 className="mb-4 font-semibold text-white">Interest Graph</h3>
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-blue-500/5 to-violet-500/5">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {connections.map(([from, to], i) => {
            const f = nodePositions[from];
            const t = nodePositions[to];
            if (!f || !t) return null;
            return (
              <line
                key={i}
                x1={f.x}
                y1={f.y}
                x2={t.x}
                y2={t.y}
                stroke="url(#linkGradient)"
                strokeWidth="0.3"
                strokeDasharray="0.5 0.5"
                opacity="0.5"
              />
            );
          })}
          <defs>
            <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>

        {mockInterests.map((interest) => {
          const pos = nodePositions[interest.name];
          if (!pos) return null;
          const size = pos.size;
          const opacity = 0.3 + (interest.confidence / 100) * 0.7;
          return (
            <div
              key={interest.name}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-blue-500/30 to-violet-500/20 text-center backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white/40"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity,
              }}
              title={`${interest.name} — ${interest.confidence}%`}
            >
              <span className="text-[10px] font-semibold leading-tight text-white">
                {interest.name.split(' ').map((w) => w[0]).join('')}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {mockInterests.map((interest) => (
          <div
            key={interest.name}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-300"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{
                opacity: 0.3 + (interest.confidence / 100) * 0.7,
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              }}
            />
            {interest.name}
          </div>
        ))}
      </div>
    </div>
  );
}
