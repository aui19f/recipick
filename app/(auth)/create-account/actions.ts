"use server";
import { userSchema } from "@/app/(auth)/create-account/schema";
import db from "@/lib/db";

import { supabase } from "@/lib/supabaseClient";

export default async function createAccountForm(
  _: unknown,
  formData: FormData
) {
  const inputData = {
    email: formData.get("email"),
    password: formData.get("password"),
    passwordCheck: formData.get("passwordCheck"),
  };

  const result = await userSchema.safeParseAsync(inputData);

  if (!result.success) {
    console.log(result.error);
    return { success: false, error: "이메일, 비밀번호를 확인해주세요." };
  }

  const {
    data: { user },
  } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    // options: {
    //   emailRedirectTo: "https://example.com/welcome",
    // },
  });
  //user.id
  console.log("db저장데이터: ", {
    id: user!.id,
    email: result.data.email,
    nickname: result.data.email.split("@")[0],
    role: "GUEST" as const,
    status: "JOIN" as const,
    plan: "BASICS" as const,
  });
  // 저장완료 후 -> 디비저장
  const dbResult = await db.users.create({
    data: {
      id: user!.id,
      email: result.data.email,
      nickname: result.data.email.split("@")[0],
      role: "GUEST" as const,
      status: "JOIN" as const,
      plan: "BASICS" as const,
    },
  });
  // 디비 성공하면 리턴후에 팝업
  console.log("디비 성공하면 리턴후에 팝업 [dbResult]", dbResult);

  return { ok: true, error: "" };
}
