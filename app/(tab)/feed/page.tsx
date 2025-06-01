import Image from "next/image";

export default function Feed() {
  return (
    <ul>
      <li className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-2 ">
          <div className="bg-gray-100 size-8 rounded-full m"></div>
          <p className="font-bold">Nickname</p>
        </div>
        <div className="bg-gray-100 w-full aspect-square"></div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2.5">
            <Image
              src="/icons/button_send.png"
              width={24}
              height={24}
              alt="logo"
            />
            <Image
              src="/icons/button_share.png"
              width={24}
              height={24}
              alt="logo"
            />

            <Image
              className="ml-auto"
              src="/icons/button_like.png"
              width={24}
              height={24}
              alt="logo"
            />
          </div>
          <div className="flex gap-3">
            <p className="font-bold ">Nickname</p>
            <div>
              <p>
                처음으로 만들어본 사워도우 빵! <br />
                맛있게 구워진 것 같아 만족스럽다. 가족들 다같이 샌드위치
                해먹어야지 <br />
                다음엔 무슨 빵을 해볼까?
              </p>
            </div>
          </div>
        </div>
      </li>
      <li className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-2 ">
          <div className="bg-gray-100 size-8 rounded-full m"></div>
          <p className="font-bold">Nickname</p>
        </div>
        <div className="bg-gray-100 w-full aspect-square"></div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2.5">
            <Image
              src="/icons/button_send.png"
              width={24}
              height={24}
              alt="logo"
            />
            <Image
              src="/icons/button_share.png"
              width={24}
              height={24}
              alt="logo"
            />

            <Image
              className="ml-auto"
              src="/icons/button_like_active.png"
              width={24}
              height={24}
              alt="logo"
            />
          </div>
          <div className="flex gap-3">
            <p className="font-bold ">Nickname</p>
            <div>
              <p>
                처음으로 만들어본 사워도우 빵! <br />
                맛있게 구워진 것 같아 만족스럽다. 가족들 다같이 샌드위치
                해먹어야지 <br />
                다음엔 무슨 빵을 해볼까?
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}
