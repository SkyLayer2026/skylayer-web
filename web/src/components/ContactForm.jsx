import { useState } from "react"
import { Send } from "lucide-react"
import { whatsappLink, site } from "../config.js"
import { products, complementary } from "../data/services.js"

const serviceOptions = [
  ...products.map((p) => p.name),
  ...complementary.map((c) => c.name),
  "Diagnóstico gratuito",
  "Outro",
]

export default function ContactForm({ service }) {
  const [form, setForm] = useState({
    nome: "",
    empresa: "",
    contacto: "",
    servico: service ?? "",
    mensagem: "",
  })

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const text = [
      "Olá Skylayer! Gostaria de solicitar um orçamento.",
      `Nome: ${form.nome}`,
      `Empresa: ${form.empresa || "-"}`,
      `Contacto: ${form.contacto}`,
      form.servico && `Serviço de interesse: ${form.servico}`,
      form.mensagem && `Descrição da necessidade: ${form.mensagem}`,
    ]
      .filter(Boolean)
      .join("\n")
    window.open(whatsappLink(text), "_blank", "noopener")
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
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
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink">Contacto *</span>
        <input
          required
          name="contacto"
          value={form.contacto}
          onChange={update}
          placeholder="WhatsApp ou e-mail"
          className="w-full rounded-lg border border-line px-3 py-2.5 text-sm placeholder:text-muted focus:border-dev-400 focus:outline-none focus:ring-2 focus:ring-dev-600/15"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink">Serviço de interesse</span>
        <select
          name="servico"
          value={form.servico}
          onChange={update}
          className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm focus:border-dev-400 focus:outline-none focus:ring-2 focus:ring-dev-600/15"
        >
          <option value="">Escolha o serviço</option>
          {serviceOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink">Descrição da necessidade</span>
        <textarea
          name="mensagem"
          value={form.mensagem}
          onChange={update}
          rows={4}
          placeholder="Conte-nos o que precisa e o que gostaria de alcançar..."
          className="w-full rounded-lg border border-line px-3 py-2.5 text-sm placeholder:text-muted focus:border-dev-400 focus:outline-none focus:ring-2 focus:ring-dev-600/15"
        />
      </label>

      <button type="submit" className="btn-primary w-full">
        <Send className="h-4 w-4" />
        Enviar mensagem
      </button>
      <p className="text-center text-xs text-muted">
        Ao enviar, o WhatsApp abre com a sua mensagem pronta. Respondemos em menos de 2 horas em
        horário útil. Ou escreva para{" "}
        <a href={`mailto:${site.email}`} className="font-medium text-dev-600 hover:underline">
          {site.email}
        </a>
        .
      </p>
    </form>
  )
}
