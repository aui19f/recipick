// app/ModalWrapper.tsx
"use client";

export default function ModalWrapper({ modal }: { modal: React.ReactNode }) {
  // modal이 클라이언트 상태에 따라 달라질 수 있기 때문에 여기서 제어 가능
  return <>{modal}</>;
}
