import { Link } from "@tanstack/react-router";
import partnerQualisaudeUfrn from "@/assets/partner-qualisaude-ufrn.png";
import partnerMetropole from "@/assets/partner-metropole.png";
import partnerCnpq from "@/assets/partner-cnpq.png";

const partners = [
  { name: "QualiSaúde / UFRN", src: partnerQualisaudeUfrn },
  { name: "Metrópole Digital", src: partnerMetropole },
  { name: "CNPq", src: partnerCnpq },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-6 text-xs text-muted-foreground md:flex-row">
        <p className="shrink-0">© 2026 QualiParto</p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-80">
          {partners.map((p) => (
            <img
              key={p.name}
              src={p.src}
              alt={p.name}
              className="h-7 w-auto object-contain md:h-8"
            />
          ))}
        </div>
        <nav className="flex shrink-0 flex-wrap justify-center gap-5">
          <Link to="/sobre" className="hover:text-primary">A plataforma</Link>
          <a href="/publicacoes" className="hover:text-primary">Publicações</a>
          <a href="#" className="hover:text-primary">Privacidade</a>
          <a href="#" className="hover:text-primary">Contato</a>
        </nav>
      </div>
    </footer>
  );
}
