import { getUser } from "@/app/actions/getUser";
import { redirect } from "next/navigation";

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUser();
  if (user) {
    redirect("/");
  }
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center bg-slate-50">
      {children}
    </main>
  );
}
