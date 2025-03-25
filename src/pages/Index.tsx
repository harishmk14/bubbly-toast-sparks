
import React, { useEffect } from "react";
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

  useEffect(() => {
    toast.error("This is error message", loremIpsum);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
          Toast Notifications
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Click the buttons below to display different types of toast notifications.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
        <ToastButton 
          onClick={showErrorToast} 
          icon={<AlertTriangle className="h-5 w-5" />} 
          label="Error Toast"
          color="bg-red-500"
          hoverColor="bg-red-600"
        />
        
        <ToastButton 
          onClick={showWarningToast} 
          icon={<AlertCircle className="h-5 w-5" />} 
          label="Warning Toast"
          color="bg-amber-500"
          hoverColor="bg-amber-600"
        />
        
        <ToastButton 
          onClick={showSuccessToast} 
          icon={<CheckCircle className="h-5 w-5" />} 
          label="Success Toast"
          color="bg-emerald-500"
          hoverColor="bg-emerald-600"
        />
        
        <ToastButton 
          onClick={showInfoToast} 
          icon={<Info className="h-5 w-5" />} 
          label="Info Toast"
          color="bg-blue-500"
          hoverColor="bg-blue-600"
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
      className={`${color} hover:${hoverColor} text-white font-medium py-3 px-4 rounded-lg shadow-sm flex items-center justify-center transition-all duration-300 ease-in-out`}
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </motion.button>
  );
};

export default Index;
