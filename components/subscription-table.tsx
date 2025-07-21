'use client'

import { useState } from 'react'
import {
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  Label,
} from 'recharts'
import { TrendingUp, X } from 'lucide-react'

import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig,
} from '@/components/ui/chart'
import ConfirmCancelModal from '@/components/confirm-cancel-modal'
import type { SubscriptionDto } from '@/features/subscriptions/types'

type Category = 'data' | 'sms' | 'voix' | 'mixte'
const CATEGORIES: Category[] = ['data', 'sms', 'voix']

/*  */
function buildAggregates(subs: SubscriptionDto[]) {
  return CATEGORIES.flatMap((cat) => {
    const s = subs.filter(
      (x) =>
        x.offer.category === cat &&
        x.status === 'ACTIVE' &&
        x.remaining > 0,
    )
    if (s.length === 0) return []

    const quotaUnit = s[0].offer.quotaUnit
    const totalQuota = s.reduce((t, x) => t + x.offer.quotaAmount, 0)
    const totalRemaining = s.reduce((t, x) => t + x.remaining, 0)
    const used = totalQuota - totalRemaining

    return [
      {
        id: s[0].id,
        cat,
        quotaUnit,
        totalQuota,
        totalRemaining,
        used,
      },
    ]
  })
}

export function SubscriptionCards({ data }: { data: SubscriptionDto[] }) {
  const aggregates = buildAggregates(data)
  const [pendingId, setPendingId] = useState<string | null>(null)

  const chartConfig: ChartConfig = {
    remaining: { label: 'Utilisé', color: 'var(--chart-2)' },
    used: { label: 'Restant', color: 'var(--muted)' },
  }

  if (aggregates.length === 0) {
    return (
      <p className="text-muted-foreground text-center">
        Aucun abonnement actif
      </p>
    )
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {aggregates.map(
          ({ id, cat, quotaUnit, totalQuota, totalRemaining, used }) => (
            <Card key={cat} className="flex flex-col">
              {/* Header + bouton résilier */}
              <CardHeader className="flex items-start justify-between pb-0">
                <div className="space-y-1 text-center w-full">
                  <CardTitle className="capitalize">{cat}</CardTitle>
                  <CardDescription>
                    {totalQuota.toLocaleString()} {quotaUnit} au total
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPendingId(id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>

              {/* Radial chart */}
              <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square w-full max-w-[250px]"
                >
                  <RadialBarChart
                    data={[{ used, remaining: totalRemaining }]}
                    endAngle={360}
                    innerRadius={80}
                    outerRadius={130}
                  >
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <PolarRadiusAxis
                      tick={false}
                      tickLine={false}
                      axisLine={false}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                            const { cx, cy } = viewBox as any
                            return (
                              <text x={cx} y={cy} textAnchor="middle">
                                <tspan
                                  x={cx}
                                  y={cy - 16}
                                  className="fill-foreground text-2xl font-bold"
                                >
                                  {totalRemaining.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={cx}
                                  y={cy + 4}
                                  className="fill-muted-foreground"
                                >
                                  {quotaUnit}
                                </tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </PolarRadiusAxis>
                    <RadialBar
                      dataKey="used"
                      stackId="a"
                      cornerRadius={5}
                      fill="var(--color-used)"
                      className="stroke-transparent stroke-2"
                    />
                    <RadialBar
                      dataKey="remaining"
                      stackId="a"
                      cornerRadius={5}
                      fill="var(--color-remaining)"
                      className="stroke-transparent stroke-2"
                    />
                  </RadialBarChart>
                </ChartContainer>
              </CardContent>

              <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                  {((used / totalQuota) * 100).toFixed(1)} % consommé
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                  Mise à jour en temps réel
                </div>
              </CardFooter>
            </Card>
          ),
        )}
      </div>

      <ConfirmCancelModal
        subId={pendingId}
        open={!!pendingId}
        setOpen={(o) => !o && setPendingId(null)}
      />
    </>
  )
}
