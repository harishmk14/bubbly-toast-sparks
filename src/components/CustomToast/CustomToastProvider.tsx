
import React from "react";
import { useCustomToast, ToastProps } from "@/hooks/useCustomToast";
import ToastContainer from "./ToastContainer";

interface CustomToastProviderProps {
  children: React.ReactNode;
}

export const ToastContext = React.createContext<ReturnType<typeof useCustomToast> | null>(null);

export const CustomToastProvider: React.FC<CustomToastProviderProps> = ({ children }) => {
  const toast = useCustomToast();

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a CustomToastProvider");
  }
  return context;
};
