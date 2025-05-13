import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { ToastType } from '../../contexts/ToastContext';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 4700); // Start exit animation 300ms before close

    return () => clearTimeout(exitTimer);
  }, []);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'error':
        return <XCircle size={20} className="text-red-500" />;
      case 'warning':
        return <AlertCircle size={20} className="text-yellow-500" />;
      case 'info':
      default:
        return <Info size={20} className="text-blue-500" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'error':
        return 'border-l-red-500 bg-red-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'info':
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <div
      className={`
        w-72 md:w-96 bg-white shadow-lg rounded-md border-l-4 ${getColor()}
        transform transition-all duration-300 ease-in-out
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100'}
      `}
      role="alert"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          {getIcon()}
          <div className="ml-3">
            <p className="text-sm font-medium text-neutral-800">{message}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-neutral-500 focus:outline-none"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;