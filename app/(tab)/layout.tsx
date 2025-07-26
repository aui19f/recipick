"use client";
import Headedr from "@/components/Header";
import Menu from "@/components/Menu";
import { useScrollDirection } from "@/lib/hooks/useScrollDirection";

export default function TabLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isScrollingUp = useScrollDirection();
  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-16 bg-white  transition-transform duration-300 z-50 ${
          isScrollingUp ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Headedr />
      </header>
      <div className="pt-16"> {children}</div>
    </>
  );
}
