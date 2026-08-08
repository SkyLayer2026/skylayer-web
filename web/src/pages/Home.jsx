import { Link } from "react-router-dom"
import {
  ArrowRight,
  MessageCircle,
  SearchCheck,
  ShieldCheck,
  Wallet,
  FileText,
  Clock,
} from "lucide-react"
import { whatsappLink } from "../config.js"
import { services, diagnostico } from "../data/services.js"

const trust = [
  {
    icon: Wallet,
    title: "Preços claros",
    text: "Valor por escrito na proposta, sem custos escondidos e pagamento em prestações.",
  },
  {
    icon: FileText,
    title: "Processo transparente",
    text: "Diagnóstico antes da proposta, prazo definido e acompanhamento por etapas.",
  },
  {
    icon: ShieldCheck,
    title: "Documentação e formação",
    text: "Entrega com manual simples e formação, para não ficar dependente de ninguém.",
  },
  {
    icon: Clock,
    title: "Suporte após a entrega",
    text: "Apoio por WhatsApp e período de suporte incluído em cada projeto.",
  },
]

const process = [
  ["1", "Diagnóstico gratuito", "Conversa para entender o seu objetivo e a sua realidade."],
  ["2", "Proposta clara", "Escopo, prazo e valor por escrito em até 48 horas."],
  ["3", "Desenvolvimento", "Trabalho por etapas com a sua aprovação em cada fase."],
  ["4", "Entrega e suporte", "Documentação, formação e apoio contínuo após a entrega."],
]

const faq = [
  {
    q: "Quanto custa um site?",
    a: "Sites profissionais a partir de 7.000 MZN, com pagamento em duas prestações. O valor exato é definido após o diagnóstico gratuito.",
  },
  {
    q: "Quanto tempo demora um projeto?",
    a: "Sites entre 1 a 3 semanas; sistemas de gestão entre 3 a 8 semanas. O prazo fica escrito na proposta.",
  },
  {
    q: "Sou pequena empresa, isto é para mim?",
    a: "Sim — a Skylayer existe exatamente para isso: tecnologia acessível para pequenas e médias empresas.",
  },
  {
    q: "Preciso de pagar tudo antes?",
    a: "Não. O padrão é 50% no início e 50% na entrega, e o site só é publicado após a aprovação do trabalho.",
  },
]

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(60rem 30rem at 80% -10%, rgba(56,189,248,0.25), transparent 60%), radial-gradient(50rem 25rem at 10% 110%, rgba(30,64,175,0.35), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-300">
            <SearchCheck className="h-4 w-4" />
            Tecnologia acessível para empresas moçambicanas
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            A sua empresa merece uma{" "}
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              presença digital profissional
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Criamos sites profissionais, sistemas de gestão interna e identidade visual para
            pequenas e médias empresas que querem crescer com tecnologia.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              <MessageCircle className="h-5 w-5" />
              Falar no WhatsApp
            </a>
            <Link
              to="/diagnostico"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-sky-400/40 bg-sky-500/10 px-6 py-3.5 text-sm font-semibold text-sky-300 transition hover:bg-sky-500/20"
            >
              Pedir diagnóstico gratuito
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 text-sm text-slate-300 sm:grid-cols-3">
            <div>
              <p className="font-semibold text-white">O que fazemos?</p>
              <p className="mt-1">Sites, sistemas de gestão e identidade visual.</p>
            </div>
            <div>
              <p className="font-semibold text-white">Para quem?</p>
              <p className="mt-1">Pequenas e médias empresas em Moçambique.</p>
            </div>
            <div>
              <p className="font-semibold text-white">Como entrar em contacto?</p>
              <p className="mt-1">WhatsApp, formulário ou e-mail — resposta em menos de 2 horas.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">O que fazemos</h2>
          <p className="mt-3 text-slate-600">
            Soluções digitais que resolvem problemas reais — com preço claro e processo
            transparente, do primeiro contacto à entrega.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              to={`/servicos/${s.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition group-hover:bg-sky-600 group-hover:text-white">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{s.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.tagline}</p>
              <p className="mt-4 text-sm font-semibold text-sky-600">{s.price}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition group-hover:text-sky-600">
                Saber mais <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
          <Link
            to="/diagnostico"
            className="group flex flex-col justify-between rounded-2xl border border-dashed border-sky-400 bg-gradient-to-br from-sky-50 to-blue-50 p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-100"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white">
                <diagnostico.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{diagnostico.name}</h3>
              <p className="mt-2 text-sm text-slate-600">
                {diagnostico.tagline} Sem compromisso — o relatório é seu.
              </p>
              <p className="mt-4 text-sm font-semibold text-emerald-600">Gratuito</p>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-sky-600">
              Pedir agora <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Porquê escolher a Skylayer?
            </h2>
            <p className="mt-3 text-slate-600">
              Não vendemos apenas código — entregamos confiança. Cada projeto tem processo,
              documentação e suporte.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <t.icon className="h-6 w-6 text-sky-600" />
                <h3 className="mt-4 font-bold text-slate-900">{t.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Como funciona</h2>
          <p className="mt-3 text-slate-600">
            Quatro passos simples, sem surpresas no caminho.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map(([n, title, text]) => (
            <div key={n} className="relative rounded-2xl border border-slate-200 bg-white p-6">
              <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white">
                {n}
              </span>
              <h3 className="mt-2 font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-sky-600 to-blue-800 px-6 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Descubra gratuitamente como melhorar a presença digital da sua empresa
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sky-100">
            Receba um relatório simples com o que está a funcionar, o que está a afastar clientes e
            as 3 primeiras ações recomendadas — sem compromisso.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/diagnostico"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
            >
              Pedir diagnóstico gratuito
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink("Olá Skylayer! Quero falar sobre a minha presença digital.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              Ou falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
          Perguntas frequentes
        </h2>
        <div className="mt-8 space-y-4">
          {faq.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-slate-200 bg-white px-6 py-4 open:shadow-sm"
            >
              <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-sky-600 transition group-open:rotate-45">＋</span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
