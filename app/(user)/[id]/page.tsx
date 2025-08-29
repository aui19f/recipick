"use client";

import { MyList, MyListFindManyType } from "@/app/(user)/mypage/actions";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";

// {Array.from({ length: 10 }, (_, index) => (
export default function Mypage() {
  const { data } = useQuery<MyListFindManyType>({
    queryKey: ["mylist'"],
    queryFn: () => MyList(),
  });
  return (
    <article>
      <ul className="grid grid-cols-3 gap-1 px-1">
        {data &&
          data?.map((item) => (
            <li key={item.id} className="bg-gray-200 aspect-square relative">
              <Image
                src={item.images[0]}
                alt={dayjs(item.created_at).format("YYYY/MM/DD")}
                fill={true}
              />
            </li>
          ))}
      </ul>
    </article>
  );
}
