"use server";

import { cookies } from "next/headers";
import { API_URL } from "@/common/constants/api";
import { AUTHENTICATION_COOKIE } from "@/features/auth/constants";  
import { WalletDto } from "./type";

export async function getWalletServer(): Promise<WalletDto> {
  const cookieStore = cookies();
  const token = (await cookieStore).get(AUTHENTICATION_COOKIE)?.value;
  if (!token) {
    throw new Error("Non authentifié");
  }

  const res = await fetch(`${API_URL}/users/me-wallet`, {
    headers: {
      Cookie: `${AUTHENTICATION_COOKIE}=${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Impossible de récupérer votre portefeuille");
  }

  return res.json() as Promise<WalletDto>;
}
