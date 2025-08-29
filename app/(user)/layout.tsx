"use client";
import Footer from "@/components/Footer";
import Headedr from "@/components/Header";

import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import ModalWrapper from "@/app/ModalWrapper";

export default function MasterLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  const [queryClient] = useState(() => new QueryClient());

  const pathname = usePathname();
  const isWriting = pathname.startsWith("/writing");

  return (
    <QueryClientProvider client={queryClient}>
      <ModalWrapper modal={modal} />
      <div className="relative min-h-screen ">
        {!isWriting && <Headedr />}
        <main className={`pb-16 ${!isWriting && "mt-16"}`}>{children}</main>
        {!isWriting && <Footer />}
      </div>
    </QueryClientProvider>
  );
}
