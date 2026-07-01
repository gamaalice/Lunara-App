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
import type { Client, Project, ProjectInput, ProjectStatus } from "@/types"

interface ProjectFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: ProjectInput) => void
  project?: Project
  clients: Client[]
}

const NO_CLIENT = "__none__"

const emptyForm: ProjectInput = {
  name: "",
  description: "",
  client_id: "",
  status: "pending",
  deadline: "",
  budget: 0,
  progress: 0,
}

export default function ProjectForm({ open, onClose, onSubmit, project, clients }: ProjectFormProps) {
  const [form, setForm] = useState<ProjectInput>(emptyForm)

  useEffect(() => {
    if (project) {
      setForm({
        name: project.name,
        description: project.description ?? "",
        client_id: project.client_id ?? "",
        status: project.status,
        deadline: project.deadline ?? "",
        budget: project.budget ?? 0,
        progress: project.progress ?? 0,
      })
    } else {
      setForm(emptyForm)
    }
  }, [project, open])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {project ? "Editar Projeto" : "Novo Projeto"}
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
            <Label htmlFor="description" className="text-base font-medium">
              Descrição
            </Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="min-h-28 resize-none text-base"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2.5">
              <Label className="text-base font-medium">Cliente</Label>
              <Select
                value={form.client_id || NO_CLIENT}
                onValueChange={(value) => setForm({ ...form, client_id: value === NO_CLIENT ? "" : value })}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Selecione" />
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
              <Label className="text-base font-medium">Status</Label>
              <Select
                value={form.status}
                onValueChange={(value) => setForm({ ...form, status: value as ProjectStatus })}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="pending" className="text-base">
                    Pendente
                  </SelectItem>
                  <SelectItem value="in_progress" className="text-base">
                    Em Progresso
                  </SelectItem>
                  <SelectItem value="review" className="text-base">
                    Revisão
                  </SelectItem>
                  <SelectItem value="completed" className="text-base">
                    Concluído
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2.5">
              <Label htmlFor="deadline" className="text-base font-medium">
                Prazo
              </Label>
              <Input
                id="deadline"
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="budget" className="text-base font-medium">
                Orçamento (R$)
              </Label>
              <Input
                id="budget"
                type="text"
                inputMode="decimal"
                value={form.budget === 0 ? "" : String(form.budget)}
                onChange={(e) => {
                  const value = e.target.value.replace(",", ".")
                  setForm({ ...form, budget: value === "" ? 0 : Number(value) })
                }}
                placeholder="Ex: 1500"
                className="h-12 text-base"
              />
            </div>
          </div>

          <DialogFooter className="gap-3 sm:gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="h-11 w-full text-base sm:w-auto">
              Cancelar
            </Button>

            <Button type="submit" className="h-11 w-full text-base sm:w-auto">
              {project ? "Salvar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}