
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { ToastProps } from "@/hooks/useCustomToast";
import { IoAlertCircleSharp } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { TbAlertCircleFilled } from "react-icons/tb";
import { GoAlertFill } from "react-icons/go";
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
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow shadow-red-300 p-1">
            <GoAlertFill className="h-6 w-6 text-red-500" />
          </div>
        );
      case "warning":
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow shadow-amber-300 p-1">
            <TbAlertCircleFilled className="h-7 w-7 text-amber-500" />
          </div>
        );
      case "success":
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow shadow-emerald-300 p-1">
            <FaCircleCheck className="h-6 w-6 text-emerald-500" />
          </div>
        );
      case "info":
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow shadow-blue-300 p-1">
            <TbAlertCircleFilled className="h-7 w-7 text-blue-500" />
          </div>
        );
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "error":
        return "bg-gradient-to-b from-red-100 to-white";
      case "warning":
        return "bg-gradient-to-b from-amber-100 to-white";
      case "success":
        return "bg-gradient-to-b from-emerald-100 to-white";
      case "info":
        return "bg-gradient-to-b from-blue-100 to-white";
      default:
        return "bg-gradient-to-b from-gray-100 to-white";
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
            "w-full max-w-md rounded-xl shadow-sm overflow-hidden border-4 border-white",
            getBgColor()
          )}
        >
          <div className="p-5 ">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
              <div className="ml-4 w-full">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                  <button
                    type="button"
                    className="ml-auto text-gray-400 hover:text-gray-600 focus:outline-none"
                    onClick={handleClose}
                  >
                    <X className="h-5 w-5" />
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
