"use client";

import { useRouter } from "next/navigation";

export default function OfflineDetailsModal() {
  const router = useRouter();

  const closeModal = () => {
    router.back(); // 모달 닫기 (이전 페이지로 돌아가기)
  };

  // 배경 클릭 시 모달 닫기용 함수 (이벤트 버블링 막기 위해)
  const onBackgroundClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeModal();
  };

  // 모달 내부 클릭 시 닫기 방지
  const onModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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
        <div>닫기버튼</div>
        <div>포스터</div>
        <div>제목</div>
        <div>간단한글</div>
        <div>링크</div>
        {/* 
        <button
          onClick={closeModal}
          className="mt-6 block mx-auto text-gray-500 hover:text-gray-700 transition"
          aria-label="모달 닫기"
        >
          닫기
        </button> */}
      </div>
    </div>
  );
}
