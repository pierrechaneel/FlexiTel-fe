"use client"

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, startTransition } from "react"
import { useRouter } from "next/navigation"
import { cancelSubscriptionAction } from "@/features/subscriptions/actions.server"
import toast from "react-hot-toast"

export default function ConfirmCancelModal({
  subId,
  open,
  setOpen,
}: {
  subId: string | null
  open: boolean
  setOpen: (v: boolean) => void
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {
    if (!subId) return
    setLoading(true)
    try {
      await cancelSubscriptionAction(subId)
      toast.success("Abonnement résilié")
      setOpen(false)
      startTransition(() => router.refresh())
    } catch (err: any) {
      toast.error(err.message ?? "Échec de la résiliation")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Résilier l’abonnement ?</DialogTitle>
        </DialogHeader>
        <p>Cette action mettra fin immédiatement à l’abonnement.</p>
        <DialogFooter className="gap-2">
          <Button
            variant="secondary"
            disabled={loading}
            onClick={() => setOpen(false)}
          >
            Annuler
          </Button>
          <Button disabled={loading} onClick={handleConfirm}>
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
