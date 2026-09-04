import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { complementary } from "../data/services.js"
import { ProductVisual } from "./visuals.jsx"

export function FeaturedProductCard({ product }) {
  return (
    <Link
      to={`/servicos/${product.slug}`}
      className="card group grid gap-8 overflow-hidden p-7 transition-all hover:border-dev-300 hover:shadow-sm sm:p-9 lg:grid-cols-2 lg:items-center"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-dev-600">
          Produto de entrada
        </p>
        <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          {product.name}
        </h3>
        <p className="mt-1 font-semibold text-ink">{product.title}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">{product.home.phrase}</p>
        <p className="mt-4 text-sm text-muted">
          <strong className="font-semibold text-ink">Ideal para:</strong> {product.home.audience}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.home.chips.map((c) => (
            <span key={c} className="rounded-md bg-surface px-2.5 py-1 text-xs text-muted">
              {c}
            </span>
          ))}
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-dev-600">
          Explorar solução
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
      <ProductVisual slug={product.slug} className="lg:scale-[1.15]" />
      <span className="sr-only">Ir para a página de {product.name}</span>
    </Link>
  )
}

export function ProductCard({ product }) {
  const bleed = product.slug === "automation"
  const dominant = product.slug === "business-systems"
  return (
    <Link
      to={`/servicos/${product.slug}`}
      className="card group flex h-full flex-col overflow-hidden p-6 transition-all hover:-translate-y-0.5 hover:border-dev-300 hover:shadow-sm"
    >
      {bleed ? (
        <ProductVisual slug={product.slug} className="-mx-6 -mt-6 mb-6 rounded-none border-x-0 border-t-0 p-4" />
      ) : (
        <ProductVisual slug={product.slug} className={dominant ? "sm:p-4" : "sm:p-3"} />
      )}
      <h3 className="mt-5 text-lg font-bold text-ink">{product.name}</h3>
      <p className="mt-1 text-sm font-semibold text-dev-600">{product.title}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{product.home.phrase}</p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">
        {product.home.chipsLabel}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {product.home.chips.map((c) => (
          <span key={c} className="rounded-md bg-surface px-2.5 py-1 text-xs text-muted">
            {c}
          </span>
        ))}
      </div>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-dev-600">
        Explorar solução
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
      <span className="sr-only">Ir para a página de {product.name}</span>
    </Link>
  )
}

export function ComplementaryCard({ item }) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-dev-600">
          <item.icon className="h-5 w-5" />
        </span>
        <h3 className="font-bold text-ink">{item.name}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
    </div>
  )
}

export function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="card group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-0.5 hover:border-dev-300 hover:shadow-sm"
    >
      <div
        className="relative flex h-32 items-center justify-center overflow-hidden bg-dev-50"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(37,99,235,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.07) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <span className="relative text-xs font-bold uppercase tracking-[0.2em] text-dev-600">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold leading-snug text-ink transition-colors group-hover:text-dev-700">
          {post.title}
        </h3>
        <div className="mt-4 flex items-center gap-2 border-t border-line-soft pt-4 text-xs text-muted">
          <time dateTime={post.date}>{post.date}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  )
}

