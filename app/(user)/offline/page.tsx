"use client";
import getOfflineList, { OfflineFindMany } from "@/app/(user)/offline/actions";
import SummaryList from "@/components/SummaryList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function Event() {
  const queryClient = useQueryClient();

  const { data } = useQuery<OfflineFindMany>({
    queryKey: ["offline"],
    queryFn: async () => await getOfflineList(),
  });
  // 데이터가 로드된 후 각 아이템을 캐시에 저장
  const handleItemClick = (item: OfflineFindMany[0]) => {
    // 클릭 시점에 해당 아이템을 캐시에 저장
    queryClient.setQueryData(["offline", item.id], item);
  };

  return (
    <section className="h-full overflow-auto flex">
      {/* {isPending ? "isPending" : null} */}
      <ul className="p-4 flex flex-col gap-4 mx-auto w-full sm:w-[470px]">
        {data?.map((item) => (
          <Link
            href={`offline/${item.id}`}
            key={item.id}
            onClick={() => handleItemClick(item)}
          >
            <SummaryList {...item} />
          </Link>
        ))}
      </ul>
    </section>
  );
}
