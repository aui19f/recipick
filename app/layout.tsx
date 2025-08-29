/**
 * app/layout.tsx는 기본적으로 서버 컴포넌트
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import getUser from "@/app/actions/getUser";
import HydrateUser from "@/components/HydrateUser";
import LoadingProvider from "@/components/LoadingProvider";
import { createClient } from "@/lib/supabase/server";
import db from "@/lib/db";

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
  // 서버에서 Supabase client 생성
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const dbUser = user
    ? await db.users.findUnique({
        where: { auth: user.id },
      })
    : null;

  return (
    <html lang="en">
      <body
        className={`flex flex-col h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HydrateUser initialUser={dbUser} />
        <LoadingProvider>{children}</LoadingProvider>
      </body>
    </html>
  );
}
