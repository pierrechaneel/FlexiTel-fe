import { getWalletServer } from "@/features/wallet/actions.server"

import { Button } from "@/components/ui/button"
import WalletCard from "@/components/wallet"

export const metadata = { title: "Wallet" }

export default async function WalletPage() {
  const wallet= await getWalletServer()

  return (
    <section className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Wallet - {wallet.firstName} {wallet.lastName}
        </h1>
        <Button>Approvisionner</Button>
      </header>
      <WalletCard  data={wallet}/>
    </section>
  )
}
