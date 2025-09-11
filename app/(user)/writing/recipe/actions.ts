"use server";
import { getUser } from "@/app/actions/getUser";
import db from "@/lib/db";
import { uploadImage } from "@/lib/storage";
import { EnumRole } from "@prisma/client";
import { z } from "zod";

const ingredientSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "이름은 필수 항목입니다."),
  capacity: z.number().min(1, "용량은 필수 항목입니다."),
  unit: z.string().min(1, "단위는 필수 항목입니다."),
  isMain: z.boolean(), // isMain 속성 추가
});

const sequenceSchema = z.object({
  id: z.string(),
  process: z.string().min(1, "이름은 필수 항목입니다."),
});

const recipeSchema = z.object({
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

export default async function RecipeForm(_: unknown, formData: FormData) {
  try {
    //1. 로그인 되어있는 회원인지 확인
    const dbUser = await getUser();

    if (!dbUser || dbUser?.role !== EnumRole.ADMIN) {
      throw { status: 401, message: "어드민 계정만 업로드 가능합니다." };
    }

    //2. 작성할 글 유효성 검사
    const rawSequence = formData.get("sequence") as string;
    const rawIngredients = formData.get("ingredients") as string;

    // 문자열 → 객체 배열 복원
    const parsedSequence = JSON.parse(rawSequence);
    const parsedIngredients = JSON.parse(rawIngredients);

    const inputData = {
      title: formData.get("title"),
      images: formData.getAll("images") as File[],

      sequence: parsedSequence,
      ingredient: parsedIngredients,

      memo: formData.get("memo"),
    };

    const parseResult = await recipeSchema.safeParseAsync(inputData);
    if (!parseResult.success) {
      throw {
        status: 401,
        message: "입력사항을 확인",
        erros: parseResult.error,
        rawErrors: parseResult.error.issues,
      };
    }

    //3. recipe DB에 입력
    const { title, memo, ingredient, sequence, images } = parseResult.data;
    const createDb = await db.recipe.create({
      data: {
        usersId: dbUser.auth,
        title,
        images: [],
        ingredient,
        sequence,
        memo,
      },
      select: {
        id: true,
      },
    });

    //4. 이미지 스토리이 업로드
    const publicUrl = await uploadImage({
      imageFiles: images,
      folderName: "recipe-images",
      filePath: createDb.id,
    });

    //5. DB수정 - 이미지 스토리지 경로 추가
    await db.recipe.update({
      where: { id: createDb.id },
      data: {
        images: [...publicUrl],
      },
    });

    return { status: 200, message: createDb.id };
    // 리턴
  } catch (error) {
    console.log(error);
  }
}
