import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Lock, ArrowRight, ChevronDown, FileText, GraduationCap, Megaphone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const Route = createFileRoute("/publicacoes")({
  head: () => ({
    meta: [
      { title: "Publicações — QualiParto" },
      {
        name: "description",
        content:
          "Artigos científicos, teses, dissertações e materiais de divulgação produzidos pelo grupo de pesquisa que sustenta a plataforma QualiParto.",
      },
      { property: "og:title", content: "Publicações — QualiParto" },
      {
        property: "og:description",
        content: "Ciência produzida pela QualiParto: artigos, teses e divulgação científica.",
      },
    ],
  }),
  component: PublicacoesPage,
});

type Publication = {
  title: string;
  authors: string;
  venue: string;
  url?: string;
};

type YearGroup = { year: number; items: Publication[] };

const articles: YearGroup[] = [
  {
    year: 2025,
    items: [
      {
        title: "Indicadores de qualidade da assistência ao parto em hospitais brasileiros",
        authors: "Silva, A. B.; Costa, M. R.; Oliveira, F. P. et al.",
        venue: "Revista Brasileira de Saúde Materno Infantil, v. 25, n. 1.",
      },
    ],
  },
  {
    year: 2024,
    items: [
      {
        title:
          "Adesão ao Checklist para Parto Seguro da OMS em maternidades públicas",
        authors: "Sousa, A. L.; Pereira, C. M.; Carvalho, M. et al.",
        venue: "Cadernos de Saúde Pública, v. 40, n. 6.",
      },
      {
        title:
          "Eventos adversos obstétricos: padronização de medidas e aplicação no Brasil",
        authors: "Mann, S.; Saturno, P.; Sousa, A. L. et al.",
        venue: "BMC Pregnancy and Childbirth, v. 24.",
      },
    ],
  },
  {
    year: 2023,
    items: [
      {
        title:
          "Humanização da assistência ao parto: percepções de puérperas em hospitais parceiros",
        authors: "Lima, K. R.; Sousa, A. L.; Carvalho, M.",
        venue: "Revista Latino-Americana de Enfermagem, v. 31.",
      },
      {
        title:
          "Práticas essenciais ao parto e nascimento: implementação e barreiras",
        authors: "Saturno, P.; Sousa, A. L.",
        venue: "Ciência & Saúde Coletiva, v. 28, n. 4.",
      },
    ],
  },
  {
    year: 2022,
    items: [
      {
        title: "Adaptação transcultural do Safe Childbirth Checklist para o Brasil",
        authors: "Carvalho, M.; Sousa, A. L.; Saturno, P.",
        venue: "International Journal for Quality in Health Care, v. 34.",
      },
    ],
  },
];

const theses: YearGroup[] = [
  {
    year: 2024,
    items: [
      {
        title:
          "Avaliação da qualidade da assistência ao parto em maternidades do Nordeste brasileiro",
        authors: "Lima, K. R. (Tese de Doutorado)",
        venue: "Programa de Pós-Graduação em Saúde Coletiva — UFRN.",
      },
    ],
  },
  {
    year: 2023,
    items: [
      {
        title:
          "Construção e validação de indicadores compostos da qualidade do parto",
        authors: "Pereira, C. M. (Dissertação de Mestrado)",
        venue: "Programa de Pós-Graduação em Saúde Coletiva — UFRN.",
      },
    ],
  },
];

const divulgacao: YearGroup[] = [
  {
    year: 2025,
    items: [
      {
        title:
          "O que é qualidade na assistência ao parto? — Cartilha para gestantes",
        authors: "Equipe QualiParto",
        venue: "Material de divulgação científica.",
      },
    ],
  },
  {
    year: 2024,
    items: [
      {
        title:
          "Como sua maternidade pode adotar boas práticas no parto — Guia rápido",
        authors: "Equipe QualiParto",
        venue: "Material de apoio para gestores hospitalares.",
      },
    ],
  },
];

