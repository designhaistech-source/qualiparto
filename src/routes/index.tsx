import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, BarChart3, Sparkles, ArrowRight, Building2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-nurses.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QualiParto — Qualidade e segurança na assistência ao parto" },
      {
        name: "description",
        content:
          "Plataforma nacional para monitoramento da qualidade, segurança e humanização da assistência ao parto em hospitais brasileiros.",
      },
      { property: "og:title", content: "QualiParto — Plataforma de qualidade no parto" },
      {
        property: "og:description",
        content: "Avaliação, humanização e segurança da assistência obstétrica baseada em dados.",
      },
    ],
  }),
  component: Index,
});

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
        <path
          d="M32 58 C8 42 4 26 14 16 C22 8 30 14 32 20 C34 14 42 8 50 16 C60 26 56 42 32 58 Z"
          fill={light ? "white" : "oklch(0.62 0.17 152)"}
        />
        <circle cx="26" cy="26" r="3.2" fill={light ? "oklch(0.62 0.17 152)" : "white"} />
        <path d="M22 38 q4 -8 8 0 v6 h-8 z" fill={light ? "oklch(0.62 0.17 152)" : "white"} />
        <circle cx="40" cy="30" r="2.2" fill={light ? "oklch(0.62 0.17 152)" : "white"} />
        <path d="M37 38 q3 -5 6 0 v4 h-6 z" fill={light ? "oklch(0.62 0.17 152)" : "white"} />
      </svg>
      <span className={`text-xl font-bold tracking-tight ${light ? "text-white" : "text-foreground"}`}>
        Quali<span className={light ? "text-secondary" : "text-primary"}>Parto</span>
      </span>
    </Link>
  );
}

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Dashboard Público", href: "#ferramentas" },
  { label: "Meu Parto IA", href: "#ferramentas" },
  { label: "A plataforma", href: "/sobre" },
  { label: "Publicações", href: "#publicacoes" },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Button
          variant="outline"
          className="group rounded-full border-border/80 bg-transparent px-4 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
          title="Área restrita destinada apenas a hospitais e instituições parceiras"
        >
          <Lock className="h-3.5 w-3.5" /> Área Hospitalar
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[var(--gradient-hero)]" />
      <div className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 -z-10 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Plataforma QualiParto
          </span>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Plataforma <span className="text-primary">QualiParto</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-foreground/85">
            Sistema nacional de avaliação, monitoramento e integração da qualidade de assistência
            obstétrica no Brasil.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A Plataforma QualiParto integra dados hospitalares e a percepção de puérperas e pessoas
            que vivenciaram o parto sobre o cuidado recebido. As informações são utilizadas para
            produzir indicadores de qualidade da assistência obstétrica e apoiar processos de
            melhoria nos serviços de saúde. Os resultados são disponibilizados de forma
            transparente no Dashboard Público, contribuindo para gestores, profissionais de saúde,
            pesquisadores e cidadãos acompanharem a qualidade da assistência ao parto no país.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="rounded-full bg-primary px-7 shadow-[var(--shadow-soft)] hover:bg-primary-glow">
              Explorar Dashboard <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-secondary bg-secondary/30 px-7 text-secondary-foreground hover:bg-secondary/50"
            >
              Conhecer a Plataforma
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/10 to-secondary/20 blur-2xl" />
          <img
            src={heroImage}
            alt="Profissionais de saúde da rede QualiParto"
            width={1024}
            height={1024}
            className="rounded-[2rem] shadow-[var(--shadow-soft)]"
          />
        </div>
      </div>
    </section>
  );
}

const tools = [
  {
    icon: BarChart3,
    title: "Dashboard Público",
    desc: "Explore indicadores da qualidade da assistência ao parto no Brasil.",
    cta: "Acessar dados",
    tone: "primary" as const,
  },
  {
    icon: Sparkles,
    title: "Meu Parto IA",
    desc: "Gere seu plano de parto com ajuda de Inteligência Artificial de maneira fácil e rápida de acordo com suas preferências de cuidado.",
    cta: "Começar agora",
    tone: "accent" as const,
  },
  {
    icon: Building2,
    title: "Painel para Hospitais",
    desc: "Sistema interno de coleta de dados e monitoramento dos indicadores de assistência ao parto.",
    note: "Acesso exclusivo para instituições participantes",
    cta: "Acessar área restrita",
    tone: "primary" as const,
    restricted: true,
  },
];

