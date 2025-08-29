"use client";
// import GoogleLoginButton from "@/components/login/GoogleLoginButton";

import { useActionState, useEffect, useState } from "react";

// import KakaoLoginButton from "@/components/login/KakaoLoginButton";
import Input from "@/components/forms/Input";
import Button, { variantEnum } from "@/components/forms/Button";

import createAccountForm from "@/app/(auth)/create-account/actions";
import Image from "next/image";

import { redirect } from "next/navigation";
import Link from "next/link";

export default function CreateAcccount() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [state, actions, isPending] = useActionState(createAccountForm, null);

  useEffect(() => {
    if (state?.success) {
      alert("회원가입이 완료되었습니다.");
      redirect("/"); // 홈으로 이동
    }
  }, [state]);

  return (
    <form
      action={actions}
      className="flex flex-col justify-center gap-2 bg-white w-screen h-screen p-4 shadow-sm rounded-md m-auto sm:w-96 sm:h-96"
    >
      <div className="flex items-center justify-center mb-12">
        <Image
          src="/icons/logo_sub_recipick.png"
          alt="sort"
          width={240}
          height={120}
        />
      </div>

      <Input
        name="id"
        value={id}
        type="text"
        placeholder="아이디"
        onChange={(e) => setId(e.target.value)}
      />

      <Input
        name="email"
        value={email}
        type="text"
        placeholder="이메일"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input name="password" type="password" placeholder="비밀번호" />
      <Input type="password" name="passwordCheck" placeholder="비밀번호확인" />
      {state?.error && <p>{state.error}</p>}
      <Button type="submit" variant={variantEnum.primary} disabled={isPending}>
        {isPending ? "진행중.." : "회원가입"}
      </Button>
      <div className=" my-2 text-sm text-gray-400">
        <Link href="/login">로그인</Link>
      </div>
    </form>
  );
}
