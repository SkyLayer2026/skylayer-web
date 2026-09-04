import { Link } from "react-router-dom"
import { MessageCircle, Mail, MapPin } from "lucide-react"
import { site, whatsappLink } from "../config.js"
import { Logo } from "./ui.jsx"

const frontLinks = [
  { to: "/dev", label: "DEV", color: "text-dev-500" },
  { to: "/iot", label: "IoT", color: "text-iot-500" },
  { to: "/infrastructure", label: "Infrastructure", color: "text-infra-500" },
]

export default function Footer() {
  return (
    <footer className="border-t border-line-soft bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="pr-6">
          <Link to="/" aria-label="Skylayer — início">
            <Logo />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Construímos, conectamos e mantemos os sistemas que fazem a sua operação funcionar.
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-silver">
            Maputo / Moçambique
          </p>
        </div>

        <div>
          <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ink">
            Soluções
          </h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {frontLinks.map((f) => (
              <li key={f.to}>
                <Link
                  to={f.to}
                  className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-70 ${f.color}`}
                >
                  {f.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/dev"
                className="text-muted transition-colors hover:text-charcoal"
              >
                Ver catálogo completo
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ink">
            Empresa
          </h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <Link to="/sobre" className="text-muted transition-colors hover:text-charcoal">Sobre</Link>
            </li>
            <li>
              <Link to="/blog" className="text-muted transition-colors hover:text-charcoal">Blog</Link>
            </li>
            <li>
              <Link to="/faq" className="text-muted transition-colors hover:text-charcoal">FAQ</Link>
            </li>
            <li>
              <Link to="/contacto" className="text-muted transition-colors hover:text-charcoal">Contacto</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ink">
            Contactos
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-muted transition-colors hover:text-charcoal"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                {site.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-muted transition-colors hover:text-charcoal"
              >
                <Mail className="h-4 w-4 text-silver" />
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2 text-muted">
              <MapPin className="h-4 w-4 text-silver" />
              {site.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line-soft">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Skylayer. Todos os direitos reservados.</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-silver">
            BUILD · CONNECT · EVOLVE
          </p>
        </div>
      </div>
    </footer>
  )
}