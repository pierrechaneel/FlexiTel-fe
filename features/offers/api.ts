import { API_URL } from "@/common/constants/api"
import type { OfferDto } from "./types"

export async function listOffers(token: string | undefined): Promise<OfferDto[]> {
  const res = await fetch(`${API_URL}/offers`, {
      headers: token ? { cookie: `Authentication=${token}` } : {},
      cache: "no-store", 
    })
  
    if (!res.ok) {
      throw new Error("Erreur : impossible de charger les abonnements")
    }
    return res.json() as Promise<OfferDto[]>
}
