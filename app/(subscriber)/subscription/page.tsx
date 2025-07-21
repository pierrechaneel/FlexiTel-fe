/* app/(subscriber)/subscription/page.tsx */
import { subscriptionsAction } from "@/features/subscriptions/actions.server"
import { SubscriptionCards }   from "@/components/subscription-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export const metadata = { title: "Mes abonnements" }

export default async function SubscriptionsPage() {
  const data = await subscriptionsAction()   
  return (
    <section className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mes abonnements</h1>

        {/* bouton “Souscrire” */}
        <Button asChild>
          <Link href="/offers">
            <Plus className="h-4 w-4" />
            Souscrire à une offre
          </Link>
        </Button>
      </div>
      <SubscriptionCards data={data} />
    </section>
  )
}
