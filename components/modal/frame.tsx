import Button from "@/components/forms/Button";
import Image from "next/image";

enum FooterButton {
  Alert, //button - [확인]
  Confirm, // button2 - [취소][확인]
}
type modalProps = {
  isHeader?: boolean;
  children: React.ReactNode;
  isFooter?: boolean;
  btnType?: FooterButton;
  onClose: () => void;
};

export function ModalFrame({
  isHeader = false,
  children,
  isFooter = false,
  btnType = FooterButton.Alert,
  onClose,
}: modalProps) {
  return (
    <div className="fixed inset-0 z-50 top-0 bottom-0 flex items-center justify-center bg-black/60">
      <div className="w-4/5 overflow-hidden bg-white rounded-lg shadow-lg md:w-96">
        {isHeader && (
          <div className="flex items-center  gap-2.5 rounded-t-lg">
            <div className="relative size-6 m-2" onClick={onClose}>
              <Image src="/icons/close.png" fill={true} alt="닫기" />
            </div>
          </div>
        )}

        {children}

        {isFooter && (
          <div className=" p-4 flex gap-2.5 rounded-b-lg">
            {btnType === FooterButton.Confirm && <Button>취소</Button>}
            <Button>확인</Button>
          </div>
        )}
      </div>
    </div>
  );
}
