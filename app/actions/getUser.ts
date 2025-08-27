import db from "@/lib/db";

import { createClient } from "@/lib/supabase/server";

import { Prisma } from "@prisma/client";

export type typeUsers = Prisma.PromiseReturnType<typeof getUser>;

export default async function getUser() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    try {
      const userDB = await db.users.findUnique({
        where: { id: user.id },
      });

      if (!userDB) return null;
      return { ...userDB };
    } catch (error) {
      throw new Error("2: No user information.", { cause: error });
    }
  } catch (error) {
    console.log("ERROR", error);
  }
}
