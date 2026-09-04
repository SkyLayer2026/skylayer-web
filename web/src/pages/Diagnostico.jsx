import { useState } from "react"
import { SearchCheck, ArrowRight, FileText, Lightbulb, Send } from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { whatsappLink } from "../config.js"

const benefits = [
  "Análise do seu site, redes sociais e presença no Google",
  "O que está a funcionar bem e o que está a afastar clientes",
  "3 primeiras ações recomendadas, ordenadas por impacto",
  "Sugestões realistas ajustadas ao seu orçamento",
  "Sem compromisso — o relatório é seu, mesmo que não continue connosco",
]

const steps = [
  "Preencha o formulário com os seus contactos e site/redes atuais",
  "Analisamos a sua presença digital (3–5 dias úteis)",
  "Recebe o relatório por WhatsApp ou e-mail",
  "Só continua se quiser — a decisão é sua",
]

export default function Diagnostico() {
  usePageTitle("Diagnóstico gratuito")

  const [form, setForm] = useState({
    nome: "",
    empresa: "",
    contacto: "",
    site: "",
    objetivo: "",
  })

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const text = [
      "Olá Skylayer! Quero pedir o diagnóstico gratuito da minha presença digital.",
      `Nome: ${form.nome}`,
      `Empresa: ${form.empresa || "-"}`,
      `Contacto: ${form.contacto}`,
      form.site && `Site/redes atuais: ${form.site}`,
      form.objetivo && `Objetivo: ${form.objetivo}`,
    ]
      .filter(Boolean)
      .join("\n")
    window.open(whatsappLink(text), "_blank", "noopener")
  }

  return (
    <>
      <section className="border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="eyebrow">Gratuito · Sem compromisso</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            Descubra gratuitamente como a sua empresa pode melhorar a presença digital
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Receba um relatório simples e prático com o que está a funcionar, o que está a afastar
            clientes e as primeiras ações recomendadas.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">O que recebe no relatório</h2>
            <ul className="mt-6 space-y-4">
              {benefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <SearchCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="text-[15px] leading-relaxed text-muted">{b}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl font-bold tracking-tight text-ink">Como funciona</h2>
            <ol className="mt-6 space-y-5">
              {steps.map((s) => (
                <li key={s} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dev-600 text-xs font-bold text-white">
                    {s.charAt(0)}
                  </span>
                  <span className="text-[15px] leading-relaxed text-muted">{s}</span>
                </li>
              ))}
            </ol>

            <div className="mt-10 space-y-4 rounded-xl border border-line bg-surface p-6">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-dev-600" />
                <p className="font-semibold text-ink">
                  Preço: <span className="text-emerald-600">Gratuito</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-dev-600" />
                <p className="text-sm text-muted">
                  O relatório é seu — pode usá-lo mesmo que não continue connosco.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <ArrowRight className="h-5 w-5 text-dev-600" />
                <p className="text-sm text-muted">
                  Se o diagnóstico for útil, a conversa sobre um projeto acontece naturalmente —
                  sem pressão.
                </p>
              </div>
            </div>
          </div>

          <div className="card h-fit p-7">
            <h2 className="text-xl font-bold text-ink">Pedir o meu diagnóstico</h2>
            <p className="mt-2 text-sm text-muted">
              Preencha e a mensagem chega-nos pelo WhatsApp. O relatório é enviado em 3 a 5 dias
              úteis.
            </p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Nome *</span>
                <input
                  required
                  name="nome"
                  value={form.nome}
                  onChange={update}
                  placeholder="O seu nome"
                  className="w-full rounded-lg border border-line px-3 py-2.5 text-sm placeholder:text-muted focus:border-dev-400 focus:outline-none focus:ring-2 focus:ring-dev-600/15"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Empresa</span>
                <input
                  name="empresa"
                  value={form.empresa}
                  onChange={update}
                  placeholder="Nome da empresa"
                  className="w-full rounded-lg border border-line px-3 py-2.5 text-sm placeholder:text-muted focus:border-dev-400 focus:outline-none focus:ring-2 focus:ring-dev-600/15"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">
                  WhatsApp ou e-mail *
                </span>
                <input
                  required
                  name="contacto"
                  value={form.contacto}
                  onChange={update}
                  placeholder="+258 ..."
                  className="w-full rounded-lg border border-line px-3 py-2.5 text-sm placeholder:text-muted focus:border-dev-400 focus:outline-none focus:ring-2 focus:ring-dev-600/15"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">
                  Site ou redes sociais atuais
                </span>
                <input
                  name="site"
                  value={form.site}
                  onChange={update}
                  placeholder="https://... ou links das redes"
                  className="w-full rounded-lg border border-line px-3 py-2.5 text-sm placeholder:text-muted focus:border-dev-400 focus:outline-none focus:ring-2 focus:ring-dev-600/15"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">
                  O que gostaria de alcançar?
                </span>
                <textarea
                  name="objetivo"
                  value={form.objetivo}
                  onChange={update}
                  rows={3}
                  placeholder="Ex: atrair mais clientes, vender online, organizar a gestão..."
                  className="w-full rounded-lg border border-line px-3 py-2.5 text-sm placeholder:text-muted focus:border-dev-400 focus:outline-none focus:ring-2 focus:ring-dev-600/15"
                />
              </label>
              <button
                type="submit"
                className="btn-primary w-full"
              >
                <Send className="h-4 w-4" />
                Pedir diagnóstico gratuito
              </button>
              <p className="text-center text-xs text-muted">
                Ao enviar, o WhatsApp abre com o pedido pronto. Sem spam, sem compromisso.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
