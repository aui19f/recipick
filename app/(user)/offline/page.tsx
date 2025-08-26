"use client";
import getOfflineList, { OfflineFindMany } from "@/app/(user)/offline/actions";
import SummaryList from "@/components/SummaryList";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Event() {
  const { data } = useQuery<OfflineFindMany>({
    queryKey: ["offline"],
    queryFn: async () => await getOfflineList(),
  });

  return (
    <section className="h-full overflow-auto flex">
      <ul className="p-4 flex flex-col gap-4 m-auto w-full sm:w-[470px]">
        {data?.map((_, index) => (
          <Link href="/offline/123" key={index}>
            <SummaryList />
          </Link>
        ))}
      </ul>
    </section>
  );
}
