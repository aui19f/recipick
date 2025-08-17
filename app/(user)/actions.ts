"use server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export type FeedType = Prisma.feedGetPayload<{ include: { user: true } }>;

export default async function getFeedList(skip = 0, take = 20) {
  try {
    return await db.feed.findMany({
      skip,
      take,
      orderBy: { created_at: "desc" },
      include: { user: true },
    });
  } catch (error) {
    throw new Error(`Feed 조회 실패 ${error}`);
  }
}
