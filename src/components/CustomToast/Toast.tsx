
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { ToastProps } from "@/hooks/useCustomToast";
import { cn } from "@/lib/utils";

interface ToastComponentProps extends ToastProps {
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastComponentProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        onClose(id);
      }, 300); // Wait for exit animation to complete

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, id]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const getIcon = () => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "error":
        return "bg-red-50 border border-red-100"; // Soft light red
      case "warning":
        return "bg-amber-50 border border-amber-100"; // Soft light amber
      case "success":
        return "bg-emerald-50 border border-emerald-100"; // Soft light green
      case "info":
        return "bg-blue-50 border border-blue-100"; // Soft light blue
      default:
        return "bg-gray-50 border border-gray-100"; // Soft light gray fallback
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ 
            duration: 0.3, 
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          className={cn(
            "w-full max-w-md rounded-lg shadow-sm overflow-hidden",
            getBgColor()
          )}
        >
          <div className="p-5">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
              <div className="ml-4 w-full">
                <div className="flex justify-between">
                  <h3 className="text-base font-medium text-gray-800">{title}</h3>
                  <button
                    type="button"
                    className="ml-auto bg-transparent text-gray-400 hover:text-gray-600 focus:outline-none"
                    onClick={handleClose}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-1 text-sm text-gray-600">{message}</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
