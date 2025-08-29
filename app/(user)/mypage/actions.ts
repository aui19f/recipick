"use server";
import db from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { Prisma } from "@prisma/client";

export type MyListFindManyType = Prisma.PromiseReturnType<
  typeof db.feed.findMany
>;
export async function MyList() {
  //1. 로그인 아이디 가져오기
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) {
      throw new Error("로그인된 사용자만 업로드 가능합니다.");
    }

    //2. feed에서 내가 작성한글가져오기
    return await db.feed.findMany({
      where: { usersId: user.id },
      orderBy: { created_at: "desc" },
    });
  } catch (error) {
    console.log("[err]", error);
    return [];
  }

  // return {
  //   status: 200,
  //   data: [...feeds],
  //   orderBy: { created_at: "desc" },
  // };

  //3. 레시피에서 내가 작성한 글 가져오기
}
