"use client";

import { getRecipeById, RecipeType } from "@/app/(user)/recipe/actions";
import IngredientViewer from "@/components/IngredientViewer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

// const initialTest = [
//   { id: "a", name: "박력분", capacity: 250, unit: "g", isMain: true },
//   { id: "b", name: "소금", capacity: 2, unit: "g" },
//   { id: "c", name: "무염버터", capacity: 50, unit: "g" },
//   { id: "d", name: "우유", capacity: 9, unit: "g" },
//   { id: "e", name: "설탕", capacity: 25, unit: "g" },
//   { id: "f", name: "베이킹파우더", capacity: 5, unit: "g" },
//   { id: "g", name: "달걀", capacity: 40, unit: "g" },
// ];

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  // 1. 캐시에서 데이터 가져오기
  const cachedRecipes = queryClient.getQueryData<RecipeType[]>(["recipes"]);
  const recipeFromCache = cachedRecipes?.find((r) => r.id === id);

  //캐시에 없으면 API 호출
  const { data, isLoading } = useQuery<RecipeType>({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeById(id),
    enabled: !recipeFromCache, // 캐시 있으면 호출 안 함
  });

  const recipe = recipeFromCache || data;

  if (isLoading) return <p>Loading...</p>;
  if (!recipe) return <p>Not found</p>;

  return (
    <div className="max-w-2xl mx-auto h-full overflow-auto flex flex-col p-2 gap-2 ">
      <h2 className="text-2xl font-bold">{recipe.title || "Title"}</h2>
      <div className="aspect-square bg-gray-200 relative">
        <Image alt={recipe.title} src={recipe.images[0]} fill={true} />
      </div>
      <div>
        <h4 className="text-lg font-bold">재료</h4>
        <ul>
          {recipe.ingredient && (
            <IngredientViewer ingredients={recipe.ingredient} />
          )}
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-bold">순서</h4>

        <ol className="list-lower-alpha">
          {recipe.sequence &&
            recipe.sequence.map(
              (item: { id: string; process: string }, index: number) => (
                <li key={item.id} className="flex items-center gap-2">
                  {index + 1}. {item.process}
                </li>
              )
            )}
        </ol>
      </div>
      <div>
        <h4 className="text-lg font-bold">메모</h4>
        <p>{recipe?.memo || ""}</p>
      </div>
    </div>
  );
}
