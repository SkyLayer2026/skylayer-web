import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { complementary } from "../data/services.js"
import { ProductVisual, ProjectMockup } from "./visuals.jsx"

export function FeaturedProductCard({ product }) {
  return (
    <Link
      to={`/servicos/${product.slug}`}
      className="card group grid gap-8 overflow-hidden p-7 transition-all hover:border-brand-300 hover:shadow-sm sm:p-9 lg:grid-cols-2 lg:items-center"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
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
        <p className="mt-6 font-bold text-ink">{product.home.price}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
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
  return (
    <Link
      to={`/servicos/${product.slug}`}
      className="card group flex h-full flex-col p-6 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm"
    >
      <ProductVisual slug={product.slug} />
      <h3 className="mt-5 text-lg font-bold text-ink">{product.name}</h3>
      <p className="mt-1 text-sm font-semibold text-brand-600">{product.title}</p>
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
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
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
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-brand-600">
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
      className="card group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm"
    >
      <div
        className="relative flex h-32 items-center justify-center overflow-hidden bg-brand-50"
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
        <span className="relative text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand-700">
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

const tipoBadge = {
  "Projeto realizado": "bg-emerald-50 text-emerald-700",
  "Projeto demonstrativo": "bg-amber-50 text-amber-700",
  "Conceito": "border border-dashed border-line px-3 py-1 text-xs font-semibold text-muted",
}

const accentos = ["#2563eb", "#059669", "#0d9488", "#dc2626", "#ec4899"]

export function ProjectCard({ project }) {
  const badge = tipoBadge[project.tipo] ?? tipoBadge["Conceito"]
  const accent = accentos[project.title.charCodeAt(0) % accentos.length]
  return (
    <Link to="/projetos" className="card group block overflow-hidden transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm">
      <ProjectMockup product={{ code: project.tipo === "Conceito" ? "SKL" : "SL" }} accent={accent} />
      <div className="p-7">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-ink">{project.title}</h3>
          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${badge}`}>
            {project.tipo}
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{project.resultado}</p>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
          Ver projeto
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}

