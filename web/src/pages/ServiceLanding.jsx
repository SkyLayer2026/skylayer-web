import { Link, useParams } from "react-router-dom"
import { ArrowRight, CheckCircle2, MessageCircle, XCircle, SearchCheck } from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { whatsappLink } from "../config.js"
import { getProduct } from "../data/services.js"
import ContactForm from "../components/ContactForm.jsx"
import Faq from "../components/Faq.jsx"
import NotFound from "./NotFound.jsx"

export default function ServiceLanding() {
  const { slug } = useParams()
  const product = getProduct(slug)

  if (!product) return <NotFound />

  usePageTitle(product.name)

  return (
    <>
      <section className="border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="eyebrow">{product.name}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            {product.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{product.tagline}</p>
          <p className="mt-4 max-w-2xl text-[15px] text-muted">{product.audience}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(`Olá Skylayer! Tenho interesse na solução ${product.name}.`)}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              Falar sobre esta solução
            </a>
            <Link to="/diagnostico" className="btn-secondary">
              <SearchCheck className="h-4 w-4 text-dev-600" />
              Começar com diagnóstico gratuito
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">O que resolvemos</h2>
            <ul className="mt-6 space-y-4">
              {product.pain.map((p) => (
                <li key={p} className="flex gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-dev-300" />
                  <span className="text-[15px] leading-relaxed text-muted">{p}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl font-bold tracking-tight text-ink">O que está incluído</h2>
            <ul className="mt-6 space-y-3">
              {product.includes.map((i) => (
                <li key={i} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="text-[15px] leading-relaxed text-muted">{i}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="card sticky top-24 p-7">
              <div>
                <h3 className="font-bold text-ink">Como funciona</h3>
                <ol className="mt-5 space-y-5">
                  {product.steps.map(([title, text]) => (
                    <li key={title} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-dev-600" />
                      <div>
                        <p className="font-semibold text-ink">{title}</p>
                        <p className="mt-0.5 text-sm text-muted">{text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <a
                href={whatsappLink(`Olá Skylayer! Quero saber mais sobre ${product.name}.`)}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-8 w-full"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                Pedir proposta pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {product.faq.length > 0 && (
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
            <h2 className="text-center text-3xl font-bold tracking-tight text-ink">
              Perguntas frequentes
            </h2>
            <div className="mt-10">
              <Faq items={product.faq} />
            </div>
          </div>
        </section>
      )}

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-ink">
              Fale connosco sobre {product.title.toLowerCase()}
            </h2>
            <p className="mt-4 text-muted">
              Preencha o formulário e a mensagem chega-nos pelo WhatsApp. Respondemos em menos de 2
              horas em horário útil.
            </p>
            <div className="mt-6">
              <Link
                to="/diagnostico"
                className="inline-flex items-center gap-2 font-semibold text-dev-600 hover:underline"
              >
                <SearchCheck className="h-4 w-4" />
                Ou comece pelo diagnóstico gratuito
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="card p-7">
            <ContactForm service={product.name} />
          </div>
        </div>
      </section>
    </>
  )
}
