import Axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
// import { hotfixAvailable } from "../../redux/reducers/uiReducer";
import { ApiMode } from "@/types/apiTypes";
import { useAppDispatch, useAppSelector } from "@/app/store";
// import { setToken } from "../../redux/reducers/appReducer";

const endpoints: Record<ApiMode, string> = {
  local: "http://localhost:8080", // Substitute for your PC's IP address.
  prod: "https://api.product.com", //TODO: update to prod API
  staging: "https://specifyhubstagingapi.azurewebsites.net",
};

// Change `: 'staging'` to `: 'prod'` depending on whether you want AdHoc builds to target staging or prod server.
// const apiMode: ApiMode = __DEV__ ? "staging" : "prod";
const apiMode: ApiMode = "local";
const baseUrl = endpoints[apiMode];

// // @ts-ignore constant comparison.
// if (__DEV__ && apiMode === "prod") {
//   throw Error("Don't target production server for local development.");
// }

const createAxiosInstance = () => {
  return Axios.create({
    baseURL: baseUrl,
    timeout: 20000,
    headers: {
      Accept: "application/json",
    },
  });
};

const retryAxios = createAxiosInstance();

function useAxios() {
  const dispatch = useAppDispatch();
  // const { token } = useAppSelector((state) => state.app);

  // Using a ref for the session token means the Axios instance doesn't get rebuilt whenever the
  // session token is updated. If the Axios request were to be rebuilt, API requests could be
  // executed multiple times.
  // const sessionToken = useRef<string | null>(token);
  // useLayoutEffect(() => {
  //   sessionToken.current = token;
  // }, [token]);

  const requestInterceptor = useCallback(
    (config: InternalAxiosRequestConfig) => {
      let newConfig = config;
      if (sessionToken.current) {
        // const { appVersion, buildVersion } = VersionNumber;
        newConfig = {
          ...config,
          //@ts-ignore - axios ts is broken
          headers: {
            ...config.headers,
            // "X-App-Version": `${appVersion}:${buildVersion}:${Platform.OS}`,
            Authorization: `Bearer ${sessionToken.current}`,
          },
        };
      }
      return newConfig;
    },
    []
  );

  const responseInterceptor = useCallback(
    async (response: AxiosResponse) => {
      if (response.headers["x-hotfix-available"]) {
        console.info("Hotfix available.");
        // dispatch(hotfixAvailable());
      }

      return response;
    },
    [dispatch]
  );

  const responseErrorInterceptor = useCallback(
    async (error: AxiosError) => {
      console.warn("Response error intercepted.");

      if (error.response?.status === 401) {
        console.warn("Not authenticated, attempting to reauthenticate.");

        try {
          const newToken = "";
          // const newToken = await auth().currentUser?.getIdToken();
          if (newToken) {
            // dispatch(setToken(newToken));
            sessionToken.current = newToken;

            // Retry the original request, using the new session token.
            return retryAxios({
              ...error.config,
              headers: {
                ...error.config?.headers,
                Authorization: `Bearer ${newToken}`,
              },
            });
          } else {
            throw Error("Could not get new token from Firebase");
          }
        } catch (refreshError) {
          console.warn(`Failed to reauthenticate: ${error}`);
          throw error;
        }
      }

      throw error;
    },
    [dispatch]
  );

  return useMemo(() => {
    console.info(`API mode ${apiMode}, using ${baseUrl}.`);
    const axios = createAxiosInstance();

    axios.interceptors.request.use(requestInterceptor);
    axios.interceptors.response.use(
      responseInterceptor,
      responseErrorInterceptor
    );
    return axios;
  }, [requestInterceptor, responseInterceptor, responseErrorInterceptor]);
}

export default useAxios;
export { apiMode, baseUrl };
