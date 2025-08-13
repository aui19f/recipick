export default function SummaryList() {
  return (
    <li className="w-full  border-gray-200 rounded-md shadow-md cursor-pointer">
      <article className="flex">
        <div className="bg-gray-400 w-32 aspect-square rounded-l-md"></div>
        <div className="flex-1 p-2 flex flex-col gap-1">
          <h4 className="text-xl font-bold">Title</h4>

          <div className="flex">
            <p className="font-bold w-12">기간</p>
            <p className="flex-1 whitespace-pre-wrap text-sm">
              YYYY/MM/DD ~ YYYY/MM/DD
            </p>
          </div>
          <div className="flex">
            <p className="font-bold w-12">장소</p>
            <p className="flex-1 whitespace-pre-wrap text-sm">
              코엑스 전시장 4홀
            </p>
          </div>
        </div>
      </article>
    </li>
  );
}
// white-space 속성값
