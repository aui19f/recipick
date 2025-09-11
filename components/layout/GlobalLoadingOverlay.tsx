// components/GlobalLoadingOverlay.tsx
"use client";
import Loading from "@/components/Loading";
import { useIsMutating } from "@tanstack/react-query"; //useIsFetching

export default function GlobalLoadingOverlay() {
  // const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  // const isLoading = isFetching > 0 || isMutating > 0;
  const isLoading = isMutating > 0;

  if (!isLoading) return null;

  return <Loading />;
}
