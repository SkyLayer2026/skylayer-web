import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle } from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { whatsappLink } from "../config.js"
import { posts } from "../data/posts.js"
import { Reveal, SignalDivider, FrontNumber, ArrowLink } from "../components/ui.jsx"
import { BlogCard } from "../components/cards.jsx"
import { HeroVisual, FrontVisual, ProductVisual } from "../components/visuals.jsx"

/* ═══════════════════════════════════════════════════
   HOME — editorial system narrative
   ═══════════════════════════════════════════════════ */

const processSteps = [
  { num: "01", title: "UNDERSTAND" },
  { num: "02", title: "DESIGN" },
  { num: "03", title: "BUILD" },
  { num: "04", title: "DEPLOY" },
  { num: "05", title: "EVOLVE" },
]

const pillars = [
  { word: "STABLE", text: "Soluções pensadas para funcionar e evoluir." },
  { word: "SECURE", text: "Segurança considerada desde a implementação." },
  { word: "ACCESSIBLE", text: "Tecnologia adequada à realidade de cada cliente." },
  { word: "INCLUSIVE", text: "Soluções para diferentes pessoas e organizações." },
]

const featuredProducts = [
  {
    front: "DEV",
    code: "001",
    name: "PRESENCE",
    slug: "presence",
    desc: "A presença digital essencial para uma empresa.",
    tags: "Website · Landing Page · WhatsApp · SEO",
    visual: "presence",
  },
  {
    front: "IoT",
    code: "001",
    name: "MONITOR",
    slug: "monitor",
    desc: "Transforme sensores em informação útil.",
    tags: "Sensores · Telemetria · Dashboard · Alertas",
    visual: "monitor",
  },
  {
    front: "INFRA",
    code: "001",
    name: "NETWORK",
    slug: "network",
    desc: "Uma infraestrutura de rede organizada e confiável.",
    tags: "LAN · Wi-Fi · VLAN · Configuração · Diagnóstico",
    visual: "network",
  },
]

