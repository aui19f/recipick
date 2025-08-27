"use client"; // 이 파일이 클라이언트 컴포넌트임을 명시

import {
  getOfflineDetail,
  OfflineFindUnique,
} from "@/app/(user)/offline/actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useParams, useRouter } from "next/navigation";
import DOMPurify from "dompurify"; // DOMPurify 라이브러리 임포트
import { useEffect } from "react";

export default function OfflineDetailContents() {
  const router = useRouter();

  const queryClient = useQueryClient();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { data, isPending, isError } = useQuery<OfflineFindUnique>({
    queryKey: ["offline", id],
    queryFn: () => getOfflineDetail(id as string), // 서버 요청
    initialData: () => {
      // 이미 캐시된 개별 아이템이 있으면 즉시 사용
      return queryClient.getQueryData(["offline", id]);
    },
  });

  // DOMPurify를 사용하여 HTML을 소독합니다.
  const sanitizedContent = (content: string) => DOMPurify.sanitize(content);

  // 데이터가 없거나 에러가 발생하면 /offline으로 리디렉션합니다.
  useEffect(() => {
    if (!isPending && (isError || !data)) {
      router.push("/offline");
    }
  }, [isPending, isError, data, router]);

  return (
    <div className="flex flex-col gap-4 items-center px-6">
      <div className="bg-gray-200 w-60 aspect-square"></div>
      <h2 className="text-xl font-bold">
        {data?.title} in {data?.placeName}
      </h2>

      {data?.content && (
        <div
          dangerouslySetInnerHTML={{ __html: sanitizedContent(data.content) }}
        />
      )}

      <div className="flex items-center gap-2">
        <div className="bg-gray-200 w-6 aspect-square"></div>
        <p>공식 페이지로 이동하기</p>
      </div>
    </div>
  );
}

/**
 * HTML Sanitization (소독)
 * HTML 소독은 악의적인 스크립트 태그나 속성(script, onload 등)을 제거하여 안전하게 만드는 과정
 * 이를 위해 dompurify와 같은 라이브러리를 사용하는 것이 일반적
 * npm install dompurify
 
 */
