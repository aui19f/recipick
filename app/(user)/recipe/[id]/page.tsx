"use client";

import SelectBox from "@/components/forms/SelectBox";
import Image from "next/image";
import { useState } from "react";

const initialTest = [
  { id: "a", name: "박력분", capacity: 250, unit: "g", isMain: true },
  { id: "b", name: "소금", capacity: 2, unit: "g" },
  { id: "c", name: "무염버터", capacity: 50, unit: "g" },
  { id: "d", name: "우유", capacity: 9, unit: "g" },
  { id: "e", name: "설탕", capacity: 25, unit: "g" },
  { id: "f", name: "베이킹파우더", capacity: 5, unit: "g" },
  { id: "g", name: "달걀", capacity: 40, unit: "g" },
];

const ratio = [0.5, 0.75, 1, 1.5, 2];

export default function Details() {
  const [isLike, setIsLike] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isSend, setIsSend] = useState(false);

  // 상태 관리: 선택된 비율과 변경된 재료 목록
  const [selectedRatio, setSelectedRatio] = useState("1");
  const [test, setTest] = useState(initialTest);

  // `isMain`이 true인 재료의 기준 용량을 찾습니다.
  const mainItem = initialTest.find((item) => item.isMain);

  // SelectBox에 들어갈 비율 옵션을 생성합니다.
  const ratioOptions = ratio.map((x) => ({
    id: x.toString(),
    label: (mainItem!.capacity * x).toString(),
  }));

  // 선택된 비율이 변경될 때 호출되는 함수
  const handleRatioChange = (id: string) => {
    const newRatio = parseFloat(id);
    setSelectedRatio(id);

    // 재료 목록을 순회하며 용량을 업데이트합니다.
    const updatedTest = initialTest.map((item) => {
      // isMain이 아니거나 false인 재료만 용량 변경
      if (!item.isMain) {
        return { ...item, capacity: item.capacity * newRatio };
      }
      return item;
    });

    setTest(updatedTest);
  };

  return (
    <div className="max-w-3xl h-full overflow-auto flex flex-col p-2 gap-2">
      <h2 className="text-2xl font-bold">(제목) 홍차맛 스콘</h2>
      <div className="aspect-square bg-gray-200"></div>
      <div>
        <h4>재료</h4>
        <ul>
          {test.map((item) => (
            <li
              key={item.id}
              className={`flex items-center gap-2 ${
                item.isMain ? "bg-gray-50 p-2 rounded-md" : ""
              }`}
            >
              <p className="flex-1">{item.name}</p>

              {item.isMain ? (
                <div>
                  <SelectBox
                    selected={selectedRatio}
                    options={ratioOptions}
                    onChange={handleRatioChange}
                  />
                </div>
              ) : (
                <p>{item.capacity}</p>
              )}

              <p className="w-6 text-right">{item.unit}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4>순서</h4>

        <ol>
          <li className="flex items-center gap-2">1. 스콘만들기 - 가</li>
          <li className="flex items-center gap-2">2. 스콘만들기 - 나</li>
          <li className="flex items-center gap-2">3. 스콘만들기 - 다</li>
          <li className="flex items-center gap-2">4. 스콘만들기 - 라</li>
          <li className="flex items-center gap-2">5. 스콘만들기 - 마</li>
        </ol>
      </div>
      <div>
        <h4>메모</h4>
        <p>
          비스킷과 비슷하게 스코틀랜드에서 기원한 빵 혹은 과자로 효모(이스트)로
          부풀리는 일반적인 빵과 달리 베이킹파우더 같은 화학적 팽창제를 사용하여
          빠르게 부풀린 퀵브레드의 일종이다. 기존의 발효빵과 달리 제조 시간이
          짧고 결이 부드럽고 촉촉하면서도 바삭한 식감을 지닌 것이 특징이다.
          최초의 기록은 1513년으로, 영국인들의 광적인 홍차 사랑과 마찬가지로
          홍차에 실과 바늘처럼 따라오는 스콘 역시 영국의 국민 간식이다.
        </p>
      </div>

      <div className="flex h-10 my-4 gap-2">
        <div
          className="p-2.5 bg-gray-100 rounded-md"
          onMouseEnter={() => setIsSend(true)}
          onMouseLeave={() => setIsSend(false)}
        >
          <Image
            src={
              isSend
                ? "/icons/button_send_active.png"
                : "/icons/button_send.png"
            }
            width={20}
            height={20}
            alt="공유"
          />
        </div>
        <div
          className="p-2.5 bg-gray-100 rounded-md"
          onClick={() => setIsBookmark((prev) => !prev)}
        >
          <Image
            src={
              isBookmark
                ? "/icons/button_bookmark_active.png"
                : "/icons/button_bookmark.png"
            }
            width={20}
            height={20}
            alt="북마크"
          />
        </div>
        <div className="flex-1"></div>

        <div
          className="p-2.5 bg-gray-100 rounded-md"
          onClick={() => setIsLike((prev) => !prev)}
        >
          <Image
            src={
              isLike
                ? "/icons/button_like_active.png"
                : "/icons/button_like.png"
            }
            width={20}
            height={20}
            alt="좋아요"
          />
        </div>
      </div>
    </div>
  );
}
