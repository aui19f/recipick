// middleware.ts
// import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

//export async function middleware(req: Request)
export async function middleware() {
  const res = NextResponse.next();

  return res;
}
