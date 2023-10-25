"use client";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";
import { AxiosError } from "axios";
import { useAuthStore } from "@/store/useAuthStore";

export const ErrorContext = createContext(undefined);
const ErrorBoundary = ({ children }) => {
  const { reset } = useAuthStore();
  const onShowErrorToast = (e: AxiosError, isClearToken?: boolean) => {
    if (e.response.data.status === 404 && isClearToken) {
      reset();
    }
    return toast.error(e.response.data.status_message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const value = { onShowErrorToast };

  return (
    <ErrorContext.Provider value={value}>
      <div className="relative">
        <ToastContainer />
        {children}
      </div>
    </ErrorContext.Provider>
  );
};

export default ErrorBoundary;
