import getUser from "@/app/actions/getUser";
import BackButton from "@/components/forms/BackButton";
import Button, { variantEnum } from "@/components/forms/Button";
import { UserProvider } from "@/components/provider/UserProvider";

export default async function MasterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUser();
  // const router = useRouter();

  // const handleGoBack = () => {
  //   router.back(); // 이전 페이지로 이동
  // };
  if (!user) {
    // redirect("/");
    console.log("redirect -> /");
  }

  return (
    <UserProvider user={user}>
      <header className="flex items-center justify-between p-4 border-b border-gray-200 ">
        <BackButton />
        <h1 className="text-lg font-bold">자랑하기</h1>
        <Button variant={variantEnum.secondary}>등록</Button>
      </header>
      {children}
    </UserProvider>
  );
}
