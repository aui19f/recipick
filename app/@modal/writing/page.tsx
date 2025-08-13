"use client";

import { usePathname, useRouter } from "next/navigation";

export default function WritingSelectModal() {
  const router = useRouter();

  const pathname = usePathname();

  if (pathname !== "/writing") {
    // 경로가 정확히 /writing이 아니면 모달 내용 렌더하지 않음
    return null;
  }

  const closeModal = () => {
    router.back(); // 모달 닫기 (이전 페이지로 돌아가기)
  };

  // 배경 클릭 시 모달 닫기용 함수 (이벤트 버블링 막기 위해)
  const onBackgroundClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // closeModal();
  };

  // 모달 내부 클릭 시 닫기 방지
  const onModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSelect = (type: "show" | "recipe") => {
    // 모달 닫고, 일반 페이지로 이동

    router.push(`/writing/${type}`);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50"
      onClick={onBackgroundClick}
    >
      <div
        className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg"
        onClick={onModalContentClick}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          글쓰기 타입 선택
        </h2>

        <div className="flex justify-around gap-4">
          <button
            className="flex-1 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            onClick={() => handleSelect("show")}
          >
            자랑하기
          </button>
          <button
            className="flex-1 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            onClick={() => handleSelect("recipe")}
          >
            레시피
          </button>
        </div>

        <button
          onClick={closeModal}
          className="mt-6 block mx-auto text-gray-500 hover:text-gray-700 transition"
          aria-label="모달 닫기"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
