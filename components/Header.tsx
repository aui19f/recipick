import Image from "next/image";

export default function Headedr() {
  return (
    <div className=" flex items-center h-full w-full px-2">
      <div className="relative max-w-full min-w-1/3 h-full">
        <Image
          src="/icons/logo_sub_recipick.png"
          alt="logo"
          fill={true}
          className="object-contain"
        />
      </div>
      <Image
        src="/icons/header_bell.png"
        alt="bell"
        width={28}
        height={28}
        className="ml-auto"
      />
    </div>
  );
}
