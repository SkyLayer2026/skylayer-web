import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-6xl font-extrabold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink">Página não encontrada</h1>
      <p className="mt-2 text-muted">A página que procura não existe ou foi movida.</p>
      <Link
        to="/"
        className="btn-primary mt-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao início
      </Link>
    </section>
  )
}
