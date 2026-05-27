import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Heart, Lock, ArrowRight, ArrowUp, Users, Wrench, FileText, BarChart3, ClipboardList, Sparkles, MessageSquare, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const Route = createFileRoute("/aplataforma")({
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
  { id: "quem-somos", label: "Quem somos", icon: Users },
  { id: "ferramentas", label: "Nossas ferramentas", icon: Wrench },
  { id: "acesso-gestor", label: "Acesso Gestor", icon: Lock },
  { id: "como-avaliar", label: "Como avaliar", icon: FileText },
  { id: "indicadores", label: "Indicadores", icon: BarChart3 },
  { id: "instrumento", label: "Instrumento de coleta", icon: ClipboardList },
  
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">Início</Link>
          <Link to="/dashboard-publico" className="text-sm text-muted-foreground transition-colors hover:text-primary">Dashboard Público</Link>
          <Link to="/meu-parto-ia" className="text-sm text-muted-foreground transition-colors hover:text-primary">Meu Parto IA</Link>
          <Link to="/aplataforma" className="text-sm font-medium text-primary">A plataforma</Link>
          <a href="/publicacoes" className="text-sm text-muted-foreground transition-colors hover:text-primary">Publicações</a>
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
      <Breadcrumbs items={[{ label: "A plataforma" }]} />

      <div className="relative overflow-hidden border-b border-border/60 bg-[image:var(--gradient-hero)]">
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
            <Section id="quem-somos" eyebrow="Sobre" title="Quem somos nós?">
              <p>
                Somos uma iniciativa dedicada à melhoria da qualidade da atenção ao parto, com
                foco na segurança, na experiência da mulher e na tomada de decisão baseada em
                dados.
              </p>
              <p>
                Atuamos no desenvolvimento, implementação e avaliação de soluções que promovem
                um cuidado mais humanizado, eficiente e orientado por evidências. Nosso trabalho
                integra tecnologia, ciência de dados e práticas assistenciais para apoiar
                profissionais de saúde e gestores na melhoria contínua dos serviços.
              </p>
              <p>
                Acreditamos que a transformação do cuidado começa pela mensuração adequada,
                transparência dos resultados e engajamento das equipes e usuários. Por isso,
                construímos ferramentas que tornam visível aquilo que importa: a qualidade do
                cuidado e a experiência das mulheres.
              </p>
            </Section>

            <Section id="ferramentas" eyebrow="O que oferecemos" title="Nossas ferramentas">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    icon: Lock,
                    title: "Acesso Gestor",
                    desc: "Painel exclusivo para gestores com informações sobre a qualidade do cuidado, permitindo acompanhar resultados e identificar oportunidades de melhoria de forma contínua.",
                  },
                  {
                    icon: BarChart3,
                    title: "Dashboard público",
                    desc: "Painel aberto que amplia a transparência e o acesso às informações coletadas pela plataforma. Qualquer pessoa interessada pode explorar os indicadores de qualidade do cuidado ao parto.",
                  },
                  {
                    icon: MessageSquare,
                    title: "Avaliação do parto",
                    desc: "Módulo de avaliação da experiência do parto. Por meio de um questionário simples, puérperas atendidas em instituições parceiras compartilham percepções e contribuem para a melhoria dos serviços.",
                  },
                  {
                    icon: Sparkles,
                    title: "Geração de planos de parto com IA",
                    desc: "Ferramenta gratuita que ajuda gestantes a criarem seu plano de parto com apoio de inteligência artificial, facilitando a compreensão das opções e apoiando decisões mais informadas.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="rounded-xl border border-border/60 bg-card p-5">
                    <div className="flex items-center gap-2 text-primary">
                      <Icon className="h-4 w-4" />
                      <p className="text-sm font-semibold text-foreground">{title}</p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
              <p>
                Juntas, essas ferramentas ajudam a transformar informações em melhorias reais e
                aproximam as pessoas do cuidado, tornando o parto mais seguro, transparente e
                centrado na mulher.
              </p>
            </Section>

            <Section id="acesso-gestor" eyebrow="Para hospitais" title="Acesso Gestor">
              <p>
                Gestores, profissionais de saúde, profissionais do Núcleo de Segurança do
                Paciente (NSP) e lideranças com interesse em avaliar a qualidade e segurança da
                assistência obstétrica em hospitais brasileiros podem utilizar nossa plataforma
                a partir do <strong>Acesso Gestor</strong>, no qual a inserção dos dados
                institucionais, operacionais e assistenciais geram automaticamente um relatório
                de avaliação com os indicadores da qualidade do parto de sua instituição.
              </p>
              <p>
                É preciso que o coordenador da instituição ou o responsável pelo monitoramento
                insira dados básicos do serviço (nome, CNES, estado e cidade), além dos e-mails
                dos profissionais que irão realizar a coleta.
              </p>
              <Button asChild variant="outline" className="mt-2 rounded-full">
                <Link to="/login">
                  <Lock className="h-3.5 w-3.5" /> Entrar na Área Hospitalar
                </Link>
              </Button>
            </Section>

            <Section id="como-avaliar" eyebrow="Passo a passo" title="Como avaliar o seu hospital?">
              <p>
                Disponibilizamos um documento com o passo a passo completo para condução da
                avaliação na sua instituição.
              </p>
              <a
                href="/docs/passo-a-passo-qualiparto.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
              >
                <Download className="h-4 w-4" />
                Acesse aqui o documento do passo a passo
              </a>
            </Section>

            <Section id="indicadores" eyebrow="Metodologia" title="Indicadores de avaliação da qualidade">
              <p>Os indicadores da plataforma são baseados em:</p>
              <ul className="mt-2 space-y-2 pl-5 [list-style:disc]">
                <li>Checklist para o Parto Seguro da OMS (Carvalho et al., 2018);</li>
                <li>Indicadores de eventos adversos (Mann et al., 2006);</li>
                <li>Diretrizes atuais de práticas essenciais no parto.</li>
              </ul>
              <p>
                Os indicadores que compõem a Plataforma QualiParto foram construídos e validados
                em um estudo piloto anterior (Saturno et al., 2018; Sousa et al., 2020) com base
                nos itens contidos no Checklist para o Parto Seguro da OMS (<em>Safe Childbirth
                Checklist – SCC</em>), nos indicadores de eventos adversos padronizados por Mann
                et al. (2006) e nas atuais diretrizes de boas práticas no parto, além da
                validação de indicadores usados no projeto e do processo de adaptação do SCC
                para o Brasil (Carvalho et al., 2018). Os resultados da linha de base da
                pesquisa foram descritos previamente e podem ser encontrados no estudo de Sousa
                et al. (2019).
              </p>
            </Section>

            <Section id="instrumento" eyebrow="Coleta de dados" title="Características do instrumento de coleta de dados">
              <p>
                O instrumento é um questionário autoaplicável, organizado em três módulos:
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    n: "1",
                    title: "Práticas Essenciais (PE)",
                    desc: "8 itens de boas práticas recomendadas pela OMS (World Health Organization, 2018).",
                  },
                  {
                    n: "2",
                    title: "Adesão ao Checklist para Parto Seguro",
                    desc: "42 itens do checklist adaptado para o Brasil (Carvalho et al., 2018).",
                  },
                  {
                    n: "3",
                    title: "Eventos Adversos (EA)",
                    desc: "10 itens padronizados por Mann et al. (2006).",
                  },
                ].map((m) => (
                  <div key={m.n} className="rounded-xl border border-border/60 bg-card p-5">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {m.n}
                    </span>
                    <p className="mt-3 text-sm font-semibold text-foreground">{m.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
                  </div>
                ))}
              </div>
              <p>
                O instrumento permite calcular indicadores simples e compostos da qualidade do
                parto a partir das dimensões <strong>segurança do paciente</strong> (indicadores
                de EA) e <strong>efetividade clínica</strong> (indicadores de PE). Adicionalmente,
                o questionário contém perguntas sobre dados demográficos e clínicos da mãe e do
                recém-nascido.
              </p>
            </Section>

          </div>

          <TableOfContents />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
