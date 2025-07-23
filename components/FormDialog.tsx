"use client"

import * as React from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { ReactNode, FormEvent } from "react"

interface FormDialogProps {
  trigger: ReactNode
  title: string
  description?: string
  onSubmit: (form: FormData) => Promise<void>
  children: ReactNode
  confirmLabel?: string
  cancelLabel?: string
}

export function FormDialog({
  trigger,
  title,
  description,
  onSubmit,
  children,
  confirmLabel = "Enregistrer",
  cancelLabel = "Annuler",
}: FormDialogProps) {
  const [pending, setPending] = React.useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setPending(true)
    try {
      await onSubmit(data)
    } finally {
      setPending(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>

          <div className="grid gap-4 py-2">{children}</div>

          <DialogFooter className="space-x-2">
            <DialogClose asChild>
              <Button variant="outline" disabled={pending}>
                {cancelLabel}
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {pending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {confirmLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
