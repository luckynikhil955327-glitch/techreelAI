import { LayoutDashboard, Search, Compass, Heart, History, Settings, Sparkles } from 'lucide-react';
import type { Page } from '@/App';

interface SidebarProps {
  current: Page;
  onNavigate: (page: Page) => void;
  mobileOpen: boolean;
  onClose: () => void;
}

const navItems: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analyze', label: 'Analyze Reel', icon: Search },
  { id: 'recommendations', label: 'Recommendations', icon: Compass },
  { id: 'interests', label: 'Interests', icon: Heart },
  { id: 'history', label: 'History', icon: History },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ current, onNavigate, mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white">TechReel AI</h1>
            <p className="text-xs text-gray-500">Turn scrolling into learning</p>
          </div>
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = current === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? 'bg-gradient-to-r from-blue-500/20 to-violet-500/10 text-white shadow-inner'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${active ? 'text-blue-400' : ''}`} />
                {item.label}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="m-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-white">AI Agent Status</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-400">Active</span>
            <span className="text-xs text-gray-500">·</span>
            <span className="text-xs text-gray-400">Analyzing your interests</span>
          </div>
        </div>
      </aside>
    </>
  );
}
