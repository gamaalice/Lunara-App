import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CheckSquare,
  DollarSign,
  Calendar,
} from "lucide-react"
import Logo from "@/components/shared/Logo"
import { cn } from "@/lib/utils"

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/clients", label: "Clientes", icon: Users },
  { to: "/projects", label: "Projetos", icon: FolderKanban },
  { to: "/tasks", label: "Tarefas", icon: CheckSquare },
  { to: "/finance", label: "Financeiro", icon: DollarSign },
  { to: "/calendar", label: "Calendário", icon: Calendar },
]

interface SidebarProps {
  onNavigate?: () => void
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <aside className="flex h-full w-72 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-20 items-center border-b border-sidebar-border px-6">
        <Logo />
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-5">
        <p className="text-sm text-muted-foreground">
          Lunara · Sistema de Gestão
        </p>
      </div>
    </aside>
  )
}