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

// Change `: 'staging'` to `: 'prod'` depending on whether you want AdHoc builds to target staging or prod server.
// const apiMode: ApiMode = __DEV__ ? "staging" : "prod";
const apiMode: ApiMode = "local";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

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
  const { accessToken } = useAppSelector((state) => state.auth);

  // Using a ref for the session token means the Axios instance doesn't get rebuilt whenever the
  // session token is updated. If the Axios request were to be rebuilt, API requests could be
  // executed multiple times.
  const sessionToken = useRef<string | null>(accessToken);
  useLayoutEffect(() => {
    // sessionToken.current = accessToken;
    sessionToken.current =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGExYTUyMzRiMzBkNzBlYjNmNDBlOTgyOTQ4ZGQ3NiIsInN1YiI6IjY1MmQ2NmM3MDI0ZWM4MDBjNzc1NTI1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dwb4jT-inVLN7dxUFgaDrfRnyUOLZFZgdEgzu2_fTWw";
  }, [accessToken]);

  const requestInterceptor = useCallback(
    (config: InternalAxiosRequestConfig) => {
      let newConfig = config;
      // if (sessionToken.current) {
      newConfig = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${sessionToken.current}`,
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGExYTUyMzRiMzBkNzBlYjNmNDBlOTgyOTQ4ZGQ3NiIsInN1YiI6IjY1MmQ2NmM3MDI0ZWM4MDBjNzc1NTI1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dwb4jT-inVLN7dxUFgaDrfRnyUOLZFZgdEgzu2_fTWw`,
        },
      };
      // }
      return newConfig;
    },
    []
  );

  // const responseInterceptor = useCallback(
  //   async (response: AxiosResponse) => {
  //     if (response.headers["x-hotfix-available"]) {
  //       console.info("Hotfix available.");
  //       // dispatch(hotfixAvailable());
  //     }
  //
  //     return response;
  //   },
  //   [dispatch]
  // );
  //
  // const responseErrorInterceptor = useCallback(
  //   async (error: AxiosError) => {
  //     console.warn("Response error intercepted.");
  //
  //     if (error.response?.status === 401) {
  //       console.warn("Not authenticated, attempting to reauthenticate.");
  //
  //       try {
  //         const newToken = "";
  //         // const newToken = await auth().currentUser?.getIdToken();
  //         if (newToken) {
  //           // dispatch(setToken(newToken));
  //           sessionToken.current = newToken;
  //
  //           // Retry the original request, using the new session token.
  //           return retryAxios({
  //             ...error.config,
  //             headers: {
  //               ...error.config?.headers,
  //               Authorization: `Bearer ${newToken}`,
  //             },
  //           });
  //         } else {
  //           throw Error("Could not get new token from Firebase");
  //         }
  //       } catch (refreshError) {
  //         console.warn(`Failed to reauthenticate: ${error}`);
  //         throw error;
  //       }
  //     }
  //
  //     throw error;
  //   },
  //   [dispatch]
  // );

  return useMemo(() => {
    console.info(`API mode ${apiMode}, using ${baseUrl}.`);
    const axios = createAxiosInstance();

    axios.interceptors.request.use(requestInterceptor);

    return axios;
  }, [requestInterceptor]);
}

export default useAxios;
export { apiMode, baseUrl };
