// components/KakaoLoginButton.tsx
"use client";

import { supabase } from "@/lib/supabase/client";

export default function KakaoLoginButton() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
    });

    if (error) {
      console.error("Login error:", error);
    }
  };

  return <button onClick={handleLogin}>카카오로 로그인</button>;
}
