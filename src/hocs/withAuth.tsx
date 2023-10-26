import LoadingSpinner from "@/components/LoadingSpinner";

("use-client");
import React, { useCallback, useEffect } from "react";
import LoginForm from "@/views/LoginScreen/LoginForm";
import { useAuthStore } from "@/store/useAuthStore";
import useAuthApi from "@/hooks/apis/useAuthApi";

const withAuth = (WrappedComponent: any) => {
  return React.forwardRef(function AuthComponent(props, ref) {
    const { requestToken, accessToken, isLoadingAccessToken } =
      useAuthStore() as any;

    const api = useAuthApi();

    const getAccessToken = useCallback(async () => {
      await api.getAccessToken(requestToken);
    }, [api, requestToken]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (requestToken && !accessToken) {
        getAccessToken();
      }
    }, [accessToken, requestToken, getAccessToken]);

    if (isLoadingAccessToken && !accessToken) {
      return <LoadingSpinner />;
    }

    if (!accessToken) {
      return <LoginForm />;
    }

    return <WrappedComponent ref={ref} {...props} />;
  });
};
export default withAuth;
