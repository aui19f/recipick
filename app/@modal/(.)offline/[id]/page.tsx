"use client";

import { ModalFrame } from "@/components/modal/frame";
import OfflineDetailContents from "@/components/intercept/OfflineDetailContents";

import { useRouter } from "next/navigation";

export default function OfflineDetailsModal() {
  const router = useRouter();

  const closeModal = () => {
    router.back(); // 모달 닫기 (이전 페이지로 돌아가기)
  };

  return (
    <ModalFrame isHeader={true} onClose={closeModal}>
      <div className="px-4 pb-4">
        <OfflineDetailContents />
      </div>
    </ModalFrame>
  );
}
