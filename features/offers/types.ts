export type OfferDto = {
  id: string
  name: string        
  category?: string  
  price: string      
  validityDays: number
  quotaUnit: string  
  quotaAmount: number
}
