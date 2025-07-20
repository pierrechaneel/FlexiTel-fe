"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain }   from "@/components/navbar/nav-main"
import { NavUser }   from "@/components/navbar/nav-user"
import { TeamSwitcher } from "@/components/navbar/team-switcher"
import { USER_ROUTES, ADMIN_ROUTES } from "@/common/constants/route"
import type { JwtPayload } from "@/features/auth/types"          

import { CardSim, GalleryVerticalEnd, type LucideIcon } from "lucide-react"          

type RouteNavItem = {
  title: string
  url:   string
  icon?: LucideIcon
  isActive?: boolean
  items?: { title: string; url: string }[]
}


type Props = {
  currentUser: JwtPayload
} & React.ComponentProps<typeof Sidebar>


export function AppSidebar({ currentUser, ...props }: Props) {

  // console.log("[AppSidebar] currentUser décodé :", currentUser)
  
  const navItems = currentUser.role === "ADMIN" ? ADMIN_ROUTES : USER_ROUTES

  const navMain: RouteNavItem[] = navItems.map((r) => ({
    title: r.title,
    url:   r.path,
    icon:  r.icon,
    isActive: false,                           
    items:   (r.items ?? []).map((c) => ({
      title: c.title,
      url:   c.path,
    })),
  }))

  const fullName =
    [currentUser.firstname, currentUser.lastname].filter(Boolean).join(" ") ||
    currentUser.email

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
       <TeamSwitcher teams={[{ name:"FlexiTel", logo: CardSim, plan:"" }]} /> 
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: fullName,
            email: currentUser.email,
            avatar: "/login.png",
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
