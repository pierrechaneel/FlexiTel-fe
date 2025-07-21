import { API_URL } from "@/common/constants/api"
import { WalletDto } from "./type"


export async function getWallet(): Promise<WalletDto> {
  const res = await fetch(`${API_URL}/users/me-wallet`, {
    credentials: "include",
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error("Impossible de récupérer votre portefeuille")
  }
  return res.json()
}
