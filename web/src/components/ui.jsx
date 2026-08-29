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

export function Logo({ dark = false, className = "h-8" }) {
  const src = dark ? "/logo-white.png" : "/logo-blue.png"
  return (
    <img
      src={src}
      alt="Skylayer"
      className={`${className} w-auto`}
      width="160"
      height="32"
      loading="eager"
    />
  )
}

export function SectionHeading({ eyebrow, title, text, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-lg text-muted">{text}</p>}
    </div>
  )
}

export function Divider() {
  return <div className="mx-auto h-px w-full max-w-6xl bg-line" aria-hidden="true" />
}

export function LayerEdge() {
  return (
    <div className="relative mx-auto h-14 w-full max-w-6xl px-4 sm:px-6" aria-hidden="true">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 -space-x-1.5">
        <span className="h-4 w-7 -rotate-6 rounded-sm border border-brand-300 bg-white shadow-sm" />
        <span className="relative z-10 h-4 w-7 rounded-sm border border-brand-200 bg-brand-50 shadow-sm" />
        <span className="h-4 w-7 rotate-6 rounded-sm border border-brand-300 bg-white shadow-sm" />
      </div>
    </div>
  )
}
