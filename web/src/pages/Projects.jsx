import { Link } from "react-router-dom"
import { ArrowRight, SearchCheck } from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { whatsappLink } from "../config.js"
import { projects } from "../data/projects.js"
import { ProjectCard } from "../components/cards.jsx"

export default function Projects() {
  usePageTitle("Projetos")

  return (
    <>
      <section className="border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="eyebrow">Projetos</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            O que construímos
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Cada projeto é apresentado com o problema, a solução, as tecnologias e o resultado —
            porque confiança se constrói com detalhe.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-muted">
            <span className="font-semibold text-emerald-700">Projeto realizado</span> — entregue a
            clientes ·{" "}
            <span className="font-semibold text-amber-700">Projeto demonstrativo</span> — demonstra
            capacidade técnica · <span className="font-semibold">Conceito</span> — em
            desenvolvimento.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
          <div className="rounded-2xl border border-line bg-white px-6 py-12 text-center sm:px-12">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <SearchCheck className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-ink">
              Enquanto o portfólio cresce, conheça o nosso trabalho de outra forma
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted">
              Peça um diagnóstico gratuito e avalie o nosso rigor antes de qualquer investimento. Ou
              fale connosco diretamente.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/diagnostico" className="btn-primary">
                Pedir diagnóstico gratuito
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink("Olá Skylayer! Gostaria de conhecer o vosso trabalho.")}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
