"use server"

import { cookies } from "next/headers"
import { API_URL } from "@/common/constants/api"
import type { PhoneDto, MonitoredDto } from "./types"


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


export async function myPhoneAction(): Promise<PhoneDto[]> {
    return apiFetch("/phones/me")
}


export async function availableAction(): Promise<PhoneDto[]> {
    return apiFetch("/phones/available")
}


export async function claimNumberAction(id: string) {
    return apiFetch(`/phones/${id}/claim`, { method: "POST" })
}


export async function releaseNumberAction(id: string) {
    return apiFetch(`/phones/${id}/release`, { method: "DELETE" })
}


export async function monitoredAction(): Promise<MonitoredDto[]> {
    return apiFetch("/monitored")
}


export async function addMonitoredAction(
    msisdn: string,
    alias?: string
): Promise<MonitoredDto> {
    return apiFetch("/monitored", {
        method: "POST",
        body: JSON.stringify({ msisdn, alias }),
    })
}


export async function updateMonitoredAction(
    id: string,
    alias: string
): Promise<MonitoredDto> {
    return apiFetch(`/monitored/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ alias }),
    })
}


export async function deleteMonitoredAction(id: string) {
    return apiFetch(`/monitored/${id}`, { method: "DELETE" })
}
