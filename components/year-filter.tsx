'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function YearFilter({ years }: { years: number[] }) {
  const router = useRouter()
  const params = useSearchParams()

  const current = params.get('year') ?? ''

  return (
    <select
      defaultValue={current}
      onChange={(e) => {
        const p = new URLSearchParams(params.toString())
        const val = e.target.value
        val ? p.set('year', val) : p.delete('year')
        router.push(`?${p.toString()}`)
      }}
      className="rounded-md border px-2 py-1 bg-background"
    >
      <option value="">Toutes</option>
      {years.map((y) => (
        <option key={y} value={y}>
          {y}
        </option>
      ))}
    </select>
  )
}
