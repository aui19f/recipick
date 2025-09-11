"use client";

import Image from "next/image";
// next/image 컴포넌트:이미지 최적화(lazy loading, 크기 최적화 등) 기능

interface Props {
  images: File[] | string[]; // input file 또는 디비에서 이미지 파일(url)
  onRemove?: (index: number) => void;
}

export default function PreviewImages({ images, onRemove }: Props) {
  return (
    <div className="mt-2 grid">
      {images.length > 0 ? (
        images.map((file, i) => (
          <div key={i} className="relative aspect-square  rounded">
            <Image
              src={typeof file === "string" ? file : URL.createObjectURL(file)}
              alt="preview"
              fill={true}
              className="object-contain"
            />
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs rounded px-1"
              >
                ✕
              </button>
            )}
          </div>
        ))
      ) : (
        <div className="relative aspect-square  rounded bg-gray-100"></div>
      )}
    </div>
  );
}
