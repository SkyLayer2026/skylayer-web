import { useState } from "react"
import { usePageTitle } from "../hooks.js"
import { posts, categories } from "../data/posts.js"
import { BlogCard } from "../components/cards.jsx"

export default function Blog() {
  usePageTitle("Blog")
  const [active, setActive] = useState("Todos")

  const filtered = active === "Todos" ? posts : posts.filter((p) => p.category === active)

  return (
    <>
      <section className="border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="eyebrow">Blog</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Conhecimento para o seu negócio
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Guias práticos sobre tecnologia, negócios, engenharia e segurança — escritos para quem
            decide, não apenas para quem programa.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-wrap gap-2">
            {["Todos", ...categories].map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  active === c
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-line bg-white text-muted hover:border-brand-300 hover:text-brand-700"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
          {filtered.length === 0 ? (
            <p className="py-10 text-center text-muted">
              Ainda não há artigos nesta categoria — em breve.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
