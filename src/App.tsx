import { useState, useEffect } from 'react';
import { AppProvider } from '@/context/AppContext';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { ToastContainer } from '@/components/Toast';
import { Dashboard } from '@/pages/Dashboard';
import { AnalyzeReel } from '@/pages/AnalyzeReel';
import { Recommendations } from '@/pages/Recommendations';
import { Interests } from '@/pages/Interests';
import { History } from '@/pages/History';
import { Settings } from '@/pages/Settings';

export type Page = 'dashboard' | 'analyze' | 'recommendations' | 'interests' | 'history' | 'settings';

const pageMeta: Record<Page, { title: string; subtitle?: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Your AI-powered learning feed' },
  analyze: { title: 'Analyze Reel', subtitle: 'Submit a reel for AI interest analysis' },
  recommendations: { title: 'Recommendations', subtitle: 'Personalized tech reels for you' },
  interests: { title: 'Interests', subtitle: 'Your AI-inferred interest map' },
  history: { title: 'History', subtitle: 'Previously analyzed reels' },
  settings: { title: 'Settings', subtitle: 'Customize your AI experience' },
};

function AppContent() {
  const [page, setPage] = useState<Page>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);

  useEffect(() => {
    setTransitionKey((k) => k + 1);
  }, [page]);

  const meta = pageMeta[page];

  return (
    <div className="min-h-screen bg-[#08080c] text-white">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-violet-600/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-600/5 blur-[100px]" />
      </div>

      <Sidebar
        current={page}
        onNavigate={setPage}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="lg:pl-64">
        <Header
          title={meta.title}
          subtitle={meta.subtitle}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="px-4 py-6 lg:px-8">
          <div key={transitionKey} style={{ animation: 'fadeInUp 0.35s ease both' }}>
            {page === 'dashboard' && <Dashboard onNavigate={setPage} />}
            {page === 'analyze' && <AnalyzeReel />}
            {page === 'recommendations' && <Recommendations />}
            {page === 'interests' && <Interests />}
            {page === 'history' && <History />}
            {page === 'settings' && <Settings />}
          </div>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
