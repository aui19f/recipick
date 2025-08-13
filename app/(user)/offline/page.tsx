import SummaryList from "@/components/SummaryList";
import Link from "next/link";

export default function Event() {
  return (
    <section className="h-full overflow-auto flex">
      <ul className="p-4 flex flex-col gap-4 m-auto w-full sm:w-[470px]">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Link href="/offline/123" key={index}>
              <SummaryList />
            </Link>
          ))}
      </ul>
    </section>
  );
}
