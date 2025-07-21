'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import type { InvoiceDto } from '@/features/invoices/types'
import DownloadPdfButton from '@/components/download-pdf-button'

/* ---------- helpers ---------- */
function euros(val: string | number) {
  return parseFloat(val as any).toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  })
}

/* ---------- composant ---------- */
export default function InvoiceTable({ data = [] }: { data?: InvoiceDto[] }) {
  const [selected, setSelected] = useState<InvoiceDto | null>(null)

  /* gère { set: [...] } ou tableau direct */
  const toArray = (lines: any): any[] =>
    Array.isArray(lines) ? lines : Array.isArray(lines?.set) ? lines.set : []

  return (
    <>
      {/* tableau */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mois</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell>
                {format(new Date(inv.month), 'LLLL yyyy', { locale: fr })}
              </TableCell>
              <TableCell>{euros(inv.amount)}</TableCell>
              <TableCell>
                <Button size="sm" onClick={() => setSelected(inv)}>
                  Voir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* modal détail */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Facture –{' '}
                  {format(new Date(selected.month), 'LLLL yyyy', { locale: fr })}
                </DialogTitle>
              </DialogHeader>

              {/* date d'émission */}
              <p className="text-sm text-muted-foreground mb-2">
                Émise le{' '}
                {format(new Date(selected.createdAt), 'dd MMMM yyyy', {
                  locale: fr,
                })}
              </p>

              {/* lignes */}
              <div className="space-y-2">
                {toArray(selected.lines).map((l, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>
                      {l.offer} – {l.phone}
                    </span>
                    <span className="font-medium">{euros(l.price)}</span>
                  </div>
                ))}

                <div className="border-t pt-2 flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span>{euros(selected.amount)}</span>
                </div>
              </div>

              <DownloadPdfButton id={selected.id} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
