import React, { createContext, useContext, useState, useRef } from 'react';
import { View } from 'react-native';
import Toast from '@/components/Toast';

type ToastItem = {
  id: number;
  text: string;
  status: number;
  duration?: number;
};

type ToastContextType = {
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const queueRef = useRef<ToastItem[]>([]);
  const idRef = useRef(0);

  const showToast = (toast: Omit<ToastItem, 'id'>) => {
    const id = idRef.current++;
    const newToast: ToastItem = { ...toast, id };

    if (toasts.length < 2) {
      setToasts(prev => [...prev, newToast]);
    } else {
      queueRef.current.push(newToast);
    }
  };

  const handleDismiss = (id: number) => {
    setToasts(prev => {
      const newToasts = prev.filter(t => t.id !== id);
      if (queueRef.current.length > 0) {
        const next = queueRef.current.shift()!;
        return [...newToasts, next];
      }
      return newToasts;
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          text={toast.text}
          status={toast.status}
          duration={toast.duration}
          onDismiss={() => handleDismiss(toast.id)}
          position="bottom"
        />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
