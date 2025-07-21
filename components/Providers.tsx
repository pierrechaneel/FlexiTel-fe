"use client"

import { useEffect, useState, type ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "react-hot-toast"

export function Providers({ children }: { children: ReactNode }) {

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return <>{children}</>

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster
        position="top-center"
        toastOptions={{ className: "bg-card text-foreground" }}
      />
    </ThemeProvider>
  )
}
