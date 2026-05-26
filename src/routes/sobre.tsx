import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Heart, Lock, ArrowRight, Target, Users, Microscope, ShieldCheck, HandHeart, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import partnerQualisaudeUfrn from "@/assets/partner-qualisaude-ufrn.png";
import partnerMetropole from "@/assets/partner-metropole.png";
import partnerCnpq from "@/assets/partner-cnpq.png";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "A Plataforma — QualiParto" },
      {
        name: "description",
        content:
          "Conheça a Plataforma QualiParto: missão, metodologia científica, parceiros e como atuamos pela qualidade da assistência ao parto no Brasil.",
      },
    ],
  }),
  component: SobrePage,
});

const sections = [
  { id: "missao", label: "Missão", icon: Target },
  { id: "como-funciona", label: "Como funciona", icon: Microscope },
  { id: "publicos", label: "Para quem é", icon: Users },
  { id: "metodologia", label: "Metodologia", icon: ShieldCheck },
  { id: "humanizacao", label: "Humanização", icon: HandHeart },
  { id: "parceiros", label: "Parceiros", icon: Building2 },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">Início</Link>
          <a href="/#ferramentas" className="text-sm text-muted-foreground transition-colors hover:text-primary">Dashboard Público</a>
          <a href="/#ferramentas" className="text-sm text-muted-foreground transition-colors hover:text-primary">Meu Parto IA</a>
          <Link to="/sobre" className="text-sm font-medium text-primary">A plataforma</Link>
          <a href="/#publicacoes" className="text-sm text-muted-foreground transition-colors hover:text-primary">Publicações</a>
        </nav>
        <Button
          asChild
          variant="outline"
          className="rounded-full border-border/80 bg-transparent px-4 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
          title="Área restrita destinada apenas a hospitais e instituições parceiras"
        >
          <Link to="/login"><Lock className="h-3.5 w-3.5" /> Área Hospitalar</Link>
        </Button>
      </div>
    </header>
  );
}

