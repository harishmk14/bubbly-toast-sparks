
import React, { useEffect, useState } from "react";
import { ToastProps } from "./CustomToastProvider";
import { AlertTriangle, CheckCircle, Info, AlertCircle, X } from "lucide-react";

interface ToastComponentProps extends ToastProps {
  onClose: () => void;
}

const Toast: React.FC<ToastComponentProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, duration - 300);

    const closeTimer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  const getIconByType = () => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-5 w-5 text-white" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-white" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-white" />;
      case "info":
        return <Info className="h-5 w-5 text-white" />;
      default:
        return <Info className="h-5 w-5 text-white" />;
    }
  };

  const getBgColorByType = () => {
    switch (type) {
      case "error":
        return "bg-red-100 border-red-200";
      case "warning":
        return "bg-amber-100 border-amber-200";
      case "success":
        return "bg-emerald-100 border-emerald-200";
      case "info":
        return "bg-blue-100 border-blue-200";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  const getIconBgByType = () => {
    switch (type) {
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-amber-500";
      case "success":
        return "bg-emerald-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`${getBgColorByType()} rounded-lg border p-4 shadow-md transition-all duration-300 transform ${
        isExiting ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"
      } flex items-start gap-3 mb-3 relative overflow-hidden w-full max-w-md`}
      role="alert"
      aria-live="assertive"
    >
      <div className={`${getIconBgByType()} rounded-full p-2 flex-shrink-0`}>
        {getIconByType()}
      </div>
      
      <div className="flex-1 mr-8">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-700 mt-1">{message}</p>
      </div>
      
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;
