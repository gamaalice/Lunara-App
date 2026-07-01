import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/components/shared/Logo"
import { useAuth } from "@/hooks/useAuth"

const errorMessages: Record<string, string> = {
  "auth/invalid-credential": "E-mail ou senha incorretos.",
  "auth/invalid-email": "E-mail inválido.",
  "auth/user-not-found": "Usuário não encontrado.",
  "auth/wrong-password": "Senha incorreta.",
  "auth/email-already-in-use": "Este e-mail já está em uso.",
  "auth/weak-password": "A senha deve ter pelo menos 6 caracteres.",
}

export default function Login() {
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (mode === "signin") {
        await signIn(email, password)
      } else {
        await signUp(name, email, password)
      }

      navigate("/", { replace: true })
    } catch (err) {
      const code = (err as { code?: string }).code ?? ""
      setError(errorMessages[code] ?? "Ocorreu um erro. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-background px-4 py-8 sm:px-6 lg:px-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[28rem]"
      >
        <div className="mb-7 flex flex-col items-center text-center sm:mb-8">
          <Logo className="mb-4 scale-60" />

          <h1 className="max-w-sm text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {mode === "signin" ? "Seja bem-vindo!" : "Crie sua conta"}
          </h1>

          <p className="mt-3 max-w-xs text-base leading-relaxed text-muted-foreground sm:max-w-sm sm:text-lg">
            Gerencie clientes, projetos, tarefas e finanças em um só lugar.
          </p>
        </div>

        <Card className="w-full border border-border/60 p-5 shadow-sm sm:p-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "signup" && (
              <div className="space-y-2.5">
                <Label htmlFor="name" className="text-base font-medium">
                  Nome
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  required
                  className="h-12 text-base"
                />
              </div>
            )}

            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-base font-medium">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@exemplo.com"
                required
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="password" className="text-base font-medium">
                Senha
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-12 pr-14 text-base"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md border border-border bg-background text-foreground shadow-sm"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-base font-medium leading-relaxed text-destructive">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="h-12 w-full text-base font-semibold"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {mode === "signin" ? "Entrar" : "Criar conta"}
            </Button>
          </form>

          <p className="mt-6 text-center text-base leading-relaxed text-muted-foreground">
            {mode === "signin" ? "Não tem uma conta? " : "Já tem uma conta? "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin")
                setError("")
                setShowPassword(false)
              }}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              {mode === "signin" ? "Cadastre-se" : "Entrar"}
            </button>
          </p>
        </Card>
      </motion.section>
    </main>
  )
}