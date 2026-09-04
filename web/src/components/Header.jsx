import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, X, ArrowRight } from "lucide-react"
import { Logo } from "./ui.jsx"

const frontLinks = [
  { to: "/dev", label: "DEV" },
  { to: "/iot", label: "IoT" },
  { to: "/infrastructure", label: "Infrastructure" },
]

const links = [
  { to: "/servicos", label: "Produtos" },
  { to: "/sobre", label: "Sobre" },
  { to: "/blog", label: "Blog" },
  { to: "/contacto", label: "Contacto" },
]

const navLink = ({ isActive }) =>
  `font-mono text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors hover:text-charcoal ${
    isActive ? "text-charcoal" : "text-muted"
  }`

export default function Header() {
  const [open, setOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" aria-label="Skylayer — início" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {/* Soluções dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              type="button"
              className={`flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors hover:text-charcoal ${
                solutionsOpen ? "text-charcoal" : "text-muted"
              }`}
            >
              Soluções
              <span className="text-[9px]" aria-hidden="true">▼</span>
            </button>

            {solutionsOpen && (
              <div className="absolute left-0 top-full mt-3 w-60 border border-line bg-ivory p-1 shadow-lg">
                <p className="px-3 pb-2 pt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-silver">
                  Três frentes
                </p>
                {frontLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-white ${
                        isActive ? "text-charcoal" : "text-muted"
                      }`
                    }
                    onClick={() => {
                      setOpen(false)
                      setSolutionsOpen(false)
                    }}
                  >
                    {l.label}
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </NavLink>
                ))}
              </div>
            )}
          </div>

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

        {/* Mobile toggle */}
        <button
          className="rounded-lg p-2 text-muted hover:bg-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-line-soft bg-ivory px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            <p className="px-3 pb-1 pt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-silver">
              Soluções
            </p>
            {frontLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-none px-3 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] ${
                    isActive ? "bg-white text-charcoal" : "text-muted"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}

            <p className="px-3 pb-1 pt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-silver">
              Navegação
            </p>
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-none px-3 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] ${
                    isActive ? "bg-white text-charcoal" : "text-muted"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}

            <Link
              to="/contacto"
              className="btn-primary mt-4"
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