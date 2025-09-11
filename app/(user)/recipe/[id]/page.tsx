"use client";

import { getRecipeById, RecipeType } from "@/app/(user)/recipe/actions";
import IngredientViewer from "@/components/IngredientViewer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  // 1. 캐시에서 데이터 가져오기
  const cachedRecipes = queryClient.getQueryData<RecipeType[]>(["recipes"]);
  const recipeFromCache = cachedRecipes?.find((r) => r.id === id);

  //캐시에 없으면 API 호출
  const { data, isLoading } = useQuery<RecipeType | null>({
    queryKey: ["recipe", id],
    queryFn: async () => (await getRecipeById(id)) as RecipeType | null,
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
