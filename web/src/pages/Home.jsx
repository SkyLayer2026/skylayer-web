import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle } from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { whatsappLink } from "../config.js"
import { products, process } from "../data/services.js"
import { posts } from "../data/posts.js"
import { projects } from "../data/projects.js"
import { Reveal, SectionHeading } from "../components/ui.jsx"
import { ProductCard, BlogCard, ProjectCard } from "../components/cards.jsx"
import { LayersVisual } from "../components/visuals.jsx"

const pilares = ["Estável", "Segura", "Acessível", "Inclusiva"]

export default function Home() {
  usePageTitle("")

  return (
    <>
      <section className="bg-grid relative overflow-hidden border-b border-line-soft bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <p className="eyebrow">Skylayer — soluções digitais</p>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Transformação digital.
              <br />
              <span className="text-brand-600">Feita para evoluir.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted">
              Sites, sistemas e automações para empresas que querem crescer.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/servicos" className="btn-primary">
                Conhecer soluções
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                Falar com a Skylayer
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <LayersVisual className="mx-auto w-full max-w-lg lg:max-w-none" />
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Soluções"
              title="Cinco soluções, um objetivo"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
            <Reveal delay={5 * 70}>
              <Link
                to="/servicos"
                className="card group flex h-full flex-col items-start justify-between bg-surface p-7 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-white hover:shadow-sm"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
                    Comparar
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-ink">Qual é a solução certa?</h3>
                  <p className="mt-1 text-sm text-muted">
                    Um diagnóstico gratuito indica o caminho certo.
                  </p>
                </div>
                <span className="mt-7 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                  Ver todas as soluções
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Projetos" title="O que construímos" />
              <Link to="/projetos" className="btn-secondary shrink-0">
                Ver todos os projetos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <p className="eyebrow">Filosofia</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Tecnologia não deve ser um privilégio.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3">
              {pilares.map((p, i) => (
                <span key={p} className="flex items-center gap-x-4">
                  <span className="text-2xl font-extrabold tracking-tight text-brand-600 sm:text-3xl">
                    {p}
                  </span>
                  {i < pilares.length - 1 && (
                    <span className="hidden h-1.5 w-1.5 rounded-full bg-line sm:block" aria-hidden="true" />
                  )}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Soluções estáveis, seguras, acessíveis e inclusivas — para empresas de qualquer
              dimensão.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <SectionHeading eyebrow="Processo" title="Como trabalhamos" />
          </Reveal>
          <Reveal delay={120}>
            <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {process.map(([title], i) => (
                <li key={title} className="group relative rounded-xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm">
                  <p className="text-xs font-bold tracking-widest text-line transition-colors group-hover:text-brand-300">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-bold text-ink">{title}</h3>
                  {i < process.length - 1 && (
                    <ArrowRight
                      className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-line lg:block"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="bg-brand-600 bg-grid-white">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal className="flex flex-col items-center text-center">
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Tem um problema que precisa de uma solução digital?
            </h2>
            <p className="mt-5 max-w-xl text-lg text-brand-100">
              Começamos com um diagnóstico gratuito — sem compromisso.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-4 text-sm font-semibold text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
              >
                Falar com a Skylayer
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/diagnostico"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Diagnóstico gratuito
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Conteúdo"
                title="Do blog para o seu negócio"
              />
              <Link to="/blog" className="btn-secondary shrink-0">
                Ver todos os artigos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 70}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}