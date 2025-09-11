"use client";

import { useUserStore } from "@/store/useUserStore";
import { EnumRole } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WritingSelect() {
  const { user } = useUserStore();
  const router = useRouter();

  const pageBack = () => {
    router.back();
  };

  const handleSelect = (type: "show" | "recipe" | "offline") => {
    // 모달 닫고, 일반 페이지로 이동
    router.replace(`/writing/${type}`);
  };
  useEffect(() => {
    console.log("변화: ", user);
  }, [user]);
  return (
    <>
      <div className="relative size-6 ml-auto " onClick={pageBack}>
        <Image src="/icons/close.png" fill={true} alt="뒤로가기" />
      </div>
      <div>
        <h3 className="text-xl font-bold">글쓰기</h3>
        <ul className="flex flex-col gap-4 my-4">
          <li
            className="border border-gray-200 p-6"
            onClick={() => handleSelect("show")}
          >
            자랑하기
          </li>
          <li
            className="border border-gray-200 p-6"
            onClick={() => handleSelect("recipe")}
          >
            레시피
          </li>
          {user && user?.role === EnumRole.ADMIN && (
            <li
              className="border border-gray-200 p-6"
              onClick={() => handleSelect("offline")}
            >
              행사추가
            </li>
          )}
          <li>{user?.role}</li>
        </ul>
      </div>
    </>
  );
}
