"use client";
import GoogleLoginButton from "@/components/login/GoogleLoginButton";

import { useActionState, useState } from "react";

import KakaoLoginButton from "@/components/login/KakaoLoginButton";
import Input from "@/components/forms/Input";
import Button from "@/components/forms/Button";

import createAccountForm from "@/app/(auth)/create-account/actions";

export default function Home() {
  const [email, setEmail] = useState("");
  const [state, actions] = useActionState(createAccountForm, null);
  // form에  onSubmit={handleSubmit(onValid)} onValid은 validation이 끝난 데이터로 호출

  return (
    <main>
      <form action={actions} className="flex flex-col gap-2">
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
        <Button type="submit">회원가입</Button>
      </form>
      <section>
        <GoogleLoginButton />
        <KakaoLoginButton />
      </section>
    </main>
  );
}
