import Image from "next/image";

export default function OfflineDetail() {
  const listMove = () => {
    console.log("???");
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/70 z-99 px-6 flex items-center justify-center">
      <div
        className="rounded-4xl shadow-2xl bg-white p-4 flex flex-col gap-5"
        onClick={listMove()}
      >
        <div>
          <Image
            src="/icons/close.png"
            width={24}
            height={24}
            alt="close button"
            className="ml-auto"
          />
        </div>
        <div className="bg-gray-200 size-32 m-auto"> </div>
        <div className="flex flex-col gap-8">
          <div className="text-sm">
            <h3 className="text-xl font-bold">
              2025 카페베이커리페어 in 킨텍스
            </h3>
            <p>[2월 9일까지 사전등록 시] 무료 입장</p>
            <p>[2월 10일 ~ 2월 18일까지 네이버티켓 예약 시] 6,000원</p>
            <p>[2월 19일 ~ 2월 22일까지, 네이버티켓 예약 시] 8,000원</p>
            <p>[2월 19일 ~ 2월 22일, 현장매표 시] 15,000원</p>
          </div>
          <div className="flex *:flex-1">
            <div className="">
              <Image
                src="/icons/test.png"
                width={32}
                height={32}
                alt="인스타그램"
                className="m-auto"
              />
            </div>
            <div className="">
              <Image
                src="/icons/test.png"
                width={32}
                height={32}
                alt="인스타그램"
                className="m-auto"
              />
            </div>
            <div className="">
              <Image
                src="/icons/test.png"
                width={32}
                height={32}
                alt="인스타그램"
                className="m-auto"
              />
            </div>
            <div className="">
              <Image
                src="/icons/test.png"
                width={32}
                height={32}
                alt="인스타그램"
                className="m-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