/* Editorial chapter block for the three fronts */
function FrontChapter({ num, label, title, lead, tags, visual, to, accent }) {
  return (
    <section className="border-b border-line-soft">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <FrontNumber num={num} label={label} color={accent} />
          <h2 className="mt-8 text-4xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl">
            {title.split("\n").map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">{lead}</p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{tags}</p>
          <div className="mt-10">
            <ArrowLink to={to}>Explorar {label}</ArrowLink>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <FrontVisual front={visual} />
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  usePageTitle("")

  return (
    <>
      {/* ═══ 01 · HERO ═══ */}
      <section className="border-b border-line-soft bg-ivory">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-silver">
              SKYLAYER / SYSTEMS
            </p>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.0] tracking-tight text-ink sm:text-6xl">
              TECHNOLOGY TO
              <br />
              BUILD, CONNECT
              <br />
              &amp; EVOLVE.
            </h1>
            <p className="mt-8 font-mono text-sm uppercase tracking-[0.3em] text-dev-600">
              DEV · IoT · INFRASTRUCTURE
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              Criamos sistemas digitais, conectamos o mundo físico e construímos a infraestrutura
              que mantém tudo funcionando.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/dev" className="btn-primary">
                Explorar soluções
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
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-silver">
              Diagnóstico gratuito · Proposta sem compromisso
            </p>
          </Reveal>
          <Reveal delay={120}>
            <HeroVisual className="lg:translate-x-4" />
          </Reveal>
        </div>
      </section>

      {/* ═══ 02 · THE THREE FRONTS ═══ */}
      <FrontChapter
        num="01"
        label="DEV"
        title={"BUILD.\nDIGITAL.\nSYSTEMS."}
        lead="Software para operar, vender e crescer. Websites, sistemas empresariais, aplicações, integrações e software personalizado."
        tags="Websites · Sistemas · Aplicações · APIs · Integrações"
        visual="DEV"
        to="/dev"
        accent="text-dev-600"
      />

      <FrontChapter
        num="02"
        label="IoT"
        title={"CONNECT.\nTHE PHYSICAL.\nWORLD."}
        lead="Tecnologia que observa e interage com o mundo físico — sensores, telemetria, automação, monitorização e dispositivos conectados."
        tags="Sensores · Monitorização · Automação · Telemetria · Energia"
        visual="IoT"
        to="/iot"
        accent="text-iot-600"
      />

      <FrontChapter
        num="03"
        label="INFRASTRUCTURE"
        title={"BUILD.\nTHE.\nFOUNDATION."}
        lead="A infraestrutura por trás das operações digitais — redes, servidores, segurança, monitorização e virtualização."
        tags="Redes · Servidores · Segurança · Monitorização · Virtualização"
        visual="INFRA"
        to="/infrastructure"
        accent="text-infra-600"
      />

      <SignalDivider color="bg-dev-500" />

      {/* ═══ 03 · ONE SYSTEM. THREE LAYERS. ═══ */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-silver">
              INTEGRATED / DIFFERENTIAL
            </p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              ONE SYSTEM.
              <br />
              THREE LAYERS.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Não trabalhamos apenas com software. Não trabalhamos apenas com hardware. Não
              trabalhamos apenas com redes. Construímos sistemas completos — de ponta a ponta.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-16 grid gap-0 lg:grid-cols-3">
              {/* DEV */}
              <div className="border border-line-soft bg-white p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-dev-600">LAYER 01</p>
                <h3 className="mt-3 text-2xl font-extrabold text-ink">DEV</h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Apps · APIs · Websites · Systems
                </p>
              </div>
              {/* Connector */}
              <div className="hidden items-center justify-center lg:flex" aria-hidden="true">
                <span className="text-2xl text-silver">▼</span>
              </div>
              {/* IoT */}
              <div className="border border-line-soft bg-white p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-iot-600">LAYER 02</p>
                <h3 className="mt-3 text-2xl font-extrabold text-ink">IoT</h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Sensors · Devices · Telemetry
                </p>
              </div>
              {/* Connector */}
              <div className="hidden items-center justify-center lg:flex" aria-hidden="true">
                <span className="text-2xl text-silver">▼</span>
              </div>
              {/* Infrastructure */}
              <div className="border border-line-soft bg-white p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-infra-600">LAYER 03</p>
                <h3 className="mt-3 text-2xl font-extrabold text-ink">Infrastructure</h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Network · Servers · Security
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.3em] text-silver">
              DEV ↔ IoT ↔ INFRASTRUCTURE — ONE SOLUTION
            </p>
          </Reveal>
        </div>
      </section>

      <SignalDivider color="bg-iot-500" />

      {/* ═══ 04 · SOLUTIONS ═══ */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-silver">
                  SOLUTIONS / CATALOG
                </p>
                <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                  SOLUÇÕES CONCRETAS.
                </h2>
              </div>
              <div className="hidden md:block">
                <ArrowLink to="/dev">Ver todas as soluções</ArrowLink>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {featuredProducts.map((p, i) => {
              const accent =
                p.front === "DEV" ? "text-dev-600" : p.front === "IoT" ? "text-iot-600" : "text-infra-600"
              return (
                <Reveal key={p.name} delay={i * 90}>
                  <Link
                    to={`/servicos/${p.slug}`}
                    className="group block border border-line bg-white transition-all hover:-translate-y-1 hover:border-silver hover:shadow-sm"
                  >
                    <ProductVisual slug={p.visual} className="border-0 border-b border-line-soft" />
                    <div className="p-6">
                      <p className={`font-mono text-[10px] uppercase tracking-[0.3em] ${accent}`}>
                        SL / {p.front} / {p.code}
                      </p>
                      <h3 className="mt-3 text-xl font-extrabold tracking-tight text-ink">{p.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                        {p.tags}
                      </p>
                      <span className={`mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] ${accent}`}>
                        Explore
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>

          {/* mobile link */}
          <Reveal delay={300}>
            <div className="mt-10 md:hidden">
              <ArrowLink to="/dev">Ver todas as soluções</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      <SignalDivider color="bg-infra-500" />

      {/* ═══ 05 · PHILOSOPHY ═══ */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-silver">
              PHILOSOPHY
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              TECHNOLOGY SHOULD BE ACCESSIBLE.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Tecnologia não deve ser um privilégio. Construímos soluções estáveis, seguras e
              acessíveis, pensadas para funcionar no mundo real.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.word} delay={i * 80}>
                <div className="border-t-2 border-line pt-5">
                  <p className="text-sm font-extrabold tracking-[0.2em] text-ink">{p.word}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SignalDivider color="bg-silver" />

      {/* ═══ 06 · PROCESS ═══ */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-silver">
                  PROCESS / ENGINEERING
                </p>
                <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                  COMO TRABALHAMOS.
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-16 grid gap-0 sm:grid-cols-5">
              {processSteps.map((s, i) => (
                <div key={s.num} className="relative">
                  <span className="font-mono text-lg font-light text-silver">{s.num}</span>
                  <p className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-charcoal">
                    {s.title}
                  </p>
                  {i < processSteps.length - 1 && (
                    <span
                      className="absolute right-0 top-1/2 hidden h-px w-full bg-line-soft sm:block"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-muted">
              Processo claro e transparente: da identificação da necessidade à implementação e
              evolução contínua da solução.
            </p>
          </Reveal>
        </div>
      </section>

      <SignalDivider color="bg-dev-500" />

      {/* ═══ 07 · FROM THE LAB (BLOG) ═══ */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-silver">
                  FROM THE LAB
                </p>
                <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                  TECNOLOGIA, ENGENHARIA E SISTEMAS.
                </h2>
              </div>
              <ArrowLink to="/blog">Explorar o laboratório</ArrowLink>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 80}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SignalDivider color="bg-silver" />

      {/* ═══ 08 · CTA ═══ */}
      <section className="bg-charcoal bg-layers">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-silver">
              READY TO BUILD?
            </p>
            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-ivory sm:text-6xl">
              HAVE A SYSTEM TO BUILD? LET'S TALK.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ivory/70 sm:text-lg">
              Fale connosco sobre o que pretende construir, melhorar ou automatizar. Começamos com
              um diagnóstico gratuito.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
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