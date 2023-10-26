import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "flowbite";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movies app",
  description: "Searching your movies...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
