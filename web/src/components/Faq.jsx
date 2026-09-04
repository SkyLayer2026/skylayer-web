export default function Faq({ items }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details
          key={f.q}
          className="group rounded-xl border border-line bg-white px-6 py-4 open:border-dev-200"
        >
          <summary className="cursor-pointer list-none font-semibold text-ink marker:hidden">
            <span className="flex items-center justify-between gap-4">
              {f.q}
              <span className="text-lg text-dev-600 transition group-open:rotate-45">＋</span>
            </span>
          </summary>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
