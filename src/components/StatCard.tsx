import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent: string;
  delay?: number;
}

export function StatCard({ label, value, icon: Icon, accent, delay = 0 }: StatCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br ${accent} opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20`} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accent} shadow-lg`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
}
