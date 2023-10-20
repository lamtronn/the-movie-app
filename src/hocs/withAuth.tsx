import React, { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
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

    const fetchAccessToken = async () => {
      if (
        authStateLocalStorage?.requestToken &&
        !authStateLocalStorage?.accessToken
      ) {
        dispatch(
          getAccessKey(api, JSON.parse(authStateLocalStorage?.requestToken))
        );
      }
    };

    useEffect(() => {
      if (!authStateLocalStorage?.requestToken) {
        router.push("/login");
      }
      dispatch(setPreviousUrl(window.location.href));
      fetchAccessToken();
    }, [api, authStateLocalStorage?.requestToken, fetchAccessToken, router]);

    if (!authStateLocalStorage?.requestToken) {
      return;
    }

    if (!authStateLocalStorage?.accessToken) {
      return;
    }

    return <WrappedComponent ref={ref} {...props} />;
  });
};

export default withAuth;
