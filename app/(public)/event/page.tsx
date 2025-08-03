import SummaryList from "@/components/SummaryList";

export default function Event() {
  return (
    <section className="h-full overflow-auto flex">
      <ul className="p-4 flex flex-col gap-4 m-auto sm:w-[470px]">
        <SummaryList />
        <SummaryList />
        <SummaryList />
        <SummaryList />
        <SummaryList />
        <SummaryList />
        <SummaryList />
        <SummaryList />
        <SummaryList />
        <SummaryList />
      </ul>
    </section>
  );
}
