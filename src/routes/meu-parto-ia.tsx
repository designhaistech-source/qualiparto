import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, MessageSquare, ClipboardList, Heart, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/meu-parto-ia")({
  head: () => ({
    meta: [
      { title: "Meu Parto IA — QualiParto" },
      {
        name: "description",
        content:
          "Crie seu plano de parto personalizado com a Inteligência Artificial da QualiParto, baseada em evidências e nas diretrizes da OMS e do Ministério da Saúde.",
      },
      { property: "og:title", content: "Meu Parto IA — QualiParto" },
      {
        property: "og:description",
        content: "Plano de parto personalizado, simples e baseado em evidências.",
      },
    ],
  }),
  component: MeuPartoIaPage,
});

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">Início</Link>
          <Link to="/dashboard-publico" className="text-sm text-muted-foreground transition-colors hover:text-primary">Dashboard Público</Link>
          <Link to="/meu-parto-ia" className="text-sm font-medium text-primary">Meu Parto IA</Link>
          <Link to="/sobre" className="text-sm text-muted-foreground transition-colors hover:text-primary">A plataforma</Link>
          <a href="/#publicacoes" className="text-sm text-muted-foreground transition-colors hover:text-primary">Publicações</a>
        </nav>
        <Button
          asChild
          variant="outline"
          className="rounded-full border-border/80 bg-transparent px-4 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
        >
          <Link to="/login"><Lock className="h-3.5 w-3.5" /> Entrar</Link>
        </Button>
      </div>
    </header>
  );
}

const steps = [
  {
    n: 1,
    icon: MessageSquare,
    title: "Conversa personalizada",
    desc: "Responda algumas perguntas sobre suas preferências e expectativas para o parto.",
  },
  {
    n: 2,
    icon: ClipboardList,
    title: "Plano completo",
    desc: "Receba um documento estruturado com suas escolhas sobre posições, acompanhantes, analgesia e mais.",
  },
  {
    n: 3,
    icon: Heart,
    title: "Baseado em evidências",
    desc: "Todas as recomendações seguem as diretrizes da OMS e do Ministério da Saúde.",
  },
];

function MeuPartoIaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden bg-[var(--gradient-hero)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Inteligência Artificial
          </span>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Meu Parto <span className="text-primary">IA</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Crie seu plano de parto personalizado de forma simples e rápida. Nossa IA guia você
            pelas principais decisões sobre o cuidado no parto, respeitando suas preferências e
            as melhores práticas baseadas em evidências.
          </p>
          <div className="mt-10">
            <Button size="lg" className="rounded-full bg-primary px-7 shadow-[var(--shadow-soft)] hover:bg-primary-glow">
              Começar Agora <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Como <span className="text-primary">funciona</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Três passos simples para criar seu plano de parto personalizado.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-border/60 bg-card p-7 text-left shadow-[var(--shadow-card)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                    {s.n}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/20">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-3xl border border-border/60 bg-card p-10 shadow-[var(--shadow-card)] md:p-12">
            <h3 className="text-2xl font-bold text-foreground md:text-3xl">
              Pronto para criar seu plano de parto?
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              A interação com a IA será disponibilizada em breve. Enquanto isso, você pode
              conhecer mais sobre a QualiParto e acompanhar os indicadores públicos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button className="rounded-full bg-primary px-6 shadow-[var(--shadow-soft)] hover:bg-primary-glow">
                Iniciar Conversa <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button asChild variant="outline" className="rounded-full border-secondary bg-secondary/30 px-6 text-secondary-foreground hover:bg-secondary/50">
                <Link to="/dashboard-publico">Ver Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