const tabs = [
  { id: "artigos", label: "Artigos em periódicos", icon: FileText, data: articles },
  { id: "teses", label: "Teses e dissertações", icon: GraduationCap, data: theses },
  { id: "divulgacao", label: "Divulgação científica", icon: Megaphone, data: divulgacao },
] as const;

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">Início</Link>
          <Link to="/dashboard-publico" className="text-sm text-muted-foreground transition-colors hover:text-primary">Dashboard Público</Link>
          <Link to="/meu-parto-ia" className="text-sm text-muted-foreground transition-colors hover:text-primary">Meu Parto IA</Link>
          <Link to="/aplataforma" className="text-sm text-muted-foreground transition-colors hover:text-primary">A plataforma</Link>
          <Link to="/publicacoes" className="text-sm font-medium text-primary">Publicações</Link>
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

function YearAccordion({ groups, query }: { groups: YearGroup[]; query: string }) {
  const [openYear, setOpenYear] = useState<number | null>(groups[0]?.year ?? null);

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = normalizedQuery
    ? groups
        .map((g) => ({
          ...g,
          items: g.items.filter(
            (item) =>
              item.title.toLowerCase().includes(normalizedQuery) ||
              item.authors.toLowerCase().includes(normalizedQuery) ||
              item.venue.toLowerCase().includes(normalizedQuery)
          ),
        }))
        .filter((g) => g.items.length > 0)
    : groups;

  return (
    <div className="rounded-2xl border border-border/60 bg-card shadow-sm">
      {filtered.length === 0 ? (
        <div className="px-6 py-10 text-center text-sm text-muted-foreground">
          Nenhuma publicação encontrada para &ldquo;{query.trim()}&rdquo;.
        </div>
      ) : (
        filtered.map((g, idx) => {
          const isOpen = openYear === g.year;
          return (
            <div
              key={g.year}
              className={idx > 0 ? "border-t border-border/60" : ""}
            >
              <button
                type="button"
                onClick={() => setOpenYear(isOpen ? null : g.year)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-muted/40"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-foreground">{g.year}</span>
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-secondary/60 px-2 text-xs font-medium text-secondary-foreground">
                    {g.items.length}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <ul className="space-y-5 px-6 pb-6">
                  {g.items.map((item) => (
                    <li
                      key={item.title}
                      className="border-l-2 border-primary/60 pl-4"
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary"
                          >
                            {item.title}
                          </a>
                        ) : (
                          item.title
                        )}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.authors}</p>
                      <p className="mt-0.5 text-xs italic text-muted-foreground">{item.venue}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

function PublicacoesPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>>("artigos");
  const [query, setQuery] = useState("");
  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Breadcrumbs items={[{ label: "Publicações" }]} />

      <div className="relative overflow-hidden border-b border-border/60 bg-[image:var(--gradient-hero)]">
        <div className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
        <div className="mx-auto max-w-4xl px-6 py-14 md:py-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Heart className="h-3.5 w-3.5" /> Publicações
          </span>
          <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">
            Ciência produzida pela <span className="text-primary">QualiParto</span>
          </h1>
          <p className="mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
            Artigos científicos, teses, dissertações e materiais de divulgação do grupo de
            pesquisa que sustenta a plataforma QualiParto.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <div className="mx-auto max-w-xl">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por título, autor ou veículo..."
              className="w-full rounded-full border border-border/80 bg-card py-2.5 pl-10 pr-4 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <YearAccordion groups={current.data} query={query} />
        </div>

        <section className="mt-16 rounded-2xl border border-border/60 bg-card p-8 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            Interessado em colaborar com nossa pesquisa?
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Estamos sempre abertos a novas parcerias acadêmicas e institucionais. Entre em
            contato para saber mais sobre nossos projetos em andamento.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <a href="mailto:contato@qualiparto.org">
                Entrar em Contato <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="secondary" className="rounded-full">
              <Link to="/aplataforma">Conhecer a Plataforma</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
