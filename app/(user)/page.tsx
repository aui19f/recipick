import Feed from "@/components/Feed";
// import db from "@/lib/db";

export default async function Home() {
  return (
    <section className="h-full overflow-auto flex w-full">
      <ul className="p-4 flex flex-col gap-4  w-full mx-auto sm:w-[470px]">
        <Feed />
        <Feed />
        <Feed />
      </ul>
    </section>
  );
}
