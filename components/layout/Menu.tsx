import { useUserStore } from "@/store/useUserStore";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Menu() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserStore();

  const handleWriteClick = () => {
    if (user) {
      if (pathname === "/" || pathname === "") {
        router.push("/writing/show");
      } else if (pathname.startsWith("/recipe")) {
        router.push("/writing/recipe");
      } else {
        router.push("/writing");
      }
    } else {
    }
  };

  const handleMyPage = async () => {
    if (user) {
      router.push(`/${user.id}`);
    } else {
      router.push("/login");
    }
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" || pathname === "";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav>
      <ul className="flex gap-4 [&>li]:flex-1 sm:flex-col">
        <li>
          <Link
            href="/"
            className="flex items-center justify-center  sm:justify-start cursor-pointer"
          >
            <Image
              src={
                isActive("/")
                  ? "/icons/menu_feed_active.png"
                  : "/icons/menu_feed.png"
              }
              width={24}
              height={24}
              alt="자랑하기"
            />
            <p className="hidden sm:block sm:ml-2">자랑하기</p>
          </Link>
        </li>
        <li>
          <Link
            href="/recipe"
            className="flex items-center justify-center  sm:justify-start cursor-pointer"
          >
            <Image
              src={
                isActive("/recipe")
                  ? "/icons/menu_recipe_active.png"
                  : "/icons/menu_recipe.png"
              }
              width={20}
              height={20}
              alt="레시피"
            />{" "}
            <p className="hidden sm:block sm:ml-2">레시피</p>
          </Link>
        </li>

        <li
          onClick={handleWriteClick}
          className="flex items-center justify-center  sm:justify-start cursor-pointer"
        >
          <Image
            src={
              isActive("/writing")
                ? "/icons/menu_writing_active.png"
                : "/icons/menu_writing.png"
            }
            width={20}
            height={20}
            alt="글쓰기"
          />
          <p className="hidden sm:block sm:ml-2">글쓰기</p>
        </li>
        <li>
          <Link
            href="/offline"
            className="flex items-center justify-center sm:justify-start cursor-pointer"
          >
            <Image
              src={
                isActive("/offline")
                  ? "/icons/menu_offline_active.png"
                  : "/icons/menu_offline.png"
              }
              width={20}
              height={20}
              alt="행사일정"
            />{" "}
            <p className="hidden sm:block sm:ml-2">행사일정</p>
          </Link>
        </li>

        <li
          onClick={handleMyPage}
          className="flex items-center justify-center sm:justify-start cursor-pointer"
        >
          <Image
            src={
              isActive(`/${user?.id}`)
                ? "/icons/menu_mypage_active.png"
                : "/icons/menu_mypage.png"
            }
            width={20}
            height={20}
            alt="내정보"
          />{" "}
          <p className="hidden sm:block sm:ml-2">내정보</p>
        </li>
      </ul>
    </nav>
  );
}
