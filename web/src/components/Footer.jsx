import { Link } from "react-router-dom"
import { MessageCircle, Mail, MapPin } from "lucide-react"
import { site, whatsappLink } from "../config.js"
import { products } from "../data/services.js"
import { Logo } from "./ui.jsx"

export default function Footer() {
  return (
    <footer className="border-t border-line-soft bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="pr-6">
          <Link to="/" aria-label="Skylayer — início">
            <Logo />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Soluções digitais estáveis, seguras e acessíveis para empresas e profissionais.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-ink">Soluções</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {products.map((p) => (
              <li key={p.slug}>
                <Link to={`/servicos/${p.slug}`} className="text-muted transition-colors hover:text-brand-700">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-ink">Empresa</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/sobre" className="text-muted transition-colors hover:text-brand-700">Sobre</Link>
            </li>
            <li>
              <Link to="/projetos" className="text-muted transition-colors hover:text-brand-700">Projetos</Link>
            </li>
            <li>
              <Link to="/blog" className="text-muted transition-colors hover:text-brand-700">Blog</Link>
            </li>
            <li>
              <Link to="/faq" className="text-muted transition-colors hover:text-brand-700">FAQ</Link>
            </li>
            <li>
              <Link to="/contacto" className="text-muted transition-colors hover:text-brand-700">Contacto</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-ink">Contactos</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-muted transition-colors hover:text-brand-700"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                {site.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-muted transition-colors hover:text-brand-700"
              >
                <Mail className="h-4 w-4 text-brand-600" />
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2 text-muted">
              <MapPin className="h-4 w-4 text-muted" />
              {site.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line-soft">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Skylayer. Todos os direitos reservados.</p>
          <p>Soluções digitais estáveis, seguras e acessíveis.</p>
        </div>
      </div>
    </footer>
  )
}
