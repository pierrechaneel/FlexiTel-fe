import InvoiceTable from "@/components/invoice-table"
import YearFilter from "@/components/year-filter"
import { invoicesAction } from "@/features/invoices/actions.server"
import type { InvoiceDto } from "@/features/invoices/types"

type Search = { page?: string; year?: string }

export const metadata = { title: "Mes factures" }

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams?: Search
}) {
  const page = Number(searchParams?.page) || 1
  const year = Number(searchParams?.year) || undefined

  const invoices: InvoiceDto[] = await invoicesAction(page, 10, year)
    .catch((): InvoiceDto[] => [])

  return (
    <section className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mes factures</h1>
        <YearFilter years={[2025, 2024, 2023]} />
      </header>

      <InvoiceTable data={invoices} />
    </section>
  )
}
