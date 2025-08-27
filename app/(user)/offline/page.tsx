"use client";
import getOfflineList, { OfflineFindMany } from "@/app/(user)/offline/actions";
import SummaryList from "@/components/SummaryList";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Event() {
  const { data, isPending } = useQuery<OfflineFindMany>({
    queryKey: ["offline"],
    queryFn: async () => await getOfflineList(),
  });

  return (
    <section className="h-full overflow-auto flex">
      {isPending ? "isPending" : null}
      <ul className="p-4 flex flex-col gap-4 mx-auto w-full sm:w-[470px]">
        {data?.map((item) => (
          <Link href="/offline/123" key={item.id}>
            <SummaryList {...item} />
          </Link>
        ))}
      </ul>
    </section>
  );
}
