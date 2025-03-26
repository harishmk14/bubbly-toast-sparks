
import React from "react";
import { ToastProps } from "./CustomToastProvider";
import Toast from "./Toast";

interface ToastContainerProps {
  toasts: ToastProps[];
  removeToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-0 right-0 p-4 z-50 flex flex-col items-end">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
