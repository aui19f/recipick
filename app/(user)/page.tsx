"use client";

import getFeedList, { FeedType } from "@/app/(user)/actions";
import Feed from "@/components/Feed";
import Button from "@/components/forms/Button";

import { useLoadingStore } from "@/store/loadingStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import db from "@/lib/db";

export default function Home() {
  const { setLoading } = useLoadingStore();
  const [skip, setSkip] = useState(0);
  const take = 20;

  //isFetching, refetch
  const query = useQuery<FeedType[]>({
    queryKey: ["feeds", skip],
    queryFn: async () => await getFeedList(skip, take),
  });

  const handleLoadMore = () => {
    setSkip((prev) => prev + take);
  };

  useEffect(() => {
    if (query.isFetching) setLoading(true);
    else setLoading(false);
  }, [query.isFetching, setLoading]);

  return (
    <section className="flex">
      <ul className="p-4 flex flex-col gap-4  w-full mx-auto sm:w-[470px]">
        {query.data?.map((item) => (
          <Feed key={item.id} {...item} />
        ))}
      </ul>

      {query.data?.length && query.data?.length % 20 === 0 ? (
        <Button onClick={handleLoadMore}>더보기</Button>
      ) : null}
    </section>
  );
}
