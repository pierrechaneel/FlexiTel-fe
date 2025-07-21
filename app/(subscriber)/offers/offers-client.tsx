'use client'

import { useState } from "react"
import { OfferCatalog } from "@/components/offer-catalog"
import ConfirmSubscribeModal from "@/components/ConfirmSubscribeModal"
import type { OfferDto } from "@/features/offers/types"

export default function OffersClient({
  offers,
  phoneId,
}: {
  offers: OfferDto[]
  phoneId: string | null
}) {
  const [pendingOffer, setPendingOffer] = useState<OfferDto | null>(null)

  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Choisir une offre</h1>

      <OfferCatalog
        offers={offers}
        onSubscribe={(o) => setPendingOffer(o)}
      />

      <ConfirmSubscribeModal
        offer={pendingOffer}
        phoneId={phoneId}
        open={!!pendingOffer}
        setOpen={(open) => !open && setPendingOffer(null)}
      />
    </section>
  )
}
