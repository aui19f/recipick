"use client";
import getRecipeAll, { RecipeType } from "@/app/(user)/recipe/actions";
import Button from "@/components/forms/Button";
import { useLoadingStore } from "@/store/loadingStore";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Recipe() {
  const { setLoading } = useLoadingStore();
  const [skip, setSkip] = useState(0);
  const take = 40;

  const query = useQuery<RecipeType[]>({
    queryKey: ["recipes", skip],
    queryFn: async () => await getRecipeAll(skip, take),
  });

  const handleLoadMore = () => {
    setSkip((prev) => prev + take);
  };

  useEffect(() => {
    if (query.isFetching) setLoading(true);
    else setLoading(false);
  }, [query.isFetching, setLoading]);

  return (
    <section>
      <ul className="grid  gap-8 grid-cols-1 sm:grid-cols-3 sm:gap-6">
        {query.data?.map((item) => (
          <li key={item.id} className="flex flex-col gap-1">
            <Link href="recipe/123">
              <div className="relative ">
                <div className="aspect-square bg-gray-200">
                  {item.images[0] ? (
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                {/* <div className="absolute top-1 right-1 flex items-center gap-1 py-1 px-2 bg-gray-600 rounded-lg">
                  <Image
                    src="/icons/button_like_active.png"
                    width={16}
                    height={16}
                    alt="좋아요"
                  />
                  <span className="text-sm">1</span>

                  <Image
                    src="/icons/button_bookmark_active.png"
                    width={16}
                    height={16}
                    alt="좋아요"
                  />
                  <span className="text-sm">1</span>
                </div> */}
              </div>

              <div className="flex items-end">
                <h4 className="flex-1 font-bold">{item.title}</h4>
                <div className="text-sm">
                  {dayjs(item.created_at).format("YY/MM/DD")}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {query.data?.length && query.data?.length % 20 === 0 ? (
        <Button onClick={handleLoadMore}>더보기</Button>
      ) : null}
    </section>
  );
}
