// app/auth/callback/page.tsx

"use client";

import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
// import db from "@/lib/db";

export default function AuthCallbackPage() {
  // const router = useRouter();

  useEffect(() => {
    const checkProfile = async () => {
      const {
        data: { session },
        error: sesstionErr,
      } = await supabase.auth.getSession();

      if (session) {
        console.log("콜백 페이지: 로그인 성공!");
        // 세션이 유효하면 부모 창에 메시지 전송
        if (window.opener) {
          window.opener.postMessage(
            { type: "AUTH_SUCCESS", session: session },
            window.location.origin
          );
          // 팝업 창 닫기
          window.close();
        }
      } else if (sesstionErr) {
        console.error("콜백 페이지: 로그인 오류:", sesstionErr.message);
        // 오류 발생 시 부모 창에 오류 메시지 전송 (선택 사항)
        if (window.opener) {
          window.opener.postMessage(
            { type: "AUTH_ERROR", error: sesstionErr.message },
            window.location.origin
          );
          window.close();
        }
      } else {
        console.warn("콜백 페이지: 세션 정보 없음. 로그인 취소 또는 실패.");
        // 세션이 없으면 로그인 취소 또는 실패로 간주하고 부모 창에 알림 (선택 사항)
        if (window.opener) {
          window.opener.postMessage(
            { type: "AUTH_CANCELLED" },
            window.location.origin
          );
          window.close();
        }
      }
    };

    checkProfile();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">로그인 확인 중입니다...</p>
    </div>
  );
}
