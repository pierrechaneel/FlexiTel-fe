"use server"

import { cookies } from "next/headers"
import { listSubscriptions } from "./api"
import { API_URL } from "@/common/constants/api"

export async function subscriptionsAction() {
    const cookieStore = await cookies()
    const token = cookieStore.get("Authentication")?.value
    return listSubscriptions(token)
}

export async function cancelSubscriptionAction(subId: string) {
    const token = (await cookies()).get("Authentication")?.value
    const res = await fetch(`${API_URL}/subscriptions/${subId}`, {
        method: "DELETE",
        headers: token ? { cookie: `Authentication=${token}` } : {},
    })
    if (!res.ok) {
        const { message = "Erreur inconnue" } = await res.json().catch(() => ({}))
        throw new Error(message)
    }
}