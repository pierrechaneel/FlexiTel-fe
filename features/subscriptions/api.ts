import { API_URL } from "@/common/constants/api"
import type { SubscriptionDto } from "./types"


export async function listSubscriptions(token?: string) {
  const res = await fetch(`${API_URL}/subscriptions`, {
    headers: token ? { cookie: `Authentication=${token}` } : {},
    cache: "no-store", 
  })

  if (!res.ok) {
    throw new Error("Erreur : impossible de charger les abonnements")
  }
  return res.json() as Promise<SubscriptionDto[]>
}
