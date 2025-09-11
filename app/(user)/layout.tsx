"use client";
import Footer from "@/components/Footer";
import Headedr from "@/components/Header";

import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import ModalWrapper from "@/app/ModalWrapper";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalLoadingOverlay from "@/components/layout/GlobalLoadingOverlay";

export default function MasterLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  const [queryClient] = useState(() => new QueryClient());

  const pathname = usePathname();
  const isWriting = pathname.startsWith("/writing");

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalLoadingOverlay />
      <ReactQueryDevtools initialIsOpen={false} />
      <ModalWrapper modal={modal} />
      <div className="relative min-h-screen ">
        {!isWriting && (
          <div>
            <Headedr />
          </div>
        )}

        <main
          className={`pb-16 sm:pb-0 sm:mt-0  ${
            !isWriting && "mt-16 sm:pl-60"
          } `}
        >
          <div className="max-w-5xl mx-auto p-4">{children}</div>
        </main>

        {!isWriting && (
          <div className="sm:hidden">
            <Footer />
          </div>
        )}
      </div>
    </QueryClientProvider>
  );
}
