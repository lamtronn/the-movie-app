"use client";

import { useCallback } from "react";
import { TMDB_BASE_URL } from "@/constants/config";
import { useAuthStore } from "@/store/useAuthStore";
import useAuthApi from "@/hooks/apis/useAuthApi";

export default function LoginForm() {
  const api = useAuthApi();
  const { setRequestToken } = useAuthStore() as {
    setRequestToken: (value: string) => void;
  };

  const handleSubmit = useCallback(async () => {
    const requestTokenResponse = await api.getRequestToken(
      window.location.href,
    );
    const requestTokenResult = requestTokenResponse.data;
    setRequestToken(requestTokenResult.request_token);
    window.location.replace(
      `${TMDB_BASE_URL}/auth/access?request_token=${requestTokenResult.request_token}`,
    );
  }, [api, setRequestToken]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <p className="w-50 text-7xl text-center font-black mb-4">
        Searching big movies, hit series and more.
      </p>
      <button
        onClick={handleSubmit}
        className="bg-blue-700 p-2 text-white font-bold"
      >
        Login with TMDB
      </button>
    </div>
  );
}
