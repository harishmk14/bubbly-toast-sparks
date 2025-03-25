
import { useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export type ToastType = "error" | "warning" | "success" | "info";

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

export function useCustomToast() {
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

  return {
    toasts,
    addToast,
    removeToast,
    error,
    warning,
    success,
    info,
  };
}
