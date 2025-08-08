"use client";

import { useRouter } from "next/navigation";

export default function CancelButton() {
  const router = useRouter();

  const handleGoBack = () => {
    const confirmed = window.confirm(
      "작성했던 정보가 없어집니다. 페이지를 나가시겠습니까?"
    );
    if (confirmed) {
      router.back();
    }
  };

  return (
    <button onClick={handleGoBack} className="text-stone-600 font-semibold">
      취소
    </button>
  );
}
