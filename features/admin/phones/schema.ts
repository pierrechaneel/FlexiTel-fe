import { z } from "zod"

export const phoneCreateSchema = z.object({
  msisdn: z
    .string()
    .regex(/^\d{12}$/, "Le MSISDN (243XXXXXXXXX) doit faire 12 chiffres")
    .describe("243XXXXXXXXX"),
  imsi: z
    .string()
    .regex(/^\d+$/, "L'IMSI doit être numérique"),
})

export const bulkCreatePhonesSchema = z
  .array(phoneCreateSchema)
  .nonempty("Vous devez fournir au moins un numéro")

export type PhoneCreateInput = z.infer<typeof phoneCreateSchema>
export type BulkCreateInput  = z.infer<typeof bulkCreatePhonesSchema>
