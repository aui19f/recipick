"use client";

import Profile from "@/components/Profile";
import { useUserStore } from "@/store/useUserStore";

// import { usePathname } from "next/navigation";
import { redirect } from "next/navigation";
export default function MasterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const pathname = usePathname();
  const { user } = useUserStore();
  if (!user) {
    // redirect("/login");
  }
  return (
    <section>
      <Profile {...user} />
      {/* todo
      <ul>
        <li>작성한글</li>
        <li>좋아요</li>
        <li>저장</li>
      </ul> */}
      <div>{children}</div>
    </section>
  );
}
