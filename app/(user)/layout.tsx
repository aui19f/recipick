"use client";
import Footer from "@/components/Footer";
import Headedr from "@/components/Header";
import { useLoadingStore } from "@/store/loadingStore";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Spinner from "@/components/Loading";
import ModalWrapper from "@/app/ModalWrapper";

export default function MasterLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  const [queryClient] = useState(() => new QueryClient());
  const { isLoading } = useLoadingStore();
  const pathname = usePathname();
  const isWriting = pathname.startsWith("/writing");

  // QueryClient는 클라이언트에서만 생성

  return (
    <QueryClientProvider client={queryClient}>
      <ModalWrapper modal={modal} />
      <div className="relative min-h-screen ">
        <Headedr />

        <main className="fixed left-0 right-0 bottom-16 top-0 sm:bottom-0 sm:top-20 ">
          {isLoading && <Spinner />}
          {children}
        </main>
        {!isWriting && <Footer />}
      </div>
    </QueryClientProvider>
  );
}
