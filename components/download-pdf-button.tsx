'use client'

import { useTransition } from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

import { getInvoice } from '@/features/invoices/actions.server'
import type { InvoiceDto, InvoiceLine } from '@/features/invoices/types'
import toast from 'react-hot-toast'

/* convertit forme union en tableau */
const asArray = (lines: InvoiceDto['lines']): InvoiceLine[] =>
  Array.isArray(lines) ? lines : lines.set

export default function DownloadPdfButton({ id }: { id: string }) {
  const [pending, start] = useTransition()

  async function handle() {
    start(async () => {
      try {
        const inv: InvoiceDto = await getInvoice(id)

        const doc = new jsPDF()
        doc.setFontSize(18).text('FACTURE', 105, 20, { align: 'center' })

        doc.setFontSize(11)
        doc.text(
          `Émise le ${format(new Date(), 'dd MMMM yyyy', { locale: fr })}`,
          14,
          35,
        )
        doc.text(
          `Période : ${format(new Date(inv.month), 'LLLL yyyy', { locale: fr })}`,
          14,
          42,
        )
        if (inv.user) {
          doc.text(
            `Client  : ${inv.user.firstName ?? ''} ${inv.user.lastName ?? ''}`,
            14,
            49,
          )
          doc.text(`Email   : ${inv.user.email}`, 14, 56)
        }

        autoTable(doc, {
          startY: 65,
          head: [['Offre', 'Numéro', 'Prix (€)']],
          body: asArray(inv.lines).map((l) => [
            l.offer,
            l.phone,
            l.price.toString(),
          ]),
        })

        const fy = (doc as any).lastAutoTable.finalY || 85
        doc.setFont('helvetica', 'bold').setFontSize(12)
        doc.text(`TOTAL : ${inv.amount} €`, 190, fy + 10, { align: 'right' })

        doc.save(`facture-${format(new Date(inv.month), 'yyyy-MM')}.pdf`)
      } catch {
        toast.error('Impossible de générer le PDF')
      }
    })
  }

  return (
    <button
      disabled={pending}
      onClick={handle}
      className="w-full rounded-md bg-primary py-2 text-primary-foreground hover:bg-primary/90"
    >
      {pending ? 'Chargement…' : 'Télécharger le PDF'}
    </button>
  )
}
