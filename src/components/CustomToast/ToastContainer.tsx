
import React from "react";
import { AnimatePresence } from "framer-motion";
import Toast from "./Toast";
import { ToastProps } from "@/hooks/useCustomToast";

interface ToastContainerProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <div className="fixed top-0 right-0 z-50 p-6 w-full md:max-w-md space-y-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto mb-4">
            <Toast {...toast} onClose={onClose} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
