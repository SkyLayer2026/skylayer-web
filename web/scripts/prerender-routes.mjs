/**
 * Pré-gera uma shell estática por rota + o sitemap.
 *
 * Porquê: um SPA no GitHub Pages só tem index.html e 404.html. Sem rewrites,
 * um deep link (ex.: /servicos) devolve HTTP 404 — o browser mostra a página
 * (via 404.html) mas o Google vê 404 e não a indexa. Aqui escrevemos, para cada
 * rota real da aplicação, um ficheiro <rota>.html que o GitHub Pages serve com
 * HTTP 200 em /<rota>, mantendo o canonical e o og:url corretos por página.
 *
 * A lista de rotas é derivada de src/data (posts e produtos) + rotas estáticas,
 * a mesma fonte que a aplicação usa. O sitemap é gerado daqui, para não poder
 * divergir das páginas que existem mesmo.
 *
 * Corre depois de `vite build` (ver package.json > scripts.build).
 */
import { readFile, writeFile, mkdir } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { posts } from "../src/data/posts.js"
import { products } from "../src/data/services.js"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const dist = join(root, "dist")

const ORIGIN = "https://skylayer2026.github.io"
const SITE = "Skylayer"
const HOME_TITLE = `${SITE} — Tecnologia acessível para o crescimento`
// Mantém-se igual à descrição do index.html: é a descrição institucional.
const HOME_DESC =
  "Software para operar, vender e crescer — websites, sistemas empresariais, aplicações, automação e integrações. Tecnologia acessível em Moçambique."

/* Rotas estáticas: [caminho, título usado pela própria página (usePageTitle)] */
const STATIC_ROUTES = [
  ["/servicos", "Produtos"],
  ["/catalogo", "Serviços"],
  ["/dev", "DEV"],
  ["/iot", "IoT"],
  ["/infrastructure", "INFRASTRUCTURE"],
  ["/sn-ia", "Sn IA"],
  ["/sobre", "Sobre"],
  ["/blog", "Blog"],
  ["/faq", "FAQ"],
  ["/contacto", "Contacto"],
  ["/diagnostico", "Diagnóstico técnico"],
]

const routes = [
  { path: "/", title: HOME_TITLE, desc: HOME_DESC },
  ...STATIC_ROUTES.map(([path, label]) => ({
    path,
    title: `${label} — ${SITE}`,
    desc: HOME_DESC,
  })),
  ...products.map((p) => ({
    path: `/servicos/${p.slug}`,
    title: `${p.name} — ${SITE}`,
    desc: p.home?.phrase ?? p.title,
  })),
  ...posts.map((p) => ({
    path: `/blog/${p.slug}`,
    title: `${p.title} — ${SITE}`,
    desc: p.excerpt ?? HOME_DESC,
  })),
]

/* A aplicação escreve document.title = `${titulo} — Skylayer`; para a home não
   há sufixo. Replicamos exatamente isso para o HTML estático e o JS não
   divergirem. */

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

/** Substitui e FALHA se o padrão não existir (evita publicar canonical errado). */
function replaceOrFail(html, re, replacement, what, routePath) {
  if (!re.test(html)) {
    throw new Error(
      `prerender: não encontrei ${what} na shell para ${routePath}. ` +
        `A shell mudou? Ajustar scripts/prerender-routes.mjs.`
    )
  }
  return html.replace(re, replacement)
}

function renderShell(shell, route) {
  const url = route.path === "/" ? `${ORIGIN}/` : `${ORIGIN}${route.path}`
  let html = shell

  html = replaceOrFail(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`, "<title>", route.path)
  html = replaceOrFail(
    html,
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${esc(route.desc)}" />`,
    'meta description',
    route.path
  )
  html = replaceOrFail(
    html,
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${url}" />`,
    "canonical",
    route.path
  )
  html = replaceOrFail(
    html,
    /<meta property="og:title"[^>]*>/,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    "og:title",
    route.path
  )
  html = replaceOrFail(
    html,
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${esc(route.desc)}" />`,
    "og:description",
    route.path
  )
  html = replaceOrFail(
    html,
    /<meta property="og:url"[^>]*>/,
    `<meta property="og:url" content="${url}" />`,
    "og:url",
    route.path
  )

  return html
}

const shell = await readFile(join(dist, "index.html"), "utf8")

// A home é o próprio dist/index.html.
let written = 0
for (const route of routes) {
  if (route.path === "/") continue
  const html = renderShell(shell, route)
  const file = join(dist, `${route.path.replace(/^\//, "")}.html`)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html, "utf8")
  written += 1
}

// Sitemap gerado da mesma lista de rotas.
const today = new Date().toISOString().slice(0, 10)
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((r) => {
    const loc = r.path === "/" ? `${ORIGIN}/` : `${ORIGIN}${r.path}`
    const priority = r.path === "/" ? "1.0" : "0.7"
    return `<url><loc>${loc}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`
  }),
  "</urlset>",
  "",
].join("\n")
await writeFile(join(dist, "sitemap.xml"), sitemap, "utf8")

console.log(
  `prerender: ${written} shells de rota geradas + sitemap com ${routes.length} URLs ` +
    `(1 home, ${STATIC_ROUTES.length} estáticas, ${products.length} produtos, ${posts.length} posts)`
)
