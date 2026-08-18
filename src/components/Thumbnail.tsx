import { thumbnailGradients } from '@/data/mockData';

export function Thumbnail({
  gradient,
  label,
  className = '',
}: {
  gradient: string;
  label?: string;
  className?: string;
}) {
  const grad = thumbnailGradients[gradient] ?? thumbnailGradients['gradient-1'];
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${grad} ${className}`}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-white/40" />
      </div>
      {label && (
        <span className="absolute bottom-2 left-2 text-xs font-medium text-white/90">
          {label}
        </span>
      )}
    </div>
  );
}
