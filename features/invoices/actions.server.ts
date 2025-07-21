"use server"
import { cookies } from "next/headers"
import { listInvoices } from "./api"
import { InvoiceDto } from "./types"
import { API_URL } from "@/common/constants/api"

export async function invoicesAction(
  page = 1,
  limit = 10,
  year?: number,
): Promise<InvoiceDto[]> {      
  const token = (await cookies()).get("Authentication")?.value
 
  return listInvoices(token, page, limit, year)
}

export async function getInvoice(id: string): Promise<InvoiceDto> {
  const res = await fetch(`${API_URL}/invoices/${id}`, {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('fetch invoice failed')
  return res.json()
}