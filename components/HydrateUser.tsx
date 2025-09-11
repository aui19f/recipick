"use client";
import { typeUsers } from "@/app/actions/getUser";
import db from "@/lib/db";
import { supabase } from "@/lib/supabase/client";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

interface userProps {
  initialUser: typeUsers | null;
}
export default function HydrateUser({ initialUser }: userProps) {
  const { setUser } = useUserStore();
  // SSR 초기값을 Zustand에 세팅
  useEffect(() => {
    console.log("입력");
    setUser(initialUser);
  }, [initialUser, setUser]);

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log("_event", _event);
        if (_event === "SIGNED_IN") {
          // 로그인 발생 시 DB에서 최신 유저 정보 가져오기
          console.log(
            "[로그인 발생 시 DB에서 최신 유저 정보 가져오기]",
            session
          );
          const data = await db.users.findUnique({
            where: { auth: session?.user.id },
          });
          setUser(data);
        } else if (_event === "SIGNED_OUT") {
          console.log("SIGNED_OUT");
          setUser(null);
        }
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [setUser]);

  return null;
}
