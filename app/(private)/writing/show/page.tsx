// app/page.tsx
"use client"; // 클라이언트 컴포넌트로 지정하여 useState, useEffect 사용 가능

import Textarea from "@/components/forms/\bTextarea";
import Button, { variantEnum } from "@/components/forms/Button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface FileWithPreview extends File {
  preview?: string;
}

export default function Home() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // 키보드 높이를 저장하는 상태. 기본값은 0
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
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

  // 파일 크기 제한 (모바일: 5MB, 웹: 15MB)
  const getMaxFileSize = () => {
    return isMobile ? 5 * 1024 * 1024 : 15 * 1024 * 1024; // 5MB or 15MB
  };

  // 파일 유효성 검사
  const validateFile = (file: File): string | null => {
    // 파일 타입 검사 (jpg, png만 허용)
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return "JPG 또는 PNG 파일만 업로드 가능합니다.";
    }

    // 파일 크기 검사
    const maxSize = getMaxFileSize();
    if (file.size > maxSize) {
      const maxSizeMB = isMobile ? "5MB" : "15MB";
      return `파일 크기는 ${maxSizeMB} 이하여야 합니다.`;
    }

    return null;
  };

  // 파일 선택 처리
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // 첫 번째 파일만 처리 (한 장만 허용)
    const file = files[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      alert(`${file.name}: ${error}`);
      return;
    }

    // 기존 파일의 미리보기 URL 해제
    if (selectedFiles.length > 0 && selectedFiles[0].preview) {
      URL.revokeObjectURL(selectedFiles[0].preview);
    }

    // 새 파일로 교체
    const fileWithPreview = file as FileWithPreview;
    fileWithPreview.preview = URL.createObjectURL(file);
    setSelectedFiles([fileWithPreview]);

    // input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  // const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {

  //   const newFiles: FileWithPreview[] = [];
  //   const errors: string[] = [];

  //   Array.from(files).forEach((file) => {
  //     const error = validateFile(file);
  //     if (error) {
  //       errors.push(`${file.name}: ${error}`);
  //     } else {
  //       // 파일 미리보기 URL 생성
  //       const fileWithPreview = file as FileWithPreview;
  //       fileWithPreview.preview = URL.createObjectURL(file);
  //       newFiles.push(fileWithPreview);
  //     }
  //   });

  //   // 에러가 있으면 알림
  //   if (errors.length > 0) {
  //     alert(errors.join("\n"));
  //   }

  //   // 유효한 파일들만 추가
  //   if (newFiles.length > 0) {
  //     setSelectedFiles((prev) => [...prev, ...newFiles]);
  //   }

  // };

  // 파일 제거
  const removeFile = (index: number) => {
    setSelectedFiles((prev) => {
      const newFiles = [...prev];
      // 미리보기 URL 해제
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  // 파일 선택 버튼 클릭
  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 상단 헤더 (선택 사항) */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200 ">
        <button className="text-stone-600 font-semibold">취소</button>
        <h1 className="text-lg font-bold">자랑하기</h1>
        <Button variant={variantEnum.secondary}>등록</Button>
      </header>

      <div className="flex-grow p-4 overflow-y-auto mb-20">
        <Textarea
          type="height"
          placeholder="내용이 늘어나면 자동으로 높이가 늘어납니다."
          rows={3} // 최소 줄 수
        />

        {/* 선택된 파일 미리보기 -- 지금은 1장만 가능 */}
        {selectedFiles.length > 0 && (
          <div className="mt-4">
            <div className="grid ">
              {/* grid-cols-3 gap-2 */}
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative">
                  <div className="max-w-64 aspect-square relative m-auto">
                    <Image src={file.preview} alt={file.name} fill={true} />
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-gray-200 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

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
          {selectedFiles.length === 0 && (
            <button
              onClick={handleImageButtonClick}
              className="text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-image"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <span className="sr-only">사진 추가</span>
            </button>
          )}
        </div>

        {/* 파일 크기 제한 안내 */}
        <div className="text-xs text-gray-500">
          최대 {isMobile ? "5MB" : "15MB"} (JPG, PNG)
        </div>
      </div>
    </div>
  );
}
