"use client";
import { FeedType } from "@/app/(user)/actions";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
/**
 * 
 자동 지연 로딩 (Lazy Loading)

next/image는 뷰포트(viewport)에 들어오기 전까지 이미지 로딩을 자동으로 지연시킵니다. 따라서 loading="lazy" 속성을 직접 추가할 필요가 없습니다. 이는 초기 로딩 성능을 크게 향상시킵니다.

반응형 이미지 (Responsive Images)

다양한 화면 크기와 해상도에 맞춰 최적화된 이미지 크기를 자동으로 생성하고, srcset 속성을 사용하여 브라우저가 사용자 환경에 가장 적합한 이미지를 선택하게 합니다. 이를 통해 데이터 전송량을 줄일 수 있습니다.

이미지 최적화 (Image Optimization)

서버리스(Serverless) 함수를 사용하여 이미지를 최적화된 포맷(예: WebP)으로 변환하고, 필요에 따라 이미지 크기를 조정합니다.

개발자가 직접 이미지 최적화 서버를 구축하지 않아도, Next.js가 빌드 시 또는 요청 시점에 이미지를 자동으로 최적화해줍니다.

레이아웃 시프트 방지 (CLS)

next/image는 width와 height 속성을 필수로 요구하여 이미지 로딩 전에 이미지의 크기를 미리 확보합니다. 이를 통해 이미지가 로딩되면서 주변 요소들이 밀리는 현상(Cumulative Layout Shift)을 방지하고 안정적인 UI를 제공합니다.

 * @returns 
 */
export default function Feed({
  user,
  id,
  content,
  images,
  created_at,
}: FeedType) {
  return (
    <li className="w-full ">
      <article className="flex flex-col  border border-gray-200 rounded-md shadow-md">
        <header className="flex h-12 gap-4 items-center px-2">
          <Image src="/icons/user.png" width={32} height={32} alt="User" />
          <p className="flex-1">{user.nickname}</p>
          {/* <p>dayjs().format("YYYY-MM-DD HH:mm:ss")</p> */}
          <p>{formatDate(new Date(created_at))}</p>
        </header>

        {images.length > 0 && images[0] ? (
          <div className="relative w-full aspect-square">
            <Image
              src={images[0]}
              alt={`feed-image-${id}`}
              fill
              className="object-cover rounded-md"
            />
          </div>
        ) : (
          <div className="bg-gray-400 w-full aspect-square"></div>
        )}

        {/*
        상세페이지가 있어야 가능한 기능입니다.
        <div className="flex h-10">
          <div className="p-2.5">
            <Image
              src="/icons/button_send.png"
              width={20}
              height={20}
              alt="공유"
            />
          </div>
          <div className="p-2.5">
            <Image
              src="/icons/button_bookmark.png"
              width={20}
              height={20}
              alt="북마크"
            />
          </div>
          <div className="flex-1"></div>

          <div className="p-2.5">
            <Image
              src="/icons/button_like.png"
              width={20}
              height={20}
              alt="좋아요"
            />
          </div>
        </div> */}
        <figure className="px-2 pb-2 my-2">
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </figure>
        {/* <footer>좋아요, 댓글</footer> */}
      </article>
    </li>
  );
}
// button_like.png;
// .png;
// .png;
