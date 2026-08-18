import { useApp } from '@/context/AppContext';
import { CheckCircle2, Info, XCircle, X } from 'lucide-react';

const toastConfig = {
  success: { icon: CheckCircle2, color: 'text-emerald-400', border: 'border-emerald-500/30' },
  info: { icon: Info, color: 'text-blue-400', border: 'border-blue-500/30' },
  error: { icon: XCircle, color: 'text-rose-400', border: 'border-rose-500/30' },
};

export function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => {
        const config = toastConfig[toast.type];
        const Icon = config.icon;
        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 rounded-xl border ${config.border} bg-[#0a0a0f]/95 px-4 py-3 shadow-2xl backdrop-blur-xl`}
            style={{ animation: 'slideInRight 0.3s ease both' }}
          >
            <Icon className={`h-5 w-5 ${config.color}`} />
            <span className="text-sm text-white">{toast.message}</span>
            <button
              onClick={() => dismissToast(toast.id)}
              className="ml-2 text-gray-500 transition hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
