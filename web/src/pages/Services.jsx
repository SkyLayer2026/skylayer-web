import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Search } from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { whatsappLink } from "../config.js"
import { LAYERS, APOIO, NECESSIDADES } from "../data/services.js"
import { SectionHeading } from "../components/ui.jsx"

const STICKY_NAV = [
  { num: "01", label: "DEV", href: "#dev" },
  { num: "02", label: "IoT", href: "#iot" },
  { num: "03", label: "INFRA", href: "#infrastructure" },
  { num: "04", label: "APOIO", href: "#apoio" },
]

const LAYER_META = {
  dev: { color: "text-dev-600", solid: "bg-dev-600" },
  iot: { color: "text-iot-600", solid: "bg-iot-600" },
  infrastructure: { color: "text-infra-600", solid: "bg-infra-600" },
}

const TIER_LABEL = {
  produto: "Produto · Projeto fixo",
  config: "Configuração · Mensal",
  custom: "À medida",
}

function ExpandRow({ layerId, service, index, open, onToggle, filter }) {
  const id = service.id
  const meta = LAYER_META[layerId]

  // Apply discovery filtering: hide rows that do not match the active need or search text.
  if (filter !== null) {
    const haystack = `${service.nome} ${service.desc} ${service.inclui.join(" ")}`.toLowerCase()
    if (filter.need && !filter.need.services.includes(service.id)) return null
    if (filter.text && !haystack.includes(filter.text)) return null
  }

  const isOpen = open === id

  return (
    <div id={id} className="border-t border-line-soft">
      <button
        type="button"
        onClick={() => onToggle(layerId, id)}
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
        className="group flex w-full items-baseline gap-4 py-5 text-left sm:gap-6"
      >
        <span className={`w-8 shrink-0 font-mono text-[11px] font-medium ${meta.color}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-base font-semibold text-ink transition-colors group-hover:text-charcoal sm:text-lg">
          {service.nome}
        </span>
        <span className="font-mono text-lg leading-none text-muted transition-colors group-hover:text-charcoal">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div id={`panel-${id}`} className="pb-7 pl-12 sm:pl-[4.5rem]">
          <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{service.desc}</p>

          <div className="mt-6">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
              Inclui
            </p>
            <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {service.inclui.map((item) => (
                <li key={item} className="flex items-baseline gap-2 text-sm text-muted">
                  <span className={`${meta.color}`} aria-hidden="true">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
                Ideal para
              </p>
              <p className="mt-2 text-sm text-ink">{service.idealPara}</p>
              <p className="mt-4">
                <span className="inline-flex items-center rounded-md border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
                  {TIER_LABEL[service.tier] || service.tier}
                </span>
              </p>
            </div>
            <div className="shrink-0">
              {service.productSlug ? (
                <Link
                  to={`/servicos/${service.productSlug}`}
                  className={`inline-flex items-center gap-2 rounded-lg ${meta.solid} px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90`}
                >
                  Ver serviço
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  to="/contacto"
                  className={`inline-flex items-center gap-2 rounded-lg ${meta.solid} px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90`}
                >
                  Solicitar orçamento
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function LayerSection({ layer, open, onToggle, filter }) {
  const meta = LAYER_META[layer.id]
  const name =
    layer.id === "dev" ? "DEV" : layer.id === "iot" ? "IoT" : "INFRAESTRUTURA"
  const count = layer.services.length
  const bg = layer.id === "iot" ? "bg-surface" : "bg-white"

  return (
    <section id={layer.id} className={`border-b border-line-soft ${bg}`}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-3xl">
          <p className={`font-mono text-[11px] font-medium uppercase tracking-[0.25em] ${meta.color}`}>
            {layer.numero} / {name}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {layer.sigla}
          </h2>
          <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted">
            {layer.kicker}
          </p>
          <p className="mt-5 text-lg leading-relaxed text-muted">{layer.intro}</p>
          <p className={`mt-4 font-mono text-xs uppercase tracking-widest ${meta.color}`}>
            {String(count).padStart(2, "0")} serviços
          </p>
        </div>

        <div className="mt-12">
          {layer.services.map((service, index) => (
            <ExpandRow
              key={service.id}
              layerId={layer.id}
              service={service}
              index={index}
              open={open[layer.id] ?? null}
              onToggle={onToggle}
              filter={filter}
            />
          ))}
          <div className="border-b border-line-soft" />
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  usePageTitle("Serviços")

  const [open, setOpen] = useState({})
  const [activeNeed, setActiveNeed] = useState(null)
  const [query, setQuery] = useState("")

  const filter = activeNeed || query.trim()
    ? { need: activeNeed, text: query.trim().toLowerCase() }
    : null

  // One open row per layer: open = { [layerId]: serviceId }
  const toggle = (layerId, id) =>
    setOpen((prev) => ({
      ...prev,
      [layerId]: prev[layerId] === id ? null : id,
    }))

  const countByLayer = (layerId) => {
    if (!filter) return null
    const layer = LAYERS.find((l) => l.id === layerId)
    const t = filter.text
    const n = filter.need
    const matches = layer.services.filter((s) => {
      if (n && !n.services.includes(s.id)) return false
      if (t) {
        const hay = `${s.nome} ${s.desc} ${s.inclui.join(" ")}`.toLowerCase()
        if (!hay.includes(t)) return false
      }
      return true
    }).length
    return matches
  }

  const filterActive = filter !== null
  const clearFilter = () => {
    setActiveNeed(null)
    setQuery("")
  }

  return (
    <>
      {/* 1. HERO */}
      <section className="border-b border-line-soft bg-white bg-grid">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="eyebrow">Serviços</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Tecnologia para construir, conectar e manter.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Software, dispositivos e infraestrutura para transformar necessidades reais em sistemas
            funcionais.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#dev"
              className="rounded-lg bg-dev-600 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
            >
              DEV
            </a>
            <a
              href="#iot"
              className="rounded-lg bg-iot-600 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
            >
              IoT
            </a>
            <a
              href="#infrastructure"
              className="rounded-lg bg-infra-600 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
            >
              Infrastructure
            </a>
          </div>
        </div>
      </section>

      {/* 2. DESCOBERTA */}
      <section className="border-b border-line-soft bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-charcoal">
            O que precisa?
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {NECESSIDADES.map((need) => {
              const isActive = activeNeed?.id === need.id
              return (
                <button
                  key={need.id}
                  type="button"
                  onClick={() =>
                    setActiveNeed((prev) => (prev?.id === need.id ? null : need))
                  }
                  className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-charcoal text-white"
                      : "border border-line bg-transparent text-muted hover:text-ink"
                  }`}
                >
                  {need.rotulo}
                </button>
              )
            })}
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Procurar um serviço…"
                className="w-full rounded-lg border border-line bg-white py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-muted focus:border-charcoal focus:outline-none"
              />
            </div>
            {filterActive && (
              <button
                type="button"
                onClick={clearFilter}
                className="text-sm font-semibold text-muted underline underline-offset-4 transition-colors hover:text-ink"
              >
                Limpar
              </button>
            )}
          </div>

          {filterActive && (
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
              {countByLayer("dev")} em DEV · {countByLayer("iot")} em IoT ·{" "}
              {countByLayer("infrastructure")} em Infraestrutura
            </p>
          )}
        </div>
      </section>

      {/* 3. STICKY NAV */}
      <nav
        className="sticky top-16 z-40 border-b border-line-soft bg-white/95 backdrop-blur"
        aria-label="Navegação por camadas"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-4 py-3 sm:px-6">
          {STICKY_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-muted transition-colors hover:text-dev-600"
            >
              {item.num} {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* 4-6. LAYERS */}
      {LAYERS.map((layer) => (
        <LayerSection
          key={layer.id}
          layer={layer}
          open={open}
          onToggle={toggle}
          filter={filter}
        />
      ))}

      {/* 7. SYSTEMS CROSS THE LAYERS */}
      <section className="border-b border-line-soft bg-charcoal text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            SYSTEMS CROSS THE LAYERS.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            Nem todos os problemas pertencem a uma única área. Software fala com dispositivos;
            dispositivos dependem da rede; a infraestrutura mantém tudo no ar. É por isso que a
            Skylayer tem três frentes.
          </p>

          <div className="mt-10 max-w-2xl">
            <div className="flex items-center gap-3 rounded-md border border-white/20 px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-widest">DEV</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                · Software
              </span>
            </div>
            <div className="flex justify-center py-1" aria-hidden="true">
              <span className="rounded bg-cyan-400 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-charcoal">
                API
              </span>
            </div>
            <div className="flex flex-col gap-2 pl-8">
              <span className="font-mono text-sm text-white/40" aria-hidden="true">↓</span>
            </div>
            <div className="flex items-center gap-3 rounded-md border border-white/20 px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-widest">IoT</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                · Devices
              </span>
            </div>
            <div className="flex justify-center py-1" aria-hidden="true">
              <span className="rounded bg-lime-400 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-charcoal">
                NETWORK
              </span>
            </div>
            <div className="flex flex-col gap-2 pl-8">
              <span className="font-mono text-sm text-white/40" aria-hidden="true">↓</span>
            </div>
            <div className="flex items-center gap-3 rounded-md border border-white/20 px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-widest">
                INFRASTRUCTURE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. APOIO */}
      <section id="apoio" className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="Serviços transversais"
            title="APOIO"
            text="Tecnologia não termina na implementação."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {APOIO.map((item) => (
              <div key={item.nome} className="rounded-lg border border-line bg-white p-5">
                <h3 className="font-semibold text-ink">{item.nome}</h3>
                <p className="mt-2 text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA FINAL */}
      <section className="bg-dev-600">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <p className="text-xs font-bold uppercase tracking-widest text-dev-200">
            Como começo?
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Não sabe qual solução escolher?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-dev-100">
            Começamos com um diagnóstico gratuito e dizemos-lhe exatamente o que precisa — mesmo que
            não seja com a Skylayer.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-4 text-sm font-semibold text-dev-700 shadow-sm transition-colors hover:bg-dev-50"
            >
              Solicitar orçamento
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/diagnostico"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Diagnóstico gratuito
            </Link>
          </div>
          <p className="mt-6 text-sm text-dev-200">
            Ou fale connosco diretamente no{" "}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-white underline underline-offset-4"
            >
              WhatsApp
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
