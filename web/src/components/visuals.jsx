export function LayersVisual({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 480 400" className="w-full">
        <defs>
          <linearGradient id="layer-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#f4f4f5" />
          </linearGradient>
        </defs>

        <g stroke="#e4e4e7" strokeWidth="1">
          <line x1="240" y1="70" x2="240" y2="120" />
          <line x1="240" y1="190" x2="240" y2="240" />
          <line x1="240" y1="310" x2="240" y2="360" />
        </g>

        <g fill="url(#layer-fill)" stroke="#d4d4d8" strokeWidth="1">
          <rect x="70" y="10" width="340" height="62" rx="10" />
          <rect x="70" y="132" width="340" height="58" rx="10" />
          <rect x="70" y="252" width="340" height="58" rx="10" />
        </g>

        <g>
          <rect x="90" y="30" width="80" height="10" rx="5" fill="#2563eb" />
          <rect x="180" y="30" width="120" height="10" rx="5" fill="#e4e4e7" />
          <rect x="90" y="50" width="200" height="8" rx="4" fill="#e4e4e7" />
        </g>

        <g>
          <rect x="90" y="152" width="90" height="10" rx="5" fill="#2563eb" />
          <rect x="190" y="152" width="110" height="10" rx="5" fill="#e4e4e7" />
          <rect x="90" y="172" width="160" height="8" rx="4" fill="#e4e4e7" />
        </g>

        <g>
          <rect x="90" y="272" width="70" height="10" rx="5" fill="#2563eb" />
          <rect x="170" y="272" width="130" height="10" rx="5" fill="#e4e4e7" />
          <rect x="90" y="292" width="180" height="8" rx="4" fill="#e4e4e7" />
        </g>

        <g fill="#2563eb">
          <circle cx="235" cy="92" r="5" />
          <circle cx="235" cy="212" r="5" />
          <circle cx="235" cy="332" r="5" />
        </g>

        <g fill="#fafafa" stroke="#d4d4d8" strokeWidth="1">
          <circle cx="410" cy="50" r="9" />
          <circle cx="410" cy="50" r="4" fill="#2563eb" stroke="none" />
        </g>
      </svg>
    </div>
  )
}

export function ProjectMockup({ product, accent }) {
  return (
    <div className="relative overflow-hidden bg-surface" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative p-5 sm:p-6">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#fca5a5]" />
          <span className="h-2 w-2 rounded-full bg-[#fde68a]" />
          <span className="h-2 w-2 rounded-full bg-[#86efac]" />
          <div className="ml-3 h-4 flex-1 rounded-md border border-line bg-white" />
        </div>
        <div className="mt-4 grid grid-cols-5 gap-3">
          <div className="col-span-1 hidden flex-col gap-2 sm:flex">
            <div className="h-12 rounded-lg border border-line bg-white" />
            <div className="h-12 rounded-lg border border-line bg-white" />
            <div className="h-12 rounded-lg border border-line bg-white" />
          </div>
          <div className="col-span-5 sm:col-span-4">
            <div className="rounded-lg border border-line bg-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="h-3 w-28 rounded bg-[#e4e4e7]" />
                  <div className="mt-2 h-2 w-20 rounded bg-[#f4f4f5]" />
                </div>
                <div className="flex gap-2">
                  <div className={`h-6 w-16 rounded-md`} style={{ backgroundColor: accent }} />
                  <div className="h-6 w-10 rounded-md border border-line bg-white" />
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-lg border border-line bg-surface p-3">
                    <div className="text-xs font-bold" style={{ color: accent }}>
                      {product.code}
                    </div>
                    <div className="mt-2 h-2 w-full rounded bg-[#e4e4e7]" />
                    <div className="mt-1.5 h-2 w-3/4 rounded bg-[#f4f4f5]" />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-end gap-2">
                {[40, 65, 50, 80, 60, 95, 70].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm" style={{ height: h, backgroundColor: `${accent}22` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const pillarIcons = {
  Estável: (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9" aria-hidden="true">
      <path d="M6 16v16M42 16v16" stroke="#d4d4d8" strokeWidth="2" />
      <path d="M8 24h7l4-8 6 16 5-12 3 4h7" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="3.5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
    </svg>
  ),
  Segura: (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9" aria-hidden="true">
      <path d="M24 6l14 5v12c0 9-6 15-14 19-8-4-14-10-14-19V11l14-5z" stroke="#2563eb" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M17 24l5 5 9-11" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Acessível: (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9" aria-hidden="true">
      <rect x="6" y="8" width="24" height="32" rx="3" stroke="#d4d4d8" strokeWidth="2" />
      <rect x="34" y="14" width="10" height="20" rx="2" stroke="#2563eb" strokeWidth="2.5" />
      <path d="M30 40h-26" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 20h8" stroke="#d4d4d8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Inclusiva: (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9" aria-hidden="true">
      <circle cx="14" cy="16" r="4" stroke="#2563eb" strokeWidth="2.5" />
      <circle cx="34" cy="16" r="4" stroke="#d4d4d8" strokeWidth="2" />
      <circle cx="24" cy="16" r="4" stroke="#d4d4d8" strokeWidth="2" />
      <circle cx="14" cy="34" r="4" stroke="#d4d4d8" strokeWidth="2" />
      <circle cx="34" cy="34" r="4" stroke="#2563eb" strokeWidth="2.5" />
      <circle cx="24" cy="34" r="4" stroke="#d4d4d8" strokeWidth="2" />
    </svg>
  ),
}

export const stageLabels = {
  "Começar": "Para entrar ou melhorar a presença digital.",
  "Organizar": "Para digitalizar a operação da empresa.",
  "Automatizar": "Para reduzir trabalho manual repetitivo.",
  "Estruturar": "Para uma base tecnológica confiável.",
  "Construir": "Para necessidades fora do padrão.",
}