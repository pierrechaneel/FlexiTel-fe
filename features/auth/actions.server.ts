"use server";

import { redirect } from "next/navigation";
import { login, logout, signup,  } from "./api";
import { signupSchema } from "./schemas";
import { getErrorMessage } from "@/common/util/errors";
import { setAuthCookie } from "@/features/auth/helpers/cookies";
import type { FormResponse } from "@/common/form-response.interface";
import type { z } from "zod";
import { API_URL } from "@/common/constants/api";
import { LoginDTO } from "./types";
import { JwtPayload } from "./helpers/auth.server";
import { jwtDecode } from "jwt-decode";
import { AUTHENTICATION_COOKIE } from "./constants";
import { cookies } from "next/headers";

export type SignupState = {
  fieldErrors?: Record<string, string[]>;
  formError?: string;
  success?: boolean;
};

export type LoginState = {
  formError?: string;           
  success?: boolean; 
};

export default async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  
  const dto = Object.fromEntries(formData) as LoginDTO;
  const res = await login(dto);
  const json = await res.json();

  if (!res.ok) {
    return { formError: getErrorMessage(json) };
  }

  const raw = res.headers.get("Set-Cookie");
  if (raw) {
    const token = raw.split(";")[0].split("=")[1];
    await setAuthCookie(token);

    const { role } = jwtDecode<JwtPayload>(token);
    if (role === "ADMIN") {
      return redirect("/admin");
    } else {
      return redirect("/subscriptions");
    }
  }

  
  return { formError: "Impossible de récupérer le jeton d’authentification" };
}

export async function signupAction(
  _prev: SignupState,
  formData: FormData
): Promise<SignupState> {
  
  const parsed = signupSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return { fieldErrors };
  }

  const res = await signup(parsed.data);
  const json = await res.json();

  if (!res.ok) {
    return { formError: getErrorMessage(json) };
  }

  const raw = res.headers.get("Set-Cookie");
  if (raw) {
    const token = raw.split(";")[0].split("=")[1];
    await setAuthCookie(token);
  }

  return { success: true };
}


export async function logoutAction() {
  await logout()

  
  ;(await cookies()).delete(AUTHENTICATION_COOKIE)

  
  redirect("/login")
}