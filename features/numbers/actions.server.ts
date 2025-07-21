"use server"

import { cookies } from "next/headers"
import { API_URL } from "@/common/constants/api"
import type { PhoneDto, MonitoredDto } from "./types"

/** helper générique */
async function apiFetch<T>(
    path: string,
    init?: Omit<RequestInit, "headers">
): Promise<T> {
    const token = (await cookies()).get("Authentication")?.value
    const res = await fetch(`${API_URL}${path}`, {
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Cookie: `Authentication=${token}` } : {}),
        },
        ...init,
    })
    if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`)
    return res.json()
}

/** Mon “own” phone(s) */
export async function myPhoneAction(): Promise<PhoneDto[]> {
    return apiFetch("/phones/me")
}

/** Numéros dispo à claim */
export async function availableAction(): Promise<PhoneDto[]> {
    return apiFetch("/phones/available")
}

/** Claim d’un numéro libre */
export async function claimNumberAction(id: string) {
    return apiFetch(`/phones/${id}/claim`, { method: "POST" })
}

/** Libération d’un numéro (DELETE sur /release) */
export async function releaseNumberAction(id: string) {
    return apiFetch(`/phones/${id}/release`, { method: "DELETE" })
}

/** Lister mes numéros surveillés */
export async function monitoredAction(): Promise<MonitoredDto[]> {
    return apiFetch("/monitored")
}

/** Ajouter un numéro à surveiller */
export async function addMonitoredAction(
    msisdn: string,
    alias?: string
): Promise<MonitoredDto> {
    return apiFetch("/monitored", {
        method: "POST",
        body: JSON.stringify({ msisdn, alias }),
    })
}

/** Mettre à jour l’alias d’un numéro surveillé */
export async function updateMonitoredAction(
    id: string,
    alias: string
): Promise<MonitoredDto> {
    return apiFetch(`/monitored/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ alias }),
    })
}

/** Supprimer un numéro surveillé */
export async function deleteMonitoredAction(id: string) {
    return apiFetch(`/monitored/${id}`, { method: "DELETE" })
}
