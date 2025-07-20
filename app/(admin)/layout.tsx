import { Providers } from "@/components/Providers"
import { AppSidebar } from "@/components/navbar/app-sidebar"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { getCurrentUserFromCookies } from "@/features/auth/helpers/auth.server"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUserFromCookies()
  if (!user) redirect("/login")
  if (user.role !== "ADMIN") redirect("/")

  return (
    <Providers >
      <SidebarProvider>
        <AppSidebar currentUser={user} />

        <SidebarInset>
          <div className="flex items-center justify-between p-2 border-b">
            <SidebarTrigger />
            <ModeToggle />
          </div>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </Providers>
  )
}
