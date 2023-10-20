"use client";

import { useAppDispatch, useAppSelector } from "@/app/store";
import { login, setAuth, setJid } from "@/app/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useApi from "@/hooks/api/useApi";

// client side to add interactivity using local state
export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ username: "", password: "" });
  const api = useApi();
  const dispatch = useAppDispatch();
  const { previousUrl } = useAppSelector((state) => state.auth);
  console.log(previousUrl);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(login(api, previousUrl));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type="submit" className="bg-blue-700 p-2 text-white font-bold">
          Login
        </button>
      </div>
    </form>
  );
}
