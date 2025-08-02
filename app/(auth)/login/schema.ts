import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("유효한 이메일을 입력해주세요"),
  password: z.string().min(6, "6자 이상 입력해주세요"),
});

export type UserType = z.infer<typeof loginSchema>;
