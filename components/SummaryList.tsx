"use client";
import dayjs from "dayjs";
import Image from "next/image";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface SummaryProps {
  title: string;
  posters: string[];
  placeName: string;
  startDate: Date;
  endDate: Date;
}
export default function SummaryList({
  title,
  posters,
  placeName,
  startDate,
  endDate,
}: SummaryProps) {
  const isDday = (start: Date, end: Date): boolean => {
    const today = dayjs();
    const startDate = dayjs(start);
    const endDate = dayjs(end);

    if (
      today.isSameOrAfter(startDate, "day") &&
      today.isSameOrBefore(endDate, "day")
    ) {
      return true;
    }

    return false;
  };
  return (
    <li className="w-full  border-gray-200 rounded-md shadow-md cursor-pointer">
      <article className="flex relative">
        <div className="bg-gray-400 w-32 aspect-square rounded-l-md relative">
          <Image src={posters[0]} alt={title} fill={true} />
        </div>
        <div className="flex-1 p-2 flex flex-col gap-1">
          <h4 className="text-xl font-bold">{title}</h4>

          <div className="flex">
            <p className="font-bold w-12">기간</p>
            <p className="flex-1 whitespace-pre-wrap text-sm">
              {dayjs(startDate).format("YYYY/MM/DD")} ~{" "}
              {dayjs(endDate).format("YYYY/MM/DD")}
            </p>
          </div>
          <div className="flex">
            <p className="font-bold w-12">장소</p>
            <p className="flex-1 whitespace-pre-wrap text-sm">{placeName}</p>
          </div>
        </div>
        {isDday(startDate, endDate) && (
          <span className="absolute bottom-2 right-2 bg-red-200 text-sm p-1 rounded-sm">
            진행중
          </span>
        )}
      </article>
    </li>
  );
}
// white-space 속성값
