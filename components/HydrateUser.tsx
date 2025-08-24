"use client";
/**
 * Zustand는 메모리 기반 상태관리 => 새로고침했을 경우 로그인 정보가 없다.
 * 서버 세션과 동기화 작업 - 로그인 상태는 서버세션에 저장하고, zustand sotre에 다시 넣어줌
 * const user = await getUser(); // 서버 세션 조회
 */
// "use client";
// import { useEffect } from "react";

import { useUserStore } from "@/sotre/useUserStore";
import { useEffect, useState } from "react";

import { typeUsers } from "@/app/actions/getUser";
import Loading from "@/app/loading";

interface userProps {
  user: typeUsers | null;
}
export default function HydrateUser({ user }: userProps) {
  const setUser = useUserStore((s) => s.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) setUser(user);
    setLoading(false);
  }, [user, setUser]);
  if (loading) return <Loading />;
  return null;
}
