// components/Textarea.tsx
"use client";

import { useRef, useState, useEffect } from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  type?: "scroll" | "height";
}

export default function Textarea({ type = "scroll", ...props }: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(props.value?.toString() || "");

  // height 타입일 때 자동 높이 조절
  useEffect(() => {
    if (type === "height" && textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 맞춰 조절
    }
  }, [value, type]);

  return (
    <textarea
      {...props}
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange?.(e); // 외부 onChange도 실행
      }}
      className={`
        w-full p-2 border border-gray-300 rounded resize-none outline-none
        ${props.className || ""}
      `}
      style={{
        overflowY: type === "scroll" ? "auto" : "hidden",
      }}
    />
  );
}
