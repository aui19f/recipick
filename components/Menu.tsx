import Image from "next/image";

export default function Menu() {
  return (
    <ul
      className=" 
     flex justify-center items-center h-16
     *:flex-1 *:flex *:flex-col *:gap-1 *:items-center "
    >
      <li>
        <Image
          src="/icons/menu_feed.png"
          alt="menu_feed"
          width={28}
          height={28}
        />
        <p className="text-sm">자랑하기</p>
      </li>
      <li>
        <Image
          src="/icons/menu_recipe.png"
          alt="menu_recipe"
          width={28}
          height={28}
        />
        <p className="text-sm">레시피</p>
      </li>
      <li>
        <Image
          src="/icons/menu_writing.png"
          alt="menu_writing"
          width={28}
          height={28}
        />
        <p className="text-sm">글쓰기</p>
      </li>
      <li>
        <Image
          src="/icons/menu_offline.png"
          alt="logo"
          width={28}
          height={28}
        />
        <p className="text-sm">행사일정</p>
      </li>
      <li>
        <Image
          src="/icons/menu_mypage.png"
          alt="menu_mypage"
          width={28}
          height={28}
        />
        <p className="text-sm">마이페이지</p>
      </li>
    </ul>
  );
}
