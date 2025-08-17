"use client";

import Image from "next/image";

interface Props {
  images: File[];
  onRemove?: (index: number) => void;
}

export default function PreviewImages({ images, onRemove }: Props) {
  if (!images.length) return null;

  return (
    <div className="mt-2 grid grid-cols-3 gap-2">
      {images.map((file, i) => (
        <div
          key={i}
          className="relative w-full aspect-square object-cover rounded"
        >
          <div className="w-full h-full"></div>
          <Image
            src={URL.createObjectURL(file)}
            alt="preview"
            fill={true}
            objectFit="cover"
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
      ))}
    </div>
  );
}
