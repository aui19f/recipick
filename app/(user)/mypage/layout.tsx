import getUser from "@/app/actions/getUser";
import Profile from "@/components/Profile";

// import { usePathname } from "next/navigation";
import { redirect } from "next/navigation";
export default async function MasterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const pathname = usePathname();
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  if (!user) {
    // console.log(">>>>>", user);
    redirect("/login");
  }
  return (
    <section>
      {user && <Profile {...user} />}
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
