import React, { useCallback, useEffect } from "react";
import { useAppDispatch } from "@/app/store";
import { useRouter } from "next/navigation";
import useApi from "@/hooks/api/useApi";
import { getAccessKey, setPreviousUrl } from "@/app/store/slices/authSlice";

const withAuth = (WrappedComponent) => {
  return React.forwardRef(function AuthComponent(props, ref) {
    const router = useRouter();
    const api = useApi();
    const dispatch = useAppDispatch();

    const authStateLocalStorage = JSON.parse(
      localStorage.getItem("persist:auth")
    );

    const fetchAccessToken = useCallback(async () => {
      if (
        authStateLocalStorage?.requestToken &&
        !authStateLocalStorage?.accessToken
      ) {
        dispatch(
          getAccessKey(api, JSON.parse(authStateLocalStorage?.requestToken))
        );
      }
    }, [
      api,
      authStateLocalStorage?.accessToken,
      authStateLocalStorage?.requestToken,
      dispatch,
    ]);

    useEffect(() => {
      dispatch(setPreviousUrl(window.location.href));
      if (!authStateLocalStorage?.requestToken) {
        router.push("/login");
      }

      fetchAccessToken();
    }, [authStateLocalStorage?.requestToken, dispatch, fetchAccessToken, router]);

    if (
      !authStateLocalStorage?.requestToken ||
      !authStateLocalStorage?.accessToken
    ) {
      return;
    }

    return <WrappedComponent ref={ref} {...props} />;
  });
};

export default withAuth;
