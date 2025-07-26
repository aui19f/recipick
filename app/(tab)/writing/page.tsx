"use client";

import { useEffect, useState } from "react";

export default function DeviceInfo() {
  const [isFocused, setIsFocused] = useState(false);
  const [device, setDevice] = useState<"android" | "ios" | "other">("other");

  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [initialHeight, setInitialHeight] = useState<number | null>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();

      if (/iphone|ipad|ipod/.test(ua)) {
        setDevice("ios");
      } else if (/android/.test(ua)) {
        setDevice("android");
      }
    }
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (!initialHeight) return;
      const heightDiff = initialHeight - window.innerHeight;
      setKeyboardOpen(heightDiff > 150); // 150px 이상 줄어들면 키보드 열린 것으로 판단
    };

    setInitialHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initialHeight]);
  return (
    <>
      {device === "ios" ? (
        <div className="p-4">
          <textarea
            rows={4}
            className="w-full border p-3 rounded mb-20"
            placeholder="내용을 입력하세요"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {isFocused && (
            <div className="fixed bottom-[300px] left-0 w-full px-4 z-50">
              <button className="w-full bg-blue-500 text-white py-3 rounded">
                📎 사진 첨부
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4">
          <textarea
            className="w-full border p-3 rounded mb-20"
            rows={4}
            placeholder="내용을 입력하세요..."
          />

          {keyboardOpen && (
            <div className="fixed bottom-[300px] left-0 w-full px-4">
              <button className="w-full bg-blue-500 text-white py-3 rounded">
                📎 사진 첨부
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
