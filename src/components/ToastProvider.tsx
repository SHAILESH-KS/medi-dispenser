import { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, X } from 'lucide-react';

type ToastType = 'success' | 'error';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  medicineName: string;
  position: string;
  message: string;
  time: string;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    
    // Auto remove after 6 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 6000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className="pointer-events-auto bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border-gray overflow-hidden flex flex-col relative"
            >
              <div className={`h-1.5 w-full ${toast.type === 'success' ? 'bg-soft-green' : 'bg-red-500'}`} />
              
              <div className="p-4 relative">
                <button 
                  onClick={() => removeToast(toast.id)}
                  className="absolute top-3 right-3 text-text-charcoal/50 hover:text-text-navy transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-2 mb-3">
                  {toast.type === 'success' ? (
                    <Bell className="w-5 h-5 text-soft-green" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  )}
                  <h3 className="font-bold text-text-navy text-sm">{toast.title}</h3>
                </div>
                
                <div className="space-y-1 pl-7">
                  <p className="font-semibold text-text-navy text-base">{toast.medicineName}</p>
                  <p className="text-text-charcoal text-sm font-medium">Position {toast.position}</p>
                  <p className="text-text-charcoal/80 text-sm">{toast.message}</p>
                </div>
                
                <div className="absolute bottom-4 right-4 text-xs font-bold text-text-charcoal/40">
                  {toast.time}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
