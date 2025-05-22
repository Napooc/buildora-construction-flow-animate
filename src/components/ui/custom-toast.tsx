
import { toast as sonnerToast } from "sonner";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastOptions {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const icons = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <XCircle className="h-5 w-5 text-red-500" />,
  warning: <AlertCircle className="h-5 w-5 text-amber-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />
};

export const toast = {
  success: (title: string, options?: ToastOptions) => {
    return sonnerToast(title, {
      ...options,
      icon: icons.success,
    });
  },
  error: (title: string, options?: ToastOptions) => {
    return sonnerToast(title, {
      ...options,
      icon: icons.error,
    });
  },
  warning: (title: string, options?: ToastOptions) => {
    return sonnerToast(title, {
      ...options,
      icon: icons.warning,
    });
  },
  info: (title: string, options?: ToastOptions) => {
    return sonnerToast(title, {
      ...options,
      icon: icons.info,
    });
  },
  custom: sonnerToast,
};
