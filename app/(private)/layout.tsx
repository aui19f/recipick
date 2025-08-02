import getUser from "@/app/actions/getUser";
import { UserProvider } from "@/components/provider/UserProvider";

export default async function MasterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUser();

  if (!user) {
    // redirect("/");
    console.log("redirect -> /");
  }

  return <UserProvider user={user}>{children}</UserProvider>;
}
