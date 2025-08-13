"use client";
import Footer from "@/components/Footer";
import Headedr from "@/components/Header";
import { useLoadingStore } from "@/store/loadingStore";
import { usePathname } from "next/navigation";

export default function MasterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isLoading } = useLoadingStore();
  const pathname = usePathname();
  const isWriting = pathname.startsWith("/writing");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen ">
      <Headedr />
      {!isWriting && <Footer />}

      <main className="fixed left-0 right-0 bottom-16 top-0 sm:bottom-0 sm:top-20 ">
        {isLoading && <h1 className="flex top-4 text-9xl">Loading...</h1>}
        {children}
      </main>
    </div>
  );
}
