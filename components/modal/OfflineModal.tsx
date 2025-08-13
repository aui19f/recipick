"use client";
import { Frame } from "@/components/modal/frame";
import Image from "next/image";
// import { useRouter } from "next/router";

export default function OfflineModal() {
  // const router = useRouter();
  const onCloseClick = () => {
    //   router.back();
  };
  return (
    <Frame
      body={
        <div className="flex flex-col gap-4 relative p-4">
          <Image
            src="/icons/close.png"
            width={24}
            height={24}
            alt="닫기"
            className="absolute left-2 top-2"
            onClick={onCloseClick}
          />
          <div className="mt-6 mx-6">
            <div className="bg-gray-400 w-full max-w-96 aspect-square"></div>
          </div>
          <h3 className="text-center font-bold">
            2025 카페베이커리페어 in 킨텍스
          </h3>
          <p className="text-sm">
            ① [2월 9일까지 사전등록 시] 무료 입장 <br />
            ② [2월 10일 ~ 2월 18일까지 네이버티켓 예약 시] 6,000원
            <br />
            ③ [2월 19일 ~ 2월 22일까지, 네이버티 켓예약 시] 8,000원
            <br />④ [2월 19일 ~ 2월 22일, 현장매표 시] 15,000원
          </p>
          <p>LINK</p>
        </div>
      }
    />
  );
}
