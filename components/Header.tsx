// components/Header.tsx
"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import Menu from "@/components/layout/Menu";
import { useUserStore } from "@/store/useUserStore";

export default function Header() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user } = useUserStore();
  const Login = () => {
    if (user) {
      //todo LOGOUT
    } else {
      router.push("/login");
    }
  };
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 80) {
        // 스크롤 내릴 때 -> 헤더 숨김
        setHidden(true);
      } else {
        // 스크롤 올릴 때 -> 헤더 보임
        setHidden(false);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, lastScrollY]);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full h-16 bg-white shadow transition-transform duration-300 z-50 sm:w-60 sm:bottom-0 sm:h-auto",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="max-w-4xl mx-auto h-full flex items-center px-4 sm:flex-col">
        <div className="relative h-10 w-24 my-8" onClick={() => redirect("/")}>
          <Image src="/icons/logo_header.png" alt="RECIPICK_LOGO" fill={true} />
        </div>

        <div className="hidden flex-2 sm:flex sm:flex-col">
          <div className="flex-1">
            <Menu />
          </div>

          <div className="cursor-pointer" onClick={Login}>
            <p className="p-4">{user ? "LOGOUT" : "LOGIN"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
