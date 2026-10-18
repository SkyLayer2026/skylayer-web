import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { process, pillars } from "../data/services.js"

export default function About() {
  usePageTitle("Sobre")

  return (
    <>
      <section className="border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="eyebrow">Sobre a Skylayer</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            Tecnologia não deve ser um privilégio.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            A Skylayer nasceu em 2026 com uma convicção: qualquer empresa — pequena ou média — deve
            poder beneficiar da evolução tecnológica de forma estável, segura, acessível e
            inclusiva.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">Porque existimos</h2>
            <p className="mt-5 leading-relaxed text-muted">
              A maioria das pequenas empresas enfrenta o mesmo dilema: sabe que precisa de estar
              mais digital, mas não sabe por onde começar, quanto vai custar ou em quem confiar.
              Resultado — adiam a decisão e perdem oportunidades todos os dias.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              A Skylayer existe para resolver esse problema com um método simples: diagnosticar com
              atenção, propor com transparência e entregar com responsabilidade. Nada de tecnologia
              pela moda — apenas o que resolve o seu problema e cabe no seu orçamento.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">Como pensamos</h2>
            <ul className="mt-5 space-y-4">
              {pillars.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-dev-600" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-ink">{p.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="text-3xl font-bold tracking-tight text-ink">Como trabalhamos</h2>
          <p className="mt-4 max-w-2xl text-muted">
            Um processo profissional em seis passos — o mesmo rigor em cada projeto, do primeiro ao
            mais complexo.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {process.map(([title, text], i) => (
              <div key={title} className="card p-5">
                <p className="text-xs font-bold tracking-widest text-dev-600">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-ink">
            Compromisso técnico
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Cada entrega passa por testes, documentação e revisão. Acreditamos que tecnologia boa é
            aquela que continua a funcionar daqui a anos — e é isso que projetamos.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/servicos" className="btn-primary">
              Conhecer as soluções
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contacto" className="btn-secondary">
              Falar connosco
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
