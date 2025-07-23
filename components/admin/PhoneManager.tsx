"use client"
import * as React from "react"
import { PlusIcon } from "lucide-react"
import toast from "react-hot-toast"
import ExcelJS from "exceljs"

import { FormDialog } from "@/components/FormDialog"
import { DataTable }  from "@/components/DataTable"
import { Button }     from "@/components/ui/button"
import { Input }      from "@/components/ui/input"
import { Label }      from "@/components/ui/label"

import { phoneColumns } from "@/features/admin/phones/columns"
import {
  adminListPhonesAction,
  createPhoneAction,
  bulkCreatePhonesAction,
} from "@/features/admin/phones/actions.server"
import type { PhoneDto, PhoneInputDto } from "@/features/admin/phones/types"

export function PhoneManager() {
  const [phones, setPhones] = React.useState<PhoneDto[]>([])
   const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    setLoading(true) 
    adminListPhonesAction()
      .then((data) => {
        setPhones(data)
      })
      .catch(() => {
        toast.error("Impossible de charger les numéros")
      })
      .finally(() => {
        setLoading(false)  
      })
  }, [])

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const buf = await file.arrayBuffer()
      const wb  = new ExcelJS.Workbook()
      await wb.xlsx.load(buf)

      const ws = wb.getWorksheet(1)
      if (!ws) throw new Error("Feuille non trouvée")

      const items: PhoneInputDto[] = []
      ws.eachRow((row, idx) => {
        if (idx === 1) return
        const msisdn = row.getCell(1).text.toString().trim()
        const imsi   = row.getCell(2).text.toString().trim()
        items.push({ msisdn, imsi })
      })

      await bulkCreatePhonesAction(items)
      setPhones(await adminListPhonesAction())
      toast.success(`Import OK (${items.length} numéros)`)
    } catch (err: any) {
      const zErr = Array.isArray(err.errors) && err.errors[0]
      toast.error(zErr?.message ?? err.message ?? "Erreur import Excel")
    }
  }

  return (
    <>
      <div className="flex justify-end mb-4 gap-4">
        <FormDialog
          trigger={<Button><PlusIcon /> Ajouter</Button>}
          title="Ajouter un numéro"
          description="MSISDN (12 chiffres) + IMSI (numérique)"
          onSubmit={async (form) => {
            const msisdn = form.get("msisdn") as string
            const imsi   = form.get("imsi")   as string
            try {
              await createPhoneAction({ msisdn, imsi })
              setPhones(await adminListPhonesAction())
              toast.success("Numéro ajouté")
            } catch (err: any) {
              const zErr = Array.isArray(err.errors) && err.errors[0]
              toast.error(zErr?.message ?? err.message ?? "Erreur ajout")
            }
          }}
        >
          <div className="grid gap-4">
            <div>
              <Label htmlFor="msisdn">MSISDN</Label>
              <Input id="msisdn" name="msisdn" required />
            </div>
            <div>
              <Label htmlFor="imsi">IMSI</Label>
              <Input id="imsi" name="imsi" required />
            </div>
          </div>
        </FormDialog>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFile}
          className="border px-3 py-2 rounded"
        />
      </div>

      <DataTable columns={phoneColumns} data={phones} loading={loading} />
    </>
  )
}
