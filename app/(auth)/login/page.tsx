"use client";
import { useActionState, useEffect, useState } from "react";
import Input from "@/components/forms/Input";
import Button, { variantEnum } from "@/components/forms/Button";

import Image from "next/image";

import { redirect } from "next/navigation";
import loginForm from "@/app/(auth)/login/actions";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [state, actions, isPending] = useActionState(loginForm, null);

  useEffect(() => {
    setPassword("");
    if (state?.success) {
      alert("로그인완료");
      redirect("/"); // 홈으로 이동 (todo: 로그인 눌렀던 페이지로 이동)
    }
  }, [state]);

  return (
    <form
      action={actions}
      className="flex flex-col justify-center gap-2 bg-white w-screen h-screen p-4 shadow-sm rounded-md m-auto sm:w-96 sm:h-96"
    >
      <div className=" flex items-center justify-center mb-12">
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
      <Input
        name="password"
        value={password}
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
      />

      {state?.error && <p>{state.error}</p>}
      <Button type="submit" variant={variantEnum.primary} disabled={isPending}>
        {isPending ? "진행중.." : "로그인"}
      </Button>
      <div className="text-right my-2 text-sm text-gray-400">
        <Link href="/create-account">회원가입</Link>
      </div>
    </form>
  );
}
