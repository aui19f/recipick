import { useUserStore } from "@/store/useUserStore";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
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
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-t z-50 flex sm:hidden items-center justify-around border-t border-t-gray-400">
      {/* <ModalLogin /> */}
      <nav className="flex-1">
        <ul className="flex gap-4 [&>li]:flex-1">
          <li>
            <Link href="/" className="flex flex-col items-center">
              <Image
                src={
                  isActive("/")
                    ? "/icons/menu_feed_active.png"
                    : "/icons/menu_feed.png"
                }
                width={20}
                height={20}
                alt="자랑하기"
              />
            </Link>
          </li>
          <li>
            <Link href="/recipe" className="flex flex-col items-center">
              <Image
                src={
                  isActive("/recipe")
                    ? "/icons/menu_recipe_active.png"
                    : "/icons/menu_recipe.png"
                }
                width={20}
                height={20}
                alt="레시피"
              />
            </Link>
          </li>

          <li onClick={handleWriteClick} className="flex flex-col items-center">
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
          </li>
          <li>
            <Link href="/offline" className="flex flex-col items-center">
              <Image
                src={
                  isActive("/offline")
                    ? "/icons/menu_offline_active.png"
                    : "/icons/menu_offline.png"
                }
                width={20}
                height={20}
                alt="행사일정"
              />
            </Link>
          </li>

          <li onClick={handleMyPage}>
            <Image
              src={
                isActive(`/${user?.id}`)
                  ? "/icons/menu_mypage_active.png"
                  : "/icons/menu_mypage.png"
              }
              width={20}
              height={20}
              alt="내정보"
            />
          </li>
        </ul>
      </nav>
    </footer>
  );
}
