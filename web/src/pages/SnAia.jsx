import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle, Bot, BookOpen, SlidersHorizontal, Users, Repeat, Workflow } from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { whatsappLink } from "../config.js"
import { Reveal, SectionHeading, TechLabel } from "../components/ui.jsx"

/* ═══════════════════════════════════════════════════
   SN IA — landing page de produto
   ═══════════════════════════════════════════════════ */

const FEATURES = [
  { icon: MessageCircle, title: "Atendimento no WhatsApp", text: "Responde aos clientes no canal que eles já usam, de forma contextual — não com respostas genéricas." },
  { icon: BookOpen, title: "Base de conhecimento", text: "Aprende com a informação da sua empresa: produtos, preços, horários, políticas e perguntas frequentes." },
  { icon: SlidersHorizontal, title: "Regras de operação", text: "Define o que pode responder, o que deve perguntar e quando faz sentido envolver uma pessoa." },
  { icon: Users, title: "CRM integrado", text: "Cada conversa torna-se um contacto organizado: nome, interesse, histórico e estado do seguimento." },
  { icon: Repeat, title: "Acompanhamento", text: "Faz seguimento automático de contactos que ficaram pendentes, sem deixar oportunidades a arrefecer." },
  { icon: Workflow, title: "Automação de tarefas", text: "Confirmações, lembretes e organização de pedidos acontecem sozinhos, sem trabalho manual." },
]

const STEPS = [
  ["O cliente escreve", "Chega uma mensagem no WhatsApp da empresa, a qualquer hora."],
  ["O Sn IA compreende", "Interpreta o pedido e responde com base na sua base de conhecimento e regras."],
  ["Organiza no CRM", "Regista o contacto, o interesse e o estado do acompanhamento."],
  ["Faz seguimento", "Mantém o contacto ativo com lembretes e confirmações automáticas."],
  ["Passa para humano", "Quando é necessário decidir ou negociar, transfere para uma pessoa com todo o contexto."],
]

function ChatMock() {
  const msgs = [
    { from: "in", text: "Boa tarde, têm entrega em Maputo?" },
    { from: "out", text: "Boa tarde! Sim, fazemos entregas em Maputo. Quer saber os custos e as opções?" },
    { from: "in", text: "Sim, por favor." },
    { from: "out", text: "Perfeito. Já registei o seu contacto. Um colega envia-lhe o detalhe agora. 👍" },
  ]
  return (
    <figure className="w-full max-w-sm">
      <div
        role="img"
        aria-label="Exemplo ilustrativo de uma conversa de WhatsApp com o Sn IA"
        className="rounded-2xl border border-white/12 bg-white/[0.04] p-4 backdrop-blur"
      >
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-dev-600/20">
            <Bot className="h-4 w-4 text-dev-400" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">Sn IA</p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/60">a responder agora</p>
          </div>
          <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400 metric-pulse" />
        </div>
        <div className="mt-3 space-y-2.5">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.from === "out" ? "justify-end" : "justify-start"}`}>
              <p
                className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug ${
                  m.from === "out" ? "rounded-br-sm bg-dev-600 text-white" : "rounded-bl-sm bg-white/10 text-white/85"
                }`}
              >
                {m.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center font-mono text-[9px] uppercase tracking-widest text-white/60">
        Exemplo ilustrativo
      </figcaption>
    </figure>
  )
}

export default function SnAia() {
  usePageTitle("Sn IA")

  return (
    <>
      {/* ═══ HERO (dark) ═══ */}
      <section className="section-dark">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="glow glow-dev -left-24 -top-20 h-80 w-80 opacity-[0.20]" aria-hidden="true" />
        <div className="glow glow-iot -right-20 bottom-0 h-72 w-72 opacity-[0.12]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-white/60">
              SKYLAYER / PRODUTO / SN IA
            </p>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl">
              Atendimento que
              <br />
              <span className="text-grad">responde e organiza.</span>
            </h1>
            <p className="mt-7 max-w-md text-base leading-relaxed text-white/55 sm:text-lg">
              O Sn IA atende os seus clientes por WhatsApp, com base no conhecimento da sua empresa,
              organiza os contactos e passa para uma pessoa quando é preciso.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink("Olá Skylayer! Gostaria de conhecer o Sn IA e pedir uma demonstração.")}
                target="_blank"
                rel="noreferrer"
                className="btn-glow inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white"
              >
                Pedir demonstração
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:border-white/50"
              >
                Falar com a equipa
              </Link>
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-white/55">
              Sem compromisso · Apresentação personalizada
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="flex justify-center lg:justify-end">
              <ChatMock />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ O QUE É ═══ */}
      <section className="border-b border-line-soft bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <TechLabel color="text-silver">O que é o Sn IA</TechLabel>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
                Um assistente que conhece o seu negócio.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-4 text-base leading-relaxed text-muted">
                <p>
                  O Sn IA é um produto da Skylayer para atendimento e acompanhamento de clientes por
                  WhatsApp. Em vez de respostas automáticas frias, responde com contexto — a partir
                  da informação real da sua empresa.
                </p>
                <p>
                  Cada conversa é organizada, nada se perde, e quando surge uma decisão que cabe a
                  uma pessoa, o atendimento é transferido com todo o histórico.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ FUNCIONALIDADES ═══ */}
      <section className="border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Funcionalidades"
              title="O que o Sn IA faz."
              text="Um conjunto de capacidades pensado para responder bem e não perder oportunidades."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 60}>
                <div className="card h-full">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-dev-50 text-dev-600">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-base font-bold text-ink">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMO FUNCIONA (dark band) ═══ */}
      <section className="section-dark border-b border-line-soft">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="glow glow-dev left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 opacity-[0.12]" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-white/60">
              COMO FUNCIONA
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Do primeiro contacto ao acompanhamento.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map(([title, text], i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="border-t border-white/12 pt-5">
                  <span className="font-mono text-2xl font-light text-white/45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BENEFÍCIOS ═══ */}
      <section className="border-b border-line-soft bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <SectionHeading eyebrow="Porquê o Sn IA" title="Menos tempo a responder, mais oportunidades." />
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {[
              "Responde de imediato, mesmo fora do horário.",
              "Respostas consistentes e alinhadas com a sua empresa.",
              "Contactos organizados em vez de conversas perdidas.",
              "Seguimento automático de quem faltou responder.",
              "Transição natural para atendimento humano.",
              "Menos tarefas repetitivas para a sua equipa.",
            ].map((b, i) => (
              <Reveal key={b} delay={i * 50}>
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-dev-500" />
                  <p className="text-base leading-relaxed text-muted">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA (dark) ═══ */}
      <section className="section-dark">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="glow glow-dev -left-20 top-0 h-72 w-72 opacity-[0.16]" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-28">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-white/60">
              QUER VER O SN IA A FUNCIONAR?
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Peça uma demonstração.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55">
              Mostramos o Sn IA aplicado ao seu negócio e explicamos como ficaria no seu WhatsApp.
              Sem compromisso.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappLink("Olá Skylayer! Gostaria de uma demonstração do Sn IA.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-xs font-semibold uppercase tracking-widest text-charcoal transition-transform hover:-translate-y-0.5"
              >
                Pedir demonstração
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:border-white/60"
              >
                Falar com a equipa
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
