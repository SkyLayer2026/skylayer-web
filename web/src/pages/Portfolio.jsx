import { Link } from "react-router-dom"
import { ArrowRight, ImageOff, SearchCheck } from "lucide-react"
import { whatsappLink } from "../config.js"

const placeholders = [
  "Site institucional",
  "Sistema de gestão de clientes",
  "Identidade visual",
  "Loja online",
  "Dashboard empresarial",
  "Site de serviço",
]

export default function Portfolio() {
  return (
    <>
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Portfólio</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Projetos entregues pela Skylayer. Este espaço está a ser preenchido à medida que os
            primeiros projetos são concluídos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {placeholders.map((p) => (
            <div
              key={p}
              className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <ImageOff className="h-6 w-6" />
              </div>
              <p className="font-semibold text-slate-500">{p}</p>
              <p className="text-xs uppercase tracking-wider text-slate-400">Em breve</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-gradient-to-br from-sky-600 to-blue-800 px-6 py-12 text-center sm:px-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
            <SearchCheck className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
            Enquanto o portfólio cresce, conheça o nosso trabalho de outra forma
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sky-100">
            Peça um diagnóstico gratuito e receba um relatório com recomendações práticas — assim
            avalia o nosso cuidado e rigor antes de qualquer investimento.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/diagnostico"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
            >
              Pedir diagnóstico gratuito
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink("Olá Skylayer! Gostaria de ver exemplos do vosso trabalho.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Pedir exemplos no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
