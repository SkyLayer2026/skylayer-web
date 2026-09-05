import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { whatsappLink } from "../config.js"
import { getProduct, complementary } from "../data/services.js"
import { SectionHeading } from "../components/ui.jsx"
import { ProductCard, ComplementaryCard } from "../components/cards.jsx"

const NAV_CHIPS = [
  { href: "#desenvolvimento", label: "Desenvolvimento" },
  { href: "#internet-das-coisas", label: "Internet das Coisas" },
  { href: "#infraestrutura", label: "Infraestrutura" },
  { href: "#complementares", label: "Complementares" },
]

function AreaHeader({ code, color, title, text }) {
  return (
    <div className="max-w-3xl">
      <p className={`font-mono text-[11px] font-medium uppercase tracking-[0.25em] ${color}`}>
        {code}
      </p>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-5 text-lg leading-relaxed text-muted">{text}</p>
    </div>
  )
}

export default function Services() {
  usePageTitle("Produtos")

  return (
    <>
      <section className="bg-grid border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="eyebrow">Soluções</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            O catálogo completo da Skylayer
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Cada solução responde a um problema concreto — com processo transparente e
            suporte após a entrega.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {NAV_CHIPS.map((chip) => (
              <a
                key={chip.href}
                href={chip.href}
                className="border border-line rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted transition-colors hover:border-silver hover:text-ink"
              >
                {chip.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="desenvolvimento" className="border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <AreaHeader
            code="ÁREA 01 · DEV"
            color="text-dev-600"
            title="Desenvolvimento de software"
            text="Software para operar, vender e crescer — websites, sistemas empresariais, aplicações, automação e integrações."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {["presence", "business-systems", "automation", "custom-solutions"].map((slug) => (
              <ProductCard key={slug} product={getProduct(slug)} />
            ))}
          </div>
        </div>
      </section>

      <section id="internet-das-coisas" className="border-b border-line-soft bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <AreaHeader
            code="ÁREA 02 · IOT"
            color="text-iot-600"
            title="Internet das Coisas"
            text="Tecnologia que observa e interage com o mundo físico — sensores, telemetria, monitorização e dispositivos conectados."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {["monitor", "custom-solutions"].map((slug) => (
              <ProductCard key={slug} product={getProduct(slug)} />
            ))}
          </div>
        </div>
      </section>

      <section id="infraestrutura" className="border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <AreaHeader
            code="ÁREA 03 · INFRA"
            color="text-infra-600"
            title="Infraestrutura e conectividade"
            text="A infraestrutura por trás das operações digitais — redes, servidores, segurança, monitorização e virtualização."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {["network", "infrastructure", "custom-solutions"].map((slug) => (
              <ProductCard key={slug} product={getProduct(slug)} />
            ))}
          </div>
        </div>
      </section>

      <section id="complementares" className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="Serviços complementares"
            title="Apoio em todas as frentes digitais"
            text="Trabalhos pontuais e apoio técnico para complementar as suas soluções."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {complementary.map((c) => (
              <ComplementaryCard key={c.name} item={c} />
            ))}
          </div>
        </div>
      </section>

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