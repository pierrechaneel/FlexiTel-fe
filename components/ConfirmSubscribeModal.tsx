"use client"

import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, startTransition } from "react"
import { useRouter } from "next/navigation"

import { subscribeOfferAction } from "@/features/offers/actions.server"
import type { OfferDto } from "@/features/offers/types"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"

export default function ConfirmSubscribeModal({
  offer,
  phoneId,
  open,
  setOpen,
}: {
  offer: OfferDto | null
  phoneId: string | null
  open: boolean
  setOpen: (o: boolean) => void
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {
    if (!offer || !phoneId) return
    setLoading(true)
    try {
      await subscribeOfferAction(offer.id, phoneId)
      toast.success("Souscription réalisée avec succès")
      setOpen(false)
      startTransition(() => router.refresh())
    } catch (err: any) {
      toast.error(err.message ?? "Erreur lors de la souscription")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmer la souscription</DialogTitle>
        </DialogHeader>

        {offer && (
          <p>
            Voulez‑vous vraiment souscrire à <strong>{offer.name}</strong> pour{" "}
            <strong>
              {parseFloat(offer.price).toLocaleString(undefined, {
                style: "currency",
                currency: "EUR",
              })}
            </strong>{" "}
            ?
          </p>
        )}

        <DialogFooter className="gap-2">
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button onClick={handleConfirm} disabled={loading || !phoneId}>
             {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Oui, confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
