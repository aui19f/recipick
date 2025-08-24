export default function OfflineDetailContents() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="bg-gray-200 w-60 aspect-square"></div>
      <h2 className="text-xl font-bold">2025 카페베이커리페어 in 킨텍스</h2>
      <div>
        <p>① [2월 9일까지 사전등록 시] 무료 입장</p>
        <p>② [2월 10일 ~ 2월 18일까지 네이버티켓 예약 시] 6,000원</p>
        <p>③ [2월 19일 ~ 2월 22일까지, 네이버티켓 예약 시] 8,000원</p>
        <p>④ [2월 19일 ~ 2월 22일, 현장매표 시] 15,000원</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-gray-200 w-6 aspect-square"></div>
        <p>공식 페이지로 이동하기</p>
      </div>
    </div>
  );
}
