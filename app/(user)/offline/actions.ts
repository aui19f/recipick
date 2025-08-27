"use server";
import db from "@/lib/db";
import type { Prisma } from "@prisma/client";

export type OfflineFindMany = Prisma.PromiseReturnType<
  typeof db.offline.findMany
>;

export default async function getOfflineList() {
  const today = new Date();
  try {
    const reslut = await db.offline.findMany({
      orderBy: { created_at: "desc" },

      where: {
        endDate: {
          gte: today, // 종료일이 오늘보다 이전
        },
      },
    });

    return reslut;
  } catch (error) {
    console.log(error);
    return [];
  }
}
