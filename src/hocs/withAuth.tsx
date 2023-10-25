import React, { useEffect } from "react";
import LoginForm from "@/views/LoginScreen/LoginForm";
import { useAuthStore } from "@/store/useAuthStore";
import useAuthApi from "@/hooks/apis/useAuthApi";

const withAuth = (WrappedComponent: any) => {
  return React.forwardRef(function AuthComponent(props, ref) {
    // const api = useAuthApi();
    //
    // const { requestToken, accessToken, isLoadingAccessToken }: any =
    //   useAuthStore();
    //
    // const getAccessToken = async () => {
    //   await api.getAccessToken(requestToken ?? "");
    // };
    //
    // // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect(() => {
    //   if (requestToken && !accessToken) {
    //     getAccessToken();
    //   }
    // }, [accessToken, getAccessToken, requestToken]);
    //
    // if (isLoadingAccessToken && !accessToken) {
    //   return <div />;
    // }
    //
    // if (!accessToken) {
    //   return <LoginForm />;
    // }

    const { requestToken } = useAuthStore() as any;

    const api = useAuthApi();

    const getAccessToken = async () => {
      await api.getAccessToken(requestToken);
    };

    if (typeof window !== "undefined") {
      const authStateLocalStorage = JSON.parse(
        localStorage?.getItem("auth-storage") ?? "",
      ).state;

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
    }

    return <WrappedComponent ref={ref} {...props} />;
  });
};

export default withAuth;
