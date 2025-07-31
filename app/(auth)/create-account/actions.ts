import { userSchema } from "@/app/(auth)/create-account/schema";
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

  const { data } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    // options: {
    //   emailRedirectTo: "https://example.com/welcome",
    // },
  });
  // 저장완료 후 -> 디비저장

  console.log("[data]", data);

  return { ok: true, error: "" };
}
