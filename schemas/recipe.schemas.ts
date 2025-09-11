import { z } from "zod";

const ingredientSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "재료 이름은 필수 항목입니다."),
  capacity: z.number().min(1, "용량은 필수 항목입니다."),
  unit: z.string().min(1, "단위는 필수 항목입니다."),
  isMain: z.boolean(), // isMain 속성 추가
});

const sequenceSchema = z.object({
  id: z.string(),
  process: z.string().min(1, "순서를 작성해주세요."),
});

export const recipeSchema = z.object({
  title: z.string().trim().min(1, "제목은 필수입니다."),
  images: z.array(z.instanceof(File)).min(1, "이미지를 최소 1장 업로드하세요."),
  ingredient: z
    .array(ingredientSchema)
    .min(1, { message: "재료에는 최소 한 개 이상의 항목이 있어야 합니다." })
    .refine(
      (items) => {
        const mainCount = items.filter((item) => item.isMain === true).length;
        return mainCount === 1;
      },
      {
        message: "주 재료(isMain: true)는 반드시 한 개만 지정해야 합니다.",
      }
    ),
  sequence: z.array(sequenceSchema).min(1, "필수입력입니다."),
  memo: z.string(),
});

export type recipeSchemaFormType = z.infer<typeof recipeSchema>;
