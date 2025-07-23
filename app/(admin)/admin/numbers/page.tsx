

import { PhoneManager } from "@/components/admin/PhoneManager"
import {  PhonesTable } from "@/components/admin/PhonesTable"
import { adminListPhonesAction } from "@/features/admin/phones/actions.server"
import { phoneColumns } from "@/features/admin/phones/columns"


export const metadata = {
  title: "Administration des téléphones",
}

export default async function AdminPhonesPage() {
  //const phones = await adminListPhonesAction()

  return (
    <section className="p-6 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion des numéros</h1>
      </header>
     <PhoneManager />
    </section>
  )
}
