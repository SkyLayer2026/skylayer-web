import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, X, MessageCircle } from "lucide-react"
import { whatsappLink, site } from "../config.js"

const navLink = ({ isActive }) =>
  `text-sm font-medium transition-colors hover:text-sky-500 ${
    isActive ? "text-sky-600" : "text-slate-600"
  }`

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
            <defs>
              <linearGradient id="logo" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#38bdf8" />
                <stop offset="1" stopColor="#1e3a8a" />
              </linearGradient>
            </defs>
            <path fill="url(#logo)" d="M16 2 30 30H2z" />
            <path fill="white" d="M16 10l8 16h-4.2L16 17l-3.8 9H8z" />
          </svg>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            Sky<span className="text-sky-600">layer</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLink} end>
            Início
          </NavLink>
          <NavLink to="/servicos" className={navLink}>
            Serviços
          </NavLink>
          <NavLink to="/portfolio" className={navLink}>
            Portfólio
          </NavLink>
          <NavLink to="/diagnostico" className={navLink}>
            Diagnóstico gratuito
          </NavLink>
          <NavLink to="/contacto" className={navLink}>
            Contacto
          </NavLink>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </nav>

        <button
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <NavLink to="/" className={navLink} end onClick={() => setOpen(false)}>
              Início
            </NavLink>
            <NavLink to="/servicos" className={navLink} onClick={() => setOpen(false)}>
              Serviços
            </NavLink>
            <NavLink to="/portfolio" className={navLink} onClick={() => setOpen(false)}>
              Portfólio
            </NavLink>
            <NavLink to="/diagnostico" className={navLink} onClick={() => setOpen(false)}>
              Diagnóstico gratuito
            </NavLink>
            <NavLink to="/contacto" className={navLink} onClick={() => setOpen(false)}>
              Contacto
            </NavLink>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          </div>
        </nav>
      )}
      <span className="sr-only">{site.name}</span>
    </header>
  )
}
