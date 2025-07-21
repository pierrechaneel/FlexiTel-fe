import { offersAction, phoneAction } from "@/features/offers/actions.server"
import OffersClient from "./offers-client"

export const metadata = { title: "Offres disponibles" }

export default async function OffersPage() {
  const [offers, phoneId] = await Promise.all([offersAction(), phoneAction()])

  return <OffersClient offers={offers} phoneId={phoneId} />
}
