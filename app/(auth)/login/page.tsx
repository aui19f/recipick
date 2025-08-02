"use client";
import { useActionState, useEffect, useState } from "react";
import Input from "@/components/forms/Input";
import Button, { variantEnum } from "@/components/forms/Button";

import Image from "next/image";
import Spinner from "@/components/Loading";

import { redirect } from "next/navigation";
import loginForm from "@/app/(auth)/login/actions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [state, actions, isPending] = useActionState(loginForm, null);

  useEffect(() => {
    if (state?.success) {
      alert("로그인완료");
      redirect("/"); // 홈으로 이동 (todo: 로그인 눌렀던 페이지로 이동)
    }
  }, [state]);

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

        {state?.error && <p>{state.error}</p>}
        <Button type="submit" variant={variantEnum.primary}>
          로그인
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
