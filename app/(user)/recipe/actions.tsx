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

export type sequenceType = {
  id: string;
  process: string;
};

export type RecipeType = Prisma.recipeGetPayload<{
  include: { user: true };
}> & {
  ingredient: ingredientType[];
  sequence: sequenceType[];
};

export async function getRecipeAll(skip = 0, take = 20) {
  try {
    return await db.recipe.findMany({
      skip,
      take,
      orderBy: { created_at: "desc" },
      include: { user: true },
    });
  } catch (error) {
    console.log(error);
    return { data: [] };
  }
}

export async function getRecipeById(id: string) {
  try {
    return await db.recipe.findUnique({
      where: { id },
      include: { user: true },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
