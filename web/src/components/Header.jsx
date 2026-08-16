import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { Logo } from "./ui.jsx"

const links = [
  { to: "/servicos", label: "Soluções" },
  { to: "/sobre", label: "Sobre" },
  { to: "/blog", label: "Blog" },
  { to: "/contacto", label: "Contacto" },
]

const navLink = ({ isActive }) =>
  `text-sm font-medium transition-colors hover:text-brand-700 ${
    isActive ? "text-brand-600" : "text-muted"
  }`

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" aria-label="Skylayer — início" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={navLink}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/contacto" className="btn-primary !px-5 !py-2.5">
            Solicitar orçamento
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-muted hover:bg-surface md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-line-soft bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? "bg-surface text-brand-700" : "text-muted"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contacto"
              className="btn-primary mt-3"
              onClick={() => setOpen(false)}
            >
              Solicitar orçamento
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
