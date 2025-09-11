"use server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export type ingredientType = {
  id: string;
  name: string;
  unit: string;
  capacity: number;
  isMain: boolean;
};
export type RecipeType = Prisma.recipeGetPayload<{
  include: { user: true };
}> & {
  ingredient: ingredientType[];
  sequence: {
    id: string;
    process: string;
  }[];
};

export default async function getRecipeAll(skip = 0, take = 20) {
  try {
    return await db.recipe.findMany({
      skip,
      take,
      orderBy: { created_at: "desc" },
      include: { user: true },
    });
  } catch (error) {
    console.log(error);
    throw new Error(`Feed 조회 실패 ${error}`);
  }
}

// 단일 조회
export async function getRecipeById(id: string) {
  try {
    return await db.recipe.findUnique({ where: { id } });
  } catch (error) {
    console.log(error);
    throw new Error(`Feed 조회 실패 ${error}`);
  }
}
