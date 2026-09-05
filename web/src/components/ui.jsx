import { Link } from "react-router-dom"
import { useReveal } from "../hooks.js"

export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { animationDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}

export function Logo({ dark = false, className = "h-10" }) {
  const src = dark ? "/logo-white.svg" : "/logo.svg"
  return (
    <img
      src={src}
      alt="Skylayer"
      className={`${className} w-auto`}
      width="375"
      height="90"
      loading="eager"
    />
  )
}

/* Editorial section heading: label + large title + optional lead */
export function SectionHeading({ eyebrow, title, text, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-silver">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
        {title}
      </h2>
      {text && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{text}</p>}
    </div>
  )
}

/* Technical coordinate label: SL / XXXX / NN */
export function TechLabel({ children, color = "text-muted", className = "" }) {
  return (
    <p className={`font-mono text-[10px] font-medium uppercase tracking-[0.25em] ${color} ${className}`}>
      {children}
    </p>
  )
}

/* Front number block: 01 / DEV */
export function FrontNumber({ num, label, color = "text-muted", className = "" }) {
  return (
    <div className={`flex items-baseline gap-3 ${className}`}>
      <span className="font-mono text-3xl font-light text-silver sm:text-4xl">{num}</span>
      <span className={`font-mono text-sm font-semibold uppercase tracking-[0.3em] ${color}`}>{label}</span>
    </div>
  )
}

/* Divider with signal node */
export function SignalDivider({ color = "bg-silver" }) {
  return (
    <div className="relative mx-auto h-16 w-full max-w-6xl px-4 sm:px-6" aria-hidden="true">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line-soft" />
      <span className={`absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${color} signal-dot`} />
    </div>
  )
}

/* Backward compat alias */
export const LayerEdge = SignalDivider

/* Link with arrow (editorial) */
export function ArrowLink({ to, children, className = "" }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-charcoal transition-colors hover:text-dev-600 ${className}`}
    >
      <span className="border-b border-charcoal/30 pb-1 transition-colors group-hover:border-dev-500">
        {children}
      </span>
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
    </Link>
  )
}