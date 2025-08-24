import { useEditor, EditorContent } from "@tiptap/react";

import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";

interface TextEditorProp {
  content: string;
  onChange: (value: string) => void;
}
export default function TextEditor({ content = "", onChange }: TextEditorProp) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      Highlight.configure({
        multicolor: false, // 여러 색상 허용 여부
        HTMLAttributes: {
          class: "highlight", // 클래스 지정 가능
        },
      }),
      Placeholder.configure({
        placeholder: "여기에 글을 작성하세요...", // 원하는 플레이스홀더 문구
      }),
    ],

    content,
    immediatelyRender: false, // 🚀 SSR mismatch 방지
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div>
      <div className="flex gap-2 mb-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("bold") ? "bg-gray-800 text-white" : "bg-gray-200"
          }`}
        >
          굵게
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("orderedList")
              ? "bg-gray-800 text-white"
              : "bg-gray-200"
          }`}
        >
          순서
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("highlight", { color: "#cccccc" })
              ? "bg-yellow-100 text-gray-800 is-active"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          배경색
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="prose max-w-none min-h-[200px] focus:outline-none border border-gray-400 p-4"
      />
    </div>
  );
}
