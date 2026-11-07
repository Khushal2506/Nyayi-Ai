import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start space-x-3 p-4 rounded-xl bg-nyaya-plum text-white shadow-warm-lg border border-nyaya-plum-light animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          )}
          {toast.type === 'warning' && (
            <AlertCircle className="w-5 h-5 text-nyaya-yellow shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-nyaya-orange shrink-0 mt-0.5" />
          )}

          <div className="flex-1">
            <h4 className="text-xs font-semibold text-white tracking-wide">{toast.title}</h4>
            {toast.message && (
              <p className="text-[11px] text-nyaya-lavender mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            )}
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
