import Image from "next/image";

export default function Feed() {
  return (
    <li className="w-full ">
      <article className="flex flex-col  border border-gray-200 rounded-md shadow-md">
        <header className="flex h-12 gap-4 items-center px-2">
          <Image src="/icons/user.png" width={32} height={32} alt="User" />
          <p className="flex-1">PINKDIN</p>
          <p>YYYY/MM/DD</p>
        </header>

        <div className="bg-gray-400 w-full aspect-square"></div>

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
        </div>
        <figure className="px-2 pb-2">
          <p className="text-sm">
            처음으로 만들어본 사워도우 빵!
            <br />
            맛있게 구워진 것 같아 만족스럽다. 가족들 다같이 ...
          </p>
        </figure>
        {/* <footer>좋아요, 댓글</footer> */}
      </article>
    </li>
  );
}
// button_like.png;
// .png;
// .png;
