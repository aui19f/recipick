"use client";
import { useEffect, useState, useRef } from "react";

export function useScrollDirection(threshold = 0) {
  const [scrollUp, setScrollUp] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY.current) < threshold) {
        return; // 너무 작은 변화는 무시
      }
      setScrollUp(currentScrollY < lastScrollY.current || currentScrollY < 10);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrollUp;
}
