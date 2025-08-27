// components/LoadingProvider.tsx
"use client";

import Loading from "@/components/Loading";
import { useLoadingStore } from "@/store/loadingStore";

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoading = useLoadingStore((s) => s.isLoading);

  return (
    <>
      {children}
      {isLoading && <Loading />}
    </>
  );
}
