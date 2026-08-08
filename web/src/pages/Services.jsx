import { Link } from "react-router-dom"
import { ArrowRight, SearchCheck } from "lucide-react"
import { services, diagnostico } from "../data/services.js"

export default function Services() {
  return (
    <>
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Serviços</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Cada serviço tem um preço claro, um prazo definido e um processo transparente — do
            primeiro contacto à entrega.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.slug}
              to={`/servicos/${s.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition group-hover:bg-sky-600 group-hover:text-white">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {s.price}
                </span>
              </div>
              <h2 className="mt-5 text-xl font-bold text-slate-900">{s.name}</h2>
              <p className="mt-2 text-slate-600">{s.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-600">
                Ver detalhes e preço <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <Link
          to="/diagnostico"
          className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-sky-400 bg-gradient-to-br from-sky-50 to-blue-50 p-7 transition hover:shadow-lg hover:shadow-sky-100 sm:flex-row sm:items-center"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white">
              <SearchCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{diagnostico.name}</h2>
              <p className="mt-1 text-slate-600">{diagnostico.tagline}</p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
            Pedir agora <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </section>
    </>
  )
}
