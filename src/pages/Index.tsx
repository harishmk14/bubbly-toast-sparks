
import React from "react";
import { useToast } from "@/components/CustomToast/CustomToastProvider";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react";

const Index = () => {
  const toast = useToast();

  const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const showErrorToast = () => {
    toast.error("This is error message", loremIpsum);
  };

  const showWarningToast = () => {
    toast.warning("This is warning message", loremIpsum);
  };

  const showSuccessToast = () => {
    toast.success("This is success message", loremIpsum);
  };

  const showInfoToast = () => {
    toast.info("This is informative message", loremIpsum);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
          Custom Toast Notifications
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Click the buttons below to display different types of toast notifications with smooth animations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
        <ToastButton 
          onClick={showErrorToast} 
          icon={<AlertTriangle />} 
          label="Show Error Toast"
          color="bg-gradient-to-r from-red-500 to-red-600"
          hoverColor="from-red-600 to-red-700"
        />
        
        <ToastButton 
          onClick={showWarningToast} 
          icon={<AlertCircle />} 
          label="Show Warning Toast"
          color="bg-gradient-to-r from-amber-500 to-amber-600"
          hoverColor="from-amber-600 to-amber-700"
        />
        
        <ToastButton 
          onClick={showSuccessToast} 
          icon={<CheckCircle />} 
          label="Show Success Toast"
          color="bg-gradient-to-r from-emerald-500 to-emerald-600"
          hoverColor="from-emerald-600 to-emerald-700"
        />
        
        <ToastButton 
          onClick={showInfoToast} 
          icon={<Info />} 
          label="Show Info Toast"
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          hoverColor="from-blue-600 to-blue-700"
        />
      </div>
    </div>
  );
};

interface ToastButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  color: string;
  hoverColor: string;
}

const ToastButton: React.FC<ToastButtonProps> = ({ onClick, icon, label, color, hoverColor }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${color} hover:${hoverColor} text-white font-semibold py-4 px-6 rounded-lg shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out`}
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </motion.button>
  );
};

export default Index;
