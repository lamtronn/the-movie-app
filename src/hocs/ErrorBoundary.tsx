"use client";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";
import { AxiosError } from "axios";
import { useAuthStore } from "@/store/useAuthStore";

type ErrorBoundaryType = {
  children: React.ReactNode;
};

type ContextValueType = {
  onShowErrorToast:
    | ((e: AxiosError, isClearToken?: boolean) => number | string)
    | undefined;
};

export const ErrorContext = createContext<any>(undefined);
const ErrorBoundary = ({ children }: ErrorBoundaryType) => {
  const { reset } = useAuthStore() as { reset: () => void };
  const onShowErrorToast = (e: AxiosError, isClearToken?: boolean) => {
    const responseData: any = e?.response?.data;
    if ((responseData.status as any) === 404 && isClearToken) {
      reset();
    }
    return toast.error(responseData.status_message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const value: ContextValueType | undefined = { onShowErrorToast };

  return (
    <ErrorContext.Provider value={value as any}>
      <div className="relative">
        <ToastContainer />
        {children}
      </div>
    </ErrorContext.Provider>
  );
};

export default ErrorBoundary;
