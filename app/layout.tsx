import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hari Chandra Wijaya · Full-stack developer",
  description:
    "Portfolio of Hari Chandra Wijaya. Full-stack developer, CS student at Feng Chia University, building web, Android, and AI-powered tools.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="grain min-h-[100dvh] bg-bg text-fg">{children}</body>
    </html>
  );
}
