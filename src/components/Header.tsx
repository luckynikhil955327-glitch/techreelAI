import { Menu, Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
}

export function Header({ title, subtitle, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-lg border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:bg-white/10 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
            {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative rounded-lg border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:bg-white/10">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500" />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-bold text-white">
            S
          </div>
        </div>
      </div>
    </header>
  );
}
