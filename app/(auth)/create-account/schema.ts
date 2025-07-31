import { z } from "zod";

export const userSchema = z
  .object({
    email: z.email("유효한 이메일을 입력해주세요"),
    password: z.string().min(6, "6자 이상 입력해주세요"),
    passwordCheck: z.string(),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ["passwordCheck"],
    message: "비밀번호가 일치하지 않습니다",
  });

export type UserType = z.infer<typeof userSchema>;
