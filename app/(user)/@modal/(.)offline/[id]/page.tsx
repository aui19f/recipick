"use client";

import { ModalFrame } from "@/components/modal/frame";
import OfflineDetailContents from "@/components/intercept/OfflineDetailContents";

import { useRouter } from "next/navigation";

export default function OfflineDetailsModal() {
  console.log("!!!!!!!!!!!!!!!!!!!");
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  return (
    <ModalFrame isHeader={true} onClose={closeModal}>
      <div className="px-4 pb-4">
        <OfflineDetailContents />
      </div>
    </ModalFrame>
  );
}
