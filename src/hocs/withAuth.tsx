import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useRouter } from "next/navigation";
import useApi from "@/hooks/api/useApi";
import { getAccessKey, setPreviousUrl } from "@/app/store/slices/authSlice";
import LoginForm from "@/app/(navbar)/login/LoginForm";

const withAuth = (WrappedComponent) => {
  return React.forwardRef(function AuthComponent(props, ref) {
    const router = useRouter();
    const api = useApi();
    const dispatch = useAppDispatch();
    const { isLoadingAccessToken, accessToken, requestToken } = useAppSelector(
      (state) => state.auth
    );

    const authStateLocalStorage = JSON.parse(
      localStorage.getItem("persist:auth")
    );

    useLayoutEffect(() => {
      dispatch(setPreviousUrl(window.location.href));
      if (
        authStateLocalStorage?.requestToken &&
        !authStateLocalStorage?.accessToken
      ) {
        dispatch(getAccessKey(api, requestToken));
      }
    }, [api, accessToken, requestToken, dispatch, router]);

    if (isLoadingAccessToken && !authStateLocalStorage?.accessToken) {
      return <div />;
    }
    if (!authStateLocalStorage?.accessToken) {
      return <LoginForm />;
    }

    return <WrappedComponent ref={ref} {...props} />;
  });
};

export default withAuth;
