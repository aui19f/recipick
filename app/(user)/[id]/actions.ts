"use server";
import db from "@/lib/db";

export async function SearchUser(id: string) {
  try {
    const user = await db.users.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new Error("user not found");
    }
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
}
