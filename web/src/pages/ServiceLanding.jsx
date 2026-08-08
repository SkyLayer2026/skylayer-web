import { Link, useParams } from "react-router-dom"
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  XCircle,
} from "lucide-react"
import { whatsappLink } from "../config.js"
import { getService } from "../data/services.js"
import ContactForm from "../components/ContactForm.jsx"
import NotFound from "./NotFound.jsx"

export default function ServiceLanding() {
  const { slug } = useParams()
  const service = getService(slug)

  if (!service) return <NotFound />

  return (
    <>
      <section className="bg-slate-950">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(50rem 25rem at 85% -10%, rgba(56,189,248,0.22), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300">
            <service.icon className="h-5 w-5" />
            Skylayer · {service.shortName}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            {service.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{service.tagline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(
                `Olá Skylayer! Tenho interesse em ${service.name.toLowerCase()}.`
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              <MessageCircle className="h-5 w-5" />
              Falar sobre este serviço
            </a>
            <Link
              to="/diagnostico"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-sky-400/40 bg-sky-500/10 px-6 py-3.5 text-sm font-semibold text-sky-300 transition hover:bg-sky-500/20"
            >
              Começar com diagnóstico gratuito
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Problemas que resolvemos
            </h2>
            <ul className="mt-6 space-y-4">
              {service.pain.map((p) => (
                <li key={p} className="flex gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                  <span className="text-slate-700">{p}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl font-bold tracking-tight text-slate-900">
              O que está incluído
            </h2>
            <ul className="mt-6 space-y-3">
              {service.includes.map((i) => (
                <li key={i} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="text-slate-700">{i}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Investimento
              </p>
              <p className="mt-2 text-3xl font-extrabold text-slate-900">{service.price}</p>
              <p className="mt-2 text-sm text-slate-600">{service.priceNote}</p>
              <div className="mt-6 border-t border-slate-100 pt-6">
                <h3 className="font-bold text-slate-900">Como funciona</h3>
                <ol className="mt-4 space-y-4">
                  {service.steps.map(([title, text]) => (
                    <li key={title} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-500" />
                      <div>
                        <p className="font-semibold text-slate-900">{title}</p>
                        <p className="text-sm text-slate-600">{text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <a
                href={whatsappLink(`Olá Skylayer! Quero saber mais sobre ${service.name}.`)}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                <MessageCircle className="h-5 w-5" />
                Pedir proposta pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {service.faq.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
            Perguntas frequentes
          </h2>
          <div className="mt-8 space-y-4">
            {service.faq.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-slate-200 bg-white px-6 py-4 open:shadow-sm"
              >
                <summary className="cursor-pointer list-none font-semibold text-slate-900">
                  <span className="flex items-center justify-between gap-4">
                    {f.q}
                    <span className="text-sky-600 transition group-open:rotate-45">＋</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Fale connosco sobre {service.shortName.toLowerCase()}
            </h2>
            <p className="mt-3 text-slate-600">
              Preencha o formulário e a mensagem chega-nos pelo WhatsApp. Respondemos em menos de 2
              horas em horário útil — ou marque o seu diagnóstico gratuito.
            </p>
            <div className="mt-6 space-y-3">
              <Link
                to="/diagnostico"
                className="inline-flex items-center gap-2 font-semibold text-sky-600 hover:underline"
              >
                <ArrowRight className="h-4 w-4" />
                Pedir diagnóstico gratuito da minha presença digital
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <ContactForm service={service.name} />
          </div>
        </div>
      </section>
    </>
  )
}
