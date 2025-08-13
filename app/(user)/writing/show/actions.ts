// import db from "@/lib/db";
import { z } from "zod";

const postSchema = z.object({
  content: z.string().max(200),
  imageUrl: z.string().url(),
});
export default async function insertWriteShow(formData: FormData) {
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string;

  const parsed = postSchema.safeParse({ content, imageUrl });
  if (!parsed.success) throw new Error("Invalid data");

  return {};
  // return db.post.create({
  //   data: parsed.data,
  // });
}
