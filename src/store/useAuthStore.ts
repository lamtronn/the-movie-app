import { create } from "zustand";
import { persist } from "zustand/middleware";

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
      setRequestToken: (requestToken) => set((state) => ({ requestToken })),
      setAccessToken: (accessToken) => set((state) => ({ accessToken })),
      setPreviousUrl: (previousUrl) => set((state) => ({ previousUrl })),
      setIsLoadingAccessToken: (isLoadingAccessToken) =>
        set((state) => ({ isLoadingAccessToken })),
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
