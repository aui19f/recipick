"use server";
import db from "@/lib/db";
import { uploadImage } from "@/lib/storage";
import { createClient } from "@/lib/supabase/server";
import { parseMoney } from "@/utils/money.utils";
import { EnumRole } from "@prisma/client";
import dayjs from "dayjs";
import { z } from "zod";

const dateRE = /^\d{4}\/\d{2}\/\d{2}$/; // 2025-08-25

const toPgTime = (v: unknown) => {
  const s = String(v ?? "");
  const [h, m] = s.split(":");
  const d = new Date(1970, 0, 1, Number(h), Number(m), 0, 0);
  return Number.isNaN(d.getTime()) ? v : d;
};

const offlineFormSchema = z.object({
  title: z.string().trim().min(1, "제목은 필수입니다."),
  poster: z.array(z.instanceof(File)).min(1, "이미지를 최소 1장 업로드하세요."),

  startDate: z.string().regex(dateRE, "YYYY-MM-DD 형식"),
  endDate: z.string().regex(dateRE, "YYYY-MM-DD 형식"),

  startTime: z.preprocess(toPgTime, z.date()),
  endTime: z.preprocess(toPgTime, z.date()),
  money: z.preprocess(parseMoney, z.number()),
  content: z.string().trim().min(1, "내용은 필수입니다."),
});

export default async function OfflineForm(_: unknown, formData: FormData) {
  // 1. 로그인확인
  const supabase = await createClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError || !session) {
    console.log("로그인된 사용자만 업로드 가능합니다.");
    return { status: 401, message: "로그인된 사용자만 업로드 가능합니다." };
  }

  // 2. 어드민 계정인지 확인 - 현재 로그인된 유저 세션 가져오기
  const dbUser = await db.users.findUnique({
    where: { id: session.user.id },
    select: { role: true, id: true },
  });

  if (!dbUser || dbUser?.role !== EnumRole.ADMIN) {
    console.log("어드민 계정만 업로드 가능합니다.");
    return { status: 401, message: "어드민 계정만 업로드 가능합니다." };
  }

  // 유효성검사
  const inputData = {
    title: formData.get("title"),
    poster: formData.getAll("poster") as File[],

    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),

    money: formData.get("money"),
    content: formData.get("content"),
  };

  const inputResult = await offlineFormSchema.safeParseAsync(inputData);

  if (!inputResult.success) {
    console.log("유효성검사실패");
    return {
      success: false,
    };
  }

  // 디비생성
  const dbData = await db.offline.create({
    data: {
      title: inputResult.data.title, // 행사명
      posters: [],
      content: inputResult.data.content,
      startDate: dayjs(inputResult.data.startDate).toDate(),
      endDate: dayjs(inputResult.data.endDate).toDate(),
      startTime: inputResult.data.startTime,
      endTime: inputResult.data.endTime,
      placeName: "", // 장소명(직접 입력)
      address: "", // 주소(도로명 등)
      price: parseMoney(inputResult.data.money),
      usersId: dbUser.id,
    },
    select: { id: true },
  });
  try {
    const publicUrl = await uploadImage({
      imageFiles: inputResult.data.poster,
      folderName: "offline-poster",
      filePath: "2025",
    });
    // 이미지 업로드

    await db.offline.update({
      where: { id: dbData.id },
      data: {
        posters: [...publicUrl],
      },
    });
  } catch (error) {
    console.error("offline failed:", error);
    await db.offline.delete({
      where: {
        id: dbData?.id,
      },
    });
  }

  return { status: 200, message: "" };
}