function Tools() {
  return (
    <section id="ferramentas" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Ferramentas da <span className="text-primary">Plataforma</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tecnologia a serviço de uma assistência obstétrica segura, humanizada e baseada em dados.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tools.map(({ icon: Icon, title, desc, cta, tone, note, restricted }) => (
            <article
              key={title}
              className={`group relative rounded-2xl border bg-card p-7 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] ${
                restricted ? "border-dashed border-border" : "border-border/60"
              }`}
            >
              <div
                className={`grid h-12 w-12 place-items-center rounded-xl ${
                  tone === "primary" ? "bg-primary/10 text-primary" : "bg-secondary/40 text-secondary-foreground"
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="mt-5 flex items-center gap-2">
                <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                {restricted && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    <Lock className="h-2.5 w-2.5" /> Restrito
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              {note && (
                <p className="mt-3 text-xs italic text-muted-foreground/80">{note}</p>
              )}
              <button className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-secondary-foreground transition-colors hover:text-primary">
                {cta} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Sobre a Plataforma</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Dados, ciência e cuidado <span className="text-primary">humanizado</span>
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            A QualiParto reúne práticas essenciais recomendadas pela OMS, adesão ao Checklist
            de Parto Seguro e a percepção das pessoas que vivenciaram o parto para produzir
            indicadores que apoiam a melhoria contínua da assistência obstétrica brasileira.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-foreground/85">
            {[
              "Avalie a adesão ao Checklist de Parto Seguro da OMS",
              "Acompanhe a implementação das práticas essenciais",
              "Monitore frequência e peso de eventos adversos",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-primary/15 text-primary">
                  <Check />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative rounded-3xl bg-gradient-to-br from-primary to-primary-glow p-10 shadow-[var(--shadow-soft)]">
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
          <Building2 className="h-12 w-12 text-primary-foreground/80" strokeWidth={1.5} />
          <h3 className="mt-6 text-2xl font-bold text-primary-foreground">Área do Gestor</h3>
          <p className="mt-3 text-primary-foreground/85">
            Acesso exclusivo para representantes hospitalares autorizarem a coleta automatizada
            de dados e acompanharem os indicadores internos do seu hospital.
          </p>
          <Button size="lg" className="mt-7 rounded-full bg-background px-7 text-foreground hover:bg-background/90">
            Entrar no Painel
          </Button>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const publications = [
  {
    year: "2025",
    title: "Indicadores de qualidade da assistência ao parto em hospitais brasileiros",
    journal: "Revista Brasileira de Saúde Materno Infantil",
  },
  {
    year: "2024",
    title: "Adesão à Lista de Verificação para Parto Seguro: estudo multicêntrico",
    journal: "Cadernos de Saúde Pública",
  },
  {
    year: "2024",
    title: "Índice de Humanização do parto: construção e validação",
    journal: "Ciência & Saúde Coletiva",
  },
];

function Publications() {
  return (
    <section id="publicacoes" className="bg-muted/40 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Publicações</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Ciência produzida pela <span className="text-primary">QualiParto</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Artigos e materiais científicos do grupo que sustentam a plataforma.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {publications.map((p) => (
            <article
              key={p.title}
              className="group rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
            >
              <span className="inline-flex rounded-full bg-secondary/40 px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                {p.year}
              </span>
              <h3 className="mt-4 text-base font-semibold leading-snug text-foreground">{p.title}</h3>
              <p className="mt-3 text-xs text-muted-foreground">{p.journal}</p>
              <a
                href="#"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary"
              >
                Ler publicação <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const partners = ["UFRN", "IMD", "CNPq", "QualiSaúde"];

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Instituições Parceiras
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-10">
          {partners.map((p) => (
            <div
              key={p}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-xs font-bold text-primary">
                {p[0]}
              </span>
              {p}
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground md:flex-row">
          <div>
            <Logo />
            <p className="mt-2 text-xs">© 2026 QualiParto. Parceria UFRN, IMD, CNPq e QualiSaúde.</p>
          </div>
          <nav className="flex flex-wrap gap-6 text-xs">
            <a href="#sobre" className="hover:text-primary">Sobre</a>
            <a href="#publicacoes" className="hover:text-primary">Publicações</a>
            <a href="#" className="hover:text-primary">Política de Privacidade</a>
            <a href="#" className="hover:text-primary">Contato</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Tools />
        <About />
        <Publications />
      </main>
      <Footer />
    </div>
  );
}
