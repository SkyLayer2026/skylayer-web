import { Link } from "react-router-dom"
import { MessageCircle, Mail, MapPin } from "lucide-react"
import { site, whatsappLink } from "../config.js"
import { services } from "../data/services.js"

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
              <defs>
                <linearGradient id="logof" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#1e3a8a" />
                </linearGradient>
              </defs>
              <path fill="url(#logof)" d="M16 2 30 30H2z" />
              <path fill="white" d="M16 10l8 16h-4.2L16 17l-3.8 9H8z" />
            </svg>
            <span className="text-lg font-extrabold tracking-tight text-white">
              Sky<span className="text-sky-400">layer</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-400">{site.tagline}.</p>
          <p className="mt-2 text-sm text-slate-400">{site.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Serviços</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/servicos/${s.slug}`} className="transition hover:text-sky-400">
                  {s.shortName === "Sistemas" ? "Sistemas de gestão" : s.shortName}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/diagnostico" className="transition hover:text-sky-400">
                Diagnóstico gratuito
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Empresa</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/portfolio" className="transition hover:text-sky-400">
                Portfólio
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="transition hover:text-sky-400">
                Contacto
              </Link>
            </li>
            <li>
              <Link to="/" className="transition hover:text-sky-400">
                Início
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contactos</h3>
          <ul className="mt-3 space-y-3 text-sm">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition hover:text-sky-400"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                {site.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 transition hover:text-sky-400"
              >
                <Mail className="h-4 w-4 text-sky-400" />
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-400" />
              {site.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Skylayer. Todos os direitos reservados.</p>
          <p>Tecnologia acessível para o crescimento do seu negócio.</p>
        </div>
      </div>
    </footer>
  )
}
