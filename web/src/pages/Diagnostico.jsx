import { useState } from "react"
import { SearchCheck, ArrowRight, FileText, Lightbulb, Send } from "lucide-react"
import { whatsappLink } from "../config.js"
import { diagnostico } from "../data/services.js"

export default function Diagnostico() {
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
            <SearchCheck className="h-5 w-5" />
            Gratuito · Sem compromisso
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Descubra gratuitamente como a sua empresa pode melhorar a{" "}
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              presença digital
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Receba um relatório simples e prático com o que está a funcionar, o que está a afastar
            clientes e as primeiras ações recomendadas.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              O que recebe no relatório
            </h2>
            <ul className="mt-6 space-y-4">
              {diagnostico.includes.map((i) => (
                <li key={i} className="flex gap-3">
                  <SearchCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="text-slate-700">{i}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl font-bold tracking-tight text-slate-900">
              Como funciona
            </h2>
            <ol className="mt-6 space-y-4">
              {diagnostico.steps.map((s) => (
                <li key={s} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-600 text-xs font-bold text-white">
                    {s.charAt(0)}
                  </span>
                  <span className="text-slate-700">{s}</span>
                </li>
              ))}
            </ol>

            <div className="mt-10 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-sky-600" />
                <p className="font-semibold text-slate-900">
                  Preço: <span className="text-emerald-600">Gratuito</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-sky-600" />
                <p className="text-sm text-slate-600">
                  O relatório é seu — pode usá-lo mesmo que não continue connosco.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <ArrowRight className="h-5 w-5 text-sky-600" />
                <p className="text-sm text-slate-600">
                  Se o diagnóstico for útil, a conversa sobre um projeto acontece naturalmente —
                  sem pressão.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Pedir o meu diagnóstico</h2>
            <p className="mt-2 text-sm text-slate-600">
              Preencha e a mensagem chega-nos pelo WhatsApp. O relatório é enviado em 3 a 5 dias
              úteis.
            </p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">Nome *</span>
                <input
                  required
                  name="nome"
                  value={form.nome}
                  onChange={update}
                  placeholder="O seu nome"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">Empresa</span>
                <input
                  name="empresa"
                  value={form.empresa}
                  onChange={update}
                  placeholder="Nome da empresa"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">
                  WhatsApp ou e-mail *
                </span>
                <input
                  required
                  name="contacto"
                  value={form.contacto}
                  onChange={update}
                  placeholder="+258 ..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">
                  Site ou redes sociais atuais
                </span>
                <input
                  name="site"
                  value={form.site}
                  onChange={update}
                  placeholder="https://... ou links das redes"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">
                  O que gostaria de alcançar?
                </span>
                <textarea
                  name="objetivo"
                  value={form.objetivo}
                  onChange={update}
                  rows={3}
                  placeholder="Ex: atrair mais clientes, vender online, organizar a gestão..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </label>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                <Send className="h-4 w-4" />
                Pedir diagnóstico gratuito
              </button>
              <p className="text-center text-xs text-slate-500">
                Ao enviar, o WhatsApp abre com o pedido pronto. Sem spam, sem compromisso.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
