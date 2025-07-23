"use client"

import { DataTable }    from "@/components/DataTable"
import { phoneColumns } from "@/features/admin/phones/columns"
import { PhoneDto } from "@/features/admin/phones/types"


interface PhonesTableProps {
  data: PhoneDto[]
}

export function PhonesTable({ data }: PhonesTableProps) {
  return <DataTable columns={phoneColumns} data={data} />
}
