"use client";
import Button from "@/components/forms/Button";
import { useUserStore } from "@/sotre/useUserStore";
import { redirect } from "next/navigation";

export default function Mypage() {
  const { user } = useUserStore();
  const loginPage = () => {
    redirect("/login");
  };
  if (user) {
    return <>로그인한 유저</>;
  } else {
    return (
      <>
        {user}

        <Button onClick={() => loginPage()}>LOGIN</Button>
      </>
    );
  }
}
