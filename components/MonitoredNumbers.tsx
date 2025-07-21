'use client'

import { useState, startTransition } from "react"
import {
  Table, TableHeader, TableRow,
  TableHead, TableBody, TableCell,
} from "@/components/ui/table"
import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, Edit, Plus } from "lucide-react"
import toast from "react-hot-toast"
import {
  addMonitoredAction,
  deleteMonitoredAction,
  updateMonitoredAction,
} from "@/features/numbers/actions.server"
import type { MonitoredDto } from "@/features/numbers/types"

export function MonitoredNumbers({ initial }: { initial: MonitoredDto[] }) {
  const [list, setList] = useState(initial)
  const [openAdd, setOpenAdd] = useState(false)
  const [newNumber, setNewNumber] = useState("")
  const [newAlias, setNewAlias] = useState("")

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingAlias, setEditingAlias] = useState("")

  async function add() {
    try {
      const next = await addMonitoredAction(newNumber, newAlias || undefined)
      toast.success("Numéro ajouté")
      startTransition(() => {
        setList((l) => [...l, next])
        setOpenAdd(false)
        setNewNumber("")
        setNewAlias("")
      })
    } catch {
      toast.error("Impossible d’ajouter")
    }
  }

  async function remove(id: string) {
    if (!confirm("Supprimer ce numéro surveillé ?")) return
    try {
      await deleteMonitoredAction(id)
      toast.success("Numéro supprimé")
      startTransition(() => {
        setList((l) => l.filter((m) => m.id !== id))
      })
    } catch {
      toast.error("Impossible de supprimer")
    }
  }

  async function saveAlias(id: string) {
    try {
      const upd = await updateMonitoredAction(id, editingAlias)
      toast.success("Alias mis à jour")
      startTransition(() => {
        setList((l) =>
          l.map((m) => (m.id === id ? { ...m, alias: upd.alias } : m))
        )
        setEditingId(null)
      })
    } catch {
      toast.error("Impossible de mettre à jour")
    }
  }

  return (
    <div className="space-y-4">
      {/* Bouton Ajouter */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" /> Ajouter un numéro
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un numéro</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input
              placeholder="Numéro mobile"
              value={newNumber}
              onChange={(e) => setNewNumber(e.currentTarget.value)}
            />
            <Input
              placeholder="Alias (facultatif)"
              value={newAlias}
              onChange={(e) => setNewAlias(e.currentTarget.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={add} disabled={!newNumber.trim()}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tableau */}
      {list.length === 0 ? (
        <p className="text-muted-foreground">Aucun numéro surveillé.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Numéro</TableHead>
              <TableHead>Alias</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.msisdn}</TableCell>
                <TableCell>
                  {editingId === m.id ? (
                    <div className="flex gap-2">
                      <Input
                        value={editingAlias}
                        onChange={(e) => setEditingAlias(e.currentTarget.value)}
                      />
                      <Button size="sm" onClick={() => saveAlias(m.id)}>
                        OK
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {m.alias ?? "—"}
                      <Edit
                        className="cursor-pointer hover:text-primary"
                        onClick={() => {
                          setEditingId(m.id)
                          setEditingAlias(m.alias || "")
                        }}
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(m.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
