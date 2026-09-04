import { Link, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { getPost, posts } from "../data/posts.js"
import { BlogCard } from "../components/cards.jsx"
import NotFound from "./NotFound.jsx"

function Block({ block }) {
  if (block.type === "h2") return <h2 className="mt-10 text-2xl font-bold tracking-tight text-ink">{block.text}</h2>
  if (block.type === "ul")
    return (
      <ul className="mt-5 space-y-2.5">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-dev-600" aria-hidden="true" />
            <span className="text-[17px] leading-relaxed text-muted">{item}</span>
          </li>
        ))}
      </ul>
    )
  return <p className="mt-5 text-[17px] leading-relaxed text-muted">{block.text}</p>
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) return <NotFound />

  usePageTitle(post.title)

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <article className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-dev-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Blog
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-dev-600">
            {post.category}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-5 flex items-center gap-2 text-sm text-muted">
            <time dateTime={post.date}>{post.date}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>
          <div className="mt-10 border-t border-line-soft pt-10">
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <h2 className="text-2xl font-bold tracking-tight text-ink">Ler a seguir</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
