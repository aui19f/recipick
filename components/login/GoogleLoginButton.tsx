// components/GoogleLoginButton.tsx
"use client";

import { supabase } from "@/lib/supabase/client";

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/callback",
        skipBrowserRedirect: true,
      },
    });

    if (error) {
      console.error("로그인 실패:", error.message);
    }
    if (data && data.url) {
      // 새 팝업 창을 띄웁니다.
      const popup = window.open(data.url, "_blank", "width=600,height=700");

      // 팝업 창이 닫혔을 때 또는 로그인 완료 후 처리 (선택 사항)
      // 팝업이 닫히거나 콜백 페이지로 리다이렉션된 후 부모 창에서 세션 확인
      const checkSessionInterval = setInterval(async () => {
        // 팝업이 닫혔는지 확인
        if (popup && popup.closed) {
          clearInterval(checkSessionInterval);
          console.log("팝업 창이 닫혔습니다.");
          // 세션 확인 로직 실행 (예: supabase.auth.getSession())
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session) {
            console.log("로그인 성공:", session.user);
            // 로그인 성공 후 페이지 이동 등의 로직 추가
          } else {
            console.log("로그인 실패 또는 취소됨");
          }
        }
      }, 1000); // 1초마다 팝업 상태 확인
    }
  };

  return <button onClick={handleGoogleLogin}>구글로 로그인 / 회원가입</button>;
}
