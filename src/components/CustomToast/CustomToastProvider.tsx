
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ToastContainer from "./ToastContainer";

export type ToastType = "error" | "warning" | "success" | "info";

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

type ToastContextType = {
  toasts: ToastProps[];
  addToast: (type: ToastType, title: string, message: string, duration?: number) => string;
  removeToast: (id: string) => void;
  error: (title: string, message: string, duration?: number) => string;
  warning: (title: string, message: string, duration?: number) => string;
  success: (title: string, message: string, duration?: number) => string;
  info: (title: string, message: string, duration?: number) => string;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a CustomToastProvider");
  }
  return context;
};

export const CustomToastProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback(
    (type: ToastType, title: string, message: string, duration = 5000) => {
      const id = uuidv4();
      const newToast = { id, type, title, message, duration };
      setToasts((prevToasts) => [...prevToasts, newToast]);
      
      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => 
      prevToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  const error = useCallback(
    (title: string, message: string, duration?: number) =>
      addToast("error", title, message, duration),
    [addToast]
  );

  const warning = useCallback(
    (title: string, message: string, duration?: number) =>
      addToast("warning", title, message, duration),
    [addToast]
  );

  const success = useCallback(
    (title: string, message: string, duration?: number) =>
      addToast("success", title, message, duration),
    [addToast]
  );

  const info = useCallback(
    (title: string, message: string, duration?: number) =>
      addToast("info", title, message, duration),
    [addToast]
  );

  const contextValue = {
    toasts,
    addToast,
    removeToast,
    error,
    warning,
    success,
    info,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};
