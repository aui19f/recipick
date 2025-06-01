import Image from "next/image";

export default function PageHeader() {
  return (
    <header className="flex h-16 p-4">
      <div className="relative w-full h-full">
        <Image
          src="/icons/logo_sub_recipick.png"
          alt="logo"
          className="h-full w-auto"
          width={520}
          height={126}
          priority
        />
      </div>
      <div className="flex-1"></div>
    </header>
  );
}
