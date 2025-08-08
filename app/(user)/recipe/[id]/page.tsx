"use client";
import Image from "next/image";
import { useState } from "react";

export default function Details() {
  const [isLike, setIsLike] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isSend, setIsSend] = useState(false);

  return (
    <div className="max-w-3xl h-full overflow-auto flex flex-col p-2 gap-2">
      <h2 className="text-2xl font-bold">(제목) 홍차맛 스콘</h2>
      <div className="aspect-square bg-gray-200"></div>
      <div>레시피 배열 (생각중)</div>

      <ol>
        <li>1. 스콘만들기 - 가</li>
        <li>2. 스콘만들기 - 나</li>
        <li>3. 스콘만들기 - 다</li>
        <li>4. 스콘만들기 - 라</li>
        <li>5. 스콘만들기 - 마</li>
      </ol>
      <div>
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
