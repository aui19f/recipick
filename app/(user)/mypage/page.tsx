"use client";
import Button from "@/components/forms/Button";
import { redirect } from "next/navigation";

export default function Mypage() {
  const loginPage = () => {
    redirect("/login");
  };
  return (
    <>
      <p>test Login</p>
      <Button onClick={() => loginPage()}>LOGIN</Button>
    </>
  );
}
