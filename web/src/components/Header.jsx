import { useEffect, useRef, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, X, ArrowRight } from "lucide-react"
import { Logo } from "./ui.jsx"

const frontLinks = [
  { to: "/dev", label: "DEV" },
  { to: "/iot", label: "IoT" },
  { to: "/infrastructure", label: "Infrastructure" },
]

/* Nav principal: Soluções (dropdown) · SN IA (direto) · Serviços · Catálogo · Engenharia · Sobre · Blog · Contacto */
const links = [
  { to: "/servicos", label: "Serviços" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/engenharia", label: "Engenharia" },
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
  const solutionsBtnRef = useRef(null)
  const closeTimer = useRef(null)

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  // Abre imediatamente; fecha com um pequeno atraso para o rato poder
  // atravessar o espaço entre o botão e o painel sem o menu fechar.
  const openSolutions = () => {
    clearTimeout(closeTimer.current)
    setSolutionsOpen(true)
  }
  const closeSolutionsSoon = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setSolutionsOpen(false), 160)
  }
  const closeSolutionsNow = () => {
    clearTimeout(closeTimer.current)
    setSolutionsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" aria-label="Skylayer — início" onClick={() => setOpen(false)}>
          <Logo className="h-16" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {/* Soluções dropdown */}
          <div
            className="relative"
            onMouseEnter={openSolutions}
            onMouseLeave={closeSolutionsSoon}
            onFocus={openSolutions}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) closeSolutionsNow()
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                closeSolutionsNow()
                solutionsBtnRef.current?.focus()
              }
            }}
          >
            <button
              ref={solutionsBtnRef}
              type="button"
              aria-haspopup="true"
              aria-expanded={solutionsOpen}
              onClick={() => (solutionsOpen ? closeSolutionsNow() : openSolutions())}
              className={`flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors hover:text-charcoal ${
                solutionsOpen ? "text-charcoal" : "text-muted"
              }`}
            >
              Soluções
              <span className="text-[9px]" aria-hidden="true">▼</span>
            </button>

            {solutionsOpen && (
              /* pt-3 (padding, não margem) cria uma "ponte" contígua entre o
                 botão e o painel — sem vão morto, o dropdown não fecha ao mover. */
              <div className="absolute left-0 top-full z-50 pt-3">
                <div className="w-60 border border-line bg-ivory p-1 shadow-lg">
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
                        closeSolutionsNow()
                      }}
                    >
                      {l.label}
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SN IA — produto em destaque, acesso direto */}
          <NavLink
            to="/sn-ia"
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-dev-600 transition-opacity hover:opacity-70"
          >
            SN IA
          </NavLink>

          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={navLink}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/contacto" className="btn-primary !px-5 !py-2.5">
            Solicitar orçamento
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-lg p-2 text-muted hover:bg-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-line-soft bg-ivory px-4 py-4 lg:hidden">
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
              Produto em destaque
            </p>
            <NavLink
              to="/sn-ia"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-none px-3 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-dev-600 transition-colors hover:bg-white ${
                  isActive ? "bg-dev-50" : ""
                }`
              }
              onClick={() => setOpen(false)}
            >
              SN IA
            </NavLink>

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
