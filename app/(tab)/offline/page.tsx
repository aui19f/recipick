import Image from "next/image";
import Link from "next/link";

export default function Offline() {
  return (
    <ul className="flex flex-col gap-6">
      <li className=" bg-gray-100">
        <Link href="/offline/a" className="flex gap-2 items-center">
          <div>
            <div className="bg-gray-200 w-32 aspect-square"></div>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <h3 className="font-bold text-lg">Title</h3>
            <div className="flex">
              <p className="font-bold flex-1">기간</p>
              <p className="text-gray-500 flex-2 flex flex-col ">
                <span>YYYY.MM.DD (요일)</span>
                <span>YYYY.MM.DD (요일)</span>
              </p>
            </div>
            <div className="flex">
              <p className="font-bold flex-1">시간</p>
              <p className="flex-2">
                <span className="text-gray-500 ">10:00 ~ 18:00</span>
              </p>
            </div>
          </div>
        </Link>
      </li>

      <li className="flex gap-2 items-center bg-gray-100">
        <div>
          <div className="bg-gray-200 w-32 aspect-square"></div>
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <h3 className="font-bold text-lg">Title</h3>
          <div className="flex">
            <p className="font-bold flex-1">기간</p>
            <p className="text-gray-500 flex-2 flex flex-col ">
              <span>YYYY.MM.DD (요일)</span>
              <span>YYYY.MM.DD (요일)</span>
            </p>
          </div>
          <div className="flex">
            <p className="font-bold flex-1">시간</p>
            <p className="flex-2">
              <span className="text-gray-500 ">10:00 ~ 18:00</span>
            </p>
          </div>
        </div>
      </li>

      <li className="flex gap-2 items-center bg-gray-100">
        <div>
          <div className="bg-gray-200 w-32 aspect-square"></div>
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <h3 className="font-bold text-lg">Title</h3>
          <div className="flex">
            <p className="font-bold flex-1">기간</p>
            <p className="text-gray-500 flex-2 flex flex-col ">
              <span>YYYY.MM.DD (요일)</span>
              <span>YYYY.MM.DD (요일)</span>
            </p>
          </div>
          <div className="flex">
            <p className="font-bold flex-1">시간</p>
            <p className="flex-2">
              <span className="text-gray-500 ">10:00 ~ 18:00</span>
            </p>
          </div>
        </div>
      </li>
    </ul>
  );
}
