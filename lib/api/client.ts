import { cookies } from "next/headers"
import { API_URL }  from "@/common/constants/api"

export async function apiFetch<T>(
  path: string,
  opts?: Omit<RequestInit, "headers">
): Promise<T> {
  const token = (await cookies()).get("Authentication")?.value
  const res = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Cookie: `Authentication=${token}` }),
    },
    ...opts,
  })

  let data: any = null
  try {
    data = await res.json()
  } catch {
  }

  if (!res.ok) {
    throw new Error(data?.message ?? res.statusText)
  }

  return data
}
