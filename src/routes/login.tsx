import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import qualipartoLogo from "@/assets/qualiparto-logo.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Área Hospitalar — Entrar na plataforma QualiParto" },
      {
        name: "description",
        content:
          "Acesse a Área Hospitalar da QualiParto para monitorar a qualidade e segurança da assistência ao parto.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [keepSession, setKeepSession] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: ligar autenticação real
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-muted/40">
      {/* Fundo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-background to-primary/5" />
      <div className="absolute inset-0 -z-10 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,_var(--color-foreground)_1px,_transparent_0)] [background-size:24px_24px]" />

      <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl md:grid-cols-2">
          {/* Painel esquerdo */}
          <div className="relative flex flex-col justify-between bg-primary p-8 text-primary-foreground md:p-12">
            <Link to="/" className="text-xs font-medium text-primary-foreground/80 transition hover:text-primary-foreground">
              ← Voltar ao site
            </Link>

            <div className="flex flex-col items-center text-center">
              <img
                src={qualipartoLogo}
                alt="QualiParto"
                className="h-16 w-auto brightness-0 invert"
              />
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-primary-foreground/90">
                Monitore e melhore a qualidade da assistência ao parto
              </p>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-foreground/70" />
                  Avalie a adesão ao Checklist de Parto Seguro da OMS
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-foreground/70" />
                  Acompanhe a implementação das práticas essenciais
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-foreground/70" />
                  Monitore frequência e peso de eventos adversos
                </li>
              </ul>
            </div>
          </div>

          {/* Painel direito */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            <h2 className="text-2xl font-semibold text-foreground">Entrar na plataforma</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Acesso restrito a hospitais e instituições parceiras.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="seuemail@instituicao.br"
                  className="w-full border-0 border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-0"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Digite sua senha"
                    className="w-full border-0 border-b border-border bg-transparent py-2 pr-16 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-0 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                <a href="#" className="inline-block pt-1 text-xs font-medium text-primary hover:underline">
                  Esqueceu sua senha?
                </a>
              </div>

              <label className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={keepSession}
                  onChange={(e) => setKeepSession(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary accent-primary focus:ring-primary"
                />
                Manter sessão ativa neste dispositivo
              </label>

              <Button type="submit" className="h-11 w-full rounded-md text-sm font-semibold">
                Entrar
              </Button>
            </form>

            <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 px-4 py-4 text-center">
              <p className="text-sm text-foreground">Não tem conta?</p>
              <button className="mt-2 inline-flex items-center justify-center rounded-md border border-primary px-5 py-1.5 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground">
                Criar conta
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <Link to="/sobre" className="hover:text-primary">A plataforma</Link>
              <span className="text-border">|</span>
              <a href="#" className="hover:text-primary">Política de Privacidade</a>
              <span className="text-border">|</span>
              <a href="/#parceiros" className="hover:text-primary">Parceiros</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
