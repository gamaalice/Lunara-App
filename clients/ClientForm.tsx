import { useEffect, useState, type FormEvent } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Client, ClientInput, ClientStatus } from "@/types"

interface ClientFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: ClientInput) => void
  client?: Client
}

const emptyForm: ClientInput = {
  name: "",
  email: "",
  company: "",
  phone: "",
  notes: "",
  status: "active",
}

export default function ClientForm({ open, onClose, onSubmit, client }: ClientFormProps) {
  const [form, setForm] = useState<ClientInput>(emptyForm)

  useEffect(() => {
    if (client) {
      setForm({
        name: client.name,
        email: client.email,
        company: client.company ?? "",
        phone: client.phone ?? "",
        notes: client.notes ?? "",
        status: client.status,
      })
    } else {
      setForm(emptyForm)
    }
  }, [client, open])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {client ? "Editar Cliente" : "Novo Cliente"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2.5">
            <Label htmlFor="name" className="text-base font-medium">
              Nome
            </Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="email" className="text-base font-medium">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="h-12 text-base"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2.5">
              <Label htmlFor="company" className="text-base font-medium">
                Empresa
              </Label>
              <Input
                id="company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="phone" className="text-base font-medium">
                Telefone
              </Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="h-12 text-base"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <Label className="text-base font-medium">Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => setForm({ ...form, status: v as ClientStatus })}
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active" className="text-base">
                  Ativo
                </SelectItem>
                <SelectItem value="inactive" className="text-base">
                  Inativo
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="notes" className="text-base font-medium">
              Observações
            </Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="min-h-28 resize-none text-base"
            />
          </div>

          <DialogFooter className="gap-3 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-11 w-full text-base sm:w-auto"
            >
              Cancelar
            </Button>
            <Button type="submit" className="h-11 w-full text-base sm:w-auto">
              {client ? "Salvar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}