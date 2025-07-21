"use client"

import { useMemo, useState } from "react"
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wifi, MessageCircle, Phone, HelpCircle } from "lucide-react"

import type { OfferDto } from "@/features/offers/types"

type Props = {
  offers: OfferDto[]
  onSubscribe: (o: OfferDto) => void 
}

const iconMap: Record<string, React.ReactElement> = {
  data: <Wifi className="h-6 w-6" />,
  sms: <MessageCircle className="h-6 w-6" />,
  voix: <Phone className="h-6 w-6" />,
}

export function OfferCatalog({ offers, onSubscribe }: Props) {
  const categories = useMemo(() => {
    const set = new Set(offers.map((o) => (o.category ?? "Autre").trim()))
    return [...set]
  }, [offers])

  const [selected, setSelected] = useState<string>(categories[0] ?? "")
  const offersOfSelected = offers.filter(
    (o) => (o.category ?? "Autre").trim() === selected,
  )

  return (
    <div className="space-y-6">
      {/* Cartes catégories */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => {
          const Icon = iconMap[cat.toLowerCase()] ?? (
            <HelpCircle className="h-6 w-6" />
          )
          const active = cat === selected
          return (
            <Card
              key={cat}
              onClick={() => setSelected(cat)}
              className={`cursor-pointer transition-colors ${
                active
                  ? "border-primary ring-2 ring-primary/50"
                  : "hover:bg-muted/50"
              }`}
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {Icon}
                <CardTitle className="capitalize text-lg">{cat}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {
                  offers.filter((o) => (o.category ?? "Autre") === cat).length
                }{" "}
                offre(s)
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Liste des offres */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {offersOfSelected.map((o) => (
          <Card key={o.id} className="flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle>{o.name}</CardTitle>
              <CardDescription>
                {o.quotaAmount.toLocaleString()} {o.quotaUnit} – 
                valide {o.validityDays} jour(s)
              </CardDescription>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {parseFloat(o.price).toLocaleString(undefined, {
                style: "currency",
                currency: "EUR",
              })}
            </CardContent>
            <CardFooter className="mt-auto">
              <Button className="w-full" onClick={() => onSubscribe(o)}>
                Souscrire
              </Button>
            </CardFooter>
          </Card>
        ))}

        {offersOfSelected.length === 0 && (
          <Badge variant="secondary" className="col-span-full">
            Aucune offre dans cette catégorie
          </Badge>
        )}
      </div>
    </div>
  )
}
