import { Link } from "react-router-dom"
import {
  GitBranch,
  ShieldCheck,
  FileText,
  Lock,
  KeyRound,
  ClipboardList,
  ArrowRight,
  MessageCircle,
  X,
} from "lucide-react"
import { usePageTitle } from "../hooks.js"
import { whatsappLink } from "../config.js"
import { process, principles, nonGoals } from "../data/services.js"
import { Reveal, SectionHeading } from "../components/ui.jsx"

/* ═══════════════════════════════════════════════════
   ENGENHARIA — resposta a «porque devo confiar em vocês?»
   Princípios verificáveis + as seis fases em detalhe +
   limites que assumimos. Sem portfólio inventado.
   ═══════════════════════════════════════════════════ */

const PRINCIPLE_ICONS = [GitBranch, ShieldCheck, FileText, Lock, KeyRound, ClipboardList]

const PHASES = [
  { time: "primeiros dias", need: "Acesso a quem conhece o processo." },
  { time: "até 48 h", need: "A sua decisão sobre prioridades e orçamento." },
  { time: "por etapas", need: "Feedback nos pontos de controlo combinados." },
  { time: "antes da entrega", need: "A sua verificação e aprovação." },
  { time: "no prazo combinado", need: "Confirmação de que o combinado está cumprido." },
  { time: "contínuo", need: "Que nos diga o que mudou na sua operação." },
]

export default function Engenharia() {
  usePageTitle("Engenharia")

  return (
    <>
      {/* HERO */}
      <section className="border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="eyebrow">Engenharia</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            Não pedimos confiança. Mostramos o método.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Somos uma empresa nova, e sabemos que isso levanta uma pergunta legítima: porque devemos
            confiar em vocês? A resposta não é um portfólio — é um método que pode verificar: os
            princípios que seguimos, as fases que pode acompanhar e os limites que assumimos.
          </p>
        </div>
      </section>

      {/* PRINCÍPIOS */}
      <section className="border-b border-line-soft bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Princípios de engenharia"
              title="Compromissos concretos, não adjetivos."
              text="Não dizemos que somos «estáveis» ou «profissionais». Dizemos o que fazemos — e pode verificar em cada projeto."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => {
              const Icon = PRINCIPLE_ICONS[i]
              return (
                <Reveal key={p.title} delay={i * 60}>
                  <div className="h-full rounded-xl border border-line bg-white p-6">
                    <Icon className="h-5 w-5 text-dev-600" aria-hidden="true" />
                    <h3 className="mt-4 text-base font-bold tracking-tight text-ink">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* AS SEIS FASES */}
      <section className="border-b border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Como trabalhamos"
              title="Seis fases, sempre as mesmas."
              text="Do primeiro contacto ao acompanhamento, sabe sempre em que passo está — e o que recebe em cada um."
            />
          </Reveal>
          <div className="mt-14 space-y-4">
            {process.map(([title, does, gets], i) => {
              const phase = PHASES[i] || {}
              return (
                <Reveal key={title} delay={i * 50}>
                  <div className="grid gap-x-8 gap-y-4 rounded-xl border border-line bg-ivory p-6 sm:p-7 lg:grid-cols-[220px_1fr_1fr]">
                    <div>
                      <span className="font-mono text-xs tracking-[0.25em] text-silver">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-1 text-lg font-extrabold tracking-tight text-ink">{title}</h3>
                      {phase.time && (
                        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-dev-600">
                          {phase.time}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-silver">
                        O que fazemos
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{does}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-silver">
                        O que recebe
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-ink">{gets}</p>
                      {phase.need && (
                        <p className="mt-3 text-xs leading-relaxed text-muted">
                          <span className="font-semibold text-muted">Precisamos de si: </span>
                          {phase.need}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* O QUE NÃO FAZEMOS */}
      <section className="section-dark border-b border-line-soft">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-white/60">
              Transparência
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              O que não fazemos.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55">
              Confiança também se constrói a dizer o que recusamos. Estes limites valem para todos os
              projetos.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {nonGoals.map((n, i) => (
              <Reveal key={n} delay={i * 50}>
                <li className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-white/40" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-white/75">{n}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Teste o método sem compromisso.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Comece pelo diagnóstico técnico inicial. Analisamos o que tem, apontamos prioridades e o
            relatório é seu — mesmo que não continue connosco.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/diagnostico" className="btn-primary">
              Pedir diagnóstico gratuito
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink("Olá Skylayer! Vi a vossa página de engenharia e gostaria de falar.")}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              <MessageCircle className="h-4 w-4" />
              Falar connosco
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
