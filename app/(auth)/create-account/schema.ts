import { z } from "zod";

export const createAccountSchema = z
  .object({
    id: z
      .string()
      .min(5, { message: "ID는 최소 5글자 이상이어야 합니다." })
      .max(20, { message: "ID는 20글자 미만이어야 합니다." })
      .regex(/^[a-z0-9_]+$/, {
        message: "ID는 소문자, 숫자, 언더바(_)만 포함해야 합니다.",
      })
      .refine((value) => !/\s/.test(value), {
        message: "ID에 공백이나 줄바꿈을 포함할 수 없습니다.",
      }),
    email: z.email({ message: "유효한 이메일을 입력해주세요" }),
    password: z.string().min(6, { message: "6자 이상 입력해주세요" }),
    passwordCheck: z.string(),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ["passwordCheck"],
    message: "비밀번호가 일치하지 않습니다",
  });

export type UserType = z.infer<typeof createAccountSchema>;
