"use server"
import { API_URL } from "@/common/constants/api"
import { listOffers } from "./api"
import { cookies } from "next/headers"

export async function offersAction() {
    const cookieStore = await cookies()
    const token = cookieStore.get("Authentication")?.value
    return listOffers(token)
  
}


export async function phoneAction(): Promise<string | null> {
  const token = (await cookies()).get("Authentication")?.value

  const res = await fetch(`${API_URL}/phones/me`, {
    cache: "no-store",
    headers: token ? { cookie: `Authentication=${token}` } : {},
  })

  if (!res.ok) throw new Error("Impossible de récupérer le numéro de téléphone")
  const phones: { id: string }[] = await res.json()

  
  return phones[0]?.id ?? null
}

export async function subscribeOfferAction(
  offerId: string,
  phoneId: string,
) {
  const token = (await cookies()).get("Authentication")?.value

  const res = await fetch(`${API_URL}/offers/${offerId}/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { cookie: `Authentication=${token}` } : {}),
    },
    body: JSON.stringify({ phoneId }),
  })

  if (!res.ok) {
    const { message = "Erreur inconnue" } = await res.json().catch(() => ({}))
    throw new Error(message)
  }

  return res.json() 
}