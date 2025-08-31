"use server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export type FeedType = Prisma.feedGetPayload<{ include: { user: true } }>;

export async function getFeedList(skip = 0, take = 20) {
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

export async function getUserFeedList(skip = 0, take = 20, userid = "") {
  try {
    return await db.feed.findMany({
      where: { usersId: userid },
      skip,
      take,
      orderBy: { created_at: "desc" },
      include: { user: true },
    });
  } catch (error) {
    throw new Error(`Feed 조회 실패 ${error}`);
  }
}

// 특정 사용자의 전체 피드 개수를 가져오는 함수 추가
export async function getUserFeedCount(userid: string) {
  try {
    return await db.feed.count({
      where: { usersId: userid },
    });
  } catch (error) {
    throw new Error(`Feed 개수 조회 실패 ${error}`);
  }
}
