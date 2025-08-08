import Image from "next/image";
import Link from "next/link";

export default function Recipe() {
  return (
    <div className="h-full overflow-auto flex flex-col p-2">
      <header></header>
      <section className="p-2">
        <ul className="grid  gap-8 max-w-5xl mx-auto grid-cols-1 scroll-auto sm:grid-cols-3 sm:gap-6">
          {Array.from({ length: 10 }, (_, index) => (
            <li key={index} className="flex flex-col gap-1">
              <Link href="recipe/123">
                <div className="relative ">
                  <div className="aspect-square bg-gray-200"></div>
                  <div className="absolute top-1 right-1 flex items-center gap-1 py-1 px-2 bg-gray-600 rounded-lg">
                    <Image
                      src="/icons/button_like_active.png"
                      width={16}
                      height={16}
                      alt="좋아요"
                    />
                    <span className="text-sm">1</span>

                    <Image
                      src="/icons/button_bookmark_active.png"
                      width={16}
                      height={16}
                      alt="좋아요"
                    />
                    <span className="text-sm">1</span>
                  </div>
                </div>

                <div className="flex items-end">
                  <h4 className="flex-1 font-bold">(제목)홍차맛스콘</h4>
                  <div className="text-sm">YY/MM/DD</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
