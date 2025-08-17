// app/page.tsx
"use client"; // 클라이언트 컴포넌트로 지정하여 useState, useEffect 사용 가능

import insertWriteShow from "@/app/(user)/writing/show/actions";
import Button, { variantEnum } from "@/components/forms/Button";
import EditableContent from "@/components/forms/EditableContent";
import ImageUploadButton from "@/components/ImageUpload";
import PreviewImages from "@/components/PreviewImages";
import { useLoadingStore } from "@/store/loadingStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { loadingStart, loadingEnd } = useLoadingStore();
  const [content, setContent] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [images, setImages] = useState<File[]>([]);

  // 키보드 높이를 저장하는 상태. 기본값은 0
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  // 모바일 여부 확인
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 컴포넌트 마운트 시 실행되는 효과
  useEffect(() => {
    // 텍스트 영역에 자동으로 포커스하여 키보드를 띄웁니다.
    if (textareaRef.current) {
      textareaRef.current.focus();
    }

    // visualViewport는 모바일 가상 키보드에 의해 변경되는 뷰포트 정보를 제공합니다.
    // 특히 iOS에서 fixed 요소가 키보드에 가려지는 문제를 해결하는 데 유용합니다.
    const handleVisualViewportResize = () => {
      if (window.visualViewport) {
        // 현재 뷰포트 높이와 시각적 뷰포트 높이를 비교하여 키보드 유무 및 높이를 판단합니다.
        // visualViewport.height는 키보드가 올라오면 줄어듭니다.
        // window.innerHeight는 주소창 등 UI를 제외한 브라우저 창의 실제 높이입니다.
        const newKeyboardHeight =
          window.innerHeight - window.visualViewport.height;
        setKeyboardHeight(Math.max(0, newKeyboardHeight)); // 음수 방지
      }
    };

    // visualViewport가 지원되는 경우에만 이벤트 리스너를 추가합니다.
    if (window.visualViewport) {
      window.visualViewport.addEventListener(
        "resize",
        handleVisualViewportResize
      );
    }

    // 컴포넌트 언마운트 시 이벤트 리스너를 제거하여 메모리 누수를 방지합니다.
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          handleVisualViewportResize
        );
      }
    };
  }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때 한 번만 실행됨을 의미

  const handleSave = async () => {
    await loadingStart();
    if (content.trim().length < 5 || content.trim().length > 200) {
      alert();
      return;
    }
    const { status } = await insertWriteShow(content.trim(), images);
    if (status == 200) {
      alert("완료되었습니다.");
      router.push("/");
    } else if (status === 401) {
      alert("로그인된 사용자가 사용가능한 기능입니다.");
      router.push("/");
    } else {
      alert("업로드 중에 문제가 발생하였습니다. 다시 시도해주시기 바랍니다.");
    }
    await loadingEnd();
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="flex items-center justify-between p-4 border-b border-gray-200 ">
        <h1 className="text-lg font-bold">자랑하기</h1>
        <Button variant={variantEnum.primary} onClick={handleSave}>
          등록
        </Button>
      </header>

      <div className="flex-grow p-4 overflow-y-auto mb-20">
        <EditableContent
          isCounting={true}
          inputMax={200}
          onInput={setContent}
        />

        {/* 선택된 파일 미리보기 -- 지금은 1장만 가능 */}
        <PreviewImages
          images={images}
          onRemove={(i) => setImages(images.filter((_, idx) => idx !== i))}
        />
      </div>

      {/* 하단 액션 버튼 영역 */}
      <div
        className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex items-center justify-between transition-all duration-300 ease-in-out"
        style={{
          // 키보드 높이만큼 bottom을 조절하여 버튼이 키보드 위에 보이도록 합니다.
          // iOS에서 키보드가 올라올 때 visualViewport.height가 줄어드는 것을 이용합니다.
          bottom: keyboardHeight,
        }}
      >
        <div className="flex space-x-2">
          <ImageUploadButton onFilesSelected={setImages} />
        </div>

        {/* 파일 크기 제한 안내 */}
        <div className="text-xs text-gray-500">
          최대 {isMobile ? "5MB" : "15MB"} (JPG, PNG)
        </div>
      </div>
    </div>
  );
}
