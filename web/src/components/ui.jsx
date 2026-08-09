import { Link } from "react-router-dom"

export function Logo({ dark = false, className = "h-8 w-8" }) {
  return (
    <span className="flex items-center gap-2">
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path fill="#2563eb" d="M16 2 30 30H2z" />
        <path fill="white" d="M16 10l8 16h-4.2L16 17l-3.8 9H8z" />
      </svg>
      <span
        className={`text-lg font-extrabold tracking-tight ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        Sky<span className="text-brand-600">layer</span>
      </span>
    </span>
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