function useScrollspy() {
  const [active, setActive] = useState<string>(sections[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      setProgress(Math.min(100, Math.max(0, scrolled * 100)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { active, progress };
}

function smoothScrollTo(id: string, offset = 88) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
}

function TableOfContents() {
  const { active, progress } = useScrollspy();

  return (
    <aside className="sticky top-24 hidden self-start lg:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Nesta página
      </p>
      <div className="mb-4 h-0.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full bg-primary transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
      <nav className="space-y-1 border-l border-border">
        {sections.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo(id);
              }}
              className={`-ml-px flex items-center gap-2.5 border-l-2 py-2 pl-4 text-sm transition-colors ${
                isActive
                  ? "border-primary font-medium text-primary"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </a>
          );
        })}
      </nav>
      <div className="mt-8 rounded-xl border border-border/60 bg-muted/40 p-4">
        <p className="text-xs text-muted-foreground">
          Dúvidas sobre a plataforma?
        </p>
        <a href="#" className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Fale conosco <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </aside>
  );
}

function MobileScrollspy() {
  const { active, progress } = useScrollspy();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = navRef.current?.querySelector<HTMLAnchorElement>(`a[data-id="${active}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  return (
    <div className="sticky top-16 z-40 -mx-6 border-b border-border/60 bg-background/85 backdrop-blur-md lg:hidden">
      <div
        ref={navRef}
        className="flex gap-1.5 overflow-x-auto px-6 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {sections.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              data-id={id}
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo(id, 96);
              }}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 bg-card text-muted-foreground"
              }`}
            >
              <Icon className="h-3 w-3" />
              {label}
            </a>
          );
        })}
      </div>
      <div className="h-0.5 w-full bg-border/60">
        <div
          className="h-full bg-primary transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-border/40 py-14 first:pt-0 last:border-b-0">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h2>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function SobrePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="relative overflow-hidden border-b border-border/60 bg-[var(--gradient-hero)]">
        <div className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
        <div className="mx-auto max-w-4xl px-6 py-10 text-center md:py-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Heart className="h-3.5 w-3.5" /> A Plataforma
          </span>
          <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">
            Dados, ciência e cuidado humanizado a serviço da{" "}
            <span className="text-primary">assistência ao parto no Brasil</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
            Conheça a missão, a metodologia e as pessoas por trás da plataforma nacional de
            monitoramento da qualidade obstétrica.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-16">
        <MobileScrollspy />
        <div className="grid gap-12 lg:grid-cols-[1fr_240px]">
          <div className="min-w-0">
            <Section id="missao" eyebrow="Missão" title="Por que a QualiParto existe">
              <p>
                A QualiParto nasce do compromisso de tornar a qualidade da assistência ao parto
                mensurável, transparente e comparável entre hospitais brasileiros. Atuamos para
                que cada nascimento seja seguro, baseado em evidências e respeitoso com a pessoa
                que pare.
              </p>
              <p>
                Acreditamos que dados confiáveis, somados à escuta de quem vivencia o parto, são
                a base para melhorar continuamente os serviços de saúde.
              </p>
            </Section>

            <Section id="como-funciona" eyebrow="Como funciona" title="A plataforma em três camadas">
              <p>
                A QualiParto integra <strong>dados hospitalares</strong> com a{" "}
                <strong>percepção de puérperas</strong> e disponibiliza esses indicadores em um{" "}
                <strong>Dashboard Público</strong>, acessível a qualquer cidadão.
              </p>
              <ul className="mt-2 space-y-2 pl-5 [list-style:disc]">
                <li>Coleta automatizada de dados clínicos nos hospitais participantes</li>
                <li>Pesquisa de experiência respondida por quem vivenciou o parto</li>
                <li>Cálculo de indicadores nacionais de qualidade obstétrica</li>
              </ul>
            </Section>

            <Section id="publicos" eyebrow="Para quem é" title="Três públicos, uma plataforma">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-border/60 bg-card p-5">
                  <p className="text-sm font-semibold text-foreground">Público geral</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Acessa o Dashboard Público com indicadores abertos.
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-card p-5">
                  <p className="text-sm font-semibold text-foreground">Gestantes</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Usam o Meu Parto IA sem login para construir seu plano de parto.
                  </p>
                </div>
                <div className="rounded-xl border border-dashed border-border bg-muted/40 p-5">
                  <p className="text-sm font-semibold text-foreground">Hospitais</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Área restrita para instituições parceiras acompanharem indicadores internos.
                  </p>
                </div>
              </div>
            </Section>

            <Section id="metodologia" eyebrow="Metodologia" title="Indicadores baseados em evidência">
              <p>
                Nossos indicadores seguem recomendações da Organização Mundial da Saúde (OMS),
                incluindo a <strong>Lista de Verificação para Parto Seguro</strong> e as práticas
                essenciais da atenção ao parto e nascimento.
              </p>
              <ul className="mt-2 space-y-2 pl-5 [list-style:disc]">
                <li>Adesão ao Checklist de Parto Seguro da OMS</li>
                <li>Implementação das práticas essenciais ao parto e nascimento</li>
                <li>Frequência e peso de eventos adversos obstétricos</li>
              </ul>
            </Section>

            <Section id="humanizacao" eyebrow="Humanização" title="Escutar quem vive o parto">
              <p>
                A experiência relatada por puérperas é parte central da QualiParto. Construímos
                um <strong>Índice de Humanização</strong> a partir da percepção sobre respeito,
                autonomia, acolhimento e informação durante o cuidado recebido.
              </p>
              <p>
                Esses dados ajudam serviços de saúde a identificar oportunidades de melhoria
                que não aparecem apenas em registros clínicos.
              </p>
            </Section>

            <Section id="parceiros" eyebrow="Parceiros" title="Quem faz a QualiParto acontecer">
              <p>
                A plataforma é fruto de uma parceria entre instituições de ensino, pesquisa e
                fomento comprometidas com a saúde materna no Brasil.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
                {[
                  { src: partnerQualisaudeUfrn, alt: "QualiSaúde e UFRN", className: "h-12 md:h-14" },
                  { src: partnerMetropole, alt: "Metrópole Digital", className: "h-10 md:h-12" },
                  { src: partnerCnpq, alt: "CNPq", className: "h-10 md:h-12" },
                ].map((p) => (
                  <img
                    key={p.alt}
                    src={p.src}
                    alt={p.alt}
                    className={`${p.className} w-auto object-contain opacity-80 transition hover:opacity-100`}
                    loading="lazy"
                  />
                ))}
              </div>
            </Section>
          </div>

          <TableOfContents />
        </div>
      </main>
    </div>
  );
}
