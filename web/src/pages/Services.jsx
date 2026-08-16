import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { whatsappLink } from "../config.js"
import { products, complementary } from "../data/services.js"
import { SectionHeading } from "../components/ui.jsx"
import { ComplementaryCard } from "../components/cards.jsx"

function ServiceBlock({ product, index }) {
  const even = index % 2 === 0
  return (
    <section className={even ? "border-b border-line-soft bg-white" : "border-b border-line-soft bg-surface"}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <product.icon className="h-5 w-5" />
              </span>
              <p className="eyebrow">
                {product.code} · {product.stage}
              </p>
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {product.name}
            </h2>
            <p className="mt-2 text-lg font-semibold text-brand-600">{product.title}</p>
            <p className="mt-5 text-lg leading-relaxed text-muted">{product.tagline}</p>

            <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-muted">
              Para quem
            </p>
            <p className="mt-2 text-muted">{product.audience}</p>

            <p className="mt-8 text-2xl font-extrabold tracking-tight text-ink">{product.price}</p>
            <p className="mt-1.5 text-sm text-muted">{product.priceNote}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink(`Olá Skylayer! Gostaria de um orçamento para o ${product.name}.`)}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                Solicitar orçamento
              </a>
              <Link to="/diagnostico" className="btn-secondary">
                Diagnóstico gratuito
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-muted">
                O que resolve
              </p>
              <ul className="mt-4 space-y-3">
                {product.pain.map((p) => (
                  <li key={p} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <span className="text-sm leading-relaxed text-muted">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-muted">
                O que inclui
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {product.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 rounded-lg border border-line-soft bg-white p-3 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  usePageTitle("Serviços")

  return (
    <>
      <section className="bg-grid border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="eyebrow">Soluções</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Cinco soluções, um objetivo: o seu crescimento
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Cada solução responde a um problema concreto — com processo transparente, preço claro e
            suporte após a entrega.
          </p>
        </div>
      </section>

      {products.map((p, i) => (
        <ServiceBlock key={p.slug} product={p} index={i} />
      ))}

      <section className="bg-white">
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

      <section className="bg-brand-600">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-200">
            Como começo?
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Não sabe qual solução escolher?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
            Começamos com um diagnóstico gratuito e dizemos-lhe exatamente o que precisa — mesmo que
            não seja com a Skylayer.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-4 text-sm font-semibold text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
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
          <p className="mt-6 text-sm text-brand-200">
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