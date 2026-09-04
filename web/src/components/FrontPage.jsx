import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle } from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { whatsappLink } from "../config.js"
import { products, complementary } from "../data/services.js"
import { Reveal, FrontNumber } from "./ui.jsx"
import { FrontVisual, ProductVisual, pillarIcons } from "./visuals.jsx"
import { ComplementaryCard } from "./cards.jsx"

const FRONTS = {
  DEV: {
    label: "DEV",
    title: "BUILD.\nDIGITAL.\nSYSTEMS.",
    intro:
      "Software para operar, vender e crescer — websites, sistemas empresariais, aplicações, automação e integrações.",
    tag: "Software · Aplicações · Websites · APIs",
    accentText: "text-dev-600",
    accentDot: "bg-dev-500",
    accentBorder: "border-dev-500",
    accentLine: "bg-dev-500",
    short: "Desenvolvimento de software",
    slugs: ["presence", "business-systems", "automation", "custom-solutions"],
  },
  IoT: {
    label: "IoT",
    title: "CONNECT.\nTHE PHYSICAL.\nWORLD.",
    intro:
      "Tecnologia que observa e interage com o mundo físico — sensores, telemetria, monitorização, automação e dispositivos conectados.",
    tag: "Sensores · Telemetria · Monitorização · Energia",
    accentText: "text-iot-600",
    accentDot: "bg-iot-500",
    accentBorder: "border-iot-500",
    accentLine: "bg-iot-500",
    short: "Internet das Coisas",
    slugs: ["monitor", "custom-solutions"],
  },
  INFRA: {
    label: "INFRASTRUCTURE",
    title: "BUILD.\nTHE.\nFOUNDATION.",
    intro:
      "A infraestrutura por trás das operações digitais — redes, servidores, segurança, monitorização e virtualização.",
    tag: "Redes · Servidores · Segurança · Virtualização",
    accentText: "text-infra-600",
    accentDot: "bg-infra-500",
    accentBorder: "border-infra-500",
    accentLine: "bg-infra-500",
    short: "Infraestrutura e conectividade",
    slugs: ["network", "infrastructure", "custom-solutions"],
  },
}

export default function FrontPage({ front }) {
  const f = FRONTS[front]
  usePageTitle(f.label)

  const frontProducts = products.filter((p) => f.slugs.includes(p.slug))

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="border-b border-line-soft bg-ivory">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-silver">
              SKYLAYER / {f.label}
            </p>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.0] tracking-tight text-ink sm:text-6xl">
              {f.title.split("\n").map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted sm:text-lg">{f.intro}</p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{f.tag}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/contacto" className="btn-primary">
                Solicitar orçamento
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                Falar connosco
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <FrontVisual front={front} />
          </Reveal>
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <FrontNumber num="01" label="Soluções" color={f.accentText} />
                <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                  EXPERIMENTE AS SOLUÇÕES {f.label}.
                </h2>
              </div>
            </div>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              {frontProducts.length} soluções com processo transparente e acompanhamento simples.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {frontProducts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link
                  to={`/servicos/${p.slug}`}
                  className="group block border border-line bg-white transition-all hover:-translate-y-1 hover:border-silver hover:shadow-sm"
                >
                  <ProductVisual slug={p.slug} className="border-0 border-b border-line-soft" />
                  <div className="p-7">
                    <p className={`font-mono text-[10px] uppercase tracking-[0.3em] ${f.accentText}`}>
                      SL / {f.label} / {p.code}
                    </p>
                    <h3 className="mt-3 text-xl font-extrabold tracking-tight text-ink">{p.name}</h3>
                    <p className="mt-1 font-semibold text-ink">{p.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{p.home.phrase}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.chips.map((c) => (
                        <span key={c} className="border border-line-soft bg-ivory px-2.5 py-1 text-xs text-muted">
                          {c}
                        </span>
                      ))}
                    </div>
                    <span className={`mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] ${f.accentText}`}>
                      Explore
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PILLAR ICONS / VALUES ═══ */}
      <section className="border-t border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-silver">
              SKYLAYER VALUES
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Uma tecnologia que funciona para si.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(pillarIcons).map(([name, icon], i) => (
              <Reveal key={name} delay={i * 60}>
                <div className="border border-line-soft bg-ivory/60 p-6">
                  <div className="text-charcoal">{icon}</div>
                  <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.15em] text-ink">{name}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPLEMENTARY ═══ */}
      <section className="border-t border-line-soft bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-silver">
                  APOIO / COMPLEMENTAR
                </p>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                  Apoio em todas as frentes digitais.
                </h2>
              </div>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {complementary.map((c, i) => (
              <Reveal key={c.name} delay={i * 60}>
                <ComplementaryCard item={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-charcoal">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-silver">
              READY TO BUILD?
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-extrabold tracking-tight text-ivory sm:text-5xl">
              Construa, conecte ou evolua com a Skylayer.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ivory/70">
              Começamos com um diagnóstico gratuito e dizemos-lhe exatamente o que é necessário —
              mesmo que não seja com a Skylayer.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 border border-ivory bg-ivory px-8 py-4 text-xs font-semibold uppercase tracking-widest text-charcoal transition-colors hover:bg-transparent hover:text-ivory"
              >
                Solicitar orçamento
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-ivory/40 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ivory transition-colors hover:border-ivory"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                Falar connosco
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}