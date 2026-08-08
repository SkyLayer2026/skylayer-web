import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { complementary } from "../data/services.js"

export function ProductCard({ product }) {
  return (
    <Link
      to={`/servicos/${product.slug}`}
      className="card group flex flex-col p-7 transition-colors hover:border-brand-300 hover:shadow-sm"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-line transition-colors group-hover:text-brand-300">
          {product.code}
        </span>
        <product.icon className="h-6 w-6 text-brand-600" />
      </div>
      <h3 className="mt-6 text-lg font-bold text-ink">{product.name}</h3>
      <p className="mt-1 text-sm font-medium text-brand-600">{product.title}</p>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{product.tagline}</p>
      <div className="mt-6 flex items-center justify-between border-t border-line-soft pt-4">
        <span className="text-sm font-semibold text-ink">{product.price}</span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-600">
          Conhecer solução <ArrowRight className="h-4 w-4" />
        </span>
      </div>
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
      className="card group flex flex-col p-7 transition-colors hover:border-brand-300 hover:shadow-sm"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
        {post.category}
      </p>
      <h3 className="mt-3 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand-700">
        {post.title}
      </h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{post.excerpt}</p>
      <div className="mt-5 flex items-center gap-2 border-t border-line-soft pt-4 text-xs text-muted">
        <time dateTime={post.date}>{post.date}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readTime}</span>
      </div>
    </Link>
  )
}

export function ProjectCard({ project }) {
  return (
    <div className="card flex flex-col p-7">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-ink">{project.title}</h3>
        <span className="rounded-full border border-dashed border-line px-3 py-1 text-xs font-semibold text-muted">
          Em breve
        </span>
      </div>
      <dl className="mt-5 flex-1 space-y-4 text-sm">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Problema</dt>
          <dd className="mt-1 text-muted">{project.problema}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Solução</dt>
          <dd className="mt-1 text-muted">{project.solucao}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Resultado</dt>
          <dd className="mt-1 text-muted">{project.resultado}</dd>
        </div>
      </dl>
      <div className="mt-5 border-t border-line-soft pt-4">
        <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
          Tecnologias
        </dt>
        <dd className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-md bg-surface px-2 py-1 text-xs text-muted">—</span>
        </dd>
      </div>
    </div>
  )
}

