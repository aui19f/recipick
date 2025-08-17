"use client";
import { FeedType } from "@/app/(user)/actions";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";

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
