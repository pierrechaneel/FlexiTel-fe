export type SubscriptionDto = {
  id: string
  status: "ACTIVE" | "EXPIRED" | "CANCELED"
  remaining: number
  startDate: string
  endDate: string
  offer: {
    name: string
    price: string
    category:string
    quotaAmount: number
    quotaUnit: string
  }
  phone: { msisdn: string }
}
