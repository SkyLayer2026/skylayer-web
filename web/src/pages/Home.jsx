import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle } from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { whatsappLink } from "../config.js"
import { products, process, pricing } from "../data/services.js"
import { posts } from "../data/posts.js"
import { projects } from "../data/projects.js"
import { SectionHeading } from "../components/ui.jsx"
import { ProductCard, BlogCard, ProjectCard } from "../components/cards.jsx"

export default function Home() {
  usePageTitle("")

  return (
    <>
      <section className="border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-36">
          <p className="eyebrow">Skylayer — transformação digital</p>
          <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Tecnologia feita para evoluir.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Soluções digitais estáveis, seguras, acessíveis e inclusivas — para empresas e
            profissionais que querem crescer com tecnologia.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/servicos" className="btn-primary">
              Conhecer soluções
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-secondary">
              <MessageCircle className="h-4 w-4 text-emerald-600" />
              Solicitar orçamento
            </a>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="Porquê a Skylayer"
            title="Tecnologia não deve ser um privilégio."
            text="Acreditamos que qualquer empresa deve poder beneficiar da evolução tecnológica de forma segura, acessível e sustentável."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Estável",
                text: "Soluções feitas para funcionar — e para continuar a funcionar.",
              },
              {
                title: "Segura",
                text: "Proteção desde o início, em cada camada da solução.",
              },
              {
                title: "Acessível",
                text: "Tecnologia proporcional à necessidade e ao orçamento.",
              },
              {
                title: "Inclusiva",
                text: "Pensada para pessoas e empresas de diferentes dimensões.",
              },
            ].map((p) => (
              <div key={p.title} className="bg-white p-7">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
                  {p.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="Nossas soluções"
            title="Cinco soluções, um objetivo"
            text="Cada solução responde a um problema concreto: o que é, para quem é e o que resolve."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-line bg-surface px-7 py-6 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-ink">Precisa de algo diferente?</p>
              <p className="mt-1 text-sm text-muted">
                Desenvolvemos soluções personalizadas de acordo com a necessidade do seu negócio.
              </p>
            </div>
            <Link
              to="/servicos/custom-solutions"
              className="btn-secondary mt-4 shrink-0 sm:mt-0"
            >
              Conhecer o SL Custom Solutions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="Processo"
            title="Como trabalhamos"
            text="Um processo em seis passos, o mesmo em cada projeto — do primeiro contacto à evolução contínua."
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-6">
            {process.map(([title, text], i) => (
              <li key={title} className="bg-white p-6">
                <p className="text-xs font-bold tracking-widest text-brand-600">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Projetos"
              title="O que construímos"
              text="Projetos apresentados com o problema, a solução e o resultado — não apenas imagens."
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

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="Preços"
            title="Transparência desde o início"
            text="Valores de referência antes de qualquer conversa. Sem custos escondidos."
          />
          <div className="mt-12 overflow-hidden rounded-xl border border-line">
            <div className="hidden grid-cols-[1fr_1fr_1fr] gap-4 border-b border-line bg-surface px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted sm:grid">
              <p>Solução</p>
              <p>Produto</p>
              <p className="text-right">Valor</p>
            </div>
            {pricing.map((p) => (
              <div
                key={p.name}
                className="grid grid-cols-2 gap-4 border-b border-line-soft bg-white px-6 py-4 last:border-b-0 sm:grid-cols-[1fr_1fr_1fr] sm:items-center"
              >
                <p className="font-semibold text-ink">{p.name}</p>
                <p className="text-sm text-muted sm:text-left">{p.detail}</p>
                <p className="col-span-2 text-sm text-muted sm:col-span-1 sm:text-right">
                  <span className="font-bold text-ink">{p.price}</span>
                  {p.note ? <span className="block text-xs">{p.note}</span> : null}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Sites profissionais a partir de 7.000 MZN, pagamento em duas prestações. Sistemas e
            soluções personalizadas — orçamento mediante diagnóstico gratuito.
          </p>
        </div>
      </section>

      <section className="bg-white">
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

      <section className="bg-surface-2">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6">
          <div className="rounded-xl border border-line bg-white px-6 py-12 text-center sm:px-12">
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              A tecnologia certa para o seu negócio.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted">
              Começamos com um diagnóstico gratuito da sua necessidade — sem compromisso. Recebe
              uma recomendação clara e uma proposta por escrito.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/contacto" className="btn-primary">
                Solicitar orçamento
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/diagnostico" className="btn-secondary">
                Diagnóstico gratuito
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}