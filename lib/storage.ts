/**
 * supabase 이미지 업로드
 */

import { createClient } from "@/lib/supabase/server";

/**
 * Supabase Storage에 이미지를 업로드하고 이미지 ID(경로)를 반환합니다.
 * @param {File} imageFile - 업로드할 File 객체.
 * @param {string} folderName - 이미지를 저장할 폴더명 (예: 'posts', 'profiles').
 * @returns {Promise<string>} - 업로드된 이미지의 Supabase 경로를 반환하는 Promise.
 * @throws {Error} - 이미지 업로드 실패 시 에러를 던집니다.
 */

interface IUploadImageProp {
  imageFiles: File[];
  folderName: string;

  filePath: string;
}
export async function uploadImage({
  imageFiles,
  folderName,

  filePath,
}: IUploadImageProp): Promise<string[]> {
  const supabase = await createClient();

  if (!imageFiles || imageFiles.length === 0) {
    throw new Error("올바른 이미지 파일들을 제공해야 합니다.");
  }

  const imagePath = `${filePath}-${new Date().getTime()}`;

  // 여러 이미지 업로드 작업을 Promise.all로 병렬 처리합니다.
  const uploadPromises = imageFiles.map((imageFile) => {
    // const filePath = `${userId}-${new Date().getTime()}/${crypto.randomUUID()}.jpg`;
    const path = `${imagePath}/${crypto.randomUUID()}.jpg`;
    return supabase.storage
      .from(folderName) // Supabase Storage 버킷 이름
      .upload(path, imageFile, {
        contentType: imageFile.type,
        upsert: true,
      })
      .then(({ error }) => {
        if (error) {
          console.error("이미지 업로드 실패:", error);
          throw new Error("이미지 업로드에 실패했습니다.");
        }
        // return filePath;
        // 업로드 성공 후, 바로 이미지의 공개 URL을 가져와 반환합니다.
        const { data: publicUrlData } = supabase.storage
          .from(folderName)
          .getPublicUrl(path);

        if (!publicUrlData || !publicUrlData.publicUrl) {
          throw new Error("이미지 URL을 가져오는데 실패했습니다.");
        }

        return publicUrlData.publicUrl;
      });
  });

  try {
    const uploadedPaths = await Promise.all(uploadPromises);
    return uploadedPaths;
  } catch (error) {
    console.error("예상치 못한 오류 발생:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "예상치 못한 오류가 발생했습니다.";
    throw new Error(errorMessage);
  }
}
