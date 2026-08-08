import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-6xl font-extrabold text-sky-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Página não encontrada</h1>
      <p className="mt-2 text-slate-600">
        A página que procura não existe ou foi movida.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao início
      </Link>
    </section>
  )
}
