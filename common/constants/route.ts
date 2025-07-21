import {
  Bot,
  CircuitBoard,
  CreditCard,
  Eye,
  FileText,
  Layers,
  LucideIcon,
  Package,
  Phone,
  Settings2,
  SubscriptIcon,
  Users,
  Users2,
  Wallet,
  Wallet as WalletIcon,
} from "lucide-react"




export const unauthenticatedRoutes = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "Signup",
    path: "/signup",
  },
] 



type RouteItem = {
  title: string
  path: string
  icon: LucideIcon
  items?: RouteItem[]    
}

export const USER_ROUTES: RouteItem[] = [
  { title: "Mes abonnements", path: "/subscriptions",              icon: Layers },
  { title: "Mes numéros",     path: "/my-numbers",    icon: Phone  },
  { title: "Offres",          path: "/offers",        icon: Package },
  { title: "Portefeuille",    path: "/wallet",        icon: Wallet },
  { title: "Factures",        path: "/invoices",      icon: FileText },
  { title: "Paramètres",      path: "#",      icon: Settings2 },
]

export const ADMIN_ROUTES: RouteItem[] = [
  { title: "Utilisateurs",    path: "/admin/users",          icon: Users },
  { title: "Numéros",         path: "/admin/numbers",        icon: Phone },
  { title: "Offres",          path: "/admin/offers",         icon: Package },
  { title: "Abonnements",     path: "/admin/subscriptions",  icon: Layers },
  { title: "Factures",        path: "/admin/invoices",       icon: FileText },
  { title: "Paramètres",      path: "/admin/settings",       icon: Settings2 },
]


