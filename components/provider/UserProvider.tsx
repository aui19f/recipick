"use client";

import { typeUsers } from "@/app/actions/getUser";
import { useUserStore } from "@/sotre/useUserStore";
import { useEffect } from "react";

interface Props {
  user: typeUsers | null;
  children?: React.ReactNode;
}

export function UserProvider({ user, children }: Props) {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return <>{children}</>;
}
