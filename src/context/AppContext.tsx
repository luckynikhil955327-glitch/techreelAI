import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  Recommendation,
  HistoryEntry,
  Settings,
  Toast,
  AIAnalysis,
} from '@/types';
import {
  mockRecommendations,
  mockHistory,
  defaultSettings,
} from '@/data/mockData';

interface AppContextValue {
  recommendations: Recommendation[];
  toggleSave: (id: string) => void;
  toggleReject: (id: string) => void;
  history: HistoryEntry[];
  addToHistory: (entry: HistoryEntry) => void;
  clearHistory: () => void;
  settings: Settings;
  updateSettings: (patch: Partial<Settings>) => void;
  lastAnalysis: AIAnalysis | null;
  setLastAnalysis: (a: AIAnalysis | null) => void;
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

let toastId = 0;

export function AppProvider({ children }: { children: ReactNode }) {
  const [recommendations, setRecommendations] =
    useState<Recommendation[]>(mockRecommendations);
  const [history, setHistory] = useState<HistoryEntry[]>(mockHistory);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [lastAnalysis, setLastAnalysis] = useState<AIAnalysis | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = `t${++toastId}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleSave = useCallback((id: string) => {
    setRecommendations((prev) => {
      const rec = prev.find((r) => r.id === id);
      if (rec) addToast(rec.saved ? 'Removed from saved' : 'Saved for later');
      return prev.map((r) =>
        r.id === id ? { ...r, saved: !r.saved, rejected: r.saved ? r.rejected : false } : r
      );
    });
  }, [addToast]);

  const toggleReject = useCallback((id: string) => {
    setRecommendations((prev) => {
      const rec = prev.find((r) => r.id === id);
      if (rec) addToast('Marked as not interested', 'info');
      return prev.map((r) =>
        r.id === id ? { ...r, rejected: !r.rejected, saved: r.rejected ? r.saved : false } : r
      );
    });
  }, [addToast]);

  const addToHistory = useCallback((entry: HistoryEntry) => {
    setHistory((prev) => [entry, ...prev]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    addToast('Interaction history cleared', 'info');
  }, [addToast]);

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const value: AppContextValue = {
    recommendations,
    toggleSave,
    toggleReject,
    history,
    addToHistory,
    clearHistory,
    settings,
    updateSettings,
    lastAnalysis,
    setLastAnalysis,
    toasts,
    addToast,
    dismissToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
