import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthType = {
  requestToken: string;
  accessToken: string;
  previousUrl: string;
  isLoadingAccessToken: boolean;
};

const initialState = {
  requestToken: undefined,
  accessToken: undefined,
  previousUrl: undefined,
  isLoadingAccessToken: false,
};

export const useAuthStore = create(
  persist(
    (set) => ({
      ...initialState,
      setRequestToken: (requestToken: string) =>
        set((state: AuthType) => ({ requestToken })),
      setAccessToken: (accessToken: string) =>
        set((state: AuthType) => ({ accessToken })),
      setPreviousUrl: (previousUrl: string) =>
        set((state: AuthType) => ({ previousUrl })),
      setIsLoadingAccessToken: (isLoadingAccessToken: boolean) =>
        set((state: AuthType) => ({ isLoadingAccessToken })),
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
