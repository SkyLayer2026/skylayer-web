import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle, Globe, LayoutDashboard, Workflow } from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { whatsappLink } from "../config.js"
import { products } from "../data/services.js"
import { posts } from "../data/posts.js"
import { projects } from "../data/projects.js"
import { SectionHeading } from "../components/ui.jsx"
import { ProductCard, BlogCard, ProjectCard } from "../components/cards.jsx"
import { LayersVisual, pillarIcons, stageLabels } from "../components/visuals.jsx"

const oQueFazemos = [
  {
    icon: Globe,
    title: "Sites profissionais",
    text: "Presença digital que transmite credibilidade.",
  },
  {
    icon: LayoutDashboard,
    title: "Sistemas à medida",
    text: "Digitalize clientes, vendas, stock e processos.",
  },
  {
    icon: Workflow,
    title: "Automações",
    text: "Tarefas repetitivas feitas sozinhas.",
  },
]

const pilares = [
  { title: "Estável", text: "Soluções feitas para funcionar — e continuar a funcionar." },
  { title: "Segura", text: "Proteção desde o início, em cada camada." },
  { title: "Acessível", text: "Tecnologia proporcional à necessidade e ao orçamento." },
  { title: "Inclusiva", text: "Pensada para empresas de todas as dimensões." },
]

export default function Home() {
  usePageTitle("")

  return (
    <>
      <section className="border-b border-line-soft bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Skylayer — transformação digital</p>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Tecnologia feita para evoluir.
            </h1>
            <p className="mt-6 max-w-lg text-sm font-medium text-muted">
              Sites, sistemas e automações estáveis, seguros, acessíveis e inclusivos — para
              empresas e profissionais que querem crescer.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                Solicitar orçamento
              </a>
              <Link to="/servicos" className="btn-secondary">
                Conhecer soluções
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted">
              Sites a partir de <strong className="font-semibold text-ink">7.000 MZN</strong>,
              com diagnóstico gratuito e proposta por escrito.
            </p>
          </div>
          <LayersVisual className="mx-auto w-full max-w-lg lg:max-w-none" />
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {oQueFazemos.map((s) => (
              <div key={s.title} className="flex items-start gap-4 bg-white p-7">
                <s.icon className="mt-0.5 h-6 w-6 shrink-0 text-brand-600" />
                <div>
                  <h2 className="font-bold text-ink">{s.title}</h2>
                  <p className="mt-1.5 text-sm text-muted">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Soluções principais"
              title="Comece pequeno, evolua em passos"
              text="Cada solução responde a um momento do seu negócio — do primeiro site à automação completa."
            />
            <Link to="/servicos" className="btn-secondary shrink-0">
              Ver todas as soluções
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <p className="mt-6 hidden gap-4 text-sm text-muted sm:flex">
            {products.map((p) => (
              <span key={p.stage} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                <strong className="font-semibold text-ink">{p.stage}</strong>
                {stageLabels[p.stage]}
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className="bg-surface-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Projetos"
              title="O que construímos"
              text="Cada projeto com o problema, a solução e o resultado."
            />
            <Link to="/projetos" className="btn-secondary shrink-0">
              Ver todos os projetos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="Porquê a Skylayer"
            title="Tecnologia não deve ser um privilégio"
          />
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {pilares.map((p) => (
              <div key={p.title}>
                {pillarIcons[p.title]}
                <h3 className="mt-5 font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-600">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-200">
                Como começo?
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                A tecnologia certa para o seu negócio.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-brand-100">
                Começamos com um diagnóstico gratuito da sua necessidade — sem compromisso. Recebe
                uma recomendação clara e uma proposta por escrito.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
              >
                Solicitar orçamento
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/diagnostico"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Diagnóstico gratuito
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Blog"
              title="Conhecimento para o seu negócio"
              text="Guias práticos sobre tecnologia, negócios e segurança."
            />
            <Link to="/blog" className="btn-secondary shrink-0">
              Ver todos os artigos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}