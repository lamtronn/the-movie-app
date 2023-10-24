"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  });

  return (
    <main>
      <div className="w-full h-16 bg-black"></div>
    </main>
  );
}
