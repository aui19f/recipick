"use client";
// import GoogleLoginButton from "@/components/login/GoogleLoginButton";

import { useActionState, useState } from "react";

// import KakaoLoginButton from "@/components/login/KakaoLoginButton";
import Input from "@/components/forms/Input";
import Button, { variantEnum } from "@/components/forms/Button";

import createAccountForm from "@/app/(auth)/create-account/actions";
import Image from "next/image";
import Spinner from "@/components/Loading";

export default function Home() {
  const [email, setEmail] = useState("");
  const [state, actions, isPending] = useActionState(createAccountForm, null);
  // form에  onSubmit={handleSubmit(onValid)} onValid은 validation이 끝난 데이터로 호출

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-slate-50">
      <form
        action={actions}
        className="flex flex-col gap-2 bg-white w-96 h-96 p-4 shadow-sm rounded-md "
      >
        <div className="flex-1 flex items-center justify-center">
          <Image
            src="/icons/logo_sub_recipick.png"
            alt="sort"
            width={240}
            height={120}
          />
        </div>
        <Input
          name="email"
          value={email}
          type="text"
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input name="password" type="password" placeholder="비밀번호" />
        <Input
          type="password"
          name="passwordCheck"
          placeholder="비밀번호확인"
        />
        {state?.error && <p>{state.error}</p>}
        <Button type="submit" variant={variantEnum.primary}>
          회원가입
        </Button>
      </form>
      {/* <section>
        <GoogleLoginButton />
        <KakaoLoginButton />
      </section> */}
      {isPending ? <Spinner /> : null}
    </main>
  );
}
