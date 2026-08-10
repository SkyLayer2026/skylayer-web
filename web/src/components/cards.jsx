import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { complementary } from "../data/services.js"
import { ProjectMockup } from "./visuals.jsx"

export function ProductCard({ product }) {
  return (
    <Link
      to={`/servicos/${product.slug}`}
      className="card group flex flex-col justify-between p-7 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
            {product.stage}
          </span>
          <product.icon className="h-6 w-6 text-brand-600 transition-transform group-hover:scale-110" />
        </div>
        <h3 className="mt-6 text-lg font-bold text-ink">{product.name}</h3>
        <p className="mt-1 text-sm text-muted">{product.short}</p>
      </div>
      <span className="mt-7 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
        Explorar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
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
      className="card group flex flex-col p-7 transition-colors hover:border-brand-300"
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

