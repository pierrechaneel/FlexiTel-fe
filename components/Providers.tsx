// components/Providers.tsx
"use client"
import { ReactNode, useEffect, useState } from "react"
import { ThemeProvider }                from "next-themes"
import { Toaster }                      from "react-hot-toast"

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      {mounted && (
        <Toaster
          position="top-center"
          toastOptions={{ className: "bg-card text-foreground" }}
        />
      )}
    </ThemeProvider>
  )
}
