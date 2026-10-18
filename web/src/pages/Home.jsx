import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle } from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { whatsappLink } from "../config.js"
import { process, pillars } from "../data/services.js"
import { Reveal, SectionHeading, TechLabel, ArrowLink } from "../components/ui.jsx"
import { EcosystemHero, ProductVisual, pillarIcons } from "../components/visuals.jsx"

/* ═══════════════════════════════════════════════════
   HOME — sistema narrativo (híbrido editorial + high-tech)
   Hero (dark) → Quem somos → Áreas → One System →
   Destaques → Processo → Contacto
   ═══════════════════════════════════════════════════ */

const AREAS = [
  {
    id: "dev",
    to: "/dev",
    label: "DEV",
    sub: "Desenvolvimento de software",
    desc: "Websites, sistemas empresariais, aplicações, integrações e software à medida.",
    code: "01",
    hex: "#7c3aed",
    soft: "#ede9fe",
    text: "text-dev-600",
  },
  {
    id: "iot",
    to: "/iot",
    label: "IoT",
    sub: "Internet das Coisas",
    desc: "Sensores, monitorização, telemetria, automação e dispositivos conectados.",
    code: "02",
    hex: "#f59e0b",
    soft: "#fffbeb",
    text: "text-iot-600",
  },
  {
    id: "infra",
    to: "/infrastructure",
    label: "Infrastructure",
    sub: "Infraestrutura e redes",
    desc: "Redes, servidores, segurança, backups e monitorização contínua.",
    code: "03",
    hex: "#dc2626",
    soft: "#fef2f2",
    text: "text-infra-600",
  },
]

/* Destaques: Sn IA primeiro, depois dois produtos prontos */
const FEATURED = [
  {
    to: "/sn-ia",
    front: "DEV",
    code: "001",
    name: "Sn IA",
    tagline: "Atendimento inteligente por WhatsApp",
    desc: "Um assistente que responde aos seus clientes, consulta a sua base de conhecimento e organiza os contactos — passando para uma pessoa quando é preciso.",
    tags: "WhatsApp · Base de conhecimento · CRM · Automação",
    visual: "sn-ia",
    hex: "#7c3aed",
    highlight: true,
  },
  {
    to: "/servicos/presence",
    front: "DEV",
    code: "002",
    name: "SL Presence",
    tagline: "Presença digital profissional",
    desc: "Website e páginas que apresentam a sua empresa com credibilidade e transformam visitantes em clientes.",
    tags: "Website · Landing Page · SEO · Contacto",
    visual: "presence",
    hex: "#7c3aed",
  },
  {
    to: "/servicos/business-systems",
    front: "DEV",
    code: "003",
    name: "SL Business Systems",
    tagline: "Sistemas para a operação",
    desc: "Centralize clientes, vendas, stock e processos internos num só sistema, com acesso seguro e painéis de controlo.",
    tags: "CRM · Vendas · Stock · Dashboards",
    visual: "business-systems",
    hex: "#7c3aed",
  },
]

