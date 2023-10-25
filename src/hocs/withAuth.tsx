"use client";
import React, { useEffect } from "react";
import LoginForm from "@/views/LoginScreen/LoginForm";
import { useAuthStore } from "@/store/useAuthStore";
import useAuthApi from "@/hooks/apis/useAuthApi";

const withAuth = (WrappedComponent: any) => {
  return React.forwardRef(function AuthComponent(props, ref) {
    const api = useAuthApi();

    const { requestToken, accessToken, isLoadingAccessToken }: any =
      useAuthStore();

    const getAccessToken = async () => {
      await api.getAccessToken(requestToken ?? "");
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (requestToken && !accessToken) {
        getAccessToken();
      }
    }, []);

    if (isLoadingAccessToken && !accessToken) {
      return <div />;
    }

    if (!accessToken) {
      return <LoginForm />;
    }

    return <WrappedComponent ref={ref} {...props} />;
  });
};

export default withAuth;
