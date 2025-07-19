"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { AUTHENTICATION_COOKIE } from "@/features/auth/constants";

export async function setAuthCookie(token: string) {
  (await cookies()).set({
    name: AUTHENTICATION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(jwtDecode<{ exp: number }>(token).exp * 1000),
  });
}
