
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Toast from "./Toast";
import { ToastProps } from "@/hooks/useCustomToast";

interface ToastContainerProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <div className="fixed top-0 right-0 z-50 p-4 w-full md:max-w-md space-y-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            className="pointer-events-auto"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Toast {...toast} onClose={onClose} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