function AreaCard({ a }) {
  return (
    <Reveal>
      <Link
        to={a.to}
        className="group relative block overflow-hidden rounded-xl border border-line bg-white p-6 shadow-[0_1px_0_rgba(26,26,31,.04)] transition-all hover:-translate-y-1 hover:shadow-lg"
      >
        <span className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${a.hex}, transparent)` }} />
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-70" style={{ background: a.soft }} />
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: a.soft }}>
            <span className="h-2.5 w-2.5 rounded-full metric-pulse" style={{ background: a.hex }} />
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-silver">{a.code}</span>
        </div>
        <p className={`mt-4 font-mono text-[10px] uppercase tracking-[0.3em] ${a.text}`}>{a.label}</p>
        <h3 className="mt-1 text-lg font-extrabold tracking-tight text-ink">{a.sub}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{a.desc}</p>
        <span className={`mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] ${a.text}`}>
          Explorar
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  )
}

function FeaturedCard({ p, highlight }) {
  return (
    <Reveal className="h-full">
      <Link
        to={p.to}
        className={`group flex h-full flex-col overflow-hidden rounded-xl border bg-white transition-all hover:-translate-y-1 hover:shadow-lg ${
          highlight ? "border-dev-200 shadow-[0_0_0_1px_rgba(124,58,237,.12)]" : "border-line"
        }`}
      >
        <ProductVisual slug={p.visual} className="rounded-none border-0 border-b border-line-soft" />
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-dev-600">
              SL / {p.front} / {p.code}
            </p>
            {highlight && (
              <span className="rounded-full bg-dev-50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-dev-600">
                Em destaque
              </span>
            )}
          </div>
          <h3 className="mt-3 text-xl font-extrabold tracking-tight text-ink">{p.name}</h3>
          <p className="mt-1 text-sm font-semibold text-dev-600">{p.tagline}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.desc}</p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{p.tags}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-dev-600">
            Ver solução
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

export default function Home() {
  usePageTitle("")

  return (
    <>
      {/* ═══ 01 · HERO (dark, high-tech) ═══ */}
      <section className="section-dark">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="glow glow-dev -left-32 -top-24 h-96 w-96 opacity-[0.18]" aria-hidden="true" />
        <div className="glow glow-infra -right-24 bottom-0 h-80 w-80 opacity-[0.15]" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-white/60">
              SKYLAYER / SYSTEMS
            </p>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl">
              Tecnologia para
              <br />
              <span className="text-grad">construir, conectar</span>
              <br />e evoluir.
            </h1>
            <p className="mt-7 max-w-md text-base leading-relaxed text-white/55 sm:text-lg">
              Desenvolvemos software, ligamos o mundo físico à internet e construímos a
              infraestrutura que mantém tudo a funcionar. Um só parceiro, do início ao fim.
            </p>
            <p className="mt-6 font-mono text-sm uppercase tracking-[0.3em] text-white/70">
              DEV · IoT · INFRASTRUCTURE
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/servicos"
                className="btn-glow inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white"
              >
                Explorar soluções
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:border-white/50"
              >
                <MessageCircle className="h-4 w-4" />
                Falar connosco
              </a>
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-white/55">
              Diagnóstico gratuito · Proposta sem compromisso
            </p>
          </Reveal>
          <Reveal delay={140}>
            <EcosystemHero theme="dark" className="lg:translate-x-4" />
          </Reveal>
        </div>
      </section>

      {/* ═══ 02 · QUEM SOMOS ═══ */}
      <section className="border-b border-line-soft bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <TechLabel color="text-silver">Quem somos</TechLabel>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
                Uma empresa de tecnologia feita para resolver problemas reais.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-4 text-base leading-relaxed text-muted">
                <p>
                  A Skylayer ajuda empresas e organizações em Moçambique a usar tecnologia de
                  forma estável, segura e acessível. Não vendemos apenas ferramentas — percebemos
                  o problema e construímos a solução adequada.
                </p>
                <p>
                  Trabalhamos em três frentes que se completam: criamos <strong className="font-semibold text-ink">software</strong>,
                  ligamos <strong className="font-semibold text-ink">dispositivos e sensores</strong> e
                  construímos a <strong className="font-semibold text-ink">infraestrutura</strong> que
                  sustenta tudo. Do diagnóstico ao acompanhamento, com linguagem simples.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="border-t-2 border-line pt-5">
                  <div className="text-charcoal">{pillarIcons[p.title]}</div>
                  <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.15em] text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 03 · O QUE FAZEMOS (áreas) ═══ */}
      <section className="border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="O que fazemos"
                title="Três frentes, um só sistema."
              />
              <div className="hidden md:block">
                <ArrowLink to="/catalogo">Ver todos os serviços</ArrowLink>
              </div>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {AREAS.map((a) => <AreaCard key={a.id} a={a} />)}
          </div>
        </div>
      </section>

      {/* ═══ 04 · ONE SYSTEM (dark band) ═══ */}
      <section className="section-dark border-b border-line-soft">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="glow glow-dev left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 opacity-[0.12]" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-white/60">
              ONE SYSTEM / THREE LAYERS
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Não entregamos peças soltas. Construímos sistemas completos.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60">
              Software, dispositivos e infraestrutura a trabalhar como um único sistema — de ponta a ponta.
            </p>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
            {AREAS.map((a, i) => (
              <Reveal key={a.id} delay={i * 90}>
                <div className="glass h-full rounded-2xl p-6 text-left">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: a.hex }}>
                    {a.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 05 · SOLUÇÕES EM DESTAQUE ═══ */}
      <section className="border-b border-line-soft bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Produtos em destaque"
                title="Soluções prontas para começar."
                text="Produtos desenvolvidos pela Skylayer, com página própria. O Sn IA é o mais recente — para atendimento por WhatsApp."
              />
              <div className="hidden md:block">
                <ArrowLink to="/servicos">Ver todos os produtos</ArrowLink>
              </div>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {FEATURED.map((p) => (
              <FeaturedCard key={p.name} p={p} highlight={p.highlight} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 06 · COMO TRABALHAMOS ═══ */}
      <section className="border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Como trabalhamos"
              title="Um processo claro, sem surpresas."
              text="Da primeira conversa ao acompanhamento, sabe sempre em que passo está."
            />
          </Reveal>
          <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {process.map(([title, text, gets], i) => (
              <Reveal key={title} delay={i * 70}>
                <div className="flex gap-4">
                  <span className="font-mono text-2xl font-light text-silver">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                    {gets && (
                      <p className="mt-3 border-l-2 border-dev-600/30 pl-3 text-xs leading-relaxed text-muted">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dev-600">
                          Recebe:{" "}
                        </span>
                        {gets}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 07 · CONTACTO / CTA (dark) ═══ */}
      <section className="section-dark">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="glow glow-dev -left-20 top-0 h-72 w-72 opacity-[0.16]" aria-hidden="true" />
        <div className="glow glow-infra -right-20 bottom-0 h-72 w-72 opacity-[0.14]" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-28">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-white/60">
              PRONTO PARA COMEÇAR?
            </p>
            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Tem um sistema para construir? Vamos falar.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55">
              Conte-nos o que pretende construir, melhorar ou automatizar. Começamos sempre com um
              diagnóstico gratuito e uma proposta sem compromisso.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-xs font-semibold uppercase tracking-widest text-charcoal transition-transform hover:-translate-y-0.5"
              >
                Pedir orçamento
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:border-white/60"
              >
                <MessageCircle className="h-4 w-4" />
                Falar connosco
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
