"use server";
import { createAccountSchema } from "@/app/(auth)/create-account/schema";
import db from "@/lib/db";

import { supabase } from "@/lib/supabase/client";
import { createClient } from "@/lib/supabase/server";

export default async function createAccountForm(
  _: unknown,
  formData: FormData
) {
  const inputData = {
    id: formData.get("id"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordCheck: formData.get("passwordCheck"),
  };

  const result = await createAccountSchema.safeParseAsync(inputData);

  if (!result.success) {
    console.log(result.error);
    return { success: false, error: "이메일, 비밀번호를 확인해주세요." };
  }

  const { data, error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    // options: {
    //   emailRedirectTo: "https://example.com/welcome",
    // },
  });

  if (error !== null) {
    return { success: false, error: "이메일, 비밀번호를 확인해주세요." };
  }
  const { user } = data;

  // // 저장완료 후 -> 디비저장
  try {
    await db.users.create({
      data: {
        id: result.data.id,
        auth: user!.id,
        email: result.data.email,
        nickname: result.data.email.split("@")[0],
        role: "GUEST" as const,
        status: "JOIN" as const,
        plan: "BASICS" as const,
      },
    });

    //로그인까지
    const supabase = await createClient();
    await supabase.auth.signInWithPassword({
      email: result.data.email,
      password: result.data.password,
    });
    console.log("supabase", supabase);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error:
        "회원가입 중 문제가 생겼습니다. 문의글을 남겨주시면 빠르게 해결하겠습니다.",
    };
  }

  return { success: true, error: "" };
}
