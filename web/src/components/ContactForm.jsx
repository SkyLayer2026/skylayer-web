import { useState } from "react"
import { Send } from "lucide-react"
import { whatsappLink, site } from "../config.js"

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
      "Olá Skylayer! Quero falar sobre os vossos serviços.",
      `Nome: ${form.nome}`,
      `Empresa: ${form.empresa || "-"}`,
      `Contacto: ${form.contacto}`,
      form.servico && `Serviço: ${form.servico}`,
      form.mensagem && `Mensagem: ${form.mensagem}`,
    ]
      .filter(Boolean)
      .join("\n")
    window.open(whatsappLink(text), "_blank", "noopener")
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
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
      </div>

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
        <span className="mb-1 block text-sm font-medium text-slate-700">Serviço</span>
        <select
          name="servico"
          value={form.servico}
          onChange={update}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
        >
          <option value="">Escolha o serviço</option>
          <option>Criação de sites profissionais</option>
          <option>Sistemas de gestão interna</option>
          <option>Identidade visual</option>
          <option>Manutenção e suporte</option>
          <option>Consultoria em transformação digital</option>
          <option>Diagnóstico gratuito</option>
          <option>Outro</option>
        </select>
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">Mensagem</span>
        <textarea
          name="mensagem"
          value={form.mensagem}
          onChange={update}
          rows={4}
          placeholder="Conte-nos um pouco sobre o que precisa..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
        />
      </label>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
      >
        <Send className="h-4 w-4" />
        Enviar mensagem (abre o WhatsApp)
      </button>
      <p className="text-center text-xs text-slate-500">
        Ao enviar, o WhatsApp abre com a sua mensagem pronta. Respondemos em menos de 2 horas em
        horário útil. Ou escreva para{" "}
        <a href={`mailto:${site.email}`} className="font-medium text-sky-600 hover:underline">
          {site.email}
        </a>
        .
      </p>
    </form>
  )
}
