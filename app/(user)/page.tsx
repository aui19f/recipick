"use client";

import getFeedList, { FeedType } from "@/app/(user)/actions";
import Feed from "@/components/Feed";
import Button from "@/components/forms/Button";

import { useLoadingStore } from "@/store/loadingStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import db from "@/lib/db";

export default function Home() {
  const { loadingStart, loadingEnd } = useLoadingStore();
  // const [skip, setSkip] = useState(0);
  const take = 20;

  //isFetching, refetch
  const query = useQuery({
    queryKey: ["feeds", 0],
    queryFn: async () => await getFeedList(0, take),
  });

  // const handleLoadMore = () => {
  //   setSkip((prev) => prev + take);
  // };

  useEffect(() => {
    if (query.isFetching) loadingStart();
    else loadingEnd();
  }, [query.isFetching, loadingStart, loadingEnd]);

  return (
    <section className="h-full overflow-auto flex w-full">
      {query.error && <p>{query.error.toString()}</p>}

      {/* <ul className="p-4 flex flex-col gap-4  w-full mx-auto sm:w-[470px]">
        {query.data?.map((item) => (
          <Feed key={item.id} {...item} />
        ))}
      </ul>

      {query.data?.length && query.data?.length % 20 === 0 && (
        <Button onClick={handleLoadMore}>더보기</Button>
      )} */}
    </section>
  );
}
