import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle } from "lucide-react"
import { usePageTitle, useReveal } from "../hooks.js"
import { whatsappLink } from "../config.js"
import { products, pillars, process } from "../data/services.js"
import { posts } from "../data/posts.js"
import { projects } from "../data/projects.js"
import { Reveal, LayerEdge, SectionHeading } from "../components/ui.jsx"
import { FeaturedProductCard, ProductCard, BlogCard, ProjectCard } from "../components/cards.jsx"
import { HeroVisual, pillarIcons } from "../components/visuals.jsx"

const homeSteps = process.filter(([title]) => title !== "Validamos")
const homeProjects = [projects[0], projects[3], projects[4]]

const antes = ["WhatsApp", "Excel", "Papéis", "Processos manuais", "Informação dispersa"]
const depois = ["Website", "Sistema", "Dados centralizados", "Automação", "Processos organizados"]

function ProcessSteps() {
  const ref = useReveal()
  return (
    <ol ref={ref} className="reveal mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {homeSteps.map(([title], i) => (
        <li
          key={title}
          className="process-item group relative rounded-xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm"
        >
          <p className="text-xs font-bold tracking-widest text-line transition-colors group-hover:text-brand-300">
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 font-bold text-ink">{title}</h3>
          {i < homeSteps.length - 1 && (
            <ArrowRight
              className="process-arrow absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-brand-300 lg:block"
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ol>
  )
}

export default function Home() {
  usePageTitle("")

  return (
    <>
      <section className="bg-grid border-b border-line-soft bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <p className="eyebrow">Skylayer — soluções digitais</p>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Transformação digital.
              <br />
              <span className="text-brand-600">Feita para evoluir.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted">
              Sites, sistemas e soluções digitais para empresas que querem crescer.
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
                Solicitar orçamento
              </a>
            </div>
            <p className="mt-6 text-sm text-muted">
              Sites a partir de <strong className="font-semibold text-ink">7.000 MZN</strong> ·
              diagnóstico gratuito
            </p>
          </Reveal>
          <Reveal delay={120}>
            <HeroVisual className="lg:translate-x-4" />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <SectionHeading eyebrow="Soluções" title="Escolha a solução certa para o seu momento." />
          </Reveal>

          <Reveal delay={80}>
            <FeaturedProductCard product={products.find((p) => p.slug === "presence")} />
          </Reveal>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {products
              .filter((p) => p.slug !== "presence")
              .slice(0, 2)
              .map((p, i) => (
                <Reveal key={p.slug} delay={i * 70}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {products
              .filter((p) => p.slug !== "presence")
              .slice(2)
              .map((p, i) => (
                <Reveal key={p.slug} delay={i * 70}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      <LayerEdge />

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Projetos"
                title="O que construímos"
                text="Uma amostra do nosso trabalho — o portfólio completo está na página de projetos."
              />
              <Link to="/projetos" className="btn-secondary shrink-0">
                Ver todos os projetos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeProjects.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <SectionHeading eyebrow="Por que Skylayer" title="Tecnologia não deve ser um privilégio." />
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                    {pillarIcons[p.title]}
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight text-ink">{p.title}.</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <LayerEdge />

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <SectionHeading eyebrow="Transformação" title="O que muda com a Skylayer" />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 grid items-center gap-6 lg:grid-cols-[1fr_64px_1fr]">
              <div className="rounded-2xl border border-line bg-white p-8">
                <p className="text-sm font-bold uppercase tracking-widest text-muted">Antes</p>
                <ul className="mt-6 space-y-3">
                  {antes.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line-soft bg-surface px-4 py-2.5 text-center text-sm text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rotate-90 text-center lg:rotate-0">
                <ArrowRight className="animate-arrow mx-auto h-7 w-7 text-brand-600" />
              </div>
              <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8">
                <p className="text-sm font-bold uppercase tracking-widest text-brand-700">Depois</p>
                <ul className="mt-6 space-y-3">
                  {depois.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <LayerEdge />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <SectionHeading eyebrow="Processo" title="Como funciona" />
          </Reveal>
          <ProcessSteps />
          <Reveal delay={150}>
            <p className="mt-6">
              <Link to="/sobre" className="link-inline">
                Ver processo completo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-grid-white bg-brand-600">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Pronto para melhorar a forma como o seu negócio utiliza tecnologia?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-brand-100">
              Conte-nos o que precisa. Encontraremos uma solução adequada.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-4 text-sm font-semibold text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
              >
                Solicitar orçamento
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
              <SectionHeading eyebrow="Blog" title="Conhecimento para o seu negócio" />
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