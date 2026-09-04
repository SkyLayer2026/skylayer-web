import { Link } from "react-router-dom"
import { ArrowRight, SearchCheck } from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { faq } from "../data/services.js"
import Faq from "../components/Faq.jsx"

export default function FaqPage() {
  usePageTitle("FAQ")

  return (
    <>
      <section className="border-b border-line-soft bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="eyebrow">FAQ</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Perguntas frequentes
          </h1>
          <p className="mt-5 text-lg text-muted">
            As respostas às perguntas que mais recebemos. Se não encontrar a sua, fale connosco.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <Faq items={faq} />
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
          <div className="rounded-2xl border border-line bg-white px-6 py-12 text-center sm:px-12">
            <h2 className="text-2xl font-bold tracking-tight text-ink">
              Ainda tem dúvidas?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted">
              Respondemos em menos de 2 horas em horário útil — ou comece com um diagnóstico
              gratuito.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/contacto" className="btn-primary">
                Falar connosco
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/diagnostico" className="btn-secondary">
                <SearchCheck className="h-4 w-4 text-dev-600" />
                Diagnóstico gratuito
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
