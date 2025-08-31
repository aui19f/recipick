"use server";

import { getUser } from "@/app/actions/getUser";
import db from "@/lib/db";
import { uploadImage } from "@/lib/storage";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const feedSchema = z.object({
  content: z
    .string()
    .min(5, "글은 최소 5자 이상이어야 합니다.")
    .max(200, "글은 최대 200자입니다."),
  images: z
    .array(z.instanceof(File))
    .max(10, "이미지는 최대 10장까지 업로드 가능합니다."),
});

export default async function insertWriteShow(content: string, images: File[]) {
  const supabase = await createClient();

  // 1. 로그인 체크 및 아이디 가져오기
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError || !session) {
    return { status: 401, message: "로그인된 사용자만 업로드 가능합니다." };
  }
  // else {
  //   console.log("로그인사용자");
  // }

  // 현재 로그인된 유저 세션 가져오기

  const user = await getUser();
  if (!user) {
    return { status: 401, message: "로그인된 사용자만 업로드 가능합니다." };
  }

  // 1. 입력값 유효성 검사
  const parseResult = await feedSchema.safeParseAsync({ content, images });
  if (!parseResult.success) {
    return { status: 400, message: "글을 최소 5글자 최대 200글자 입니다." };
  }
  let feedData;
  try {
    //2. 디비저장
    feedData = await db.feed.create({
      data: {
        content,
        images: [],
        usersId: user.id,
      },
      select: { id: true },
    });

    //3. todo : tag

    if (images.length > 0) {
      const publicUrl = await uploadImage({
        imageFiles: images,
        folderName: "feed-images",
        filePath: feedData.id,
      });

      // 5. 이미지 업데이트
      await db.feed.update({
        where: { id: feedData.id },
        data: {
          images: [...publicUrl],
        },
      });
    }
  } catch (err) {
    console.error("Upload failed:", err);
    await db.feed.delete({
      where: {
        id: feedData?.id,
      },
    });
    return {
      status: 500,
      message: "이미지 업로드가 실패하였습니다. 다시 시도해주시기 바랍니다.",
    };
  }

  return {
    status: 200,
    message: "",
  };
}
