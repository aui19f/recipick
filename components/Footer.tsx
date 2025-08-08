import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-t z-50 flex sm:hidden items-center justify-around border-t border-t-gray-400">
      <nav className="flex-1">
        <ul className="flex gap-4 [&>li]:flex-1">
          <li>
            <Link href="/" className="flex flex-col gap-2">
              <Image
                src="/icons/menu_feed.png"
                width={20}
                height={20}
                alt="자랑하기"
              />
              자랑하기
            </Link>
          </li>
          <li>
            <Link href="/" className="flex flex-col gap-2">
              <Image
                src="/icons/menu_recipe.png"
                width={20}
                height={20}
                alt="레시피"
              />
              레시피
            </Link>
          </li>
          <li>
            <Link href="/" className="flex flex-col gap-2">
              <Image
                src="/icons/menu_writing.png"
                width={20}
                height={20}
                alt="글쓰기"
              />
              글쓰기
            </Link>
          </li>
          <li>
            <Link href="/" className="flex flex-col gap-2">
              <Image
                src="/icons/menu_offline.png"
                width={20}
                height={20}
                alt="행사일정"
              />
              행사일정
            </Link>
          </li>
          <li>
            <Link href="/" className="flex flex-col gap-2 items-center">
              <Image
                src="/icons/menu_mypage.png"
                width={20}
                height={20}
                alt="내정보"
              />
              내정보
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
