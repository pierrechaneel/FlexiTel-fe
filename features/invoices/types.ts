export type InvoiceLine = {
  offer: string
  phone: string
  price: number | string          
}

            
export type InvoiceUser = {
  firstName: string | null
  lastName:  string | null
  email:     string
}


export type InvoiceDto = {
  id:        string
  month:     string              
  amount:    string             
  createdAt: string             
  pdfUrl:    string | null
  user?:     InvoiceUser         
  lines:
    | InvoiceLine[]              
    | { set: InvoiceLine[] }     
}
