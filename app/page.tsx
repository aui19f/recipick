import db from "@/lib/db";

export default async function Home() {
  const testUser = await db.users.count();

  console.log("testuser: ", testUser);
  return <>??</>;
}
