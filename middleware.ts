// middleware.ts
// import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

//export async function middleware(req: Request)
export async function middleware() {
  const res = NextResponse.next();
  // const supabase = await createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // 특정 URL 보호

  return res;
}
