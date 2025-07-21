import NumbersClient from "@/components/numbers-client"
import {
  myPhoneAction,
  monitoredAction,
  availableAction,
} from "@/features/numbers/actions.server"


export const metadata = { title: "Mes numéros" }

export default async function MyNumbersPage() {
  const [myPhones, monitored, available] = await Promise.all([
    myPhoneAction(),
    monitoredAction(),
    availableAction(),
  ])

  return (
    <NumbersClient
      myPhone={myPhones[0] ?? null}
      monitored={monitored}
      available={available}
    />
  )
}
