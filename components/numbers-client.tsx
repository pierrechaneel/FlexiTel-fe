'use client'

import { useState, startTransition } from 'react'
import {
  Card, CardHeader, CardTitle, CardContent,
} from '@/components/ui/card'
import {
  Table, TableHead, TableHeader, TableRow, TableCell, TableBody,
} from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Users, PlusCircle, CardSim } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
  claimNumberAction,
  releaseNumberAction,
} from '@/features/numbers/actions.server'
import type { PhoneDto, MonitoredDto } from '@/features/numbers/types'
import toast from 'react-hot-toast'
import { MonitoredNumbers } from './MonitoredNumbers'

const toMoney = (v: number | string) =>
  Number(v).toLocaleString('fr-FR', { style: 'currency', currency: 'USD' })

export default function NumbersClient({
  myPhone,
  monitored,
  available,
}: {
  myPhone: PhoneDto | null
  monitored: MonitoredDto[]
  available: PhoneDto[]
}) {
  const router = useRouter()
  const [active, setActive] = useState<'mine' | 'watch' | 'free'>('mine')
  const [claiming, setClaiming] = useState<string | null>(null)
  const [releasing, setReleasing] = useState<boolean>(false)   // état modal

  /* ---------- claim ---------- */
  async function claim(id: string) {
    setClaiming(id)
    try {
      await claimNumberAction(id)
      toast.success('Numéro réservé ! 50 $ crédités')
      startTransition(() => router.refresh())
    } catch {
      toast.error('Échec de la réservation')
    } finally {
      setClaiming(null)
    }
  }

  /* -- release - */
  async function release() {
    if (!myPhone) return
     console.log('release id →', myPhone.id)
    setReleasing(false)
    try {
      await releaseNumberAction(myPhone.id)
      toast.success('Numéro libéré')
      startTransition(() => router.refresh())
    } catch {
      toast.error('Impossible de libérer le numéro')
    }
  }

  /* - tableau contextuel --- */
  function renderTable() {
    switch (active) {
      case 'mine':
        return (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mon numéro</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{myPhone ? myPhone.msisdn : '—'}</TableCell>
                  <TableCell>
                    {myPhone && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setReleasing(true)}
                      >
                        Libérer
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* modal confirmation release */}
            <Dialog open={releasing} onOpenChange={setReleasing}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Libérer le numéro ?</DialogTitle>
                </DialogHeader>
                <p className="text-sm">
                  Êtes‑vous sûr de vouloir rendre le numéro{' '}
                  <strong>{myPhone?.msisdn}</strong> disponible ?
                </p>

                <div className="mt-4 flex justify-end gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setReleasing(false)}
                  >
                    Annuler
                  </Button>
                  <Button variant="destructive" onClick={release}>
                    Confirmer
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )

     case 'watch':
  return <MonitoredNumbers initial={monitored} />

      case 'free':
        return available.length === 0 ? (
          <p className="text-muted-foreground">Aucun numéro libre.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numéro</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {available.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.msisdn}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      disabled={!!claiming}
                      onClick={() => claim(p.id)}
                    >
                      {claiming === p.id ? '...' : 'Claim'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
    }
  }

  /* -- cartes/onglets -- */
  const cards = [
    {
      key: 'mine',
      title: 'Mon numéro',
      icon: <CardSim className="h-6 w-6" />,
      info: myPhone ? myPhone.msisdn : 'Aucun pour l’instant',
    },
    {
      key: 'watch',
      title: 'Numéros surveillés',
      icon: <Users className="h-6 w-6" />,
      info: `${monitored.length} numéro(s)`,
    },
    {
      key: 'free',
      title: 'Numéros disponibles',
      icon: <PlusCircle className="h-6 w-6" />,
      info: `${available.length} libre(s)`,
    },
  ] as const

  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Mes numéros</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ key, title, icon, info }) => (
          <Card
            key={key}
            onClick={() => setActive(key)}
            className={`cursor-pointer transition-colors ${
              key === active
                ? 'border-primary ring-2 ring-primary/50'
                : 'hover:bg-muted/50'
            }`}
          >
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              {icon}
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-lg font-semibold">{info}</CardContent>
          </Card>
        ))}
      </div>

      {renderTable()}
    </section>
  )
}
