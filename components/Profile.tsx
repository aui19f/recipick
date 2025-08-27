import dayjs from "dayjs";
import Image from "next/image";

interface ProfileProps {
  nickname?: string | null;
  email: string;
  created_at: Date;
}
export default function Profile({
  nickname = "",
  email,
  created_at,
}: ProfileProps) {
  return (
    <div className="flex gap-4 p-4 relative">
      <div className="absolute top-2 right-2">
        <Image
          src="/icons/settings.png"
          alt="수정하기"
          width={20}
          height={20}
        />
      </div>
      <div className="rounded-full bg-gray-200 size-20"></div>
      <div>
        <h3>{nickname || ""}</h3>
        <div className="flex gap-2">
          <span className="text-sm bg-gray-200 p-1 rounded-sm">자랑하기 N</span>
          <span className="text-sm bg-gray-200 p-1 rounded-sm">레시피 N</span>
        </div>
        <p>{email}</p>
        <p>{dayjs(created_at).format("YYYY/MM/DD")}</p>
      </div>
    </div>
  );
}
