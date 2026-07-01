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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type {
  Client,
  Transaction,
  TransactionInput,
  TransactionType,
  TransactionStatus,
  TransactionCategory,
} from "@/types"

interface TransactionFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: TransactionInput) => void
  transaction?: Transaction
  clients: Client[]
}

const NO_CLIENT = "__none__"

const emptyForm: TransactionInput = {
  description: "",
  amount: 0,
  type: "income",
  status: "pending",
  category: "other",
  client_id: "",
  due_date: "",
}

function getTodayDateString() {
  return new Date().toISOString().split("T")[0]
}

function isFutureDate(date: string) {
  if (!date) return false
  return date > getTodayDateString()
}

export default function TransactionForm({
  open,
  onClose,
  onSubmit,
  transaction,
  clients,
}: TransactionFormProps) {
  const [form, setForm] = useState<TransactionInput>(emptyForm)
  const [dateError, setDateError] = useState("")

  useEffect(() => {
    if (transaction) {
      setForm({
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type,
        status: transaction.status,
        category: transaction.category,
        client_id: transaction.client_id ?? "",
        due_date: transaction.due_date ?? "",
      })
    } else {
      setForm(emptyForm)
    }

    setDateError("")
  }, [transaction, open])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setDateError("")

    if (form.status === "paid" && isFutureDate(form.due_date ?? "")) {
      setDateError("Uma transação paga não pode ter data futura.")
      return
    }

    onSubmit(form)
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {transaction ? "Editar Transação" : "Nova Transação"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2.5">
            <Label htmlFor="description" className="text-base font-medium">
              Descrição
            </Label>
            <Input
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="amount" className="text-base font-medium">
              Valor (R$)
            </Label>
            <Input
              id="amount"
              type="text"
              inputMode="decimal"
              value={form.amount === 0 ? "" : String(form.amount)}
              onChange={(e) => {
                const value = e.target.value.replace(",", ".")
                setForm({
                  ...form,
                  amount: value === "" ? 0 : Number(value),
                })
              }}
              placeholder="Ex: 1500"
              required
              className="h-12 text-base"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2.5">
              <Label className="text-base font-medium">Tipo</Label>

              <Select
                value={form.type}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    type: value as TransactionType,
                  })
                }
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="income" className="text-base">
                    Receita
                  </SelectItem>
                  <SelectItem value="expense" className="text-base">
                    Despesa
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              <Label className="text-base font-medium">Status</Label>

              <Select
                value={form.status}
                onValueChange={(value) => {
                  const nextStatus = value as TransactionStatus

                  setForm({
                    ...form,
                    status: nextStatus,
                  })

                  if (nextStatus !== "paid") {
                    setDateError("")
                  }
                }}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="pending" className="text-base">
                    Pendente
                  </SelectItem>
                  <SelectItem value="paid" className="text-base">
                    Pago
                  </SelectItem>
                  <SelectItem value="overdue" className="text-base">
                    Atrasado
                  </SelectItem>
                  <SelectItem value="cancelled" className="text-base">
                    Cancelado
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2.5">
            <Label className="text-base font-medium">Categoria</Label>

            <Select
              value={form.category}
              onValueChange={(value) =>
                setForm({
                  ...form,
                  category: value as TransactionCategory,
                })
              }
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="project_payment" className="text-base">
                  Pagamento de Projeto
                </SelectItem>
                <SelectItem value="subscription" className="text-base">
                  Assinatura
                </SelectItem>
                <SelectItem value="tools" className="text-base">
                  Ferramentas
                </SelectItem>
                <SelectItem value="marketing" className="text-base">
                  Marketing
                </SelectItem>
                <SelectItem value="taxes" className="text-base">
                  Impostos
                </SelectItem>
                <SelectItem value="other" className="text-base">
                  Outros
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2.5">
            <Label className="text-base font-medium">Cliente</Label>

            <Select
              value={form.client_id || NO_CLIENT}
              onValueChange={(value) =>
                setForm({
                  ...form,
                  client_id: value === NO_CLIENT ? "" : value,
                })
              }
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Selecione um cliente" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value={NO_CLIENT} className="text-base">
                  Nenhum
                </SelectItem>

                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id} className="text-base">
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="due_date" className="text-base font-medium">
              Data
            </Label>

            <Input
              id="due_date"
              type="date"
              value={form.due_date}
              max={form.status === "paid" ? getTodayDateString() : undefined}
              onChange={(e) => {
                const nextDate = e.target.value

                setForm({
                  ...form,
                  due_date: nextDate,
                })

                if (form.status === "paid" && isFutureDate(nextDate)) {
                  setDateError("Uma transação paga não pode ter data futura.")
                } else {
                  setDateError("")
                }
              }}
              className="h-12 text-base"
            />

            {dateError && (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm font-medium leading-relaxed text-destructive">
                {dateError}
              </p>
            )}
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
              {transaction ? "Salvar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}