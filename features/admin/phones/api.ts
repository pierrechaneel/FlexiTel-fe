import { apiFetch } from "@/lib/api/client"
import type { PhoneDto, PhoneInputDto, BulkCreatePhonesDto } from "./types"

export function listAdminPhones(
  page = 1, limit = 50, status?: string
): Promise<PhoneDto[]> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (status) params.set("status", status)
  return apiFetch<PhoneDto[]>(`/admin/phones?${params.toString()}`)
}

export function bulkCreatePhones(
  items: PhoneInputDto[]
): Promise<BulkCreatePhonesDto> {
  return apiFetch<BulkCreatePhonesDto>("/admin/phones", {
    method: "POST",
    body: JSON.stringify(items),
  })
}

export function createPhone(
  item: PhoneInputDto
): Promise<PhoneDto> {
  return apiFetch<PhoneDto>("/admin/phones", {
    method: "POST",
    body: JSON.stringify(item),
  })
}