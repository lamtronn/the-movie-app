import React, { useEffect } from "react";
import LoginForm from "@/views/LoginScreen/LoginForm";
import { useAuthStore } from "@/store/useAuthStore";
import useAuthApi from "@/hooks/apis/useAuthApi";

const withAuth = (WrappedComponent: any) => {
  return React.forwardRef(function AuthComponent(props, ref) {
    const { requestToken } = useAuthStore() as {
      requestToken: string | undefined;
    };

    const api = useAuthApi();

    const authStateLocalStorage = JSON.parse(
      localStorage?.getItem("auth-storage") ?? "",
    ).state;

    const getAccessToken = async () => {
      await api.getAccessToken(requestToken ?? "");
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (
        authStateLocalStorage.requestToken &&
        !authStateLocalStorage.accessToken
      ) {
        getAccessToken();
      }
    }, []);

    if (
      authStateLocalStorage.isLoadingAccessToken &&
      !authStateLocalStorage.accessToken
    ) {
      return <div />;
    }

    if (!authStateLocalStorage.accessToken) {
      return <LoginForm />;
    }

    return <WrappedComponent ref={ref} {...props} />;
  });
};

export default withAuth;
