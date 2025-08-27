/**
 * app/layout.tsx는 기본적으로 서버 컴포넌트
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import getUser from "@/app/actions/getUser";
import HydrateUser from "@/components/HydrateUser";
import LoadingProvider from "@/components/LoadingProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RECIPiCK",
  description: "RECIPiCK App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en">
      <body
        className={`flex flex-col h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HydrateUser user={user} />
        <LoadingProvider>{children}</LoadingProvider>
      </body>
    </html>
  );
}
