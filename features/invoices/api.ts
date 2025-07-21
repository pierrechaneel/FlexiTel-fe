import { API_URL } from "@/common/constants/api"
import type { InvoiceDto } from "./types"

export async function listInvoices(
  token?: string,
  page = 1,
  limit = 10,
  year?: number,
): Promise<InvoiceDto[]> {          
  const url = new URL(`${API_URL}/invoices`)
  url.searchParams.set("page", String(page))
  url.searchParams.set("limit", String(limit))
  if (year) url.searchParams.set("year", String(year))

  const res = await fetch(url.toString(), {
    cache: "no-store",
    headers: token ? { cookie: `Authentication=${token}` } : {},
  })
   console.log('invoice', res)
  if (!res.ok) throw new Error("Impossible de charger les factures")

 
  return (await res.json()) as InvoiceDto[]
}
