export type PhoneInputDto = {
  msisdn: string
  imsi: string
}

export interface PhoneDto {
  id: string
  msisdn: string
  imsi: string
  status: "UNASSIGNED" | "ACTIVE" | "SUSPENDED"
  userId?: string | null
  createdAt: string
}

export type BulkCreatePhonesDto = {
  count: number
}
