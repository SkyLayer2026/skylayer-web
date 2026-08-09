import { usePageTitle } from "../hooks.js"
import { products, complementary } from "../data/services.js"
import { SectionHeading } from "../components/ui.jsx"
import { ProductCard, ComplementaryCard } from "../components/cards.jsx"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export default function Services() {
  usePageTitle("Serviços")

  return (
    <>
      <section className="border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="eyebrow">Soluções</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Soluções digitais para o seu negócio
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Cinco soluções principais e serviços complementares — cada uma responde a um problema
            concreto, com processo transparente e preço claro.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
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

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="Serviços complementares"
            title="Como podemos ajudar"
            text="Suporte em todas as frentes digitais do seu negócio."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {complementary.map((c) => (
              <ComplementaryCard key={c.name} item={c} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
