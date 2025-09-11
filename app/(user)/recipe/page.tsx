"use client";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getRecipeAll, RecipeType } from "@/app/(user)/recipe/actions";
import Button from "@/components/forms/Button";
import { useLoadingStore } from "@/store/loadingStore";
import PreviewImages from "@/components/PreviewImages";

export default function Recipe() {
  const { setLoading } = useLoadingStore();
  const [skip, setSkip] = useState(0);
  const take = 20;

  // 서버에서 가져온 데이터를 캐싱 -  불필요한 네트워크 요청을 감소
  const recipeList = useQuery<RecipeType[]>({
    queryKey: ["recipes", skip],
    queryFn: async () => (await getRecipeAll(skip, take)) as RecipeType[],
    staleTime: 1000 * 60, // 1분동안 동일 쿼리 요청시 캐시된 데이터 반환
  });

  // 무료버전을 사용 중이니, 아직까진 버튼으로 데이터 가져오기
  const handleLoadMore = () => {
    setSkip((prev) => prev + take);
  };

  useEffect(() => {
    if (recipeList.isFetching) setLoading(true);
    else setLoading(false);
  }, [recipeList.isFetching, setLoading]);

  if (recipeList.error) return <p>준비된 레시피가 없습니다.</p>;

  return (
    <section>
      <ul className="grid  gap-8 grid-cols-1 sm:grid-cols-3 sm:gap-6">
        {recipeList.data?.map((item) => (
          <li key={item.id} className="flex flex-col gap-1">
            <Link href={`recipe/${item.id}`}>
              <PreviewImages images={item.images || []} />

              <div className="flex items-end">
                <h4 className="flex-1 font-bold">{item.title}</h4>
                <p className="text-sm">
                  {dayjs(item.created_at).format("YY/MM/DD")}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {recipeList.data &&
      recipeList.data.length > 0 &&
      recipeList.data.length % 20 === 0 ? (
        <Button onClick={handleLoadMore}>더보기</Button>
      ) : null}
    </section>
  );
}
