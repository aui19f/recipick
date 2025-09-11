"use server";
import { getUser } from "@/app/actions/getUser";
import db from "@/lib/db";
import { uploadImage } from "@/lib/storage";
import { recipeSchema } from "@/schemas/recipe.schemas";
import { EnumRole } from "@prisma/client";

export default async function RecipeForm(_: unknown, formData: FormData) {
  try {
    //1. 로그인 되어있는 회원인지 확인
    const dbUser = await getUser();
    if (!dbUser || dbUser?.role !== EnumRole.ADMIN) {
      throw { status: 401, message: "어드민 계정만 업로드 가능합니다." };
    }

    //2. 작성할 글 유효성 검사
    // sequence,ingredient -- 문자열 → 객체 배열 복원
    const rawSequence = formData.get("sequence") as string;
    const rawIngredients = formData.get("ingredients") as string;
    //
    const inputData = {
      title: formData.get("title"),
      images: formData.getAll("images") as File[],
      sequence: JSON.parse(rawSequence),
      ingredient: JSON.parse(rawIngredients),
      memo: formData.get("memo"),
    };

    const parseResult = await recipeSchema.safeParseAsync(inputData);
    if (!parseResult.success) {
      const errorIssues = parseResult.error.issues;

      const errors: { [key: string]: string } = {};
      // 에러 메시지 출력
      errorIssues.forEach((issue) => {
        const keyName = String(issue.path[0]);
        if (Object.keys(errors).includes(keyName)) {
          errors[keyName] = `${errors[keyName]} / ${issue.message}`;
        } else {
          errors[keyName] = issue.message;
        }
      });

      return {
        status: 401,
        message: "입력사항을 확인",
        errors,
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

    return { status: 200, message: createDb.id, errors: null };
    // 리턴
  } catch (err: unknown) {
    console.log(err);
    return {
      status: 401,
      message: "",
      errors: null,
    };
  }
}
