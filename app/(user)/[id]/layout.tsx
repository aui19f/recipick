import Profile from "@/components/Profile";

interface ProductLayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  };
}
export default function ProductLayout({
  children,
  params,
}: ProductLayoutProps) {
  const { id } = params;

  return (
    <section>
      {id && <Profile />}
      {/* todo
      <ul>
        <li>작성한글</li>
        <li>좋아요</li>
        <li>저장</li>
      </ul> */}
      <div>{children}</div>
    </section>
  );
}
