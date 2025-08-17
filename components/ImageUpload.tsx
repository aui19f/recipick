"use client";

import React from "react";

interface Props {
  onFilesSelected: (files: File[]) => void;
  maxImages?: number;
  maxSizeMB?: number;
}

export default function ImageUploadButton({
  onFilesSelected,
  maxImages = 10,
  maxSizeMB = 3,
}: Props) {
  const handleFilesSelected = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files).slice(0, maxImages);

    const processedFiles: File[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      // 용량 체크
      if (file.size / 1024 / 1024 > maxSizeMB) {
        alert(`${file.name} 파일이 ${maxSizeMB}MB를 초과했습니다.`);
        continue;
      }

      try {
        const resized = await resizeAndCropImage(file, 800); // 1:1, 800px
        processedFiles.push(resized);
      } catch (err) {
        console.warn(`${file.name} 처리 실패`, err);
      }
    }

    onFilesSelected(processedFiles);
    e.target.value = "";
  };

  const resizeAndCropImage = (file: File, size: number): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("Canvas 지원 안됨");

        const minSide = Math.min(img.width, img.height);
        const startX = (img.width - minSide) / 2;
        const startY = (img.height - minSide) / 2;

        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(img, startX, startY, minSide, minSide, 0, 0, size, size);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject("Blob 생성 실패");
            resolve(
              new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              })
            );
          },
          "image/jpeg",
          0.8
        );
      };

      img.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesSelected}
        className="hidden"
        id="imageUpload"
      />
      <label
        htmlFor="imageUpload"
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
      >
        이미지 업로드
      </label>
    </div>
  );
}
