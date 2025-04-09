import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

const protectedRoutes = ["/dashboard", '/create-comment', '/'];
const publicRoutes = ["/login"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookieStore = cookies();
  const cookie = (await cookieStore).get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null; 

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
