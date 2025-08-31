// components/Header.tsx
"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
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
  }, [lastScrollY]);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full h-16 bg-white shadow transition-transform duration-300 z-50",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="max-w-4xl mx-auto h-full flex items-center px-4">
        <div className="relative h-10 w-24" onClick={() => redirect("/")}>
          <Image src="/icons/logo_header.png" alt="RECIPICK_LOGO" fill={true} />
        </div>
        <div className="flex-2"></div>
      </div>
    </header>
  );
}
