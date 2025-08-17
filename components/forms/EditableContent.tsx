// components/EditableContent.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";

interface IEditableContentProps {
  isCounting: boolean;
  inputMax: number;
  onInput: (value: string) => void;
}
// 태그에 적용할 Tailwind CSS 클래스
const blueTagClass = "text-blue-500";

export default function EditableContent({
  isCounting = true,
  inputMax = 200,
  onInput,
}: IEditableContentProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [content, setContent] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // 엔터키만 단독으로 눌렀을 경우
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // 줄바꿈 막기
      return;
    }

    // 쉬프트 + 엔터일 때만 줄바꿈 허용
    if (event.key === "Enter" && event.shiftKey) {
      // console.log("쉬프트+엔터 줄바꿈 허용");
    }
  };

  // 입력 이벤트 핸들러
  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    const text = (event.currentTarget.textContent || "").trim();
    setContent(text);

    if (isComposing) {
      // 조합 중일 때는 상태만 업데이트하고 DOM을 건드리지 않음
      // setContent(event.currentTarget.innerText);
    } else {
      // 조합이 끝났거나 조합형 문자가 아닐 때
      // setContent(event.currentTarget.innerText);
      updateHTMLWithTags();
    }
  };

  // 조합 시작 이벤트 핸들러
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  // 조합 끝 이벤트 핸들러
  const handleCompositionEnd = () => {
    setIsComposing(false);
    updateHTMLWithTags();
  };

  // 태그를 파싱하여 HTML을 업데이트하는 함수
  const updateHTMLWithTags = () => {
    if (divRef.current) {
      const selection = window.getSelection();
      let caretPosition = 0;
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(divRef.current);
        preSelectionRange.setEnd(range.endContainer, range.endOffset);
        caretPosition = preSelectionRange.toString().length;
      }

      const textContent = divRef.current.textContent || "";
      // 한글과 영문, 숫자에 밑줄(_)까지 포함하도록 정규식 수정
      const regex = /([#@$][\w_가-힣]+)/g;
      const newContent = textContent.replace(
        regex,
        `<span className="${blueTagClass}">$1</span>`
      );

      divRef.current.innerHTML = newContent;

      // 커서 위치 복원
      restoreCaretPosition(divRef.current, caretPosition);
      onInput(newContent);
    }
  };

  // 커서 위치를 복원하는 헬퍼 함수
  const restoreCaretPosition = (node: HTMLDivElement, position: number) => {
    if (!node || position === null) return;

    let length = 0;
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
    let currentNode = walker.nextNode();

    while (currentNode) {
      if (length + currentNode.nodeValue!.length >= position) {
        const range = document.createRange();
        range.setStart(currentNode, position - length);
        range.collapse(true);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        return;
      }
      length += currentNode.nodeValue!.length;
      currentNode = walker.nextNode();
    }

    // 커서 위치를 찾지 못하면 가장 마지막으로 이동
    const range = document.createRange();
    range.selectNodeContents(node);
    range.collapse(false);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  useEffect(() => {
    if (divRef.current) {
      // 최초 렌더링 시 커서 위치를 맨 끝으로 이동
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(divRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, []);

  return (
    <>
      <div
        ref={divRef}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        contentEditable
        className="w-full min-h-[160px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 whitespace-pre-wrap"
      />

      {isCounting && (
        <span className={content.length > inputMax ? "text-red-400" : ""}>
          {content.length}/{inputMax}
        </span>
      )}
    </>
  );
}
