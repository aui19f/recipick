import db from "@/lib/db";

import { createClient } from "@/lib/supabase/server";

import { Prisma } from "@prisma/client";

export type typeUsers = Prisma.PromiseReturnType<typeof getUser>;

export async function getUser() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("1: No user (auth) information.");
    }

    const userDB = await db.users.findUnique({
      where: { auth: user.id },
    });
    if (!userDB) {
      throw new Error("2: No user (de) information.");
    }
    return userDB;
  } catch (error) {
    console.log("ERROR", error);
    return null;
  }
}

export async function getRecipeByUserId(id: string) {
  try {
    const user = await db.users.findUnique({ where: { id } });
    return await db.recipe.findMany({ where: { usersId: user?.auth } });
  } catch (error) {
    console.log(error);
    throw new Error(`Feed 조회 실패 ${error}`);
  }
}

export async function getFeedByUserId(id: string) {
  try {
    const user = await db.users.findUnique({ where: { id } });
    return await db.feed.findMany({ where: { usersId: user?.auth } });
  } catch (error) {
    console.log(error);
    throw new Error(`Feed 조회 실패 ${error}`);
  }
}
