"use server"

import type {
  PhoneDto,
  PhoneInputDto,
  BulkCreatePhonesDto,
} from "./types"
import {
  listAdminPhones,
  bulkCreatePhones,
  createPhone,
} from "./api"
import {
  phoneCreateSchema,
  bulkCreatePhonesSchema,
} from "./schema"
import { ZodError } from "zod"

export async function adminListPhonesAction(
  page = 1,
  limit = 50,
  status?: string
): Promise<PhoneDto[]> {
  return listAdminPhones(page, limit, status)
}

export async function bulkCreatePhonesAction(
  raw: unknown
): Promise<BulkCreatePhonesDto> {
  let items: PhoneInputDto[]
  try {
    items = bulkCreatePhonesSchema.parse(raw)
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const first = err.issues[0]
      const line = typeof first.path[0] === "number"
        ? `Ligne ${first.path[0] + 1} – `
        : ""
      throw new Error(`${line}${first.message}`)
    }
    throw err
  }

  return bulkCreatePhones(items)
}

export async function createPhoneAction(
  raw: unknown
): Promise<PhoneDto> {
  let item: PhoneInputDto
  try {
    item = phoneCreateSchema.parse(raw)
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const first = err.issues[0]
      throw new Error(first.message)
    }
    throw err
  }

  return createPhone(item)
}
