"use server";
import { loginSchema } from "@/app/(auth)/login/schema";
import db from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { useUserStore } from "@/sotre/useUserStore";

export default async function loginForm(_: unknown, formData: FormData) {
  const inputData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await loginSchema.safeParseAsync(inputData);
  if (!result.success) {
    console.log(result.error);
    return { success: false, error: "이메일, 비밀번호를 확인해주세요." };
  }
  //  회원가입확인;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (error || !data.user) {
    return { success: false, error: "로그인에 실패했습니다." };
  }
  // 디비에 이메일이 있는가?
  const user = await db.users.findUnique({
    where: {
      email: result.data.email,
    },
  });
  if (!user) {
    return { success: false, error: "해당 유저가 존재하지 않습니다." };
  }

  // ✅ 세션은 supabase.auth.signInWithPassword() 내부에서 자동으로 쿠키에 저장됨
  useUserStore.getState().setUser({ ...user });
  return { success: true, error: "" };
}
