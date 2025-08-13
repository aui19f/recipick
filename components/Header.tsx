import Image from "next/image";
import Link from "next/link";

export default function Headedr() {
  return (
    // <div className=" flex items-center h-full w-full px-2">
    //   <div className="relative max-w-full min-w-1/3 h-full">

    //   </div>
    //   <Image
    //     src="/icons/header_bell.png"
    //     alt="bell"
    //     width={28}
    //     height={28}
    //     className="ml-auto"
    //   />
    // </div>

    <header className="fixed top-0 left-0 right-0 h-[80px] bg-white shadow-md hidden sm:flex items-center justify-between px-4 gap-8">
      <div className="relative w-32 h-12">
        <Image
          src="/icons/logo_sub_recipick.png"
          alt="logo"
          fill={true}
          className="object-contain"
        />
      </div>
      <nav className="flex-1">
        <ul className="flex gap-6">
          <li>
            <Link href="/" className="flex gap-2">
              <Image
                src="/icons/menu_feed.png"
                width={24}
                height={24}
                alt="자랑하기"
              />
              자랑하기
            </Link>
          </li>
          <li>
            <Link href="/recipe" className="flex gap-2">
              <Image
                src="/icons/menu_recipe.png"
                width={24}
                height={24}
                alt="레시피"
              />
              레시피
            </Link>
          </li>

          <li>
            <Link href="/offline" className="flex gap-2">
              <Image
                src="/icons/menu_offline.png"
                width={24}
                height={24}
                alt="행사일정"
              />
              행사일정
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex gap-4">
        <div>
          <Image
            src="/icons/header_search.png"
            width={24}
            height={24}
            alt="행사일정"
          />
        </div>
        <div>
          <Image
            src="/icons/header_bell.png"
            width={24}
            height={24}
            alt="행사일정"
          />
        </div>
      </div>
    </header>
  );
}

// show off
// Recipe
// Writing
// Event schedule
// My information
