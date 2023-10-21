"use client";

import { useAppDispatch, useAppSelector } from "@/app/store";
import { login } from "@/app/store/slices/authSlice";
import { useCallback, useState } from "react";
import useApi from "@/hooks/api/useApi";

export default function LoginForm() {
  const api = useApi();
  const dispatch = useAppDispatch();
  const { previousUrl } = useAppSelector((state) => state.auth);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await dispatch(login(api, previousUrl || "http://localhost:3000/home"));
    },
    [api, dispatch, previousUrl]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type="submit" className="bg-blue-700 p-2 text-white font-bold">
          Login with TMDB
        </button>
      </div>
    </form>
  );
}
