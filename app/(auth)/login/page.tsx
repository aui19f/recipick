"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const [user, setUser] = useState<unknown>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user", user);
      setUser(user);
    };

    getUser();
  }, []);

  return (
    <main>
      {user ? null : (
        <button
          className="bg-amber-400"
          onClick={() => supabase.auth.signInWithOAuth({ provider: "kakao" })}
        >
          카카오로 로그인
        </button>
      )}
    </main>
  );
}
