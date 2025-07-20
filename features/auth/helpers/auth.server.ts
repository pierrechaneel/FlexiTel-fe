"use server";

import { cookies } from "next/headers";
import {jwtDecode} from "jwt-decode";
import { AUTHENTICATION_COOKIE } from "../constants";


export type JwtPayload = {
  userId: string;
  role: "USER" | "ADMIN";
  email:string,
  iat: number;
  exp: number;
};


export async function getCurrentUserFromCookies(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTHENTICATION_COOKIE)?.value;
  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}
