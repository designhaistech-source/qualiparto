import { createFileRoute, Link } from "@tanstack/react-router";
import { Smile, Users, TrendingUp, BarChart3, ArrowRight, Lock, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const Route = createFileRoute("/dashboard-publico")({
  head: () => ({
    meta: [
      { title: "Dashboard Público — QualiParto" },
      {
        name: "description",
        content:
          "Indicadores abertos de qualidade, segurança e humanização da assistência ao parto nos hospitais brasileiros participantes da rede QualiParto.",
      },
      { property: "og:title", content: "Dashboard Público — QualiParto" },
      {
        property: "og:description",
        content: "Acompanhe indicadores em tempo real da assistência obstétrica no Brasil.",
      },
    ],
  }),
  component: DashboardPublicoPage,
});

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">Início</Link>
          <Link to="/dashboard-publico" className="text-sm font-medium text-primary">Dashboard Público</Link>
          <Link to="/meu-parto-ia" className="text-sm text-muted-foreground transition-colors hover:text-primary">Meu Parto IA</Link>
          <Link to="/sobre" className="text-sm text-muted-foreground transition-colors hover:text-primary">A plataforma</Link>
          <a href="/publicacoes" className="text-sm text-muted-foreground transition-colors hover:text-primary">Publicações</a>
        </nav>
        <Button
          asChild
          variant="outline"
          className="rounded-full border-border/80 bg-transparent px-4 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
        >
          <Link to="/login"><Lock className="h-3.5 w-3.5" /> Área Hospitalar</Link>
        </Button>
      </div>
    </header>
  );
}

const indicators = [
  {
    icon: Smile,
    value: "55,4%",
    delta: "+1,2%",
    label: "Taxa de cesárea",
    description: "Média nacional de cesáreas em 2024",
  },
  {
    icon: Users,
    value: "42%",
    delta: "+3,5%",
    label: "Partos humanizados",
    description: "Hospitais com adesão às práticas humanizadas",
  },
  {
    icon: TrendingUp,
    value: "68%",
    delta: "+5,1%",
    label: "Checklist OMS",
    description: "Média de adesão à Lista de Verificação",
  },
  {
    icon: BarChart3,
    value: "127",
    delta: "+12",
    label: "Hospitais monitorados",
    description: "Unidades participantes da rede QualiParto",
  },
];

function DashboardPublicoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Breadcrumbs items={[{ label: "Dashboard Público" }]} />

      <section className="relative overflow-hidden bg-[image:var(--gradient-hero)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Dashboard Público
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">
            Indicadores da <span className="text-primary">assistência ao parto</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Acompanhe os principais indicadores de qualidade, segurança e humanização da assistência
            obstétrica nos hospitais brasileiros participantes da rede QualiParto.
          </p>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {indicators.map((ind) => (
              <div
                key={ind.label}
                className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ind.icon className="h-5 w-5" />
                </div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">{ind.value}</span>
                  <span className="text-xs font-medium text-primary">{ind.delta}</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-foreground">{ind.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{ind.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Dados em <span className="text-primary">tempo real</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Os indicadores são atualizados periodicamente a partir dos dados coletados nos hospitais
            participantes da rede QualiParto.
          </p>

          <div className="mt-12 rounded-2xl border border-border/60 bg-card p-12 shadow-[var(--shadow-card)]">
            <LineChart className="mx-auto h-10 w-10 text-muted-foreground/60" strokeWidth={1.5} />
            <p className="mt-6 text-sm text-muted-foreground">
              Visualização interativa de gráficos em desenvolvimento.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Em breve disponível com filtros por região, estado e hospital.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-10 md:p-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <h3 className="max-w-2xl text-2xl font-bold text-primary-foreground md:text-3xl">
            Quer acessar dados detalhados do seu hospital?
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/90">
            Representantes hospitalares podem acessar o painel interno com indicadores
            detalhados e ferramentas de monitoramento.
          </p>
          <Button
            asChild
            className="mt-8 rounded-full bg-background px-6 text-foreground hover:bg-background/90"
          >
            <Link to="/login">
              Acessar Painel <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
