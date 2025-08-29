import { ModalFrame } from "@/components/modal/frame";

export default function ModalLogin() {
  const onClose = () => {
    console.log("onClose");
  };
  return (
    <div>
      <ModalFrame isHeader={true} onClose={onClose} isFooter={true}>
        <p>로그인 회원</p>
      </ModalFrame>
    </div>
  );
}
