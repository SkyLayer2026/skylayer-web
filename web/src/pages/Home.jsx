import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle, SearchCheck } from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { whatsappLink } from "../config.js"
import { products, complementary, process, pillars, pricing, faq } from "../data/services.js"
import { posts } from "../data/posts.js"
import { SectionHeading } from "../components/ui.jsx"
import Faq from "../components/Faq.jsx"
import { ProductCard, ComplementaryCard, BlogCard } from "../components/cards.jsx"

function HeroGraphic() {
  return (
    <svg
      viewBox="0 0 400 320"
      className="pointer-events-none absolute -right-24 -top-24 hidden h-[26rem] w-[34rem] opacity-70 lg:block"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
    >
      <g className="text-line" strokeWidth="1">
        <circle cx="300" cy="90" r="60" />
        <circle cx="300" cy="90" r="120" />
        <rect x="120" y="160" width="200" height="120" rx="12" />
        <path d="M300 30V20M300 160V340M180 160V340M420 90H430M300 90H180M240 90V160M360 90V160" />
        <circle cx="300" cy="90" r="4" className="text-brand-300" strokeWidth="2" />
        <rect x="136" y="196" width="168" height="12" rx="6" />
        <rect x="136" y="220" width="120" height="12" rx="6" />
      </g>
    </svg>
  )
}

export default function Home() {
  usePageTitle("")

  return (
    <>
      <section className="relative overflow-hidden border-b border-line-soft bg-white">
        <HeroGraphic />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <p className="eyebrow">Skylayer — transformação digital</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight text-ink sm:text-6xl">
            Transformação digital feita para evoluir.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Soluções digitais estáveis, seguras e acessíveis para empresas e profissionais que
            querem crescer com tecnologia.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/servicos" className="btn-primary">
              Conhecer soluções
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-secondary">
              <MessageCircle className="h-4 w-4 text-emerald-600" />
              Falar com a Skylayer
            </a>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading eyebrow="O problema" title="A tecnologia deveria simplificar o seu negócio." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Empresas que dependem de processos manuais no dia a dia.",
              "Presença digital que não transmite a credibilidade do negócio.",
              "Ferramentas avulsas que não comunicam entre si.",
              "Dinheiro gasto em soluções que ninguém entende ou usa.",
              "Dificuldade em acompanhar a evolução tecnológica.",
            ].map((item) => (
              <div key={item} className="card flex items-start gap-3 p-5">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
                <p className="text-[15px] leading-relaxed text-muted">{item}</p>
              </div>
            ))}
            <div className="card flex items-center border-brand-200 bg-brand-50 p-5">
              <p className="text-[15px] font-semibold leading-relaxed text-brand-900">
                A Skylayer existe para resolver esse problema.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="O que fazemos"
            title="Cinco soluções, um objetivo"
            text="Cada solução responde a uma necessidade: o que é, para quem é e o que resolve."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="Como podemos ajudar"
            title="Serviços complementares"
            text="Do planeamento à manutenção — apoiamos o seu negócio em todas as frentes digitais."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {complementary.map((c) => (
              <ComplementaryCard key={c.name} item={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading eyebrow="Porquê a Skylayer" title="Princípios que orientam cada projeto" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div key={p.title} className="card p-6">
                <h3 className="font-bold text-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading eyebrow="Processo" title="Como trabalhamos" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {process.map(([title, text], i) => (
              <div key={title} className="card p-5">
                <p className="text-xs font-bold tracking-widest text-brand-600">
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
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="Preços"
            title="Transparência desde o início"
            text="Valores de referência antes de qualquer conversa. Projetos personalizados são orçamentados após diagnóstico."
          />
          <div className="mt-12 overflow-hidden rounded-xl border border-line">
            <div className="hidden grid-cols-3 gap-4 border-b border-line bg-surface px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted sm:grid">
              <p>Solução</p>
              <p>Produto</p>
              <p className="text-right">Valor</p>
            </div>
            {pricing.map((p) => (
              <div
                key={p.name}
                className="grid grid-cols-2 gap-4 border-b border-line-soft px-6 py-4 last:border-b-0 sm:grid-cols-3 sm:items-center"
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
            Pagamento em duas prestações: 50% no início e 50% na entrega. Sem custos escondidos.
          </p>
        </div>
      </section>

      <section className="bg-surface-2">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Projetos</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">Trabalho recente</h2>
            <p className="mt-4 text-lg text-muted">
              Cada projeto é apresentado com o problema, a solução e o resultado — não apenas uma
              imagem bonita.
            </p>
            <Link to="/projetos" className="btn-secondary mt-6">
              Ver projetos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="card flex flex-col justify-between p-8">
            <p className="text-sm font-medium text-brand-600">Em construção</p>
            <div className="mt-4 space-y-4">
              <div className="h-2.5 w-full rounded-full bg-line-soft" aria-hidden="true" />
              <div className="h-2.5 w-4/5 rounded-full bg-line-soft" aria-hidden="true" />
              <div className="h-2.5 w-3/5 rounded-full bg-line-soft" aria-hidden="true" />
            </div>
            <p className="mt-6 text-sm text-muted">
              O portfólio está a ser preenchido com os primeiros projetos entregues.
            </p>
          </div>
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

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading eyebrow="FAQ" title="Perguntas frequentes" align="center" />
          <div className="mx-auto mt-10 max-w-3xl">
            <Faq items={faq} />
          </div>
          <div className="mt-10 text-center">
            <Link to="/faq" className="text-sm font-semibold text-brand-600 hover:underline">
              Ver todas as perguntas e respostas
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="rounded-2xl border border-line bg-surface-2 px-6 py-12 text-center sm:px-12">
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Vamos conversar sobre o seu projeto?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted">
              Começamos com um diagnóstico gratuito da sua necessidade — sem compromisso. Você
              recebe uma recomendação clara e uma proposta por escrito.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/contacto" className="btn-primary">
                Solicitar orçamento
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/diagnostico" className="btn-secondary">
                <SearchCheck className="h-4 w-4 text-brand-600" />
                Diagnóstico gratuito
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
