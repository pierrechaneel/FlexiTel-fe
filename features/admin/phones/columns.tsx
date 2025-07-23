import { ColumnDef } from "@tanstack/react-table"
import type { PhoneDto } from "./types"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { CheckCircle2Icon, Loader2Icon, MoreVerticalIcon, SlashIcon } from "lucide-react"

export const phoneColumns: ColumnDef<PhoneDto, string>[] = [
  {
    id: "msisdn",
    accessorFn: (row) => row.msisdn,
    header: "Numéro",
  },
  {
    id: "imsi",
    accessorFn: (row) => row.imsi,
    header: "IMSI",
  },
  {
    id: "status",
    accessorFn: (row) => row.status,
    header: "Statut",
    cell: ({ getValue }) => {
      const status = getValue()
      switch (status) {
        case "ACTIVE":
          return (
            <Badge variant="outline" className="flex items-center gap-1">
              <CheckCircle2Icon className="h-4 w-4 text-green-500" />
              ACTIVE
            </Badge>
          )
        case "UNASSIGNED":
          return (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Loader2Icon className="h-4 w-4 animate-spin" />
              UNASSIGNED
            </Badge>
          )
        case "SUSPENDED":
          return (
            <Badge variant="destructive" className="flex items-center gap-1">
              <SlashIcon className="h-4 w-4" />
              SUSPENDED
            </Badge>
          )
        default:
          return <span>{status}</span>
      }
    },
  },
  {
    id: "createdAt",
    accessorFn: (row) => row.createdAt,
    header: "Créé le",
    cell: ({ getValue }) =>
      new Date(getValue()).toLocaleDateString("fr-FR"),
  },
  {
    id: "actions",
    accessorFn: (row) => row.id,
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVerticalIcon />
            <span className="sr-only">Ouvrir menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => {}}>
            Éditer
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => {}}>
            Suspendre
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600" onSelect={() => {}}>
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]