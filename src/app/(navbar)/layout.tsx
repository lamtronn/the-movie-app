"use client";
import Navbar from "@/components/Navbar";
import ErrorBoundary from "@/hocs/ErrorBoundary";

export default function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <main>
        <div className="w-full h-16 bg-black">
          <Navbar />
        </div>
        {children}
      </main>
    </ErrorBoundary>
  );
}
