import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    toast(message, {
        type,
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
        className: 'bg-cyan-200', // Tailwind classes
    });
};
export const showPromiseNotification = <T>(
  promise: Promise<T>,
  messages: {
    pending: string;
    success: string;
    error: string;
  },
  options?: {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
    theme?: 'light' | 'dark' | 'colored';
  }
): Promise<T> => {
  return toast.promise(promise, {
    pending: {
      render() {
        return messages.pending;
      },
    },
    success: {
      render() {
        return messages.success;
      },
    },
    error: {
      render() {
        return messages.error;
      },
    },
  }, {
    position: options?.position || 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: options?.theme || 'light',
    className: 'bg-cyan-50 text-cyan-900 border border-cyan-200', // Tailwind styling
  });
};