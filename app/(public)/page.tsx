import Feed from "@/components/Feed";
import db from "@/lib/db";

export default async function Home() {
  const testUser = await db.users.count();

  console.log("testuser: ", testUser);
  return (
    <section className="h-full overflow-auto flex">
      <ul className="p-4 flex flex-col gap-4 m-auto sm:w-[470px]">
        <Feed />
        <Feed />
        <Feed />
      </ul>
    </section>
  );
}
